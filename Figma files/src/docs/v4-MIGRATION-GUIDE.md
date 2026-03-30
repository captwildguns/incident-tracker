# v4 Migration Guide: Version 194 to Version 250

**Document Version:** v4  
**Last Updated:** January 29, 2025  
**Target Audience:** Developers migrating from version 194 to version 250

---

## Overview

This guide provides comprehensive documentation for migrating the Incident Tracker application from version 194 to version 250. This document covers all major changes, new features, and implementation details needed to bring version 194 up to current standards.

---

## Table of Contents

1. [Incident Creation Forms](#1-incident-creation-forms)
2. [Workflow System](#2-workflow-system)
3. [Incidents Page & Table](#3-incidents-page--table)
4. [Search Functionality](#4-search-functionality)
5. [Location Mapping System](#5-location-mapping-system)
6. [Design System Updates](#6-design-system-updates)
7. [Breaking Changes](#7-breaking-changes)
8. [Migration Checklist](#8-migration-checklist)

---

## 1. Incident Creation Forms

### 1.1 Overview

Version 250 introduces completely redesigned incident creation forms with support for both **Student Incidents** and **Driver Incidents**. The forms feature improved UX, validation, and integration with the workflow system.

### 1.2 Key Components

**Primary Component:**
- `/components/incidents/NewIncidentForm.tsx` - Main form component

**Supporting Components:**
- `/components/incidents/IncidentLocationMap.tsx` - Interactive location selector
- `/components/incidents/IncidentTypes.ts` - Centralized incident type definitions
- `/components/incidents/INCIDENT_TYPES_REFERENCE.md` - Type documentation

### 1.3 Form Types

#### Student Incident Form

**Features:**
- Student search with profile photos and details
- Categorized incident type selector (dropdowns grouped by category)
- Severity assignment (Low, Medium, High)
- Location mapping with crosshair-based selection
- File attachment support (photos, documents)
- Related student tagging
- Workflow auto-assignment based on incident type and severity

**Form Fields:**
```typescript
{
  incidentType: string;           // Selected from categorized dropdown
  severity: 'Low' | 'Medium' | 'High';
  student: {
    id: string;
    name: string;
    grade: string;
    school: string;
    photoUrl: string;
    bus: string;
    route: string;
  };
  description: string;            // Detailed incident description
  location: {                     // GPS coordinates
    lat: number;
    lng: number;
  } | null;
  relatedStudents: string[];      // Array of student IDs
  attachments: File[];            // Photos/documents
  date: string;
  time: string;
  bus: string;
  route: string;
  driver: string;
}
```

#### Driver Incident Form

**Features:**
- Driver search with employee information
- Same categorized incident type selector
- Vehicle and route information capture
- Location mapping
- File attachments
- Automatic workflow assignment

**Form Fields:**
```typescript
{
  incidentType: string;
  severity: 'Low' | 'Medium' | 'High';
  driver: {
    id: string;
    name: string;
    employeeId: string;
    photoUrl: string;
    routes: string[];
  };
  description: string;
  location: {
    lat: number;
    lng: number;
  } | null;
  attachments: File[];
  date: string;
  time: string;
  vehicle: string;
  route: string;
}
```

### 1.4 Incident Type Selector

**Design Pattern:**  
Categorized dropdown with visual hierarchy

**Categories Include:**
- 🚌 Boarding & Seating
- 🗣️ Behavioral Issues
- 🤜 Physical Safety
- 📱 Device & Personal Items
- 🚪 Vehicle Safety
- 🚗 Driver Performance
- 🔧 Vehicle Maintenance

**Implementation Details:**

```typescript
// From IncidentTypes.ts
export interface IncidentType {
  value: string;          // Unique identifier
  label: string;          // Display name
  category: string;       // Category for grouping
  description: string;    // Helper text
  icon: string;          // Emoji icon
  defaultSeverity: 'Low' | 'Medium' | 'High';
  requiresPhotos: boolean;
  requiresWitnesses: boolean;
}
```

**Category Label Styling:**
- Background: `var(--muted)` (light grey)
- Text: `var(--muted-foreground)` (dark grey)
- Font: Roboto, medium weight
- Not selectable (disabled state)
- Clear visual separation from selectable items

**Selectable Item Styling:**
- Background: white/transparent
- Text: `var(--foreground)` (black)
- Hover: `var(--accent)` background
- Includes icon and description

### 1.5 Location Mapping Component

**New Interactive System:**

The location mapping system uses an embedded Google Maps iframe with a crosshair-based selection interface.

**User Flow:**
1. Click "Select Location on Map" button
2. Map enters selection mode with blue crosshair overlay
3. User navigates the map using standard Google Maps controls
4. User positions crosshair over desired location
5. User clicks "Confirm Location" to save coordinates
6. Location is saved as lat/lng coordinates

**Component Features:**
- Crosshair targeting system (blue `<Target>` icon)
- Standard Google Maps controls (zoom, street view, satellite)
- "Use Current Location" button (geolocation API)
- "Open in Google Maps" button for directions
- Coordinate display with 6 decimal precision
- Clear pin functionality
- Visual feedback (map border turns blue during selection)
- Instruction overlay

**Design System Compliance:**
```css
/* Map Border */
border: 2px solid var(--forge-color-border-default);
/* During Selection */
border: 2px solid var(--brand-blue-dark);

/* Crosshair Color */
color: var(--brand-blue-dark);

/* Location Display Badge */
background: rgba(91, 139, 184, 0.1);
border: 1px solid var(--brand-blue-light);
```

### 1.6 File Attachments

**Supported File Types:**
- Images: `.jpg`, `.jpeg`, `.png`, `.gif`
- Documents: `.pdf`, `.doc`, `.docx`
- Text: `.txt`

**Features:**
- Drag-and-drop upload
- File preview with thumbnails
- Remove individual files
- File type icons
- Size validation
- Multiple file support

**UI Components:**
- Upload zone with dashed border
- File list with preview cards
- Remove buttons per file
- Visual file type indicators

---

## 2. Workflow System

### 2.1 Overview

Version 250 introduces an automated workflow assignment system that triggers multi-step approval processes based on incident type and severity.

### 2.2 Core Components

**Data Layer:**
- `/data/workflows.ts` - Workflow definitions and logic

**UI Components:**
- `/components/incidents/IncidentWorkflowProgress.tsx` - Progress visualization
- `/components/workflows/WorkflowBuilderPage.tsx` - Workflow template editor
- `/components/workflows/WorkflowsPage.tsx` - Workflow management
- `/components/workflows/StepConfigDialog.tsx` - Step configuration

### 2.3 Workflow Structure

```typescript
export interface Workflow {
  id: string;                    // Unique workflow ID
  name: string;                  // Display name
  description: string;           // Purpose description
  incidentTypes: string[];       // Matching incident types
  severityLevels: string[];      // Matching severity levels
  steps: WorkflowStep[];         // Ordered workflow steps
  isActive: boolean;             // Template enabled/disabled
  active?: boolean;              // Instance in progress
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  assignedRole: string;          // e.g., "Driver", "Principal"
  estimatedDuration: string;     // e.g., "30 minutes"
  required: boolean;
  order: number;
  status?: 'Not Started' | 'In Progress' | 'Completed' | 
           'Pending Approval' | 'Approved' | 'Rejected';
  completedDate?: string;
  completedBy?: string;
  comments?: string;
  requiresApproval?: boolean;
  approvers?: string[];
  emailNotifications?: {
    notifyOnStart: boolean;
    notifyOnComplete: boolean;
    notifyAssignee: boolean;
    notifyApprovers: boolean;
    notifyRoles?: string[];
    additionalRecipients: string[];
    emailTemplate?: string;
  };
  trigger?: {
    type: 'manual' | 'auto-complete' | 'time-delay' | 
          'status-change' | 'approval-granted' | 'conditional';
    delayAmount?: number;
    delayUnit?: 'minutes' | 'hours' | 'days';
    requiredStatus?: string;
    conditions?: Array<{
      field: string;
      operator: string;
      value: string;
    }>;
  };
}
```

### 2.4 Pre-configured Workflows

**Version 250 includes 7 built-in workflows:**

1. **Physical Altercation Response** (`WF-001`)
   - Incident Types: Physical Altercation
   - Severity: High
   - Steps: 5 (Driver Response → Safety Coordinator → Parent Notification → Disciplinary Review → Documentation)

2. **Bullying Investigation** (`WF-002`)
   - Incident Types: Taunting/Bullying
   - Severity: High, Medium
   - Steps: 6 (Documentation → Victim Support → Witness Interviews → Parent Notification → Intervention Plan → 30-Day Follow-up)

3. **Seat Refusal - Standard** (`WF-003`)
   - Incident Types: Seat Refusal
   - Severity: Low, Medium
   - Steps: 3 (Verbal Warning → Parent Notification → Escalation Review)

4. **Offensive Language Protocol** (`WF-004`)
   - Incident Types: Offensive Language
   - Severity: Medium, High
   - Steps: 4 (Documentation → Principal Review → Parent Conference → Disciplinary Action)

5. **Disruptive Behavior - Minor** (`WF-005`)
   - Incident Types: Disruptive Volume
   - Severity: Low, Medium
   - Steps: 3 (Warning → Automated Notification → Close Incident)

6. **Property Damage Investigation** (`WF-006`)
   - Incident Types: Vandalism, Window Misuse
   - Severity: Medium, High
   - Steps: 5 (Damage Assessment → Fleet Manager Review → Parent Notification → Disciplinary Action → Repair Scheduling)

7. **Food & Beverage Violation** (`WF-007`)
   - Incident Types: Eating/Drinking Violation
   - Severity: Low, Medium
   - Steps: 3 (Warning & Cleanup → Parent Notification → Review & Close)

### 2.5 Automatic Assignment Logic

```typescript
// From workflows.ts
export function assignWorkflowToIncident(
  incidentType: string, 
  severity: string
): Workflow | null {
  // Find matching workflow
  const matchingWorkflow = workflows.find(
    (workflow) =>
      workflow.isActive &&
      workflow.incidentTypes.includes(incidentType) &&
      workflow.severityLevels.includes(severity)
  );

  if (matchingWorkflow) {
    // Clone workflow and reset step statuses for new incident
    const newWorkflow: Workflow = {
      ...matchingWorkflow,
      active: true, // Set instance as active
      steps: matchingWorkflow.steps.map((step) => ({
        ...step,
        status: 'Not Started',
        completedDate: undefined,
        completedBy: undefined,
        comments: undefined,
      })),
    };
    
    return newWorkflow;
  }

  return null;
}
```

**Assignment Triggers:**
- Automatically assigns workflow when incident is created
- Matches on both `incidentType` AND `severity`
- Only assigns if workflow `isActive: true`
- Creates new instance with reset statuses

### 2.6 Workflow Progress Visualization

**Component:** `IncidentWorkflowProgress.tsx`

**Features:**
- Progress bar showing completion percentage
- Step-by-step timeline view
- Status badges per step (Not Started, In Progress, Completed, etc.)
- Assigned role display
- Estimated duration
- Completion timestamps
- Comments and notes
- Approval status

**Visual Design:**
- Vertical timeline with connecting lines
- Color-coded status badges
- Icons for each status type
- Expandable step details
- Progress percentage at top

---

## 3. Incidents Page & Table

### 3.1 Overview

The Incidents page (`/components/incidents/IncidentsPage.tsx`) has been enhanced with advanced filtering, sorting, and workflow integration.

### 3.2 Key Features

**Table Columns:**
1. Incident ID (e.g., `INC-2025-0062`)
2. Date
3. Student/Driver Name
4. Type (categorized)
5. Description (truncated)
6. Bus Number
7. Route
8. Driver Name
9. Severity Badge (color-coded)
10. Status Badge
11. Workflow Indicator
12. Actions (View, Edit, Message)

**Enhanced Features:**
- **Search:** Global search across all fields
- **Filtering:** By status, severity, type, date range
- **Sorting:** Multi-column sort with direction indicators
- **Pagination:** Configurable page size
- **Export:** Download as CSV/PDF
- **Bulk Actions:** Select multiple incidents
- **Quick Actions:** View details, Edit, Send message
- **Workflow Badge:** Shows active workflow with progress

### 3.3 Incident Table Structure

```typescript
const mockIncidents = [
  {
    id: string;              // e.g., 'INC-2025-0062'
    date: string;            // YYYY-MM-DD format
    student: string;         // Student name
    studentId: string;       // e.g., 'STU-1894'
    type: string;            // Incident type
    description: string;     // Full description
    bus: string;             // e.g., 'Bus 12'
    route: string;           // Route name
    driver: string;          // Driver name
    severity: 'Low' | 'Medium' | 'High';
    status: 'Open' | 'In Progress' | 'Closed';
    createdBy: string;
    assignedTo: string;
    workflow?: Workflow;     // Assigned workflow instance
  }
];
```

### 3.4 Status Badges

**Status Types:**
- **Open** - New incident, not yet addressed
- **In Progress** - Currently being worked on
- **Closed** - Resolved and closed

**Visual Design:**
```typescript
// Color coding
Open: {
  background: 'var(--status-open-bg)',
  text: 'var(--status-open-text)',
  border: 'var(--status-open-border)'
}

In Progress: {
  background: 'var(--status-progress-bg)',
  text: 'var(--status-progress-text)',
  border: 'var(--status-progress-border)'
}

Closed: {
  background: 'var(--status-closed-bg)',
  text: 'var(--status-closed-text)',
  border: 'var(--status-closed-border)'
}
```

### 3.5 Severity Badges

**Severity Levels:**
- **Low** - Minor issues, minimal impact
- **Medium** - Moderate issues, requires attention
- **High** - Serious issues, immediate action required

**Visual Design:**
```typescript
// Color coding
Low: {
  background: 'rgba(123, 132, 88, 0.1)',  // Olive tint
  text: 'var(--brand-olive-dark)',
  border: '1px solid var(--brand-olive-light)'
}

Medium: {
  background: 'rgba(255, 193, 7, 0.1)',   // Amber tint
  text: '#FF6F00',
  border: '1px solid #FFD54F'
}

High: {
  background: 'rgba(211, 47, 47, 0.1)',   // Red tint
  text: '#D32F2F',
  border: '1px solid #EF5350'
}
```

### 3.6 Workflow Integration

**Workflow Indicator Badge:**
- Shows `<GitBranch>` icon when workflow is active
- Displays workflow progress percentage
- Click to expand workflow details
- Color: `var(--brand-blue-dark)`

**Example:**
```tsx
{incident.workflow && (
  <Badge variant="outline">
    <GitBranch className="h-3 w-3 mr-1" />
    Workflow ({getWorkflowProgress(incident.workflow.steps)}%)
  </Badge>
)}
```

### 3.7 Table Actions

**Per-Row Actions:**
1. **View** - Opens incident detail page
2. **Edit** - Opens edit dialog
3. **Message** - Opens communication dialog (if applicable)

**Bulk Actions:**
- Select multiple rows
- Assign to user
- Change status
- Export selected
- Delete selected

---

## 4. Search Functionality

### 4.1 Overview

Advanced search functionality has been implemented across Drivers and Vehicles pages using Command palette pattern.

### 4.2 Search Components

**UI Component:**
- `/components/ui/command.tsx` - Command palette (shadcn/ui)

**Implementation Pattern:**
```tsx
<Command>
  <CommandEmpty>No results found.</CommandEmpty>
  <CommandGroup>
    <CommandItem onSelect={handleSelect}>
      {/* Search result item */}
    </CommandItem>
  </CommandGroup>
  <CommandList>
    {/* Scrollable list of results */}
  </CommandList>
</Command>
```

### 4.3 Drivers Page Search

**File:** `/components/drivers/DriversPage.tsx`

**Searchable Fields:**
- First Name
- Last Name
- Employee ID
- Phone Number
- Email
- Assigned Vehicle
- Primary Route
- License Number
- Status

**Search Features:**
- Real-time filtering
- Fuzzy matching
- Multi-field search
- Result highlighting
- Sort by relevance

**UI Design:**
```tsx
<div className="relative">
  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
  <Input
    placeholder="Search drivers by name, ID, route, vehicle..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      fontFamily: 'Roboto, sans-serif',
      paddingLeft: 'var(--forge-spacing-large)',
    }}
  />
</div>
```

**Filter Options:**
- Status (Active, Inactive, On Leave)
- Safety Rating (Excellent, Good, Needs Improvement)
- Certification Status
- License Expiry

**Sort Options:**
- Name (A-Z, Z-A)
- Years of Service
- Incident Count
- Performance Score
- On-Time Percentage

### 4.4 Vehicles Page Search

**File:** `/components/vehicles/VehiclesPage.tsx`

**Searchable Fields:**
- Vehicle Name/Number
- VIN
- License Plate
- Make
- Model
- Driver Name
- Primary Route
- GPS Hardware ID
- Status

**Search Features:**
- Real-time filtering
- VIN lookup
- License plate search
- Route search
- Driver assignment search

**Filter Options:**
- Status (Active, Maintenance, Out of Service)
- Maintenance Status (Good, Needs Attention, Critical)
- Make/Model
- Capacity
- Fuel Type
- Year Range

**Sort Options:**
- Name/Number
- Incident Count
- Mileage
- Next Inspection Date
- Maintenance Status

### 4.5 Search Implementation Pattern

**Basic Search Logic:**
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [filteredData, setFilteredData] = useState(mockData);

useEffect(() => {
  const filtered = mockData.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.id.toLowerCase().includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower) ||
      // ... other fields
    );
  });
  setFilteredData(filtered);
}, [searchTerm]);
```

**Advanced Filter Logic:**
```typescript
const [filters, setFilters] = useState({
  status: 'all',
  severity: 'all',
  dateRange: 'all',
});

const applyFilters = (data) => {
  return data.filter((item) => {
    if (filters.status !== 'all' && item.status !== filters.status) {
      return false;
    }
    if (filters.severity !== 'all' && item.severity !== filters.severity) {
      return false;
    }
    // ... other filters
    return true;
  });
};
```

---

## 5. Location Mapping System

### 5.1 Component Details

**File:** `/components/incidents/IncidentLocationMap.tsx`

**Props Interface:**
```typescript
interface IncidentLocationMapProps {
  location: LocationCoordinates | null;
  onLocationChange: (location: LocationCoordinates | null) => void;
  showManualEntry?: boolean;  // Deprecated in v250
}

interface LocationCoordinates {
  lat: number;  // Latitude (-90 to 90)
  lng: number;  // Longitude (-180 to 180)
}
```

### 5.2 Implementation Details

**Selection Modes:**

1. **Normal Mode:**
   - Shows map preview if location is set
   - Shows placeholder if no location
   - Action buttons: "Use Current Location", "Select Location on Map"

2. **Selection Mode:**
   - Blue crosshair overlay at center
   - Map border turns blue
   - Standard Google Maps controls enabled
   - Instruction overlay at bottom
   - Action buttons: "Confirm Location", "Cancel"

**Crosshair System:**
```tsx
{isSelectingLocation && (
  <>
    {/* Center crosshair */}
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      pointerEvents: 'none',
    }}>
      <Target 
        size={48} 
        style={{ 
          color: 'var(--brand-blue-dark)',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        }} 
      />
    </div>
    
    {/* Instruction overlay */}
    <div style={{
      position: 'absolute',
      bottom: 'var(--forge-spacing-medium)',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      color: 'white',
      padding: 'var(--forge-spacing-small) var(--forge-spacing-medium)',
      borderRadius: 'var(--forge-radius-medium)',
      fontFamily: 'Roboto, sans-serif',
      fontSize: 'var(--text-sm)',
      zIndex: 20,
    }}>
      <Target className="inline h-4 w-4 mr-2" />
      Position the crosshair over the incident location
    </div>
  </>
)}
```

### 5.3 Geolocation API Integration

**Browser Geolocation:**
```typescript
const handleUseCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        onLocationChange(newLocation);
      },
      (error) => {
        // Handle error gracefully
        console.warn('Geolocation not available:', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }
};
```

**Permissions Handling:**
- Gracefully handles denied permissions
- Shows helpful error messages
- Provides fallback to map selection
- No console spam for policy errors

### 5.4 Google Maps Integration

**Embedded Maps:**
```tsx
<iframe
  width="100%"
  height="100%"
  style={{ border: 0 }}
  src={`https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
  title="Location Map"
  loading="lazy"
/>
```

**Map Controls:**
- Zoom controls (+/-)
- Street View
- Satellite view
- Pan and drag
- Fullscreen option

**External Links:**
```typescript
const openInMaps = () => {
  if (location) {
    window.open(
      `https://www.google.com/maps?q=${location.lat},${location.lng}`,
      '_blank'
    );
  }
};
```

### 5.5 Location Display

**Coordinate Format:**
- 6 decimal places precision
- Example: `42.756354, -73.825395`
- Displayed in badge and help text

**Visual Indicators:**
```tsx
<Badge 
  variant="outline"
  style={{
    backgroundColor: 'var(--brand-blue-dark)',
    color: 'white',
    border: 'none',
    fontFamily: 'Roboto, sans-serif',
  }}
