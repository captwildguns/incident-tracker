# Screen: Dashboard

| Property | Value |
|----------|-------|
| **Screen Name** | Dashboard |
| **Screen Slug / Path** | `dashboard` |
| **Purpose** | Personalized command center showing assigned incidents, triage queue, unanswered driver messages, and analytics charts |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Status** | Edited |
| **Rationale** | Complete redesign from informational metrics to role-based triage |

![Wireframe - Dashboard 1440x900](INSERT_IMAGE_HERE)

## Change Detail

**Original:** 4 metric cards; line chart trends; pie chart (5 types); bar chart by school; recent incidents timeline.

**Updated:** My Incidents section; Needs Attention queue; Unanswered Driver Communications; pie chart (6 categories); bar chart by driver; bar chart by day of week; action dropdowns; reassign dialog.

## Sections

### My Incidents
Incidents assigned to current user, sorted by priority then age. Shows top 3.

### Needs Attention Queue
3 oldest items requiring attention across all staff.

### Unanswered Driver Communications
Driver messages awaiting coordinator response.

### Analytics Charts
- Incidents by Type (PieChart) - 6 categories
- Incidents by Driver (BarChart) - top 6
- Incidents by Day of Week (BarChart) - Mon-Fri

## Fields

| Field Name | Label | Type | Required | Default | Validation Rules / Constraints | Source | Representative Example |
|------------|-------|------|----------|---------|-------------------------------|--------|----------------------|
| myIncidentsBadge | My Incidents Count | read-only integer | Y | computed | >= 0 | computed | `12` |
| id | Incident ID | read-only string | Y | -- | `^INC-\d{4}-\d{4}$`, max 13 | server | `INC-2025-0044` |
| student | Student Name | read-only string | Y | -- | max 100 chars | server | `Christopher Adams` |
| type | Incident Type | read-only string | Y | -- | Must match INCIDENT_TYPES | server | `Physical Altercation` |
| bus | Vehicle | read-only string | Y | -- | `Bus ##` or `Vehicle ##` | server | `Bus 15` |
| priority | Priority Level | read-only enum | Y | -- | critical / high / medium | computed | `critical` |
| time | Time Since Report | read-only string | Y | -- | Relative time | computed | `5 mins ago` |
| actionNeeded | Recommended Action | read-only string | Y | -- | max 200 chars | computed | `Contact parents immediately` |
| assignedTo | Assigned To | read-only string | Y | -- | max 100 chars | server | `Sarah Williams` |

## Buttons & Actions

| Button Name | Label | Type | On Click | Confirmation? |
|------------|-------|------|----------|---------------|
| viewAllMyIncidents | View All My Incidents | Outline | Navigate to Incidents filtered by assignedTo + Open | N |
| viewDetails | View Details | Secondary | Navigate to Incident Detail | N |
| editIncident | Edit Incident | Secondary | Opens EditIncidentDialog | N |
| reassign | Reassign | Secondary | Opens Reassign dialog | N |
| markResolved | Mark as Resolved | Secondary | Updates status; toast | N |
| respondNow | Respond Now | Primary | Navigate to Communications | N |

## Modals

### Reassign Dialog
- **Trigger:** Reassign dropdown action
- **Field:** `selectedAssignee` (select, required, source: availableAssignees)
- **Buttons:** Confirm (Primary), Cancel (Ghost)
- **ESC:** Closes dialog

## Sample JSON Entry

```json
{
  "screenId": "dashboard",
  "fields": {
    "myIncidentsBadge": {"type": "integer", "source": "computed", "representativeExample": 12},
    "id": {"type": "string", "validation": "^INC-\\d{4}-\\d{4}$", "representativeExample": "INC-2025-0044"},
    "priority": {"type": "enum", "values": ["critical","high","medium"], "representativeExample": "critical"}
  }
}
```
