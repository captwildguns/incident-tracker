# Student Transportation Incident Tracker
## Project Plan: Mock-Up to Production

**Version:** 1.1  
**Created:** February 24, 2026  
**Document Owner:** Project Team  
**Status:** Draft — For Stakeholder Alignment

---

## 1. Project Overview

### Current State
The Student Transportation Incident Tracker exists as a fully functional front-end prototype built with React, TypeScript, and Tailwind CSS using the Tyler Forge 3.x design system. It includes 8 key pages (Dashboard, Incidents, Students, New Incident, Reports, Driver Communications, Vehicles, Drivers), automatic workflow assignment based on incident severity/type, role-based UI, and comprehensive mock data. A complete Product Requirements Document with 67 user stories across 11 feature areas has been finalized.

### Definition of "Production-Ready"
- **Data Persistence:** All data stored in a real database (Supabase/PostgreSQL) with proper schema design
- **Authentication & Authorization:** Role-based access control with secure login (Safety Coordinator, Driver, Director, Admin)
- **API Layer:** RESTful or RPC-based backend APIs replacing all mock data
- **Input Validation:** Client-side and server-side validation on all forms
- **Error Handling:** Graceful error states, retry logic, and user-friendly error messages
- **Performance:** Page load < 2s, API responses < 500ms, optimized bundle size
- **Security:** OWASP Top 10 compliance, data encryption at rest and in transit, CSRF/XSS protection
- **Accessibility:** WCAG 2.1 AA compliance
- **Monitoring:** Application logging, error tracking, and uptime monitoring
- **Deployment:** CI/CD pipeline, staging and production environments

### Key Goals & Success Criteria
| Goal | Success Criteria |
|------|-----------------|
| Replace mock data with real persistence | All CRUD operations persist to database |
| Secure multi-user access | Users can only access data/actions for their role |
| Reliable incident workflow | Incidents auto-run correctly 100% of the time |
| Real-time communications | Driver messages delivered within 5 seconds |
| Production uptime | 99.5% availability in first 90 days |
| User adoption | 80% of target users actively using within 30 days of launch |

---

## 2. Scope & Assumptions

### In Scope
- Database schema design and migration (Supabase/PostgreSQL)
- Authentication and role-based authorization (Supabase Auth)
- Backend API development for all 11 feature areas
- Real-time messaging for driver communications
- File upload for incident attachments and photos
- Report generation and data export (CSV/PDF)
- Email/SMS notification integration
- Responsive design refinements and accessibility audit
- Automated testing (unit, integration, E2E)
- CI/CD pipeline and deployment infrastructure
- Performance optimization and security hardening

### Out of Scope
- Native mobile applications (iOS/Android)
- GPS/AVL real-time vehicle tracking integration
- Parent-facing portal
- Integration with Student Information Systems (SIS)
- Advanced AI/ML incident prediction
- Multi-district/multi-tenant architecture
- Offline-first/PWA capabilities
- Legacy data migration from existing systems

### Technical Assumptions
| Layer | Technology |
|-------|-----------|
| Frontend | React 18+, TypeScript, Tailwind CSS v4, Tyler Forge 3.x components |
| Backend/Database | Supabase (PostgreSQL, Auth, Realtime, Storage, Edge Functions) |
| Hosting | Vercel or Netlify (frontend), Supabase Cloud (backend) |
| Authentication | Supabase Auth (email/password + SSO consideration) |
| File Storage | Supabase Storage |
| Real-time | Supabase Realtime (WebSocket channels) |
| Notifications | Supabase Edge Functions + SendGrid/Twilio |
| CI/CD | GitHub Actions |
| Monitoring | Sentry (error tracking), Supabase Dashboard (DB monitoring) |

---

## 3. Major Phases