>
  <Check className="h-3 w-3 mr-1" />
  Active
</Badge>
```

---

## 6. Design System Updates

### 6.1 CSS Variables

**File:** `/styles/globals.css`

**Brand Colors:**
```css
/* Deep Blues */
--brand-blue-dark: #4A6FA5;
--brand-blue-medium: #5B8BB8;
--brand-blue-light: #6B9BC5;

/* Olives */
--brand-olive-dark: #7B8458;
--brand-olive-medium: #8B9264;
--brand-olive-light: #9FA870;
```

**Spacing:**
```css
--forge-spacing-xsmall: 4px;
--forge-spacing-small: 8px;
--forge-spacing-medium: 16px;
--forge-spacing-large: 24px;
--forge-spacing-xlarge: 32px;
```

**Border Radius:**
```css
--forge-radius-small: 4px;
--forge-radius-medium: 8px;
--forge-radius-large: 12px;
```

**Typography:**
```css
/* Font Family */
--font-family-primary: 'Roboto', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

**Borders:**
```css
--forge-color-border-default: hsl(var(--border));
--forge-color-border-muted: hsl(var(--muted));
```

### 6.2 Typography Standards

**All text elements MUST use:**
```tsx
style={{
  fontFamily: 'Roboto, sans-serif',
  fontSize: 'var(--text-sm)',  // or appropriate size
  fontWeight: 'var(--font-weight-medium)',  // if needed
}}
```

