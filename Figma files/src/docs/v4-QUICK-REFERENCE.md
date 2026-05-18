# v4 Quick Reference Guide

**Document Version:** v4  
**Target Version:** 250  
**Last Updated:** January 29, 2025

---

## Quick Links

- [Full Migration Guide](./v4-MIGRATION-GUIDE.md)
- [Workflow System Docs](./v4-WORKFLOW-SYSTEM.md)
- [Design System](./DESIGN-SYSTEM.md)
- [Technical Documentation](./TECHNICAL-DOCUMENTATION.md)

---

## Critical Changes Summary

### 🚨 Breaking Changes

1. **Manual Coordinate Entry Removed**
   - Old: Users could type lat/lng manually
   - New: Crosshair-based map selection only
   - Action: Remove all manual input UI

2. **Incident Type Selector Redesigned**
   - Old: Flat dropdown list
   - New: Categorized dropdown with visual hierarchy
   - Action: Update to use `IncidentTypes.ts`

3. **CSS Variables Required**
   - Old: Could use Tailwind typography classes
   - New: Must use CSS variables only
   - Action: Replace all `text-*`, `font-*` classes

### ✨ New Features

1. **Workflow System**
   - Auto-assignment based on type + severity
   - Multi-step approval processes
   - Progress tracking UI
   - 7 pre-configured workflows

2. **Enhanced Search**
   - Command palette pattern
   - Real-time filtering
   - Multi-field search
   - Available on Drivers & Vehicles pages

3. **Location Mapping**
   - Interactive crosshair selection
   - Geolocation support
   - Google Maps integration
   - "Open in Maps" feature

4. **Incident Forms**
   - Separate Student & Driver forms
   - File attachment support
   - Related students tagging
   - Photo upload

---

## File Structure Changes

### New Files (v250)

```
/components/incidents/
  ├── IncidentLocationMap.tsx        ← Interactive map with crosshair
  ├── IncidentTypes.ts               ← Centralized type definitions
  ├── IncidentWorkflowProgress.tsx   ← Workflow timeline UI
  ├── INCIDENT_TYPES_REFERENCE.md    ← Type documentation

/data/
  └── workflows.ts                   ← Workflow definitions & logic

/components/workflows/
  ├── WorkflowBuilderPage.tsx        ← Template editor
  ├── WorkflowsPage.tsx              ← Workflow management
  └── StepConfigDialog.tsx           ← Step configuration

/docs/
  ├── v4-MIGRATION-GUIDE.md          ← Full migration guide
  ├── v4-WORKFLOW-SYSTEM.md          ← Workflow documentation
  └── v4-QUICK-REFERENCE.md          ← This file
```

### Modified Files

```
/components/incidents/
  ├── NewIncidentForm.tsx            ← Complete redesign
  ├── IncidentsPage.tsx              ← Added workflow badges
  └── IncidentDetailPage.tsx         ← Added workflow display

/components/drivers/
  └── DriversPage.tsx                ← Added search functionality

/components/vehicles/
  └── VehiclesPage.tsx               ← Added search functionality

/styles/
  └── globals.css                    ← New CSS variables
```

---

## Common Code Patterns

### Using Incident Location Map

```tsx
import { IncidentLocationMap } from './components/incidents/IncidentLocationMap';

const [location, setLocation] = useState<LocationCoordinates | null>(null);

<IncidentLocationMap
  location={location}
  onLocationChange={setLocation}
/>
```

### Assigning Workflow

```typescript
import { assignWorkflowToIncident } from '../data/workflows';

const workflow = assignWorkflowToIncident(
  incidentType,  // e.g., 'Physical Altercation'
  severity       // e.g., 'High'
);

if (workflow) {
  incident.workflow = workflow;
}
```

### Displaying Workflow Badge

```tsx
import { GitBranch } from 'lucide-react';
import { getWorkflowProgress, isWorkflowActive } from '../data/workflows';

{incident.workflow && isWorkflowActive(incident.workflow) && (
  <Badge variant="outline">
    <GitBranch className="h-3 w-3 mr-1" />
    Workflow ({getWorkflowProgress(incident.workflow.steps)}%)
  </Badge>
)}
```

