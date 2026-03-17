import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Auth Secret Security', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('NEXTAUTH_SECRET', '');
    vi.stubEnv('AUTH_SECRET', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should generate a random secret when none is provided in dev', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    const { nextAuthSecret } = await import('@/lib/auth.config');

    const hardcoded = "dev-secret-fallback-for-development-only";
    expect(nextAuthSecret).not.toBe(hardcoded);
    expect(nextAuthSecret).toHaveLength(64);
    expect(nextAuthSecret).toMatch(/^[0-9a-f]{64}$/);
  });

  it('should throw an error in production if secret is missing', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    await expect(async () => {
      await import('@/lib/auth.config');
    }).rejects.toThrow();
    // It might throw "Environment validation failed" or "Auth secret is required" depending on which check hits first
  });
});
