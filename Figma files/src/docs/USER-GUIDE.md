# Student Transportation Incident Tracker - User Guide

**Version:** 3.0.0
**Last Updated:** March 17, 2026
**For Support:** Contact your district transportation department
**Design System:** Tyler Forge 3.x
**Previous Version:** [Incidents-User-Guide-original.md](./Incidents-User-Guide-original.md)

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Getting Started](#2-getting-started)
3. [Dashboard](#3-dashboard)
4. [Incidents List](#4-incidents-list)
5. [Incident Detail Page](#5-incident-detail-page)
6. [New Incident Form](#6-new-incident-form)
7. [Student Management](#7-student-management)
8. [Driver Management](#8-driver-management)
9. [Fleet Management (Vehicles)](#9-fleet-management-vehicles)
10. [Driver Communications](#10-driver-communications)
11. [Reports](#11-reports)
12. [Workflows](#12-workflows)
13. [Workflow Builder](#13-workflow-builder)
14. [Help & Support](#14-help--support)
15. [Notifications](#15-notifications)
16. [Global UI Components](#16-global-ui-components)
17. [Search, Filters & Table Behavior](#17-search-filters--table-behavior)
18. [Incident Lifecycle & State Diagram](#18-incident-lifecycle--state-diagram)
19. [Workflow System Reference](#19-workflow-system-reference)
20. [Incident Type Taxonomy](#20-incident-type-taxonomy)
21. [Notifications & Integrations](#21-notifications--integrations)
22. [Audit & Logs](#22-audit--logs)
23. [Security & Permissions](#23-security--permissions)
24. [Design Tokens & Branding](#24-design-tokens--branding)
25. [Accessibility & Localization](#25-accessibility--localization)
26. [Developer Notes](#26-developer-notes)
27. [Glossary](#27-glossary)
28. [Appendix: Status & Severity Definitions](#28-appendix-status--severity-definitions)
29. [Tips & Best Practices](#29-tips--best-practices)

---

## 1. Introduction

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | N/A (system-wide) |
| **Status** | Edited |
| **Rationale** | Updated capabilities list; added role-based context |

### Purpose

The Student Transportation Incident Tracker is your comprehensive tool for managing all incidents that occur during student transportation. Built on the Tyler Forge design system and integrated into Student Transportation (powered by Traversa), the system helps safety coordinators, supervisors, and administrators track behavioral incidents, manage workflows, communicate with drivers, monitor fleet vehicles, and generate reports.

### What Can You Do?

- **Track Incidents:** Record and monitor student and driver incidents across 10 categories and 47 specific types (29 student, 18 driver)
- **Personal Triage:** Dashboard shows your assigned incidents, priority queue, and unanswered driver messages
- **Manage Students:** View student profiles and their incident histories
- **Monitor Fleet:** Track vehicle status, maintenance, GPS/AVL, and incidents
- **Oversee Drivers:** Manage driver information, certifications, safety ratings, and performance scores
- **Manage Workflows:** Create, configure, and execute multi-step workflow templates that auto-assign based on incident type and severity
- **Administer System:** Manage user roles (7 types), email notification templates (10 defaults), and incident types via the Admin page
- **Generate Reports:** Run 8 quick reports with preview and CSV export
- **Communicate:** Incident-linked messaging hub between coordinators and drivers
- **Get Help:** In-app help center with Getting Started, User Guide, and FAQ

### Primary User Roles

| Role | Description | Access |
|------|-------------|--------|
| **Safety Coordinator** | Primary user - manages incidents, communicates with drivers, runs reports | Full CRUD on assigned incidents; messaging; reports |
| **Supervisor** | Oversees coordinators; manages workflows and templates | All coordinator access + workflow management + reassignment |
| **Administrator** | System configuration and compliance oversight | Full access including workflow builder and system settings |
| **Read-Only / Viewer** | TODO: confirm - role not yet implemented | View-only access to dashboards and reports |

---

## 2. Getting Started

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Application Shell / AppLayout |
| **Screen Slug** | N/A (persistent layout) |
| **Status** | Edited |
| **Rationale** | Default view changed from Dashboard to Incidents; navigation items reordered; Term Context Bar and slideout documented |

### Accessing the System

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Navigate to the application URL provided by your district
3. The application loads showing the **Incidents page** as the default view

> **Change from v1.0.0:** The original guide stated Dashboard was the default view. The application initializes to the Incidents page.

### Term Context Bar

A dark bar at the very top of the application displays the active school year context (e.g., "2024-25 School Year"). This is a read-only system indicator.

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| schoolYear | School Year | read-only string | Y | Current active term | Format: `YYYY-YY School Year` | Server / system config | `2024-25 School Year` |

### Navigation

The application uses a Tyler Forge header with two navigation systems:

#### Top Navigation Tabs

Horizontal tab bar below the header provides quick access:

| Tab | Route | Icon | Purpose |
|-----|-------|------|---------|
| Dashboard | `dashboard` | Home | Personal triage and analytics |
| Incidents | `incidents` | AlertCircle | Incident list and management |
| Students | `students` | Users | Student roster and history |
| Drivers | `drivers` | UserCircle | Driver roster and performance |
| Vehicles | `vehicles` | Bus | Fleet management |
| Communications | `communications` | MessageSquare | Incident messaging |
| Reports | `reports` | FileText | Quick reports and export |
| Workflows | `workflows` | GitBranch | Workflow template management |
| Admin | `admin` | Shield | User roles, email templates, incident types |

> **Change from v1.0.0:** "New Incident" is no longer a navigation tab. Access it via the **+ New Incident** button on the Incidents page. Workflows and Admin tabs are new.

#### Hamburger Slideout Menu

Click the **hamburger icon** (three horizontal lines) in the top-left header to toggle a dark slideout panel. The slideout contains:

- User profile section (name, role, avatar)
- All navigation items listed vertically
- Active page is highlighted with `--forge-slideout-active` background

| Visual State | Description |
|-------------|-------------|
| **Default** | Slideout closed; hamburger icon visible |
| **Open** | Slideout panel slides in from left with dark background (`--forge-slideout-bg: #2a2a2a`) |

#### Header Right Section

- **Global Search** - Input field for quick searching across data
- **Help Icon** (?) - Navigates to Help & Support page
- **Notifications Bell** - Opens notifications popover (see [Section 15](#15-notifications))
- **Profile Avatar** - Dropdown menu with profile info and sign-out option

### Keyboard Navigation

| Shortcut | Action |
|----------|--------|
| Tab | Move between interactive elements |
| Enter | Activate buttons, submit forms |
| Escape | Close dialogs, popovers, dropdowns |
| Ctrl/Cmd + F | Browser search on current page |

---

## 3. Dashboard

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Dashboard |
| **Screen Slug / Path** | `dashboard` |
| **Purpose** | Personalized command center showing assigned incidents, triage queue, unanswered driver messages, and analytics charts |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Source Reference** | [Original: Dashboard](#) |
| **Status** | Edited |
| **Rationale** | Complete redesign from informational metrics to role-based triage with My Incidents, Needs Attention, and Unanswered Communications |

![Wireframe - Dashboard 1440x900](INSERT_IMAGE_HERE)

### Change Detail

**Original:** 4 metric cards (Total/Active/Critical/Avg Response Time); Incident Trends line chart; Incidents by Type pie chart (5 generic types); Incidents by School bar chart; Recent Incidents Timeline.

**Updated:** My Incidents section; Needs Attention priority queue; Unanswered Driver Communications; Incidents by Type pie chart (6 categories from IncidentTypes.ts); Incidents by Driver bar chart; Incidents by Day of Week bar chart; action dropdown menus per incident card; Reassign dialog.

### Visual States

| State | Description |
|-------|-------------|
| **Default** | All sections populated with current data |
| **Loading** | TODO: confirm - no loading skeleton implemented in prototype |
| **Empty - My Incidents** | Section hidden when `myIncidents.length === 0` |
| **Empty - Needs Attention** | No items needing attention; section not rendered |
| **Empty - Unanswered Comms** | Section not rendered when no unanswered messages |
| **Responsive** | Stacks vertically on smaller viewports; charts resize via `ResponsiveContainer` |

### Sections

#### 3.1 My Incidents

Displays incidents assigned to the currently logged-in user, sorted by priority (critical > high > medium) then by age (oldest first). Shows the top 3 most urgent.

| Field Name | Label | Type | Required | Default | Placeholder | Validation Rules / Constraints | Help Text | Source | Example |
|------------|-------|------|----------|---------|-------------|-------------------------------|-----------|--------|---------|
| myIncidentsBadge | My Incidents Count | read-only integer | Y | computed | -- | >= 0 | Count of incidents assigned to you | computed: `needsAttention.filter(assignedTo === currentUser).length` | `12` |
| id | Incident ID | read-only string | Y | -- | -- | Regex `^INC-\d{4}-\d{4}$`, max 13 chars | Unique incident identifier | server | `INC-2025-0044` |
| student | Student Name | read-only string | Y | -- | -- | max 100 chars | Student involved | server | `Christopher Adams` |
| type | Incident Type | read-only string | Y | -- | -- | Must match INCIDENT_TYPES registry (35+ values) | Category of incident | server | `Physical Altercation` |
| bus | Vehicle | read-only string | Y | -- | -- | Format: `Bus ##` or `Vehicle ##` | Bus/vehicle involved | server | `Bus 15` |
| priority | Priority Level | read-only enum | Y | -- | -- | `critical` / `high` / `medium` | Computed triage priority | computed from severity + status + age | `critical` |
| time | Time Since Report | read-only string | Y | -- | -- | Relative time format | How long since report filed | computed | `5 mins ago` |
| actionNeeded | Recommended Action | read-only string | Y | -- | -- | max 200 chars | Suggested next step | computed | `Contact parents immediately` |
| assignedTo | Assigned To | read-only string | Y | -- | -- | max 100 chars | Staff member responsible | server | `Sarah Williams` |

NOTE: Sample rows removed. See field definitions above for the kind of data stored.

#### 3.2 Needs Attention Queue

Shows the 3 oldest items requiring attention across all staff, sorted by `timeValue` descending (longest waiting first).

Uses the same fields as My Incidents. Priority is color-coded:

| Priority | Background | Border | Badge |
|----------|-----------|--------|-------|
| critical | `bg-red-50` | `border-red-200` | `bg-red-600 text-white` |
| high | `bg-orange-50` | `border-orange-200` | `bg-orange-600 text-white` |
| medium | `bg-amber-50` | `border-amber-200` | `bg-amber-600 text-white` |

#### 3.3 Unanswered Driver Communications

Shows driver messages awaiting coordinator response.

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| incidentId | Incident ID | read-only string | Y | -- | Regex `^INC-\d{4}-\d{4}$` | server | `INC-2025-0042` |
| driver | Driver Name | read-only string | Y | -- | max 100 chars | server | `Michael Chen` |
| lastMessage | Last Message | read-only string | Y | -- | max 500 chars | server | `She was trying to talk to friends...` |
| timeSent | Time Sent | read-only string | Y | -- | Time or relative format | server | `10:45 AM` |
| severity | Severity | read-only enum | Y | -- | `Low` / `Medium` / `High` | server | `Medium` |

#### 3.4 Analytics Charts

| Chart Name | Type | Calculation | Categories / Data |
|-----------|------|-------------|-------------------|
| Incidents by Type | PieChart (Recharts) | `COUNT(incidents) GROUP BY category` | Behavioral, Safety Violation, Aggression/Violence, Driver Defiance, Property Damage, Prohibited Items |
| Incidents by Driver | BarChart (Recharts) | `COUNT(incidents) GROUP BY driver ORDER BY count DESC LIMIT 6` | Top 6 drivers by incident count |
| Incidents by Day of Week | BarChart (Recharts) | `COUNT(incidents) GROUP BY dayOfWeek(date)` | Mon, Tue, Wed, Thu, Fri |

Chart colors use brand palette: `#4A6FA5`, `#5B8BB8`, `#6B9BC5`, `#7B8458`, `#8B9264`, `#9FA870`.

### Buttons & Actions

| Button Name | Label | Icon | Type | Enabled Conditions | On Click | Confirmation? | Success / Failure UI |
|------------|-------|------|------|-------------------|----------|---------------|---------------------|
| viewAllMyIncidents | View All My Incidents | ArrowRight | Outline | Always | Navigate to Incidents filtered by `assignedTo=currentUser` and `status=Open` | N | Incidents page loads with filters applied |
| viewDetails | View Details | Eye | Secondary (dropdown) | Always | Navigate to Incident Detail page | N | Detail page loads |
| editIncident | Edit Incident | Edit | Secondary (dropdown) | Always | Opens EditIncidentDialog | N | Dialog opens |
| reassign | Reassign | UserPlus | Secondary (dropdown) | Always | Opens Reassign dialog | N | Dialog opens |
| markResolved | Mark as Resolved | CheckCheck | Secondary (dropdown) | Status is not Closed | Updates status to Resolved | N | Toast: "Incident marked as resolved" |
| respondNow | Respond Now | Send | Primary | Has unanswered communications | Navigate to Communications page with incident pre-selected | N | Communications page loads with thread open |

### Modals / Dialogs

#### Reassign Dialog

| Property | Value |
|----------|-------|
| **Trigger** | "Reassign" dropdown action |
| **Purpose** | Reassign an incident to a different coordinator |
| **Keyboard / ESC** | ESC closes dialog; focus trapped inside |

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| selectedAssignee | Reassign to | select dropdown | Y | "" (empty) | Must select from list | static list: `availableAssignees` | `Sarah Williams` |

| Button | Label | Type | On Click | Confirmation? |
|--------|-------|------|----------|---------------|
| confirm | Reassign | Primary | Updates assignedTo; closes dialog; shows toast | N |
| cancel | Cancel | Ghost | Closes dialog | N |

---

## 4. Incidents List

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Incidents |
| **Screen Slug / Path** | `incidents` |
| **Purpose** | Searchable, filterable, sortable list of all incidents with summary statistics and workflow/communication indicators |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Source Reference** | [Original: Managing Incidents](#) |
| **Status** | Edited |
| **Rationale** | Expanded incident types from 5 to 35+; added Assigned To filter; click opens full page instead of dialog; added communication and workflow indicators; status values changed |

![Wireframe - Incidents List 1440x900](INSERT_IMAGE_HERE)

### Change Detail

**Original:** Status values: Open/Under Review/Resolved/Closed. Type filter: 5 generic types. Row click opens dialog.

**Updated:** Status values: Open/In Progress/Closed. Type filter: 35+ types via autocomplete. Row click navigates to full Incident Detail page with workflow auto-assignment. Communication and workflow indicator icons added.

### Visual States

| State | Description |
|-------|-------------|
| **Default** | Full table with all incidents; statistics cards populated |
| **Loading** | TODO: confirm - no loading state in prototype |
| **Empty (no results)** | Table body shows "No incidents found" message |
| **Filtered** | Active filter badges shown; Clear button enabled |
| **Responsive** | Table scrolls horizontally on narrow viewports |

### Summary Statistics Cards

Four cards at the top computed from the current dataset:

| Metric | Calculation | Example Format |
|--------|-------------|----------------|
| Total Incidents | `incidents.length` | `47` |
| Open | `incidents.filter(status === 'Open').length` | `12` |
| In Progress | `incidents.filter(status === 'In Progress').length` | `8` |
| High Severity | `incidents.filter(severity === 'High').length` | `15` |

NOTE: These are computed aggregates, not sample data. Actual values depend on the live dataset.

### Filter Fields

| Field Name | Label | Type | Required | Default | Placeholder | Validation Rules / Constraints | Help Text | Source | Example |
|------------|-------|------|----------|---------|-------------|-------------------------------|-----------|--------|---------|
| searchQuery | Search | text input | N | `""` | "Search incidents..." | max 200 chars; searches across id, student, driver, description, type | Real-time filtering as you type | user-entered | `INC-2025` |
| statusFilter | Status | select | N | `all` | "All Statuses" | `all` / `Open` / `In Progress` / `Closed` | Filter by workflow status | static list | `Open` |
| severityFilter | Severity | select | N | `all` | "All Severities" | `all` / `Low` / `Medium` / `High` | Filter by severity level | static list | `High` |
| typeFilter | Type | autocomplete (Command) | N | `""` | "Search incident types..." | Must match INCIDENT_TYPES registry | Searchable type selector with 35+ options | INCIDENT_TYPES | `Physical Altercation` |
| assignedToFilter | Assigned To | autocomplete (Command) | N | `""` | "Search staff..." | Must match staff member name | Filter by responsible coordinator | Staff list | `Sarah Williams` |

### Table Columns

| Column | Type | Sortable | Notes |
|--------|------|----------|-------|
| Incident ID | string link | Yes | Click navigates to Incident Detail page |
| Date | date `YYYY-MM-DD` | Yes | Incident date |
| Student | string + avatar | Yes | Student name with circular photo avatar |
| Driver | string | Yes | Reporting/involved driver |
| Vehicle | string | Yes | Bus number |
| Route | string | Yes | Route name |
| Type | string + badge | Yes | Color-coded by category |
| Severity | enum + badge | Yes | Color-coded: High=red, Medium=amber, Low=gray |
| Status | enum + badge | Yes | Color-coded: Open=blue, In Progress=amber, Closed=green |
| Communication | icon indicator | No | Blue MessageSquare icon if active communication thread exists |
| Workflow | icon indicator | No | GitBranch icon if workflow is assigned |

**Sorting behavior:** Click column header to toggle ascending/descending. Visual indicators: ChevronsUpDown (unsorted), ChevronUp (ascending), ChevronDown (descending).

NOTE: Sample rows removed. See field definitions for the kind of data stored.

### Buttons & Actions

| Button Name | Label | Icon | Type | Enabled Conditions | On Click | Confirmation? | Success / Failure UI |
|------------|-------|------|------|-------------------|----------|---------------|---------------------|
| newIncident | + New Incident | Plus | Primary | Always | Navigate to `new-incident` page | N | New Incident form loads |
| exportCSV | Export CSV | Download | Outline | Always | Download currently filtered/sorted data as CSV file | N | File download starts |
| clearFilters | Clear | X | Ghost | Any filter active | Reset all filters to defaults | N | Table shows all incidents |
| rowClick | (row click) | -- | -- | Always | Navigate to Incident Detail page; auto-assigns workflow if missing | N | Detail page loads |

### Workflow Auto-Assignment on Navigation

When a user clicks an incident ID, the system checks if the incident has a workflow assigned. If not, it calls `assignWorkflowToIncident(type, severity)` to match a workflow template. If no template matches, the default workflow (`WF-DEFAULT`) is assigned. The first step is marked Completed (driver immediate action), and the second step is set to In Progress or Pending Approval.

---

## 5. Incident Detail Page

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Incident Detail |
| **Screen Slug / Path** | `incident-detail` |
| **Purpose** | Full-page view of a single incident with tabbed sections for overview, workflow progress, history, photos, documents, and communications |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Source Reference** | [Original: Incident Detail View](#) |
| **Status** | Edited |
| **Rationale** | Changed from dialog to full page with 6 tabs; added workflow management, document viewer, photo viewer, and inline communications |

![Wireframe - Incident Detail 1440x900](INSERT_IMAGE_HERE)

### Change Detail

**Original:** Dialog with Basic Info, Involved Parties, Details, Witnesses, Timeline, Action Buttons, Export PDF.

**Updated:** Full page with tabs: Overview, Workflow, History, Photos, Documents, Communications. Workflow step management (complete, approve, start). Approval dialog. Inline messaging. Incident-to-incident navigation (Previous/Next).

### Tabs

| Tab Name | Purpose | Contents | Default? | Notes |
|----------|---------|----------|----------|-------|
| Overview | Core incident information | Incident metadata, student/driver info, description, severity, status, route, location | Yes | Read-only summary |
| Workflow | Step-by-step workflow progress | Workflow name, progress bar, step list with status indicators, complete/approve actions | No | Interactive workflow management |
| History | Audit trail of changes | Chronological list of status changes, edits, workflow actions | No | Read-only log |
| Photos | Photo evidence gallery | Uploaded incident photos with thumbnails and zoom | No | View-only |
| Documents | Attached documents | Document list with file names, sizes, types, upload dates | No | View-only |
| Communications | Message thread with driver | Conversation thread between coordinator and driver; compose new messages | No | Interactive messaging |

### Header Fields

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| incidentId | Incident ID | read-only string | Y | -- | `^INC-\d{4}-\d{4}$` | server | `INC-2025-0044` |
| status | Status | read-only badge | Y | -- | `Open` / `In Progress` / `Closed` | server | `Open` |
| severity | Severity | read-only badge | Y | -- | `Low` / `Medium` / `High` | server | `High` |
| type | Type | read-only string | Y | -- | Must match INCIDENT_TYPES | server | `Physical Altercation` |
| date | Date | read-only date | Y | -- | `YYYY-MM-DD` | server | `2025-03-16` |
| student | Student | read-only string | Y | -- | max 100 chars | server | `Christopher Adams` |
| studentId | Student ID | read-only string | Y | -- | `^STU-\d{4}$` | server | `STU-1016` |
| driver | Driver | read-only string | Y | -- | max 100 chars | server | `David Park` |
| bus | Vehicle | read-only string | Y | -- | `Bus ##` or `Vehicle ##` format | server | `Vehicle 15` |
| route | Route | read-only string | Y | -- | max 100 chars | server | `Jefferson Middle AM - Blue` |
| description | Description | read-only text | Y | -- | max 2000 chars | server | `Pushed another student causing minor injury` |

### Workflow Tab Fields

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| workflowName | Workflow Name | read-only string | Y | -- | max 100 chars | workflows data | `Physical Altercation Response` |
| progressPercentage | Progress | read-only percentage | Y | -- | 0-100 | computed: `completedSteps / totalSteps * 100` | `33` |
| stepName | Step Name | read-only string | Y | -- | max 100 chars | workflow steps | `Parent Notification` |
| stepStatus | Step Status | read-only enum | Y | `Not Started` | `Not Started` / `In Progress` / `Completed` / `Pending Approval` / `Approved` / `Rejected` | workflow steps | `In Progress` |
| stepAssignedRole | Assigned Role | read-only string | Y | -- | max 50 chars | workflow steps | `Safety Coordinator` |
| stepEstimatedDuration | Est. Duration | read-only string | Y | -- | `{n} {unit}` format | workflow steps | `24 hours` |
| completedDate | Completed Date | read-only datetime | N | null | `MM/DD/YYYY h:mm AM/PM` | server | `03/14/2025 7:50 AM` |
| completedBy | Completed By | read-only string | N | null | max 100 chars | server | `Robert Martinez` |
| comments | Comments | read-only text | N | null | max 1000 chars | server | `Bus stopped safely, students separated` |

### Communications Tab Fields

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| newMessage | New Message | textarea | N | `""` | max 2000 chars; must be non-empty to send | user-entered | `Thank you for the update, David.` |
| messageSender | Sender | read-only string | Y | -- | max 100 chars | computed from role | `Current User` |
| messageSenderRole | Role | read-only enum | Y | -- | `coordinator` / `driver` | computed | `coordinator` |
| messageTimestamp | Timestamp | read-only datetime | Y | -- | Locale datetime string | `Date.now()` | `3/16/2025, 2:30:00 PM` |
| messageStatus | Delivery Status | read-only enum | Y | `sent` | `sent` / `delivered` / `read` | server | `read` |

### Buttons & Actions

| Button Name | Label | Icon | Type | Enabled Conditions | On Click | Confirmation? | Success / Failure UI |
|------------|-------|------|------|-------------------|----------|---------------|---------------------|
| backToIncidents | Back to Incidents | ArrowLeft | Ghost | Always | Navigate to incidents page | N | Incidents list loads |
| editIncident | Edit | Edit | Secondary | Always | Opens EditIncidentDialog | N | Dialog opens |
| prevIncident | Previous | ChevronLeft | Ghost | Previous incident exists in filtered list | Navigate to previous incident | N | Previous detail page loads |
| nextIncident | Next | ChevronRight | Ghost | Next incident exists in filtered list | Navigate to next incident | N | Next detail page loads |
| completeStep | Complete Step | CheckCircle2 | Primary | Step status is `In Progress` | Marks step as Completed; records date and user | N | Toast: "Step completed"; step indicator turns green |
| approveStep | Approve | CheckCircle2 | Primary | Step status is `Pending Approval` and user is approver | Opens approval dialog | N | Dialog opens |
| startWorkflow | Start Workflow | Play | Primary | Workflow not yet active | Sets `workflowActive = true`; first incomplete step becomes In Progress | N | Toast: "Workflow started" |
| pauseWorkflow | Pause Workflow | Pause | Secondary | Workflow is active | Pauses workflow execution | N | Toast: "Workflow paused" |
| sendMessage | Send | Send | Primary | `newMessage` is non-empty | Appends message to thread | N | Toast: "Message sent successfully" |
| goToCommunications | View Full Thread | MessageSquare | Outline | Always | Navigate to Communications page for this incident | N | Communications page loads |
| exportPDF | Export PDF | FileDown | Outline | Always | Downloads incident as PDF | N | File download |

### Modals / Dialogs

#### Approval Dialog

| Property | Value |
|----------|-------|
| **Trigger** | "Approve" button on a Pending Approval step |
| **Purpose** | Submit approval or rejection for a workflow step |
| **Keyboard / ESC** | ESC closes; focus trapped |

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| approvalComment | Comment | textarea | N | `""` | max 500 chars | user-entered | `Approved - parent meeting scheduled` |

| Button | Label | Type | On Click |
|--------|-------|------|----------|
| approve | Approve | Primary (green) | Sets step to Approved/Completed; records comment; toast |
| reject | Reject | Destructive (red) | TODO: confirm - rejection flow not fully implemented |
| cancel | Cancel | Ghost | Closes dialog |

#### Edit Incident Dialog

| Property | Value |
|----------|-------|
| **Trigger** | "Edit" button on detail page or "Edit Incident" dropdown action |
| **Purpose** | Modify incident fields |
| **Keyboard / ESC** | ESC closes; focus trapped |

Fields mirror the New Incident form fields (see [Section 6](#6-new-incident-form)) pre-populated with current values.

---

## 6. New Incident Form

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | New Incident |
| **Screen Slug / Path** | `new-incident` |
| **Purpose** | Single-page form for creating student or driver incidents with category selection, autocomplete lookups, file uploads, and interactive map |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Source Reference** | [Original: Creating New Incidents](#) |
| **Status** | Edited |
| **Rationale** | Redesigned from 5-step wizard to single-page form; added dual category selector (Student/Driver), 35+ types, student/driver/address autocomplete, photo/document uploads, interactive map |

![Wireframe - New Incident Form 1440x900](INSERT_IMAGE_HERE)

### Change Detail

**Original:** 5-step wizard: Basic Info > Involved Parties > Details > Additional Info > Review & Submit. Included auto-save, save-as-draft, tags, internal notes, follow-up required, injury information, character counter.

**Updated:** Single-page form with category selector. Removed: 5-step wizard, auto-save, save-as-draft, tags, internal notes, follow-up required section, injury information section, character counter. Added: Category selection (Student/Driver), 35+ grouped incident types, student autocomplete with photo, driver autocomplete with photo, address autocomplete with map, photo upload section, document upload section, auto-severity from type, context-dependent location options.

### Visual States

| State | Description |
|-------|-------------|
| **Default (initial)** | Category selector shown - two large buttons: Student Incident / Driver Incident |
| **Category selected** | Full form appears with fields filtered by category |
| **Student selected** | Student photo and details auto-populate; associated bus/route may pre-fill |
| **Address selected** | Map component renders with pin at selected location |
| **Photos uploaded** | Thumbnail gallery with remove (X) buttons |
| **Documents uploaded** | File list with icons and remove buttons |
| **Success** | Green alert: "Incident report submitted successfully! Supervisor has been notified." Auto-navigates to Incidents page after 3 seconds |
| **Error** | TODO: confirm - no explicit error state beyond HTML5 validation |
| **Responsive** | Category cards stack vertically on mobile |

### Fields

| Field Name | Label | Type | Required | Default | Placeholder | Validation Rules / Constraints | Help Text | Source | Example |
|------------|-------|------|----------|---------|-------------|-------------------------------|-----------|--------|---------|
| incidentCategory | Incident Category | button group | Y | null (must select) | -- | `student` / `driver` | Choose whether this involves a student or driver | static | `student` |
| student | Student | autocomplete (Command) | Y (if student category) | `""` | "Search for a student..." | Must select from list; list filtered by typed query | Auto-populates ID, grade, school | API `/api/students` (mock) | `Sarah Mitchell` |
| studentId | Student ID | read-only string | Y | auto-populated | -- | `^STU-\d{4}$` | Auto-filled when student selected | computed from student selection | `STU-2891` |
| driver | Driver | autocomplete | Y | `""` | "Select driver..." | Must select from list | Auto-populates employee ID | API `/api/drivers` (mock) | `Michael Chen` |
| incidentType | Incident Type | select (grouped by category) | Y | `""` | "Select an incident type" | Must match INCIDENT_TYPES filtered by incidentCategory | Grouped by: Behavioral, Safety Violation, Aggression/Violence, etc. | INCIDENT_TYPES registry | `seat-refusal` |
| severity | Severity | select | Y | auto-set from type's `defaultSeverity` | "Select severity" | `low` / `medium` / `high` | Auto-set when type selected; can be overridden | static list; auto-populated | `medium` |
| description | Description | textarea | Y | `""` | "Describe the incident in detail..." | min 1 char, max 2000 chars | Describe what happened | user-entered | `Student refused to remain seated during transport` |
| location | Location | select (grouped) | Y | `""` | "Select location" | Must select from context-dependent list | Groups differ for student vs driver incidents | static list varies by incidentCategory | `on-bus` |
| address | Address / Intersection | autocomplete (Command) | N | `""` | "Search for an address..." | Must select from verified address list | Shows map pin when selected | Google Places API (mock) | `1234 Main Street, Meridian, ID 83642` |
| bus | Vehicle | select | Y | `""` | "Select vehicle" | Must select from fleet list | Auto-populated if driver selected first | API `/api/vehicles` (mock) | `bus-12` |
| route | Route | select | Y | `""` | "Select route" | Must select from route list | Associated with vehicle and driver | API `/api/routes` (mock) | `lincoln-elem-am-green` |
| witnessPresent | Witness Present | checkbox | N | `false` | -- | boolean | Check if witnesses were present | user-entered | `true` |
| witnessName | Witness Name | text input | N (conditional: shown if witnessPresent) | `""` | "Witness name" | max 100 chars | Name of witness | user-entered | `Jane Smith` |
| parentNotified | Parent/Guardian Notified | checkbox | N | `false` | -- | boolean | Check if parent has been contacted | user-entered | `false` |
| actionTaken | Action Taken | textarea | N | `""` | "Describe actions taken..." | max 2000 chars | What immediate actions were taken | user-entered | `Student was asked to sit down and complied` |
| uploadedPhotos | Photos | file input (multi) | N | `[]` | -- | Accepted: `image/*` (JPG, PNG); displayed with thumbnail, name, size | Click or drag to upload evidence photos | user file system | `incident-photo.jpg (245 KB)` |
| uploadedDocuments | Documents | file input (multi) | N | `[]` | -- | Accepted: `.pdf, .doc, .docx, .txt` | Upload witness statements or reports | user file system | `Witness-Statement.pdf (1.2 MB)` |

#### Location Options by Category

**Student Incidents:**

| Group | Options |
|-------|---------|
| ON ROUTE | On Vehicle, At Vehicle Stop, Loading/Unloading |
| SCHOOL/LOCATION | School Campus, Parking Lot, Layover Location |
| OTHER | Other |

**Driver Incidents:**

| Group | Options |
|-------|---------|
| ON ROUTE | On Vehicle, At Vehicle Stop, Loading/Unloading |
| FACILITY | Garage, Yard, Maintenance Bay, Fuel Station, Wash Bay |
| SCHOOL/LOCATION | School Campus, Parking Lot, Layover Location |
| OTHER | Other |

### Buttons & Actions

| Button Name | Label | Icon | Type | Enabled Conditions | On Click | Confirmation? | Success / Failure UI |
|------------|-------|------|------|-------------------|----------|---------------|---------------------|
| submitIncident | Submit Incident | Send | Primary | Required fields populated | Submit form; show success alert; navigate to Incidents after 3s | N | Green alert banner; auto-redirect |
| cancel | Cancel | -- | Ghost | Always | Navigate back to incidents | N | Incidents page loads |
| uploadPhoto | Upload Photos | Upload | Outline | Always | Opens file picker (image/*) | N | Thumbnails appear in gallery |
| uploadDocument | Upload Documents | Upload | Outline | Always | Opens file picker (.pdf,.doc,.docx,.txt) | N | Files listed with icons |
| removePhoto | (X) | X | Ghost icon | Photo exists | Removes photo from `uploadedPhotos` | N | Thumbnail removed |
| removeDocument | (X) | X | Ghost icon | Document exists | Removes document from `uploadedDocuments` | N | File removed from list |

### Auto-Severity Behavior

When the user selects an incident type, the severity field is automatically populated from the type's `defaultSeverity` property in IncidentTypes.ts. The user can override this selection.

| Type | Default Severity |
|------|-----------------|
| Offensive Language | Medium |
| Seatbelt Refusal | High |
| Physical Altercation | High |
| Inappropriate Affection | Low |
| Driver Late Arrival | Low |
| Vehicle Accident | High |
| *(see [Section 20](#20-incident-type-taxonomy) for complete list)* | |

---

## 7. Student Management

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Students |
| **Screen Slug / Path** | `students` |
| **Purpose** | Searchable student roster with incident history and student detail dialog |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Source Reference** | [Original: Student Management](#) |
| **Status** | Edited |
| **Rationale** | School filter replaced grade filter; detail view is dialog not page; removed contact/DOB/emergency/transportation fields not in data model |

![Wireframe - Students 1440x900](INSERT_IMAGE_HERE)

### Change Detail

**Original:** Grade filter (K-12 dropdown). Contact column in table. Detail view included: DOB, Contact Information section, Transportation Details (pickup/dropoff), Emergency Information (medical conditions, allergies).

**Updated:** School filter (multi-select autocomplete). No contact column in table. Detail is a dialog. Removed: DOB, contact information section, transportation details, emergency information.

### Summary Statistics

| Metric | Calculation |
|--------|-------------|
| Total Students | `students.length` |
| With Incidents | `students.filter(incidentCount > 0).length` |
| Schools | `DISTINCT(students.school).length` |
| Avg Incidents | `SUM(incidentCount) / students.length` (1 decimal) |

NOTE: These are computed aggregates. Actual values depend on the live dataset.

### Filter Fields

| Field Name | Label | Type | Required | Default | Placeholder | Validation Rules / Constraints | Help Text | Source | Example |
|------------|-------|------|----------|---------|-------------|-------------------------------|-----------|--------|---------|
| searchQuery | Search | text input | N | `""` | "Search students..." | max 200 chars; searches name, ID, school, grade | Real-time case-insensitive filtering | user-entered | `Mitchell` |
| schoolFilter | School | multi-select autocomplete (Command) | N | `[]` | "Filter by school..." | Must match schools in dataset | Select one or more schools; chips shown | static list derived from student data | `Lincoln Middle School` |

### Table Columns

| Column | Type | Sortable | Notes |
|--------|------|----------|-------|
| Student ID | string link | Yes | `^STU-\d{4}$`; click opens detail dialog |
| Name | string + avatar | Yes | Circular photo (40px); initials fallback |
| Grade | string | Yes | e.g., `8th Grade` |
| School | string | Yes | School name |
| Bus | string | Yes | Assigned vehicle |
| Route | string | Yes | Assigned route |
| Incidents | integer | Yes | Total incident count |
| Last Incident | date `YYYY-MM-DD` | Yes | Most recent incident date; "--" if none |

NOTE: Sample rows removed. See field definitions for the kind of data stored.

### Student Detail Dialog

Triggered by clicking a Student ID.

**Displayed fields:**

| Field Name | Label | Type | Validation | Source | Example |
|------------|-------|------|------------|--------|---------|
| id | Student ID | read-only string | `^STU-\d{4}$` | server | `STU-2891` |
| name | Full Name | read-only string | max 100 chars | server | `Sarah Mitchell` |
| photoUrl | Photo | read-only image | URL or null | server / Unsplash | *(avatar image)* |
| grade | Grade | read-only string | e.g. `8th Grade` | server | `8th Grade` |
| school | School | read-only string | max 100 chars | server | `Lincoln Middle School` |
| bus | Bus | read-only string | Bus/Vehicle format | server | `Bus 12` |
| route | Route | read-only string | max 100 chars | server | `Meyers Middle AM - Yellow` |
| incidentCount | Incidents | read-only integer | >= 0 | computed | `1` |

**Incident History Table** within the dialog:

| Column | Type | Notes |
|--------|------|-------|
| Incident ID | string link | Clickable |
| Date | date | |
| Type | string + badge | |
| Severity | enum + badge | |
| Status | enum + badge | |
| Description | string | Truncated |

---

## 8. Driver Management

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Drivers |
| **Screen Slug / Path** | `drivers` |
| **Purpose** | Searchable driver roster with certifications, performance metrics, and detail dialog |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Source Reference** | [Original: Driver Management](#) |
| **Status** | Edited |
| **Rationale** | Safety rating changed from numeric star to text label; added performance score, on-time %, endorsements, garage, medical/background check expiry dates |

![Wireframe - Drivers 1440x900](INSERT_IMAGE_HERE)

### Change Detail

**Original:** Safety Rating as numeric stars (out of 5.0). Employment type, Department, Commendations, Last evaluation date.

**Updated:** Safety Rating as text label (Good/Excellent/Needs Improvement). Added: Performance Score (0-100), On-Time Percentage, Default Garage, Medical Exam Expiry, Background Check Expiry, Endorsements list. Removed: Employment type, Department, Commendations, Last evaluation date.

### Summary Statistics

| Metric | Calculation |
|--------|-------------|
| Total Drivers | `drivers.length` |
| Active | `drivers.filter(status === 'Active').length` |
| On Leave | `drivers.filter(status === 'On Leave').length` |
| Avg Performance | `AVG(drivers.performanceScore)` (0-100 scale) |

### Filter Fields

| Field Name | Label | Type | Required | Default | Placeholder | Validation Rules / Constraints | Help Text | Source | Example |
|------------|-------|------|----------|---------|-------------|-------------------------------|-----------|--------|---------|
| searchQuery | Search | text input | N | `""` | "Search drivers..." | max 200 chars; searches name, employeeId, route | Real-time filtering | user-entered | `Chen` |
| statusFilter | Status | select | N | `all` | "All Statuses" | `all` / `Active` / `On Leave` / `Inactive` | Filter by employment status | static list | `Active` |

### Table Columns

| Column | Type | Sortable | Notes |
|--------|------|----------|-------|
| Driver ID | string | Yes | `^DRV-\d{3}$` |
| Name | string + avatar + employeeId | Yes | Photo avatar + employee ID in smaller text below |
| Contact | string | Yes | Phone number format `(555) 123-4567` |
| Assigned Vehicle | string | Yes | Bus name |
| Primary Route | string | Yes | Route name |
| Status | enum + badge | Yes | Active (green), On Leave (yellow), Inactive (gray) |
| Safety Rating | string + badge | Yes | Good/Excellent/Needs Improvement |

### Driver Detail Dialog

| Field Name | Label | Type | Validation | Source | Example |
|------------|-------|------|------------|--------|---------|
| id | Driver ID | read-only string | `^DRV-\d{3}$` | server | `DRV-001` |
| fullName | Full Name | read-only string | max 100 chars | server | `Sarah Mitchell` |
| employeeId | Employee ID | read-only string | `^EMP-\d{4}-\d{3}$` | server | `EMP-2019-045` |
| phone | Phone | read-only string | `(###) ###-####` | server | `(555) 123-4567` |
| email | Email | read-only string | valid email | server | `sarah.mitchell@district.edu` |
| status | Status | read-only enum + badge | `Active` / `On Leave` / `Inactive` | server | `Active` |
| licenseNumber | License Number | read-only string | CDL format | server | `CDL-NY-8472651` |
| licenseClass | License Class | read-only string | CDL class | server | `Class B CDL` |
| licenseExpiry | License Expiry | read-only date | `YYYY-MM-DD` | server | `2026-08-15` |
| endorsements | Endorsements | read-only string array | CDL endorsement codes | server | `["P - Passenger", "S - School Bus"]` |
| hireDate | Hire Date | read-only date | `YYYY-MM-DD` | server | `2019-08-15` |
| yearsOfService | Years of Service | read-only integer | >= 0 | computed from hireDate | `5` |
| assignedVehicle | Assigned Vehicle | read-only string | Vehicle name | server | `Bus 1` |
| primaryRoute | Primary Route | read-only string | max 100 chars | server | `Westside Elementary AM - Gold` |
| secondaryRoute | Secondary Route | read-only string | max 100 chars; nullable | server | `Westside Elementary PM - Gold` |
| defaultGarage | Default Garage | read-only string | max 100 chars | server | `East Service Center` |
| safetyRating | Safety Rating | read-only string | `Good` / `Excellent` / `Needs Improvement` | server | `Good` |
| performanceScore | Performance Score | read-only integer | 0-100 | server | `87` |
| onTimePercentage | On-Time % | read-only integer | 0-100 | server | `94` |
| incidentCount | Incidents | read-only integer | >= 0 | server | `7` |
| certifications | Certifications | read-only string array | List of cert names | server | `["First Aid", "CPR", "Defensive Driving"]` |
| lastTrainingDate | Last Training | read-only date | `YYYY-MM-DD` | server | `2024-12-10` |
| nextTrainingDate | Next Training | read-only date | `YYYY-MM-DD` | server | `2025-06-10` |
| medicalExamExpiry | Medical Exam Expiry | read-only date | `YYYY-MM-DD` | server | `2025-12-20` |
| backgroundCheckExpiry | Background Check Expiry | read-only date | `YYYY-MM-DD` | server | `2025-09-01` |
| notes | Notes | read-only text | max 500 chars | server | `Excellent with special needs students` |

---

## 9. Fleet Management (Vehicles)

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Vehicles |
| **Screen Slug / Path** | `vehicles` |
| **Purpose** | Fleet overview with bus photos, maintenance status, GPS/AVL integration, and vehicle detail dialog |
| **Primary User Roles** | Safety Coordinator, Supervisor, Fleet Manager |
| **Source Reference** | [Original: Fleet Management](#) |
| **Status** | Unchanged |
| **Rationale** | Minor field-level metadata additions only; structure matches original guide |

![Wireframe - Vehicles 1440x900](INSERT_IMAGE_HERE)

### Summary Statistics

| Metric | Calculation |
|--------|-------------|
| Total Vehicles | `vehicles.length` |
| Active | `vehicles.filter(status === 'Active').length` |
| Maintenance Alerts | `vehicles.filter(maintenance IN ['Needs Attention', 'In Repair']).length` |
| Avg. Incidents | `AVG(vehicles.incidentCount)` (1 decimal) |

### Filter Fields

| Field Name | Label | Type | Required | Default | Placeholder | Validation | Source | Example |
|------------|-------|------|----------|---------|-------------|------------|--------|---------|
| searchQuery | Search | text input | N | `""` | "Search vehicles..." | max 200 chars; searches id, name, driver, route | user-entered | `VEH-015` |
| statusFilter | Status | select | N | `all` | "All Statuses" | `all` / `Active` / `Maintenance` / `Inactive` | static list | `Active` |
| maintenanceFilter | Maintenance | select | N | `all` | "All Maintenance" | `all` / `Excellent` / `Good` / `Needs Attention` / `In Repair` | static list | `Good` |

### Table Columns

| Column | Type | Sortable | Notes |
|--------|------|----------|-------|
| Vehicle ID | string link | Yes | `^VEH-\d{3}$`; click opens detail dialog |
| Details | string + bus photo | Yes | Bus name with circular photo (bus model image) |
| Driver | string | Yes | Currently assigned driver |
| Primary Route | string | Yes | Main route |
| Status | enum + badge | Yes | Active (green), Maintenance (amber), Inactive (gray) |
| Maintenance | string + icon | Yes | Checkmark (good), Warning (needs attention), Wrench (in repair) |
| Incidents | integer + trend | Yes | Count with trend arrow: red up (>8), green down (<4) |
| Mileage | formatted integer | Yes | Comma-separated (e.g., `45,200`) |

### Vehicle Detail Dialog Fields

| Field Name | Label | Type | Validation | Source | Example |
|------------|-------|------|------------|--------|---------|
| id | Vehicle ID | read-only string | `^VEH-\d{3}$` | server | `VEH-015` |
| name | Name | read-only string | max 50 chars | server | `Bus 15` |
| make | Make | read-only string | max 50 chars | server | `Blue Bird` |
| model | Model | read-only string | max 50 chars | server | `Vision` |
| year | Year | read-only integer | 4-digit year | server | `2022` |
| vin | VIN | read-only string | 17 chars alphanumeric | server | `1BABNBYA3NF123456` |
| licensePlate | License Plate | read-only string | max 10 chars | server | `SCH-1015` |
| capacity | Capacity | read-only integer | > 0 | server | `72` |
| status | Status | read-only enum | `Active` / `Maintenance` / `Inactive` | server | `Active` |
| driver | Assigned Driver | read-only string | max 100 chars | server | `David Park` |
| primaryRoute | Primary Route | read-only string | max 100 chars | server | `Jefferson Middle AM - Blue` |
| secondaryRoute | Secondary Route | read-only string | nullable | server | `Jefferson Middle PM - Blue` |
| fuelType | Fuel Type | read-only string | e.g. `Diesel`, `Propane`, `Electric` | server | `Diesel` |
| mileage | Mileage | read-only integer | >= 0, comma-formatted | server | `45,200` |
| hourmeter | Hourmeter | read-only number | >= 0, 1 decimal | server | `2,340.5` |
| gpsHardwareId | GPS Hardware ID | read-only string | alphanumeric | server | `GPS-2025-0015` |
| avlEnabled | TYD AVL Integration | read-only boolean | `true`/`false` | server | `true` |
| defaultGarage | Default Garage | read-only string | max 100 chars | server | `East Service Center` |
| midDayGarage | Mid-Day Garage | read-only string | nullable | server | `Downtown Lot` |
| maintenance | Maintenance Status | read-only enum | `Excellent` / `Good` / `Needs Attention` / `In Repair` | server | `Good` |
| lastInspection | Last Inspection | read-only date | `YYYY-MM-DD` | server | `2025-01-15` |
| nextInspection | Next Inspection Due | read-only date | `YYYY-MM-DD` | server | `2025-07-15` |
| incidentCount | Incidents | read-only integer | >= 0 | server | `3` |

### Bus Photo Assets

The vehicles page uses imported bus model images for visual display:

| Make / Model | Asset Source |
|-------------|-------------|
| Blue Bird Vision | `figma:asset/105378278b...png` |
| IC Bus CE Series | `figma:asset/21d74f753...png` |
| Thomas Saf-T-Liner C2 | `figma:asset/3a2ed0844...png` |
| Blue Bird All American | `figma:asset/cc1ace2ef...png` |
| Thomas Saf-T-Liner HDX | `figma:asset/82ee4edb9...png` |

---

## 10. Driver Communications

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Communications |
| **Screen Slug / Path** | `communications` |
| **Purpose** | Incident-linked messaging hub between coordinators and drivers with two-panel layout |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Source Reference** | [Original: Driver Communications](#) |
| **Status** | Edited |
| **Rationale** | Redesigned from generic communications table to incident-centric two-panel messaging with thread status; removed communication type/subject/priority/driver filter/date range/templates/print |

![Wireframe - Communications 1440x900](INSERT_IMAGE_HERE)

### Change Detail

**Original:** Communications table with Date, Driver, Related Incident, Type (Email/Phone/In-Person/Text), Subject, Status, Priority columns. Templates available. Print conversation. New Communication button.

**Updated:** Two-panel layout: left panel shows incident-linked conversation list; right panel shows message thread for selected conversation. All communications are in-app messages (no email/phone/text type). No subject, priority, driver filter, date range, templates, or print.

### Visual States

| State | Description |
|-------|-------------|
| **Default** | Conversation list on left; select one to view thread on right |
| **Deep-linked** | When navigated from Dashboard/Incident Detail with `initialIncidentId`, that conversation auto-selects |
| **Empty** | "No conversations" message in left panel |
| **No selection** | Right panel shows "Select a conversation" prompt |

### Left Panel (Conversation List)

#### Filter Fields

| Field Name | Label | Type | Required | Default | Placeholder | Validation | Source | Example |
|------------|-------|------|----------|---------|-------------|------------|--------|---------|
| searchQuery | Search | text input | N | `""` | "Search conversations..." | Searches incidentId, student, driver, message content | user-entered | `Mitchell` |
| statusFilter | Status | select | N | `all` | "All Statuses" | `all` / `pending` / `in-progress` / `resolved` | static list | `pending` |

#### Conversation List Item Fields

| Field Name | Label | Type | Validation | Source | Example |
|------------|-------|------|------------|--------|---------|
| incidentId | Incident ID | read-only string | `^INC-\d{4}-\d{4}$` | server | `INC-2025-0042` |
| student | Student | read-only string | max 100 chars | server | `Sarah Mitchell` |
| driver | Driver | read-only string | max 100 chars | server | `Michael Chen` |
| incidentType | Type | read-only string | Must match INCIDENT_TYPES | server | `Seat Refusal` |
| severity | Severity | read-only enum | `Low` / `Medium` / `High` | server | `Medium` |
| status | Thread Status | read-only enum | `pending` / `in-progress` / `resolved` | server | `pending` |
| lastMessageTime | Last Message | read-only string | Relative or absolute time | server | `10:45 AM` |
| unreadMessages | Unread Count | read-only integer | >= 0 | computed | `2` |

### Right Panel (Message Thread)

#### Incident Context Header

Shows linked incident details: ID, date, student, type, severity, bus, route.

#### Message Fields

| Field Name | Label | Type | Validation | Source | Example |
|------------|-------|------|------------|--------|---------|
| sender | Sender Name | read-only string | max 100 chars | server | `Michael Chen` |
| senderRole | Role | read-only enum | `coordinator` / `driver` | server | `driver` |
| content | Message Content | read-only text | max 2000 chars | server | `She was trying to talk to friends...` |
| timestamp | Timestamp | read-only string | Datetime format | server | `Mar 15, 2025, 2:30 PM` |
| status | Delivery Status | read-only enum | `sent` / `delivered` / `read` | server | `read` |

#### Compose Fields

| Field Name | Label | Type | Required | Default | Placeholder | Validation | Source | Example |
|------------|-------|------|----------|---------|-------------|------------|--------|---------|
| newMessage | New Message | textarea | N | `""` | "Type your message..." | max 2000 chars; must be non-empty to send | user-entered | `Please provide more details about the seating arrangement.` |

### Buttons & Actions

| Button Name | Label | Icon | Type | Enabled | On Click | Confirmation? | Success UI |
|------------|-------|------|------|---------|----------|---------------|-----------|
| sendMessage | Send | Send | Primary | `newMessage.trim() !== ""` | Appends message to thread; clears input | N | Message appears in thread |
| markResolved | Mark Resolved | CheckCheck | Secondary | Thread status is not `resolved` | Sets thread status to `resolved` | N | Status badge updates |
| viewIncident | View Incident | -- | Link | Always | Navigate to Incident Detail page | N | Detail page loads |

---

## 11. Reports

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Reports |
| **Screen Slug / Path** | `reports` |
| **Purpose** | Quick report cards with preview dialog and CSV export |
| **Primary User Roles** | Safety Coordinator, Supervisor, Administrator |
| **Source Reference** | [Original: Reports & Analytics](#) |
| **Status** | Edited |
| **Rationale** | 8 quick reports instead of 5; Custom Report Builder, Analytics Dashboard, Scheduled Reports, and Heat Maps are not implemented (planned future) |

![Wireframe - Reports 1440x900](INSERT_IMAGE_HERE)

### Change Detail

**Original:** 5 quick reports (Incident Summary, Driver Performance, Vehicle Maintenance, Student Incident, Compliance). Custom Report Builder (6-step process). Analytics Dashboard with heat maps. Scheduled Reports automation.

**Updated:** 8 quick report cards with preview dialog and CSV export. No custom builder, analytics dashboard, scheduled reports, or heat maps.

### Quick Report Cards

| Report ID | Title | Description | Icon | Color |
|-----------|-------|-------------|------|-------|
| monthly-summary | Monthly Summary | Incident statistics and trends for the current month | Calendar | blue |
| student-history | Student Incident History | Complete incident history by student | Users | purple |
| driver-performance | Driver Report Summary | Incidents reported by driver with response metrics | TrendingUp | green |
| high-severity | High Severity Incidents | All high severity incidents requiring immediate attention | AlertTriangle | red |
| vehicle-report | Vehicle Incident Report | Incidents grouped by vehicle number | Bus | amber |
| open-incidents | Open Incidents Report | All currently open incidents requiring action | FileText | cyan |
| weekly-trends | Weekly Trends Analysis | Week-over-week incident trends and patterns | BarChart3 | indigo |
| repeat-offenders | Repeat Offender Report | Students with multiple incidents requiring intervention | Target | violet |

Each card displays:
- Report title and description
- Icon with color accent
- "Last run: {relative time}" indicator
- `lastRun` field: read-only string, source: server, example: `1 day ago`

### Report Preview Dialog

Clicking "Generate Report" opens a dialog with:
- Table preview of report data
- Column headers matching report type
- Download CSV button

| Button Name | Label | Type | On Click | Confirmation? | Success UI |
|------------|-------|------|----------|---------------|-----------|
| generateReport | Generate Report | Primary | Opens preview dialog with report data | N | Dialog opens with table |
| downloadCSV | Download CSV | Primary | Downloads report data as CSV | N | File download; toast: "Report downloaded" |
| close | Close | Ghost | Closes preview dialog | N | Dialog closes |

### Not Yet Implemented

The following features from the original guide are planned for future phases:

- Custom Report Builder (6-step)
- Analytics Dashboard (trend analysis, heat maps, comparative analytics)
- Scheduled Reports (daily/weekly/monthly automation)
- Compliance Report (formatted for state submission)

---

## 12. Workflows

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Workflows |
| **Screen Slug / Path** | `workflows` |
| **Purpose** | Central hub for managing workflow templates and reusable step template library |
| **Primary User Roles** | Supervisor, Administrator |
| **Source Reference** | N/A (new screen) |
| **Status** | Added |
| **Rationale** | Major feature not in original guide |

![Wireframe - Workflows 1440x900](INSERT_IMAGE_HERE)

### Tabs

| Tab Name | Purpose | Contents | Default? | Notes |
|----------|---------|----------|----------|-------|
| Workflows | Workflow template management | List of workflow templates with metadata, step counts, active/inactive status | Yes | CRUD operations on templates |
| Step Templates | Reusable step library | Library of pre-built step templates that can be added to workflows | No | Managed by StepTemplateManager |

### Workflows Tab

Displays all configured workflow templates as cards.

#### Workflow Card Fields

| Field Name | Label | Type | Validation | Source | Example |
|------------|-------|------|------------|--------|---------|
| id | Workflow ID | read-only string | `^WF-\d{3}$` or `WF-DEFAULT` | server | `WF-001` |
| name | Name | read-only string | max 100 chars | server | `Physical Altercation Response` |
| description | Description | read-only text | max 500 chars | server | `Workflow for handling physical altercations...` |
| incidentTypes | Triggers | read-only string array | Each must match INCIDENT_TYPES | server | `["Physical Altercation"]` |
| severity | Severity | read-only string | `Low` / `Medium` / `High` | server | `"High"` |
| isActive | Active | read-only boolean | true/false | server | `true` |
| stepsCount | Steps | read-only integer | > 0 | computed from steps.length | `6` |
| createdBy | Created By | read-only string | max 100 chars | server | `Sarah Williams` |
| createdDate | Created | read-only date | `YYYY-MM-DD` | server | `2025-01-15` |
| lastModified | Last Modified | read-only date | `YYYY-MM-DD` | server | `2025-03-10` |

### Buttons & Actions

| Button Name | Label | Icon | Type | Enabled | On Click | Confirmation? | Success UI |
|------------|-------|------|------|---------|----------|---------------|-----------|
| createWorkflow | + New Workflow | Plus | Primary | Always | Opens new workflow dialog | N | Dialog opens |
| editWorkflow | Edit | Edit | Secondary | Always | Navigate to Workflow Builder with workflow loaded | N | Builder page loads |
| duplicateWorkflow | Duplicate | Copy | Secondary | Always | Creates a copy of the workflow | N | Toast: "Workflow duplicated" |
| deleteWorkflow | Delete | Trash2 | Destructive | Workflow is not default | Removes workflow | Y (confirmation dialog) | Toast: "Workflow deleted" |
| toggleActive | Enable/Disable | -- | Toggle | Always | Toggles `isActive` flag | N | Badge updates |

---

## 13. Workflow Builder

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Workflow Builder |
| **Screen Slug / Path** | `workflow-builder` |
| **Purpose** | Visual editor for creating and editing workflow templates with steps, triggers, email notifications, and approval gates |
| **Primary User Roles** | Supervisor, Administrator |
| **Source Reference** | N/A (new screen) |
| **Status** | Added |
| **Rationale** | Major feature not in original guide |

![Wireframe - Workflow Builder 1440x900](INSERT_IMAGE_HERE)

### Workflow Metadata Fields

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| name | Workflow Name | text input | Y | `""` | max 100 chars, non-empty | user-entered | `Physical Altercation Response` |
| description | Description | textarea | Y | `""` | max 500 chars | user-entered | `Workflow for handling physical altercations...` |
| incidentTypes | Incident Types | multi-select | Y | `[]` | Must match INCIDENT_TYPES | INCIDENT_TYPES registry | `["Physical Altercation"]` |
| severity | Severity | single-select dropdown | Y | auto-populated | `Low` / `Medium` / `High` | auto-populated from incident type default | `"High"` |

### Step Editor Fields

Each step in the workflow has:

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| name | Step Name | text input | Y | `""` | max 100 chars | user-entered | `Parent Notification` |
| description | Description | textarea | Y | `""` | max 500 chars | user-entered | `Contact parents about the incident` |
| assignedRole | Assigned Role | select | Y | `""` | Must be: Driver / Safety Coordinator / Supervisor / Administrator / School Admin | static list | `Safety Coordinator` |
| estimatedDuration | Est. Duration | text input | Y | `""` | `{n} {unit}` format (e.g., `24 hours`, `30 minutes`) | user-entered | `24 hours` |
| required | Required | checkbox | N | `true` | boolean | user-entered | `true` |
| requiresApproval | Requires Approval | checkbox | N | `false` | boolean | user-entered | `false` |
| approvers | Approvers | multi-select | N (Y if requiresApproval) | `[]` | Staff member names | staff list | `["Sarah Williams"]` |

### Step Trigger Configuration

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| triggerType | Trigger Type | select | Y | `manual` | `manual` / `auto-complete` / `time-delay` / `status-change` / `approval-granted` / `conditional` | static list | `manual` |
| delayAmount | Delay Amount | number input | Y (if time-delay) | -- | integer > 0 | user-entered | `24` |
| delayUnit | Delay Unit | select | Y (if time-delay) | `hours` | `minutes` / `hours` / `days` | static list | `hours` |
| requiredStatus | Required Status | select | Y (if status-change) | -- | valid incident status | static list | `In Progress` |

### Email Notification Configuration

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| notifyOnStart | Notify on Start | checkbox | N | `false` | boolean | user-entered | `true` |
| notifyOnComplete | Notify on Complete | checkbox | N | `false` | boolean | user-entered | `true` |
| notifyAssignee | Notify Assignee | checkbox | N | `true` | boolean | user-entered | `true` |
| notifyApprovers | Notify Approvers | checkbox | N | `false` | boolean | user-entered | `false` |
| additionalRecipients | Additional Recipients | text input (comma-sep) | N | `[]` | valid email addresses | user-entered | `admin@district.edu` |

### Buttons & Actions

| Button Name | Label | Icon | Type | Enabled | On Click | Confirmation? | Success UI |
|------------|-------|------|------|---------|----------|---------------|-----------|
| backToWorkflows | Back | ArrowLeft | Ghost | Always | Navigate to Workflows page | N | Workflows page loads |
| saveWorkflow | Save Workflow | Save | Primary | Name non-empty; at least 1 step | Save workflow template | N | Toast: "Workflow saved" |
| addStep | + Add Step | Plus | Outline | Always | Adds new empty step at end | N | New step card appears |
| addFromLibrary | Add from Library | Library | Outline | Always | Opens step library panel | N | Library panel opens |
| deleteStep | Delete | Trash2 | Ghost (icon) | Step exists | Removes step | N | Step removed; steps reordered |
| moveStepUp | Move Up | ChevronUp | Ghost (icon) | Not first step | Swaps step with previous | N | Step order updates |
| moveStepDown | Move Down | ChevronDown | Ghost (icon) | Not last step | Swaps step with next | N | Step order updates |
| configureStep | Configure | Settings | Ghost (icon) | Step exists | Opens StepConfigDialog | N | Dialog opens |

---

## 14. Help & Support

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Help & Support |
| **Screen Slug / Path** | `help` |
| **Purpose** | In-app help center with Getting Started, User Guide, and FAQ tabs |
| **Primary User Roles** | All |
| **Source Reference** | N/A (new screen) |
| **Status** | Added |
| **Rationale** | HelpPage.tsx exists but was undocumented |

### Tabs

| Tab Name | Purpose | Contents | Default? | Notes |
|----------|---------|----------|----------|-------|
| Getting Started | Onboarding overview | Application overview, navigation guide, key features grid, quick start steps | Yes | Feature cards in 2-column grid |
| User Guide | Topic-based help | Expandable accordion sections covering each application area | No | Uses Accordion component |
| FAQ | Common questions | Expandable accordion with Q&A format | No | Uses Accordion component |

### Getting Started Tab Content

- **Overview paragraph** - describes the application purpose and integration with Tyler Forge / Traversa
- **Navigation section** - lists all navigation elements (hamburger, tabs, help icon, profile, notifications, global search)
- **Key Features grid** - 2-column card grid with icon + title + description for each major feature area

### User Guide Tab Content

Accordion sections covering: Dashboard, Incidents, Students, Drivers, Vehicles, Communications, Reports, Workflows, New Incident.

### FAQ Tab Content

Accordion Q&A items covering common questions about the application.

---

## 15. Notifications

### Screen Metadata

| Property | Value |
|----------|-------|
| **Screen Name** | Notifications Dropdown |
| **Screen Slug / Path** | N/A (header component) |
| **Purpose** | Bell icon popover showing recent system notifications with actionable items |
| **Primary User Roles** | All |
| **Source Reference** | N/A (new component) |
| **Status** | Added |
| **Rationale** | NotificationsDropdown.tsx exists but was undocumented |

### Notification Fields

| Field Name | Label | Type | Validation | Source | Example |
|------------|-------|------|------------|--------|---------|
| id | Notification ID | read-only string | `^notif-\d+$` | server | `notif-1` |
| type | Notification Type | read-only enum | `incident` / `communication` / `driver-response` / `system` | server | `driver-response` |
| title | Title | read-only string | max 100 chars | server | `Driver Response Received` |
| description | Description | read-only string | max 200 chars | server | `Michael Chen replied to INC-2025-0042` |
| timestamp | Time | read-only string | Relative time format | computed | `10 mins ago` |
| isRead | Read Status | read-only boolean | true/false | server | `false` |
| severity | Severity | read-only enum | `Low` / `Medium` / `High`; nullable | server | `Medium` |
| actionable | Actionable | read-only boolean | true/false | server | `true` |
| incidentId | Linked Incident | read-only string | `^INC-\d{4}-\d{4}$`; nullable | server | `INC-2025-0042` |

### Visual Indicators

- **Unread badge** - Red circle with count on bell icon
- **Unread items** - Bold text; read items use normal weight
- **Severity indicators** - Color-coded by severity level
- **Actionable items** - Show clickable link to navigate to related incident or communication

### Buttons & Actions

| Button Name | Label | Type | On Click |
|------------|-------|------|----------|
| markAllRead | Mark All Read | Ghost | Sets all notifications to `isRead: true` |
| viewIncident | (notification click) | -- | Navigate to linked incident or communication |

---

## 16. Global UI Components

### Component Library

The application uses a shared component library built on Radix UI primitives with Tyler Forge styling:

| Component | Source | Used In | Accessibility |
|-----------|--------|---------|--------------|
| Button | `/components/ui/button.tsx` | All pages | `role="button"`, keyboard-activatable |
| Card | `/components/ui/card.tsx` | Dashboards, lists, forms | Semantic grouping |
| Dialog | `/components/ui/dialog.tsx` | Detail views, edit forms, confirmations | `role="dialog"`, focus trap, ESC to close |
| Badge | `/components/ui/badge.tsx` | Status/severity indicators everywhere | `role="status"` where appropriate |
| Select | `/components/ui/select.tsx` | All filter dropdowns | `role="combobox"`, arrow key navigation |
| Input | `/components/ui/input.tsx` | Search bars, text fields | Standard `<input>` semantics |
| Textarea | `/components/ui/textarea.tsx` | Description, message compose | Standard `<textarea>` semantics |
| Checkbox | `/components/ui/checkbox.tsx` | Form fields, workflow config | `role="checkbox"`, space to toggle |
| Avatar | `/components/ui/avatar.tsx` | Student/driver photos | `alt` text for screen readers |
| Tabs | `/components/ui/tabs.tsx` | Help page, Detail page | `role="tablist"`, arrow key navigation |
| Accordion | `/components/ui/accordion.tsx` | Help page FAQ | `role="region"`, Enter/Space to toggle |
| Command | `/components/ui/command.tsx` | Autocomplete lookups | `role="combobox"`, typeahead filtering |
| Popover | `/components/ui/popover.tsx` | Notifications dropdown | Focus trap, ESC to close |
| DropdownMenu | `/components/ui/dropdown-menu.tsx` | Action menus | `role="menu"`, arrow key navigation |
| Tooltip | `/components/ui/tooltip.tsx` | Icon buttons | `role="tooltip"`, hover/focus trigger |
| ScrollArea | `/components/ui/scroll-area.tsx` | Communications thread | Custom scrollbar styling |
| Separator | `/components/ui/separator.tsx` | Section dividers | `role="separator"` |
| Alert | `/components/ui/alert.tsx` | Success/error messages | `role="alert"`, auto-announced |

### Toast Notifications

The application uses Sonner (`sonner@2.0.3`) for toast notifications via `<Toaster />` in App.tsx.

| Usage | Message Pattern | Duration |
|-------|----------------|----------|
| Success | `toast.success("message")` | 4 seconds |
| Error | `toast.error("message")` | 6 seconds |
| Info | `toast("message")` | 4 seconds |

---

## 17. Search, Filters & Table Behavior

### Search Semantics

All search inputs perform **client-side, case-insensitive, substring matching** across multiple fields simultaneously. There is no server-side search in the current prototype.

| Page | Searched Fields |
|------|----------------|
| Incidents | id, student, driver, description, type |
| Students | name, id, school, grade |
| Drivers | fullName, employeeId, primaryRoute |
| Vehicles | id, name, driver, primaryRoute |
| Communications | incidentId, student, driver, message content |

### Filter Behavior

- Filters are combined with AND logic (all active filters must match)
- Search text is combined with AND against dropdown filters
- "Clear" button resets all filters to default values
- Active filter count may be displayed as a badge

### Table Sorting

All data tables support column-header sorting:

| Click Count | Direction | Visual Indicator |
|------------|-----------|-----------------|
| 1st click | Ascending (A-Z, 0-9, oldest-newest) | ChevronUp icon |
| 2nd click | Descending (Z-A, 9-0, newest-oldest) | ChevronDown icon |
| Default | Unsorted | ChevronsUpDown icon |

- Only one column can be sorted at a time
- Sorting applies after filters

### Pagination

TODO: confirm - no pagination implemented in prototype. All data loads client-side. Server-side pagination is planned for production datasets.

### Saved Filter Views

TODO: confirm - saved filter views not implemented. Users must re-apply filters each session.

NOTE: Sample rows removed throughout all tables. See per-screen field definitions for the kind of data stored.

---

## 18. Incident Lifecycle & State Diagram

### Status Transitions

```
┌──────────┐     ┌──────────────┐     ┌──────────┐
│   Open   │ ──> │ In Progress  │ ──> │  Closed  │
└──────────┘     └──────────────┘     └──────────┘
      │                                     ▲
      └─────────────────────────────────────┘
                  (direct close)
```

| From | To | Who Can Perform | Required Fields | Result |
|------|----|----------------|----------------|--------|
| Open | In Progress | Safety Coordinator, Supervisor | None | Workflow step(s) begin |
| Open | Closed | Supervisor, Administrator | None | Incident archived |
| In Progress | Closed | Safety Coordinator (if assigned), Supervisor | All required workflow steps completed | Incident archived |

> **Change from v1.0.0:** Original had 4 statuses (Open, Under Review, Resolved, Closed). Current system uses 3: Open, In Progress, Closed.

### Status Visual Indicators

| Status | Badge Color | Background |
|--------|------------|------------|
| Open | Blue | `bg-blue-100 text-blue-800` |
| In Progress | Amber | `bg-amber-100 text-amber-800` |
| Closed | Green | `bg-green-100 text-green-800` |

### Severity Levels

| Level | Color | Description | Auto-Assigned By |
|-------|-------|-------------|-----------------|
| High | Red (`bg-red-100 text-red-800`) | Immediate attention required - injuries, safety threats, altercations | Types: Physical Altercation, Seatbelt Refusal, Emergency Exit Misuse, Assault, Vehicle Accident, etc. |
| Medium | Amber (`bg-amber-100 text-amber-800`) | Standard priority - behavioral incidents, minor violations | Types: Offensive Language, Seat Refusal, Driver Defiance, Vandalism, etc. |
| Low | Gray (`bg-gray-100 text-gray-800`) | Documentation purposes - minor issues, informational | Types: Inappropriate Affection, Driver Late Arrival, Mirror Strike, etc. |

> **Change from v1.0.0:** Original had 4 severity levels (Critical, High, Medium, Low). Current system uses 3: High, Medium, Low. "Critical" is used as a triage priority on the Dashboard but is not a severity level.

---

## 19. Workflow System Reference

### Overview

The workflow system automatically assigns multi-step workflow templates to incidents based on their type and severity. When an incident is first viewed in detail, the function `assignWorkflowToIncident(type, severity)` matches against available templates.

### Assignment Logic

1. Search workflows where `incidentTypes CONTAINS type` AND `severityLevels CONTAINS severity` AND `isActive = true`
2. If found: return first matching workflow (deep-cloned for this incident instance)
3. If not found: return `WF-DEFAULT` (Default Incident Response)

### Pre-Configured Workflows

| ID | Name | Triggers | Severity | Steps |
|----|------|----------|----------|-------|
| WF-001 | Physical Altercation Response | Physical Altercation | High | 6: Immediate Driver Response > Supervisor Notification > Parent Notification > Investigation & Documentation > Administration Review > Resolution & Follow-up |
| WF-DEFAULT | Default Incident Response | (all unmatched) | Low, Medium, High | 5: Initial Review > Investigation > Action Plan > Follow-up > Close Incident |

### Step Status Values

| Status | Meaning | Visual |
|--------|---------|--------|
| Not Started | Step not yet reached | Gray empty circle |
| In Progress | Currently being worked on | Blue clock icon (`--brand-blue-medium`) |
| Completed | Finished successfully | Green checkmark (`--brand-olive-dark`) |
| Pending Approval | Awaiting approver sign-off | Amber alert icon |
| Approved | Approval granted (transitions to Completed) | Same as Completed |
| Rejected | Approval denied | TODO: confirm - rejection flow not fully implemented |

### Trigger Types

| Trigger | Description | Configuration |
|---------|-------------|---------------|
| manual | User must manually complete | None |
| auto-complete | Completes when conditions met | None |
| time-delay | Starts after delay period | `delayAmount` (integer) + `delayUnit` (minutes/hours/days) |
| status-change | Triggers on incident status change | `requiredStatus` (string) |
| approval-granted | Triggers after approval step approved | None |
| conditional | Triggers based on field conditions | `conditions[]` with field/operator/value |

---

## 20. Incident Type Taxonomy

The system defines 35+ incident types across 10 categories. Each type has an `id`, `label`, `category`, `description`, `defaultSeverity`, and `applicableTo` (student/driver/both).

### Student Incident Types

| Category | Type Label | Default Severity |
|----------|-----------|-----------------|
| **Behavioral** | Offensive Language | Medium |
| | Student Harassment | Medium |
| | Taunting/Bullying | Medium |
| | Unwanted Physical Contact | Medium |
| | Inappropriate Affection | Low |
| | Repeated Misconduct | High |
| **Safety Violation** | Seat Refusal | Medium |
| | Seatbelt Refusal | High |
| | Unsafe Movement | Medium |
| | Emergency Exit Misuse | High |
| | Wrong Stop Exit | Medium |
| **Aggression/Violence** | Threatening Behavior | High |
| | Physical Altercation | High |
| | Physical Assault | High |
| | Throwing Objects | High |
| **Driver Defiance** | Driver Defiance | Medium |
| | Driver Harassment | High |
| | Driver Threat | High |
| **Property Damage** | Vandalism | Medium |
| **Prohibited Items** | Tobacco/Vaping | Medium |
| | Harmful Items | High |
| | Illegal Substances | High |
| | Inappropriate Material | Medium |
| **Privacy Violation** | Unauthorized Recording | Medium |

### Driver Incident Types

| Category | Type Label | Default Severity |
|----------|-----------|-----------------|
| **Driver Operational** | Late Arrival | Low |
| | Route Deviation | Medium |
| | Missed Stop | Medium |
| | Policy Violation | Medium |
| | Communication Issue | Low |
| **Driver Safety** | Unsafe Driving | High |
| | Distracted Driving | High |
| | Equipment Safety Violation | High |
| | Loading/Unloading Safety Issue | Medium |
| **Vehicle Incident** | Vehicle Accident | High |
| | Vehicle Bumping/Light Contact | Medium |
| | Collision with Object | Medium |
| | Collision with Vehicle | High |
| | Backing Incident | Medium |
| | Mirror Strike | Low |
| | Property Damage | Medium |
| | Mechanical Failure | Medium |
| | Vehicle Breakdown | High |

---

## 21. Notifications & Integrations

### In-App Notification Triggers

| Trigger Event | Notification Type | Recipients |
|--------------|-------------------|-----------|
| New incident created | `incident` | Assigned coordinator, Supervisor |
| Driver responds to communication | `driver-response` | Assigned coordinator |
| Unanswered communication (>24h) | `communication` | Assigned coordinator, Supervisor |
| Workflow step completed | `system` | Next step assignee |
| Workflow step requires approval | `system` | Designated approvers |

### Email Notifications

Workflow steps can be configured with email notification settings:
- `notifyOnStart` - email when step begins
- `notifyOnComplete` - email when step finishes
- `notifyAssignee` - email the person assigned to the step
- `notifyApprovers` - email designated approvers

TODO: confirm - email delivery is configured but delivery mechanism not confirmed in prototype.

### Webhooks

TODO: confirm - webhook integration is not implemented. Confirm if planned for production.

---

## 22. Audit & Logs

### Audited Events

| Event | Data Captured |
|-------|--------------|
| Incident created | Creator, timestamp, all field values |
| Incident edited | Editor, timestamp, changed fields (before/after) |
| Status changed | User, timestamp, old status, new status |
| Workflow step completed | User, timestamp, step name, comments |
| Workflow step approved/rejected | Approver, timestamp, step name, decision, comments |
| Communication sent | Sender, timestamp, content, linked incident |
| Incident reassigned | User, timestamp, from assignee, to assignee |

### Audit Entry Format

```json
{
  "eventId": "AUD-2025-00001",
  "eventType": "incident.status.changed",
  "timestamp": "2025-03-16T14:30:00Z",
  "userId": "sarah.williams",
  "incidentId": "INC-2025-0044",
  "details": {
    "field": "status",
    "oldValue": "Open",
    "newValue": "In Progress"
  }
}
```

NOTE: No sample audit log rows are included. The JSON above illustrates the format only.

### Audit Log Viewer

TODO: confirm - audit data is tracked but no dedicated UI screen exists for viewing audit logs.

---

## 23. Security & Permissions

### Role-Based Access Control (RBAC)

| Feature | Safety Coordinator | Supervisor | Administrator |
|---------|-------------------|-----------|---------------|
| View Dashboard | Yes | Yes | Yes |
| View Incidents | Yes | Yes | Yes |
| Create Incident | Yes | Yes | Yes |
| Edit Own Incidents | Yes | Yes | Yes |
| Edit Any Incident | No | Yes | Yes |
| Close Incident | Own only | Any | Any |
| Reassign Incident | No | Yes | Yes |
| View Students | Yes | Yes | Yes |
| View Drivers | Yes | Yes | Yes |
| View Vehicles | Yes | Yes | Yes |
| Send Communications | Yes | Yes | Yes |
| Run Reports | Yes | Yes | Yes |
| View Workflows | Yes | Yes | Yes |
| Edit Workflows | No | Yes | Yes |
| Create Workflows | No | Yes | Yes |
| Delete Workflows | No | No | Yes |
| System Configuration | No | No | Yes |

TODO: confirm - RBAC is designed but not enforced in the prototype. All users currently have full access.

### Data Privacy

- Student information is protected under FERPA guidelines
- This application is not meant for collecting PII or securing sensitive data in its current form
- Production deployment requires proper authentication, authorization, and encryption

---

## 24. Design Tokens & Branding

### CSS Custom Properties

The application styling is centrally managed via CSS custom properties in `/styles/globals.css`.

#### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-blue-dark` | `#4A6FA5` | Primary header, nav active state, chart color 1 |
| `--brand-blue-medium` | `#5B8BB8` | Secondary actions, chart color 2, workflow In Progress |
| `--brand-blue-light` | `#6B9BC5` | Tertiary accents, chart color 5 |
| `--brand-olive-dark` | `#7B8458` | Chart color 6, workflow Completed |
| `--brand-olive-medium` | `#8B9264` | Chart color 3 |
| `--brand-olive-light` | `#9FA870` | Chart color 4 |

#### Spacing Tokens

| Token | Value |
|-------|-------|
| `--forge-spacing-xxsmall` | `4px` |
| `--forge-spacing-xsmall` | `8px` |
| `--forge-spacing-small` | `12px` |
| `--forge-spacing-medium` | `16px` |
| `--forge-spacing-large` | `24px` |
| `--forge-spacing-xlarge` | `32px` |
| `--forge-spacing-xxlarge` | `48px` |

#### Typography

| Token | Value |
|-------|-------|
| Font Family | `Roboto, sans-serif` (Google Fonts import) |
| `--forge-font-weight-regular` | `400` |
| `--forge-font-weight-medium` | `500` |
| `--forge-font-size-xs` | `12px` |
| `--forge-font-size-sm` | `14px` |
| `--forge-font-size-base` | `14px` |
| `--forge-font-size-lg` | `16px` |
| `--forge-font-size-xl` | `18px` |

#### Border & Radius

| Token | Value |
|-------|-------|
| `--forge-color-border-default` | `rgba(224, 224, 224, 1)` |
| `--forge-color-border-subtle` | `rgba(235, 235, 235, 1)` |
| `--forge-radius-small` | `2px` |
| `--forge-radius-medium` | `4px` |
| `--forge-radius-large` | `8px` |

#### Elevation / Shadows

| Token | Value |
|-------|-------|
| `--forge-elevation-1` | `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)` |
| `--forge-elevation-2` | `0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)` |
| `--forge-elevation-4` | `0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)` |

#### Slideout / Navigation

| Token | Value |
|-------|-------|
| `--forge-slideout-bg` | `#2a2a2a` |
| `--forge-slideout-border` | `rgba(255,255,255,0.1)` |
| `--forge-slideout-hover` | `rgba(255,255,255,0.08)` |
| `--forge-slideout-active` | `rgba(255,255,255,0.12)` |

---

## 25. Accessibility & Localization

### ARIA Patterns

| Pattern | Implementation |
|---------|---------------|
| Dialog | `role="dialog"`, `aria-modal="true"`, focus trap, ESC to close |
| Tab Panel | `role="tablist"` / `role="tab"` / `role="tabpanel"`, arrow key navigation |
| Combobox | `role="combobox"` on Command components, typeahead filtering |
| Menu | `role="menu"` / `role="menuitem"` on DropdownMenu |
| Alert | `role="alert"` on success/error messages, auto-announced by screen readers |
| Status | `role="status"` on live-updating badge counts |
| Tooltip | `role="tooltip"`, visible on hover and focus |

### Focus Management

- Dialogs trap focus within modal boundary
- ESC key closes the topmost dialog/popover
- Tab order follows visual layout (top-to-bottom, left-to-right)
- Skip-to-content link: TODO: confirm - not implemented

### Keyboard Shortcuts

| Shortcut | Scope | Action |
|----------|-------|--------|
| Tab | Global | Move to next interactive element |
| Shift+Tab | Global | Move to previous interactive element |
| Enter | Buttons, links | Activate |
| Space | Checkboxes, accordions | Toggle |
| Escape | Dialogs, popovers | Close |
| Arrow Up/Down | Select, menu | Navigate options |

### Localization

TODO: confirm - all UI strings are hardcoded in English. No i18n framework is integrated. All localizable strings are inline in component JSX.

Strings that would need localization:
- Page titles and headers
- Button labels
- Filter placeholder text
- Toast messages
- Status/severity labels
- Validation error messages
- Help content

---

## 26. Developer Notes

### Known Limitations

1. **No authentication** - prototype uses mock `currentUser` object; no login/session management
2. **Client-side data only** - all data is mock arrays in component files; no server API calls
3. **No pagination** - all records loaded client-side; will need server pagination for production
4. **No real file uploads** - photos/documents use `URL.createObjectURL()` for preview only
5. **No real email delivery** - email notification config exists but no SMTP integration
6. **No real address lookup** - Google Places API is mocked with static address list
7. **No offline support** - application requires active network connection
8. **No i18n** - English-only with hardcoded strings
9. **forwardRef resolved** - `DialogOverlay` and `DialogContent` in `/components/ui/dialog.tsx` converted to `React.forwardRef` to eliminate React warnings
10. **Workflow rejection flow** - `Rejected` status exists in enum but no UI handles the re-work flow

### Production Requirements

- Authentication and authorization (SSO, SAML, or district IdP)
- Server-side API with database persistence (Supabase, PostgreSQL, etc.)
- Real file storage (S3, Azure Blob)
- Email delivery service (SendGrid, SES)
- Address validation API (Google Places, Mapbox)
- Server-side pagination and search
- RBAC enforcement middleware
- Audit log persistence
- FERPA compliance measures

### Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Design System | Tyler Forge 3.x patterns |
| Component Library | Radix UI primitives (shadcn/ui) |
| Charts | Recharts |
| Toasts | Sonner 2.0.3 |
| Icons | Lucide React |
| Routing | Client-side state (`useState` in App.tsx) |

---

## 27. Glossary

| Term | Definition |
|------|-----------|
| **AVL** | Automatic Vehicle Location - GPS tracking system integrated with TYD |
| **CDL** | Commercial Driver's License - required for bus operation |
| **Command** | Autocomplete/combobox component used for searchable dropdowns |
| **Coordinator** | Safety Coordinator - primary user role for incident management |
| **Default Workflow** | `WF-DEFAULT` - generic workflow applied when no specific template matches |
| **Endorsement** | Additional CDL qualifications (e.g., P - Passenger, S - School Bus) |
| **FERPA** | Family Educational Rights and Privacy Act - federal student data protection |
| **Forge** | Tyler Forge - the design system used for UI components and styling |
| **Hourmeter** | Device tracking engine operating hours on a vehicle |
| **Incident ID** | Unique identifier format: `INC-YYYY-NNNN` (e.g., INC-2025-0044) |
| **In Progress** | Incident status indicating active investigation or workflow execution |
| **Needs Attention** | Dashboard triage queue for incidents requiring action |
| **PII** | Personally Identifiable Information |
| **Slideout** | Dark navigation panel toggled by hamburger menu |
| **Student ID** | Unique student identifier format: `STU-NNNN` (e.g., STU-2891) |
| **Toast** | Brief notification message that appears and auto-dismisses |
| **Traversa** | Tyler Technologies Student Transportation product |
| **Triage** | Priority-based sorting of incidents requiring attention |
| **TYD AVL** | Tyler Technologies AVL integration for vehicle tracking |
| **Vehicle ID** | Unique vehicle identifier format: `VEH-NNN` (e.g., VEH-015) |
| **VIN** | Vehicle Identification Number - 17-character alphanumeric identifier |
| **Workflow** | Multi-step process template auto-assigned to incidents based on type and severity |
| **Workflow Builder** | Visual editor for creating and editing workflow templates |

---

## 28. Appendix: Status & Severity Definitions

### Incident Statuses

| Status | Meaning | Visual | Available Actions |
|--------|---------|--------|-------------------|
| **Open** | Newly reported, awaiting review | Blue badge | Edit, Assign, Start Workflow, Close |
| **In Progress** | Being investigated; workflow active | Amber badge | Edit, Complete Steps, Approve, Close |
| **Closed** | Fully resolved and archived | Green badge | View only |

> **Change from v1.0.0:** Removed "Under Review" and "Resolved" statuses. System now uses 3-status lifecycle.

### Driver Statuses

| Status | Meaning | Badge Color |
|--------|---------|------------|
| **Active** | Currently employed and driving | Green |
| **On Leave** | Temporarily not driving | Yellow |
| **Inactive** | No longer employed | Gray |

### Vehicle Statuses

| Status | Meaning | Badge Color |
|--------|---------|------------|
| **Active** | Currently in service | Green |
| **Maintenance** | Undergoing repairs or inspection | Amber |
| **Inactive** | Out of service | Gray |

### Communication Thread Statuses

| Status | Meaning |
|--------|---------|
| **pending** | Awaiting coordinator or driver response |
| **in-progress** | Active back-and-forth conversation |
| **resolved** | Thread closed, no further action needed |

### Maintenance Conditions

| Condition | Icon | Meaning |
|-----------|------|---------|
| **Excellent** | Checkmark (green) | No issues; recently inspected |
| **Good** | Checkmark (blue) | Minor wear; on schedule |
| **Needs Attention** | Warning triangle (amber) | Upcoming maintenance or minor issue |
| **In Repair** | Wrench (red) | Currently being repaired |

---

## 29. Tips & Best Practices

### Data Entry

1. **Incident Reports:**
   - Enter incidents within 24 hours of occurrence
   - Select the correct category (Student vs Driver) first
   - Be thorough in the description field
   - Add photos and documents as evidence
   - Verify the auto-set severity level

2. **Student / Driver Records:**
   - Review incident histories regularly
   - Use the school filter (Students) or status filter (Drivers) for efficient browsing
   - Check certification expiry dates for drivers

3. **Vehicle Records:**
   - Monitor maintenance status indicators
   - Note vehicles with high incident counts (red trend arrow)
   - Review GPS/AVL integration status

### Workflow Efficiency

1. **Use My Incidents:**
   - Start each day on the Dashboard reviewing your assigned items
   - Address critical-priority items first
   - Respond to unanswered driver communications promptly

2. **Use Filters:**
   - Combine search text with dropdown filters for precise results
   - Use "Assigned To" filter to review a specific coordinator's caseload
   - Clear filters when switching between tasks

3. **Keyboard Navigation:**
   - Use Tab to move between fields in forms
   - Press Enter to submit
   - Press Escape to close dialogs
   - Use arrow keys in dropdown menus

4. **Workflow Management:**
   - Complete workflow steps in order
   - Add comments when completing steps for audit trail
   - Use the approval process for steps requiring sign-off

### Communication Best Practices

1. **Respond Promptly:** Address driver messages within 24 hours
2. **Reference Incidents:** All communications are linked to specific incidents
3. **Be Professional:** Maintain clear, respectful language
4. **Document Everything:** All messages are saved as part of the incident record

### Data Security

1. **Protect Student Information:** Follow FERPA guidelines
2. **Session Management:** Log out when finished; do not share credentials
3. **Screen Visibility:** Limit visibility of student records in public areas
4. **Report Handling:** Secure printed reports containing student information

### Troubleshooting

| Issue | Resolution |
|-------|-----------|
| Can't find a student/driver/vehicle | Check spelling; try partial name; clear filters; verify active status |
| Export not working | Check browser pop-up blocker; try different format |
| Sorting not responsive | Clear browser cache; refresh page |
| Form won't submit | Check required fields; verify data formats |
| Workflow step won't complete | Verify you have the required role; check if step requires approval |
| Notification not appearing | Check notification settings; refresh browser |

**Getting Help:**
- Contact transportation department
- Use the in-app Help & Support page (? icon in header)
- Email: transport@district.edu
- Phone: (555) 123-4567

---

**Document Version:** 2.0.0
**Last Updated:** February 24, 2026
**Previous Version:** [Incidents-User-Guide-original.md](./Incidents-User-Guide-original.md)
**Change Log:** [CHANGELOG.md](./CHANGELOG.md)
**For Support:** Contact your district transportation department