### Using CSS Variables

```tsx
// ❌ WRONG - Don't use Tailwind classes
<div className="text-lg font-bold">

// ✅ CORRECT - Use CSS variables
<div style={{
  fontFamily: 'Roboto, sans-serif',
  fontSize: 'var(--text-lg)',
  fontWeight: 'var(--font-weight-bold)',
}}>
```

### Implementing Search

```tsx
const [searchTerm, setSearchTerm] = useState('');

// Filter logic
const filteredData = data.filter((item) => {
  const search = searchTerm.toLowerCase();
  return (
    item.name.toLowerCase().includes(search) ||
    item.id.toLowerCase().includes(search) ||
    item.email.toLowerCase().includes(search)
  );
});

// UI
<div className="relative">
  <Search className="absolute left-3 top-3 h-4 w-4" />
  <Input
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      fontFamily: 'Roboto, sans-serif',
      paddingLeft: 'var(--forge-spacing-large)',
    }}
  />
</div>
```

---

## Design System Quick Reference

### CSS Variables

```css
/* Colors */
--brand-blue-dark: #4A6FA5;
--brand-blue-medium: #5B8BB8;
--brand-blue-light: #6B9BC5;
--brand-olive-dark: #7B8458;
--brand-olive-medium: #8B9264;
--brand-olive-light: #9FA870;

/* Spacing */
--forge-spacing-xsmall: 4px;
--forge-spacing-small: 8px;
--forge-spacing-medium: 16px;
--forge-spacing-large: 24px;
--forge-spacing-xlarge: 32px;

/* Typography */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Border Radius */
--forge-radius-small: 4px;
--forge-radius-medium: 8px;
--forge-radius-large: 12px;

/* Borders */
--forge-color-border-default: hsl(var(--border));
```

### Standard Component Style

```tsx
<Component
  style={{
    fontFamily: 'Roboto, sans-serif',
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--font-weight-medium)',
    padding: 'var(--forge-spacing-medium)',
    borderRadius: 'var(--forge-radius-medium)',
    border: '1px solid var(--forge-color-border-default)',
    backgroundColor: 'var(--brand-blue-dark)',
  }}
>
```

---

## Workflow Quick Reference

### 7 Pre-configured Workflows

| Workflow ID | Name | Incident Types | Severity | Steps |
|------------|------|----------------|----------|-------|
| WF-001 | Physical Altercation Response | Physical Altercation | High | 5 |
| WF-002 | Bullying Investigation | Taunting/Bullying | High, Medium | 6 |
| WF-003 | Seat Refusal - Standard | Seat Refusal | Low, Medium | 3 |
| WF-004 | Offensive Language Protocol | Offensive Language | Medium, High | 4 |
| WF-005 | Disruptive Behavior - Minor | Disruptive Volume | Low, Medium | 3 |
| WF-006 | Property Damage Investigation | Vandalism, Window Misuse | Medium, High | 5 |
| WF-007 | Food & Beverage Violation | Eating/Drinking | Low, Medium | 3 |

### Trigger Types

- **manual** - User must start step manually
- **auto-complete** - Starts when previous completes
- **time-delay** - Starts after specified delay
- **status-change** - Starts on incident status change
- **approval-granted** - Starts after approval
- **conditional** - Starts based on conditions

### Step Statuses

- **Not Started** - Step hasn't begun
- **In Progress** - Currently being worked on
- **Completed** - Step finished
- **Pending Approval** - Waiting for approval
- **Approved** - Approved by designated approvers
- **Rejected** - Rejected by approvers

---

## Incident Types by Category

### 🚌 Boarding & Seating
- Boarding Zone Violation
- Seat Refusal
- Aisle Obstruction
- Late Boarding

### 🗣️ Behavioral Issues
- Disruptive Volume
- Offensive Language
- Taunting/Bullying
- Defiance of Driver

### 🤜 Physical Safety
- Physical Altercation
- Inappropriate Physical Contact
- Pushing/Shoving

### 📱 Device & Personal Items
- Electronic Device Misuse
- Headphone Volume Violation
- Unauthorized Recording

