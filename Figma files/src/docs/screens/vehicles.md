# Screen: Fleet Management (Vehicles)

| Property | Value |
|----------|-------|
| **Screen Name** | Vehicles |
| **Screen Slug / Path** | `vehicles` |
| **Purpose** | Fleet overview with bus photos, maintenance, GPS/AVL, and detail dialog |
| **Primary User Roles** | Safety Coordinator, Supervisor, Fleet Manager |
| **Status** | Unchanged |
| **Rationale** | Minor field-level metadata additions only |

![Wireframe - Vehicles 1440x900](INSERT_IMAGE_HERE)

## Filters

| Field Name | Label | Type | Validation | Example |
|------------|-------|------|------------|---------|
| searchQuery | Search | text | max 200 chars | `VEH-015` |
| statusFilter | Status | select | all/Active/Maintenance/Inactive | `Active` |
| maintenanceFilter | Maintenance | select | all/Excellent/Good/Needs Attention/In Repair | `Good` |

## Table Columns

| Column | Type | Sortable |
|--------|------|----------|
| Vehicle ID | string link | Yes |
| Details | string + bus photo | Yes |
| Driver | string | Yes |
| Primary Route | string | Yes |
| Status | enum + badge | Yes |
| Maintenance | string + icon | Yes |
| Incidents | integer + trend | Yes |
| Mileage | formatted integer | Yes |

## Detail Dialog Key Fields

| Field Name | Type | Example |
|------------|------|---------|
| id | string | `VEH-015` |
| vin | string (17 chars) | `1BABNBYA3NF123456` |
| capacity | integer | `72` |
| fuelType | string | `Diesel` |
| gpsHardwareId | string | `GPS-2025-0015` |
| avlEnabled | boolean | `true` |
| defaultGarage | string | `East Service Center` |
| midDayGarage | string | `Downtown Lot` |
| lastInspection | date | `2025-01-15` |
| nextInspection | date | `2025-07-15` |
