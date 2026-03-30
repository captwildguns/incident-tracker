# Screen: Incidents List

| Property | Value |
|----------|-------|
| **Screen Name** | Incidents |
| **Screen Slug / Path** | `incidents` |
| **Purpose** | Searchable, filterable, sortable list of all incidents with summary statistics and workflow/communication indicators |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Status** | Edited |
| **Rationale** | 35+ types; added Assigned To filter; full page detail; communication/workflow indicators; status values changed |

![Wireframe - Incidents 1440x900](INSERT_IMAGE_HERE)

## Change Detail

**Original:** Status: Open/Under Review/Resolved/Closed. 5 types. Row click opens dialog.

**Updated:** Status: Open/In Progress/Closed. 35+ types via autocomplete. Row click navigates to full detail page with workflow auto-assignment.

## Summary Statistics

| Metric | Calculation |
|--------|-------------|
| Total Incidents | `incidents.length` |
| Open | `filter(status === 'Open').length` |
| In Progress | `filter(status === 'In Progress').length` |
| High Severity | `filter(severity === 'High').length` |

## Filter Fields

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| searchQuery | Search | text input | N | "" | max 200 chars | user-entered | `INC-2025` |
| statusFilter | Status | select | N | all | all/Open/In Progress/Closed | static list | `Open` |
| severityFilter | Severity | select | N | all | all/Low/Medium/High | static list | `High` |
| typeFilter | Type | autocomplete | N | "" | Must match INCIDENT_TYPES | INCIDENT_TYPES | `Physical Altercation` |
| assignedToFilter | Assigned To | autocomplete | N | "" | Must match staff name | Staff list | `Sarah Williams` |

## Table Columns

| Column | Type | Sortable |
|--------|------|----------|
| Incident ID | string link | Yes |
| Date | date YYYY-MM-DD | Yes |
| Student | string + avatar | Yes |
| Driver | string | Yes |
| Vehicle | string | Yes |
| Route | string | Yes |
| Type | string + badge | Yes |
| Severity | enum + badge | Yes |
| Status | enum + badge | Yes |
| Communication | icon indicator | No |
| Workflow | icon indicator | No |

NOTE: Sample rows removed. See field definitions.

## Buttons & Actions

| Button Name | Label | Type | On Click |
|------------|-------|------|----------|
| newIncident | + New Incident | Primary | Navigate to new-incident |
| exportCSV | Export CSV | Outline | Download CSV |
| clearFilters | Clear | Ghost | Reset all filters |

## Sample JSON Entry

```json
{
  "screenId": "incidents",
  "fields": {
    "searchQuery": {"type": "text", "validation": "max 200 chars", "representativeExample": "INC-2025"},
    "statusFilter": {"type": "select", "values": ["all","Open","In Progress","Closed"], "representativeExample": "Open"}
  }
}
```
