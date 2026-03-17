/**
 * Redis-backed Rate Limiting System
 * @module lib/security/rate-limit
 */

import { Redis } from "ioredis";
import { NextRequest, NextResponse } from "next/server";

interface RateLimitOptions {
  maxAttempts?: number;
  windowMs?: number;
  keyPrefix?: string;
}

interface RateLimitResult {
  success: boolean;
  retryAfter?: number;
  remaining?: number;
}

interface MemoryRateLimitData {
  count: number;
  expires: number;
}

const DEFAULT_MAX_ATTEMPTS = 5;
const DEFAULT_WINDOW_MS = 60 * 1000; // 1 minute
const DEFAULT_KEY_PREFIX = "rl:";

// Email-based rate limiting constants
const EMAIL_MAX_ATTEMPTS = 3;
const EMAIL_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const EMAIL_KEY_PREFIX = "rl:email:";

/**
 * Redis Rate Limiter
 */
export class RateLimiter {
  private redis: Redis | null;
  private maxAttempts: number;
  private windowMs: number;
  private keyPrefix: string;
  private memoryStore: Map<string, MemoryRateLimitData>;

  constructor(redisClient: Redis | null, options: RateLimitOptions = {}) {
    this.redis = redisClient;
    this.maxAttempts = options.maxAttempts || DEFAULT_MAX_ATTEMPTS;
    this.windowMs = options.windowMs || DEFAULT_WINDOW_MS;
    this.keyPrefix = options.keyPrefix || DEFAULT_KEY_PREFIX;
    this.memoryStore = new Map();
  }

  /**
   * Check rate limit using in-memory store
   */
  private checkMemory(key: string, maxAttempts: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const data = this.memoryStore.get(key);

    if (!data) {
      this.memoryStore.set(key, {
        count: 1,
        expires: now + windowMs
      });
      return {
        success: true,
        remaining: maxAttempts - 1
      };
    }

    if (now > data.expires) {
      this.memoryStore.set(key, {
        count: 1,
        expires: now + windowMs
      });
      return {
        success: true,
        remaining: maxAttempts - 1
      };
    }

    if (data.count >= maxAttempts) {
      const retryAfter = Math.ceil((data.expires - now) / 1000);
      return {
        success: false,
        retryAfter: retryAfter
      };
    }

    data.count++;
    this.memoryStore.set(key, data);

    return {
      success: true,
      remaining: maxAttempts - data.count
    };
  }

  /**
   * Get rate limit key for an IP address
   */
  private getKey(ip: string): string {
    return `${this.keyPrefix}${ip}`;
  }

  /**
   * Get rate limit key for an email address
   */
  private getEmailKey(email: string): string {
    return `${EMAIL_KEY_PREFIX}${email.toLowerCase()}`;
  }

  /**
   * Check rate limit for an IP address
   */
  async check(ip: string): Promise<RateLimitResult> {
    const key = this.getKey(ip);

    // Use memory store if Redis is not configured
    if (!this.redis) {
      return this.checkMemory(key, this.maxAttempts, this.windowMs);
    }

    const now = Date.now();

    try {
      // Get current rate limit data
      const result = await this.redis.hgetall(key);
      
      if (!result || !result.count || !result.expires) {
        // First request in this window
        await this.redis.hmset(key, {
          count: "1",
          expires: String(now + this.windowMs)
        });
        
        await this.redis.expireat(key, Math.floor((now + this.windowMs) / 1000));
        
        return {
          success: true,
          remaining: this.maxAttempts - 1
        };
      }

      const count = parseInt(result.count);
      const expires = parseInt(result.expires);

      if (now > expires) {
        // Window has expired, reset
        await this.redis.hmset(key, {
          count: "1",
          expires: String(now + this.windowMs)
        });
        
        await this.redis.expireat(key, Math.floor((now + this.windowMs) / 1000));
        
        return {
          success: true,
          remaining: this.maxAttempts - 1
        };
      }

      if (count >= this.maxAttempts) {
        // Rate limit exceeded
        const retryAfter = Math.ceil((expires - now) / 1000);
        return {
          success: false,
          retryAfter: retryAfter
        };
      }

      // Increment count
      await this.redis.hincrby(key, "count", 1);
      
      return {
        success: true,
        remaining: this.maxAttempts - (count + 1)
      };
      
    } catch (error) {
      console.error("Rate limiting error:", error);
      // Fallback to memory store if Redis fails
      return this.checkMemory(key, this.maxAttempts, this.windowMs);
    }
  }

