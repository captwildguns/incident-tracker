# User Guide Changelog

**Version:** 3.0.0
**Date:** March 17, 2026
**Author:** System (comprehensive documentation refresh)

---

## Latest Updates (v3.0.0) — March 17, 2026

### Workflow Builder Page — UI Refinements (Latest)

| Change | Status | Rationale |
|--------|--------|-----------|
| Removed severity and incident type badge chips from Workflow Builder header | Removed | Cleaner layout; only "System Default Workflow" badge remains for WF-DEFAULT |
| Step Library modal cards simplified | Changed | Cards now show only step name, description, and "+ Add to Workflow" button; icon boxes, category badges, duration badges, and role badges removed |
| Step Library category filter pills condensed | Changed | Pill-shaped buttons without count badges; active pill uses `var(--brand-blue-dark)` background |
| "Add Step from Library" card uses static border | Changed | Solid `1px solid var(--border)` border with `var(--card)` background; no hover effects |
| Workflow severity changed to single value | Changed | Severity is now a single select (not an array); displayed as one badge in the table; auto-populates from incident type's default severity |
| Usage column removed from Workflows page | Removed | Removed from both table and KPI stats cards |

### Administration Page (NEW)

| Change | Status | Rationale |
|--------|--------|-----------|
| Full Admin page with three tabs: User Roles, Email Templates, Incident Types | Added | System configuration capabilities for administrators |
| User Roles tab: full CRUD table with search, role filter, KPI summary cards for 7 roles | Added | Manage Safety Coordinator, Administrator, School Principal, Driver, Fleet Manager, Nurse, Mechanic |
| Email Templates tab: create, edit, duplicate, preview, delete notification templates | Added | 10 system-default templates with `{{variable}}` placeholders |
| Incident Types tab: full CRUD for 47 incident types with search, category/applicableTo filters | Added | Manage student (29) and driver (18) types; "Applies To" only offers "Student" or "Driver" |

### Email Template System

| Change | Status | Rationale |
|--------|--------|-----------|
| Shared email templates data file (`/data/email-templates.ts`) | Added | Single source of truth for Admin and workflow configuration |
| 10 system-default templates covering all workflow scenarios | Added | Default Notification, Urgent Action Required, Approval Request, Status Update, Completion Notice, Custom Template, Parent/Guardian Notification, Escalation Notice, Follow-up Reminder, Corrective Action / Retraining Notice |
| Configure Step modal email template dropdown tied to Admin templates | Enhanced | Template options now sourced from Admin Email Templates tab |
| Template description and Admin link shown below dropdown | Enhanced | Users see template description and know where to manage templates |

### Incident Types

| Change | Status | Rationale |
|--------|--------|-----------|
| 47 incident types: 29 student, 18 driver across 10 categories | Documented | Full taxonomy defined in `IncidentTypes.ts` |
| "Applies To" dropdown: only "Student" or "Driver" | Changed | Removed "Both" option from Add/Edit Incident Type dialog |

### Workflow System

| Change | Status | Rationale |
|--------|--------|-----------|
| 17 pre-configured workflows (WF-001 through WF-019 + WF-DEFAULT) | Documented | Covers all 47 incident types with two-pass matching |
| Create Workflow requires selecting specific incident type from full list | Enhanced | Grouped by student vs. driver categories |
| Step progression is exclusively manual | Clarified | Users click "Complete this step" — no automated triggers |
| Configure Step modal: 3 tabs (General, Notifications, Approvals) | Documented | Full step configuration documentation |

### Help & Support Page

| Change | Status | Rationale |
|--------|--------|-----------|
| Complete rewrite of HelpPage.tsx | Rewritten | Previous content had incorrect incident types, missing Admin docs, wrong workflow names |
| Getting Started: updated overview, navigation (includes Admin tab), 7 user roles | Updated | Reflects current application state |
| User Guide: added Administration section with all 3 tabs | Added | User Roles, Email Templates, Incident Types fully documented |
| User Guide: accurate 47 incident types listed by category | Updated | Replaced old generic list with actual types from IncidentTypes.ts |
| User Guide: all 17+ workflows listed by ID and name | Updated | Replaced generic workflow names with actual WF-001 through WF-DEFAULT |
| User Guide: workflow step configuration (3-tab modal) documented | Added | General, Notifications, Approvals tabs explained |
| User Guide: email template integration documented | Added | 10 templates, variable placeholders, workflow connection |
| FAQ: added Admin-related questions | Added | Email templates, incident types, user roles management |
| FAQ: updated workflow questions with two-pass matching, manual progression | Updated | Accurate system behavior |
| All text uses `var(--forge-font-family)` | Updated | Design system compliance |

### Documentation Files