| # | Phase | Duration | Overlap |
|---|-------|----------|---------|
| 1 | Requirements Finalization | 2 weeks | — |
| 2 | Architecture & Technical Design | 3 weeks | Overlaps Phase 1 by 1 week |
| 3 | UX/UI Refinement | 3 weeks | Overlaps Phase 2 by 1 week |
| 4 | Backend/API Development | 8 weeks | Starts after Phase 2 |
| 5 | Frontend Development | 8 weeks | Overlaps Phase 4 by 6 weeks |
| 6 | Integrations | 4 weeks | Overlaps Phase 5 by 2 weeks |
| 7 | QA & Testing | 6 weeks | Overlaps Phase 6 by 2 weeks |
| 8 | Performance & Security Hardening | 3 weeks | Overlaps Phase 7 by 1 week |
| 9 | Deployment & Launch | 2 weeks | After Phase 8 |
| 10 | Post-Launch Stabilization | 4 weeks | After Phase 9 |

**Total Elapsed Time:** ~28 weeks (with phase overlaps)

---

## 4. Work Plan

### Phase 1: Requirements Finalization (Weeks 1–2)

**Key Activities:**
- Review and validate all 67 user stories with stakeholders
- Prioritize user stories into MVP vs. Post-MVP
- Define acceptance criteria for each MVP story
- Confirm technical assumptions and integration requirements
- Establish data dictionary and domain model

**Deliverables:**
- Prioritized product backlog (MVP scope locked)
- Acceptance criteria document
- Signed-off data dictionary

**Dependencies:** Stakeholder availability for review sessions

**Effort:** 2 weeks · Product Manager, Designer, Tech Lead

---

### Phase 2: Architecture & Technical Design (Weeks 2–4)

**Key Activities:**
- Design Supabase database schema (tables, relationships, indexes, RLS policies)
- Define API contract (endpoints, request/response shapes)
- Plan authentication flow and role-permission matrix
- Design real-time messaging architecture
- Define file storage structure and upload workflows
- Create technical design document

**Deliverables:**
- Database ERD and migration scripts
- API specification document
- Auth & RBAC design document
- Technical architecture diagram

**Dependencies:** Finalized data dictionary from Phase 1

**Effort:** 3 weeks · Tech Lead, Backend Engineer, Frontend Engineer

---

### Phase 3: UX/UI Refinement (Weeks 4–6)

**Key Activities:**
- Accessibility audit of existing prototype (WCAG 2.1 AA)
- Refine error states, loading states, and empty states
- Design notification UI patterns
- Finalize responsive breakpoint behavior
- Create/update component library documentation
- Validate designs against Tyler Forge 3.x standards

**Deliverables:**
- Updated design specs with all states documented
- Accessibility remediation plan
- Finalized responsive design specifications

**Dependencies:** None (can work from existing prototype)

**Effort:** 3 weeks · Designer, Frontend Engineer

---

### Phase 4: Backend/API Development (Weeks 5–12)

**Key Activities:**
- Set up Supabase project (database, auth, storage, realtime)
- Implement database schema and seed data
- Configure Row Level Security (RLS) policies for all tables
- Build Edge Functions for business logic:
  - Workflow auto-assignment engine
  - Notification dispatch (email/SMS triggers)
  - Report generation
- Implement file upload endpoints
- Set up real-time channels for messaging
- Write backend unit tests

**Deliverables:**
- Production database with RLS policies
- Functional API layer (tested independently)
- Workflow engine with assignment rules
- Real-time messaging infrastructure
- Backend test suite (>80% coverage)

**Dependencies:** Database schema from Phase 2

**Effort:** 8 weeks · Backend Engineer (2), Tech Lead (part-time)

**Key Tables:**
| Table | Purpose |
|-------|---------|
| `users` / `profiles` | User accounts and role assignments |
| `incidents` | Core incident records |
| `incident_workflows` | Workflow assignments and status tracking |
| `students` | Student directory |
| `vehicles` | Vehicle fleet inventory |
| `drivers` | Driver profiles and certifications |
| `messages` | Driver-coordinator communications |
| `attachments` | File references for incidents |
| `audit_log` | Change tracking for compliance |

---

### Phase 5: Frontend Development (Weeks 7–14)

