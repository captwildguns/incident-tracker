# Screen: Driver Communications

| Property | Value |
|----------|-------|
| **Screen Name** | Communications |
| **Screen Slug / Path** | `communications` |
| **Purpose** | Incident-linked messaging hub between coordinators and drivers |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Status** | Edited |
| **Rationale** | Redesigned from generic table to incident-centric two-panel messaging |

![Wireframe - Communications 1440x900](INSERT_IMAGE_HERE)

## Change Detail

**Original:** Table with Type/Subject/Priority/Driver Filter/Date Range/Templates/Print.

**Updated:** Two-panel layout (list + thread). In-app messages only. No subject, priority, templates, print.

## Left Panel Filters

| Field Name | Type | Validation | Example |
|------------|------|------------|---------|
| searchQuery | text | Searches incidentId, student, driver, content | `Mitchell` |
| statusFilter | select | all/pending/in-progress/resolved | `pending` |

## Conversation List Fields

| Field Name | Type | Example |
|------------|------|---------|
| incidentId | string | `INC-2025-0042` |
| student | string | `Sarah Mitchell` |
| driver | string | `Michael Chen` |
| severity | enum | `Medium` |
| status | enum | `pending` |
| unreadMessages | integer | `2` |

## Message Thread Fields

| Field Name | Type | Example |
|------------|------|---------|
| sender | string | `Michael Chen` |
| senderRole | enum (coordinator/driver) | `driver` |
| content | text (max 2000) | `She was trying to talk to friends...` |
| timestamp | datetime | `Mar 15, 2025, 2:30 PM` |
| status | enum (sent/delivered/read) | `read` |

## Compose Field

| Field Name | Type | Validation | Example |
|------------|------|------------|---------|
| newMessage | textarea | max 2000; non-empty to send | `Please provide more details.` |

## Buttons

| Button | Type | On Click |
|--------|------|----------|
| sendMessage | Primary | Appends message to thread |
| markResolved | Secondary | Sets thread to resolved |