| Change | Status | Rationale |
|--------|--------|-----------|
| CHANGELOG.md updated to v3.0.0 | Updated | Comprehensive change tracking |
| FEATURES.md: Admin section added | Updated | Documents Admin page features |
| All corresponding HTML files regenerated | Updated | Matches markdown content |

---

## Previous Updates (v2.1.0) — March 11, 2026

### Reports Page Enhancements

| Change | Status | Rationale |
|--------|--------|-----------|
| Weekly Trends Analysis transformed to dashboard view | Enhanced | Now shows actual trend visualizations instead of table format |
| Added week-over-week comparison metrics | Added | Shows current week, last week, high severity trends, and 4-week average |
| Added Weekly Incident Trend line chart | Added | Displays total incidents and high severity incidents over time |
| Added This Week by Type breakdown | Added | Top 5 incident types with progress bars |
| Added Severity Distribution by Week stacked bar chart | Added | Shows High/Medium/Low severity distribution across weeks |
| Added Key Insights section | Added | Automated insights for significant increases/decreases and most common types |
| Vehicle Incident Report column structure updated | Changed | Removed Student column, moved Driver column after Date (matches Driver Report Summary) |
| Fixed React key warnings in charts | Fixed | Added unique IDs to LineChart and BarChart data points |

### Communications Page

| Change | Status | Rationale |
|--------|--------|-----------|
| Added "Unread" filter option | Added | Allows filtering communications by unread status |

### Incidents Page

| Change | Status | Rationale |
|--------|--------|-----------|
| Made table rows clickable | Enhanced | Improved navigation to incident details |
| Fixed Figma inspector props warnings | Fixed | Applied `filterFigmaProps` utility function |

### Vehicles Page

| Change | Status | Rationale |
|--------|--------|-----------|
| Full pagination support for 15 vehicles | Added | Complete pagination implementation |
| Made table rows clickable | Enhanced | Improved navigation to vehicle details |

---

## Summary

The User Guide was updated from v1.0.0 to v2.0.0 to reconcile with the actual product implementation. Major changes include:

- **4 screens added** (Workflows, Workflow Builder, Help & Support, Notifications)
- **8 screens edited** (Dashboard, Incidents, Incident Detail, New Incident, Students, Drivers, Communications, Reports)
- **1 screen unchanged** (Vehicles - minor field metadata additions only)
- **All sample data rows removed** per documentation policy; replaced with field-level metadata
- **Field definitions expanded** to include type, format, validation, source, and representative example
- **Per-screen template applied** with screen metadata, change tracking, visual states, fields table, buttons table, tabs, modals, and workflows

---

## Detailed Changes

### Section 1: Introduction
| Change | Status | Rationale |
|--------|--------|-----------|
| Updated capabilities list | Edited | Added workflows, dual incident categories (student/driver), role-based triage |
| Added Primary User Roles table | Added | Documents role-based access not in original |

### Section 2: Getting Started
| Change | Status | Rationale |
|--------|--------|-----------|
| Default page changed from Dashboard to Incidents | Edited | `App.tsx` initializes `useState('incidents')` |
| Navigation items updated | Edited | Removed "New Incident" from nav (accessed via Incidents page); added Workflows and Help |
| Added Term Context Bar documentation | Added | Dark top bar showing school year was undocumented |
| Added Slideout Navigation details | Added | Hamburger toggle behavior was undocumented |

### Section 3: Dashboard
| Change | Status | Rationale |
|--------|--------|-----------|
| Removed: 4 metric cards (Total/Active/Critical/Avg Response Time) | Removed | Not present in current dashboard |
| Added: My Incidents section | Added | Role-based triage showing user's assigned incidents |
| Added: Needs Attention queue | Added | Priority-sorted triage for oldest unresolved items |
| Added: Unanswered Driver Communications | Added | Driver messages awaiting coordinator response |
| Added: Action dropdown menus per incident | Added | View/Edit/Reassign/Mark Resolved actions |
| Added: Reassign dialog | Added | Modal for reassigning incidents to other coordinators |
| Changed: Pie chart categories | Edited | Was 5 generic types → now 6 categories from IncidentTypes.ts |
| Changed: Bar chart from "by School" to "by Driver" | Edited | Actual product shows incidents by driver |
| Added: Incidents by Day of Week chart | Added | Bar chart showing Mon-Fri distribution |
| Removed: Incident Trends line chart | Removed | Not present in current dashboard |
| Removed: Recent Incidents Timeline | Removed | Replaced by My Incidents + Needs Attention sections |

### Section 4: Incidents List
| Change | Status | Rationale |
|--------|--------|-----------|
| Status values changed | Edited | Was: Open/Under Review/Resolved/Closed → Now: Open/In Progress/Closed |
| Type filter expanded | Edited | Was 5 types → now 35+ types via autocomplete |
| Added: Assigned To filter | Added | Autocomplete filter by staff member |
| Added: Communication indicator column | Added | Blue MessageSquare icon for active threads |
| Added: Workflow indicator column | Added | GitBranch icon for assigned workflows |
| Changed: Row click behavior | Edited | Was: opens dialog → Now: navigates to full Incident Detail page |
| Added: Workflow auto-assignment on navigation | Added | System assigns workflow when viewing incident detail |
| Sample data rows removed | Removed | Per documentation policy |

