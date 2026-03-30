# Screen: Workflow Builder

| Property | Value |
|----------|-------|
| **Screen Name** | Workflow Builder |
| **Screen Slug / Path** | `workflow-builder` |
| **Purpose** | Visual editor for workflow templates with steps, triggers, notifications, approval gates |
| **Primary User Roles** | Supervisor, Administrator |
| **Status** | Added |
| **Rationale** | New screen not in original guide |

![Wireframe - Workflow Builder 1440x900](INSERT_IMAGE_HERE)

## Workflow Metadata Fields

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| name | text input | Y | max 100 chars | `Physical Altercation Response` |
| description | textarea | Y | max 500 chars | `Workflow for handling...` |
| incidentTypes | multi-select | Y | INCIDENT_TYPES | `[\"Physical Altercation\"]` |
| severity | single-select | Y | Low/Medium/High | `"High"` |

## Page Header

The Workflow Builder header displays the workflow name and description. The only badge shown is the **System Default Workflow** indicator (for WF-DEFAULT). Severity and incident type badges were removed from the header for a cleaner layout.

## Step Library Modal

Accessed via the "Add Step from Library" card. The modal presents a searchable, filterable grid of pre-built step templates.

### Category Filter Pills
Condensed pill-shaped buttons for filtering by category (All, Communication, Documentation, Investigation, Intervention, Administrative, Follow-up). Active pill uses `var(--brand-blue-dark)` background. **No count badges** are shown on the pills.

### Step Template Cards
Each card displays:
- **Step name** (medium weight, `var(--text-sm)`)
- **Description** (muted color, `var(--text-xs)`)
- **"+ Add to Workflow" button** — switches to "Added to Workflow" (filled) once added

Cards use a `1px solid var(--border)` border with `var(--card)` background. No icon boxes, category badges, duration badges, or role badges are shown on the cards.

## Step Editor Fields

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| name | text input | Y | max 100 chars | `Parent Notification` |
| description | textarea | Y | max 500 chars | `Contact parents...` |
| assignedRole | select | Y | Driver/Safety Coordinator/Supervisor/Administrator/School Admin | `Safety Coordinator` |
| estimatedDuration | text input | Y | `{n} {unit}` format | `24 hours` |
| required | checkbox | N | boolean | `true` |
| requiresApproval | checkbox | N | boolean | `false` |
| triggerType | select | Y | manual/auto-complete/time-delay/status-change/approval-granted/conditional | `manual` |

## Buttons

| Button | Type | On Click |
|--------|------|----------|
| backToWorkflows | Ghost | Navigate to Workflows |
| saveWorkflow | Primary | Save template; toast |
| addStep | Outline | Adds empty step |
| addFromLibrary | Outline | Opens step library |
| deleteStep | Ghost icon | Removes step |
| moveStepUp | Ghost icon | Reorders up |
| moveStepDown | Ghost icon | Reorders down |
| configureStep | Ghost icon | Opens StepConfigDialog |