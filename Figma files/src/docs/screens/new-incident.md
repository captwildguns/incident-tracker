# Screen: New Incident Form

| Property | Value |
|----------|-------|
| **Screen Name** | New Incident |
| **Screen Slug / Path** | `new-incident` |
| **Purpose** | Single-page form for creating student or driver incidents |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Status** | Edited |
| **Rationale** | Redesigned from 5-step wizard to single-page form with dual category, 35+ types, autocomplete, uploads, map |

![Wireframe - New Incident 1440x900](INSERT_IMAGE_HERE)

## Change Detail

**Original:** 5-step wizard with auto-save, drafts, tags, internal notes, follow-up, injury info, character counter.

**Updated:** Single-page form with category selector. All removed features listed in CHANGELOG.md.

## Fields

| Field Name | Label | Type | Required | Default | Validation | Source | Example |
|------------|-------|------|----------|---------|------------|--------|---------|
| incidentCategory | Incident Category | button group | Y | null | student/driver | static | `student` |
| student | Student | autocomplete | Y (student) | "" | Must select from list | API mock | `Sarah Mitchell` |
| studentId | Student ID | read-only | Y | auto | `^STU-\d{4}$` | computed | `STU-2891` |
| driver | Driver | autocomplete | Y | "" | Must select from list | API mock | `Michael Chen` |
| incidentType | Incident Type | select (grouped) | Y | "" | INCIDENT_TYPES filtered by category | registry | `seat-refusal` |
| severity | Severity | select | Y | auto from type | low/medium/high | static + auto | `medium` |
| description | Description | textarea | Y | "" | min 1, max 2000 chars | user-entered | `Student refused to remain seated` |
| location | Location | select (grouped) | Y | "" | Context-dependent list | static | `on-bus` |
| address | Address | autocomplete | N | "" | Verified address list | Google Places mock | `1234 Main Street, Meridian, ID 83642` |
| bus | Vehicle | select | Y | "" | Fleet list | API mock | `bus-12` |
| route | Route | select | Y | "" | Route list | API mock | `lincoln-elem-am-green` |
| witnessPresent | Witness Present | checkbox | N | false | boolean | user-entered | `true` |
| witnessName | Witness Name | text input | N | "" | max 100 chars | user-entered | `Jane Smith` |
| parentNotified | Parent Notified | checkbox | N | false | boolean | user-entered | `false` |
| actionTaken | Action Taken | textarea | N | "" | max 2000 chars | user-entered | `Student asked to sit down` |
| uploadedPhotos | Photos | file multi | N | [] | image/* (JPG, PNG) | user files | `photo.jpg (245 KB)` |
| uploadedDocuments | Documents | file multi | N | [] | .pdf,.doc,.docx,.txt | user files | `Statement.pdf (1.2 MB)` |

## Buttons

| Button | Type | On Click |
|--------|------|----------|
| submitIncident | Primary | Submit; success alert; redirect 3s |
| cancel | Ghost | Navigate back |
| uploadPhoto | Outline | Opens file picker |
| uploadDocument | Outline | Opens file picker |