### Section 5: Incident Detail Page
| Change | Status | Rationale |
|--------|--------|-----------|
| Changed from dialog to full page | Edited | Major structural change |
| Added 6 tabs | Added | Overview, Workflow, History, Photos, Documents, Communications |
| Added workflow step management | Added | Complete, Approve, Start workflow actions |
| Added approval dialog | Added | Modal for approving workflow steps |
| Added inline messaging | Added | Communications tab with message thread |
| Added incident-to-incident navigation | Added | Previous/Next buttons for browsing filtered list |
| Removed: Witnesses section | Edited | Witness info captured in New Incident form but not displayed in detail |
| Removed: Export as PDF option | Removed | Not implemented in current build |

### Section 6: New Incident Form
| Change | Status | Rationale |
|--------|--------|-----------|
| Changed from 5-step wizard to single-page form | Edited | Major structural change |
| Added: Category selection (Student/Driver) | Added | Determines available types and location options |
| Changed: 5 generic types → 35+ specific types | Edited | From IncidentTypes.ts registry |
| Added: Student autocomplete with photo | Added | Command component with avatar display |
| Added: Driver autocomplete with photo | Added | Command component with avatar display |
| Added: Address autocomplete with map | Added | Google Places-style lookup + IncidentLocationMap |
| Added: Photo upload section | Added | Multi-file upload with thumbnail preview |
| Added: Document upload section | Added | Multi-file upload with type icons |
| Added: Auto-severity from incident type | Added | defaultSeverity populated from IncidentTypes.ts |
| Added: Context-dependent location options | Added | Student vs driver locations differ |
| Removed: 5-step wizard navigation | Removed | Not implemented |
| Removed: Auto-save feature | Removed | Not implemented |
| Removed: Save as Draft | Removed | Not implemented |
| Removed: Tags field | Removed | Not implemented |
| Removed: Internal Notes field | Removed | Not implemented |
| Removed: Follow-up Required section | Removed | Not implemented |
| Removed: Injury Information section | Removed | Not implemented as separate section |
| Removed: Character counter | Removed | Not implemented |

### Section 7: Student Management
| Change | Status | Rationale |
|--------|--------|-----------|
| Changed: Grade filter → School filter | Edited | Autocomplete multi-select for schools instead of K-12 dropdown |
| Removed: Contact column from table | Edited | Phone not shown in table; only in detail |
| Changed: Detail view is dialog not page | Edited | Matches implementation |
| Removed: Date of birth from detail | Edited | Not in student data model |
| Removed: Emergency information from detail | Edited | Not in student data model |
| Removed: Contact information section from detail | Edited | Not in student data model |
| Removed: Transportation details (pickup/dropoff) from detail | Edited | Not in student data model |

### Section 8: Driver Management
| Change | Status | Rationale |
|--------|--------|-----------|
| Changed: Safety Rating from numeric (★/5.0) to text label | Edited | Actual: Good/Excellent/Needs Improvement |
| Added: Performance Score (0-100) | Added | Percentage-based performance metric |
| Added: On-Time Percentage | Added | Timeliness tracking |
| Added: Default Garage | Added | Storage location assignment |
| Added: Medical Exam Expiry | Added | Compliance tracking |
| Added: Background Check Expiry | Added | Compliance tracking |
| Added: Endorsements list | Added | CDL endorsement details |
| Removed: Employment type (Full-time/Part-time) | Removed | Not in data model |
| Removed: Department field | Removed | Not in data model |
| Removed: Commendations field | Removed | Not in data model |
| Removed: Last evaluation date | Removed | Not in data model |

### Section 9: Fleet Management (Vehicles)
| Change | Status | Rationale |
|--------|--------|-----------|
| No structural changes | Unchanged | Vehicles page matches original guide closely |
| Added: Field-level metadata per template | Added | Format, validation, source for all fields |

### Section 10: Driver Communications
| Change | Status | Rationale |
|--------|--------|-----------|
| Changed: From generic comms table to incident-centric messaging | Edited | Major structural change |
| Added: Two-panel layout (list + thread) | Added | Matches implementation |
| Added: Message status tracking (sent/delivered/read) | Added | Per-message delivery status |
| Added: Coordinator/driver role in messages | Added | senderRole field distinguishes message sources |
| Removed: Communication Type (Email/Phone/In-Person/Text) | Removed | All communications are in-app messages |
| Removed: Subject field | Removed | Not in data model |
| Removed: Priority field | Removed | Uses incident severity instead |
| Removed: Driver Filter dropdown | Removed | Not implemented as separate filter |
| Removed: Date Range filter | Removed | Not implemented |
| Removed: Templates | Removed | Not implemented |
| Removed: Print conversation | Removed | Not implemented |

