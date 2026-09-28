# Security and privacy requirements

Specification, not an audit or compliance certification. [DATABASE](DATABASE.md) supplies RLS/storage constraints; [API](API.md) supplies contracts.

## Access matrix

All permissions require active organization membership. Owners access all sites in their own tenant; other roles require explicit site assignments. Never infer authorization from a URL, email domain, hidden UI, or submitted role string.

| Capability | Owner | Manager | Operator | Member | Partner |
|---|---|---|---|---|---|
| Organization and owner administration | Yes | No | No | No | No |
| Site setup, modules, devices, policies | Yes | Assigned sites | No | No | No |
| Invite operator/member/partner | Yes | Assigned sites | No | No | No |
| Invite/promote manager or owner | Yes | No | No | No | No |
| Raw readings and meal operations | Yes | Assigned sites | Assigned sites | No | No |
| Site aggregate dashboard | Yes | Assigned sites | Assigned sites | Assigned sites | No |
| Approve/cancel recommendations | Yes | Assigned sites | No | No | No |
| Complete recommendation / dispatch | Yes | Assigned sites | Assigned work | No | No |
| Create/reserve transfer | Yes | Assigned sites | No | No | No |
| Confirm receipt/dispute | Assigned partner identity only; manager reconciles disputes separately | Same | No | No | Assigned transfers |
| Review quality | Trained verifier | Trained verifier | No | No | No |
| Submit contribution | Own contribution | Own contribution | Own contribution | Own contribution | No |
| Verify contribution | Independent verifier | Independent verifier | Independent verifier in assigned site | No | No |
| Read points | Tenant scoped | Assigned sites | Own only | Own only | No |
| Reverse points | Yes | Assigned sites | No | No | No |
| Audit / operational export | Yes | Assigned sites | Scoped export; no audit | No | No |

An owner cannot forge a partner receipt. A manager can resolve a dispute only with reconciliation evidence and audit reason. Member aggregates suppress personal/household breakdowns. Partner passport access is a minimum projection for the assigned transfer, not full site inventory.

## Trust boundaries and threats

| Threat | Required controls | Verification |
|---|---|---|
| Cross-tenant access | RLS, composite FKs, scoped services, private caches | Two-tenant API and direct-client negative tests |
| Duplicate points/stock race | DB locks, unique effects, immutable ledger | Concurrent replay and reservation tests |
| Forged telemetry | TLS, unique device identity, broker ACL, registry mapping | Wrong-topic and revoked-device tests |
| False evidence | Private uploads, checksums, scanning, independent verification | Reject active/mismatched files; audit review |
| Session/CSRF abuse | Verified session, same-origin mutations, CSRF token, secure cookie configuration | Expired/revoked sessions and cross-origin tests |
| LLM prompt injection | Structured minimal input, no write tools, output validation | Malicious text cannot change decisions or leak data |
| Export/upload leakage | Current authorization at download, expiring signed URL, no public bucket | Revoke membership before download test |
| Supply-chain compromise | Pinned lockfile, provenance/license review, vulnerability checks | CI dependency review and secret scanning |

## Authentication and secrets

Use Supabase Auth invite/magic-link flow with strict redirect allowlist; reject arbitrary return URLs. Verify token claims with the supported server verification method for the selected SDK version. Never trust unverified client session data. Require MFA for owner/manager before production administrative actions; recovery flow must be documented and audited. Privileged role changes require recent authentication.

Store backend credentials in deployment secret managers; never prefix them NEXT_PUBLIC. Public Supabase URL/publishable key is not a permission boundary. Service-role/secret keys bypass protections and are restricted to necessary administrative workflows; prefer a custom limited worker role. Rotate device/email/AI credentials and revoke departing users. Logs must exclude Authorization headers, cookies, signed URLs, upload contents, and raw secrets.

## Input, application, and storage controls

Schema-validate requests and domain transitions; parameterize SQL; render untrusted strings as text. Sanitize any future rich text using a maintained allowlist. Use CSP appropriate to explicitly configured chart/map resources, clickjacking protection, restrictive referrer policy, and HSTS after TLS is established. Keep private pages/responses non-cacheable across users.

Evidence download URLs expire in five minutes. Authorize upload against its target entity, inspect MIME signatures and size, scan before use, and block executable/HTML/SVG active content. CSV exports prefix formula-like cells beginning with `=`, `+`, `-`, or `@` when textual, while preserving controlled numeric fields. Enforce rate and payload limits at server and broker.

## IoT security and physical boundary

Devices use individual certificates or unique credentials with narrow ACLs; no shared fleet password. Rotate credentials on reprovisioning and revoke at the broker immediately when requested. P0 device telemetry is not proof of human participation. Calibration/quality metadata is essential for decisions. Disconnected gateways buffer bounded data; freshness is assessed using observation time. No actuator credentials, topics, or hardware-control code in this release.

## Privacy and retention

Collect minimal names/contact emails, site-level measurements, and operational evidence. Avoid household-level energy/water profiles, biometric data, student attendance identities, and location tracking. Cafeteria attendance is an aggregate count. Exact partner location is restricted. Obtain appropriate notice/authorization for pilot data and vendor processing. Indian privacy and sector-specific requirements must be reviewed for the actual operator, jurisdiction, data flows, and deployment date; this pack does not assert legal compliance.

Apply DATABASE retention defaults only after the pilot owner approves them. Provide account access/export/deletion requests through a documented support workflow; pseudonymize retained transaction evidence where lawful and necessary. Separate marketing consent from operational notifications. No real user data in preview/demo environments or model evaluation fixtures.

## Incident response and launch gate

Assign a security contact before pilot. On suspected leakage: contain access, revoke affected credentials, preserve redacted audit evidence, identify affected tenants/data/time window, restore from known-good state where needed, and coordinate required notifications with responsible parties. Record timeline and corrective tests. Do not erase logs to hide an incident.

Launch requires: role/RLS suite passing, private storage checks, no critical unresolved dependency issue, tested backup restoration, administrator MFA, vendor/retention decisions, and operational safety owner for each enabled module. These are planned release gates, not certifications already achieved.