**Key Activities:**
- Replace all mock data with Supabase client calls
- Implement authentication UI (login, session management, role switching)
- Connect all 8 pages to live data:
  - Dashboard (real-time metrics and charts)
  - Incidents list (paginated, filtered, sorted)
  - New Incident form (with validation and file upload)
  - Incident detail/edit (with workflow actions)
  - Students, Vehicles, Drivers (CRUD operations)
  - Reports (date-range queries, chart rendering)
  - Driver Communications (real-time messaging)
- Implement loading, error, and empty states
- Add optimistic updates for better UX
- Write component unit tests

**Deliverables:**
- Fully connected frontend application
- Authentication flow with role-based run guards
- Real-time dashboard and messaging
- Frontend test suite

**Dependencies:** API availability from Phase 4 (iterative)

**Effort:** 8 weeks · Frontend Engineer (2), Designer (part-time)

---

### Phase 6: Integrations (Weeks 13–16)

**Key Activities:**
- Email notification integration (SendGrid or similar)
- SMS notification integration (Twilio or similar)
- PDF report generation
- CSV data export
- Configure notification templates and triggers
- Integration testing

**Deliverables:**
- Working email notifications for incident events
- SMS alerts for critical/emergency incidents
- Downloadable PDF reports
- CSV export for all data tables

**Dependencies:** Backend APIs and notification Edge Functions

**Effort:** 4 weeks · Backend Engineer, Frontend Engineer

---

### Phase 7: QA & Testing (Weeks 15–20)

**Key Activities:**
- Execute test cases from QA Testing Guide
- End-to-end testing with Playwright or Cypress
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile/responsive testing on real devices
- Accessibility testing (axe, screen readers)
- Performance testing (Lighthouse, load testing)
- Security testing (OWASP checklist, penetration testing basics)
- User acceptance testing (UAT) with stakeholders
- Bug triage, prioritization, and resolution

**Deliverables:**
- E2E test suite (automated)
- Cross-browser compatibility report
- Accessibility compliance report
- Performance baseline report
- UAT sign-off
- Bug-free MVP (P0/P1 bugs resolved)

**Dependencies:** Feature-complete application from Phases 5–6

**Effort:** 6 weeks · QA Engineer, Frontend Engineer, Backend Engineer

---

### Phase 8: Performance & Security Hardening (Weeks 20–22)

**Key Activities:**
- Bundle size optimization (code splitting, lazy loading)
- Database query optimization (indexes, query plans)
- Implement rate limiting on APIs
- Security audit (RLS policy review, input sanitization, CORS)
- Set up CSP headers
- Configure backup and disaster recovery
- Load testing and stress testing
- Optimize Supabase connection pooling

**Deliverables:**
- Optimized application (Lighthouse score > 90)
- Security audit report
- Rate limiting configuration
- Backup/recovery procedures document

**Dependencies:** Feature-complete, tested application

**Effort:** 3 weeks · Tech Lead, Backend Engineer, DevOps

---

### Phase 9: Deployment & Launch (Weeks 23–24)

**Key Activities:**
- Set up production Supabase project
- Configure production environment variables and secrets
- Set up CI/CD pipeline (GitHub Actions → Vercel/Netlify)
- DNS and SSL configuration
- Deploy to staging → smoke test → deploy to production
- Set up monitoring and alerting (Sentry, uptime checks)
- Prepare rollback procedures
- Create user training materials
- Conduct launch readiness review

**Deliverables:**
- Production deployment (live application)
- CI/CD pipeline (automated)
- Monitoring and alerting dashboards
- User training documentation
- Launch communications

**Dependencies:** All prior phases complete; stakeholder sign-off

**Effort:** 2 weeks · DevOps, Tech Lead, Product Manager

---

### Phase 10: Post-Launch Stabilization (Weeks 25–28)

**Key Activities:**
- Monitor production logs and error rates
- Rapid bug-fix response (SLA: P0 < 4 hours, P1 < 24 hours)
- Performance monitoring and tuning
- Collect user feedback
- Prioritize quick-win improvements
- Conduct retrospective

