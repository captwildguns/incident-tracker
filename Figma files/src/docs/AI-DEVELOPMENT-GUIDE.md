# AI Development Guide

## Purpose

This guide is specifically designed for AI assistants (like Claude) to understand and generate code for the Student Transportation Incident Tracker application. It provides explicit instructions on maintaining consistency with the design system, component patterns, and architectural decisions.

---

## Critical Requirements

### ⚠️ MANDATORY: Design System Adherence

**ALL UI generation MUST use CSS variables from `/styles/globals.css`**

- **Typography:** ONLY use Roboto font (imported in globals.css)
- **Colors:** ONLY use CSS variables (never hardcode colors)
- **Spacing:** ONLY use `--forge-spacing-*` tokens
- **Borders:** ONLY use `--forge-radius-*` and `--forge-color-border-*` tokens
- **Shadows:** ONLY use `--forge-elevation-*` tokens

### Design System Token Reference

All design tokens are defined in `/styles/globals.css`. This is the SINGLE SOURCE OF TRUTH for all styling.

---

## Typography System

### Font Family
```css
/* ALWAYS use this font stack */
font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
```

**NEVER** use any other font family. Roboto is imported via Google Fonts in globals.css.

### Font Sizes (Use CSS Variables)

```css
/* Available typography tokens */
--text-xs: 12px;      /* Use for: Captions, helper text */
--text-sm: 14px;      /* Use for: Small labels, secondary text */
--text-base: 14px;    /* Use for: Body text (DEFAULT) */
--text-lg: 16px;      /* Use for: Emphasized text */
--text-xl: 18px;      /* Use for: Subheadings */
--text-2xl: 20px;     /* Use for: Section headings */
--text-3xl: 24px;     /* Use for: Page titles */

/* Forge typography tokens (use these in inline styles) */
--forge-font-size-xs: 12px;
--forge-font-size-sm: 14px;
--forge-font-size-base: 14px;
--forge-font-size-lg: 16px;
--forge-font-size-xl: 18px;
```

### Font Weights

```css
--forge-font-weight-regular: 400;  /* Body text */
--forge-font-weight-medium: 500;   /* Emphasized text, labels, headings */
```

### Implementation Example

```tsx
// ✅ CORRECT - Using CSS variables
<h1 style={{ 
  fontSize: 'var(--text-3xl)', 
  fontWeight: 'var(--forge-font-weight-medium)' 
}}>
  Page Title
</h1>

<p style={{ fontSize: 'var(--text-base)' }}>
  Body text content
</p>

// ❌ WRONG - Hardcoded values
<h1 style={{ fontSize: '24px', fontWeight: 600 }}>Title</h1>
<p style={{ fontSize: '14px' }}>Text</p>
```

---

## Color System

### Brand Colors (Custom District Branding)

```css
/* Deep Blues - Primary Brand */
--brand-blue-dark: #4A6FA5;      /* Omnibar, primary buttons, headers */
--brand-blue-medium: #5B8BB8;    /* Secondary actions, hover states */
--brand-blue-light: #6B9BC5;     /* Backgrounds, subtle accents */

/* Olives - Secondary Brand */
--brand-olive-dark: #7B8458;     /* Secondary emphasis */
--brand-olive-medium: #8B9264;   /* Accent elements, success states */
--brand-olive-light: #9FA870;    /* Subtle backgrounds, info badges */
```

### Semantic Colors (Tyler Forge)

```css
/* Backgrounds */
--background: rgba(255, 255, 255, 1);  /* Main page background */
--card: rgba(255, 255, 255, 1);        /* Card/container background */

/* Text */
--foreground: rgba(0, 0, 0, 0.87);     /* Primary text */
--muted-foreground: rgba(0, 0, 0, 0.38); /* Secondary/disabled text */

/* Interactive Elements */
--primary: rgba(63, 81, 181, 1);       /* Primary buttons, links */
--secondary: rgba(255, 193, 7, 1);     /* Secondary actions */
--destructive: rgba(176, 0, 32, 1);    /* Delete, error actions */
--accent: rgba(61, 90, 254, 1);        /* Highlights */

/* Borders and Inputs */
--border: rgba(224, 224, 224, 1);
--input-background: rgba(247, 248, 252, 1);
--ring: rgba(63, 81, 181, 1);          /* Focus rings */
```

### Implementation Example

