# Student Transportation Incident Tracker - Feature Documentation

## Table of Contents
1. [Dashboard](#dashboard)
2. [Incidents Management](#incidents-management)
3. [Workflow System](#workflow-system)
4. [Administration](#administration)
5. [Students Management](#students-management)
6. [Fleet Management (Vehicles)](#fleet-management-vehicles)
7. [Driver Management](#driver-management)
8. [New Incident Entry](#new-incident-entry)
9. [Reports & Analytics](#reports--analytics)
10. [Driver Communications](#driver-communications)
11. [Email Template System](#email-template-system)
12. [Data Export](#data-export)
13. [Search & Filtering](#search--filtering)
14. [Sorting Functionality](#sorting-functionality)
15. [Future Enhancements](#future-enhancements)

---

## Dashboard

### Purpose
The Dashboard provides a comprehensive overview of incident activity, trends, and key metrics for safety coordinators and administrators to monitor district-wide transportation safety.

### Key Statistics Cards

#### 1. Total Incidents
- **Display:** Large number with descriptive text
- **Purpose:** Shows complete count of all incidents in the system
- **Color:** Brand blue (#4A6FA5)
- **Updates:** Real-time based on time filter
- **Subtext:** "All incidents recorded" or time period indicator

#### 2. Active Incidents
- **Display:** Highlighted count with status indicator
- **Purpose:** Number of incidents currently open or under review
- **Color:** Brand olive (#8B9264) for normal, Orange for high counts
- **Updates:** Real-time
- **Subtext:** Shows breakdown (e.g., "15 open, 8 under review")

#### 3. Critical Incidents
- **Display:** Bold number with alert styling
- **Purpose:** High-priority incidents requiring immediate attention
- **Color:** Red (#ef4444) when > 0, otherwise blue
- **Updates:** Real-time
- **Subtext:** "Requiring immediate action"
- **Alert:** Visual indicator when > 0

#### 4. Average Response Time
- **Display:** Time in hours
- **Purpose:** Average time from incident creation to first action
- **Color:** Green if < 24 hours, Orange if 24-48 hours, Red if > 48 hours
- **Updates:** Calculated from active incidents
- **Subtext:** "Hours to first response"

### Time Period Filter

**Options:**
- Last 7 days
- Last 30 days (default)
- Last 90 days
- This Year
- Custom Date Range

**Behavior:**
- Changes all statistics and charts
- Persists during session
- Affects recent incidents list

### Incident Trends Chart

**Type:** Line Chart (Recharts)

**Features:**
- **X-Axis:** Time period (days, weeks, or months based on filter)
- **Y-Axis:** Number of incidents
- **Data Line:** Brand blue color (#4A6FA5)
- **Grid:** Light gray dotted lines
- **Hover:** Tooltip showing exact count
- **Animation:** Smooth line animation on load

**Insights:**
- Identify seasonal patterns
- Track incident rate changes
- Compare periods
- Spot anomalies

**Data Points:**
- Daily for 7-day view
- Weekly for 30 and 90-day views
- Monthly for yearly view

### Incidents by Type (Pie Chart)

**Type:** Donut/Pie Chart (Recharts)

**Categories:**
1. **Student Behavior** - Blue
2. **Safety Violation** - Orange
3. **Mechanical** - Gray
4. **Accident** - Red
5. **Other** - Light blue

**Features:**
- **Interactive Legend:** Click to highlight segment
- **Hover:** Shows count and percentage
- **Center Label:** Total incident count
- **Colors:** Brand colors for consistency

**Use Cases:**
- Identify most common incident types
- Resource allocation planning
- Training focus areas
- Policy development

### Incidents by School (Bar Chart)

**Type:** Horizontal Bar Chart (Recharts)

**Features:**
- **Y-Axis:** School names
- **X-Axis:** Incident count
- **Bars:** Gradient using brand colors
- **Hover:** Exact count tooltip
- **Sort:** Descending by count

**Insights:**
- Compare schools
- Identify high-incident locations
- Target interventions
- Resource distribution

**Color Coding:**
- High incidents (>15): Red tint
- Medium incidents (8-15): Orange tint
- Low incidents (<8): Green tint

### Recent Incidents Timeline

**Display:** List of 5 most recent incidents

**Information Shown:**
1. **Incident ID:** Clickable link (e.g., INC-001)
2. **Type Badge:** Color-coded category
3. **Description:** Brief summary (truncated to 100 characters)
4. **Date:** Relative time (e.g., "2 hours ago", "Yesterday")
5. **Status Badge:** Current workflow status

**Features:**
- **Click ID:** Opens full incident details in modal
- **Auto-refresh:** Updates every 60 seconds
- **Scroll:** Fixed height with scroll for overflow
- **View All Button:** Links to Incidents page

**Status Colors:**
- Open: Blue
- Under Review: Orange
- Resolved: Green
- Closed: Gray

### Quick Actions

**Buttons:**
1. **New Incident:** Opens incident creation form
2. **View All Incidents:** Navigates to Incidents page
3. **Generate Report:** Opens Reports page

---

## Incidents Management

### Purpose
Comprehensive incident tracking and management system for all transportation-related incidents.

### Summary Statistics

**Four Key Metrics:**

1. **Total Incidents**
   - Complete count in system
   - Includes all statuses
   - Historical data

2. **Open Incidents**
   - Newly reported incidents
   - Awaiting initial review
   - Requires assignment

3. **Under Review**
   - Active investigations
   - Pending decisions
   - In-progress actions

4. **Critical Priority**
   - Highest severity level
   - Requires immediate attention
   - Safety concerns

### Advanced Filtering System

#### Search Bar
- **Location:** Top left
- **Icon:** Magnifying glass
- **Placeholder:** "Search incidents..."
- **Searches:**
  - Incident ID
  - Student name
  - Driver name
  - Vehicle number
  - Description text
- **Behavior:** Real-time filtering as you type
- **Case-insensitive:** Matches regardless of case

#### Status Filter
**Options:**
- All Statuses (default - shows all)
- Open
- Under Review
- Resolved
- Closed

**Behavior:**
- Dropdown selection
- Instant filtering
- Combines with other filters

#### Severity Filter
**Options:**
- All Severities (default)
- Critical (red badge)
- High (orange badge)
- Medium (yellow badge)
- Low (gray badge)

**Use Case:**
- Focus on urgent matters
- Priority management
- Resource allocation

#### Type Filter
**Options:**
- All Types (default)
- Student Behavior
- Safety Violation
- Mechanical
- Accident
- Other

**Use Case:**
- Category analysis
- Specialized handling
- Training focus

#### Clear Filters Button
- Resets all filters to default
- Restores full incident list
- Maintains sort order

### Sortable Table

**Column Headers (all clickable):**

1. **Incident ID**
   - Format: INC-XXX
   - Clickable to view details
   - Sort: Alphanumeric
   - Default: Not sorted

2. **Date**
   - Format: MMM DD, YYYY
   - Sort: Chronological
   - Default: Descending (newest first)
   - Initial sort column

3. **Student**
   - Full name
   - Photo avatar (40px)
   - Sort: Alphabetical
   - Fallback: Initials

4. **Driver**
   - Full name
   - Sort: Alphabetical
   - Linked to driver profile

5. **Vehicle**
   - Bus number
   - Sort: Numeric
   - Linked to vehicle details

6. **Type**
   - Category badge
   - Color-coded
   - Sort: Alphabetical by type

7. **Severity**
   - Priority badge
   - Custom sort order: Critical > High > Medium > Low
   - Visual color coding

8. **Status**
   - Workflow badge
   - Custom sort order: Open > Under Review > Resolved > Closed
   - Color-coded

**Sorting Behavior:**
- **First Click:** Sort ascending
- **Second Click:** Sort descending
- **Third Click:** Return to default (date descending)
- **Visual Indicators:**
  - ⇅ Double chevron: Sortable (not active)
  - ↑ Up chevron: Sorted ascending
  - ↓ Down chevron: Sorted descending

**Table Features:**
- **Hover Effect:** Row highlights on hover
- **Row Click:** None (must click ID)
- **Pagination:** Scrollable (future: paginated)
- **Responsive:** Horizontal scroll on mobile
- **Alternating Rows:** Subtle background difference

### Incident Detail Modal

**Triggered By:** Clicking Incident ID

**Sections:**

#### Header
- Incident ID (large)
- Status badge
- Severity badge
- Close button (X)

#### Basic Information
- Date and time
- Incident type
- Location
- Run information

#### Involved Parties
- Student name, ID, grade, school
- Driver name, employee ID
- Vehicle/bus number
- Witness count

#### Incident Details
- Full description (unlimited length)
- Actions taken
- Injury information
  - Yes/No indicator
  - Details if applicable
  - Medical attention provided

#### Witnesses
- List of all witnesses
- Name, type, contact info
- Brief statements

#### Timeline
- Created date/time
- Created by (user)
- Last updated date/time
- Updated by (user)
- Resolved date/time (if applicable)
- Resolved by (user)

#### Actions
- **Update Status:** Change workflow status
- **Edit Details:** Modify incident information
- **View Related:** See connected incidents
- **Add Note:** Internal notes
- **Print:** Print incident report
- **Email:** Send to stakeholders

**Modal Behavior:**
- **Max Height:** 85vh (viewport height)
- **Scrollable:** Content area scrolls
- **Backdrop:** Semi-transparent dark overlay
- **Close Methods:**
  - X button
  - Click backdrop
  - ESC key

### Bulk Actions

**Future Feature:**
- Select multiple incidents
- Batch status updates
- Bulk export
- Mass assignment

### Export Functionality

**Button:** "Export" with download icon
**Location:** Top right of table

**Export Options:**
1. **CSV Format:**
   - All visible columns
   - Respects current filters
   - Filename: `incidents-export-YYYY-MM-DD.csv`
   - Opens in Excel/Google Sheets

2. **PDF Format (Future):**
   - Formatted report
   - Includes charts
   - Print-ready

**Data Included:**
- Incident ID
- Date
- Student name
- Driver name
- Vehicle
- Type
- Severity
- Status
- Description (truncated)

---

## Workflow System

### Overview

The Incident Tracker includes a comprehensive Workflow System that automates and standardizes incident response processes. This system ensures consistent handling of all incidents according to district policies and provides complete accountability and tracking.

### Key Features

- **Automated Workflow Assignment:** Incidents automatically receive appropriate workflows based on type and severity
- **Customizable Workflows:** Create district-specific workflows using the visual workflow builder
- **Step-by-Step Progress Tracking:** Monitor completion status with full date/time stamps
- **Role-Based Assignments:** Each step assigned to appropriate role (Driver, Safety Coordinator, Director, etc.)
- **Approval Workflows:** Built-in approval processes for decisions requiring oversight
- **Complete Audit Trail:** Full history of all workflow activities in the History tab
- **Automated Notifications:** Stakeholders notified at each workflow milestone
- **Performance Metrics:** Track completion times and workflow effectiveness

### Main Components

1. **Workflows Management Page**
   - View all workflow templates
   - Create new custom workflows
   - Edit existing workflows
   - Activate/deactivate workflows
   - View workflow usage statistics

2. **Workflow Builder**
   - Visual workflow creation tool
   - Configure workflow steps
   - Set role assignments
   - Define approval requirements
   - Set time estimates
   - Test before activation

3. **Incident Detail Integration**
   - **Overview Tab:** Quick workflow status widget with progress circle
   - **Workflow Tab:** Complete step-by-step management and completion interface
   - **History Tab:** Full audit trail with datetime stamps showing when each step was completed
   - **Step Completion:** Record date, time, user, and detailed comments for each completed step

4. **Enhanced History Tab**
   - Chronological timeline of all incident activities
   - **Workflow step completions with full datetime tracking**
   - **Format:** "Completed by [User] on MM/DD/YYYY, HH:MM AM/PM"
   - Visual icons for different activity types
   - Expandable detail sections
   - Export complete history to PDF

### Default Workflows Included

- **Student Behavior - High Severity** (6 steps, 5 days)
- **Student Behavior - Medium Severity** (5 steps, 3 days)
- **Safety Violation - Critical** (7 steps, 7 days)
- **Mechanical Issue - High** (5 steps, 4 days)
- **Accident - Critical** (8 steps, 10 days)

### For Complete Documentation

**See:** [Workflow System Documentation](./WORKFLOW-SYSTEM.md) for comprehensive details including:
- Complete workflow builder guide
- Step configuration options
- Assignment logic and rules
- Notification system details
- Best practices and recommendations
- Governance and maintenance procedures

---

## Administration

### Purpose
The Administration page provides system configuration capabilities for administrators. It contains three tabbed sections accessible from the Admin tab in the main navigation.

### User Roles Tab

#### KPI Summary Cards
- **Total Users:** Count of all registered users
- **Active Users:** Count of users with Active status
- **Roles in Use:** Number of distinct roles assigned
- **Per-role counts:** Individual cards for each of the 7 roles

#### User Table
| Column | Description |
|--------|-------------|
| ID | Auto-generated user identifier (U-001, U-002, ...) |
| First Name | User's first name |
| Last Name | User's last name |
| Email | User's email address |
| Roles | Multi-select of 7 roles: Safety Coordinator, Administrator, School Principal, Driver, Fleet Manager, Nurse, Mechanic |
| Status | Active or Inactive |
| Last Login | Timestamp of most recent login |

#### Features
- **Search:** Filter by name or email
- **Role Filter:** Filter table by specific role
- **Add User:** Create new user with role assignments
- **Edit User:** Modify user details and roles
- **Delete User:** Remove user record

### Email Templates Tab

#### System Default Templates (10)

| ID | Name | Category | Description |
|----|------|----------|-------------|
| ET-001 | Default Notification | Notification | Standard notification for workflow step start/complete |
| ET-002 | Urgent Action Required | Notification | High-priority alerts for critical workflow steps |
| ET-003 | Approval Request | Approval | Sent to approvers when step requires approval |
| ET-004 | Status Update | Notification | Incident or step status change notifications |
| ET-005 | Completion Notice | Completion | Sent when workflow is fully completed |
| ET-006 | Custom Template | Custom | Blank customizable template |
| ET-007 | Parent/Guardian Notification | Notification | Tailored for parent communication about student incidents |
| ET-008 | Escalation Notice | Escalation | Repeated offenses and progressive discipline |
| ET-009 | Follow-up Reminder | Notification | Scheduled reminders for check-ins and monitoring |
| ET-010 | Corrective Action / Retraining Notice | Notification | Driver corrective actions and retraining |

#### Template Features
- **Variable Placeholders:** `{{variable_name}}` syntax (e.g., `{{recipient_name}}`, `{{incident_id}}`, `{{step_name}}`) populated at send time
- **Categories:** Notification, Approval, Escalation, Completion, Custom
- **Actions:** Create, edit, duplicate, preview, delete
- **Workflow Integration:** Templates appear in Configure Step → Notifications → Email Template dropdown
- **Shared Data Source:** `/data/email-templates.ts` ensures single source of truth between Admin and workflow configuration

### Incident Types Tab

#### KPI Summary Cards
- **Total Types:** Count of all defined incident types (47)
- **Student Types:** Count of student-applicable types (29)
- **Driver Types:** Count of driver-applicable types (18)
- **Categories:** Count of distinct categories (10)

#### Incident Type Table
| Column | Description |
|--------|-------------|
| ID | Unique identifier |
| Label | Display name of the incident type |
| Category | One of 10 categories (Behavioral, Safety Violation, Aggression/Violence, etc.) |
| Description | Detailed description of the incident type |
| Default Severity | Low, Medium, or High |
| Applies To | "Student" or "Driver" only (no "Both" option) |

#### Features
- **Search:** Filter by name or description
- **Category Filter:** Filter by incident category
- **Applies To Filter:** Filter by Student or Driver
- **Add Incident Type:** Create new custom type
- **Edit Incident Type:** Modify existing type details
- **Delete Incident Type:** Remove custom types (system defaults protected)

---

## Students Management

### Purpose
Centralized student information system with transportation details and incident history tracking.

### Summary Statistics

1. **Total Students**
   - Complete roster count
   - All grade levels
   - Active and inactive

2. **Active Riders**
   - Students currently using transportation
   - Regular run assignments
   - Daily ridership

3. **With Incidents**
   - Students who have incident records
   - Any time period
   - Multiple incidents counted once

4. **Average Incidents**
   - Per student calculation
   - Helps identify outliers
   - Trend indicator

### Search and Filtering

#### Search Bar
**Searches:**
- Student name (first, last, or full)
- Student ID
- School name
- Grade level
- Run number

**Features:**
- Real-time filtering
- Case-insensitive
- Partial matches
- Clear button

#### Grade Level Filter
**Options:**
- All Grades (default)
- K (Kindergarten)
- 1 through 12

**Behavior:**
- Dropdown selection
- Instant filtering
- Shows student count per grade

**Use Cases:**
- Age-appropriate analysis
- School transitions
- Grade-level patterns

### Student Table with Photos

**Sortable Columns:**

1. **Student ID**
   - Format: STU-XXXXX
   - Clickable to view profile
   - Sort: Alphanumeric
   - Searchable

2. **Name (with Photo)**
   - **Avatar:** 40px circular photo
   - **Fallback:** Initials on colored background
   - **Name:** Full name below photo
   - **Active Badge:** Orange "Active" badge if open incidents
   - **Sort:** Alphabetical by last name, then first
   - **Default Sort:** This column, ascending

3. **Grade**
   - Format: K, 1-12
   - Icon: Graduation cap
   - Sort: Numeric (K=0)
   - Color-coded by level

4. **School**
   - School name
   - Sort: Alphabetical
   - Linked to school profile (future)

5. **Contact**
   - Primary phone number
   - Format: (XXX) XXX-XXXX
   - Icon: Phone
   - Click to call (mobile)

6. **Run**
   - Assigned bus run
   - Sort: Alphanumeric
   - Linked to run details (future)

7. **Incidents**
   - Total count
   - Color coding:
     - Red: ≥5 incidents
     - Orange: 3-4 incidents
     - Green: 1-2 incidents
     - Gray: 0 incidents
   - Sort: Numeric

8. **Last Incident**
   - Date of most recent incident
   - Format: MMM DD, YYYY
   - "None" if no incidents
   - Sort: Chronological
   - Relative time on hover

**Visual Features:**
- **Student Photos:**
  - Professional school photos
  - Circular avatars
  - 40px x 40px
  - Centered in cell
  - Object-fit: cover
  - Fallback to initials

- **Active Incident Badge:**
  - Appears next to name
  - Orange background
  - Warning triangle icon
  - Text: "Active"
  - Indicates open incidents

- **Hover Effects:**
  - Row highlights
  - Pointer cursor on ID
  - Transition smooth

### Student Detail View

**Trigger:** Click Student ID

**Modal Content:**

#### Student Profile Section
- **Photo:** Large version (80px)
- **Name:** Full name
- **Student ID**
- **Grade Level**
- **Date of Birth**
- **Age:** Calculated
- **School Name**

#### Contact Information
- **Primary Phone:** Parent/guardian
- **Secondary Phone:** Alternate contact
- **Email Address:** Parent email
- **Emergency Contact:** Name and phone
- **Address:** Home address (optional)

#### Transportation Details
- **Assigned Run:** Primary run
- **Bus Number:** Assigned vehicle
- **Driver Name:** Regular driver
- **Pickup Location:** Address/stop
- **Pickup Time:** Scheduled time
- **Dropoff Location:** Address/stop
- **Dropoff Time:** Scheduled time
- **Special Transportation Needs:**
  - Wheelchair access
  - Harness/car seat
  - Adult monitor
  - Specific instructions

#### Medical Information
- **Medical Conditions:** Known conditions
- **Allergies:** Food, medication, environmental
- **Medications:** Regular medications
- **Emergency Instructions:** Special procedures
- **Doctor Contact:** Physician information

#### Incident History
- **Timeline View:** Chronological list
- **Per Incident:**
  - Date
  - Incident ID (clickable)
  - Type badge
  - Severity badge
  - Status badge
  - Brief description
- **Filters:**
  - Date range
  - Incident type
  - Status
- **Export:** Student incident report

#### Behavioral Patterns (Future)
- Incident frequency chart
- Common incident types
- Time of day patterns
- Interventions attempted
- Success metrics

#### Actions
- **Edit Student Info:** Update profile
- **Update Transportation:** Change assignment
- **Add Note:** Internal notes
- **View Full History:** Complete timeline
- **Generate Report:** Student-specific report
- **Contact Parent:** Send communication

**Modal Features:**
- **Max Width:** 3xl (48rem)
- **Max Height:** 85vh
- **Scrollable:** Content scrolls, header fixed
- **Responsive:** Adapts to screen size
- **Print-Friendly:** Optimized for printing

### Active Incident Indicators

**Visual Cues:**
1. **Badge:** Orange "Active" next to name
2. **Icon:** Warning triangle
3. **Row Highlight:** Subtle background color (future)
4. **Count:** Number of active incidents

**Definition of Active:**
- Status = "Open" OR "Under Review"
- Not resolved or closed
- Requires attention

---

## Fleet Management (Vehicles)

### Purpose
Complete fleet management system with visual bus identification, maintenance tracking, and incident correlation.

### Summary Statistics

1. **Total Vehicles**
   - Complete fleet size
   - All vehicle types
   - Active and inactive

2. **Active Vehicles**
   - Currently operational
   - In daily service
   - Percentage of fleet

3. **Maintenance Alerts**
   - Needs Attention count
   - In Repair count
   - Overdue inspections

4. **Average Incidents**
   - Per vehicle this year
   - Helps identify problem vehicles
   - Trend monitoring

### Filtering System

#### Search Bar
**Searches:**
- Vehicle ID (VEH-XXX)
- Bus name (Bus 1, Bus 2, etc.)
- Driver name
- Run number
- Make/model

#### Status Filter
**Options:**
- All Statuses (default)
- Active
- Maintenance
- Inactive

**Use Cases:**
- Available vehicles
- Out of service tracking
- Fleet capacity planning

#### Maintenance Filter
**Options:**
- All Maintenance (default)
- Excellent
- Good
- Needs Attention
- In Repair

**Use Cases:**
- Maintenance prioritization
- Vehicle health monitoring
- Budget planning

### Vehicle Table with Bus Images

**Sortable Columns:**

1. **Vehicle ID**
   - Format: VEH-XXX
   - Clickable for details
   - Sort: Alphanumeric
   - Primary identifier

2. **Details (with Bus Image)**
   - **Bus Photo:** 40px circular image
   - **Bus Name:** Bus 1, Bus 2, etc.
   - **Details:** Year, make, model below
   - **Images Shown:**
     - Blue Bird Vision
     - IC Bus CE Series
     - Thomas Saf-T-Liner C2
     - Blue Bird All American
     - Thomas Saf-T-Liner HDX
   - **Sort:** By bus name (numeric)
   - **Default Sort:** This column, ascending

3. **Driver**
   - Assigned driver name
   - Icon: User icon
   - "Unassigned" if no driver
   - Sort: Alphabetical
   - Clickable to driver profile

4. **Primary Run**
   - Main run assignment
   - Icon: Map pin
   - Sort: Alphanumeric
   - Linked to run details (future)

5. **Status**
   - Badge display
   - Colors:
     - Active: Green
     - Maintenance: Orange
     - Inactive: Gray
   - Sort: Alphabetical

6. **Maintenance**
   - Current condition
   - Icon based on status:
     - ✓ Excellent/Good
     - ⚠ Needs Attention
     - 🔧 In Repair
   - Badge color-coded
   - Sort: Custom order (Excellent > Good > Needs Attention > In Repair)

7. **Incidents**
   - Total count this year
   - Trend indicator:
     - ↑ Red: High (>8)
     - ↓ Green: Low (<4)
     - None: Average (4-8)
   - Sort: Numeric

8. **Mileage**
   - Current odometer
   - Format: XX,XXX mi
   - Sort: Numeric
   - Color coding for high mileage (>75,000)

**Visual Features:**

#### Bus Images
- **Real Photos:** Actual bus model images
- **Avatar Style:** Circular, 40px
- **Fallback:** Bus name text
- **Image Mapping:**
  - Matches make and model
  - Shows correct bus type
  - Professional photos

#### Maintenance Icons
- **Visual Indicators:**
  - CheckCircle: Good condition
  - AlertTriangle: Needs attention
  - Wrench: In repair
- **Color Coordination:**
  - Green: Excellent
  - Blue: Good
  - Orange: Needs Attention
  - Red: In Repair

#### Incident Trend Arrows
- **Up Arrow (Red):** Increasing incidents (>8)
- **Down Arrow (Green):** Low incidents (<4)
- **No Arrow:** Average incidents (4-8)
- **Purpose:** Quick visual scan

### Vehicle Detail View

**Trigger:** Click Vehicle ID

**Modal Sections:**

#### Bus Photo Display
- **Full-Size Image:** Large bus photo
- **Bus Type:** Make and model name
- **Description:** Bus characteristics
- **Capacity:** Passenger count
- **Specifications:** Engine, features

#### Basic Information
- Vehicle ID
- Bus name
- Status badge
- License plate
- Make, model, year
- VIN number
- Capacity (passengers)
- Fuel type
- Current mileage
- Hourmeter reading

#### GPS & AVL Configuration
- **GPS Hardware ID:** Device identifier
- **TYD AVL Integration:**
  - Status: Enabled/Disabled
  - Visual indicator: Green dot for enabled
- **Location Tracking:** Real-time capability
- **Run Adherence:** Monitoring status

#### Garage Assignments
- **Default Garage:** Primary storage location
- **Mid-Day Garage:** Daytime parking
- **Usage:** Optimize vehicle positioning

#### Assignment Information
- **Assigned Driver:** Name with user icon
- **Incident Count:** Year-to-date
- **Primary Run:** With map pin icon
- **Secondary Run:** If applicable
- **Schedule:** AM/PM runs

#### Maintenance & Inspection
- **Maintenance Status:** Badge with icon
- **Last Inspection:** Date with calendar icon
- **Next Inspection:** Due date
- **Days Until Due:** Calculated
- **Inspection History:** Past inspections (future)
- **Maintenance Notes:** Special instructions
- **Service Records:** Complete history (future)

#### Incident History
- List of all incidents involving vehicle
- Date, incident ID, type, severity
- Driver involved
- Outcome
- Clickable to incident details

**Actions:**
- **Edit Vehicle:** Update information
- **Schedule Maintenance:** Book service
- **Update Status:** Change operational status
- **View Service History:** Complete records
- **Generate Report:** Vehicle-specific report
- **Assign Driver:** Change assignment

### Fleet Analytics (Future)

- **Reliability Scores:** By vehicle
- **Cost Analysis:** Maintenance costs
- **Utilization Rates:** Usage patterns
- **Replacement Planning:** Age and condition
- **Comparison Tools:** Vehicle performance

---

## Driver Management

### Purpose
Comprehensive driver management with photos, safety tracking, certification monitoring, and performance analytics.

### Summary Statistics

1. **Total Drivers**
   - Complete roster
   - All employment statuses
   - Historical tracking

2. **Active Drivers**
   - Currently employed
   - Actively driving
   - Assignment status

3. **Certifications Due**
   - Expiring within 60 days
   - CDL renewals
   - Training certifications
   - First Aid/CPR

4. **Average Safety Rating**
   - District-wide average
   - Out of 5.0 scale
   - Performance indicator

### Search and Filtering

#### Search Bar
**Searches:**
- Driver name
- Employee ID
- Run number
- Vehicle assignment
- Phone number

#### Status Filter
**Options:**
- All Statuses (default)
- Active
- On Leave
- Inactive

**Use Cases:**
- Available drivers
- Substitute planning
- Staffing analysis

### Driver Table with Photos

**Sortable Columns:**

1. **Driver ID**
   - Format: DRV-XXXX
   - Clickable for profile
   - Sort: Alphanumeric
   - Employee identifier

2. **Name (with Photo)**
   - **Driver Photo:** 40px circular professional photo
   - **Full Name:** Below photo
   - **Employee ID:** Smaller text below name
   - **Fallback:** Initials on colored background
   - **Sort:** Alphabetical by last name
   - **Default Sort:** This column, ascending

3. **Contact**
   - Primary phone number
   - Icon: Phone
   - Format: (XXX) XXX-XXXX
   - Click to call (mobile)
   - Sort: Numeric

4. **Assigned Vehicle**
   - Bus number
   - Icon: Bus
   - "Unassigned" if none
   - Sort: Numeric
   - Clickable to vehicle details

5. **Primary Run**
   - Run name/number
   - Icon: Map pin
   - Sort: Alphanumeric
   - Linked to run (future)

6. **Status**
   - Employment status
   - Badge colors:
     - Active: Green
     - On Leave: Yellow
     - Inactive: Gray
   - Sort: Alphabetical

7. **Safety Rating**
   - Rating out of 5.0
   - Icon: Star/Award
   - Color coding:
     - 4.5-5.0: Green
     - 3.5-4.4: Blue
     - 2.5-3.4: Orange
     - <2.5: Red
   - Sort: Numeric
   - One decimal place

**Visual Features:**

#### Driver Photos
- **Professional Photos:** School district badge photos
- **Circular Avatars:** 40px diameter
- **Fallback Initials:** First and last name
- **Colored Background:** Primary color with opacity
- **Consistent Styling:** Matches student photos

#### Employee ID Display
- **Below Name:** Secondary information
- **Smaller Font:** 0.75rem
- **Muted Color:** Gray text
- **Format:** DRV-XXXX or custom

#### Safety Rating Display
- **Star Icon:** Golden/yellow color
- **Numeric Value:** Bold text
- **Out of 5.0:** Lighter text
- **Visual Indicator:** Color based on rating

### Driver Detail View

**Trigger:** Click Driver ID

**Modal Sections:**

#### Driver Profile
- **Photo:** Large version (80px)
- **Full Name**
- **Employee ID**
- **Phone Number:** Click to call
- **Email Address:** Click to email
- **Status Badge:** Current status
- **Safety Rating:** Large with stars

#### Employment Information
- **Hire Date:** Date started
- **Years of Service:** Calculated
- **Employment Type:** Full-time/Part-time
- **Department:** Transportation
- **Supervisor:** Name and contact
- **Pay Grade:** Classification
- **Union Status:** If applicable

#### Certifications & Licenses
- **CDL Number:** License number
- **CDL Class:** A, B, or C
- **CDL Expiration:** Date
- **Days Until Expiration:** Alert if <60 days
- **Endorsements:** Special endorsements
- **Passenger Endorsement:** Required
- **Air Brake Endorsement:** If applicable
- **First Aid/CPR:**
  - Certification status
  - Expiration date
  - Training provider
- **Defensive Driving:**
  - Completion date
  - Valid period
- **Special Training:**
  - Wheelchair lifts
  - Behavior management
  - Emergency procedures
  - Other certifications

#### Assignment Information
- **Assigned Vehicle:** Bus number and type
- **Primary Run:** Run details
- **Secondary Run:** If applicable
- **Typical Schedule:** AM/PM times
- **Special Assignments:** Field trips, activities

#### Safety & Performance
- **Safety Rating:** Detailed breakdown
  - On-time performance
  - Incident rate
  - Inspection compliance
  - Student behavior management
  - Run adherence
- **Total Incidents:** Year-to-date
- **Safety Violations:** Count and details
- **Commendations:** Positive recognition
- **Last Evaluation:** Performance review date
- **Next Evaluation:** Scheduled date

#### Incident History
- **Complete List:** All incidents involving driver
- **Per Incident:**
  - Date
  - Incident ID (clickable)
  - Student involved
  - Vehicle
  - Type and severity
  - Status
  - Outcome
- **Filters:** Date range, type, severity
- **Export:** Driver incident report

#### Communication History
- **Recent Communications:** Last 10
- **Per Communication:**
  - Date
  - Type (email, phone, in-person)
  - Subject
  - Status
  - Link to full thread
- **View All:** Link to Driver Communications page

#### Training & Development
- **Completed Training:** List with dates
- **Required Training:** Upcoming requirements
- **Recommended Training:** Suggestions
- **Training Hours:** YTD total

**Actions:**
- **Edit Driver Info:** Update profile
- **Update Assignment:** Change vehicle/run
- **Schedule Training:** Book training
- **Send Message:** Communicate with driver
- **Generate Report:** Driver performance report
- **Update Certifications:** Record renewals

### Certification Tracking

**Alerts:**
- **Red:** Expired certifications
- **Orange:** Expiring within 30 days
- **Yellow:** Expiring within 60 days
- **Green:** Current and valid

**Automated Reminders:**
- 60 days before expiration
- 30 days before expiration
- 7 days before expiration
- Day of expiration
- Weekly after expiration

---

## New Incident Entry

### Purpose
Guided multi-step form for comprehensive incident reporting with validation and auto-save.

### Step-by-Step Wizard

**Progress Indicator:**
- 5 steps total
- Visual progress bar
- Current step highlighted
- Completed steps checkmarked
- Click step to navigate (if valid)

### Step 1: Basic Information

**Required Fields:**

1. **Incident Date**
   - Type: Date picker
   - Default: Today
   - Validation: Cannot be future date
   - Format: YYYY-MM-DD

2. **Incident Time**
   - Type: Time picker
   - Format: HH:MM (12 or 24 hour)
   - Validation: Must be valid time
   - Context-aware (AM/PM runs)

3. **Incident Type**
   - Type: Dropdown
   - Options:
     - Student Behavior
     - Safety Violation
     - Mechanical
     - Accident
     - Other
   - Required
   - Affects subsequent fields

4. **Severity**
   - Type: Radio buttons or dropdown
   - Options:
     - Critical (red)
     - High (orange)
     - Medium (yellow)
     - Low (gray)
   - Visual color coding
   - Required

**Optional Fields:**

5. **Location**
   - Type: Text input
   - Placeholder: "Where did this occur?"
   - Examples: "On Run 5", "At school", "On highway"
   - Autocomplete from previous locations

6. **Run**
   - Type: Dropdown
   - Populated from run list
   - "Not on run" option
   - Filters by time of day

**Validation:**
- All required fields must be filled
- Date cannot be in future
- Time must be valid
- Severity must be selected

**Next Button:**
- Disabled until valid
- Saves data
- Proceeds to Step 2

### Step 2: Involved Parties

**Student Information:**

1. **Student Name**
   - Type: Searchable dropdown
   - Type to filter students
   - Shows: Name, ID, Grade, School
   - Can add multiple students
   - Required for most incident types

2. **Student ID**
   - Auto-populated from name selection
   - Displayed for verification
   - Readonly

3. **Grade**
   - Auto-populated
   - Helps with context

4. **School**
   - Auto-populated
   - Readonly

**Multiple Students:**
- Click "+ Add Another Student"
- New student row appears
- Each with full information
- Remove button per student

**Driver Information:**

1. **Driver Name**
   - Type: Searchable dropdown
   - Shows: Name, Employee ID, Assigned Vehicle
   - Required
   - Auto-selects if logged in as driver

2. **Employee ID**
   - Auto-populated
   - Readonly
   - For verification

3. **Assigned Vehicle**
   - Auto-populated from driver
   - Can be overridden if different vehicle

**Vehicle Information:**

1. **Vehicle/Bus Number**
   - Type: Searchable dropdown
   - Shows: Bus name, Make/model, Assigned driver
   - Auto-populated if driver selected first
   - Can select different vehicle
   - Required

**Validation:**
- At least one student (for most types)
- Driver must be selected
- Vehicle must be selected
- All IDs must match system records

**Back/Next Buttons:**
- Back: Return to Step 1 without validation
- Next: Validate and proceed

### Step 3: Incident Details

**Description:**

1. **What Happened?**
   - Type: Large textarea
   - Minimum: 50 characters (adjustable)
   - Maximum: 2000 characters
   - Character counter displayed
   - Placeholder: "Describe the incident in detail..."
   - Required
   - Tips displayed:
     - Be specific
     - Include timeline
     - Mention witnesses
     - Describe actions taken

2. **Actions Taken**
   - Type: Large textarea
   - Minimum: 20 characters
   - Maximum: 1000 characters
   - Placeholder: "What actions did you take?"
   - Required
   - Examples:
     - "Stopped bus safely"
     - "Called dispatch"
     - "Separated students"
     - "Administered first aid"

**Injury Information:**

3. **Were there any injuries?**
   - Type: Radio buttons
   - Options: Yes / No
   - Required
   - If Yes, additional fields appear:

4. **Injury Details** (conditional)
   - Type: Textarea
   - Describe injuries
   - Severity of injuries
   - Body parts affected

5. **Medical Attention Required?** (conditional)
   - Type: Radio buttons
   - Yes / No
   - If Yes:
     - Treatment provided
     - Hospital transport
     - EMS called
     - Parent notified

**Witnesses:**

6. **Add Witness**
   - Button: "+ Add Witness"
   - Creates new witness form
   - Multiple witnesses supported

**Per Witness:**
- **Name:** Text input, required
- **Type:** Dropdown
  - Student
  - Staff
  - Parent
  - Other
- **Contact:** Phone or email
- **Statement:** Textarea (brief)
- **Remove:** Delete witness button

**Validation:**
- Description meets minimum length
- Actions taken provided
- Injury questions answered
- If injuries, details provided
- Witness names required if added

### Step 4: Additional Information

**Attachments:**

1. **Upload Files**
   - Type: Drag-and-drop or click to browse
   - **Photos:**
     - Formats: JPG, PNG, HEIC
     - Max size: 10MB per file
     - Multiple files supported
     - Thumbnail preview
   - **Documents:**
     - Formats: PDF, DOC, DOCX
     - Max size: 10MB
     - Icon preview
   - **Videos:**
     - Formats: MP4, MOV
     - Max size: 50MB
     - Thumbnail with play icon

2. **File Management**
   - List of uploaded files
   - File name, size, type
   - Remove button per file
   - Total size displayed

**Follow-up:**

3. **Follow-up Required?**
   - Type: Toggle switch
   - Default: Off
   - If enabled:

4. **Assign To** (conditional)
   - Type: Dropdown
   - List of administrators
   - Can assign multiple people

5. **Due Date** (conditional)
   - Type: Date picker
   - Must be future date
   - Sends reminder

6. **Priority** (conditional)
   - Type: Dropdown
   - Options: Urgent, Standard, Low
   - Affects notification

**Internal Notes:**

7. **Internal Notes**
   - Type: Textarea
   - Not visible to parents
   - Administrative use only
   - Optional

**Tags:**

8. **Tags**
   - Type: Multi-select or chips
   - Predefined tags:
     - First Offense
     - Repeat Behavior
     - Parent Notified
     - Police Involved
     - Medical Emergency
     - Property Damage
   - Custom tags allowed
   - Searchable in reports

**Validation:**
- File size limits
- File types allowed
- If follow-up, assign to and due date required
- Future due date

### Step 5: Review & Submit

**Summary View:**

All entered information displayed for review:

1. **Basic Information Card**
   - Date, time, type, severity
   - Location, run
   - Edit button

2. **Involved Parties Card**
   - Student(s) information
   - Driver information
   - Vehicle information
   - Edit button

3. **Incident Details Card**
   - Description (full)
   - Actions taken
   - Injury information
   - Witnesses list
   - Edit button

4. **Additional Information Card**
   - Attachments list
   - Follow-up details
   - Internal notes
   - Tags
   - Edit button

**Editing:**
- Click "Edit" on any section
- Returns to that step
- Data preserved
- Returns to review after edit

**Validation Summary:**
- Green checkmarks: All required fields complete
- Red X: Missing required information
- List of issues if any

**Submit Options:**

1. **Save as Draft**
   - Saves without submitting
   - No notifications sent
   - Can return later
   - Found in "My Drafts"
   - Expires after 30 days

2. **Submit Incident**
   - Final validation check
   - Creates incident record
   - Generates unique Incident ID
   - Sends notifications:
     - Assigned administrator
     - Driver's supervisor
     - Safety coordinator (if Critical/High)
     - Principal (if severe)
   - Confirmation dialog
   - Success message

**Confirmation Dialog:**
- Incident ID displayed
- Summary of notifications sent
- Options:
  - View incident details
  - Create another incident
  - Return to dashboard
  - Email report

**Auto-Save:**
- Saves every 2 minutes automatically
- "Last saved" timestamp displayed
- Draft recoverable if browser closes
- Visual indicator when saving

**Form Tips Throughout:**
- Contextual help text
- Field examples
- Best practices
- Character counts
- Validation messages

---

## Reports & Analytics

### Purpose
Comprehensive reporting system with 8 quick reports featuring preview dialogs and export capabilities. The Weekly Trends Analysis report provides advanced visual analytics with charts and automated insights.

### Quick Reports

Pre-configured reports ready to generate instantly:

#### 1. Monthly Summary
**View Type:** Table
**Contents:**
- Total incidents for the current month
- Incidents by severity breakdown
- Status distribution
- Incident type analysis
- Summary statistics panel

**Summary Stats:**
- Total Incidents
- High Severity Count
- Open / In Progress Count
- Unique Students

**Export:** Download button with toast notification

#### 2. Student Incident History
**View Type:** Table
**Contents:**
- Complete incident history by student
- All incidents with student details
- Chronological ordering
- Full incident details with student ID

**Table Columns:**
- Incident ID → Date → Student (with ID) → Type → Vehicle → Driver → Severity → Status

**Use Cases:**
- Student behavioral tracking
- Intervention planning
- Parent communications

#### 3. Driver Report Summary ⭐ **Updated Structure**
**View Type:** Table (Modified Column Structure)
**Contents:**
- Incidents reported by driver
- Driver performance tracking
- Response metrics

**Table Columns:**
- Incident ID → Date → **Driver** → Type → Vehicle → Severity → Status
- **Note:** Student column removed; Driver moved to position 3 (after Date)

**Use Cases:**
- Performance reviews
- Staffing decisions
- Training needs assessment

#### 4. High Severity Incidents
**View Type:** Table
**Contents:**
- All high severity incidents
- Critical issues requiring immediate attention
- Priority incident tracking

**Filters:**
- Pre-filtered to severity="High"
- Sortable by date

**Use Cases:**
- Safety monitoring
- Emergency response
- Administrative review

#### 5. Vehicle Incident Report ⭐ **Updated Structure**
**View Type:** Table (Modified Column Structure)
**Contents:**
- Incidents grouped by vehicle number
- Fleet safety tracking
- Vehicle-specific patterns

**Table Columns:**
- Incident ID → Date → **Driver** → Type → Vehicle → Severity → Status
- **Note:** Student column removed; Driver moved to position 3 (after Date)

**Use Cases:**
- Fleet management
- Vehicle replacement planning
- Run safety analysis

#### 6. Open Incidents Report
**View Type:** Table
**Contents:**
- All currently open incidents
- In-progress incidents requiring action
- Unresolved cases

**Filters:**
- Status = "Open" OR "In Progress"
- Real-time updates

**Use Cases:**
- Daily operations
- Task management
- Case closure tracking

#### 7. Weekly Trends Analysis ⭐ **Visual Dashboard**
**View Type:** Interactive Dashboard with Charts and Insights

**Summary Cards (4 KPI Tiles):**

| Card | Metric | Display |
|------|--------|---------|
| This Week | Current week count | Number + week-over-week % change with up/down arrow |
| Last Week | Previous week count | Number + week start date |
| High Severity Trend | High severity incidents | Number + week-over-week % change with up/down arrow |
| 4-Week Average | Rolling average | Total incidents ÷ number of weeks |

**Color Indicators:**
- Increase (red): `var(--destructive)` with ArrowUp icon
- Decrease (green): `hsl(var(--success))` with ArrowDown icon
- No change (gray): `var(--muted-foreground)`

**Charts:**

1. **Weekly Incident Trend (Line Chart)**
   - X-axis: Week labels (e.g., "Mar 1")
   - Y-axis: Incident count
   - Lines:
     - Total Incidents: `hsl(var(--primary))`, strokeWidth 2
     - High Severity: `hsl(var(--destructive))`, strokeWidth 2
   - Includes CartesianGrid, Tooltip, Legend
   - Responsive container, height 250px

2. **This Week by Type (Progress Bars)**
   - Top 5 incident types
   - Horizontal progress bars
   - Shows count and percentage
   - Color: `hsl(var(--primary))`
   - Background: `var(--muted)`

3. **Severity Distribution by Week (Stacked Bar Chart)**
   - X-axis: Week labels
   - Y-axis: Count
   - Stacked bars showing:
     - High: `hsl(var(--destructive))`
     - Medium: `hsl(var(--warning))`
     - Low: `hsl(var(--success))`
   - Responsive container, height 200px

**Key Insights Section:**

Automated insights that dynamically appear based on data patterns:

| Insight Type | Trigger Condition | Display Style |
|--------------|-------------------|---------------|
| Significant Increase | Week-over-week change > 10% | Red alert card with AlertTriangle icon, destructive background |
| Positive Trend | Week-over-week change < -10% | Green success card with TrendingUp icon, success background |
| Most Common Type | Any incident type > 2 occurrences this week | Gray info card with BarChart3 icon, includes type name and percentage |

**Technical Implementation:**
- Uses Recharts library for all visualizations
- All styling uses design system CSS variables (`var(--forge-*)`)
- Unique data keys to prevent React duplicate key warnings:
  - Line chart: `id: 'week-${index}'`
  - Bar chart: `id: 'severity-week-${index}'`

**Use Cases:**
- Executive reporting
- Trend identification
- Pattern analysis
- Strategic planning
- Resource allocation

#### 8. Repeat Offender Report
**View Type:** Table
**Contents:**
- Students with multiple incidents
- Behavioral patterns
- Intervention candidates

**Filters:**
- Pre-filtered to students with > 1 incident
- Grouped by student

**Use Cases:**
- Intervention planning
- Behavioral support
- School counselor reports

### Report Preview Dialog

**Features:**
- Modal dialog with responsive sizing (95vw max width, 85vh max height)
- Dynamic content based on report type (table or dashboard)
- Download button in header
- Close button (X) in top right

**Table Reports Include:**
- Summary Stats panel (4 metrics)
- Scrollable table with formatted columns
- Badge components for Severity and Status
- Footer with record count and generation date

**Dashboard Reports Include:**
- Summary cards
- Interactive charts
- Insights section
- Scrollable content area

### Export Functionality

**Download Button:**
- Located in preview dialog header
- Triggers toast notification
- Format varies by report type:
  - PDF for formatted reports
  - Excel for data reports
  - CSV for raw data

**Toast Messages:**
- Success notification with report title
- Description includes format and record count
- Example: "Your Weekly Trends Analysis PDF report showing week-over-week incident trends and patterns is ready for download."

### Not Implemented (Future Enhancements)

### Custom Report Builder

**Multi-Step Process:**

#### Step 1: Select Data Source
**Options:**
- Incidents
- Students
- Drivers
- Vehicles
- Communications
- Runs (future)

**Description:** Choose what you want to report on

#### Step 2: Choose Columns
**Available Fields (by data source):**

**Incidents:**
- ☐ Incident ID
- ☐ Date
- ☐ Time
- ☐ Student Name
- ☐ Student ID
- ☐ Driver Name
- ☐ Vehicle
- ☐ Type
- ☐ Severity
- ☐ Status
- ☐ Description
- ☐ Actions Taken
- ☐ Injuries
- ☐ Location
- ☐ Run

**Students:**
- ☐ Student ID
- ☐ Name
- ☐ Grade
- ☐ School
- ☐ Contact
- ☐ Run
- ☐ Incident Count
- ☐ Last Incident Date

**Drivers:**
- ☐ Driver ID
- ☐ Name
- ☐ Contact
- ☐ Vehicle
- ☐ Run
- ☐ Status
- ☐ Safety Rating
- ☐ Incident Count
- ☐ Certifications

**Vehicles:**
- ☐ Vehicle ID
- ☐ Name
- ☐ Make/Model
- ☐ Year
- ☐ Driver
- ☐ Status
- ☐ Maintenance
- ☐ Mileage
- ☐ Incident Count

**Features:**
- Select all / Deselect all
- Drag to reorder columns
- Search field names
- Common presets

#### Step 3: Apply Filters
**Filter Builder:**

1. **Add Filter Row:**
   - Field: Dropdown of all fields
   - Condition: Based on field type
     - Text: Equals, Contains, Starts with, Ends with
     - Number: Equals, Greater than, Less than, Between
     - Date: Equals, Before, After, Between
     - Select: Equals, Not equals, In list
   - Value: Input based on field type

2. **Multiple Filters:**
   - AND/OR logic between filters
   - Group filters with parentheses
   - Complex logic supported

**Examples:**
- Severity = "Critical" OR "High"
- Date >= "2025-01-01" AND Date <= "2025-01-31"
- School = "Roosevelt High" AND Status ≠ "Closed"
- Incident Count > 5

**Date Range Helper:**
- Last 7 days
- Last 30 days
- Last 90 days
- This month
- This year
- Custom range

#### Step 4: Sorting & Grouping
**Sort By:**
- Primary sort field: Dropdown
- Direction: Ascending / Descending
- Secondary sort field: Optional
- Direction: Ascending / Descending

**Group By:**
- Group results by field
- Options: None, or any field
- Shows subtotals per group
- Collapsible groups in output

**Examples:**
- Sort by Date descending
- Group by School (shows incidents per school)
- Group by Type, Sort by Date

#### Step 5: Visualization (Optional)
**Chart Options:**
- None (table only)
- Bar Chart
- Line Chart
- Pie Chart
- Column Chart

**Chart Configuration:**
- X-Axis: Select field
- Y-Axis: Count, Sum, Average, Min, Max
- Color scheme: District colors
- Legend position
- Chart title

**Examples:**
- Bar chart: Schools (X) vs Incident Count (Y)
- Line chart: Month (X) vs Incidents (Y)
- Pie chart: Incident Type distribution

#### Step 6: Preview & Export
**Preview:**
- Live preview of report
- Sample data shown
- Adjust layout
- Modify page breaks (PDF)

**Page Settings:**
- Orientation: Portrait / Landscape
- Page size: Letter, Legal, A4
- Margins: Normal, Narrow, Wide
- Header/Footer: Optional

**Export Options:**

1. **PDF**
   - Formatted and styled
   - Ready to print
   - Headers and footers
   - Page numbers
   - District branding

2. **Excel**
   - Multiple sheets if grouped
   - Formulas preserved
   - Charts included
   - Filters active
   - Raw data for analysis

3. **CSV**
   - Raw data only
   - Universal compatibility
   - Import to other systems
   - Largest datasets

4. **Email**
   - Send directly from system
   - Multiple recipients
   - Attach as PDF or Excel
   - Include message
   - Schedule recurring

**Save Report Template:**
- Name the template
- Description
- Share with team
- Set as favorite
- Schedule automatic generation

### Scheduled Reports

**Automation:**
- Generate reports automatically
- Email to recipients
- Frequency options:
  - Daily (specify time)
  - Weekly (specify day and time)
  - Monthly (specify date and time)
  - Quarterly
  - Annually

**Configuration:**
- Select report template
- Choose recipients (multiple)
- Set frequency
- Pick format (PDF/Excel)
- Include message
- Enable/disable anytime

**Management:**
- List of scheduled reports
- Edit schedule
- Pause/resume
- Delete
- View history

### Analytics Dashboard (Future)

**Advanced Analytics:**

1. **Trend Analysis**
   - Compare periods
   - Identify patterns
   - Predictive indicators
   - Seasonal adjustments

2. **Heat Maps**
   - Incidents by day of week
   - Incidents by time of day
   - Incidents by run segment
   - Geographic distribution

3. **Comparative Analytics**
   - School-to-school
   - Driver-to-driver
   - Vehicle-to-vehicle
   - Year-over-year

4. **Key Performance Indicators (KPIs)**
   - Incident rate trend
   - Response time trend
   - Resolution time average
   - Recurring incident rate
   - Driver safety average
   - Vehicle reliability

---

## Driver Communications

### Purpose
Centralized hub for safety coordinators to track and manage all communications with bus drivers regarding incidents and safety matters.

### Summary Statistics

1. **Total Communications**
   - All communication records
   - Complete history
   - All types and statuses

2. **Pending Response**
   - Awaiting driver reply
   - Requires action
   - Priority indicator

3. **Follow-up Required**
   - Needs additional action
   - Unresolved issues
   - Tracking needed

4. **Average Response Time**
   - Hours until driver responds
   - Performance metric
   - Trend indicator

### Advanced Filtering

#### Search Bar
**Searches:**
- Driver name
- Incident ID
- Subject line
- Message content
- Keywords

**Features:**
- Real-time filtering
- Highlights matches
- Clear button

#### Status Filter
**Options:**
- All Statuses (default)
- Pending Response
- Responded
- Acknowledged
- Follow-up Required
- Closed

**Use Cases:**
- Focus on pending items
- Track acknowledgments
- Close loops

#### Priority Filter
**Options:**
- All Priorities (default)
- High
- Medium
- Low

**Colors:**
- High: Red
- Medium: Orange
- Low: Gray

#### Driver Filter
**Options:**
- All Drivers (default)
- Individual driver dropdown
- Searchable list

**Use Case:**
- Driver-specific communications
- Performance tracking

#### Date Range Filter
**Options:**
- Last 7 days
- Last 30 days (default)
- Last 90 days
- Custom range

**Date Picker:**
- Start date
- End date
- Apply button

### Communications Table

**Columns:**

1. **Date**
   - When sent
   - Format: MMM DD, YYYY
   - Time on hover
   - Sort: Chronological

2. **Driver**
   - Name with photo (40px avatar)
   - Click to view driver profile
   - Sort: Alphabetical

3. **Related Incident**
   - Incident ID (clickable)
   - "General" if not incident-specific
   - Sort: Alphanumeric
   - Links to incident details

4. **Type**
   - Communication method
   - Options:
     - Email
     - Phone
     - In-Person
     - Text Message
   - Icon for each type
   - Sort: Alphabetical

5. **Subject**
   - Brief summary
   - Truncated to 50 characters
   - Full text on hover
   - Sort: Alphabetical

6. **Status**
   - Current status badge
   - Color-coded:
     - Pending Response: Orange
     - Responded: Blue
     - Acknowledged: Green
     - Follow-up Required: Red
     - Closed: Gray
   - Sort: Custom order

7. **Priority**
   - Urgency level
   - Badge display
   - Sort: High > Medium > Low

**Table Features:**
- Sortable columns
- Hover highlight
- Click row to view details
- Responsive design

### Communication Detail View

**Trigger:** Click any communication row

**Modal Sections:**

#### Header
- Subject line (large)
- Incident ID badge (if applicable)
- Priority badge
- Status badge
- Close button

#### Communication Thread
**Chronological message list:**
- All messages in conversation
- Per message:
  - Sender name and photo
  - Timestamp
  - Message content
  - Read receipt (if available)
  - Attachments (if any)
- Alternating alignment (sent vs received)
- Scroll for long threads

#### Incident Context (if applicable)
- Incident summary
- Date and type
- Students involved
- Quick link to full incident details

#### Driver Information Panel
- Photo and name
- Contact information
- Click to call button
- Click to email button
- Assigned vehicle and run

#### Action Buttons

1. **Reply**
   - Opens message composer
   - Pre-populates recipient
   - Adds to thread

2. **Mark as Read**
   - Updates status
   - Changes badge

3. **Add Follow-up**
   - Set reminder date
   - Add notes
   - Assign priority

4. **Close Thread**
   - Mark complete
   - Archive
   - Confirmation required

5. **Print**
   - Print conversation
   - Formatted output
   - Includes context

**Message Composer:**
- Text area for message
- Character counter
- Attach files button
- Send button
- Cancel button

### Creating New Communications

**Button:** "+ New Communication" (top right)

**Modal Form:**

#### Step 1: Communication Details
1. **Select Driver**
   - Searchable dropdown
   - Shows photo, name, ID
   - Auto-populates contact info

2. **Related Incident** (optional)
   - Searchable dropdown
   - Shows recent incidents
   - Can be blank for general communication

3. **Communication Type**
   - Radio buttons or dropdown
   - Email (default)
   - Phone
   - In-Person
   - Text Message

4. **Priority**
   - Dropdown
   - High / Medium (default) / Low

5. **Subject**
   - Text input
   - Required
   - Max 200 characters

#### Step 2: Compose Message
1. **Message**
   - Large textarea
   - Rich text editor (optional)
   - Minimum 10 characters
   - No maximum
   - Character counter

2. **Attachments** (optional)
   - Drag and drop or browse
   - PDF, DOC, images
   - Max 10MB per file

3. **Template** (optional)
   - Select from templates
   - Pre-fills message
   - Can edit after selection

#### Templates Available

**Incident Notification:**
"Hello [Driver Name], 

An incident has been reported involving your bus on [Date]. Incident ID: [ID]. 

Please review the details and provide your account of what occurred within 24 hours.

Thank you,
[Your Name]"

**Follow-up Request:**
"Hi [Driver Name],

Following up on our conversation regarding Incident [ID]. Can you please provide the additional information requested?

Specifically:
- [Detail 1]
- [Detail 2]

Please respond by [Date].

Thanks,
[Your Name]"

**Safety Reminder:**
"[Driver Name],

This is a reminder about [Safety Topic]. Please ensure you are following the proper procedures.

If you have any questions, please let me know.

[Your Name]"

**Commendation:**
"[Driver Name],

I wanted to recognize your excellent handling of [Situation]. Your professionalism and adherence to safety procedures are appreciated.

Keep up the great work!

[Your Name]"

**Policy Violation Notice:**
"[Driver Name],

A policy violation has been documented on [Date] regarding [Policy]. 

This communication serves as [verbal warning/written warning/final warning].

We need to discuss this matter. Please contact me to schedule a meeting.

[Your Name]"

#### Step 3: Review and Send
- Preview message
- Verify recipient
- Check attachments
- Send button

**After Sending:**
- Confirmation message
- Auto-marks as "Pending Response"
- Adds to communications list
- Sets follow-up reminder if needed

### Communication Templates Management

**Create Template:**
- Template name
- Message content
- Placeholders for dynamic content
- Save for reuse

**Edit Templates:**
- List of saved templates
- Edit button per template
- Delete option
- Share with team

**Placeholders:**
- [Driver Name]
- [Incident ID]
- [Date]
- [Your Name]
- [Vehicle]
- Custom placeholders

### Response Tracking

**Automated Status Updates:**
- Email read receipts (if available)
- Reply detection
- Status change to "Responded"

**Manual Status Updates:**
- Mark as acknowledged
- Mark follow-up complete
- Close communication

**Reminder System:**
- Set reminder date/time
- Email notification
- In-app notification
- Escalation if overdue

### Compliance & Audit Trail

**Complete History:**
- All communications logged
- Timestamps for every action
- User who performed action
- Cannot be deleted (only archived)

**Export for Investigations:**
- Export specific communication
- Export all for a driver
- Export all for an incident
- PDF format for legal purposes

**Search for Compliance:**
- Advanced search
- Date ranges
- Keyword search
- Export results

### Bulk Communications (Future)

**Send to Multiple Drivers:**
- Select multiple recipients
- Same message to all
- Track responses individually
- Useful for:
  - Policy updates
  - Training reminders
  - Safety bulletins
  - Schedule changes

---

## Email Template System

### Purpose
The email template system provides configurable notification templates used by workflow step email notifications. Templates are managed in the Admin → Email Templates tab and consumed by the Configure Step → Notifications → Email Template dropdown.

### Architecture
- **Shared Data Source:** All templates are defined in `/data/email-templates.ts` (`INITIAL_EMAIL_TEMPLATES` array)
- **Admin Page:** Imports and manages templates with full CRUD operations
- **StepConfigDialog:** Imports template list for the Email Template dropdown, showing template name and category
- **Template Description:** When a template is selected in the Configure Step dialog, its description is displayed below the dropdown
- **Admin Link:** An italic hint "Templates are managed in Administration → Email Templates" guides users to the admin page

### Template Schema
```typescript
interface EmailTemplate {
  id: string;           // e.g., 'ET-001'
  name: string;         // Display name
  description: string;  // Purpose description
  subject: string;      // Email subject with {{variables}}
  body: string;         // Email body with {{variables}}
  category: 'Notification' | 'Approval' | 'Escalation' | 'Completion' | 'Custom';
  variables: string[];  // Array of variable names used
  lastModified: string; // Last modification date
  isDefault: boolean;   // Whether this is a system default
}
```

### Coverage Matrix
The 10 templates cover all notification scenarios across the 17 workflows:

| Template | Workflow Scenarios |
|----------|-------------------|
| Default Notification | Minor incidents (WF-005, WF-007), parent notifications for safety compliance (WF-003) |
| Urgent Action Required | Safety coordinator alerts (WF-001, WF-008, WF-009, WF-011, WF-017, WF-019) |
| Approval Request | Disciplinary reviews (WF-001, WF-002, WF-004, WF-006, WF-008, WF-010, WF-011, WF-014, WF-016, WF-017) |
| Status Update | Any incident status change |
| Completion Notice | Workflow completion for any incident |
| Custom Template | User-created custom notifications |
| Parent/Guardian Notification | 11+ workflows with dedicated parent notification steps |
| Escalation Notice | WF-003 conditional escalation, WF-014 repeated misconduct |
| Follow-up Reminder | WF-002 30-day follow-up, behavior plan reviews |
| Corrective Action / Retraining | WF-015, WF-016, WF-018 driver corrective action steps |

---

## Data Export

### Purpose
Enable users to export data for external analysis, reporting, and compliance.

### Export Capabilities

**Available on Pages:**
- Incidents
- Students
- Vehicles
- Drivers
- Communications
- Reports

**Export Button Location:**
- Top right of data tables
- Download icon
- Clear labeling

### Export Formats

#### CSV (Comma-Separated Values)
**Features:**
- Universal compatibility
- Opens in Excel, Google Sheets
- Import to other systems
- Plain text format
- Respects current filters

**Columns Included:**
- All visible columns
- Formatted appropriately
- Headers included

**Filename Format:**
`[page]-export-YYYY-MM-DD.csv`

**Examples:**
- `incidents-export-2025-01-27.csv`
- `students-export-2025-01-27.csv`

**Use Cases:**
- Data analysis in Excel
- Import to other systems
- Share with stakeholders
- Archive records

#### PDF (Future Enhancement)
**Features:**
- Formatted report
- Ready to print
- District branding
- Headers and footers

**Content:**
- Summary statistics
- Filtered data table
- Charts (if applicable)
- Timestamp and user

**Use Cases:**
- Board presentations
- Printed reports
- Professional documents

#### Excel/XLSX (Future Enhancement)
**Features:**
- Multiple sheets
- Formulas included
- Charts embedded
- Filters active
- Professional formatting

**Content:**
- Summary sheet
- Data sheet
- Charts sheet
- Metadata sheet

**Use Cases:**
- Advanced analysis
- Pivot tables
- Professional reports

### Export Process

**Steps:**
1. Filter/search data as desired
2. Click "Export" button
3. Browser downloads file
4. File saved to downloads folder

**Notifications:**
- "Exporting..." indicator
- "Export complete" message
- Download link if large file

**File Size Limits:**
- CSV: No limit (browser dependent)
- PDF: 10,000 rows recommended
- Excel: 100,000 rows recommended

### Data Privacy

**Considerations:**
- Student information protected
- Follow FERPA guidelines
- Sensitive data marked
- Export logged for audit

**Anonymization Options (Future):**
- Remove student names
- Use IDs only
- Aggregate data
- Remove contact information

---

## Search & Filtering

### Purpose
Powerful search and filtering across all data tables for quick information access.

### Search Functionality

**Features:**
- Real-time filtering
- Case-insensitive
- Partial matches
- Searches multiple fields
- Clear button

**Search Bar Location:**
- Top of every data table
- Left side of filters
- Magnifying glass icon
- Placeholder text guides usage

**Search Behavior:**
- Filters as you type
- No "Enter" needed
- Instant results
- Maintains other filters

**Fields Searched (by page):**

**Incidents:**
- Incident ID
- Student name
- Driver name
- Vehicle number
- Description

**Students:**
- Student name
- Student ID
- School
- Grade
- Run

**Vehicles:**
- Vehicle ID
- Bus name
- Driver name
- Run
- Make/model

**Drivers:**
- Driver name
- Employee ID
- Run
- Vehicle
- Phone

**Communications:**
- Driver name
- Incident ID
- Subject
- Message content

### Filter Options

**Filter Placement:**
- Right side of search bar
- Dropdown selects
- Multiple filters supported
- Combine with search

**Filter Types:**

1. **Dropdown Filters**
   - Predefined options
   - Single selection
   - "All" option (default)
   - Instant apply

2. **Multi-Select (Future)**
   - Multiple options
   - Checkboxes
   - Apply button

3. **Date Range**
   - Start date
   - End date
   - Common presets
   - Calendar pickers

4. **Numeric Range (Future)**
   - Min value
   - Max value
   - Slider option

**Filter Combinations:**
- All filters work together
- AND logic (all must match)
- OR logic within same filter (future)
- Clear all filters button

**Filter State:**
- Persists during session
- URL parameters (future)
- Save filter sets (future)

---

## Sorting Functionality

### Purpose
Allow users to sort data tables by any column for better organization and analysis.

### Sortable Columns

**Implementation:**
- All column headers clickable
- Visual hover effect
- Pointer cursor
- Transition animation

**Sort Indicators:**

1. **Unsorted (Default):**
   - Icon: ⇅ Double chevron
   - Color: Muted gray
   - Position: Right of header text

2. **Sorted Ascending:**
   - Icon: ↑ Up chevron
   - Color: Primary (darker)
   - Position: Right of header text

3. **Sorted Descending:**
   - Icon: ↓ Down chevron
   - Color: Primary (darker)
   - Position: Right of header text

**Hover Effects:**
- Header text changes to primary color
- Cursor becomes pointer
- Subtle background highlight
- Smooth transition

### Sorting Behavior

**Click Sequence:**
1. **First Click:** Sort ascending (A→Z, 0→9, oldest→newest)
2. **Second Click:** Sort descending (Z→A, 9→0, newest→oldest)
3. **Third Click:** Return to default sort

**Default Sorts (by page):**

| Page | Default Column | Direction |
|------|---------------|-----------|
| Dashboard | Date | Descending |
| Incidents | Date | Descending |
| Students | Name | Ascending |
| Vehicles | Details (Name) | Ascending |
| Drivers | Name | Ascending |
| Communications | Date | Descending |
| Reports | N/A | - |

**Single Column Sort:**
- Only one column sorted at a time
- Clicking new column switches sort
- Previous sort indicator resets

**Multi-Column Sort (Future):**
- Hold Shift + Click for secondary sort
- Visual indicator for sort order (1, 2, 3)

### Sort Types

**Alphabetical (Text):**
- Case-insensitive
- A→Z or Z→A
- Special characters last
- Numbers before letters

**Numeric:**
- 0→9 or 9→0
- Handles commas (1,000)
- Handles decimals
- Empty values last

**Date:**
- Chronological order
- Oldest→Newest or Newest→Oldest
- Format: MMM DD, YYYY
- Empty dates last

**Custom Order:**
- Severity: Critical > High > Medium > Low
- Status: Open > Under Review > Resolved > Closed
- Maintenance: Excellent > Good > Needs Attention > In Repair

**Time-based:**
- Timestamps
- Relative time calculations
- Timezone aware (future)

### Sort Persistence

**Session:**
- Maintains sort during session
- Persists across page switches (within session)
- Resets on page refresh (currently)

**Future:**
- Save sort preferences per user
- URL parameters
- Remember last sort

### Performance

**Large Datasets:**
- Client-side sorting (current)
- Efficient algorithms
- Pagination for very large sets (future)
- Server-side sorting option (future)

---

## Future Enhancements

### Planned Features

#### Real-Time Notifications
- Push notifications for new incidents
- Browser notifications
- Mobile app notifications
- Email alerts (configurable)
- SMS alerts (critical only)

#### Mobile Application
- Native iOS and Android apps
- Offline incident entry
- Photo upload from camera
- GPS location auto-capture
- Push notifications
- Driver app for incident reporting

#### Advanced Analytics
- Machine learning for pattern detection
- Predictive incident forecasting
- Risk scoring for students/drivers/vehicles
- Anomaly detection
- Intervention recommendations

#### GPS Tracking Integration
- Real-time vehicle location
- Run adherence monitoring
- Speed monitoring
- Harsh braking/acceleration alerts
- Geofencing for incidents
- Historical playback

#### Student Information System Integration
- Import student data automatically
- Sync updates
- Link to academic records
- Share behavioral data
- Parent portal integration

#### Automated Incident Detection
- Harsh braking triggers incident form
- Speed violations auto-create incidents
- Run deviation alerts
- Camera integration (AI detection)
- Sensor data (student count, fights)

#### Parent Portal
- View student's incident history
- Receive notifications
- Acknowledge incidents
- Provide feedback
- Communication thread

#### Multi-Language Support
- Spanish
- Other district languages
- Automatic translation
- Language preference per user

#### Voice Input
- Voice-to-text for descriptions
- Hands-free incident entry
- Voice commands
- Accessibility enhancement

#### Workflow Automation
- Auto-assignment rules
- Status change automation
- Reminder automation
- Escalation rules
- Approval workflows

#### Integration Capabilities
- API for external systems
- Webhooks for events
- SSO (Single Sign-On)
- Third-party app integrations

#### Enhanced Reporting
- Interactive dashboards
- Real-time analytics
- Custom KPI tracking
- Benchmarking against similar districts
- Predictive analytics

#### Media Management
- Video incident evidence
- Dash cam integration
- Bus camera footage linking
- Photo galleries
- Evidence chain of custody

#### Certification Management
- Automatic expiration tracking
- Training scheduling
- Renewal reminders
- Document storage
- Compliance reporting

#### Run Management Module
- Full run planning
- Stop management
- Student assignment to stops
- Run optimization
- Map visualization

### Long-Term Vision

**Comprehensive Transportation Management:**
- Incident tracking (current)
- Run planning and optimization
- Real-time GPS tracking
- Maintenance scheduling
- Driver management
- Student assignment
- Parent communications
- Financial management
- Fuel tracking
- Parts inventory
- Vendor management

**AI-Powered Insights:**
- Predictive maintenance
- Incident prevention recommendations
- Driver coaching suggestions
- Run optimization based on patterns
- Risk assessment
- Resource allocation optimization

**District-Wide Platform:**
- Multiple departments
- Shared data and analytics
- Unified reporting
- Central communication hub
- Cross-departmental workflows

---

**Document Version:** 1.0.0  
**Last Updated:** January 27, 2026  
**Maintained By:** Product Team
