# Screen: Workflows

| Property | Value |
|----------|-------|
| **Screen Name** | Workflows |
| **Screen Slug / Path** | `workflows` |
| **Purpose** | Central hub for managing workflow templates and step template library |
| **Primary User Roles** | Supervisor, Administrator |
| **Status** | Added |
| **Rationale** | New screen not in original guide |

![Wireframe - Workflows 1440x900](INSERT_IMAGE_HERE)

## Tabs

| Tab | Purpose | Default? |
|-----|---------|----------|
| Workflows | Template management | Yes |
| Step Templates | Reusable step library | No |

## Workflow Card Fields

| Field Name | Type | Validation | Example |
|------------|------|------------|---------|
| id | string | `^WF-\d{3}$` or WF-DEFAULT | `WF-001` |
| name | string | max 100 chars | `Physical Altercation Response` |
| incidentTypes | string array | INCIDENT_TYPES | `["Physical Altercation"]` |
| severity | string | Low/Medium/High | `"High"` |
| isActive | boolean | true/false | `true` |
| stepsCount | integer | > 0 | `6` |
| createdBy | string | max 100 chars | `Sarah Williams` |

**Notes:**
- Severity is a **single value** (not an array), displayed as one badge in the table row.
- The severity dropdown in the Create Workflow dialog auto-populates from the selected incident type's default severity.
- The **Usage column** has been removed from both the table and KPI stats cards.

## Buttons

| Button | Type | On Click | Confirmation? |
|--------|------|----------|---------------|
| createWorkflow | Primary | Opens new workflow dialog | N |
| editWorkflow | Secondary | Navigate to Workflow Builder | N |
| duplicateWorkflow | Secondary | Creates copy; toast | N |
| deleteWorkflow | Destructive | Removes workflow | Y |
| toggleActive | Toggle | Toggles isActive | N |