```tsx
// ✅ CORRECT - Using CSS variables
<nav style={{ 
  background: 'var(--brand-blue-dark)',
  color: 'white'
}}>
  Navigation
</nav>

<button style={{ 
  background: 'var(--primary)',
  color: 'var(--primary-foreground)'
}}>
  Primary Action
</button>

// ❌ WRONG - Hardcoded colors
<nav style={{ background: '#4A6FA5' }}>Navigation</nav>
<button style={{ background: '#3f51b5' }}>Action</button>
```

---

## Spacing System

### Forge Spacing Tokens

```css
--forge-spacing-xxsmall: 4px;   /* Tight spacing */
--forge-spacing-xsmall: 8px;    /* Small gaps */
--forge-spacing-small: 12px;    /* Default gaps */
--forge-spacing-medium: 16px;   /* Standard spacing */
--forge-spacing-large: 24px;    /* Section spacing */
--forge-spacing-xlarge: 32px;   /* Page padding */
--forge-spacing-xxlarge: 48px;  /* Large sections */
```

### Usage Guidelines

- **Page padding:** `--forge-spacing-xlarge` (32px)
- **Section margins:** `--forge-spacing-large` (24px)
- **Card padding:** `--forge-spacing-medium` to `--forge-spacing-large` (16-24px)
- **Element gaps:** `--forge-spacing-small` to `--forge-spacing-medium` (12-16px)
- **Tight spacing:** `--forge-spacing-xsmall` (8px)

### Implementation Example

```tsx
// ✅ CORRECT - Using spacing tokens
<div style={{ 
  padding: 'var(--forge-spacing-xlarge)',
  gap: 'var(--forge-spacing-medium)'
}} className="flex flex-col">
  <div style={{ marginBottom: 'var(--forge-spacing-large)' }}>
    Section content
  </div>
</div>

// ❌ WRONG - Hardcoded spacing
<div style={{ padding: '32px', gap: '16px' }}>Content</div>
```

---

## Border and Radius System

### Border Colors

```css
--forge-color-border-default: rgba(224, 224, 224, 1);
--forge-color-border-subtle: rgba(235, 235, 235, 1);
--border: rgba(224, 224, 224, 1);
```

### Border Radius

```css
--forge-radius-small: 2px;   /* Minimal rounding */
--forge-radius-medium: 4px;  /* Standard rounding (DEFAULT) */
--forge-radius-large: 8px;   /* Pronounced rounding */
--radius: 4px;               /* Default radius */
```

### Implementation Example

```tsx
// ✅ CORRECT
<div style={{
  border: '1px solid var(--border)',
  borderRadius: 'var(--forge-radius-medium)'
}}>
  Card content
</div>

// ❌ WRONG
<div style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}>
  Card content
</div>
```

---

## Elevation System (Shadows)

### Forge Elevation Tokens

```css
--forge-elevation-1: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
--forge-elevation-2: 0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
--forge-elevation-4: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10);
--forge-elevation-8: 0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05);
--forge-elevation-24: 0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.15);
```

### Usage

- **Cards:** `--forge-elevation-1` (most common)
- **Popovers/Dropdowns:** `--forge-elevation-2`
- **Modals/Dialogs:** `--forge-elevation-4`
- **Floating Elements:** `--forge-elevation-8`
- **Overlays:** `--forge-elevation-24`

### Implementation Example

```tsx
// ✅ CORRECT
<div style={{ 
  boxShadow: 'var(--forge-elevation-1)',
  borderRadius: 'var(--forge-radius-large)'
}}>
  Card content
</div>

// ❌ WRONG
<div style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
  Card content
</div>
```

---

## Component Patterns

### Standard Card Component

```tsx
// ✅ CORRECT Pattern
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";

<Card style={{ marginBottom: 'var(--forge-spacing-large)' }}>
  <CardHeader>
    <CardTitle style={{ fontSize: 'var(--text-xl)' }}>
      Card Title
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p style={{ fontSize: 'var(--text-base)' }}>Content</p>
  </CardContent>
</Card>
```

### Button Variants

```tsx
import { Button } from "./components/ui/button";

// Primary action
<Button variant="default">Primary Action</Button>

// Secondary action
<Button variant="secondary">Secondary Action</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// Subtle action
<Button variant="ghost">Cancel</Button>

// Outlined action
<Button variant="outline">More Options</Button>
```

### Badge Components

```tsx
import { Badge } from "./components/ui/badge";

// Status badges
<Badge variant="default">Open</Badge>
<Badge variant="secondary">Resolved</Badge>
<Badge variant="destructive">Critical</Badge>

// Custom colored badges (use inline styles)
<Badge style={{ 
  background: 'var(--brand-olive-medium)',
  color: 'white'
}}>
  Active
</Badge>
```

