# v4 Workflow System Documentation

**Document Version:** v4  
**Last Updated:** January 29, 2025  
**Component Version:** 250

---

## Table of Contents

1. [Overview](#overview)
2. [Workflow Architecture](#workflow-architecture)
3. [Pre-configured Workflows](#pre-configured-workflows)
4. [Auto-Assignment Logic](#auto-assignment-logic)
5. [Workflow UI Components](#workflow-ui-components)
6. [Creating Custom Workflows](#creating-custom-workflows)
7. [API Reference](#api-reference)

---

## Overview

The v4 Workflow System provides automated, multi-step approval processes for incident management. Workflows are automatically assigned based on incident type and severity, ensuring consistent handling across the district.

### Key Features

- **Automatic Assignment:** Workflows trigger automatically when incidents match criteria
- **Multi-Step Processes:** Define complex approval chains with dependencies
- **Role-Based Assignment:** Steps assigned to specific roles (Driver, Principal, etc.)
- **Email Notifications:** Configurable alerts for step transitions
- **Approval Requirements:** Steps can require approval from specific users/roles
- **Time Delays:** Automatic step triggers after specified time periods
- **Conditional Logic:** Steps can trigger based on incident attributes
- **Progress Tracking:** Visual timeline showing workflow status

---

## Workflow Architecture

### Core Data Structures

#### Workflow Interface

```typescript
export interface Workflow {
  id: string;                    // Unique identifier (e.g., 'WF-001')
  name: string;                  // Display name
  description: string;           // Purpose description
  incidentTypes: string[];       // Array of matching incident types
  severityLevels: string[];      // Array of matching severity levels
  steps: WorkflowStep[];         // Ordered array of workflow steps
  isActive: boolean;             // Template is enabled in system
  active?: boolean;              // Instance is actively being worked
  createdBy: string;             // Creator name
  createdDate: string;           // Creation timestamp
  lastModified: string;          // Last modification timestamp
}
```

#### WorkflowStep Interface

```typescript
export interface WorkflowStep {
  // Basic Information
  id: string;                    // Unique step ID
  name: string;                  // Step name
  description: string;           // Step description/instructions
  assignedRole: string;          // Role responsible for step
  estimatedDuration: string;     // Expected time to complete
  required: boolean;             // Step is mandatory
  order: number;                 // Sequence order (1, 2, 3...)
  
  // Status Tracking
  status?: 'Not Started' | 'In Progress' | 'Completed' | 
           'Pending Approval' | 'Approved' | 'Rejected';
  completedDate?: string;        // Timestamp of completion
  completedBy?: string;          // User who completed step
  comments?: string;             // Step completion notes
  
  // Approval Configuration
  requiresApproval?: boolean;    // Step needs approval
  approvers?: string[];          // Roles that can approve
  allowedStatuses?: string[];    // Valid status values
  
  // Email Notifications
  emailNotifications?: {
    notifyOnStart: boolean;      // Send email when step starts
    notifyOnComplete: boolean;   // Send email when step completes
    notifyAssignee: boolean;     // Notify assigned role
    notifyApprovers: boolean;    // Notify approvers
    notifyRoles?: string[];      // Additional roles to notify
    additionalRecipients: string[]; // Custom email addresses
    emailTemplate?: string;      // Template name to use
  };
  
  // Step Triggers
  trigger?: {
    type: 'manual' | 'auto-complete' | 'time-delay' | 
          'status-change' | 'approval-granted' | 'conditional';
    delayAmount?: number;        // Delay duration
    delayUnit?: 'minutes' | 'hours' | 'days';
    requiredStatus?: string;     // Required incident status
    conditions?: Array<{         // Conditional trigger logic
      field: string;
      operator: string;
      value: string;
    }>;
  };
}
```

### Trigger Types Explained

#### 1. Manual Trigger
```typescript
trigger: { type: 'manual' }
```
- Step requires manual initiation
- User must explicitly start the step
- Typically used for first step in workflow

#### 2. Auto-Complete Trigger
```typescript
trigger: { type: 'auto-complete' }
```
- Step automatically starts when previous step completes
- Most common trigger type
- Ensures smooth progression

#### 3. Time Delay Trigger
```typescript
trigger: {
  type: 'time-delay',
  delayAmount: 24,
  delayUnit: 'hours'
}
```
- Step starts after specified time delay
- Useful for follow-up tasks
- Examples: 30-day follow-up, next-day review

#### 4. Status Change Trigger
```typescript
trigger: {
  type: 'status-change',
  requiredStatus: 'In Progress'
}
```
- Step triggers when incident status changes
- Useful for status-dependent actions

#### 5. Approval Granted Trigger
```typescript
trigger: { type: 'approval-granted' }
```
- Step starts only after previous step is approved
- Prevents premature progression
- Used after approval-required steps

#### 6. Conditional Trigger
```typescript
trigger: {
  type: 'conditional',
  conditions: [
    { field: 'repeatOffense', operator: 'equals', value: 'true' }
  ]
}
```
- Step triggers based on incident attributes
- Enables dynamic workflow paths
- Example: Escalate only if repeat offense

---

## Pre-configured Workflows

### WF-001: Physical Altercation Response

**Matches:**
- Incident Types: Physical Altercation
- Severity: High

**Steps:**
1. **Immediate Driver Response** (Driver, 5 min, Manual)
   - Safely stop bus and separate students
   - Document immediate observations
   
2. **Safety Coordinator Notification** (Safety Coordinator, 15 min, Auto-complete)
   - Review incident details
   - Check for injuries
   - Email notifications enabled
   
3. **Parent Notification - Both Students** (Principal, 30 min, Auto-complete)
   - Contact all involved parents
   - Explain incident circumstances
   
4. **Disciplinary Action Review** (Administrator, 1 hour, Time-delay: 2 hours)
   - Review incident
   - Determine consequences
   - Requires approval from Administrator & Superintendent
   
5. **Documentation & Close** (Safety Coordinator, 20 min, Approval-granted)
   - Complete final documentation
   - Close incident

### WF-002: Bullying Investigation

**Matches:**
- Incident Types: Taunting/Bullying
- Severity: High, Medium

**Steps:**
1. **Initial Report Documentation** (Driver, 15 min, Manual)
2. **Victim Support & Assessment** (Nurse, 30 min, Auto-complete)
3. **Witness Interviews** (Principal, 45 min, Time-delay: 1 hour)
4. **Parent Notification** (Principal, 30 min, Auto-complete)
5. **Intervention Plan Development** (Safety Coordinator, 1 hour, Auto-complete, Requires Approval)
6. **30-Day Follow-up** (Nurse, 20 min, Time-delay: 30 days)

### WF-003: Seat Refusal - Standard

**Matches:**
- Incident Types: Seat Refusal
- Severity: Low, Medium

**Steps:**
1. **Driver Verbal Warning** (Driver, 5 min, Manual)
2. **Parent Notification** (Safety Coordinator, 10 min, Auto-complete)
3. **Escalation Review** (Safety Coordinator, 15 min, Conditional: if repeat offense)

### WF-004: Offensive Language Protocol

**Matches:**
- Incident Types: Offensive Language
- Severity: Medium, High

**Steps:**
1. **Immediate Documentation** (Driver, 10 min, Manual)
2. **Principal Review** (Principal, 20 min, Auto-complete)
3. **Parent Conference** (Principal, 30 min, Time-delay: 24 hours)
4. **Disciplinary Action** (Administrator, 15 min, Auto-complete, Requires Approval)

### WF-005: Disruptive Behavior - Minor

**Matches:**
- Incident Types: Disruptive Volume
- Severity: Low, Medium

**Steps:**
1. **Driver Warning & Documentation** (Driver, 5 min, Manual)
2. **Automated Parent Notification** (Safety Coordinator, 5 min, Auto-complete)
3. **Close Incident** (Safety Coordinator, 5 min, Time-delay: 2 days)

### WF-006: Property Damage Investigation

**Matches:**
- Incident Types: Vandalism, Window Misuse
- Severity: Medium, High

**Steps:**
1. **Damage Assessment & Photo Documentation** (Driver, 15 min, Manual)
2. **Fleet Manager Review** (Fleet Manager, 30 min, Auto-complete)
3. **Parent Notification & Restitution** (Administrator, 45 min, Auto-complete)
4. **Disciplinary Action** (Principal, 20 min, Auto-complete, Requires Approval)
5. **Repair Scheduling** (Fleet Manager, 2 hours, Approval-granted)

### WF-007: Food & Beverage Violation

**Matches:**
- Incident Types: Eating/Drinking Violation
- Severity: Low, Medium

**Steps:**
1. **Driver Warning & Cleanup** (Driver, 10 min, Manual)
2. **Parent Notification** (Safety Coordinator, 5 min, Auto-complete)
3. **Review & Close** (Safety Coordinator, 5 min, Time-delay: 24 hours)

---

## Auto-Assignment Logic

### Assignment Function

```typescript
export function assignWorkflowToIncident(
  incidentType: string, 
  severity: string
): Workflow | null {
  // Find matching workflow
  const matchingWorkflow = workflows.find(
    (workflow) =>
      workflow.isActive &&
      workflow.incidentTypes.includes(incidentType) &&
      workflow.severityLevels.includes(severity)
  );

  if (matchingWorkflow) {
    // Clone workflow and reset step statuses for new incident
    const newWorkflow: Workflow = {
      ...matchingWorkflow,
      active: true, // Set instance as active when first assigned
      steps: matchingWorkflow.steps.map((step) => ({
        ...step,
        status: 'Not Started',
        completedDate: undefined,
        completedBy: undefined,
        comments: undefined,
      })),
    };
    
    return newWorkflow;
  }

  return null;
}
```

### Assignment Rules

1. **Both Type and Severity Must Match**
   - Incident type must be in `workflow.incidentTypes` array
   - Severity must be in `workflow.severityLevels` array
   - Both conditions must be true

2. **Workflow Must Be Active**
   - Only workflows with `isActive: true` are considered
   - Inactive workflows are ignored

3. **First Match Wins**
   - Workflows are checked in array order
   - First matching workflow is assigned
   - No multiple workflow assignment

4. **Fresh Instance Created**
   - Template workflow is cloned
   - All steps reset to "Not Started"
   - Previous data cleared
   - `active: true` flag set

### Usage Example

```typescript
// In NewIncidentForm.tsx
const handleSubmit = async (formData) => {
  // Create incident
  const incident = await createIncident(formData);
  
  // Auto-assign workflow
  const workflow = assignWorkflowToIncident(
    formData.incidentType,
    formData.severity
  );
  
  if (workflow) {
    // Attach workflow to incident
    incident.workflow = workflow;
    console.log(`Assigned workflow: ${workflow.name}`);
  } else {
    console.log('No matching workflow found');
  }
  
  return incident;
};
```

---

## Workflow UI Components

### IncidentWorkflowProgress Component

**File:** `/components/incidents/IncidentWorkflowProgress.tsx`

**Purpose:** Displays workflow progress timeline with step status

**Props:**
```typescript
interface Props {
  workflow: Workflow;
  incidentId: string;
}
```

**Features:**
- Progress bar showing completion percentage
- Vertical timeline with connecting lines
- Color-coded status badges
- Expandable step details
- Assigned role display
- Estimated duration
- Completion information
- Comments section

**Visual Design:**
```tsx
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <div>
        <CardTitle>{workflow.name}</CardTitle>
        <CardDescription>{workflow.description}</CardDescription>
      </div>
      <Badge>
        <GitBranch className="mr-1" />
        {getWorkflowProgress(workflow.steps)}% Complete
      </Badge>
    </div>
  </CardHeader>
  <CardContent>
    <Progress value={getWorkflowProgress(workflow.steps)} />
    <div className="space-y-4 mt-6">
      {workflow.steps.map((step) => (
        <WorkflowStepCard key={step.id} step={step} />
      ))}
    </div>
  </CardContent>
</Card>
```

**Status Badge Colors:**
```typescript
const statusColors = {
  'Not Started': 'bg-gray-100 text-gray-600',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Completed': 'bg-green-100 text-green-700',
  'Pending Approval': 'bg-amber-100 text-amber-700',
  'Approved': 'bg-emerald-100 text-emerald-700',
  'Rejected': 'bg-red-100 text-red-700',
};
```

### Workflow Badge in Incident Table

**Location:** `/components/incidents/IncidentsPage.tsx`

**Display:**
```tsx
{incident.workflow && isWorkflowActive(incident.workflow) && (
  <Badge 
    variant="outline"
    style={{ 
      color: 'var(--brand-blue-dark)',
      borderColor: 'var(--brand-blue-dark)',
    }}
  >
    <GitBranch className="h-3 w-3 mr-1" />
    Workflow ({getWorkflowProgress(incident.workflow.steps)}%)
  </Badge>
)}
```

### Workflow Builder Page

**File:** `/components/workflows/WorkflowBuilderPage.tsx`

**Purpose:** Visual workflow template editor

**Features:**
- Drag-and-drop step reordering
- Step configuration dialog
- Add/remove steps
- Configure triggers
- Set approval requirements
- Email notification setup
- Incident type/severity matching
- Save as template

---

## Creating Custom Workflows

### Step-by-Step Guide

#### 1. Define Workflow Template

```typescript
const customWorkflow: Workflow = {
  id: 'WF-CUSTOM-001',
  name: 'Custom Incident Response',
  description: 'Workflow for handling custom incident types',
  incidentTypes: ['Custom Type'],
  severityLevels: ['Medium', 'High'],
  isActive: true,
  createdBy: 'Admin User',
  createdDate: '2025-01-29',
  lastModified: '2025-01-29',
  steps: []
};
```

#### 2. Add Workflow Steps

```typescript
customWorkflow.steps = [
  {
    id: 'step-1',
    name: 'Initial Assessment',
    description: 'Driver assesses situation and documents details',
    assignedRole: 'Driver',
    estimatedDuration: '10 minutes',
    required: true,
    order: 1,
    trigger: {
      type: 'manual'
    }
  },
  {
    id: 'step-2',
    name: 'Supervisor Review',
    description: 'Supervisor reviews and approves initial assessment',
    assignedRole: 'Supervisor',
    estimatedDuration: '15 minutes',
    required: true,
    order: 2,
    requiresApproval: true,
    approvers: ['Supervisor', 'Administrator'],
    trigger: {
      type: 'auto-complete'
    },
    emailNotifications: {
      notifyOnStart: true,
      notifyOnComplete: true,
      notifyAssignee: true,
      notifyApprovers: true,
      additionalRecipients: [],
      emailTemplate: 'Approval Request'
    }
  },
  // ... more steps
];
```

#### 3. Add to Workflows Array

```typescript
// In workflows.ts
export const workflows: Workflow[] = [
  // ... existing workflows
  customWorkflow
];
```

#### 4. Test Assignment

```typescript
const testIncident = {
  incidentType: 'Custom Type',
  severity: 'High'
};

const assigned = assignWorkflowToIncident(
  testIncident.incidentType,
  testIncident.severity
);

console.log('Assigned workflow:', assigned?.name);
```

### Best Practices

1. **Clear Naming**
   - Use descriptive workflow names
   - Explain purpose in description
   - Use meaningful step names

2. **Logical Progression**
   - Order steps sequentially
   - Use appropriate triggers
   - Consider time delays

3. **Proper Role Assignment**
   - Assign to correct roles
   - Ensure roles exist in system
   - Document role responsibilities

4. **Email Configuration**
   - Enable notifications for critical steps
   - Notify appropriate parties
   - Use templates consistently

5. **Approval Gates**
   - Require approval for consequential actions
   - Assign multiple approvers when needed
   - Use approval-granted triggers

6. **Error Handling**
   - Mark critical steps as required
   - Provide clear descriptions
   - Include fallback options

---

## API Reference

### Core Functions

#### assignWorkflowToIncident()
```typescript
function assignWorkflowToIncident(
  incidentType: string,
  severity: string
): Workflow | null
```
Finds and assigns matching workflow to incident.

**Returns:** Cloned workflow instance or null

#### isWorkflowActive()
```typescript
function isWorkflowActive(workflow: Workflow | null): boolean
```
Checks if workflow instance is currently active.

**Returns:** true if active, false otherwise

#### completeWorkflow()
```typescript
function completeWorkflow(workflow: Workflow): Workflow
```
Marks workflow as completed/inactive.

**Returns:** Updated workflow with `active: false`

#### getWorkflowProgress()
```typescript
function getWorkflowProgress(steps: WorkflowStep[]): number
```
Calculates workflow completion percentage.

**Returns:** Progress percentage (0-100)

#### getCurrentStep()
```typescript
function getCurrentStep(steps: WorkflowStep[]): WorkflowStep | null
```
Finds first incomplete step.

**Returns:** Current step or null if all complete

### Usage Examples

```typescript
// Get workflow progress
const progress = getWorkflowProgress(incident.workflow.steps);
console.log(`${progress}% complete`);

// Check if workflow active
if (isWorkflowActive(incident.workflow)) {
  console.log('Workflow in progress');
}

// Get current step
const currentStep = getCurrentStep(incident.workflow.steps);
if (currentStep) {
  console.log(`Current step: ${currentStep.name}`);
  console.log(`Assigned to: ${currentStep.assignedRole}`);
}

// Complete workflow
const completedWorkflow = completeWorkflow(incident.workflow);
incident.workflow = completedWorkflow;
```

---

## Integration Points

### Incident Creation
- Workflow assigned automatically on incident creation
- Assignment based on type + severity matching
- Workflow attached to incident object

### Incident Detail Page
- Displays workflow progress component
- Shows current step
- Allows step progression (if authorized)

### Incident Table
- Shows workflow badge with progress
- Filters by workflow status
- Sorts by workflow completion

### Communications
- Email notifications sent per step configuration
- Templates used for consistent messaging
- Multiple recipients supported

---

## Troubleshooting

### Workflow Not Assigning

**Check:**
1. Workflow `isActive: true`
2. Incident type in `incidentTypes` array
3. Severity in `severityLevels` array
4. Both conditions must match

### Steps Not Progressing

**Check:**
1. Previous step completed
2. Trigger configuration correct
3. Time delay elapsed (if applicable)
4. Approval granted (if required)

### Notifications Not Sending

**Check:**
1. `emailNotifications` configured
2. Recipient addresses valid
3. Email template exists
4. Notification flags enabled

---

**End of v4 Workflow System Documentation**