**Do NOT use Tailwind font classes:**
- ❌ `text-2xl`, `text-lg`, `text-sm`
- ❌ `font-bold`, `font-semibold`
- ❌ `leading-none`, `leading-tight`

**Use CSS variables instead:**
- ✅ `fontSize: 'var(--text-lg)'`
- ✅ `fontWeight: 'var(--font-weight-medium)'`
- ✅ `fontFamily: 'Roboto, sans-serif'`

### 6.3 Component Styling Pattern

**Consistent Pattern:**
```tsx
<Component
  className="..." // Tailwind utilities for layout only
  style={{
    fontFamily: 'Roboto, sans-serif',
    fontSize: 'var(--text-base)',
    padding: 'var(--forge-spacing-medium)',
    borderRadius: 'var(--forge-radius-medium)',
    backgroundColor: 'var(--brand-blue-dark)',
    color: 'var(--foreground)',
  }}
>
  Content
</Component>
```

---

## 7. Breaking Changes

### 7.1 Removed Features

**Manual Coordinate Entry:**
- The manual lat/lng input fields have been removed
- Users must now use the crosshair map selector or "Use Current Location"
- **Migration:** Remove any references to `showManualEntry` prop

**Old Map Interface:**
- Previous iframe-only map removed
- Replaced with interactive crosshair system
- **Migration:** Update any components using old `IncidentLocationMap`

