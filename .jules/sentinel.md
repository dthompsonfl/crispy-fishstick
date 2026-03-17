## 2025-02-18 - Hardcoded Auth Secret Fallback
**Vulnerability:** A hardcoded string ("dev-secret-fallback...") was used as a fallback when `NEXTAUTH_SECRET` was missing in non-production environments.
**Learning:** Hardcoded fallbacks, even for development, create a risk of accidental exposure if an environment is misconfigured (e.g. staging). It also teaches developers that secrets aren't strictly required.
**Prevention:** Use `crypto.randomBytes` or `crypto.getRandomValues` to generate a temporary secret for development sessions, or throw an error to enforce configuration. Secure by default.
## 2024-05-22 - Fail-Open Rate Limiting
**Vulnerability:** The rate limiting logic fell back to a "success: true" mock or return value when Redis was unavailable, effectively disabling rate limiting during outages or configuration errors.
**Learning:** Security mechanisms often have "fail-open" defaults to preserve availability, but for critical protections like rate limiting on authentication, "fail-secure" or a robust fallback (in-memory) is required.
**Prevention:** Always implement a degradation strategy (e.g., in-memory store) rather than disabling the control when the primary dependency fails.
