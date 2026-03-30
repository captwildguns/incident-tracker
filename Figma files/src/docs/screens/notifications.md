# Screen: Notifications Dropdown

| Property | Value |
|----------|-------|
| **Screen Name** | Notifications Dropdown |
| **Screen Slug / Path** | N/A (header component) |
| **Purpose** | Bell icon popover showing recent system notifications |
| **Primary User Roles** | All |
| **Status** | Added |
| **Rationale** | NotificationsDropdown.tsx exists but was undocumented |

![Wireframe - Notifications 320x480](INSERT_IMAGE_HERE)

## Fields

| Field Name | Type | Validation | Example |
|------------|------|------------|---------|
| id | string | `^notif-\d+$` | `notif-1` |
| type | enum | incident/communication/driver-response/system | `driver-response` |
| title | string | max 100 chars | `Driver Response Received` |
| description | string | max 200 chars | `Michael Chen replied to INC-2025-0042` |
| timestamp | string | Relative time | `10 mins ago` |
| isRead | boolean | true/false | `false` |
| severity | enum (nullable) | Low/Medium/High | `Medium` |
| actionable | boolean | true/false | `true` |
| incidentId | string (nullable) | `^INC-\d{4}-\d{4}$` | `INC-2025-0042` |

## Buttons

| Button | Type | On Click |
|--------|------|----------|
| markAllRead | Ghost | Sets all to read |
| (notification click) | -- | Navigate to linked incident |