### Section 11: Reports
| Change | Status | Rationale |
|--------|--------|-----------|
| Changed: 5 quick reports → 8 quick reports | Edited | Additional report types added |
| Removed: Custom Report Builder | Removed | Not implemented (planned future) |
| Removed: Analytics Dashboard | Removed | Not implemented (planned future) |
| Removed: Scheduled Reports | Removed | Not implemented (planned future) |
| Removed: Heat Maps | Removed | Not implemented (planned future) |
| Added: Report preview dialog | Added | Inline table preview before export |

### Sections 12-15: New Sections
| Section | Status | Rationale |
|---------|--------|-----------|
| 12. Workflows | Added | Major feature not in original |
| 13. Workflow Builder | Added | Major feature not in original |
| 14. Help & Support | Added | Page exists but undocumented |
| 15. Notifications | Added | Component exists but undocumented |

### Sections 16-28: System-wide Sections
| Section | Status | Rationale |
|---------|--------|-----------|
| 16. Global UI Components | Added | Component library reference |
| 17. Search, Filters & Table Behavior | Added | Unified documentation of shared behaviors |
| 18. Incident Lifecycle | Edited | Updated from 4 to 3 statuses |
| 19. Workflow System Reference | Added | Assignment logic and pre-configured workflows |
| 20. Notifications & Integrations | Added | Trigger documentation |
| 21. Audit & Logs | Added | Audit event documentation |
| 22. Security & Permissions | Added | RBAC matrix |
| 23. Design Tokens & Branding | Added | CSS custom properties reference |
| 24. Accessibility & Localization | Added | ARIA patterns and keyboard navigation |
| 25. Developer Notes | Added | Known limitations and production requirements |
| 26. Glossary | Edited | Expanded with new terms |
| 27. Appendix: Status & Severity | Edited | Updated to match actual values |
| 28. Tips & Best Practices | Edited | Updated for new features |

---

## TODO Items

Items marked `TODO: confirm` in the guide requiring stakeholder verification:

1. **Read-Only / Viewer role** - role not yet implemented; confirm if planned
2. **Mobile responsive behavior** - confirm breakpoints and mobile-specific layouts
3. **Save Draft functionality** - exists in original guide but not implemented
4. **Workflow rejection flow** - Rejected status exists in enum but no UI flow
5. **Pagination** - confirm if server-side pagination is planned
6. **Saved filter views** - confirm if planned
7. **Email notification delivery** - configuration exists but delivery not confirmed
8. **Webhook notifications** - not implemented; confirm if planned
9. **i18n framework** - all strings hardcoded in English; confirm localization plans
10. **RBAC enforcement** - designed but not enforced in prototype
11. **Audit log viewer** - data tracked but no dedicated UI screen
12. **Custom Report Builder** - confirm Phase 2 timeline
13. **Scheduled Reports** - confirm Phase 2 timeline

---

## Files Delivered

| File | Purpose |
|------|---------|
| `/docs/Incidents-User-Guide-original.md` | Preserved original v1.0.0 |
| `/docs/USER-GUIDE.md` | Updated v2.0.0 comprehensive guide (29 sections) |
| `/docs/html/USER-GUIDE.html` | Updated HTML version (single-file, responsive, sidebar TOC) |
| `/docs/screens.json` | Programmatically parseable screen metadata (13 screens) |
| `/docs/workflows.json` | Workflow definitions, schemas, and trigger types |
| `/docs/CHANGELOG.md` | This file - detailed change log |
| `/docs/changes.json` | Structured change data (23 changes) for automation |
| `/docs/screens/README.md` | Per-screen documentation index |
| `/docs/screens/dashboard.md` | Dashboard screen documentation |
| `/docs/screens/incidents.md` | Incidents List screen documentation |
| `/docs/screens/incident-detail.md` | Incident Detail Page documentation |
| `/docs/screens/new-incident.md` | New Incident Form documentation |
| `/docs/screens/students.md` | Student Management screen documentation |
| `/docs/screens/drivers.md` | Driver Management screen documentation |
| `/docs/screens/vehicles.md` | Fleet Management screen documentation |
| `/docs/screens/communications.md` | Communications screen documentation |
| `/docs/screens/reports.md` | Reports screen documentation |
| `/docs/screens/workflows.md` | Workflows screen documentation |
| `/docs/screens/workflow-builder.md` | Workflow Builder screen documentation |
| `/docs/screens/help.md` | Help & Support screen documentation |
| `/docs/screens/notifications.md` | Notifications component documentation |
| `/docs/html/index.html` | Updated documentation center index |