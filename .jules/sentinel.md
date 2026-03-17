## 2024-05-22 - Fail-Open Rate Limiting
**Vulnerability:** The rate limiting logic fell back to a "success: true" mock or return value when Redis was unavailable, effectively disabling rate limiting during outages or configuration errors.
**Learning:** Security mechanisms often have "fail-open" defaults to preserve availability, but for critical protections like rate limiting on authentication, "fail-secure" or a robust fallback (in-memory) is required.
**Prevention:** Always implement a degradation strategy (e.g., in-memory store) rather than disabling the control when the primary dependency fails.
