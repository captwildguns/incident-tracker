# Workflow System Documentation

## Table of Contents
1. [Overview](#overview)
2. [Workflow Management Page](#workflow-management-page)
3. [Workflow Builder](#workflow-builder)
4. [Incident Detail Page - Workflow Integration](#incident-detail-page---workflow-integration)
5. [Workflow Assignment Logic](#workflow-assignment-logic)
6. [Workflow Notifications](#workflow-notifications)
7. [Best Practices](#best-practices)

---

## Overview

### Purpose
The Workflow System provides automated, configurable incident management workflows that guide users through consistent response processes based on incident type and severity. Workflows ensure proper handling, documentation, and resolution of all incidents according to district policies.

### Key Benefits
- **Consistency:** Standardized incident response across all staff
- **Accountability:** Clear role assignments and completion tracking
- **Efficiency:** Automated step progression and notifications
- **Compliance:** Built-in policy adherence and documentation
- **Visibility:** Real-time progress tracking and reporting
- **Flexibility:** Customizable workflows for district-specific needs

### Workflow Components
- **Workflow Templates:** Reusable process definitions
- **Workflow Steps:** Sequential actions with assignments
- **Automatic Assignment:** Rule-based workflow selection
- **Progress Tracking:** Real-time completion monitoring
- **Audit Trail:** Complete history of all workflow activities

---

## Workflow Management Page

**Navigation:** Main menu > Workflows (far right tab)

**Purpose:** Central hub for viewing, managing, and creating custom workflow templates.

### Summary Statistics

**Four Key Metrics:**

1. **Total Workflows**
   - Count of all workflow templates in system
   - Includes active and inactive workflows
   - Default and custom workflows combined
   - Updates in real-time

2. **Active Workflows**
   - Currently available for use
   - Automatically assigned to matching incidents
   - Can be manually selected
   - Green status indicator

3. **In Use**
   - Number of workflows currently assigned to open incidents
   - Real-time tracking of active assignments
   - Links to incidents using workflows
   - Performance indicator

4. **Avg. Completion Time**
   - Average days to complete workflow end-to-end
   - Calculated from resolved incidents
   - Performance benchmark
   - Trend indicator

### Workflow Templates Table

**Purpose:** Display all available workflow templates with key information and management actions.

**Sortable Columns:**

1. **Workflow Name**
   - Descriptive workflow name
   - Click to view full details
   - Sort: Alphabetical (A-Z, Z-A)
   - Default sort column (ascending)
   - Examples:
     - "Student Behavior - High Severity"
     - "Safety Violation Investigation"
     - "Vehicle Accident Response"

2. **Type**
   - Incident type this workflow handles
   - Badge display with color coding:
     - Student Behavior: Blue
     - Safety Violation: Orange
     - Mechanical: Gray
     - Accident: Red
     - Other: Light blue
   - Sort: Alphabetical by type
   - Filter-friendly

3. **Severity**
   - Applicable severity levels for this workflow
   - Multiple severities possible
   - Display format: "High, Critical" or "Medium"
   - Badge colors match severity levels:
     - Critical: Red
     - High: Orange
     - Medium: Yellow
     - Low: Gray
   - Sort: By highest severity level

4. **Steps**
   - Number of workflow steps
   - Icon: List/checklist icon
   - Sort: Numeric (ascending/descending)
   - Indicates workflow complexity
   - Typical range: 3-10 steps

5. **Est. Time**
   - Estimated completion time in days
   - Format: "X days"
   - Calculated from sum of step estimates
   - Sort: Numeric
   - Examples: "3 days", "7 days", "10 days"

6. **Status**
   - Active or Inactive
   - Badge display:
     - Active: Green with checkmark
     - Inactive: Gray
   - Sort: Alphabetical (Active first)
   - Only active workflows auto-assign

7. **Actions**
   - **Edit button:** Opens workflow builder for modifications
   - **View button:** Shows read-only workflow details
   - **Duplicate button:** Creates copy for customization
   - **Delete button:** Removes workflow (with confirmation dialog)
   - **Activate/Deactivate toggle:** Quick status change

### Default Workflows

**Pre-configured Templates:**

The system includes several default workflows ready to use:

#### 1. Student Behavior - High Severity
- **Steps:** 6
- **Estimated Time:** 5 days
- **Applicable Severity:** High
- **Steps Include:**
  1. Immediate Response & Safety Assessment (Driver)
  2. Document Incident & Collect Statements (Safety Coordinator)
  3. Notify Parents/Guardians (Safety Coordinator)
  4. Administrative Review (Transportation Director)
  5. Implement Disciplinary Action (Principal)
  6. Follow-up & Resolution (Safety Coordinator)

#### 2. Student Behavior - Medium Severity
- **Steps:** 5
- **Estimated Time:** 3 days
- **Streamlined process** for minor behavioral incidents
- **Focuses on:** Quick resolution and parent communication

#### 3. Safety Violation - Critical
- **Steps:** 7
- **Estimated Time:** 7 days
- **Comprehensive investigation** with regulatory reporting
- **Includes:** Documentation, witness statements, corrective actions

#### 4. Mechanical Issue - High
- **Steps:** 5
- **Estimated Time:** 4 days
- **Maintenance coordination** workflow
- **Includes:** Vehicle inspection, repair authorization, safety clearance

#### 5. Accident - Critical
- **Steps:** 8
- **Estimated Time:** 10 days
- **Full investigation** process
- **Includes:** Police report, insurance claim, root cause analysis, preventive measures

### Automatic Workflow Assignment

**How It Works:**

When a new incident is created, the system automatically:

1. **Analyzes Incident:**
   - Reviews incident type
   - Checks severity level
   - Identifies matching workflows

2. **Selects Best Match:**
   - Prioritizes custom workflows over defaults
   - Chooses most specific match (exact severity vs multiple severities)
   - Falls back to default if no custom match
   - Selects newest if multiple matches exist

3. **Assigns Workflow:**
   - Attaches workflow to incident
   - Initializes all steps as "Not Started"
   - Sets first step to "In Progress"
   - Sends notification to first assignee
   - Calculates estimated completion timeline

**Manual Override:**
- Users can change assigned workflow anytime
- Select from all active workflows
- Modify individual steps as needed
- Create one-off custom workflow for specific incident

### Table Features

- **Search:** Filter workflows by name, type, or keyword
- **Sorting:** Click column headers to sort (ascending/descending/default)
- **Filtering:** Filter by status (Active/Inactive), type, or severity
- **Pagination:** (Future) Navigate through large workflow lists
- **Hover Effects:** Row highlights on hover for better visibility
- **Responsive:** Horizontal scroll on mobile devices

### Quick Actions

- **Create New Workflow:** Button opens workflow builder
- **Import Workflow:** (Future) Import from template library
- **Export Workflows:** (Future) Download workflow configurations
- **Bulk Actions:** (Future) Activate/deactivate multiple workflows

---

## Workflow Builder

**Access:** Workflows page > "Create New Workflow" button OR "Edit" button on existing workflow

**Purpose:** Visual workflow creation and editing tool for building custom incident response processes tailored to district policies and procedures.

### Workflow Configuration

**Basic Information Section:**

1. **Workflow Name** (Required)
   - Text input field
   - Descriptive name for the workflow
   - Should indicate type and severity
   - Examples:
     - "High Severity Student Behavior Protocol"
     - "Critical Safety Investigation Process"
     - "Vehicle Accident Response - Major"
   - Max length: 100 characters
   - Must be unique

2. **Description** (Optional)
   - Large text area
   - Purpose and usage notes
   - Internal reference documentation
   - When to use this workflow
   - Special considerations
   - Policy references

3. **Incident Type** (Required)
   - Dropdown selection
   - Single type per workflow
   - Options:
     - Student Behavior
     - Safety Violation
     - Mechanical
     - Accident
     - Other
   - Determines automatic assignment criteria

4. **Severity Levels** (Required)
   - Multi-select checkboxes
   - Can apply to one or multiple severities
   - Options:
     - Critical
     - High
     - Medium
     - Low
   - At least one must be selected
   - More specific = higher priority in auto-assignment

5. **Status Toggle** (Required)
   - Active/Inactive switch
   - **Active:** Available for auto-assignment and manual selection
   - **Inactive:** Preserved but not used for new incidents
   - Can be toggled anytime
   - Inactive workflows remain on existing incidents

### Workflow Steps Builder

**Purpose:** Define the sequential steps that comprise the workflow process.

**Step Configuration Interface:**

Each workflow step includes the following fields:

#### 1. Step Number
- **Display:** Auto-numbered sequentially (Step 1, Step 2, etc.)
- **Visual:** Large number indicator
- **Order:** Defines execution sequence
- **Reorderable:** Drag-and-drop (future enhancement)

#### 2. Step Title (Required)
- **Input:** Text field
- **Purpose:** Brief, action-oriented description
- **Length:** 3-100 characters
- **Examples:**
  - "Immediate Response & Safety Assessment"
  - "Document Incident & Collect Statements"
  - "Notify Parents/Guardians"
  - "Conduct Administrative Review"
  - "Implement Corrective Actions"
  - "Close and Archive Incident"
- **Best Practice:** Start with action verb

#### 3. Step Description (Recommended)
- **Input:** Multi-line text area
- **Purpose:** Detailed instructions for completing the step
- **Contents:**
  - What needs to be done
  - How to complete the step
  - Required documentation
  - Forms to complete
  - People to contact
  - Compliance requirements
  - Best practices
- **Examples:**
  ```
  Immediately assess the situation to ensure student safety:
  - Separate involved students if necessary
  - Check for injuries requiring medical attention
  - Move students to safe location if needed
  - Calm students and maintain order
  - Prevent further incidents
  - Document initial observations
  ```

#### 4. Assigned To (Required)
- **Input:** Dropdown selection
- **Purpose:** Defines who is responsible for completing this step
- **Options (Role-Based):**
  - Driver
  - Safety Coordinator
  - Transportation Director
  - Transportation Supervisor
  - Principal
  - Vice Principal
  - District Administrator
  - Maintenance Supervisor
  - Auto-assigned (uses incident's assigned user)
- **Behavior:**
  - Step appears in assignee's task list
  - Assignee receives notification when step becomes active
  - Only assignee can complete step (or supervisors)

#### 5. Estimated Days (Required)
- **Input:** Number field
- **Range:** 1-30 days typical
- **Purpose:** Expected time to complete this step
- **Usage:**
  - Sets due date when step starts
  - Calculates overall workflow timeline
  - Triggers overdue alerts
  - Performance tracking
- **Defaults:** 1-3 days for most steps

#### 6. Requires Approval (Optional)
- **Input:** Checkbox toggle
- **Purpose:** Indicates step needs supervisory approval before completion
- **When Checked:**
  - Step enters "Pending Approval" status when completed
  - Approval request sent to designated approver
  - Workflow pauses until approved/rejected
  - Comments required for approval decision
- **Use Cases:**
  - Disciplinary decisions
  - Budget approvals
  - Policy exceptions
  - Legal clearances
- **Approver:** Defined by role hierarchy

#### 7. Auto-Trigger Next Step (Optional)
- **Input:** Checkbox toggle
- **Default:** Unchecked (manual progression)
- **When Checked:**
  - Next step automatically starts upon current step completion
  - Status changes to "In Progress" immediately
  - Notification sent to next assignee
  - Seamless workflow progression
- **When Unchecked:**
  - User must manually click "Start Next Step"
  - Allows for review/pause between steps
  - More control over workflow pace
- **Recommended For:** Routine, sequential processes

### Step Management Actions

**Add Step Button:**
- **Location:** Below last step
- **Action:** Creates new blank step at end of workflow
- **Behavior:** Step number auto-increments
- **Validation:** Previous step must have title before adding new

**Edit Step Button:**
- **Location:** Top right of each step card
- **Action:** Opens step in edit mode
- **Behavior:** All fields become editable
- **Save:** Updates step with new values

**Delete Step Button:**
- **Location:** Next to edit button
- **Action:** Removes step from workflow
- **Confirmation:** "Are you sure?" dialog to prevent accidental deletion
- **Behavior:** 
  - Step removed
  - Subsequent steps renumbered automatically
  - Cannot delete if only 1-2 steps remain

**Duplicate Step Button:**
- **Location:** Step action menu
- **Action:** Creates copy of step
- **Behavior:** 
  - Copies all field values
  - Inserts below current step
  - User can modify copy
- **Use Case:** Similar steps with slight variations

**Reorder Steps:** (Future Enhancement)
- Drag-and-drop interface
- Visual step reordering
- Auto-renumbering

### Step Validation Rules

**Before Saving Workflow:**

- ✓ Workflow name is required and unique
- ✓ Incident type selected
- ✓ At least one severity level selected
- ✓ Minimum 3 steps recommended (warning if fewer)
- ✓ Each step has a title
- ✓ Each step has an assignee
- ✓ Estimated days > 0 for all steps
- ✓ At least one step exists

**Validation Messages:**
- Real-time validation as user types
- Red error messages for required fields
- Yellow warnings for recommendations
- Green confirmation when valid

### Workflow Preview

**Purpose:** Visual representation of complete workflow before saving.

**Preview Display:**

1. **Timeline View:**
   - Vertical timeline showing all steps
   - Connector lines between steps
   - Step numbers and titles
   - Assigned roles
   - Estimated durations

2. **Summary Statistics:**
   - Total steps: X
   - Total estimated time: X days
   - Roles involved: List
   - Approval steps: Count
   - Auto-progression steps: Count

3. **Step Details:**
   - Expandable sections
   - Full step information
   - Assignment visualization
   - Approval indicators

**Preview Actions:**
- **Test Workflow:** Apply to sample incident (future)
- **Edit:** Return to builder
- **Print:** Generate PDF preview (future)

### Save and Activate Options

**Save as Draft Button:**
- **Action:** Saves all changes
- **Status:** Sets workflow to Inactive
- **Behavior:**
  - Not available for auto-assignment
  - Not shown in manual selection
  - Can be edited
  - Preserved in system
- **Use Case:** Work in progress, testing, future use

**Save and Activate Button:**
- **Action:** Saves changes and activates workflow
- **Status:** Sets workflow to Active
- **Behavior:**
  - Available for automatic assignment to new incidents
  - Shown in manual workflow selection dropdown
  - Can still be edited (changes apply to new assignments only)
  - Existing incidents keep old version
- **Use Case:** Ready for production use

**Cancel Button:**
- **Action:** Discards all changes
- **Confirmation:** "Unsaved changes will be lost. Continue?"
- **Behavior:** Returns to workflows list

### Workflow Versioning (Future)

- **Version History:** Track changes over time
- **Compare Versions:** Side-by-side diff
- **Rollback:** Restore previous version
- **Active Version:** Only one version active at a time

---

## Incident Detail Page - Workflow Integration

**Navigation:** Incidents page > Click Incident ID

**Purpose:** Comprehensive incident management with integrated workflow tracking, completion, and audit trail.

### Enhanced Tab Navigation

The incident detail page includes five tabs (order left to right):

1. **Overview** - Incident summary and quick workflow status
2. **Workflow** - Full workflow management and step completion
3. **Communications** - Messages and notifications
4. **Photos** - (Conditional) Incident photos and evidence
5. **History** - Complete audit trail and timeline

### Overview Tab - Workflow Summary Widget

**Location:** Right sidebar on Overview tab

**Purpose:** At-a-glance workflow progress without leaving overview.

**Display Components:**

1. **Workflow Progress Circle**
   - **Visual:** Circular progress indicator (120px diameter)
   - **Percentage:** Large number in center
   - **Progress Arc:** Colored arc showing completion
   - **Colors:**
     - Green: 100% complete
     - Blue: 1-99% in progress
     - Gray: 0% (not started)
   - **Animation:** Smooth fill animation

2. **Completion Statistics**
   - **Format:** "X of Y steps complete"
   - **Badge:** 
     - Green background when 100% complete
     - Blue background when in progress
   - **Icon:** Checkmark for complete, progress icon for active

3. **Current Step Display**
   - **Step Name:** Currently active step title
   - **Assigned To:** Role or user name
   - **Status Badge:** Not Started / In Progress / Pending Approval / Completed
   - **Due Date:** When current step is due

4. **Quick Action Button**
   - **Text:** "View Full Workflow"
   - **Icon:** Right arrow
   - **Action:** Navigates to Workflow tab
   - **Style:** Primary button with brand colors

### Workflow Tab - Complete Workflow Management

**Purpose:** Full workflow visualization, step completion interface, and comprehensive progress tracking.

#### Workflow Header Section

**Display Elements:**

- **Workflow Name:** Large, bold title
- **Workflow Type Badge:** Color-coded incident type
- **Severity Badge:** Priority level indicator
- **Overall Progress Bar:**
  - Horizontal bar showing % complete
  - Segment indicators for each step
  - Color gradient from blue to green
  - Percentage label
  
- **Statistics Row:**
  - Total Steps: X
  - Completed Steps: X
  - Remaining Steps: X
  - Estimated Time: X days
  - Actual Time Elapsed: X days
  - On Track Indicator: Green ✓ or Red ⚠

#### Workflow Steps Detailed Display

**Step Cards Layout:**

Each step displayed as a card with comprehensive information:

**1. Step Number & Status Icon (Left Side)**
- **Icon Visual Indicators:**
  - ✓ **Green checkmark:** Step completed successfully
  - → **Blue arrow:** Step currently in progress
  - ⏸ **Yellow pause:** Pending approval
  - ○ **Gray circle:** Not yet started
- **Step Number:** Large number badge
- **Connector Line:** Vertical line connecting steps

**2. Step Title & Content (Center Section)**
- **Step Title:**
  - Font size: Large (text-lg)
  - Font weight: Semi-bold
  - Color: Primary text color
  - Example: "Immediate Response & Safety Assessment"
  
- **Step Description:**
  - Detailed instructions
  - Expandable/collapsible section
  - Rich text formatting
  - Bullet points and numbered lists
  - Links to policies/procedures (future)

**3. Assignment Information**
- **Assigned To:**
  - Icon: User icon
  - Role or specific user name
  - Highlighted if assigned to current user (blue background)
  - Example: "Safety Coordinator" or "Sarah Williams"

**4. Status Badge**
- **Options:**
  - Not Started (Gray badge)
  - In Progress (Blue badge)
  - Pending Approval (Yellow badge)
  - Completed (Green badge with checkmark)
- **Location:** Top right of step card
- **Design:** Rounded badge with icon

**5. Timeline Information**

Displays key dates and durations:

- **Started:**
  - Icon: Clock icon
  - Format: "MMM DD, YYYY"
  - Example: "Mar 14, 2025"
  - Shows when step became active

- **Due Date:**
  - Icon: Calendar icon
  - Format: "MMM DD, YYYY"
  - Calculated from estimated days
  - **Color Coding:**
    - Green: Not due yet
    - Yellow: Due within 1 day
    - Red: Overdue
  
- **Completed:** (For finished steps only)
  - Icon: Checkmark in circle
  - **Format: "MM/DD/YYYY, HH:MM AM/PM"**
  - **Example: "03/16/2025, 2:30 PM"**
  - **INCLUDES BOTH DATE AND TIME**
  
- **Duration:** (For completed steps)
  - Icon: Hourglass
  - Format: "X days" or "X hours"
  - Actual time to complete
  - Comparison to estimate

**6. Completion Details Panel** (Expanded for completed steps)

**Critical Information Display:**

- **Completion Badge:**
  - Large green checkmark icon
  - "Completed" text
  - Prominent visual indicator

- **Completion Timestamp:**
  - **Label:** "Completed on:"
  - **Format:** Full date and time
  - **Example:** "03/16/2025, 2:30 PM"
  - **Display:** "MM/DD/YYYY, HH:MM AM/PM"
  - **Font:** Medium weight, readable size
  - **Color:** Muted foreground color

- **Completed By:**
  - **Label:** "Completed by:"
  - **Format:** "by [User Name] on [Date Time]"
  - **Example:** "by Sarah Williams on 03/16/2025, 2:30 PM"
  - **Full Sentence Format** for clarity
  - **Icon:** User avatar or icon
  - **Link:** (Future) Click to view user profile

- **Completion Comments:**
  - **Label:** "Comments:"
  - **Display:** Full text in light card/box
  - **Format:** Multi-line text with line breaks
  - **Styling:** 
    - Light background (rgba)
    - Rounded corners
    - Padding for readability
  - **Content:** Actions taken, outcomes, notes
  - **Example:**
    ```
    Bus stopped safely, students separated. 
    No injuries observed. Contacted dispatch 
    to arrange student pickup.
    ```

**7. Action Buttons** (For active/upcoming steps)

**Complete Step Button:**
- **Display:** Only for "In Progress" steps assigned to current user
- **Icon:** Checkmark
- **Text:** "Complete Step"
- **Color:** Primary green
- **Action:** Opens completion dialog

**Add Comment Button:**
- **Icon:** Message/comment icon
- **Text:** "Add Comment"
- **Color:** Secondary blue
- **Action:** Add notes without completing

**Start Step Button:**
- **Display:** Only for "Not Started" steps when previous step complete
- **Icon:** Play icon
- **Text:** "Start Step"
- **Action:** Changes status to "In Progress"

**Request Approval Button:**
- **Display:** For steps requiring approval
- **Icon:** Shield/approval icon
- **Text:** "Request Approval"
- **Action:** Submits for approval

**Reassign Button:**
- **Icon:** User switch icon
- **Text:** "Reassign"
- **Action:** Change assignment (supervisors only)

#### Complete Step Dialog

**Triggered:** Clicking "Complete Step" button

**Dialog Components:**

**Header:**
- **Title:** "Complete Workflow Step"
- **Step Name:** Display which step is being completed
- **Current Status:** Show current status badge

**Step Information Display:**
- **Step Title:** Read-only
- **Step Description:** Read-only reminder
- **Assigned To:** Current assignment
- **Started Date:** When step began

**Completion Comment Field:**
- **Label:** "Completion Comments" (with asterisk if required)
- **Input:** Large textarea (5-10 rows)
- **Placeholder:** 
  - "Describe the actions taken..."
  - "Document the resolution..."
  - "Provide outcome details and any relevant information..."
- **Character Count:** Show remaining characters (max 1000)
- **Validation:** 
  - Required if step configuration demands it
  - Minimum 10 characters recommended
  - Error message if empty and required

**Approval Fields** (If step requires approval)

- **Approval Decision:**
  - Radio buttons: ○ Approve  ○ Reject
  - Required selection
  
- **Approval Comments:**
  - Textarea for approval justification
  - Required for rejection
  - Optional for approval
  
- **Approver Information:**
  - Auto-filled current user name
  - Date/time stamp
  - Approval authority level

**Attachments Section** (Future Enhancement)
- **Upload Supporting Documents:**
  - File picker
  - Multiple files allowed
  - File type restrictions
  - Max size limits
  
- **Add Photos:**
  - Camera integration
  - Gallery selection
  - Photo annotation
  
- **Link Related Records:**
  - Connect to other incidents
  - Reference maintenance records
  - Link communications

**Footer Actions:**

**Save & Complete Button:**
- **Icon:** Checkmark
- **Text:** "Save & Complete"
- **Color:** Primary green
- **Action:** 
  - Validates all required fields
  - Marks step as completed
  - **Records completion timestamp with time**
  - Records completing user
  - Saves all comments
  - Triggers next step (if auto-trigger enabled)
  - Sends notifications
  - Closes dialog
  - Refreshes workflow display

**Save as Draft Button:**
- **Icon:** Save icon
- **Text:** "Save Progress"
- **Color:** Secondary blue
- **Action:**
  - Saves comments without completing
  - Keeps step status as "In Progress"
  - Allows returning later to complete
  - Closes dialog

**Cancel Button:**
- **Icon:** X
- **Text:** "Cancel"
- **Color:** Gray/neutral
- **Action:**
  - Closes dialog without saving
  - Confirmation if comments entered
  - Returns to workflow tab

**Validation Messages:**
- **Error:** Red banner for missing required fields
- **Warning:** Yellow banner for recommendations
- **Success:** Green confirmation when saved

#### Auto-Progression Behavior

**When "Auto-trigger next step" is enabled:**

1. **Immediate Actions:**
   - Current step marked as "Completed"
   - **Completion timestamp recorded with date AND time**
   - Next step status changes to "In Progress"
   - Next step "Started" date set to now
   - Step card updates immediately

2. **Notifications Sent:**
   - Next assignee: "New step assigned to you"
   - Previous assignee: "Step completed successfully"
   - Incident creator: "Workflow progressed to next step"
   - Supervisors: Progress update (configurable)

3. **Visual Updates:**
   - Progress bar increments
   - Step counter updates
   - Current step indicator moves
   - Confetti animation (optional) when workflow completes

**When manual progression (no auto-trigger):**

1. **User Must Act:**
   - "Start Next Step" button appears
   - User clicks to begin next step
   - Allows review/pause between steps

2. **Use Cases:**
   - Requires review before proceeding
   - Waiting for external input
   - Approval needed
   - Documentation review

#### Workflow Completion

**When Last Step Completed:**

1. **Status Updates:**
   - Workflow status: "Completed"
   - Incident status: Automatically updates (configurable)
   - **Final completion timestamp with date and time recorded**
   - All steps show green checkmarks

2. **Notifications:**
   - All participants: "Workflow completed"
   - Incident creator: "Incident resolved via workflow"
   - Supervisors: Completion summary
   - Parents/Guardians: Resolution notification (if configured)

3. **Visual Feedback:**
   - Success banner: "Workflow Completed Successfully!"
   - 100% progress indicator
   - Green completion badge
   - Confetti animation (optional)
   - Sound notification (optional, user preference)

4. **Generated Artifacts:**
   - Completion certificate (future)
   - Final report PDF (future)
   - Audit trail export (future)
   - Performance metrics logged

5. **Next Steps Suggestions:**
   - Close incident
   - Generate report
   - Send final communications
   - Archive documents
   - Review and provide feedback

### History Tab - Workflow Audit Trail

**Purpose:** Complete chronological record of all incident and workflow activities with full datetime tracking.

**Tab Design:**
- Reverse chronological order (most recent first)
- Vertical timeline visual
- Color-coded activity types
- Expandable detail sections
- Export capabilities

#### Timeline Display Structure

**Visual Elements:**

- **Vertical Timeline Line:** 
  - Left side connector
  - Color gradient from recent (blue) to older (gray)
  - Connects all timeline events

- **Activity Icons:**
  - 📝 Incident created/updated
  - ✓ Workflow step completed (green)
  - 🔄 Status changed
  - 💬 Communication sent
  - 📷 Photo added/uploaded
  - 👤 Assignment changed
  - ⚠️ Approval requested
  - ✓ Approval granted (green)
  - ✗ Approval rejected (red)
  - 🔔 Notification sent

#### Timeline Activity Types

**1. Incident Created**
- **Icon:** Document icon
- **Title:** "Incident Created"
- **Timestamp:** Full date and time (MM/DD/YYYY, HH:MM AM/PM)
- **User:** Created by [User Name]
- **Details:**
  - Incident type
  - Severity level
  - Initial description summary
  - Location
  - Involved parties

**2. Workflow Assigned**
- **Icon:** Workflow/process icon
- **Title:** "Workflow Assigned"
- **Timestamp:** Full date and time
- **Details:**
  - Workflow name
  - Assignment method (Automatic/Manual)
  - Assigned by user (if manual)
  - Total steps
  - Estimated completion time
  - First step assignee

**3. Workflow Steps Completed**

**Most Important Timeline Entries:**

Each completed step shows:

- **Icon:** ✓ Large green checkmark in circle
- **Title:** Step name (e.g., "Immediate Response & Safety Assessment")
- **Status Badge:** "Completed" in green

- **Completion Information:**
  - **Completed on:** Full date AND time
    - **Format:** "MM/DD/YYYY, HH:MM AM/PM"
    - **Example:** "03/16/2025, 2:30 PM"
    - **Display:** Prominent, easy to read
    - **Icon:** Clock icon next to timestamp
  
  - **Completed by:** User who completed the step
    - **Format:** "by [User Name]"
    - **Example:** "by Sarah Williams"
    - **Icon:** User avatar or icon
    - **Link:** (Future) Click to view user profile
  
  - **Combined Display:**
    - **Full sentence format for clarity**
    - **Example:** "Completed by Sarah Williams on 03/16/2025, 2:30 PM"
    - **Styling:** Muted text color, readable font size

- **Completion Comments:**
  - **Label:** "Comments:"
  - **Display:** Expandable text box
  - **Styling:** 
    - Light background card
    - Indented from left
    - Rounded corners
    - Padding for readability
  - **Content:** Full text of completion comments
  - **Example:**
    ```
    Bus stopped safely, students separated. 
    No injuries observed. Contacted dispatch 
    to arrange student pickup. All students 
    accounted for and parents notified.
    ```

- **Duration Information:**
  - Time to complete step
  - Comparison to estimate (on time/late)
  - Performance indicator

- **Visual Connector:**
  - Line connecting to previous step
  - Shows workflow progression
  - Color-coded by status

**4. Status Changes**
- **Icon:** Circular arrow/refresh icon
- **Title:** "Status Changed"
- **Timestamp:** Full date and time
- **Details:**
  - From status → To status
  - Changed by user
  - Reason/comment (if provided)
  - Trigger (manual/automatic)

**5. Incident Updates**
- **Icon:** Edit/pencil icon
- **Title:** "Incident Updated"
- **Timestamp:** Full date and time
- **Details:**
  - Fields modified (list)
  - Old value → New value (for each field)
  - Updated by user
  - Update reason (if provided)

**6. Communications Sent**
- **Icon:** Message/email icon
- **Title:** "Communication Sent"
- **Timestamp:** Full date and time
- **Details:**
  - Communication type (Email/SMS/In-app)
  - Recipients (list with icons)
  - Subject line
  - Brief summary or preview
  - Related workflow step (if any)
  - Delivery status (sent/delivered/read)

**7. Photos Added**
- **Icon:** Camera icon
- **Title:** "Photos Added"
- **Timestamp:** Full date and time
- **Details:**
  - Number of photos uploaded
  - Uploaded by user
  - Photo thumbnails (small preview)
  - Related workflow step (if any)
  - Photo descriptions/captions

**8. Approval Activities**

**Approval Requested:**
- **Icon:** Shield with question mark
- **Title:** "Approval Requested"
- **Timestamp:** Full date and time
- **Details:**
  - Step requiring approval
  - Requested by user
  - Approver assigned
  - Due date for approval

**Approval Granted:**
- **Icon:** Shield with green checkmark
- **Title:** "Approval Granted"
- **Timestamp:** Full date and time
- **Details:**
  - Approved by user
  - Approval comments
  - Related workflow step
  - Next action triggered

**Approval Rejected:**
- **Icon:** Shield with red X
- **Title:** "Approval Rejected"
- **Timestamp:** Full date and time
- **Details:**
  - Rejected by user
  - Rejection reason
  - Required changes
  - Reassignment or next steps

#### History Tab Features

**Filtering Options:**

Dropdown filters to show:
- **All Activities** (default)
- **Workflow Steps Only** - Focus on workflow progress
- **Status Changes Only** - Track incident status transitions
- **Communications Only** - View all messages
- **User-Specific Actions** - Filter by user who performed action
- **Date Range** - Custom date picker for timeframe

**Search Functionality:**
- Search within history entries
- Keyword search in comments
- User name search
- Date search

**Export Options:**

**Download Complete History:**
- **PDF Format:**
  - Professional report layout
  - Includes all timeline entries
  - **Full date and time stamps preserved**
  - User signatures (digital)
  - District branding
  - Suitable for legal/compliance records

- **CSV Format:**
  - Spreadsheet compatible
  - All data fields
  - Sortable/filterable
  - Data analysis friendly

- **Print View:**
  - Print-optimized layout
  - No unnecessary UI elements
  - Professional formatting

**Visual Design Details:**

- **Timeline Connector:**
  - 2px solid line
  - Gradient from blue (recent) to gray (older)
  - Connects all timeline events vertically

- **Activity Cards:**
  - White background
  - Subtle shadow for depth
  - Rounded corners (var(--radius))
  - Padding for readability
  - Hover effect: Slight elevation increase

- **Timestamp Display:**
  - **Font:** Roboto, consistent with design system
  - **Size:** var(--text-sm)
  - **Color:** var(--muted-foreground)
  - **Format:** Always "MM/DD/YYYY, HH:MM AM/PM"
  - **Icon:** Small clock icon for visual clarity

- **User Attribution:**
  - **Icon:** Small user avatar or icon
  - **Name:** Linked to user (future)
  - **Format:** "by [User Name]"
  - **Color:** var(--foreground)

- **Comments/Details:**
  - **Background:** var(--muted) or rgba with transparency
  - **Border:** Subtle left border for indentation
  - **Font:** var(--text-sm)
  - **Line Height:** 1.4 for readability
  - **Max Height:** Expandable sections for long text

**Expandable Sections:**
- Click to expand full details
- Collapsed by default for long entries
- "Show More" / "Show Less" toggle
- Smooth animation

---

## Workflow Assignment Logic

### Automatic Assignment Algorithm

**When:** Every time a new incident is created

**Process Flow:**

1. **Incident Analysis:**
   - System reads incident type
   - System reads incident severity
   - Creates matching criteria

2. **Workflow Search:**
   - Query all **Active** workflows
   - Filter by matching incident type
   - Filter by matching severity level (exact or multi-severity)
   - Result: List of eligible workflows

3. **Priority Selection:**

   **Priority Order:**
   
   a. **Custom Workflows** (higher priority)
      - District-created workflows
      - Specific to organization needs
      - Supersedes defaults
   
   b. **Exact Severity Match** (most specific)
      - Workflow with single matching severity
      - Example: "High" workflow for "High" incident
      - More targeted than multi-severity workflows
   
   c. **Multi-Severity Match** (broader)
      - Workflow covering multiple severities including this one
      - Example: "High, Critical" workflow for "High" incident
      - Fallback for flexibility
   
   d. **Default Workflows** (fallback)
      - System-provided workflows
      - Always available
      - Ensures incident always has workflow
   
   e. **Newest Workflow** (tiebreaker)
      - If multiple workflows match at same priority level
      - Most recently created/updated wins
      - Assumes newest reflects current best practice

4. **Assignment Execution:**

   Once workflow selected:
   
   a. **Link Workflow to Incident:**
      - Workflow ID attached to incident record
      - Workflow name displayed
      - Estimated timeline calculated
   
   b. **Initialize All Steps:**
      - All steps created with "Not Started" status
      - Step numbers assigned (1, 2, 3...)
      - Assignees set from workflow template
      - Due dates calculated (start date + estimated days)
   
   c. **Activate First Step:**
      - First step status → "In Progress"
      - Started timestamp recorded
      - Due date set
   
   d. **Send Notifications:**
      - Email to first assignee
      - In-app notification
      - SMS if critical (configurable)
      - Includes incident summary and step details
   
   e. **Calculate Timeline:**
      - Sum all step estimated days
      - Set expected completion date
      - Create milestone dates
      - Enable progress tracking

### Manual Assignment Override

**When:** User clicks "Change Workflow" or "Assign Workflow" on incident

**Interface:**

1. **Workflow Selection Dropdown:**
   - List all **Active** workflows
   - Filter options:
     - All workflows
     - Matching type only
     - Matching severity only
     - Custom only
     - Default only
   - Search box for workflow name

2. **Workflow Preview:**
   - Hover shows workflow summary
   - Steps count
   - Estimated time
   - Roles involved

3. **Confirmation:**
   - "Are you sure?" dialog
   - Warning if current workflow in progress
   - Option to preserve completed steps
   - Reason for change (comment field)

4. **Assignment Actions:**
   - Replace current workflow completely, OR
   - Keep completed steps, append remaining
   - Reset all to "Not Started"
   - Notify affected assignees

### One-Off Custom Workflow

**When:** Incident requires unique handling not covered by templates

**Process:**

1. **Create Custom Workflow:**
   - Same workflow builder interface
   - Marked as "One-Off" (not saved as template)
   - Only applies to this incident
   - Not available for other incidents

2. **Custom Steps:**
   - User defines steps specific to this incident
   - Assigns roles
   - Sets timelines
   - Adds detailed instructions

3. **Immediate Application:**
   - Workflow assigned to incident only
   - Starts immediately
   - Follows same completion process

4. **Optional Save as Template:**
   - After incident resolved
   - "Save this workflow as template?"
   - Allows reuse for similar future incidents
   - Becomes regular workflow

### Assignment Edge Cases

**No Matching Workflow:**
- System assigns default workflow for incident type
- Notification sent to administrators
- Suggests creating custom workflow for this scenario

**Multiple Exact Matches:**
- Newest workflow selected
- Log shows all eligible workflows
- Admin can review and adjust

**Inactive Workflow on Active Incident:**
- Existing incidents keep their assigned workflow
- Workflow deactivation doesn't affect in-progress incidents
- New incidents won't receive inactive workflows

**Workflow Deleted:**
- Cannot delete workflow if in use
- Must wait for all incidents to complete
- Or manually reassign incidents to different workflow

---

## Workflow Notifications

### Automated Notification System

**Purpose:** Keep all stakeholders informed of workflow progress without manual communication.

### Notification Types

#### 1. Workflow Assigned

**Triggered:** When workflow automatically or manually assigned to incident

**Recipients:**
- First step assignee (primary)
- Incident creator
- Incident assigned user (if different)
- Supervisors (configurable)

**Notification Content:**

**Subject:** "New Incident Assigned - [Incident ID]"

**Body:**
```
A new incident has been assigned to you:

Incident ID: INC-001
Type: Student Behavior
Severity: High
Student: John Smith
Date: March 16, 2025

Workflow: Student Behavior - High Severity
Your Step: Immediate Response & Safety Assessment
Due Date: March 17, 2025

Click here to view incident details and complete your step.
```

**Channels:**
- ✉️ Email notification
- 🔔 In-app notification (bell icon)
- 📱 SMS (if critical and user opted in)
- 📲 Mobile push (future)

#### 2. Step Completed

**Triggered:** When any workflow step is marked as completed

**Recipients:**
- Next step assignee (primary)
- Previous step assignee (confirmation)
- Incident creator (progress update)
- Supervisors (awareness)

**Notification Content:**

**Subject:** "Workflow Step Completed - Action Required"

**Body:**
```
A workflow step has been completed:

Incident ID: INC-001
Completed Step: Immediate Response & Safety Assessment
Completed By: Sarah Williams
Completed On: 03/16/2025, 2:30 PM

YOUR NEXT STEP:
Step: Document Incident & Collect Statements
Due Date: March 18, 2025
Estimated Time: 2 days

Click here to view details and start your step.
```

**Channels:**
- ✉️ Email
- 🔔 In-app notification
- 📱 SMS (if urgent)

#### 3. Approval Requested

**Triggered:** When step requiring approval is completed

**Recipients:**
- Designated approver (primary)
- Step completer (confirmation)
- Supervisors

**Notification Content:**

**Subject:** "Approval Required - [Incident ID]"

**Body:**
```
Your approval is requested:

Incident ID: INC-001
Step Requiring Approval: Implement Disciplinary Action
Requested By: David Park
Requested On: 03/18/2025, 10:15 AM

Approval Decision Needed:
Review the completed step and approve or reject
the proposed disciplinary action.

Due Date: March 19, 2025 (within 24 hours)

Click here to review and provide your approval decision.
```

**Channels:**
- ✉️ Email (high priority)
- 🔔 In-app notification (persistent)
- 📱 SMS (for critical approvals)

**Reminder:** Sent after 24 hours if no response

#### 4. Workflow Overdue

**Triggered:** When step passes due date without completion

**Recipients:**
- Step assignee (reminder)
- Assignee's supervisor
- Transportation Director
- Incident creator (awareness)

**Notification Content:**

**Subject:** "⚠️ OVERDUE - Workflow Step Past Due Date"

**Body:**
```
A workflow step is overdue:

Incident ID: INC-001
Overdue Step: Administrative Review
Assigned To: Robert Martinez
Due Date: March 17, 2025
Days Overdue: 2

This step is critical to incident resolution.
Please complete as soon as possible or reassign
if unable to complete.

Click here to complete or escalate.
```

**Channels:**
- ✉️ Email (urgent flag)
- 🔔 In-app notification (red indicator)
- 📱 SMS (after 1 day overdue)

**Escalation:**
- Day 1 overdue: Assignee and supervisor
- Day 3 overdue: Director level
- Day 5 overdue: District administrator

#### 5. Workflow Completed

**Triggered:** When final workflow step is completed

**Recipients:**
- All workflow participants
- Incident creator
- Parents/Guardians (configurable)
- Administrators

**Notification Content:**

**Subject:** "✅ Incident Resolved - Workflow Complete"

**Body:**
```
The incident workflow has been completed:

Incident ID: INC-001
Type: Student Behavior
Student: John Smith
Date: March 16, 2025

Workflow: Student Behavior - High Severity
Started: March 16, 2025, 7:50 AM
Completed: March 21, 2025, 3:45 PM
Duration: 5 days (on schedule)

All steps completed successfully.
Incident status updated to: Resolved

Click here to view complete incident history
and download final report.
```

**Channels:**
- ✉️ Email (all participants)
- 🔔 In-app notification
- 📧 Parent notification (separate template)

#### 6. Step Reassigned

**Triggered:** When step assignee is changed

**Recipients:**
- New assignee (action required)
- Previous assignee (awareness)
- User who made the change

**Notification Content:**

**Subject:** "Workflow Step Reassigned to You"

**Body:**
```
A workflow step has been reassigned to you:

Incident ID: INC-001
Step: Document Incident & Collect Statements
Previously Assigned To: Jane Doe
Reassigned By: Sarah Williams
Reason: Jane is on leave this week

Due Date: March 18, 2025
Priority: High

Click here to view details and complete your step.
```

#### 7. Comment Added

**Triggered:** When user adds comment to workflow step

**Recipients:**
- Step assignee
- Users who previously commented
- Mentioned users (@username)

**Notification Content:**

**Subject:** "New Comment on Workflow Step"

**Body:**
```
A new comment has been added:

Incident ID: INC-001
Step: Administrative Review
Comment By: Sarah Williams
Time: 03/17/2025, 2:15 PM

Comment:
"Please expedite this review. Parent has requested
meeting tomorrow. See attached documentation."

Click here to view and respond.
```

### Notification Settings

**User Preferences:**

Users can configure notification preferences:

1. **Email Notifications:**
   - All updates
   - Only assigned to me
   - Only critical/overdue
   - None (in-app only)

2. **SMS Notifications:**
   - Critical only
   - Approvals only
   - Never

3. **In-App Notifications:**
   - Always (cannot disable)
   - Badge count on icon
   - Sound alerts (on/off)

4. **Frequency:**
   - Real-time (immediate)
   - Daily digest (8 AM)
   - Weekly summary (Monday 8 AM)

5. **Quiet Hours:**
   - Start time (e.g., 6 PM)
   - End time (e.g., 7 AM)
   - Except critical

**Admin Settings:**

Administrators can set district-wide notification rules:

1. **Required Notifications:**
   - Cannot be disabled by users
   - Example: Critical incidents, legal requirements

2. **Default Settings:**
   - New user default preferences
   - Recommended notification levels

3. **Escalation Rules:**
   - When to escalate to supervisors
   - Overdue thresholds
   - Auto-reassignment triggers

### Notification Delivery Methods

**In-App Notifications:**
- **Location:** Bell icon in top navigation
- **Badge:** Red number indicator for unread count
- **Dropdown:** Click to view list of notifications
- **Mark as Read:** Click notification
- **Clear All:** Button to dismiss all
- **Persistence:** Stored until user dismisses

**Email Notifications:**
- **From:** noreply@incidenttracker.traversa.com
- **Template:** Branded HTML email
- **Links:** Deep links to specific incident/step
- **Unsubscribe:** (For non-critical notifications)
- **Reply-To:** (Future) Direct message to sender

**SMS Notifications:**
- **Short Messages:** Concise incident summary
- **Link:** Short URL to incident
- **Opt-In Required:** Users must enable
- **Carrier Fees:** User responsibility
- **Rate Limiting:** Max 5 per day per user (except critical)

---

## Best Practices

### Workflow Design Best Practices

#### 1. Optimal Step Count

**Recommendation:** 3-10 steps per workflow

**Why:**
- **Too Few (1-2):** Insufficient structure, lacks accountability
- **Just Right (3-10):** Clear process, manageable checkpoints
- **Too Many (>10):** Overwhelming, reduces completion rates

**Guidelines:**
- Simple incidents: 3-5 steps
- Standard incidents: 5-7 steps
- Complex incidents: 7-10 steps
- If >10 steps needed: Consider breaking into sub-workflows

#### 2. Step Granularity

**Each Step Should:**
- ✓ Represent ONE clear action or decision point
- ✓ Be completable by one person/role in one sitting
- ✓ Have a clear start and end
- ✓ Produce a tangible outcome or deliverable

**Avoid:**
- ✗ Combining multiple unrelated actions
- ✗ Steps that span multiple days without milestones
- ✗ Vague or ambiguous actions

**Example - Good Granularity:**
```
Step 1: Assess situation and ensure safety
Step 2: Document incident details
Step 3: Notify parents/guardians
Step 4: Conduct administrative review
Step 5: Implement corrective action
```

**Example - Poor Granularity:**
```
Step 1: Do everything
Step 2: Handle the incident
Step 3: Complete all paperwork and notify everyone
```

#### 3. Realistic Time Estimates

**Setting Estimated Days:**

- **Consider:**
  - Actual time to perform task
  - Review/approval time
  - Communication delays
  - User workload and availability
  - Dependencies on external parties

- **Build in Buffer:**
  - Add 20-30% to ideal time
  - Account for weekends/holidays
  - Consider peak busy seasons

- **Typical Estimates:**
  - Immediate response: 1 day
  - Documentation: 1-2 days
  - Notifications: 1 day
  - Reviews/approvals: 2-3 days
  - Implementations: 3-5 days
  - Follow-up: 1-2 days

**Review Actual Performance:**
- Compare estimated vs actual completion times
- Adjust estimates based on historical data
- Update workflows quarterly

#### 4. Clear, Actionable Descriptions

**Step Title Best Practices:**

- **Start with Action Verb:**
  - ✓ "Conduct investigation"
  - ✓ "Notify parents"
  - ✓ "Review documentation"
  - ✗ "Investigation"
  - ✗ "Parents"
  - ✗ "Documentation"

- **Be Specific:**
  - ✓ "Collect witness statements from all students"
  - ✗ "Get information"

- **Keep Concise:**
  - Ideal: 3-8 words
  - Maximum: 100 characters

**Step Description Best Practices:**

- **Include:**
  - What needs to be done (tasks)
  - How to do it (procedures)
  - What's required (documentation, forms)
  - Who to contact (resources)
  - Where to find information (links, references)
  - Why it's important (context)

- **Format:**
  - Use bullet points
  - Number sequential tasks
  - Bold key requirements
  - Link to policy documents (future)

- **Example Description:**
  ```
  Conduct Administrative Review
  
  Tasks to Complete:
  1. Review all incident documentation
  2. Evaluate witness statements for consistency
  3. Check student behavioral history
  4. Consult district discipline policy
  5. Determine appropriate action
  
  Required Documentation:
  - Incident report
  - Witness statements (all parties)
  - Student discipline record
  - Parent notification confirmation
  
  Resources:
  - District Discipline Policy (Section 4.2)
  - Student Code of Conduct
  - Consult Safety Coordinator if unsure
  
  Decision Needed:
  Determine severity level and appropriate
  disciplinary action according to district
  policy guidelines.
  ```

#### 5. Appropriate Role Assignments

**Match Roles to Responsibilities:**

- **Driver:** Immediate response, initial documentation
- **Safety Coordinator:** Investigations, parent notifications, follow-up
- **Transportation Director:** Approvals, policy decisions, high-severity reviews
- **Principal/Vice Principal:** Student discipline, school coordination
- **District Administrator:** Critical incidents, legal matters, policy exceptions

**Avoid:**
- Assigning all steps to one role (creates bottleneck)
- Assigning steps to roles without authority
- Unclear role definitions

**Balance Workload:**
- Distribute steps across multiple roles
- Don't overload any single position
- Consider backup assignees for absences

**Use "Auto-assigned":**
- When incident creator is best suited
- For initial documentation steps
- Maintains continuity

#### 6. Strategic Use of Approvals

**When to Require Approval:**

- ✓ Disciplinary decisions
- ✓ Budget expenditures
- ✓ Policy exceptions
- ✓ Legal implications
- ✓ High-severity outcomes

**When NOT to Require Approval:**

- ✗ Routine documentation
- ✗ Simple notifications
- ✗ Data entry tasks
- ✗ Standard procedures

**Approval Considerations:**
- Each approval adds 1-3 days
- Too many approvals slow workflow
- Define clear approval criteria
- Designate backup approvers

#### 7. Testing New Workflows

**Before Activating:**

1. **Internal Review:**
   - Team walkthrough
   - Step-by-step evaluation
   - Identify gaps or redundancies

2. **Pilot Test:**
   - Apply to 2-3 sample incidents
   - Track actual vs estimated times
   - Gather user feedback

3. **Refinement:**
   - Adjust based on pilot results
   - Clarify confusing steps
   - Update time estimates
   - Fix assignment issues

4. **Documentation:**
   - Create user guide
   - Train affected staff
   - Communicate changes

**Post-Activation:**
- Monitor first 5 incidents closely
- Collect feedback continuously
- Make adjustments as needed

#### 8. Regular Review and Updates

**Quarterly Review:**

- **Metrics to Analyze:**
  - Average completion time vs estimate
  - Step completion rates
  - Overdue frequency
  - User feedback scores
  - Incident resolution rates

- **Questions to Ask:**
  - Are steps being skipped?
  - Are steps taking longer than estimated?
  - Are assignees struggling with any steps?
  - Have policies changed?
  - Are there new compliance requirements?

**Annual Overhaul:**
- Comprehensive workflow audit
- Comparison to industry best practices
- Stakeholder input sessions
- Major revisions if needed

**Version Control:**
- Track changes over time
- Document reason for each change
- Maintain change log
- Archive old versions

#### 9. User Training

**Initial Training:**
- Workflow system overview
- How to complete steps
- How to request help
- Notification management

**Role-Specific Training:**
- Workflows assigned to their role
- Approval processes
- Escalation procedures
- Common issues and solutions

**Ongoing Support:**
- Quick reference guides
- Video tutorials
- Help desk availability
- Peer mentoring

#### 10. Documentation Standards

**Maintain:**
- Workflow library with descriptions
- Step completion guidelines
- Role responsibility matrix
- Escalation contact list
- Policy reference links

**Accessibility:**
- Help menu in app
- Searchable knowledge base
- Context-sensitive help
- Tooltips and hints

### Workflow Governance

**Ownership:**
- Transportation Director: Overall workflow strategy
- Safety Coordinator: Day-to-day workflow management
- IT/System Admin: Technical workflow configuration

**Change Management:**
- Formal change request process
- Impact analysis required
- Stakeholder approval
- Communication plan
- Training plan

**Compliance:**
- Ensure workflows meet legal requirements
- Document compliance steps
- Audit trail maintenance
- Regular compliance audits

---

## Summary

The Workflow System transforms incident management from ad-hoc responses to structured, consistent, and accountable processes. Key features include:

✅ **Automated workflow assignment** based on incident type and severity
✅ **Visual workflow builder** for creating custom processes
✅ **Step-by-step progress tracking** with completion timestamps including date AND time
✅ **Role-based assignments** ensuring right person handles each step
✅ **Approval workflows** for decisions requiring oversight
✅ **Complete audit trail** in History tab with full datetime tracking
✅ **Automated notifications** keeping stakeholders informed
✅ **Flexible customization** for district-specific needs
✅ **Performance metrics** for continuous improvement

The system ensures every incident receives consistent, policy-compliant handling while providing complete visibility and accountability throughout the resolution process.

---

**Document Version:** 1.0  
**Last Updated:** January 29, 2026  
**Next Review:** April 29, 2026
