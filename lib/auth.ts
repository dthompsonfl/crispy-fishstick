import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { verify as verifyOtp } from "otplib";
import Redis from "ioredis";
import crypto from "crypto";
import { decryptSecret } from "@/lib/security/mfa";
import { updateSessionActivity } from "@/lib/security/session";
import { getRateLimiter } from "@/lib/security/rate-limit";
import { authConfig } from "./auth.config";

// Create Redis client for rate limiting
let rateLimiterInstance: ReturnType<typeof getRateLimiter> | null = null;

try {
  const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
  rateLimiterInstance = getRateLimiter(redis);
} catch (error) {
  console.warn('Redis connection failed, falling back to in-memory rate limiting', error);
  // Fallback to in-memory rate limiting
  rateLimiterInstance = getRateLimiter(null);
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      roles: string[];
      permissions: string[];
      tenantId?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    roles: string[];
    permissions: string[];
    tenantId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roles: string[];
    permissions: string[];
    tenantId?: string | null;
    sessionToken?: string;
    sessionCreatedAt?: number;
    // Add security metadata
    ip?: string;
    userAgent?: string;
  }
}

export const authOptions: NextAuthOptions = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        code: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
            // Extract IP address from request context
            const ip = (req as { ip?: string })?.ip || "unknown";
            const email = credentials.email;
            
            // Apply rate limiting for login attempts if rate limiter is available
            if (rateLimiterInstance) {
              const rateLimitResult = await rateLimiterInstance.checkLoginAttempt(ip, email);
                
              if (!rateLimitResult.success) {
                // Rate limit exceeded
                const error = new Error("RATE_LIMIT_EXCEEDED");
                if ("retryAfter" in rateLimitResult && rateLimitResult.retryAfter) {
                  (error as { retryAfter?: number }).retryAfter = rateLimitResult.retryAfter;
                }
                throw error;
              }
            }

            const user = await prisma.user.findUnique({
             where: { email: credentials.email },
             include: {
               RoleAssignment: {
                 include: {
                   Role: true,
                 },
               },
             },
           });

           // Check if user is soft-deleted
           if (user?.deletedAt) {
             console.log("User soft deleted");
             return null;
           }

          if (!user || !user.passwordHash) {
            console.log("User not found or no password hash");
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

          if (!isValid) {
            console.log("Password invalid for user", user.email);
            return null;
          }

          if (user.mfaSecret) {
            if (!credentials.code) {
              throw new Error("MFA_REQUIRED");
            }
            
            try {
              // Decrypt the stored secret before verification
              const decryptedSecret = await decryptSecret(user.mfaSecret);
              if (!decryptedSecret) {
                  throw new Error("MFA_ERROR");
              }

              const isValidToken = verifyOtp({ secret: decryptedSecret, token: credentials.code });
              if (!isValidToken) {
                throw new Error("INVALID_MFA_CODE");
              }
            } catch (error) {
              if (error instanceof Error && (error.message === "MFA_ERROR" || error.message === "INVALID_MFA_CODE")) {
                 throw error;
              }
              // Handle malformed token or other errors
               throw new Error("INVALID_MFA_CODE");
            }
          }

          // Parse permissions
          const permissions = user.RoleAssignment.flatMap((r) => {
            try {
              return JSON.parse(r.Role.permissions);
            } catch {
              return [];
            }
          });
          const uniquePermissions = Array.from(new Set(permissions));

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.RoleAssignment.map((r) => r.Role.name),
            permissions: uniquePermissions,
            tenantId: user.tenantId,
          };
        } catch (error) {
          // Handle rate limit errors
          if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
            throw error;
          }
 
          // Handle Prisma errors (P2021: Table does not exist)
          if (error && typeof error === "object" && "code" in error) {
            const prismaError = error as any;
            if (prismaError.code === 'P2021' || prismaError.code === 'P2022') {
              throw new Error("DB_SCHEMA_NOT_READY");
            }
          }
            
          // Re-throw known auth errors
          if (error instanceof Error && (error.message === "MFA_REQUIRED" || error.message === "INVALID_MFA_CODE" || error.message === "MFA_ERROR")) {
            throw error;
          }
 
          throw new Error("AUTH_ERROR");
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger, session }) {
      // Initialize security metadata on first call
      if (!token.sessionCreatedAt) {
        token.sessionCreatedAt = Math.floor(Date.now() / 1000);
      }

      if (user) {
        token.id = user.id;
        token.roles = user.roles || [];
        token.permissions = user.permissions || [];
        token.tenantId = user.tenantId;
        
        // Add security metadata from request if available
        if ((session as { ip?: string })?.ip) {
          token.ip = (session as { ip?: string }).ip;
        }
        if ((session as { userAgent?: string })?.userAgent) {
          token.userAgent = (session as { userAgent?: string }).userAgent;
        }
      }
      
      // Handle session creation on sign-in with session fixation protection
      if (trigger === "signIn") {
        // Generate a new session token to prevent session fixation
        token.sessionToken = `session_${crypto.randomUUID()}`;
        token.sessionCreatedAt = Math.floor(Date.now() / 1000);
        
        // Add security metadata
        if ((session as { ip?: string })?.ip) {
          token.ip = (session as { ip?: string }).ip;
        }
        if ((session as { userAgent?: string })?.userAgent) {
          token.userAgent = (session as { userAgent?: string }).userAgent;
        }
      }
      
      // Handle session update on activity
      if (trigger === "update" && token.sessionToken) {
        try {
          await updateSessionActivity(token.sessionToken);
        } catch (error) {
          console.error("Failed to update session activity:", error);
        }
      }
      
      // Add session expiration validation
      if (token.sessionCreatedAt) {
        const sessionAge = Math.floor(Date.now() / 1000) - token.sessionCreatedAt;
        const maxSessionAge = 30 * 24 * 60 * 60; // 30 days
        
        if (sessionAge > maxSessionAge) {
          console.warn("Session expired, forcing logout");
          // This will effectively end the session
          token.exp = Math.floor(Date.now() / 1000) - 1;
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.roles = token.roles;
        session.user.permissions = token.permissions;
        session.user.tenantId = token.tenantId;
        
        // Add session security metadata (without exposing sensitive data)
        (session as { ip?: string; userAgent?: string; sessionCreatedAt?: number }).ip = token.ip;
        (session as { ip?: string; userAgent?: string; sessionCreatedAt?: number }).userAgent = token.userAgent;
        (session as { ip?: string; userAgent?: string; sessionCreatedAt?: number }).sessionCreatedAt = token.sessionCreatedAt;
        
        // Prevent data leakage - ensure we don't expose internal token data
        delete (session as { iat?: number; exp?: number; jti?: string }).iat;
        delete (session as { iat?: number; exp?: number; jti?: string }).exp;
        delete (session as { iat?: number; exp?: number; jti?: string }).jti;
      }
      
      // Sanitize session data to prevent information leakage
      const sanitizedSession = {
        ...session,
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          roles: session.user.roles,
          permissions: session.user.permissions,
          tenantId: session.user.tenantId,
        },
      };
      
      return sanitizedSession;
    },
  },
  // Security events
  events: {
    async signIn(message) {
      // Log successful sign-in with security context
      const ip = (message as { ip?: string })?.ip || 'unknown IP';
      console.info(`Successful sign-in for ${message.user.email} from ${ip}`);
    },
    async signOut(message) {
      // Log successful sign-out
      console.info(`Successful sign-out for ${message.token?.email || 'unknown user'}`);
    },
  },
};