### 7.2 Changed Interfaces

**IncidentLocationMap Props:**
```typescript
// OLD (v194)
interface Props {
  location: LocationCoordinates | null;
  onLocationChange: (location: LocationCoordinates | null) => void;
  showManualEntry: boolean;  // Used to toggle manual input
}

// NEW (v250)
interface Props {
  location: LocationCoordinates | null;
  onLocationChange: (location: LocationCoordinates | null) => void;
  showManualEntry?: boolean;  // Deprecated, no effect
}
```

**Workflow Structure:**
```typescript
// NEW in v250
interface Workflow {
  // ... existing fields
  active?: boolean;  // NEW: Instance active state
}
```

### 7.3 Deprecated Patterns

**Do NOT use these patterns:**

1. **Manual coordinate input forms**
2. **Non-categorized incident type selectors**
3. **Hardcoded colors instead of CSS variables**
4. **Tailwind typography classes**
5. **Static map images**

### 7.4 Required Updates

**All forms using location selection MUST:**
1. Use new `IncidentLocationMap` component
2. Handle crosshair-based selection
3. Remove manual coordinate inputs
4. Implement geolocation fallback

**All styled components MUST:**
1. Use CSS variables for colors
2. Use Roboto font family
3. Use CSS variables for spacing
4. Use CSS variables for border radius

