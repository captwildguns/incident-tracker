# Screen: Incident Detail Page

| Property | Value |
|----------|-------|
| **Screen Name** | Incident Detail |
| **Screen Slug / Path** | `incident-detail` |
| **Purpose** | Full-page view of a single incident with tabbed sections for overview, workflow, history, photos, documents, and communications |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Status** | Edited |
| **Rationale** | Changed from dialog to full page with 6 tabs; added workflow management, documents, photos, inline messaging |

![Wireframe - Incident Detail 1440x900](INSERT_IMAGE_HERE)

## Tabs

| Tab Name | Purpose | Default? |
|----------|---------|----------|
| Overview | Core incident info | Yes |
| Workflow | Step-by-step progress | No |
| History | Audit trail | No |
| Photos | Photo evidence | No |
| Documents | Attached documents | No |
| Communications | Message thread | No |

## Header Fields

| Field Name | Type | Validation | Example |
|------------|------|------------|---------|
| incidentId | read-only string | `^INC-\d{4}-\d{4}$` | `INC-2025-0044` |
| status | read-only badge | Open/In Progress/Closed | `Open` |
| severity | read-only badge | Low/Medium/High | `High` |
| type | read-only string | INCIDENT_TYPES | `Physical Altercation` |
| date | read-only date | YYYY-MM-DD | `2025-03-16` |
| student | read-only string | max 100 chars | `Christopher Adams` |
| driver | read-only string | max 100 chars | `David Park` |
| bus | read-only string | Vehicle format | `Vehicle 15` |
| route | read-only string | max 100 chars | `Jefferson Middle AM - Blue` |

## Workflow Tab Fields

| Field Name | Type | Validation | Example |
|------------|------|------------|---------|
| workflowName | read-only string | max 100 chars | `Physical Altercation Response` |
| progressPercentage | read-only % | 0-100 | `33` |
| stepStatus | read-only enum | Not Started/In Progress/Completed/Pending Approval/Approved/Rejected | `In Progress` |

## Buttons

| Button | Type | On Click |
|--------|------|----------|
| backToIncidents | Ghost | Navigate to incidents |
| editIncident | Secondary | Opens EditIncidentDialog |
| prevIncident | Ghost | Previous incident in list |
| nextIncident | Ghost | Next incident in list |
| completeStep | Primary | Marks step Completed |
| approveStep | Primary | Opens approval dialog |
| sendMessage | Primary | Sends message in thread |

## Modals

### Approval Dialog
- **Trigger:** Approve button on Pending Approval step
- **Field:** `approvalComment` (textarea, optional, max 500 chars)
- **Buttons:** Approve (Primary), Reject (Destructive), Cancel (Ghost)
