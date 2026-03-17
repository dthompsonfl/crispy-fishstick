# Admin Portal Feature List

This document provides an exhaustive inventory of features, functionalities, and automations within the Vantus Admin Portal (`app/(admin)`).

## Core Architecture & Security

### Authentication & Authorization
- **Role-Based Access Control (RBAC):**
    - Permissions stored as JSON strings on Roles (SQLite compatible).
    - `RoleAssignment` supports scoping: Global, Tenant, Project, Service, Region.
    - `requireAdmin` guard enforces permissions and tenant isolation.
    - **Just-In-Time (JIT) Access:**
        - Request temporary elevation to specific roles.
        - Approval workflow (Approve/Deny).
        - Automatic expiration.
- **Multi-Factor Authentication (MFA):**
    - Enable/Disable MFA for users.
    - Generate MFA secrets and QR codes.
    - Backup codes and recovery codes management.
- **Session Management:**
    - Active session tracking with IP and User Agent.
    - Remote session revocation.
    - Automated cleanup of expired sessions via Cron.
- **Audit Logging:**
    - Comprehensive tracking of admin actions (`AuditLog`).
    - Security-specific audit logs (`SecurityAuditLog`).
    - JSON Patch diffing for resource changes.
- **Tenant Isolation:**
    - `tenantWhere` helper ensures admins only access their assigned tenant data (unless Global Admin).

### Infrastructure & Automations
- **Cron Jobs:**
    - `contract-reminders`: Checks for contracts expiring in 30 days and emails tenant contacts.
    - `session-cleanup`: Purges expired user sessions from the database.
- **Soft Delete System:**
    - Implemented across most resources (Assignments, Contracts, Invoices, Leads, Media, Projects, Proposals, Services, TimeEntries, Users, Content).
    - "Restore" functionality available via API/Admin UI.
- **Email Notifications:**
    - Powered by `@/lib/email`.
    - Triggers on: Proposal Submission, Contract Expiration, JIT Access changes.

## Functional Modules

### Dashboard & Analytics
- **Overview:** High-level metrics and KPIs.
- **Analytics:** Detailed reporting (structure implies analytics module).

### CRM & Sales
- **Leads:**
    - Lead tracking (New -> Contacted -> Qualified -> Closed).
    - Bulk actions.
    - Restore capability.
- **Proposals:**
    - Creation and management.
    - Workflow: Draft -> Pending Approval -> Approved/Rejected.
    - "Submit" action triggers email to client.
    - "Convert to Project" automation.
    - Proposal Components & Items (Line items).
- **Contracts:**
    - Lifecycle management (Draft -> Active -> Expired/Terminated).
    - E-Signature integration fields (Provider, Envelope ID, Status).
    - "Sign" action.
    - Versioning support.
- **Invoices:**
    - Invoice generation and sequencing.
    - "Draft from Time" automation (Generates invoice from billable time entries).
    - Status tracking.

### Operations & Project Management
- **Projects:**
    - Project lifecycle management.
    - Assignment of users to projects.
    - Bulk actions.
- **Assignments:**
    - Staffing/Resource allocation.
    - Start/End dates and allocation percentage.
- **Time Entries:**
    - Billable/Non-billable time tracking.
    - Approval workflow (Approve/Reject).
    - Integration with Invoicing.

### Content Management (CMS)
- **Content:**
    - Management of Posts/Pages (`Content` model).
    - Status workflow (Draft -> Published).
    - Soft delete/Restore.
- **Media:**
    - File asset management (`MediaAsset`).
    - Private/Public visibility controls.
    - "Download" action.
    - Soft delete/Restore.

### Engineering & Incident Management
- **Incidents:**
    - Incident tracking and status management.
    - Postmortems with Root Cause Analysis (RCA).
- **Services:**
    - Service catalog (Owners, Repo URLs, Lifecycle status).
- **Infrastructure (Internal Tools):**
    - `InfraSku` and `InfraOption` management.
    - Build configurator and reservation system.

### User & System Management
- **Users:**
    - User management and profile editing.
    - Role assignment.
    - Password history enforcement.
- **Role Assignments:**
    - Manage granular permissions and scopes.
- **Webhooks:**
    - Management of Webhook Endpoints (URL, Secret, Events).
    - Delivery logs and retry history (`WebhookDelivery`).
- **Search:**
    - Global search functionality across resources.
- **Settings:**
    - Global system configuration.

## API Capabilities
- **Exports:**
    - `audit-logs`: Export audit trails for compliance.
- **Bulk Operations:**
    - Leads and Projects support bulk updates/deletes.
- **Restoration:**
    - Dedicated `restore` endpoints for accidental deletions.

## UI/UX Features
- **Design System:**
    - Built on Shadcn/UI and Tailwind v4.
    - "Precision" interaction states.
    - Dark/Light mode support.
- **Navigation:**
    - Sidebar navigation grouped by domain.
    - Mobile responsive layout.