### Avatar Components (Images)

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";

// With image
<Avatar>
  <AvatarImage src={photoUrl} alt={name} />
  <AvatarFallback>{initials}</AvatarFallback>
</Avatar>

// Size variants
<Avatar className="h-10 w-10">  {/* 40px - default */}
<Avatar className="h-8 w-8">    {/* 32px - small */}
<Avatar className="h-12 w-12">  {/* 48px - large */}
```

---

## Sortable Table Pattern

### Implementation

```tsx
const [sortColumn, setSortColumn] = useState('date');
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

const handleSort = (column: string) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  } else {
    setSortColumn(column);
    setSortDirection('asc');
  }
};

const SortIcon = ({ column }: { column: string }) => {
  if (sortColumn !== column) {
    return <ChevronsUpDown className="h-4 w-4 ml-1 text-muted-foreground" />;
  }
  return sortDirection === 'asc' 
    ? <ChevronUp className="h-4 w-4 ml-1" /> 
    : <ChevronDown className="h-4 w-4 ml-1" />;
};

// Usage in table header
<th 
  onClick={() => handleSort('name')}
  style={{ cursor: 'pointer', userSelect: 'none' }}
  className="px-4 py-3 text-left"
>
  <div className="flex items-center">
    Name
    <SortIcon column="name" />
  </div>
</th>
```

---

## Page Structure Pattern

### Standard Page Layout

```tsx
interface PageProps {
  onNavigate: (page: string) => void;
}

export function YourPage({ onNavigate }: PageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  
  return (
    <div style={{ padding: 'var(--forge-spacing-xlarge)' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <h1 style={{ 
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--forge-font-weight-medium)',
          marginBottom: 'var(--forge-spacing-small)'
        }}>
          Page Title
        </h1>
        <p style={{ 
          fontSize: 'var(--text-base)',
          color: 'var(--muted-foreground)'
        }}>
          Page description
        </p>
      </div>

      {/* Content */}
      <div>
        {/* Your content here */}
      </div>
    </div>
  );
}
```

---

## Data Flow Patterns

### State Management

Use React `useState` for local component state:

```tsx
const [data, setData] = useState(initialData);
const [searchTerm, setSearchTerm] = useState('');
const [filters, setFilters] = useState({ status: 'all', severity: 'all' });
```

### Filtering Pattern

```tsx
const filteredData = data.filter(item => {
  // Search filter
  const matchesSearch = searchTerm === '' || 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase());
  
  // Status filter
  const matchesStatus = filters.status === 'all' || 
    item.status === filters.status;
  
  return matchesSearch && matchesStatus;
});
```

### Sorting Pattern

```tsx
const sortedData = [...filteredData].sort((a, b) => {
  let aValue = a[sortColumn];
  let bValue = b[sortColumn];
  
  // Handle different data types
  if (typeof aValue === 'string') {
    return sortDirection === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  }
  
  if (typeof aValue === 'number') {
    return sortDirection === 'asc' 
      ? aValue - bValue
      : bValue - aValue;
  }
  
  return 0;
});
```

---

## Navigation Pattern

All pages receive an `onNavigate` prop:

```tsx
interface PageProps {
  onNavigate: (page: string) => void;
}

// Usage
<Button onClick={() => onNavigate('incidents')}>
  View Incidents
</Button>

<a 
  href="#" 
  onClick={(e) => { 
    e.preventDefault(); 
    onNavigate('students'); 
  }}
  style={{ color: 'var(--primary)' }}
>
  View Student
</a>
```

---

## Icon Usage

**ALWAYS** use Lucide React for icons:

```tsx
import { 
  Search, Download, Plus, AlertTriangle, 
  CheckCircle, User, Calendar, MapPin,
  ChevronUp, ChevronDown, ChevronsUpDown
} from 'lucide-react';

// Standard sizes
<Search className="h-4 w-4" />  {/* 16px - default */}
<User className="h-5 w-5" />    {/* 20px - medium */}
<AlertTriangle className="h-6 w-6" />  {/* 24px - large */}
```

---

## Dialog/Modal Pattern

```tsx
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription 
} from "./components/ui/dialog";

const [isOpen, setIsOpen] = useState(false);

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle style={{ fontSize: 'var(--text-2xl)' }}>
        Dialog Title
      </DialogTitle>
      <DialogDescription style={{ fontSize: 'var(--text-base)' }}>
        Dialog description
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

---

## Form Pattern