---

## 8. Migration Checklist

### 8.1 Pre-Migration

- [ ] Backup version 194 codebase
- [ ] Document custom modifications in v194
- [ ] Review all incident forms
- [ ] Identify location mapping usage
- [ ] List all styled components

### 8.2 Core Updates

**Incident Forms:**
- [ ] Update `NewIncidentForm.tsx` with new structure
- [ ] Add `IncidentTypes.ts` definitions
- [ ] Implement categorized dropdown selector
- [ ] Add workflow assignment logic
- [ ] Update form validation
- [ ] Add file attachment support

**Location Mapping:**
- [ ] Replace old map component with new `IncidentLocationMap.tsx`
- [ ] Remove manual coordinate entry UI
- [ ] Implement crosshair selection
- [ ] Add geolocation support
- [ ] Update parent components to handle new flow

**Workflows:**
- [ ] Add `/data/workflows.ts` file
- [ ] Import 7 pre-configured workflows
- [ ] Add `IncidentWorkflowProgress.tsx` component
- [ ] Implement auto-assignment logic
- [ ] Add workflow indicators to incident table
- [ ] Create workflow management pages

**Incidents Page:**
- [ ] Update table structure
- [ ] Add workflow badge column
- [ ] Implement advanced search
- [ ] Add filtering options
- [ ] Add sorting capabilities
- [ ] Update action buttons

