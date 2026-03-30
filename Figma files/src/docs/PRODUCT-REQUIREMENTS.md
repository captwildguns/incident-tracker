# Student Transportation Incident Tracker
## Product Requirements Document

**Version:** 1.0  
**Last Updated:** February 6, 2026  
**Document Owner:** Product Team  
**Status:** Active

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [User Personas](#user-personas)
3. [Functional Requirements by Feature](#functional-requirements-by-feature)
   - [Dashboard](#1-dashboard)
   - [Incident Management](#2-incident-management)
   - [Student Management](#3-student-management)
   - [Vehicle Management](#4-vehicle-management)
   - [Driver Management](#5-driver-management)
   - [Communications](#6-communications)
   - [Workflow System](#7-workflow-system)
   - [Reports & Analytics](#8-reports--analytics)
   - [New Incident Entry](#9-new-incident-entry)
   - [Search & Filtering](#10-search--filtering)
   - [Navigation & Layout](#11-navigation--layout)
4. [Cross-Cutting Concerns](#cross-cutting-concerns)
5. [Out of Scope](#out-of-scope)
6. [Assumptions & Constraints](#assumptions--constraints)

---

## Executive Summary

The Student Transportation Incident Tracker is a comprehensive web application designed to help school district transportation departments capture, manage, track, and communicate about student transportation incidents. The system provides role-based workflows, automated notifications, real-time communication tools, and analytics dashboards to ensure student safety and regulatory compliance.

**Primary Goals:**
- Streamline incident reporting and response workflows
- Improve communication between drivers and safety coordinators
- Provide visibility into incident trends and patterns
- Ensure consistent handling of incidents based on severity and type
- Create comprehensive audit trails for compliance

---

## User Personas

### 1. Safety Coordinator (Primary User)
**Role:** Oversees all transportation safety operations  
**Responsibilities:** Review incidents, communicate with parents, manage workflows, analyze trends  
**Technical Proficiency:** Moderate  
**Primary Use Case:** Daily incident triage and management

### 2. Transportation Driver
**Role:** Operates school buses and transports students  
**Responsibilities:** Report incidents, respond to coordinator questions, document events  
**Technical Proficiency:** Basic to Moderate  
**Primary Use Case:** Submit incident reports and answer follow-up questions

### 3. Transportation Director
**Role:** Department leadership and oversight  
**Responsibilities:** Review reports, monitor trends, make policy decisions  
**Technical Proficiency:** Moderate  
**Primary Use Case:** High-level analytics and strategic planning

### 4. District Administrator
**Role:** Executive leadership  
**Responsibilities:** Oversight, compliance, budget allocation  
**Technical Proficiency:** Basic to Moderate  
**Primary Use Case:** Executive reporting and compliance verification

### 5. Fleet Manager
**Role:** Vehicle maintenance and assignment oversight  
**Responsibilities:** Track vehicle-related incidents, schedule maintenance  
**Technical Proficiency:** Moderate  
**Primary Use Case:** Vehicle health monitoring and incident correlation

---

## Functional Requirements by Feature

---

## 1. Dashboard

### Feature Overview
Central command center providing at-a-glance visibility into incident activity, urgent items requiring attention, performance metrics, and trend analysis.

### User Stories

#### 1.1 View Key Metrics
**As a** Safety Coordinator  
**I want to** see summary statistics of all incidents (total, open, critical, response time)  
**So that** I can quickly assess the current state of transportation safety

**Primary User Types:** Safety Coordinator, Transportation Director, District Administrator

**Key Interactions:**
- View statistic cards displaying counts and metrics
- Click "Students w/ Incidents" card to navigate to Students page
- Observe visual color coding (red for critical, green for good performance)

**Acceptance Criteria:**
- Display total incidents count
- Display open incidents count with breakdown
- Display critical incidents requiring immediate attention
- Calculate and display average response time with color coding (green <6hrs, orange 6-24hrs, red >24hrs)
- Update metrics in real-time when incidents are added or updated

---

#### 1.2 Manage My Assigned Incidents
**As a** Safety Coordinator  
**I want to** see incidents specifically assigned to me  
**So that** I can focus on my responsibilities without being overwhelmed by district-wide data

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- View "My Incidents" section showing top 3 most urgent assigned items
- Click "View All My Incidents" to filter incident list to only assigned items
- Click incident card to view full details
- Use dropdown menu for quick actions (View, Edit, Message Driver, Reassign, Mark In Progress, Mark Resolved)
- Use quick action buttons (View, Message, Resolve) on card footer

**Acceptance Criteria:**
- Filter incidents where assignedTo = current user
- Sort by priority (critical > high > medium) then by time (oldest first)
- Display badge with total count of assigned incidents
- Provide one-click navigation to filtered incidents list
- Support quick status changes without leaving dashboard
- Display toast notifications for all actions

---

#### 1.3 View Incident Trends
**As a** Transportation Director  
**I want to** visualize incident trends over time  
**So that** I can identify patterns and allocate resources effectively

**Primary User Types:** Transportation Director, District Administrator, Safety Coordinator

**Key Interactions:**
- View pie chart showing incidents by type distribution
- View bar chart showing incidents by driver (top 6 drivers)
- View bar chart showing incidents by day of week
- Hover over charts for detailed tooltips

**Acceptance Criteria:**
- Pie chart uses brand colors for incident categories
- Bar charts show clear labels and values
- Charts are responsive and resize appropriately
- Data reflects current filtered time period
- Interactive hover states show exact values

---

#### 1.4 Review Active Incidents
**As a** Safety Coordinator  
**I want to** see a list of currently active incidents  
**So that** I can monitor ongoing situations

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- View table of most recent active incidents
- Click incident ID to view full details in modal
- Click message icon to view driver communications
- Click "View All" to navigate to full incidents page
- View status, severity, and assignment information

**Acceptance Criteria:**
- Display 3 most recent active incidents
- Show incident ID, student, type, severity, assigned to, time, and message status
- Clickable incident IDs open detail modal
- Message icon appears only for incidents with communications
- "View All" button navigates to incidents page

---

#### 1.5 Triage Urgent Items
**As a** Safety Coordinator  
**I want to** quickly identify and act on incidents requiring immediate attention  
**So that** I can respond appropriately to urgent safety concerns

**Primary User Types:** Safety Coordinator

**Key Interactions:**
- View cards for incidents needing attention with priority color coding
- See reason why item needs attention
- Click card to view full incident details
- Use dropdown actions (View, Edit, Message Driver, Reassign, Mark In Progress, Mark Resolved)
- Use quick action buttons for rapid triage

**Acceptance Criteria:**
- Display incidents sorted by urgency (critical > high > medium)
- Show clear reason for attention (high severity, overdue, driver awaiting response, etc.)
- Priority color coding: red (critical), orange (high), yellow (medium)
- Quick action buttons work without page navigation
- Dropdown menu provides all standard incident actions
- Toast notifications confirm all actions

**Out of Scope:**
- Automatic incident assignment
- Push notifications outside the application
- Email notifications from dashboard actions

---

## 2. Incident Management

### Feature Overview
Comprehensive system for viewing, filtering, sorting, and managing all transportation incidents with full detail views and workflow integration.

### User Stories

#### 2.1 View All Incidents
**As a** Safety Coordinator  
**I want to** see a complete list of all incidents in the system  
**So that** I can monitor overall incident activity

**Primary User Types:** Safety Coordinator, Transportation Director, District Administrator

**Key Interactions:**
- View incidents in sortable table format
- See summary statistics (total, open, under review, critical)
- Scroll through paginated results
- Click incident ID to view details

**Acceptance Criteria:**
- Display all incidents in table format
- Show incident ID, date, student, driver, vehicle, type, severity, status
- Default sort by date (newest first)
- Summary cards update based on current filters
- Table is responsive on smaller screens

---

#### 2.2 Filter Incidents
**As a** Safety Coordinator  
**I want to** filter incidents by various criteria  
**So that** I can focus on specific subsets of incidents

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Enter text in search bar to filter by ID, student, driver, vehicle, or description
- Select status filter (All, Open, In Progress, Under Review, Resolved, Closed)
- Select severity filter (All, High, Medium, Low)
- Select type filter (All types, or specific incident categories)
- Select assigned to filter (All, or specific user)
- Click "Clear Filters" to reset all filters

**Acceptance Criteria:**
- Search is real-time and case-insensitive
- All filters work independently and in combination
- Filter selections persist during session
- Clear Filters button resets to default state
- Results update immediately when filters change
- Show count of filtered results

---

#### 2.3 Sort Incidents
**As a** Safety Coordinator  
**I want to** sort incidents by different columns  
**So that** I can organize data in the most useful way for my current task

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Click column headers to sort
- Click again to reverse sort direction
- Click third time to return to default sort

**Acceptance Criteria:**
- All columns are sortable (ID, Date, Student, Driver, Vehicle, Type, Severity, Status)
- Visual indicators show current sort column and direction (up/down chevron)
- Default sort is Date descending (newest first)
- Severity sorts in logical order: Critical > High > Medium > Low
- Status sorts in logical order: Open > In Progress > Under Review > Resolved > Closed
- Sort state persists across filter changes

---

#### 2.4 View Incident Details
**As a** Safety Coordinator  
**I want to** view complete information about a specific incident  
**So that** I can understand the full context and take appropriate action

**Primary User Types:** Safety Coordinator, Transportation Director, Driver

**Key Interactions:**
- Click incident ID from any table or list
- View tabbed interface with Overview, Workflow, Documents, Photos, and History
- Navigate between tabs
- See all incident metadata, description, and involved parties
- View workflow progress and complete steps
- View uploaded documents and photos
- Review complete audit history

**Acceptance Criteria:**
- Overview tab displays all core incident information
- Workflow tab shows assigned workflow with step progress
- Documents tab lists all attached documents with download capability
- Photos tab displays incident photos in gallery view
- History tab shows chronological timeline of all changes
- All tabs load data appropriately
- Modal is scrollable for long content
- Close button and backdrop click dismiss modal

---

#### 2.5 Edit Incident
**As a** Safety Coordinator  
**I want to** modify incident details  
**So that** I can correct errors or update information as new facts emerge

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Click "Edit" button or dropdown action
- Modify incident fields in form
- Change status, severity, type, description, etc.
- Assign to different user
- Save changes or cancel

**Acceptance Criteria:**
- Form pre-populates with current incident data
- All editable fields can be modified
- Validation prevents invalid data entry
- Save button updates incident and shows success message
- Cancel button discards changes
- Changes appear in History tab with timestamp and user
- Modal closes after successful save

---

#### 2.6 Update Incident Status
**As a** Safety Coordinator  
**I want to** change the status of an incident  
**So that** I can track its progression through the resolution process

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Use status dropdown in edit dialog
- Use quick action buttons (Mark In Progress, Mark Resolved)
- Status changes reflect in incident list immediately

**Acceptance Criteria:**
- Available statuses: Open, In Progress, Under Review, Resolved, Closed
- Status change creates history entry with timestamp
- Status badge updates throughout UI
- Workflow step statuses may auto-update based on incident status
- Toast notification confirms status change

---

#### 2.7 Navigate to Related Records
**As a** Safety Coordinator  
**I want to** click on student, driver, or vehicle names/IDs  
**So that** I can quickly view related information

**Primary User Types:** Safety Coordinator, Transportation Director, Fleet Manager

**Key Interactions:**
- Click student name to view student profile
- Click driver name to view driver profile
- Click vehicle number to view vehicle details
- Return to incident after viewing related record

**Acceptance Criteria:**
- Student names link to student detail modal
- Driver names link to driver detail modal
- Vehicle numbers link to vehicle detail modal
- Context is preserved when navigating back
- Related incident history appears in linked records

**Out of Scope:**
- Bulk editing multiple incidents simultaneously
- Custom incident fields configured per district
- Workflow step completion directly from incident list (must open detail)

---

## 3. Student Management

### Feature Overview
Centralized student information system with transportation details, behavioral history tracking, and incident correlation for student-focused case management.

### User Stories

#### 3.1 View Student Roster
**As a** Safety Coordinator  
**I want to** see all students using transportation services  
**So that** I can monitor the student population and identify those needing intervention

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- View students in sortable table format
- See student photos/avatars
- View summary statistics (total students, active riders, with incidents, average incidents)
- Identify students with active incidents via badge
- Click student ID to view profile

**Acceptance Criteria:**
- Display all students in table with photos
- Show student ID, name, grade, school, contact, route, incident count, last incident
- Photos display as circular avatars (40px)
- Fallback to initials if no photo available
- "Active" badge appears for students with open incidents
- Default sort by name (alphabetical)
- Summary cards show accurate counts

---

#### 3.2 Search and Filter Students
**As a** Safety Coordinator  
**I want to** search and filter the student list  
**So that** I can quickly find specific students or groups

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Enter text in search bar
- Select grade level filter
- Select school filter
- Select route filter
- View filtered results in real-time

**Acceptance Criteria:**
- Search matches student name, ID, school, route
- Grade filter shows K-12 options
- School filter shows all schools in district
- Route filter shows all active routes
- Filters work in combination
- Real-time filtering as user types
- Clear filters button resets to default

---

#### 3.3 View Student Profile
**As a** Safety Coordinator  
**I want to** view complete information about a student  
**So that** I can understand their transportation needs and incident history

**Primary User Types:** Safety Coordinator, Transportation Director, Driver

**Key Interactions:**
- Click student ID from table
- View profile information (name, ID, grade, school, DOB, age)
- See contact information (parent phone, email, emergency contact)
- Review transportation details (route, bus, driver, pickup/dropoff locations and times)
- View medical information (conditions, allergies, medications, emergency instructions)
- Review complete incident history in timeline
- Filter incident history by date range, type, or status

**Acceptance Criteria:**
- Modal displays all student information organized in sections
- Student photo displays prominently (80px)
- Transportation details show current assignments
- Special transportation needs are highlighted
- Medical information section includes all relevant health data
- Incident history shows chronological timeline
- Each incident in history is clickable to view details
- Medical information respects privacy settings
- Print-friendly layout available

---

#### 3.4 Identify High-Risk Students
**As a** Safety Coordinator  
**I want to** easily identify students with multiple incidents  
**So that** I can provide targeted interventions

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- View incident count column with color coding
- Sort by incident count (descending)
- Filter to students with active incidents
- Review incident history patterns

**Acceptance Criteria:**
- Incident count displays prominently
- Color coding: Red (5+ incidents), Orange (3-4), Green (1-2), Gray (0)
- Sortable incident count column
- Active incident badge for students with open incidents
- Quick visual scan identifies high-risk students

---

#### 3.5 Update Student Information
**As a** Safety Coordinator  
**I want to** modify student information  
**So that** I can keep records current and accurate

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Click "Edit Student Info" from profile
- Update contact information
- Change transportation assignments
- Add or modify special needs
- Save changes

**Acceptance Criteria:**
- Edit form pre-populates with current data
- Required fields are validated
- Changes are saved with confirmation message
- Updates reflect immediately in student list
- Change history is logged with timestamp and user

**Out of Scope:**
- Student enrollment/registration functions
- Grade advancement/school year transitions
- Academic records integration
- Photo upload (assumed to come from student information system)
- Adding new students to roster (integration point)

---

## 4. Vehicle Management

### Feature Overview
Comprehensive fleet management system with visual bus identification, maintenance tracking, incident correlation, and GPS integration for operational oversight.

### User Stories

#### 4.1 View Fleet Inventory
**As a** Fleet Manager  
**I want to** see all vehicles in the fleet  
**So that** I can monitor fleet status and availability

**Primary User Types:** Fleet Manager, Transportation Director, Safety Coordinator

**Key Interactions:**
- View vehicles in sortable table format
- See vehicle photos/images
- View summary statistics (total vehicles, active, maintenance alerts, average incidents)
- Click vehicle ID to view details
- Filter by status or maintenance condition

**Acceptance Criteria:**
- Display all vehicles in table with photos
- Show vehicle ID, details (name, year, make, model), driver, route, status, maintenance, incidents, mileage
- Vehicle photos display as circular avatars (40px) showing actual bus model
- Maintenance condition shows icon and color coding
- Incident count includes trend indicator (up/down arrow)
- Default sort by vehicle name (numeric)
- Summary cards show accurate counts

---

#### 4.2 Filter Fleet
**As a** Fleet Manager  
**I want to** filter vehicles by status and maintenance condition  
**So that** I can focus on vehicles needing attention

**Primary User Types:** Fleet Manager, Transportation Director

**Key Interactions:**
- Search by vehicle ID, name, driver, route, or make/model
- Select status filter (All, Active, Maintenance, Inactive)
- Select maintenance filter (All, Excellent, Good, Needs Attention, In Repair)
- View filtered results

**Acceptance Criteria:**
- Search is real-time and case-insensitive
- Status filter shows current operational status
- Maintenance filter shows vehicle condition
- Filters work independently and in combination
- Results update immediately
- Clear filters button resets to defaults

---

#### 4.3 View Vehicle Details
**As a** Fleet Manager  
**I want to** view complete information about a vehicle  
**So that** I can manage maintenance, assignments, and track incidents

**Primary User Types:** Fleet Manager, Transportation Director, Safety Coordinator

**Key Interactions:**
- Click vehicle ID from table
- View basic information (ID, name, status, license plate, make, model, year, VIN, capacity, fuel type)
- See GPS & AVL configuration (GPS hardware ID, TYD AVL integration status)
- Review garage assignments (default garage, mid-day garage)
- View assignment information (driver, routes, incident count)
- Review maintenance & inspection data (status, last inspection, next inspection due)
- View complete incident history involving this vehicle

**Acceptance Criteria:**
- Modal displays all vehicle information organized in sections
- Full-size bus photo displays prominently
- GPS/AVL status shows visual indicator (green dot for enabled)
- Maintenance status shows badge with icon
- Days until next inspection is calculated
- Incident history is chronological and clickable
- Each incident links to full incident details

---

#### 4.4 Track Maintenance
**As a** Fleet Manager  
**I want to** monitor vehicle maintenance status and schedules  
**So that** I can ensure fleet safety and compliance

**Primary User Types:** Fleet Manager, Transportation Director

**Key Interactions:**
- View maintenance status badge on vehicle list
- See last inspection date
- See next inspection due date
- View days until inspection due with color coding
- Filter vehicles by maintenance condition

**Acceptance Criteria:**
- Maintenance status shows: Excellent, Good, Needs Attention, In Repair
- Last inspection date displays with calendar icon
- Next inspection calculates days remaining
- Color coding: Green (>30 days), Orange (15-30 days), Red (<15 days)
- Inspection overdue shown in red
- Maintenance alerts appear in dashboard summary

---

#### 4.5 Correlate Vehicle Incidents
**As a** Fleet Manager  
**I want to** see incidents associated with specific vehicles  
**So that** I can identify vehicles with recurring issues

**Primary User Types:** Fleet Manager, Transportation Director

**Key Interactions:**
- View incident count in vehicle table
- See trend indicator (up/down arrow based on threshold)
- Review complete incident history in vehicle detail
- Sort vehicles by incident count

**Acceptance Criteria:**
- Incident count shows year-to-date total
- Trend indicators: Up arrow (red) for >8 incidents, down arrow (green) for <4 incidents
- Incident history in detail view shows all related incidents
- Incidents are clickable to view full details
- Can identify patterns of mechanical issues or driver-related incidents

---

#### 4.6 Manage Vehicle Assignments
**As a** Fleet Manager  
**I want to** view and update vehicle assignments  
**So that** I can optimize fleet utilization

**Primary User Types:** Fleet Manager, Transportation Director

**Key Interactions:**
- View assigned driver in vehicle table and detail
- View primary and secondary routes
- Click "Assign Driver" from vehicle detail
- Update route assignments

**Acceptance Criteria:**
- Current driver assignment displays prominently
- "Unassigned" shown if no driver assigned
- Primary and secondary routes display
- Assignment changes reflect in both vehicle and driver records
- Change history is logged

**Out of Scope:**
- Real-time GPS tracking map interface
- Maintenance work order creation and management
- Fuel tracking and cost analysis
- Replacement planning workflows
- Integration with maintenance management systems
- Vehicle procurement processes

---

## 5. Driver Management

### Feature Overview
Comprehensive driver management with professional photos, safety performance tracking, certification monitoring, and incident correlation for workforce oversight.

### User Stories

#### 5.1 View Driver Roster
**As a** Transportation Director  
**I want to** see all drivers in the system  
**So that** I can monitor driver status and performance

**Primary User Types:** Transportation Director, Fleet Manager, Safety Coordinator

**Key Interactions:**
- View drivers in sortable table format
- See driver photos/avatars
- View summary statistics (total drivers, active, certifications due, average safety rating)
- Click driver ID to view profile
- Filter by employment status

**Acceptance Criteria:**
- Display all drivers in table with photos
- Show driver ID, name (with photo), contact, assigned vehicle, route, status, safety rating
- Driver photos display as circular avatars (40px)
- Fallback to initials if no photo available
- Safety rating shows as numeric value out of 5.0
- Color coding for safety rating: Green (4.5-5.0), Blue (3.5-4.4), Orange (2.5-3.4), Red (<2.5)
- Default sort by name (alphabetical)
- Summary cards show accurate counts

---

#### 5.2 Monitor Driver Certifications
**As a** Transportation Director  
**I want to** track driver certifications and renewal dates  
**So that** I can ensure compliance and prevent lapses

**Primary User Types:** Transportation Director, HR Administrator

**Key Interactions:**
- View "Certifications Due" count in summary
- Filter to drivers with expiring certifications
- View certification details in driver profile
- See days until expiration

**Acceptance Criteria:**
- Dashboard shows count of certifications expiring within 60 days
- Driver profile displays all certifications with expiration dates
- Color coding: Red (expired or <15 days), Orange (15-30 days), Yellow (30-60 days), Green (>60 days)
- Includes: CDL, First Aid/CPR, training certifications, physical exam
- Sortable by next expiration date

---

#### 5.3 View Driver Profile
**As a** Transportation Director  
**I want to** view complete information about a driver  
**So that** I can assess performance, assignments, and compliance

**Primary User Types:** Transportation Director, Fleet Manager, Safety Coordinator

**Key Interactions:**
- Click driver ID from table
- View profile information (name, employee ID, contact, hire date, status)
- See employment details (employment type, shift, home location)
- Review assignment information (vehicle, routes, route details)
- View certifications (CDL, First Aid/CPR, training, physical exam with expiration dates)
- Review safety rating and performance metrics
- View complete incident history (incidents reported by this driver)

**Acceptance Criteria:**
- Modal displays all driver information organized in sections
- Driver photo displays prominently (80px)
- Contact information includes phone, email, emergency contact
- Assignment shows current vehicle and routes
- Certifications list all required credentials with expiration dates
- Safety rating displays with visual indicator (stars or numeric)
- Incident history shows chronological list
- Each incident is clickable to view details

---

#### 5.4 Track Driver Safety Performance
**As a** Transportation Director  
**I want to** monitor driver safety ratings and incident history  
**So that** I can identify training needs and recognize excellence

**Primary User Types:** Transportation Director, Safety Coordinator

**Key Interactions:**
- View safety rating in driver table
- Sort drivers by safety rating
- Review incident count per driver
- Analyze incident types and trends

**Acceptance Criteria:**
- Safety rating calculated from multiple factors (incidents, violations, commendations)
- Rating scale 1.0-5.0 with one decimal place
- Color coding provides quick visual assessment
- Incident count shows year-to-date total
- Incident history reveals patterns
- Can compare drivers across fleet

---

#### 5.5 Filter and Search Drivers
**As a** Transportation Director  
**I want to** search and filter the driver list  
**So that** I can quickly find specific drivers or groups

**Primary User Types:** Transportation Director, Fleet Manager

**Key Interactions:**
- Search by name, employee ID, route, vehicle, or phone
- Filter by employment status (All, Active, On Leave, Inactive)
- View filtered results

**Acceptance Criteria:**
- Search is real-time and case-insensitive
- Status filter shows current employment status
- Search matches any entered field
- Results update immediately
- Clear filters button resets to defaults

---

#### 5.6 Manage Driver Assignments
**As a** Transportation Director  
**I want to** view and update driver assignments  
**So that** I can optimize route coverage

**Primary User Types:** Transportation Director, Fleet Manager

**Key Interactions:**
- View assigned vehicle and routes
- Update vehicle assignment
- Update route assignment
- Reassign incidents from one driver to another

**Acceptance Criteria:**
- Current assignments display in driver profile
- "Unassigned" shown if no vehicle/route assigned
- Assignment changes reflect in vehicle and route records
- Reassignment requires confirmation
- Change history is logged

**Out of Scope:**
- Driver scheduling and shift management
- Payroll integration
- Performance review workflows
- Disciplinary action tracking
- Training registration and completion tracking
- Background check management

---

## 6. Communications

### Feature Overview
Integrated messaging system enabling real-time communication between safety coordinators and drivers about specific incidents, with message threading, status tracking, and notification capabilities.

### User Stories

#### 6.1 View Communications Dashboard
**As a** Safety Coordinator  
**I want to** see all incident communications in one place  
**So that** I can manage driver correspondence efficiently

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- View list of incidents with active communications
- See incident details (ID, date, student, type, driver, bus, route)
- View unread message count per incident
- See last message preview and timestamp
- Filter communications by status (All, Pending Response, Active Discussion, Resolved)
- Search communications by incident ID, student name, or driver name

**Acceptance Criteria:**
- List shows all incidents with at least one message
- Unread count badge displays prominently
- Last message preview shows sender and partial content
- Status badge indicates communication state
- Click incident to open conversation thread
- Real-time updates when new messages arrive
- Summary shows: Total Communications, Awaiting Response, Resolved, Average Response Time

---

#### 6.2 View Conversation Thread
**As a** Safety Coordinator  
**I want to** view the complete message history for an incident  
**So that** I can understand the full context of communications

**Primary User Types:** Safety Coordinator, Transportation Director, Driver

**Key Interactions:**
- Click incident from communications list
- View message thread in chronological order
- See message sender, role, content, timestamp, and status (sent/delivered/read)
- Distinguish between coordinator messages and driver messages
- View incident summary panel alongside messages

**Acceptance Criteria:**
- Messages display in chronological order (oldest first or newest first user preference)
- Each message shows sender name, role badge, timestamp
- Message status indicators: Sent (one check), Delivered (two checks), Read (two blue checks)
- Coordinator messages align right with blue background
- Driver messages align left with gray background
- Scrollable message area maintains readability
- Incident summary panel shows key incident details
- Auto-scroll to latest message on open

---

#### 6.3 Send Messages
**As a** Safety Coordinator  
**I want to** send messages to drivers about incidents  
**So that** I can request additional information or provide guidance

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Type message in text input area
- Click "Send" button or press Enter
- See message appear immediately in thread
- View delivery status update

**Acceptance Criteria:**
- Text input supports multi-line messages
- Character limit of 2000 characters
- Send button disabled if message is empty
- Enter key sends message (Shift+Enter for new line)
- Message appears immediately after sending
- Timestamp reflects actual send time
- Delivery status updates when received
- Input clears after successful send

---

#### 6.4 Receive Driver Responses
**As a** Safety Coordinator  
**I want to** be notified when drivers respond to my messages  
**So that** I can provide timely follow-up

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Receive notification badge on communications page
- See unread count on incident list
- View new message in conversation thread
- Mark messages as read when viewing

**Acceptance Criteria:**
- Notification badge shows count of unread messages
- Incident list highlights conversations with unread messages
- Messages marked as read when viewed
- Real-time updates without page refresh (every 30 seconds polling or websocket)
- Sound notification for new messages (user preference)

---

#### 6.5 Navigate from Communications to Incident
**As a** Safety Coordinator  
**I want to** easily navigate between communications and full incident details  
**So that** I can access all information needed to respond effectively

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Click "View Incident" button from communication panel
- Open incident in detail modal
- Return to communications after reviewing incident

**Acceptance Criteria:**
- "View Incident" button opens incident detail modal
- Modal displays full incident information with all tabs
- Can navigate to incident from any point in conversation
- Return to communications preserves scroll position
- Incident changes reflect in communication panel

---

#### 6.6 Filter and Search Communications
**As a** Safety Coordinator  
**I want to** filter and search communications  
**So that** I can find specific conversations quickly

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Enter search terms to find incidents
- Filter by communication status
- Filter by incident severity
- Filter by driver
- Sort by last message time

**Acceptance Criteria:**
- Search matches incident ID, student name, driver name, incident type
- Status filter: All, Pending Response, Active Discussion, Resolved
- Severity filter: All, High, Medium, Low
- Results update in real-time
- Sort options: Last Message (newest/oldest), Unread First, Severity
- Clear filters button resets to defaults

---

#### 6.7 Mark Communications as Resolved
**As a** Safety Coordinator  
**I want to** mark communication threads as resolved  
**So that** I can focus on active conversations

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Click "Mark as Resolved" button
- Confirm action
- Thread moves to resolved filter
- Can reopen if needed

**Acceptance Criteria:**
- Resolved button available in conversation view
- Confirmation dialog prevents accidental resolution
- Resolved threads remain accessible via filter
- Can search resolved communications
- Reopening creates history entry
- Status badge updates to "Resolved"

**Out of Scope:**
- Email notifications (future enhancement)
- SMS messaging integration
- File attachments in messages
- Group messaging (more than 2 participants)
- Message editing or deletion
- Read receipts showing exact read time
- Typing indicators
- Rich text formatting

---

## 7. Workflow System

### Feature Overview
Automated workflow assignment and step-by-step process management ensuring consistent incident handling based on type and severity, with approval processes, notifications, and complete audit trails.

### User Stories

#### 7.1 View Workflow Templates
**As a** Transportation Director  
**I want to** see all available workflow templates  
**So that** I can understand how different incident types are processed

**Primary User Types:** Transportation Director, Safety Coordinator, District Administrator

**Key Interactions:**
- View list of workflow templates
- See workflow name, description, applicable incident types, severity levels
- View step count and estimated duration
- See active/inactive status
- Filter by category, severity, or incident type
- Search workflows by name or description

**Acceptance Criteria:**
- Display all workflow templates in card or list format
- Show key metadata: name, description, steps, duration, incident types, severity
- Active badge for enabled workflows
- Step count shows total number of workflow steps
- Estimated duration shows total time from all steps
- Usage count shows how many times workflow has been applied
- Filter and search update results in real-time

---

#### 7.2 Automatically Assign Workflow to Incident
**As a** Safety Coordinator  
**I want to** incidents to automatically receive appropriate workflows  
**So that** I don't have to manually determine the correct process each time

**Primary User Types:** Safety Coordinator (benefits from automation)

**Key Interactions:**
- Create new incident with type and severity
- System automatically assigns matching workflow
- View assigned workflow in incident detail
- Workflow appears on Workflow tab

**Acceptance Criteria:**
- Workflow assigned based on incident type and severity matching template criteria
- If multiple workflows match, use most specific (highest priority)
- If no workflow matches, assign default "General Incident Review" workflow
- Assignment happens automatically when incident is created
- Assignment logged in incident history
- Coordinator can manually change workflow if needed
- Enrichment occurs when navigating to incident detail from dashboard or incident list

---

#### 7.3 View Workflow Progress
**As a** Safety Coordinator  
**I want to** see the progress of an incident through its workflow  
**So that** I can understand where we are in the process and what's next

**Primary User Types:** Safety Coordinator, Transportation Director, Driver

**Key Interactions:**
- View workflow widget in Overview tab showing progress circle
- Click "View Workflow" to navigate to Workflow tab
- See list of all workflow steps
- View status of each step (Not Started, In Progress, Completed, Pending Approval, Approved, Rejected)
- See assigned role for each step
- View estimated duration per step
- Identify current active step

**Acceptance Criteria:**
- Overview tab shows workflow name and progress percentage
- Progress circle visually represents completion (e.g., 33% = 2 of 6 steps complete)
- Workflow tab lists all steps in order
- Each step shows: name, description, assigned role, status, estimated duration
- Visual indicators differentiate step statuses (colors, icons)
- Current step highlighted
- Completed steps show completion date/time and completing user
- Future steps appear grayed out or muted

---

#### 7.4 Complete Workflow Steps
**As a** Safety Coordinator  
**I want to** mark workflow steps as complete  
**So that** I can progress the incident through the resolution process

**Primary User Types:** Safety Coordinator, Transportation Director, Driver (assigned roles)

**Key Interactions:**
- Navigate to Workflow tab in incident detail
- Click "Complete Step" button for current step
- Enter completion comments (required)
- Confirm completion
- Step status updates to "Completed"
- Next step status updates to "In Progress" (if auto-trigger enabled)

**Acceptance Criteria:**
- Only current step can be completed (steps must be done in order)
- Completion requires comments (minimum 10 characters)
- User name and timestamp recorded automatically
- Completion creates entry in History tab with full datetime
- Visual feedback confirms completion (checkmark, green status)
- Next step automatically triggered based on trigger configuration
- Cannot mark future steps complete without completing prior steps
- Cannot "uncomplete" a step once marked complete

---

#### 7.5 Handle Approval Steps
**As a** Safety Coordinator  
**I want to** request approval from supervisors for certain steps  
**So that** critical decisions receive appropriate oversight

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Complete step that requires approval
- Step status changes to "Pending Approval"
- Approver receives notification (future)
- Approver views step and reviews information
- Approver clicks "Approve" or "Reject" with comments
- If approved, step status becomes "Approved" and next step begins
- If rejected, step returns to assigned user with rejection reason

**Acceptance Criteria:**
- Steps requiring approval flagged in workflow configuration
- Approver list defined in workflow template
- Pending Approval status clearly visible
- Approvers can view all context before deciding
- Approval/rejection requires comments
- Approval decision logged in history with approver name and timestamp
- Rejected steps allow re-submission after addressing concerns
- Email notification sent to approvers (future enhancement)

---

#### 7.6 View Workflow History
**As a** District Administrator  
**I want to** see a complete audit trail of workflow activities  
**So that** I can ensure accountability and compliance

**Primary User Types:** District Administrator, Transportation Director, Safety Coordinator

**Key Interactions:**
- Navigate to History tab in incident detail
- View chronological timeline of all workflow activities
- See who completed each step and when
- Read comments for each completed step
- Filter history by activity type (workflow steps, status changes, edits, etc.)

**Acceptance Criteria:**
- History tab shows all workflow step completions
- Each entry shows: activity type icon, description, user, date/time
- Format: "Step [Name] completed by [User] on MM/DD/YYYY at HH:MM AM/PM"
- Comments included in history entries
- Approval decisions shown with approver name
- Chronological order (newest first or oldest first)
- Expandable sections for detailed information
- Export history to PDF option
- Visual timeline with connecting lines

---

#### 7.7 Create Custom Workflows
**As a** Transportation Director  
**I want to** create custom workflows for district-specific processes  
**So that** our unique procedures are reflected in the system

**Primary User Types:** Transportation Director, District Administrator

**Key Interactions:**
- Click "Create New Workflow" button
- Enter workflow name and description
- Select applicable incident types and severity levels
- Add workflow steps using step library or custom steps
- Configure each step: name, description, assigned role, estimated duration, requirements
- Set approval requirements for specific steps
- Configure email notifications per step
- Set step triggers (manual, auto-complete, time-delay, status-change, approval-granted)
- Save workflow as draft or activate immediately
- Test workflow before activating

**Acceptance Criteria:**
- Workflow creation wizard guides user through process
- Can add unlimited steps
- Step library provides common pre-configured steps
- Can create fully custom steps
- Drag and drop to reorder steps
- Preview workflow before saving
- Validation prevents incomplete or invalid workflows
- Draft workflows not available for incident assignment
- Active workflows immediately available for matching incidents
- Can duplicate existing workflow as starting point

---

#### 7.8 Edit Workflow Templates
**As a** Transportation Director  
**I want to** modify existing workflow templates  
**So that** I can improve processes based on experience

**Primary User Types:** Transportation Director, District Administrator

**Key Interactions:**
- Select workflow from list
- Click "Edit" button
- Modify workflow properties (name, description, types, severities)
- Add, remove, or reorder steps
- Update step configurations
- Save changes

**Acceptance Criteria:**
- Can edit any workflow template
- Changes to template do not affect in-progress incidents using old version
- Version history maintained
- Warning if workflow is actively used by open incidents
- Last modified date and user recorded
- Can deactivate workflow to prevent new assignments

---

#### 7.9 View Workflow Step Library
**As a** Transportation Director  
**I want to** browse pre-configured workflow step templates  
**So that** I can build workflows faster using proven step definitions

**Primary User Types:** Transportation Director, District Administrator

**Key Interactions:**
- Navigate to Workflow Step Library
- View categorized step templates (Documentation, Notification, Investigation, Intervention, Resolution)
- See step details (name, description, typical role, estimated duration)
- Add step template to workflow being built
- Customize step after adding from library

**Acceptance Criteria:**
- Step library organized by category
- Search and filter step templates
- Preview step details before adding
- Adding step creates copy (doesn't reference template)
- Can create custom steps not in library
- District can save custom steps to library for reuse

**Out of Scope:**
- Conditional branching in workflows (if/then logic)
- Parallel step execution (all steps are sequential)
- Automatic workflow selection based on AI/ML
- Integration with external approval systems
- Workflow performance benchmarking against industry standards
- Mobile app for workflow step completion
- Workflow simulation/testing with mock data

---

## 8. Reports & Analytics

### Feature Overview
Comprehensive reporting and data visualization tools enabling data-driven decision making, trend analysis, and regulatory compliance through pre-configured and custom reports.

### User Stories

#### 8.1 Generate Quick Reports
**As a** Transportation Director  
**I want to** generate common reports with one click  
**So that** I can quickly access key information without configuration

**Primary User Types:** Transportation Director, District Administrator, Safety Coordinator

**Key Interactions:**
- View list of available quick reports
- Click report card to generate
- Select export format (PDF or CSV)
- Download report file
- View last run date for each report

**Acceptance Criteria:**
- Quick reports include: Monthly Summary, Student Incident History, Driver Performance, High Severity Incidents, Vehicle Incident Report, Open Incidents, Weekly Trends, Repeat Offenders
- Each report card shows name, description, icon, last run date
- Click generates report immediately
- Export format selection dialog appears
- PDF format includes charts and formatted layout
- CSV format includes all data columns
- Filename includes report name and current date
- Toast notification confirms download

---

#### 8.2 Filter Report Data
**As a** Safety Coordinator  
**I want to** filter data before generating a report  
**So that** I can focus on specific time periods, schools, or incident types

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Select report type
- Choose date range (preset or custom)
- Select filters (school, grade, driver, vehicle, incident type, severity, status)
- Preview data count matching filters
- Generate filtered report

**Acceptance Criteria:**
- Date range presets: Last 7 Days, Last 30 Days, Last 90 Days, This Year, Custom Range
- All applicable filters available based on report type
- Data count preview updates as filters change
- Clear filters button resets to defaults
- Filters applied before report generation
- Filter selections included in report header for context

---

#### 8.3 View Report Preview
**As a** Transportation Director  
**I want to** preview a report before downloading  
**So that** I can verify it contains the correct information

**Primary User Types:** Transportation Director, District Administrator

**Key Interactions:**
- Generate report
- View preview in modal or new tab
- Review data, charts, and summary statistics
- Export if satisfactory or adjust filters and regenerate

**Acceptance Criteria:**
- Preview shows full report layout
- Charts render correctly
- Summary statistics calculated accurately
- Data tables formatted properly
- Print-friendly styling
- Can close preview without downloading
- Can export directly from preview

---

#### 8.4 Schedule Recurring Reports
**As a** Transportation Director  
**I want to** schedule reports to generate automatically  
**So that** I receive regular updates without manual effort

**Primary User Types:** Transportation Director, District Administrator

**Key Interactions:**
- Select report type
- Click "Schedule Report"
- Choose frequency (daily, weekly, monthly)
- Select delivery method (email, save to dashboard)
- Set recipients
- Confirm schedule

**Acceptance Criteria:**
- Frequency options: Daily, Weekly (day of week), Monthly (date), Custom
- Email delivery includes PDF attachment
- Dashboard delivery saves to "Scheduled Reports" area
- Recipients receive reports at scheduled time
- Can edit or cancel scheduled reports
- Report generation history maintained

**Out of Scope (Future Enhancements):**
- Custom report builder with drag-and-drop fields
- Advanced analytics (predictive modeling, risk scoring)
- Benchmarking against other districts
- Interactive dashboards with drill-down capability
- Report sharing with external stakeholders (parents, school principals)
- Report templates marketplace

---

#### 8.5 Export Data
**As a** Safety Coordinator  
**I want to** export raw data in CSV format  
**So that** I can perform custom analysis in Excel or other tools

**Primary User Types:** Safety Coordinator, Transportation Director, Data Analyst

**Key Interactions:**
- Navigate to any data table (Incidents, Students, Drivers, Vehicles)
- Apply filters and sorting as desired
- Click "Export" button
- Select CSV format
- Download file

**Acceptance Criteria:**
- Export includes all visible columns
- Respects current filters and sorting
- CSV format opens in Excel/Google Sheets
- Filename includes data type and export date (e.g., incidents-export-2026-02-06.csv)
- Large datasets export without timeout
- Special characters properly encoded
- Date/time formats consistent

---

#### 8.6 View Dashboard Analytics
**As a** District Administrator  
**I want to** see high-level analytics on the dashboard  
**So that** I can monitor overall transportation safety at a glance

**Primary User Types:** District Administrator, Transportation Director

**Key Interactions:**
- View dashboard summary cards
- Review trend charts (incidents over time, by type, by driver, by day of week)
- Identify patterns and anomalies
- Click chart elements for drill-down (future)

**Acceptance Criteria:**
- Summary cards show key metrics with comparison to previous period
- Trend line chart shows incident volume over time
- Pie chart shows incident distribution by type
- Bar charts show incidents by driver and day of week
- Color coding highlights concerning trends
- Tooltips provide additional detail
- Charts update based on dashboard time filter

**Out of Scope:**
- Real-time live dashboards with automatic refresh
- Custom dashboard configuration per user
- Advanced statistical analysis (regression, correlation)
- Comparative analysis between schools or routes
- Goal setting and progress tracking
- External data integration (weather, school events)

---

## 9. New Incident Entry

### Feature Overview
Streamlined incident reporting form allowing drivers and coordinators to quickly capture incident details, upload documentation, and initiate workflow processes.

### User Stories

#### 9.1 Create New Incident Report
**As a** Driver  
**I want to** report an incident that occurred on my route  
**So that** safety coordinators are aware and can take appropriate action

**Primary User Types:** Driver, Safety Coordinator

**Key Interactions:**
- Click "New Incident" button from dashboard or incidents page
- Select incident type from categorized dropdown
- Enter incident date and time
- Select student involved (if applicable)
- Select vehicle/bus
- Enter location details
- Provide detailed description
- Rate severity
- Submit report

**Acceptance Criteria:**
- Form is organized into logical sections
- Incident types grouped by category (Behavioral, Safety, Aggression, etc.)
- Student selection searchable by name or ID
- Vehicle selection shows assigned vehicle by default
- Date/time defaults to current but is editable
- Location field supports free text or map selection (future)
- Description is required, minimum 20 characters
- Severity selection: High, Medium, Low with guidance text
- All required fields validated before submission
- Submission creates incident and auto-assigns workflow
- Confirmation message shows incident ID
- Option to add photos/documents immediately after creation

---

#### 9.2 Select Incident Type
**As a** Driver  
**I want to** choose the incident type from a clear categorized list  
**So that** I accurately classify what happened

**Primary User Types:** Driver, Safety Coordinator

**Key Interactions:**
- Click incident type dropdown
- Browse categories (Behavioral, Safety Violation, Aggression/Violence, etc.)
- Select specific incident type from category
- View description tooltip for guidance

**Acceptance Criteria:**
- Types organized by parent category
- Each type has clear label and description
- Description provides examples
- Categories: Behavioral, Safety Violation, Aggression/Violence, Driver Defiance, Property Damage, Prohibited Items, Privacy Violation, Driver Operational, Driver Safety, Vehicle Incident
- Selection updates recommended severity
- Can search/filter incident types
- Most common types appear at top (future)

---

#### 9.3 Search and Select Students
**As a** Driver  
**I want to** easily find the student involved in the incident  
**So that** I don't have to remember student IDs

**Primary User Types:** Driver, Safety Coordinator

**Key Interactions:**
- Click student field
- Type student name (first, last, or partial)
- Select student from filtered dropdown
- View student photo and ID in selection

**Acceptance Criteria:**
- Autocomplete search as user types
- Shows photo, name, ID, grade, school
- Matches first name, last name, or student ID
- At least 2 characters required to search
- Clear selected student option
- Can proceed without selecting student for some incident types (vehicle incidents)

---

#### 9.4 Upload Photos and Documents
**As a** Driver  
**I want to** attach photos and documents to an incident report  
**So that** I can provide visual evidence and supporting information

**Primary User Types:** Driver, Safety Coordinator

**Key Interactions:**
- Click "Add Photos" button
- Select photos from device (camera or gallery)
- Photos upload and thumbnail previews appear
- Click "Add Documents" button
- Select PDF, Word, or other documents
- Documents upload and file names appear
- Can remove uploaded files before submission

**Acceptance Criteria:**
- Supports common image formats (JPG, PNG, HEIC)
- Supports common document formats (PDF, DOC, DOCX)
- Maximum file size: 10MB per file
- Maximum 10 photos and 5 documents per incident
- Drag and drop support (desktop)
- Upload progress indicator
- Thumbnail previews for photos
- File size and type validation
- Can remove files before submission
- Files associated with incident after creation

---

#### 9.5 Add Witness Information
**As a** Driver  
**I want to** record witness information  
**So that** investigators have contacts for follow-up

**Primary User Types:** Driver, Safety Coordinator

**Key Interactions:**
- Click "Add Witness" button
- Enter witness name
- Select witness type (Student, Driver, Staff, Parent, Other)
- Enter contact information
- Add brief statement
- Save witness information
- Repeat for additional witnesses

**Acceptance Criteria:**
- Support multiple witnesses per incident
- Witness type dropdown with options
- Contact field for phone or email
- Statement field optional but recommended
- Can edit or remove witnesses before submission
- Witness information appears in incident detail

---

#### 9.6 Save Draft Incident
**As a** Driver  
**I want to** save an incomplete incident report as a draft  
**So that** I can finish it later without losing information

**Primary User Types:** Driver, Safety Coordinator

**Key Interactions:**
- Click "Save Draft" button
- Draft saved with current form data
- Return to form later to complete
- Drafts accessible from "My Drafts" section

**Acceptance Criteria:**
- Save Draft button always available
- No required field validation for drafts
- Draft saved with current timestamp
- User can have multiple drafts
- Drafts list shows incident type, student, date saved
- Can edit, delete, or submit drafts
- Draft auto-saved every 2 minutes (future)

---

#### 9.7 Review and Submit Incident
**As a** Driver  
**I want to** review all information before submitting  
**So that** I can ensure accuracy

**Primary User Types:** Driver, Safety Coordinator

**Key Interactions:**
- Complete all required fields
- Click "Review" or "Submit" button
- View summary of all entered information
- Edit any section if needed
- Confirm submission

**Acceptance Criteria:**
- Review screen shows all entered data
- Can return to form to edit
- Submit button creates incident
- Workflow automatically assigned
- Incident ID generated immediately
- Confirmation message with incident ID
- Option to print or email confirmation
- Redirected to incident detail page after submission

**Out of Scope:**
- Offline incident reporting (mobile app)
- Voice-to-text for description entry
- Map-based location selection
- Integration with dash camera footage
- Automatic student roster suggestions based on route
- Template incident reports for common scenarios
- Multi-incident reporting (multiple students in one report)

---

## 10. Search & Filtering

### Feature Overview
Universal search and advanced filtering capabilities across all data entities (incidents, students, drivers, vehicles) enabling users to quickly find information and identify patterns.

### User Stories

#### 10.1 Universal Search
**As a** Safety Coordinator  
**I want to** search across all entities from one search box  
**So that** I can find information quickly without knowing where to look

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Type in global search box (in header/navigation)
- View categorized results (Incidents, Students, Drivers, Vehicles)
- Click result to navigate to detail view
- See result count per category

**Acceptance Criteria:**
- Search box accessible from all pages
- Searches across: Incident IDs, student names, driver names, vehicle numbers, routes
- Results grouped by entity type
- Shows top 5 results per category
- "View All" option for each category
- Real-time search with debounce
- Keyboard navigation (arrow keys, enter to select)
- Escape key closes results
- Recent searches saved (session)

**Out of Scope (Future Enhancement):**
- Full-text search of incident descriptions
- Advanced query syntax (AND, OR, NOT)
- Search filters directly in universal search
- Search history across sessions
- Search suggestions based on popular queries

---

#### 10.2 Filter Incidents by Multiple Criteria
**As a** Safety Coordinator  
**I want to** apply multiple filters simultaneously to incidents  
**So that** I can narrow results to exactly what I need

**Primary User Types:** Safety Coordinator, Transportation Director

**Key Interactions:**
- Apply search text
- Select status filter
- Select severity filter
- Select type filter
- Select assigned to filter
- Select date range filter
- View filtered results
- Clear all filters

**Acceptance Criteria:**
- All filters work in combination (AND logic)
- Results update in real-time
- Active filters shown as badges
- Can remove individual filter without clearing all
- Clear All Filters button resets to defaults
- Result count updates with filters
- Filters persist during session
- Can save filter combinations (future)

---

#### 10.3 Sort Data Tables
**As a** Safety Coordinator  
**I want to** sort data by different columns  
**So that** I can organize information in the most useful way

**Primary User Types:** All users

**Key Interactions:**
- Click column header to sort ascending
- Click again to sort descending
- Click third time to reset to default sort
- View sort direction indicator

**Acceptance Criteria:**
- All table columns are sortable
- Visual indicator shows sort column and direction (up/down chevron)
- Custom sort for severity (Critical > High > Medium > Low)
- Custom sort for status (Open > In Progress > Under Review > Resolved > Closed)
- Alphabetical sort for text fields
- Numeric sort for numbers and dates
- Sort preserved with filters applied
- Default sort per page (usually date descending)

---

#### 10.4 Advanced Filtering
**As a** Transportation Director  
**I want to** build complex filters with multiple conditions  
**So that** I can perform sophisticated data analysis

**Primary User Types:** Transportation Director, Data Analyst

**Key Interactions:**
- Click "Advanced Filters" button
- Add filter conditions (field, operator, value)
- Use AND/OR logic between conditions
- Save filter as named filter set
- Apply saved filter sets

**Acceptance Criteria:**
- Available operators: equals, not equals, contains, greater than, less than, between, in list
- Can combine multiple conditions
- AND/OR toggle between condition groups
- Save filter sets with names
- Load saved filter sets from dropdown
- Delete saved filter sets
- Export filtered data
- Clear advanced filters

**Out of Scope (Current Version):**
- This feature is planned for future release
- Current version supports basic single-field filters only

---

## 11. Navigation & Layout

### Feature Overview
Intuitive navigation system with sidebar menu, page routing, breadcrumbs, and responsive design ensuring users can efficiently move through the application.

### User Stories

#### 11.1 Navigate Between Pages
**As a** Safety Coordinator  
**I want to** easily navigate between different sections of the application  
**So that** I can access the information I need quickly

**Primary User Types:** All users

**Key Interactions:**
- Click menu items in sidebar
- View current page highlighted in menu
- Use breadcrumbs to navigate back
- Use browser back/forward buttons

**Acceptance Criteria:**
- Sidebar shows all main pages: Dashboard, Incidents, Students, Vehicles, Drivers, Communications, Workflows, Reports, Help
- Current page highlighted in sidebar
- Sidebar collapsible on smaller screens
- Breadcrumb trail shows navigation path
- Browser history works correctly
- Page titles update per page
- Smooth page transitions

---

#### 11.2 View Notifications
**As a** Safety Coordinator  
**I want to** see notifications about important events  
**So that** I can stay informed of urgent matters

**Primary User Types:** All users

**Key Interactions:**
- Click bell icon in header
- View notification dropdown
- See unread count badge
- Click notification to view detail
- Mark individual notifications as read
- Mark all as read

**Acceptance Criteria:**
- Bell icon in header shows unread count badge
- Dropdown lists recent notifications (last 20)
- Notification types: New incident, Message received, Workflow step pending, Certification expiring
- Each notification shows timestamp, icon, and brief message
- Click notification navigates to related page/item
- Notifications marked read when viewed
- "View All Notifications" link to full page
- Real-time updates (polling every 60 seconds)

---

#### 11.3 Access Help and Documentation
**As a** Driver  
**I want to** access help documentation  
**So that** I can learn how to use the system

**Primary User Types:** All users

**Key Interactions:**
- Click "Help" in sidebar or header
- Browse help topics
- Search help articles
- View tutorial videos (future)
- Contact support

**Acceptance Criteria:**
- Help page organized by feature area
- Searchable help content
- Clear instructions with screenshots
- Frequently asked questions section
- Contact information for support
- Version information displayed

---

#### 11.4 Responsive Mobile Layout
**As a** Driver  
**I want to** use the application on my mobile device  
**So that** I can report incidents immediately when they occur

**Primary User Types:** Driver, Safety Coordinator

**Key Interactions:**
- Access application on mobile browser
- Navigate using touch gestures
- View optimized layouts for small screens
- Use mobile-friendly form inputs

**Acceptance Criteria:**
- Responsive design for screens 320px and up
- Sidebar converts to hamburger menu on mobile
- Tables convert to stacked cards or horizontal scroll
- Forms optimized for touch input
- Large touch targets (minimum 44px)
- No horizontal scrolling for content
- Performance optimized for mobile networks

---

#### 11.5 User Profile and Settings
**As a** Safety Coordinator  
**I want to** view and edit my profile  
**So that** my contact information is current

**Primary User Types:** All users

**Key Interactions:**
- Click profile icon/name in header
- View profile information
- Edit name, email, phone
- Change password
- Update notification preferences
- Save changes

**Acceptance Criteria:**
- Profile dropdown shows user name, role, email
- Profile page displays all user information
- Edit form for updatable fields
- Password change requires current password
- Notification preferences for email and in-app notifications
- Changes saved with confirmation
- Profile photo upload (future)

**Out of Scope (Current Version):**
- Multi-language support
- Dark mode theme
- Customizable dashboard layouts
- Keyboard shortcuts configuration
- Accessibility settings panel

---

## Cross-Cutting Concerns

### Authentication & Authorization

**User Stories:**

**As a** System Administrator  
**I want to** users to log in with credentials  
**So that** only authorized personnel can access the system

**Key Interactions:**
- Enter username and password
- Click login button
- System validates credentials
- User redirected to dashboard

**Assumptions:**
- Authentication is handled by external identity provider (SSO) or built-in auth system
- User credentials are managed by IT department
- Password policies enforced (complexity, expiration)
- Session timeout after inactivity
- Remember me option for convenience

---

**As a** System Administrator  
**I want to** control what features users can access based on their role  
**So that** sensitive information is protected

**Roles:**
- **Driver:** Report incidents, view own incidents, respond to messages
- **Safety Coordinator:** Full access to incidents, students, communications, workflows
- **Fleet Manager:** Full access to vehicles, drivers, maintenance
- **Transportation Director:** Full access to all features including workflows, reports, settings
- **District Administrator:** Read-only access to reports and analytics, user management
- **System Administrator:** All permissions plus system configuration

**Assumptions:**
- Role-based access control (RBAC) implemented
- Users have single primary role (not multiple)
- Permissions checked on both client and server
- Unauthorized access attempts logged

---

### Data Export & Reporting

**As a** user  
**I want to** export data to Excel/CSV  
**So that** I can perform offline analysis

**Key Interactions:**
- Click export button on any data table
- Select format (CSV)
- File downloads immediately

**Assumptions:**
- CSV format supported universally
- PDF format for formatted reports (future)
- Large exports handled efficiently (streaming or async generation)
- Exports respect current user permissions

---

### Audit Trail & Logging

**As a** District Administrator  
**I want to** all user actions to be logged  
**So that** we have accountability and can investigate issues

**What is Logged:**
- Incident creation, editing, status changes
- Workflow step completions
- Message sending
- Report generation
- User logins/logouts
- Permission changes (admin only)

**Assumptions:**
- Audit logs stored securely
- Logs include timestamp, user, action, affected records
- Logs are searchable by administrators
- Logs retained per district retention policy

---

### Performance & Scalability

**Requirements:**
- Page load time < 2 seconds
- Search results return within 500ms
- Support 500+ concurrent users
- Handle 10,000+ incidents
- Handle 5,000+ students
- Handle 500+ drivers
- Handle 300+ vehicles

**Assumptions:**
- Application hosted on reliable infrastructure
- Database properly indexed
- Caching implemented for frequently accessed data
- Images and files served from CDN or optimized storage

---

### Data Validation & Business Rules

**Incident Creation Rules:**
- Cannot create incident without incident type
- Cannot create student incident without selecting student
- Description minimum 20 characters
- Date cannot be more than 7 days in past without special permission
- Cannot have duplicate incident ID

**Workflow Rules:**
- Workflow steps must be completed in order
- Cannot skip required steps
- Approval steps must be approved before proceeding
- Step completion requires comments

**Student Rules:**
- Student ID must be unique
- At least one contact phone number required
- Grade must be K-12

**Driver Rules:**
- Driver ID must be unique
- CDL expiration cannot be in past for active drivers
- Cannot delete driver with open incidents

---

## Out of Scope

The following features are explicitly out of scope for the current version:

### Future Enhancements
- **Mobile Native Apps:** iOS and Android native applications
- **Offline Mode:** Ability to use app without internet connection
- **Push Notifications:** Real-time mobile push notifications
- **Email Integration:** Automatic email notifications for incidents and workflow steps
- **SMS Notifications:** Text message alerts for critical incidents
- **Video Upload:** Dash cam footage integration
- **Map Integration:** Real-time GPS tracking and incident location mapping
- **Parent Portal:** Parent self-service for viewing student incidents
- **School Portal:** Individual school access to incidents involving their students
- **Advanced Analytics:** Predictive modeling, risk scoring, ML-based insights
- **Integration Hub:** APIs for third-party integrations (student information systems, HR systems)
- **Custom Fields:** District-configurable custom fields per incident type
- **Multi-Language:** Support for languages beyond English
- **Dark Mode:** Alternative dark color scheme
- **Voice Input:** Speech-to-text for incident descriptions
- **Workflow Simulation:** Test workflows with sample data before activation
- **A/B Testing:** Test different workflow variations
- **Calendar Integration:** Sync incidents with Outlook/Google Calendar
- **Training Module:** Built-in training and certification tracking system

### Integrations (Future)
- Student Information System (SIS) integration
- Human Resources (HR) system integration
- Fleet maintenance management system integration
- GPS/AVL system real-time feed integration
- Email/calendar system integration (Outlook, Gmail)
- Document management system (SharePoint, Google Drive)
- Business intelligence tools (Power BI, Tableau)

---

## Assumptions & Constraints

### Assumptions

1. **User Access:**
   - All users have modern web browsers (Chrome, Firefox, Safari, Edge - latest versions)
   - Users have reliable internet connection during use
   - Minimum screen resolution: 1024x768 for desktop, 320px width for mobile
   
2. **Data:**
   - Student roster maintained in external system and imported
   - Driver roster maintained in external system and imported
   - Vehicle information maintained in external system and imported
   - User photos (students, drivers) provided by district
   - Historical incident data may be imported from legacy system

3. **Infrastructure:**
   - Application hosted on secure, reliable cloud infrastructure
   - Regular automated backups performed
   - Disaster recovery plan in place
   - SSL/TLS encryption for all communications
   - File storage for photos/documents available and scalable

4. **Business Process:**
   - Districts have defined incident types and categories
   - Districts have defined user roles and responsibilities
   - Districts have workflow processes they want to encode
   - Support team available for user questions and issues

5. **Compliance:**
   - Solution meets FERPA requirements for student data privacy
   - Solution meets accessibility standards (WCAG 2.1 AA - future goal)
   - Data retention policies defined by district
   - Incident records may be subject to public records requests

### Constraints

1. **Technical:**
   - Web-based application only (no native mobile apps in v1)
   - Browser-based notifications only (no push notifications in v1)
   - Synchronous workflow processing (no complex async workflows in v1)
   - File size limits for uploads (10MB per file)

2. **Functional:**
   - English language only in initial release
   - Single timezone per district
   - Incident workflows are sequential (no parallel branches in v1)
   - No custom reporting builder (pre-defined reports only in v1)

3. **Business:**
   - Implementation requires district IT involvement for user provisioning
   - Training required for all users before go-live
   - Change management support needed for adoption
   - Ongoing support and maintenance budget required

4. **Timeline:**
   - Initial release focused on core features
   - Future enhancements based on user feedback and priority
   - Breaking changes minimized; backward compatibility preferred

---

## Document Control

**Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Team | Initial comprehensive PRD |

**Approval:**

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | TBD | | |
| Transportation Director | TBD | | |
| Technical Lead | TBD | | |

---

## Appendix

### Glossary

- **AVL:** Automatic Vehicle Location - GPS tracking system
- **CDL:** Commercial Driver's License
- **FERPA:** Family Educational Rights and Privacy Act
- **Incident:** Any event requiring documentation related to student transportation
- **SIS:** Student Information System
- **TYD:** Tyler Technologies (vendor)
- **Workflow:** Defined series of steps for processing an incident

### Related Documents

- Technical Architecture Document
- Design System Guide
- User Guide
- API Documentation
- Workflow System Documentation
- QA Testing Guide

---

**End of Document**