  /**
   * Check rate limit for an email address
   */
  async checkEmail(email: string): Promise<RateLimitResult> {
    const key = this.getEmailKey(email);

    // Use memory store if Redis is not configured
    if (!this.redis) {
      return this.checkMemory(key, EMAIL_MAX_ATTEMPTS, EMAIL_WINDOW_MS);
    }

    const now = Date.now();

    try {
      // Get current rate limit data
      const result = await this.redis.hgetall(key);
      
      if (!result || !result.count || !result.expires) {
        // First request in this window
        await this.redis.hmset(key, {
          count: "1",
          expires: String(now + EMAIL_WINDOW_MS)
        });
        
        await this.redis.expireat(key, Math.floor((now + EMAIL_WINDOW_MS) / 1000));
        
        return {
          success: true,
          remaining: EMAIL_MAX_ATTEMPTS - 1
        };
      }

      const count = parseInt(result.count);
      const expires = parseInt(result.expires);

      if (now > expires) {
        // Window has expired, reset
        await this.redis.hmset(key, {
          count: "1",
          expires: String(now + EMAIL_WINDOW_MS)
        });
        
        await this.redis.expireat(key, Math.floor((now + EMAIL_WINDOW_MS) / 1000));
        
        return {
          success: true,
          remaining: EMAIL_MAX_ATTEMPTS - 1
        };
      }

      if (count >= EMAIL_MAX_ATTEMPTS) {
        // Rate limit exceeded
        const retryAfter = Math.ceil((expires - now) / 1000);
        return {
          success: false,
          retryAfter: retryAfter
        };
      }

      // Increment count
      await this.redis.hincrby(key, "count", 1);
      
      return {
        success: true,
        remaining: EMAIL_MAX_ATTEMPTS - (count + 1)
      };
      
    } catch (error) {
      console.error("Email rate limiting error:", error);
      // Fallback to memory store if Redis fails
      return this.checkMemory(key, EMAIL_MAX_ATTEMPTS, EMAIL_WINDOW_MS);
    }
  }

  /**
   * Check both IP and email rate limits
   */
  async checkLoginAttempt(ip: string, email: string): Promise<RateLimitResult> {
    // Check IP-based rate limit
    const ipResult = await this.check(ip);
    if (!ipResult.success) {
      return ipResult;
    }

    // Check email-based rate limit
    const emailResult = await this.checkEmail(email);
    if (!emailResult.success) {
      return emailResult;
    }

    // Return the more restrictive result
    return {
      success: true,
      remaining: Math.min(ipResult.remaining || this.maxAttempts, emailResult.remaining || EMAIL_MAX_ATTEMPTS)
    };
  }

  /**
   * Middleware for rate limiting
   */
  async middleware(req: NextRequest): Promise<NextResponse | null> {
    const ip = this.getClientIp(req);
    const result = await this.check(ip);

    if (!result.success) {
      const response = NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
      
      if (result.retryAfter) {
        response.headers.set("Retry-After", result.retryAfter.toString());
      }
      
      return response;
    }

    return null; // Continue processing
  }

  /**
   * Get client IP address from request
   */
  private getClientIp(req: NextRequest): string {
    // Try to get IP from various headers
    const xForwardedFor = req.headers.get("x-forwarded-for");
    const xRealIp = req.headers.get("x-real-ip");

    // x-forwarded-for can contain multiple IPs, take the first one
    if (xForwardedFor) {
      return xForwardedFor.split(",")[0].trim();
    }

    if (xRealIp) {
      return xRealIp;
    }

    // Fallback to unknown
    return "unknown";
  }

  /**
   * Exponential backoff calculation
   */
  static calculateExponentialBackoff(attempts: number, baseDelay: number = 1000): number {
    return Math.min(baseDelay * Math.pow(2, attempts - 1), 60000); // Cap at 1 minute
  }
}

/**
 * Global rate limiter instance
 */
let globalRateLimiter: RateLimiter | null = null;

/**
 * Get or create global rate limiter
 */
export function getRateLimiter(redisClient: Redis | null): RateLimiter {
  if (!globalRateLimiter) {
    globalRateLimiter = new RateLimiter(redisClient, {
      maxAttempts: 5,
      windowMs: 60 * 1000 // 1 minute
    });
  }
  return globalRateLimiter;
}