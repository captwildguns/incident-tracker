# Screen: Driver Management

| Property | Value |
|----------|-------|
| **Screen Name** | Drivers |
| **Screen Slug / Path** | `drivers` |
| **Purpose** | Searchable driver roster with certifications, performance, and detail dialog |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Status** | Edited |
| **Rationale** | Safety rating text label; added performance score, on-time %, endorsements, garage, expiry dates |

![Wireframe - Drivers 1440x900](INSERT_IMAGE_HERE)

## Filters

| Field Name | Label | Type | Validation | Example |
|------------|-------|------|------------|---------|
| searchQuery | Search | text input | max 200 chars | `Chen` |
| statusFilter | Status | select | all/Active/On Leave/Inactive | `Active` |

## Table Columns

| Column | Type | Sortable |
|--------|------|----------|
| Driver ID | string | Yes |
| Name + Employee ID | string + avatar | Yes |
| Contact | string (phone) | Yes |
| Assigned Vehicle | string | Yes |
| Primary Route | string | Yes |
| Status | enum + badge | Yes |
| Safety Rating | string + badge | Yes |

## Detail Dialog Key Fields

| Field Name | Type | Example |
|------------|------|---------|
| fullName | string | `Sarah Mitchell` |
| employeeId | string | `EMP-2019-045` |
| safetyRating | string (Good/Excellent/Needs Improvement) | `Good` |
| performanceScore | integer 0-100 | `87` |
| onTimePercentage | integer 0-100 | `94` |
| endorsements | string array | `["P - Passenger", "S - School Bus"]` |
| medicalExamExpiry | date | `2025-12-20` |
| backgroundCheckExpiry | date | `2025-09-01` |
| defaultGarage | string | `East Service Center` |