### 🚪 Vehicle Safety
- Window Misuse
- Emergency Exit Tampering
- Door Interference

### 🚗 Driver Performance
- Speeding
- Unsafe Driving
- Run Deviation
- Unprofessional Conduct

### 🔧 Vehicle Maintenance
- Mechanical Issue
- Cleanliness Issue
- Safety Equipment Failure

---

## Migration Checklist (Quick)

### Phase 1: Core Updates
- [ ] Update `NewIncidentForm.tsx`
- [ ] Add `IncidentTypes.ts`
- [ ] Add `IncidentLocationMap.tsx`
- [ ] Add `workflows.ts`
- [ ] Add `IncidentWorkflowProgress.tsx`

### Phase 2: Page Updates
- [ ] Update `IncidentsPage.tsx` (workflow badges)
- [ ] Update `DriversPage.tsx` (search)
- [ ] Update `VehiclesPage.tsx` (search)
- [ ] Update `IncidentDetailPage.tsx` (workflow display)

### Phase 3: Design System
- [ ] Update `globals.css` (new variables)
- [ ] Remove Tailwind typography classes
- [ ] Apply Roboto font everywhere
- [ ] Use CSS variables for spacing
- [ ] Use CSS variables for colors

### Phase 4: Testing
- [ ] Test incident creation (student & driver)
- [ ] Test location selection
- [ ] Test workflow assignment
- [ ] Test search functionality
- [ ] Test responsive layouts

---

## Troubleshooting

### Workflow Not Assigning
```typescript
// Debug workflow assignment
console.log('Incident Type:', incidentType);
console.log('Severity:', severity);
const workflow = assignWorkflowToIncident(incidentType, severity);
console.log('Assigned Workflow:', workflow?.name || 'None');
```

### Location Map Not Working
```typescript
// Check location state
console.log('Current location:', location);
console.log('Is selecting:', isSelectingLocation);

// Verify Google Maps URL
const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
console.log('Map URL:', mapUrl);
```

### Search Not Filtering
```typescript
// Debug search
console.log('Search term:', searchTerm);
console.log('Original data length:', data.length);
console.log('Filtered data length:', filteredData.length);
```

### CSS Variables Not Applied
```typescript
// Check if variables are defined
const element = document.querySelector('[style*="--text-base"]');
const computed = getComputedStyle(element);
console.log('Font size:', computed.fontSize);
```

---

## API Quick Reference

### Workflow Functions

```typescript
// Assign workflow
assignWorkflowToIncident(type: string, severity: string): Workflow | null

// Check if active
isWorkflowActive(workflow: Workflow | null): boolean

// Mark complete
completeWorkflow(workflow: Workflow): Workflow

// Get progress
getWorkflowProgress(steps: WorkflowStep[]): number

// Get current step
getCurrentStep(steps: WorkflowStep[]): WorkflowStep | null
```

### Incident Types

```typescript
// Get all types
import { INCIDENT_TYPES } from './IncidentTypes';

// Get categories
import { getAllCategories } from './IncidentTypes';

// Get types by category
import { getTypesByCategory } from './IncidentTypes';
```

---

## Support Resources

### Documentation
- Full Migration Guide: `/docs/v4-MIGRATION-GUIDE.md`
- Workflow System: `/docs/v4-WORKFLOW-SYSTEM.md`
- Design System: `/docs/DESIGN-SYSTEM.md`
- Technical Docs: `/docs/TECHNICAL-DOCUMENTATION.md`

### Source Code
- Incident Forms: `/components/incidents/NewIncidentForm.tsx`
- Location Map: `/components/incidents/IncidentLocationMap.tsx`
- Workflows: `/data/workflows.ts`
- Incident Types: `/components/incidents/IncidentTypes.ts`

### Reference Files
- Incident Type Reference: `/components/incidents/INCIDENT_TYPES_REFERENCE.md`
- Global Styles: `/styles/globals.css`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v250 | 2025-01-29 | Current version with all v4 features |
| v194 | Previous | Legacy version (migration source) |

---

**End of v4 Quick Reference Guide**