**Deliverables:**
- Stabilized production application
- Post-launch metrics report
- Prioritized improvement backlog
- Retrospective document

**Dependencies:** Live production environment

**Effort:** 4 weeks · Full team (reduced capacity)

---

## 5. Timeline

**Project Start Date:** March 15, 2026  
**Target Launch Date:** August 24, 2026  
**Post-Launch Stabilization End:** September 26, 2026

| Week | Dates | Phase(s) Active | Milestone |
|------|-------|-----------------|-----------|
| 1 | Mar 15–21 | Requirements Finalization | |
| 2 | Mar 22–28 | Requirements Finalization, Architecture & Design begins | ✅ MVP Scope Locked |
| 3 | Mar 29–Apr 4 | Architecture & Technical Design | |
| 4 | Apr 5–11 | Architecture & Technical Design, UX/UI begins | ✅ Technical Design Complete |
| 5 | Apr 12–18 | UX/UI Refinement, Backend Dev begins | |
| 6 | Apr 19–25 | UX/UI Refinement wraps, Backend Dev | ✅ Design Specs Finalized |
| 7 | Apr 26–May 2 | Backend Dev, Frontend Dev begins | |
| 8 | May 3–9 | Backend Dev, Frontend Dev | |
| 9 | May 10–16 | Backend Dev, Frontend Dev | |
| 10 | May 17–23 | Backend Dev, Frontend Dev | |
| 11 | May 24–30 | Backend Dev, Frontend Dev | |
| 12 | May 31–Jun 6 | Backend Dev wraps, Frontend Dev | ✅ Core APIs Complete |
| 13 | Jun 7–13 | Frontend Dev, Integrations begin | |
| 14 | Jun 14–20 | Frontend Dev wraps, Integrations | ✅ Frontend Feature Complete |
| 15 | Jun 21–27 | Integrations, QA & Testing begins | |
| 16 | Jun 28–Jul 4 | Integrations wrap, QA & Testing | ✅ All Integrations Complete |
| 17 | Jul 5–11 | QA & Testing | |
| 18 | Jul 12–18 | QA & Testing | |
| 19 | Jul 19–25 | QA & Testing | ✅ UAT Sign-Off |
| 20 | Jul 26–Aug 1 | QA & Testing wraps, Hardening begins | |
| 21 | Aug 2–8 | Performance & Security Hardening | |
| 22 | Aug 9–15 | Performance & Security Hardening wraps | ✅ Security Audit Passed |
| 23 | Aug 16–22 | Deployment & Launch prep | |
| 24 | Aug 23–29 | Deployment & Launch | 🚀 **PRODUCTION LAUNCH** |
| 25 | Aug 30–Sep 5 | Post-Launch Stabilization | |
| 26 | Sep 6–12 | Post-Launch Stabilization | |
| 27 | Sep 13–19 | Post-Launch Stabilization | |
| 28 | Sep 20–26 | Post-Launch Stabilization wraps | ✅ Stabilization Complete |

### Gantt Overview

```
Week:  1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25   26   27   28
       ├─────────┤
       Requirements
            ├──────────────┤
            Architecture & Design
                      ├──────────────┤
                      UX/UI Refinement
                           ├──────────────────────────────────────────────┤
                           Backend/API Development
                                     ├──────────────────────────────────────────────┤
                                     Frontend Development
                                                                         ├──────────────────────┤
                                                                         Integrations
                                                                                   ├────────────────────────────────┤
                                                                                   QA & Testing
                                                                                                          ├──────────────┤
                                                                                                          Perf & Security
                                                                                                                    ├─────────┤
                                                                                                                    Launch
                                                                                                                              ├──────────────────────┤
                                                                                                                              Stabilization
```

---

## 6. Effort & Resourcing

### Overall Effort Estimate
**Size:** Large  
**Total Team-Weeks:** ~104 team-weeks  
**Total Calendar Time:** 28 weeks (24 to launch + 4 stabilization)

