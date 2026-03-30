# Tab Requirements - Student Transportation Incident Tracker

**Version:** 2.0
**Last Updated:** March 30, 2026
**Document Owner:** Product Team
**Status:** Active

---

## Table of Contents

1. [Dashboard](#1-dashboard)
2. [Incidents](#2-incidents)
3. [Students](#3-students)
4. [Drivers](#4-drivers)
5. [Vehicles](#5-vehicles)
6. [Communications](#6-communications)
7. [Reports](#7-reports)
8. [Workflows](#8-workflows)
9. [Admin](#9-admin)

---

## 1. Dashboard

### Purpose
Personalized command center for Safety Coordinators and Supervisors. Provides at-a-glance visibility into assigned incidents, triage priorities, and system-wide analytics.

### Functional Requirements

#### 1.1 My Incidents Section
- **REQ-DASH-001:** Display the top 3 highest-priority incidents assigned to the logged-in user, sorted by priority then age.
- **REQ-DASH-002:** Each incident card shall display: Incident ID, student name, priority badge (Critical/High/Medium/Low), incident type badge, bus/route, time reported, and reason summary.
- **REQ-DASH-003:** Each incident card shall provide quick action buttons: View, Message Driver, and Mark In Progress.
- **REQ-DASH-004:** "View All My Incidents" button shall navigate to the Incidents page filtered to the current user's assignments.
- **REQ-DASH-005:** Clicking the incident card body shall navigate to the Incident Detail page.
- **REQ-DASH-006:** A three-dot menu on each card shall provide additional actions: View Details, Edit Incident, Message Driver, Reassign, and Mark In Progress.

#### 1.2 Summary Statistics
- **REQ-DASH-010:** Display 5 summary statistic cards: Critical Incidents, Open Incidents, Students with Incidents, Incidents This Week, and Average Response Time.
- **REQ-DASH-011:** Each statistic card shall show the current count and a contextual description.
- **REQ-DASH-012:** Clicking the "Critical Incidents" card shall navigate to the Incidents page filtered to Open status and High severity.
- **REQ-DASH-013:** Clicking the "Open Incidents" card shall navigate to the Incidents page filtered to Open status.
- **REQ-DASH-014:** Clicking the "Students with Incidents" card shall navigate to the Students page with the Active Incidents filter applied.
- **REQ-DASH-015:** Clicking the "Incidents This Week" card shall navigate to the Incidents page filtered to Open status and incidents reported within the last 7 days.
- **REQ-DASH-016:** The "Average Response Time" card is informational only (not clickable).

#### 1.3 Analytics Charts
- **REQ-DASH-020:** Display an "Incidents by Type" pie chart showing the distribution of incidents across all categories.
- **REQ-DASH-021:** Display an "Incidents by Driver" horizontal bar chart showing incident counts per driver.
- **REQ-DASH-022:** Display an "Incidents by Day of Week" vertical bar chart showing incident frequency patterns.

#### 1.4 Active Incidents Table
- **REQ-DASH-030:** Display a table of recent active incidents with columns: Incident ID, Student, Type, Severity, Assigned To, Time, and Messages.
- **REQ-DASH-031:** Each row shall be clickable to navigate to the Incident Detail page.
- **REQ-DASH-032:** Rows shall highlight on hover to indicate interactivity.
- **REQ-DASH-033:** A "View All" button shall navigate to the Incidents list page.
- **REQ-DASH-034:** Incidents with active driver communications shall display a message icon linking to the Communications page.

#### 1.5 Dialogs
- **REQ-DASH-040:** The Reassign dialog shall allow selecting a new assignee from a dropdown list and confirming the reassignment.
- **REQ-DASH-041:** The Triage Details dialog shall display full incident information and recommended actions.

---

## 2. Incidents

### Purpose
Central hub for tracking, filtering, and managing all student transportation incidents. Supports the full incident lifecycle from creation through resolution.

### Functional Requirements

#### 2.1 Page Header
- **REQ-INC-001:** Display page title "Incidents" with a description.
- **REQ-INC-002:** Provide a "New Incident" button that opens the New Incident form dialog.

#### 2.2 Summary Statistics
- **REQ-INC-010:** Display 4 summary cards: Total Incidents, Open Incidents, High Severity, and Closed Incidents.
- **REQ-INC-011:** Each card shall show the current count and contextual description.

#### 2.3 Search and Filtering
- **REQ-INC-020:** Provide a search bar with autocomplete that searches across incident ID, student name, vehicle number, and route.
- **REQ-INC-021:** Provide a Status filter dropdown supporting: Open, In Progress, Closed, and Cancelled.
- **REQ-INC-022:** Provide a Type filter dropdown supporting all incident type categories.
- **REQ-INC-023:** Provide an Assigned To filter dropdown with all staff members.
- **REQ-INC-024:** Provide a Severity filter dropdown supporting: High, Medium, and Low.
- **REQ-INC-025:** Display an active filter banner showing all currently applied filters with the ability to remove individual filters or clear all.
- **REQ-INC-026:** Filters shall support pre-applied state when navigating from other pages (e.g., Dashboard stat cards).

#### 2.4 Incidents Table
- **REQ-INC-030:** Display a sortable table with columns: Incident ID, Date, Student, Type, Vehicle/Route, Severity, Status, Workflow Step, and Assigned To.
- **REQ-INC-031:** All columns shall be sortable in ascending and descending order.
- **REQ-INC-032:** Clicking a row shall navigate to the Incident Detail page.
- **REQ-INC-033:** Incidents with active communications shall display a message icon linking to the Communications page.
- **REQ-INC-034:** Provide a "Show More / Show Less" toggle for table pagination.

#### 2.5 Export
- **REQ-INC-040:** Provide export functionality supporting Excel (.xlsx), CSV, and Word (.docx) formats.

#### 2.6 New Incident Form
- **REQ-INC-050:** The form shall support two incident categories: Student and Driver.
- **REQ-INC-051:** Provide student/driver lookup with autocomplete, displaying name, ID, grade/employee ID, and school/assignment.
- **REQ-INC-052:** Capture: Incident Type, Location, Address (with autocomplete), Vehicle Number, Run/Route, Severity (Low/Medium/High), and Description.
- **REQ-INC-053:** Allow marking whether a witness was present and capturing the witness name.
- **REQ-INC-054:** Allow marking whether a parent/guardian was notified.
- **REQ-INC-055:** Capture immediate action taken as free-text.
- **REQ-INC-056:** Support photo evidence upload (up to 10 photos) with preview grid and removal.
- **REQ-INC-057:** Support document evidence upload (up to 10 documents) with list display and removal.
- **REQ-INC-058:** Display a location map based on the selected address.
- **REQ-INC-059:** On successful submission, display a success confirmation and navigate to the Incidents list.

---

## 3. Students

### Purpose
Manage and monitor students involved in transportation incidents. Provides lookup, filtering, and drill-down into individual student incident histories.

### Functional Requirements

#### 3.1 Summary Statistics
- **REQ-STU-001:** Display 4 summary cards: Total Students, Students with Active Incidents, Total Incidents (across all students), and Repeat Offenders (3+ incidents).

#### 3.2 Search and Filtering
- **REQ-STU-010:** Provide a search bar that searches by student name, student ID, or school.
- **REQ-STU-011:** Provide a Grade filter supporting multi-select across all grade levels.
- **REQ-STU-012:** Provide a School filter supporting multi-select across all schools.
- **REQ-STU-013:** Provide an "Active Incidents Only" checkbox to filter to students with open incidents.
- **REQ-STU-014:** Provide a "Clear Filters" button to reset all filters.
- **REQ-STU-015:** Display an active filter banner when filters are applied.

#### 3.3 Students Table
- **REQ-STU-020:** Display a sortable table with columns: Student ID, Name, Grade, School, Total Incidents, and Last Incident date.
- **REQ-STU-021:** All columns shall be sortable in ascending and descending order.
- **REQ-STU-022:** Incident count shall be color-coded: yellow (1-2), orange (3), red (4+).
- **REQ-STU-023:** Clicking a student row shall open a Student Detail dialog.
- **REQ-STU-024:** Provide pagination controls supporting 10 and 25 rows per page with page navigation.

#### 3.4 Student Detail Dialog
- **REQ-STU-030:** Display full student profile: name, ID, grade, school.
- **REQ-STU-031:** Display a searchable list of the student's incidents with incident details.
- **REQ-STU-032:** Allow navigating to the Incident Detail page from within the student dialog.

---

## 4. Drivers

### Purpose
Manage driver profiles, track certifications and performance, and monitor driver-related incident history.

### Functional Requirements

#### 4.1 Summary Statistics
- **REQ-DRV-001:** Display 4 summary cards: Total Drivers, Active Drivers, Expiring Certifications, and Average Performance Score.

#### 4.2 Search and Filtering
- **REQ-DRV-010:** Provide a search bar that searches by driver name, employee ID, vehicle, or route.
- **REQ-DRV-011:** Provide a Status filter dropdown supporting: Active and Inactive.
- **REQ-DRV-012:** Provide a Years of Service filter with ranges: 1-5, 6-10, 11-15, 16-20, and 20+.

#### 4.3 Drivers Table
- **REQ-DRV-020:** Display a sortable table with columns: Employee ID, Name, Contact Phone, Email, Years of Service, and Status.
- **REQ-DRV-021:** All columns shall be sortable in ascending and descending order.
- **REQ-DRV-022:** Clicking a driver row shall open a Driver Detail dialog.
- **REQ-DRV-023:** Provide pagination controls supporting 10 and 25 rows per page.

#### 4.4 Driver Detail Dialog
- **REQ-DRV-030:** Display full driver profile: name, employee ID, contact information, hire date, years of service, status.
- **REQ-DRV-031:** Display license information: type, number, expiration date, endorsements.
- **REQ-DRV-032:** Display certifications with status and expiration dates.
- **REQ-DRV-033:** Display assigned vehicle and route.
- **REQ-DRV-034:** Display performance metrics: performance score, on-time percentage, safety rating.
- **REQ-DRV-035:** Display medical exam expiry date with status indicators.

#### 4.5 Export
- **REQ-DRV-040:** Provide export functionality for driver data.

---

## 5. Vehicles

### Purpose
Fleet management view for tracking vehicle inventory, maintenance status, and incident history per vehicle.

### Functional Requirements

#### 5.1 Summary Statistics
- **REQ-VEH-001:** Display 4 summary cards: Total Vehicles, Active Vehicles, Maintenance Alerts, and Average Incidents per Vehicle.

#### 5.2 Search and Filtering
- **REQ-VEH-010:** Provide a search bar that searches by vehicle ID, name, driver, route, make, or model.
- **REQ-VEH-011:** Provide a Status filter dropdown supporting: All, Active, Maintenance, and Inactive.
- **REQ-VEH-012:** Provide a Maintenance filter dropdown supporting: All, Excellent, Good, Needs Attention, and In Repair.

#### 5.3 Vehicles Table
- **REQ-VEH-020:** Display a sortable table with columns: Vehicle ID, Details (make/model/year), Assigned Driver, Primary Route, Current Mileage, Incident Count, and Status.
- **REQ-VEH-021:** All columns shall be sortable in ascending and descending order.
- **REQ-VEH-022:** Clicking a vehicle row shall open a Vehicle Detail dialog.
- **REQ-VEH-023:** Provide pagination controls supporting 10 and 25 rows per page.

#### 5.4 Vehicle Detail Dialog
- **REQ-VEH-030:** Display full vehicle profile: ID, name, make, model, year, VIN, license plate.
- **REQ-VEH-031:** Display operational data: capacity, current mileage, hourmeter readings.
- **REQ-VEH-032:** Display assignment details: assigned driver, primary route, garage.
- **REQ-VEH-033:** Display maintenance status with condition indicators.
- **REQ-VEH-034:** Display inspection dates and compliance information.
- **REQ-VEH-035:** Display GPS hardware ID and AVL integration status.

#### 5.5 Export
- **REQ-VEH-040:** Provide export functionality for vehicle data.

---

## 6. Communications

### Purpose
Real-time messaging interface between Safety Coordinators and bus drivers for incident-related communications.

### Functional Requirements

#### 6.1 Layout
- **REQ-COM-001:** Display a two-panel layout: incident list sidebar on the left and conversation panel on the right.

#### 6.2 Incident List Sidebar
- **REQ-COM-010:** Display all incidents with active or historical communications.
- **REQ-COM-011:** Each incident entry shall show: Incident ID, date, student/driver names, incident type, severity badge, status badge, and unread message count.
- **REQ-COM-012:** Provide a search bar to filter incidents by ID, driver name, or student name.
- **REQ-COM-013:** Provide a status filter dropdown supporting: All Status, Unread, In Progress, and Resolved.
- **REQ-COM-014:** Clicking an incident shall load its conversation in the right panel.
- **REQ-COM-015:** Display the last message timestamp for each incident.

#### 6.3 Conversation Panel
- **REQ-COM-020:** Display a pinned header with incident details (ID, type, severity, driver name, student name).
- **REQ-COM-021:** Display the message thread in chronological order with sender name, role, timestamp, and message content.
- **REQ-COM-022:** Differentiate messages visually by sender (coordinator messages right-aligned, driver messages left-aligned).
- **REQ-COM-023:** Display message delivery status indicators (sent, delivered, read).
- **REQ-COM-024:** Provide a pinned message input form at the bottom with a text area and send button.
- **REQ-COM-025:** On successful send, display a success confirmation and append the message to the thread.

#### 6.4 Pre-populated Context
- **REQ-COM-030:** When navigating from another page with an incident context, auto-select that incident in the sidebar and open its conversation.

---

## 7. Reports

### Purpose
Generate and view pre-configured reports for incident analytics, compliance tracking, and trend analysis.

### Functional Requirements

#### 7.1 Quick Reports
- **REQ-RPT-001:** Display 8 pre-configured report cards: Monthly Summary, Student Incident History, Driver Report Summary, High Severity Incidents, Vehicle Incident Report, Open Incidents Report, Weekly Trends Analysis, and Repeat Offender Report.
- **REQ-RPT-002:** Each report card shall display: report title, icon, description, and last run date.
- **REQ-RPT-003:** Each card shall have a "View Report" button that opens the report preview.

#### 7.2 Report Preview
- **REQ-RPT-010:** Display the report in a modal dialog with full-width content.
- **REQ-RPT-011:** The preview shall include summary statistics relevant to the report type.
- **REQ-RPT-012:** The preview shall include a detailed data table with sortable columns.
- **REQ-RPT-013:** Provide a "Download Report" button to export the report.

#### 7.3 Weekly Trends Analysis
- **REQ-RPT-020:** Display week-over-week comparison charts (line, bar, and pie charts).
- **REQ-RPT-021:** Show incident volume trends, type distribution, and severity breakdown.

#### 7.4 Filters
- **REQ-RPT-030:** Support filtering by date range, incident types, routes, severity levels, and status.

---

## 8. Workflows

### Purpose
Define and manage step-by-step response procedures that are automatically assigned to incidents based on type and severity.

### Functional Requirements

#### 8.1 Workflows Tab
- **REQ-WFL-001:** Display summary statistics: Total Workflows and Active Workflows.
- **REQ-WFL-002:** Provide a search bar to search workflows by name or description.
- **REQ-WFL-003:** Provide filters for Category (Safety, Discipline, Maintenance, Administrative) and Status (Active/Inactive).
- **REQ-WFL-004:** Display a workflows table with columns: Name, Category, Status, Severity, Steps, Last Modified.
- **REQ-WFL-005:** Provide a "Create Workflow" button that opens the creation dialog.
- **REQ-WFL-006:** Provide row-level actions: Edit (opens Workflow Builder), Duplicate, Toggle Active/Inactive, and Delete.
- **REQ-WFL-007:** Provide pagination supporting 10 and 25 rows per page.

#### 8.2 Create Workflow Dialog
- **REQ-WFL-010:** Capture: Workflow Name, Description, Category, Severity Level, and Associated Incident Type.
- **REQ-WFL-011:** Provide a "Create & Build Steps" button that saves the workflow and opens the Workflow Builder.

#### 8.3 Step Templates Tab
- **REQ-WFL-020:** Display a library of reusable step templates that can be added to workflows.
- **REQ-WFL-021:** Provide search and category filtering for templates.

#### 8.4 Workflow Builder
- **REQ-WFL-030:** Display the workflow name and description at the top with a back button.
- **REQ-WFL-031:** Display workflow steps in a numbered, ordered list.
- **REQ-WFL-032:** Each step shall display: step name, description, assigned role, estimated duration, and badges for Required/Optional, Notifications, and Approval Required.
- **REQ-WFL-033:** Allow reordering steps via move up/down controls.
- **REQ-WFL-034:** Allow configuring individual steps via a settings dialog (StepConfigDialog).
- **REQ-WFL-035:** Allow deleting steps from the workflow.
- **REQ-WFL-036:** Provide a form to create custom steps with: name, description, assigned role, estimated duration, and required toggle.
- **REQ-WFL-037:** Provide a Step Library browser with pre-built template steps that can be added to the workflow.
- **REQ-WFL-038:** Provide Save and Cancel buttons at the bottom.

---

## 9. Admin

### Purpose
System administration for managing user access, email notification templates, and incident type configuration.

### Functional Requirements

#### 9.1 User Roles Tab
- **REQ-ADM-001:** Display a searchable, filterable table of system users with columns: Name, Email, Role, Status, and Last Login.
- **REQ-ADM-002:** Provide a search bar to search by name or email.
- **REQ-ADM-003:** Provide a Role filter dropdown with all available roles (Safety Coordinator, Bus Driver, Supervisor, Principal, District Administrator, Parent/Guardian, System Administrator).
- **REQ-ADM-004:** Provide an "Add User" button that opens a creation dialog.
- **REQ-ADM-005:** Provide row-level actions: Edit and Delete.
- **REQ-ADM-006:** The Add/Edit User dialog shall capture: name, email, role, and status (Active/Inactive).

#### 9.2 Email Templates Tab
- **REQ-ADM-010:** Display email templates as expandable cards showing: template name, category badge, subject line, and description.
- **REQ-ADM-011:** Provide a search bar to search by template name or description.
- **REQ-ADM-012:** Provide a Category filter supporting: Notification, Approval, Escalation, Completion, and Custom.
- **REQ-ADM-013:** Provide a "Create Template" button for adding new templates.
- **REQ-ADM-014:** Provide card-level actions: Preview, Duplicate, Edit, and Delete.
- **REQ-ADM-015:** Templates shall support variable placeholders (e.g., {incident_id}, {student_name}).

#### 9.3 Incident Types Tab
- **REQ-ADM-020:** Display a table of incident types with columns: Label, Description, Category, Applies To (Student/Driver/Both), Linked Workflow, Severity, and Status.
- **REQ-ADM-021:** Provide a search bar to search by label or description.
- **REQ-ADM-022:** Provide filters for Category and Applies To.
- **REQ-ADM-023:** Provide an "Add Incident Type" button for adding new types.
- **REQ-ADM-024:** Provide row-level actions: Edit and Delete.
- **REQ-ADM-025:** Each incident type shall be associable with a workflow, displayed as a clickable link to the Workflow Builder.
- **REQ-ADM-026:** Support 10 incident categories: Behavioral, Safety, Physical, Medical, Property, Accessibility, Substance, Environmental, Communication, and Administrative.

---

## Appendix: Cross-Tab Navigation Requirements

| Requirement ID | From | To | Trigger |
|---|---|---|---|
| REQ-NAV-001 | Dashboard | Incidents | "View All" buttons, stat card clicks |
| REQ-NAV-002 | Dashboard | Incident Detail | Incident card click, table row click |
| REQ-NAV-003 | Dashboard | Communications | "Message Driver" action |
| REQ-NAV-004 | Dashboard | Students | "Students with Incidents" stat card |
| REQ-NAV-005 | Incidents | Incident Detail | Table row click |
| REQ-NAV-006 | Incidents | Communications | Message icon on incident row |
| REQ-NAV-007 | Students | Incident Detail | Click incident within student dialog |
| REQ-NAV-008 | Workflows | Workflow Builder | Edit workflow or "Create & Build Steps" |
| REQ-NAV-009 | Workflow Builder | Workflows | "Back to Workflows" button |
| REQ-NAV-010 | Admin (Incident Types) | Workflow Builder | Click linked workflow |
| REQ-NAV-011 | All Pages | Help | Help button in app bar |
| REQ-NAV-012 | All Pages | Any Page | Navigation drawer menu |