**Search Functionality:**
- [ ] Add Command component to Drivers page
- [ ] Add Command component to Vehicles page
- [ ] Implement real-time filtering
- [ ] Add sort options
- [ ] Add filter dropdowns

### 8.3 Design System

- [ ] Update `/styles/globals.css` with new variables
- [ ] Add brand color variables
- [ ] Add spacing variables
- [ ] Add typography variables
- [ ] Add border radius variables
- [ ] Remove all Tailwind typography classes from components
- [ ] Update all components to use CSS variables
- [ ] Ensure Roboto font is loaded
- [ ] Test all styled components

### 8.4 Testing

**Functional Testing:**
- [ ] Test student incident creation
- [ ] Test driver incident creation
- [ ] Test categorized dropdown selection
- [ ] Test location map selection
- [ ] Test crosshair positioning
- [ ] Test geolocation
- [ ] Test workflow assignment
- [ ] Test workflow progress display
- [ ] Test search on Drivers page
- [ ] Test search on Vehicles page
- [ ] Test filtering and sorting
- [ ] Test incident table display

**Visual Testing:**
- [ ] Verify all fonts are Roboto
- [ ] Verify brand colors are correct
- [ ] Verify spacing is consistent
- [ ] Verify border radius matches design system
- [ ] Test responsive layouts
- [ ] Test dark mode (if applicable)