### Suggested Team Composition

| Role | Count | Allocation | Phase Involvement |
|------|-------|------------|-------------------|
| Product Manager | 1 | 50% | Phases 1, 7, 9, 10 |
| UX/UI Designer | 1 | 50% | Phases 3, 5, 7 |
| Tech Lead | 1 | 75% | Phases 2, 4, 8, 9 |
| Frontend Engineer | 2 | 100% | Phases 3, 5, 6, 7 |
| Backend Engineer | 2 | 100% | Phases 4, 6, 7, 8 |
| QA Engineer | 1 | 75% | Phases 7, 8, 9 |
| DevOps Engineer | 1 | 25% | Phases 8, 9 |

**Minimum Viable Team:** 5 people (1 PM/Designer combo, 1 Tech Lead, 2 Full-Stack Engineers, 1 QA)

### Effort Breakdown by Phase

| Phase | Effort (team-weeks) |
|-------|---------------------|
| Requirements Finalization | 4 |
| Architecture & Technical Design | 6 |
| UX/UI Refinement | 6 |
| Backend/API Development | 20 |
| Frontend Development | 20 |
| Integrations | 8 |
| QA & Testing | 18 |
| Performance & Security | 8 |
| Deployment & Launch | 6 |
| Post-Launch Stabilization | 8 |
| **Total** | **~104 team-weeks** |

---

## 7. Risks & Mitigation

| # | Risk | Likelihood | Impact | Mitigation Strategy |
|---|------|-----------|--------|---------------------|
| 1 | **Scope creep during development** — Stakeholders request features beyond MVP | High | High | Lock MVP scope in Phase 1 with signed-off backlog. Defer all non-MVP items to a Phase 2 release. Use a strict change request process. |
| 2 | **Supabase RLS complexity** — Row Level Security policies may be difficult to configure correctly for multi-role access | Medium | High | Dedicate specific time in Phase 4 for RLS design and testing. Create a comprehensive test matrix for all role/data combinations. |
| 3 | **Real-time messaging reliability** — WebSocket connections may be unreliable on school district networks | Medium | Medium | Implement fallback polling mechanism. Test on representative network configurations. Add connection status indicators in UI. |
| 4 | **Data migration from existing processes** — Districts may have incident data in spreadsheets or legacy systems | Medium | Medium | Keep out of MVP scope but document migration pathways. Provide CSV import tooling as a fast-follow feature. |
| 5 | **Integration dependencies** — Email/SMS providers (SendGrid, Twilio) require account setup and API key management | Low | Medium | Begin vendor setup in Phase 1. Use sandbox/test modes during development. Have fallback providers identified. |
| 6 | **Team availability and knowledge gaps** — Supabase-specific expertise may be limited on the team | Medium | Medium | Schedule Supabase training/ramp-up in Week 1. Leverage Supabase documentation and community. Consider Supabase professional support plan. |
| 7 | **Accessibility compliance** — Achieving WCAG 2.1 AA may require significant UI rework | Medium | High | Start accessibility audit early (Phase 3). Use automated tools (axe) continuously during development. Budget additional time in QA phase for remediation. |

---

## Appendix: Key References

| Document | Location |
|----------|----------|
| Product Requirements Document | `/docs/PRODUCT-REQUIREMENTS.md` |
| Design System Documentation | `/docs/DESIGN-SYSTEM.md` |
| Technical Documentation | `/docs/TECHNICAL-DOCUMENTATION.md` |
| Workflow System Documentation | `/docs/WORKFLOW-SYSTEM.md` |
| QA Testing Guide | `/docs/QA-TESTING-GUIDE.md` |
| User Guide | `/docs/USER-GUIDE.md` |
| Features Documentation | `/docs/FEATURES.md` |

---

*This project plan is a starting draft for stakeholder alignment. Estimates should be refined after Phase 1 (Requirements Finalization) when MVP scope is confirmed.*
