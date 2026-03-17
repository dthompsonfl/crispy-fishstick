# INFRASTRUCTURE DEFICIENCIES

**DATE:** 2025-05-15
**AUDITOR:** Jules (Senior Principal Engineer)

---

## 1. Containerization & Portability (MISSING)

*   **Status:** 🔴 CRITICAL
*   **Issue:** No `Dockerfile` or `docker-compose.yml` found.
*   **Impact:**
    *   "Works on my machine" syndrome.
    *   Production environment (`bootstrap-ubuntu22.sh`) drifts from Development.
    *   Cannot easily scale horizontally (Orchestration requires containers).
*   **Remediation:** Create a multi-stage `Dockerfile` optimized for Next.js standalone output.

## 2. Database Infrastructure

*   **Status:** 🔴 CRITICAL
*   **Issue:** Production uses SQLite (`bootstrap-ubuntu22.sh` implies single node setup).
*   **Impact:**
    *   **No Horizontal Scaling:** Cannot add read replicas.
    *   **Single Point of Failure:** If the disk dies, data is gone (unless backup script works perfectly).
    *   **Concurrency:** SQLite writes lock the DB file.
*   **Remediation:** Provision AWS RDS (Postgres) or similar managed DB.

## 3. CI/CD Pipeline

*   **Status:** 🟠 MEDIUM
*   **Issue:**
    *   CI (`.github/workflows/ci.yml`) exists but lacks a **CD (Deployment)** stage.
    *   Deployment is manual (`ssh user@host 'bash bootstrap.sh'`).
    *   Lighthouse CI step relies on `sleep 10` which is race-condition prone.
*   **Remediation:** Add a `deploy` job that pushes the Docker image to a registry (ECR/GHCR) and triggers a rollout (e.g., via SSH or K8s).

## 4. Monitoring & Logging

*   **Status:** 🟡 HIGH
*   **Issue:**
    *   Sentry is installed (Good).
    *   Logs are written to local files (`/var/log/vantus/...`) in the bootstrap script.
    *   **No Centralized Logging:** If you have 2 servers, you have to SSH into each to grep logs.
*   **Remediation:** Install CloudWatch Agent, Datadog, or similar to ship logs off-box.

## 5. Deployment Script Bugs

*   **Status:** 🔴 CRITICAL
*   **Issue:** `scripts/bootstrap-ubuntu22.sh` has a syntax/logic error that forces `exit 1` in the package installation step.
*   **Impact:** Automated deployment WILL FAIL 100% of the time.

---

**SUMMARY:** The infrastructure is "Hobby Tier" at best. It is not suitable for a Fortune 500 $10M deployment. It relies on a single mutable server with a file-based database.