**Integration Testing:**
- [ ] Test form submission with workflow
- [ ] Test location saving
- [ ] Test file uploads
- [ ] Test workflow step progression
- [ ] Test search across pages

### 8.5 Post-Migration

- [ ] Update documentation
- [ ] Train users on new features
- [ ] Monitor for issues
- [ ] Collect feedback
- [ ] Plan future enhancements

---

## 9. Code Examples

### 9.1 Complete Incident Form Usage

```tsx
import { NewIncidentForm } from './components/incidents/NewIncidentForm';

function IncidentPage() {
  const [showForm, setShowForm] = useState(false);
  
  const handleIncidentCreated = (incident) => {
    console.log('Incident created:', incident);
    // Handle workflow assignment
    const workflow = assignWorkflowToIncident(
      incident.incidentType,
      incident.severity
    );
    if (workflow) {
      console.log('Workflow assigned:', workflow.name);
    }
  };
  
  return (
    <Dialog open={showForm} onOpenChange={setShowForm}>
      <DialogTrigger asChild>
        <Button>Create Incident</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <NewIncidentForm onComplete={handleIncidentCreated} />
      </DialogContent>
    </Dialog>
  );
}
```

### 9.2 Incident Table with Workflow Badge

```tsx
<TableRow key={incident.id}>
  <TableCell>{incident.id}</TableCell>
  <TableCell>{incident.date}</TableCell>
  <TableCell>{incident.student}</TableCell>
  <TableCell>
    <Badge severity={incident.severity}>
      {incident.severity}
    </Badge>
  </TableCell>
  <TableCell>
    {incident.workflow && (
      <Badge variant="outline" style={{ color: 'var(--brand-blue-dark)' }}>
        <GitBranch className="h-3 w-3 mr-1" />
        Workflow ({getWorkflowProgress(incident.workflow.steps)}%)
      </Badge>
    )}
  </TableCell>
  <TableCell>
    <Button onClick={() => viewIncident(incident.id)}>View</Button>
  </TableCell>
</TableRow>
```

