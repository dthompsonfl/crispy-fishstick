import { NextAuthOptions } from "next-auth";
import { z } from "zod";

// Environment variable validation schema
const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(32, {
    message: "NEXTAUTH_SECRET must be at least 32 characters long"
  }),
  NEXTAUTH_URL: z.string().url({
    message: "NEXTAUTH_URL must be a valid URL"
  }),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

function getAuthSecret(): string {
  // Validate environment variables using Zod
  const envValidation = envSchema.safeParse({
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!envValidation.success) {
    const errors = envValidation.error.format();
    console.error("Environment validation errors:", errors);

    // In production, fail fast on validation errors
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `Environment validation failed: ${JSON.stringify(errors)}`
      );
    }

    console.warn("Using development fallback due to environment validation errors");
  }

  const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;

  if (process.env.NODE_ENV === "production" && !secret) {
    throw new Error(
      "Auth secret is required in production. Please set NEXTAUTH_SECRET or AUTH_SECRET in your environment variables."
    );
  }

  if (!secret) {
    console.warn("No auth secret found. Generating a random fallback secret for development.");
    // Generate a random 32-byte hex string (64 characters)
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
    }
    // Fallback if crypto is not available (should not happen in modern Node/Edge)
    throw new Error("No auth secret found and secure generation failed. Please set NEXTAUTH_SECRET.");
  }

  if (secret.length < 32) {
    console.warn("Auth secret should be at least 32 characters for production security");
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXTAUTH_SECRET must be at least 32 characters in production");
    }
  }

  return secret;
}

export const nextAuthSecret = getAuthSecret();

// Determine security settings dynamically based on NEXTAUTH_URL
const nextAuthUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
let url: URL;
try {
  url = new URL(nextAuthUrl);
} catch {
  url = new URL("http://localhost:3000");
}
const isHttps = url.protocol === "https:";

export const authConfig: NextAuthOptions = {
  secret: nextAuthSecret,
  useSecureCookies: isHttps,
  // @ts-expect-error - trustHost is supported in v4
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/error",
  },
  cookies: {
    sessionToken: {
      name: isHttps
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isHttps,
      },
    },
  },
  providers: [], // Providers configured in auth.ts
  callbacks: {
    async redirect({ url, baseUrl }) {
      try {
        const base = new URL(baseUrl);
        const target = new URL(url, base);
        if (target.origin !== base.origin) return base.toString();
        return target.toString();
      } catch {
        return baseUrl;
      }
    },
  },
};
