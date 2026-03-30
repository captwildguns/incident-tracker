# Student Transportation Incident Tracker - Design System Documentation

## Table of Contents
1. [Overview](#overview)
2. [Brand Identity](#brand-identity)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing](#spacing)
6. [Layout](#layout)
7. [Components](#components)
8. [Icons](#icons)
9. [Elevation & Shadows](#elevation--shadows)
10. [Border Radius](#border-radius)
11. [Responsive Design](#responsive-design)
12. [Accessibility](#accessibility)
13. [Usage Guidelines](#usage-guidelines)

---

## Overview

The Student Transportation Incident Tracker implements the **Tyler Forge 3.x Design System** with custom district branding. This design system ensures consistency, accessibility, and maintainability across the entire application.

### Design Principles

1. **Consistency:** Uniform visual language throughout
2. **Accessibility:** WCAG AA compliant
3. **Scalability:** Design tokens allow easy updates
4. **Brand Alignment:** District colors integrated seamlessly
5. **Tyler Forge Compliance:** Follows Workforce application standards

### Design System Architecture

```
Tyler Forge 3.x Base
        ↓
Custom District Branding
        ↓
Component Library
        ↓
Application Pages
```

---

## Brand Identity

### District Branding

The application features custom district branding extracted from the transportation department logo, featuring a harmonious palette of deep blues and natural olives.

### Logo Usage

**Tyler Logo:**
- Displayed in omnibar (top navigation)
- White Tyler wordmark on indigo background (#4A6FA5)
- Size: 80px width, auto height
- Position: Left side of omnibar

**District Logo:**
- Not currently displayed in omnibar (Tyler branding standard)
- Can be added to login screens or documentation

---

## Color System

### Primary Brand Colors

#### Deep Blues

```css
--brand-blue-dark: #4A6FA5;      /* Primary brand color */
--brand-blue-medium: #5B8BB8;    /* Secondary brand color */
--brand-blue-light: #6B9BC5;     /* Accent brand color */
```

**Usage:**
- **Dark Blue (#4A6FA5):** Omnibar background, primary buttons, headers, active states
- **Medium Blue (#5B8BB8):** Secondary actions, hover states, links
- **Light Blue (#6B9BC5):** Backgrounds, subtle accents, disabled states

#### Olives

```css
--brand-olive-dark: #7B8458;     /* Complementary dark */
--brand-olive-medium: #8B9264;   /* Complementary medium */
--brand-olive-light: #9FA870;    /* Complementary light */
```

**Usage:**
- **Dark Olive (#7B8458):** Secondary emphasis, category indicators
- **Medium Olive (#8B9264):** Accent elements, success states
- **Light Olive (#9FA870):** Subtle backgrounds, informational badges

### Tyler Forge Color Tokens (57 Total)

#### Semantic Colors

```css
/* Background Colors */
--background: #ffffff;           /* Main background */
--foreground: #09090b;          /* Main text */
--muted: #f4f4f5;               /* Muted backgrounds */
--muted-foreground: #71717a;    /* Muted text */
--accent: #f4f4f5;              /* Accent backgrounds */
--accent-foreground: #18181b;   /* Accent text */

/* UI Element Colors */
--card: #ffffff;                /* Card backgrounds */
--card-foreground: #09090b;     /* Card text */
--popover: #ffffff;             /* Popover backgrounds */
--popover-foreground: #09090b;  /* Popover text */

/* Interactive Colors */
--primary: #18181b;             /* Primary actions */
--primary-foreground: #fafafa;  /* Primary text */
--secondary: #f4f4f5;           /* Secondary actions */
--secondary-foreground: #18181b;/* Secondary text */

/* Status Colors */
--destructive: #ef4444;         /* Destructive actions */
--destructive-foreground: #fafafa;
--success: #22c55e;             /* Success states */
--warning: #f59e0b;             /* Warning states */
--info: #3b82f6;                /* Informational states */

/* Border & Input Colors */
--border: #e4e4e7;              /* Borders */
--input: #e4e4e7;               /* Input borders */
--ring: #18181b;                /* Focus rings */
```

### Color Usage Guidelines

#### Text Colors

```typescript
// Primary text
className="text-foreground"

// Muted/secondary text
className="text-muted-foreground"

// Links
className="text-primary hover:underline"

// Brand text
style={{ color: 'var(--brand-blue-dark)' }}
```

#### Background Colors

```typescript
// Main background
className="bg-background"

// Card/surface
className="bg-card"

// Muted section
className="bg-muted"

// Brand background
style={{ backgroundColor: 'var(--brand-blue-dark)' }}
```

#### Status Colors

```typescript
// Success (green)
className="text-green-600 bg-green-100"

// Warning (orange)
className="text-orange-600 bg-orange-100"

// Error (red)
className="text-red-600 bg-red-100"

// Info (blue)
className="text-blue-600 bg-blue-100"
```

### Color Accessibility

All color combinations meet WCAG AA standards:

| Foreground | Background | Contrast Ratio |
|-----------|-----------|----------------|
| #4A6FA5 | #ffffff | 4.8:1 ✓ |
| #ffffff | #4A6FA5 | 4.8:1 ✓ |
| #09090b | #ffffff | 21:1 ✓ |
| #71717a | #ffffff | 4.6:1 ✓ |
| #ef4444 | #ffffff | 4.5:1 ✓ |

---

## Typography

### Font Family

**Roboto** is used exclusively throughout the application:

```css
body {
  font-family: 'Roboto', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Roboto', sans-serif;
}
```

### Type Scale

```css
--text-xs: 0.75rem;      /* 12px - Smallest text, captions */
--text-sm: 0.875rem;     /* 14px - Small text, labels */
--text-base: 1rem;       /* 16px - Body text, default */
--text-lg: 1.125rem;     /* 18px - Emphasized text */
--text-xl: 1.25rem;      /* 20px - Subheadings */
--text-2xl: 1.5rem;      /* 24px - Section headings */
--text-3xl: 1.875rem;    /* 30px - Page titles */
--text-4xl: 2.25rem;     /* 36px - Large display text */
```

### Font Weights

```css
/* Regular (400) - Body text */
font-weight: 400;

/* Medium (500) - Emphasis, labels */
font-weight: 500;

/* Semibold (600) - Headings, important text */
font-weight: 600;

/* Bold (700) - Statistics, highlights */
font-weight: 700;
```

### Typography Usage

#### Headings

```typescript
// Page title (h1)
<h1 style={{ 
  fontSize: 'var(--text-3xl)', 
  fontWeight: 600,
  margin: 0 
}}>
  Page Title
</h1>

// Section heading (h2)
<h2 style={{ 
  fontSize: 'var(--text-2xl)', 
  fontWeight: 600,
  marginBottom: 'var(--forge-spacing-medium)' 
}}>
  Section Title
</h2>

// Card title (h3)
<CardTitle style={{ 
  fontSize: 'var(--text-lg)', 
  fontWeight: 600 
}}>
  Card Title
</CardTitle>
```

#### Body Text

```typescript
// Default body text
<p style={{ fontSize: 'var(--text-base)' }}>
  Regular paragraph text
</p>

// Small text
<span style={{ fontSize: 'var(--text-sm)' }}>
  Smaller supporting text
</span>

// Caption text
<span style={{ fontSize: 'var(--text-xs)' }}>
  Caption or helper text
</span>
```

#### Labels & Inputs

```typescript
// Label
<label style={{ 
  fontSize: 'var(--text-sm)', 
  fontWeight: 500 
}}>
  Field Label
</label>

// Input placeholder
<Input placeholder="Enter value..." />  // Uses text-base by default
```

### Line Height

```css
/* Tight - Headings */
line-height: 1.25;

/* Normal - Body text */
line-height: 1.5;

/* Relaxed - Long-form content */
line-height: 1.75;
```

### Typography Guidelines

✓ **DO:**
- Use Roboto for all text
- Use appropriate font weights for hierarchy
- Maintain consistent line heights
- Use CSS variables for font sizes
- Follow type scale

✗ **DON'T:**
- Mix multiple font families
- Use arbitrary font sizes
- Override line heights without reason
- Use all caps extensively
- Create custom font weights

---

## Spacing

### Spacing Scale

```css
--forge-spacing-xsmall: 0.25rem;    /* 4px */
--forge-spacing-small: 0.5rem;      /* 8px */
--forge-spacing-medium: 1rem;       /* 16px */
--forge-spacing-large: 1.5rem;      /* 24px */
--forge-spacing-xlarge: 2rem;       /* 32px */
--forge-spacing-2xlarge: 3rem;      /* 48px */
--forge-spacing-3xlarge: 4rem;      /* 64px */
```

### Tailwind Spacing Equivalents

| Token | Tailwind | Pixels |
|-------|----------|--------|
| xsmall | p-1 | 4px |
| small | p-2 | 8px |
| medium | p-4 | 16px |
| large | p-6 | 24px |
| xlarge | p-8 | 32px |

### Spacing Usage

#### Page Padding

```typescript
// Page container
<div style={{ padding: 'var(--forge-spacing-xlarge)' }}>
  {/* Page content */}
</div>
```

#### Component Spacing

```typescript
// Card padding
<Card>
  <CardHeader className="p-6">...</CardHeader>
  <CardContent className="p-6 pt-0">...</CardContent>
</Card>

// Section margins
<section style={{ marginBottom: 'var(--forge-spacing-large)' }}>
  {/* Content */}
</section>
```

#### Grid Gaps

```typescript
// Stats grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Cards */}
</div>

// Form layout
<div className="grid grid-cols-2 gap-4">
  {/* Form fields */}
</div>
```

### Spacing Guidelines

**Consistent Spacing:**
- Page padding: `xlarge` (32px)
- Section margins: `large` (24px)
- Card padding: `medium` to `large` (16-24px)
- Element gaps: `small` to `medium` (8-16px)
- Icon spacing: `xsmall` to `small` (4-8px)

---

## Layout

### Container Widths

```typescript
// Full width (default)
<div className="w-full">

// Max width for content
<div className="max-w-7xl mx-auto">

// Page container with padding
<div className="w-full" style={{ padding: 'var(--forge-spacing-xlarge)' }}>
```

### Grid System

**Responsive Grid:**
```typescript
// 1 column mobile, 2 tablet, 4 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

// 2 column layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// 3 column layout
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
```

**Flexbox Layout:**
```typescript
// Horizontal alignment
<div className="flex items-center justify-between">

// Vertical stack
<div className="flex flex-col gap-4">

// Center content
<div className="flex items-center justify-center">
```

### Common Layouts

#### Page Header
```typescript
<div className="flex items-center justify-between" 
     style={{ marginBottom: 'var(--forge-spacing-large)' }}>
  <div>
    <h1 style={{ margin: 0, marginBottom: '8px' }}>Page Title</h1>
    <p className="text-muted-foreground" style={{ margin: 0 }}>
      Description text
    </p>
  </div>
  <div className="flex gap-2">
    <Button>Action 1</Button>
    <Button variant="outline">Action 2</Button>
  </div>
</div>
```

#### Statistics Grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" 
     style={{ marginBottom: 'var(--forge-spacing-large)' }}>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

#### Data Table
```typescript
<Card style={{ boxShadow: 'var(--forge-elevation-1)' }}>
  <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle>Table Title</CardTitle>
    <Button variant="outline" size="sm">Export</Button>
  </CardHeader>
  <CardContent>
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* Table content */}
      </table>
    </div>
  </CardContent>
</Card>
```

---

## Components

### Card Component

**Anatomy:**
```typescript
<Card style={{ boxShadow: 'var(--forge-elevation-1)' }}>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Footer actions */}
  </CardFooter>
</Card>
```

**Variants:**
- Standard card with elevation-1 shadow
- Flat card (no shadow)
- Bordered card

### Button Component

**Variants:**
```typescript
// Primary (default)
<Button variant="default">Primary Action</Button>

// Secondary
<Button variant="secondary">Secondary Action</Button>

// Outline
<Button variant="outline">Outline Button</Button>

// Destructive
<Button variant="destructive">Delete</Button>

// Ghost
<Button variant="ghost">Ghost Button</Button>

// Link
<Button variant="link">Link Button</Button>
```

**Sizes:**
```typescript
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

**With Icons:**
```typescript
<Button>
  <Download className="mr-2 h-4 w-4" />
  Download
</Button>
```

### Badge Component

**Variants:**
```typescript
// Default
<Badge>Default</Badge>

// Secondary
<Badge variant="secondary">Secondary</Badge>

// Destructive
<Badge variant="destructive">Critical</Badge>

// Outline
<Badge variant="outline">Outline</Badge>
```

**Custom Colors:**
```typescript
// Success (green)
<Badge className="bg-green-100 text-green-700 border-green-300">
  Active
</Badge>

// Warning (orange)
<Badge className="bg-orange-100 text-orange-700 border-orange-300">
  Warning
</Badge>

// Info (blue)
<Badge className="bg-blue-100 text-blue-700 border-blue-300">
  Info
</Badge>
```

### Avatar Component

**Basic Usage:**
```typescript
<Avatar className="h-10 w-10">
  <AvatarImage 
    src={imageUrl}
    alt={name}
    className="object-cover"
  />
  <AvatarFallback className="bg-primary/10 text-primary">
    JD
  </AvatarFallback>
</Avatar>
```

**Sizes:**
```typescript
<Avatar className="h-8 w-8">   {/* Small (32px) */}
<Avatar className="h-10 w-10"> {/* Medium (40px) - Default */}
<Avatar className="h-12 w-12"> {/* Large (48px) */}
<Avatar className="h-16 w-16"> {/* Extra Large (64px) */}
```

**With Text:**
```typescript
<div className="flex items-center gap-3">
  <Avatar className="h-10 w-10">...</Avatar>
  <div>
    <div style={{ fontWeight: 500 }}>Name</div>
    <div className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
      Subtitle
    </div>
  </div>
</div>
```

### Input Component

**Text Input:**
```typescript
<Input 
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

**With Icon:**
```typescript
<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input
    placeholder="Search..."
    className="pl-10"
  />
</div>
```

### Select Component

**Basic Select:**
```typescript
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

### Dialog Component

**Modal Dialog:**
```typescript
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="max-w-3xl max-h-[85vh]">
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description text
      </DialogDescription>
    </DialogHeader>
    <div className="overflow-y-auto flex-1">
      {/* Scrollable content */}
    </div>
  </DialogContent>
</Dialog>
```

### Table Component

**Sortable Table:**
```typescript
<table className="w-full">
  <thead>
    <tr className="border-b">
      <th className="text-left p-3" style={{ fontWeight: 500 }}>
        <button 
          onClick={() => handleSort('column')}
          className="flex items-center hover:text-primary transition-colors cursor-pointer"
        >
          Column Name
          <SortIcon column="column" />
        </button>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b hover:bg-accent/50">
      <td className="p-3">Cell content</td>
    </tr>
  </tbody>
</table>
```

**Sort Icon:**
```typescript
const SortIcon = ({ column }) => {
  if (sortColumn !== column) {
    return <ChevronsUpDown className="h-4 w-4 ml-1 text-muted-foreground" />;
  }
  return sortDirection === 'asc' 
    ? <ChevronUp className="h-4 w-4 ml-1" /> 
    : <ChevronDown className="h-4 w-4 ml-1" />;
};
```

---

## Icons

### Icon Library

**Lucide React** is the standard icon library:

```typescript
import { 
  Search, 
  Download, 
  AlertTriangle,
  CheckCircle,
  User,
  Calendar
} from 'lucide-react';
```

### Icon Sizes

```typescript
// Extra small (12px)
<Icon className="h-3 w-3" />

// Small (16px) - Default
<Icon className="h-4 w-4" />

// Medium (20px)
<Icon className="h-5 w-5" />

// Large (24px)
<Icon className="h-6 w-6" />
```

### Icon Colors

```typescript
// Primary
<Icon className="h-4 w-4 text-primary" />

// Muted
<Icon className="h-4 w-4 text-muted-foreground" />

// Brand
<Icon className="h-4 w-4" style={{ color: 'var(--brand-blue-dark)' }} />

// Status colors
<Icon className="h-4 w-4 text-green-600" />  // Success
<Icon className="h-4 w-4 text-orange-600" /> // Warning
<Icon className="h-4 w-4 text-red-600" />    // Error
```

### Common Icons

| Purpose | Icon | Usage |
|---------|------|-------|
| Search | `<Search />` | Search inputs |
| Export | `<Download />` | Export actions |
| Alert | `<AlertTriangle />` | Warnings, alerts |
| Success | `<CheckCircle />` | Success states |
| User | `<User />` | User profiles |
| Calendar | `<Calendar />` | Dates |
| Location | `<MapPin />` | Locations |
| Vehicle | `<Bus />` | Vehicles |
| Phone | `<Phone />` | Contact info |
| Email | `<Mail />` | Email |

### Icon Guidelines

✓ **DO:**
- Use consistent icon sizes within components
- Pair icons with labels when possible
- Use semantic icons (e.g., trash for delete)
- Maintain proper spacing around icons

✗ **DON'T:**
- Mix icon libraries
- Use decorative icons excessively
- Create custom icons without design review
- Use icons without proper labels (accessibility)

---

## Elevation & Shadows

### Shadow Scale

```css
--forge-elevation-0: none;
--forge-elevation-1: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--forge-elevation-2: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--forge-elevation-3: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--forge-elevation-4: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### Usage

```typescript
// Cards (most common)
<Card style={{ boxShadow: 'var(--forge-elevation-1)' }}>

// Popovers and dropdowns
<Popover style={{ boxShadow: 'var(--forge-elevation-2)' }}>

// Dialogs and modals
<Dialog style={{ boxShadow: 'var(--forge-elevation-3)' }}>

// Floating action buttons
<Button style={{ boxShadow: 'var(--forge-elevation-2)' }}>
```

### Tailwind Equivalents

| Token | Tailwind |
|-------|----------|
| elevation-0 | shadow-none |
| elevation-1 | shadow-sm |
| elevation-2 | shadow-md |
| elevation-3 | shadow-lg |
| elevation-4 | shadow-xl |

---

## Border Radius

### Radius Scale

```css
--forge-radius-small: 0.25rem;    /* 4px */
--forge-radius-medium: 0.375rem;  /* 6px */
--forge-radius-large: 0.5rem;     /* 8px */
--forge-radius-xlarge: 0.75rem;   /* 12px */
--forge-radius-full: 9999px;      /* Fully rounded */
```

### Usage

```typescript
// Buttons, inputs, badges
className="rounded-md"  // medium (6px)

// Cards
className="rounded-lg"  // large (8px)

// Avatars, circular elements
className="rounded-full"  // fully rounded
```

### Tailwind Equivalents

| Token | Tailwind | Pixels |
|-------|----------|--------|
| small | rounded-sm | 4px |
| medium | rounded-md | 6px |
| large | rounded-lg | 8px |
| xlarge | rounded-xl | 12px |
| full | rounded-full | circle |

---

## Responsive Design

### Breakpoints

```css
/* Mobile (default) */
/* 0 - 767px */

/* Tablet (md) */
@media (min-width: 768px) { }

/* Desktop (lg) */
@media (min-width: 1024px) { }

/* Large Desktop (xl) */
@media (min-width: 1280px) { }
```

### Responsive Utilities

```typescript
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

// Responsive padding
<div className="p-4 md:p-6 lg:p-8">

// Responsive text size
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// Show/hide on breakpoints
<div className="hidden md:block">  // Hide on mobile
<div className="block md:hidden">  // Show only on mobile
```

### Mobile-First Approach

Design for mobile first, then enhance for larger screens:

```typescript
// Mobile: Stack vertically
// Tablet: 2 columns
// Desktop: 4 columns
<div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4">
```

---

## Accessibility

### Color Contrast

All text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)

### Keyboard Navigation

```typescript
// Focusable elements
<button className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">

// Tab order
tabIndex={0}  // In natural tab order
tabIndex={-1} // Focusable but not in tab order
```

### ARIA Labels

```typescript
// Button with icon only
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

// Icon with screen reader text
<span className="sr-only">Delete</span>
<Trash2 className="h-4 w-4" aria-hidden="true" />

// Form labels
<label htmlFor="search">Search</label>
<input id="search" />
```

### Screen Reader Support

```typescript
// Hidden from visual but available to screen readers
<span className="sr-only">Additional context</span>

// Hide decorative elements
<Icon aria-hidden="true" />

// Live regions for dynamic content
<div role="status" aria-live="polite">
  Status updated
</div>
```

---

## Usage Guidelines

### Design Checklist

When creating new components or pages:

- [ ] Use design tokens for all values
- [ ] Follow spacing scale
- [ ] Use Roboto font family
- [ ] Apply appropriate elevation
- [ ] Ensure color contrast
- [ ] Add hover states
- [ ] Support keyboard navigation
- [ ] Include ARIA labels
- [ ] Test responsive breakpoints
- [ ] Validate against design system

### Code Examples

#### Complete Card Example

```typescript
<Card style={{ boxShadow: 'var(--forge-elevation-1)' }}>
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
      Card Title
    </CardTitle>
    <Icon className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--brand-blue-dark)' }}>
      100
    </div>
    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: '4px' }}>
      Description text
    </p>
  </CardContent>
</Card>
```

#### Complete Form Field

```typescript
<div className="space-y-2">
  <label 
    htmlFor="field" 
    style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
  >
    Field Label
  </label>
  <Input
    id="field"
    type="text"
    placeholder="Enter value..."
    value={value}
    onChange={(e) => setValue(e.target.value)}
    aria-describedby="field-description"
  />
  <p 
    id="field-description" 
    className="text-muted-foreground" 
    style={{ fontSize: 'var(--text-xs)' }}
  >
    Helper text for this field
  </p>
</div>
```

### Design System Updates

To update the design system:

1. **Update globals.css:**
   - Modify CSS variables in `/styles/globals.css`
   - All components automatically inherit changes

2. **Test Changes:**
   - Verify across all pages
   - Check color contrast
   - Test responsive behavior

3. **Document Changes:**
   - Update this design system guide
   - Note in changelog
   - Communicate to team

---

## Resources

### Design Files
- Tyler Forge 3.x Design System (internal)
- District Brand Guidelines (internal)
- Component Specifications (internal)

### Tools
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessibility Checker](https://www.accessibilitychecker.org/)
- [Color Palette Generator](https://coolors.co/)

### References
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)

---

**Document Version:** 1.0.0  
**Last Updated:** January 27, 2026  
**Maintained By:** Design Team & Development Team