### 9.3 Location Map Usage

```tsx
import { IncidentLocationMap } from './components/incidents/IncidentLocationMap';

function LocationForm() {
  const [location, setLocation] = useState<LocationCoordinates | null>(null);
  
  return (
    <IncidentLocationMap
      location={location}
      onLocationChange={setLocation}
    />
  );
}
```

### 9.4 Search Implementation

```tsx
const [searchTerm, setSearchTerm] = useState('');
const [filteredDrivers, setFilteredDrivers] = useState(mockDrivers);

useEffect(() => {
  const filtered = mockDrivers.filter((driver) => {
    const search = searchTerm.toLowerCase();
    return (
      driver.fullName.toLowerCase().includes(search) ||
      driver.employeeId.toLowerCase().includes(search) ||
      driver.assignedVehicle.toLowerCase().includes(search) ||
      driver.primaryRoute.toLowerCase().includes(search)
    );
  });
  setFilteredDrivers(filtered);
}, [searchTerm]);

return (
  <div className="relative">
    <Search className="absolute left-3 top-3 h-4 w-4" />
    <Input
      placeholder="Search drivers..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        fontFamily: 'Roboto, sans-serif',
        paddingLeft: 'var(--forge-spacing-large)',
      }}
    />
  </div>
);
```

---

## Support

For questions or issues during migration:
- Review existing documentation in `/docs` folder
- Check component source code for inline comments
- Test incrementally during migration
- Document any custom modifications

---

**End of v4 Migration Guide**