```tsx
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Select } from "./components/ui/select";

<div style={{ marginBottom: 'var(--forge-spacing-medium)' }}>
  <Label 
    htmlFor="name"
    style={{ 
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--forge-font-weight-medium)'
    }}
  >
    Field Label
  </Label>
  <Input
    id="name"
    type="text"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Enter value"
    style={{ marginTop: 'var(--forge-spacing-xsmall)' }}
  />
</div>
```

---

## Chart Integration (Recharts)

```tsx
import { 
  LineChart, Line, BarChart, Bar, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Use brand colors
const COLORS = [
  'var(--brand-blue-dark)',
  'var(--brand-blue-medium)',
  'var(--brand-olive-medium)',
  'var(--brand-olive-light)',
];

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line 
      type="monotone" 
      dataKey="incidents" 
      stroke="var(--brand-blue-dark)" 
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>
```

---

## File Organization

```
/components
  /ui                    # Reusable UI components (Button, Card, etc.)
  /dashboard            # Dashboard page
  /incidents            # Incidents page
  /students             # Students page
  /vehicles             # Vehicles page
  /drivers              # Drivers page
  /new-incident         # New incident form
  /reports              # Reports page
  /driver-communications # Communications page
```

### When Creating New Components

1. Place in appropriate directory
2. Export with named export
3. Accept `onNavigate` prop if navigation is needed
4. Use CSS variables for ALL styling
5. Import UI components from `/components/ui`
6. Follow existing patterns for state management

---

## Common Mistakes to Avoid

### ❌ DO NOT DO THIS:

```tsx
// Hardcoded colors
<div style={{ color: '#4A6FA5' }}>

// Hardcoded fonts
<h1 style={{ fontFamily: 'Arial' }}>

// Hardcoded sizes
<p style={{ fontSize: '14px' }}>

// Hardcoded spacing
<div style={{ padding: '32px' }}>

// Hardcoded shadows
<div style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
```

### ✅ ALWAYS DO THIS:

```tsx
// Use CSS variables
<div style={{ color: 'var(--brand-blue-dark)' }}>

// Font is inherited from globals.css (Roboto)
<h1 style={{ fontSize: 'var(--text-3xl)' }}>

// Use typography tokens
<p style={{ fontSize: 'var(--text-base)' }}>

// Use spacing tokens
<div style={{ padding: 'var(--forge-spacing-xlarge)' }}>

// Use elevation tokens
<div style={{ boxShadow: 'var(--forge-elevation-1)' }}>
```

---

## Quick Reference: Most Used Tokens

```css
/* Typography */
fontSize: 'var(--text-base)'        /* Body text */
fontSize: 'var(--text-2xl)'         /* Headings */
fontWeight: 'var(--forge-font-weight-medium)' /* Emphasized */

/* Colors */
color: 'var(--foreground)'          /* Primary text */
color: 'var(--muted-foreground)'    /* Secondary text */
background: 'var(--brand-blue-dark)' /* Brand primary */
background: 'var(--card)'           /* Card backgrounds */

/* Spacing */
padding: 'var(--forge-spacing-xlarge)'  /* Page padding */
margin: 'var(--forge-spacing-large)'    /* Section spacing */
gap: 'var(--forge-spacing-medium)'      /* Element gaps */

/* Borders & Shadows */
border: '1px solid var(--border)'
borderRadius: 'var(--forge-radius-medium)'
boxShadow: 'var(--forge-elevation-1)'
```

---

## Testing Your Generated Code

Before submitting code, verify:

1. ✅ All colors use CSS variables (no hex codes)
2. ✅ All spacing uses `--forge-spacing-*` tokens
3. ✅ Font family is NOT specified (inherits Roboto)
4. ✅ Font sizes use `--text-*` or `--forge-font-size-*` tokens
5. ✅ Borders use `--forge-radius-*` tokens
6. ✅ Shadows use `--forge-elevation-*` tokens
7. ✅ Components imported from `./components/ui/`
8. ✅ Icons imported from `lucide-react`
9. ✅ `onNavigate` prop used for navigation
10. ✅ Follows existing file organization

---

## Summary

**The Golden Rules:**

1. **ALWAYS** use CSS variables from `/styles/globals.css`
2. **NEVER** hardcode colors, fonts, spacing, or shadows
3. **ONLY** use Roboto font (already imported)
4. **FOLLOW** existing component patterns
5. **IMPORT** from `/components/ui/` for UI elements
6. **USE** Lucide React for all icons
7. **MAINTAIN** consistent code structure

By following these guidelines, you ensure the application remains consistent, maintainable, and aligned with the Tyler Forge 3.x design system and custom district branding.
