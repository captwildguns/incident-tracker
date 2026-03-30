# Screen: Student Management

| Property | Value |
|----------|-------|
| **Screen Name** | Students |
| **Screen Slug / Path** | `students` |
| **Purpose** | Searchable student roster with incident history and detail dialog |
| **Primary User Roles** | Safety Coordinator, Supervisor |
| **Status** | Edited |
| **Rationale** | School filter replaced grade filter; detail is dialog; removed contact/DOB/emergency fields |

![Wireframe - Students 1440x900](INSERT_IMAGE_HERE)

## Filters

| Field Name | Label | Type | Validation | Source | Example |
|------------|-------|------|------------|--------|---------|
| searchQuery | Search | text input | max 200 chars | user-entered | `Mitchell` |
| schoolFilter | School | multi-select autocomplete | Must match schools | static from data | `Lincoln Middle School` |

## Table Columns

| Column | Type | Sortable |
|--------|------|----------|
| Student ID | string link | Yes |
| Name | string + avatar | Yes |
| Grade | string | Yes |
| School | string | Yes |
| Bus | string | Yes |
| Route | string | Yes |
| Incidents | integer | Yes |
| Last Incident | date | Yes |

NOTE: Sample rows removed. See field definitions.

## Detail Dialog Fields

| Field Name | Type | Validation | Example |
|------------|------|------------|---------|
| id | read-only string | `^STU-\d{4}$` | `STU-2891` |
| name | read-only string | max 100 chars | `Sarah Mitchell` |
| grade | read-only string | Grade format | `8th Grade` |
| school | read-only string | max 100 chars | `Lincoln Middle School` |
| bus | read-only string | Vehicle format | `Bus 12` |
| route | read-only string | max 100 chars | `Meyers Middle AM - Yellow` |
| incidentCount | read-only integer | >= 0 | `1` |
