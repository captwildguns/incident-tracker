# Student Transportation Incident Tracker

## Overview

The Student Transportation Incident Tracker is a comprehensive web application designed for school districts to capture, manage, and communicate student incidents during transportation. Built with React, TypeScript, and Tailwind CSS, it implements the Tyler Forge 3.x design system with custom district branding.

## Key Features

### 📊 Dashboard
- Real-time incident statistics and trends
- Interactive charts showing incidents by severity, type, and school
- Quick action buttons for common tasks
- Recent incident timeline with filtering

### 📋 Incident Management
- Comprehensive incident listing with advanced filtering
- Sortable columns with visual indicators
- Status tracking (Open, Under Review, Resolved, Closed)
- Severity classification (Critical, High, Medium, Low)
- Detailed incident view with complete information
- **Enhanced incident detail tabs** with workflow tracking and complete history

### 🔄 Workflow System ⭐ **NEW**
- **Automated workflow assignment** based on incident type and severity
- **Visual workflow builder** for creating custom district processes
- **Step-by-step progress tracking** with completion datetime stamps
- **Role-based assignments** (Driver, Safety Coordinator, Director, etc.)
- **Approval workflows** for decisions requiring oversight
- **Complete audit trail** in History tab with full datetime tracking
- **Automated notifications** at each workflow milestone
- **Default workflows included** for common incident types
- **Performance metrics** and completion tracking

### 👥 Student Management
- Student profiles with photos
- Associated incident history
- Grade level and contact information
- Active incident indicators
- Sortable columns for all data fields

### 🚗 Fleet Management (Vehicles)
- Complete vehicle inventory with bus images
- Maintenance status tracking
- GPS/AVL integration details
- Mileage and hourmeter monitoring
- Incident count per vehicle
- Sortable columns with visual indicators

### 👨‍✈️ Driver Management
- Driver profiles with photos
- Contact information and employment details
- Vehicle and run assignments
- Safety rating tracking
- Certification status monitoring
- Sortable columns for all data fields

### 📝 New Incident Entry
- Step-by-step incident reporting wizard
- Validation and error handling
- Auto-save functionality
- Attachment support
- Witness information capture

### 📊 Reports & Analytics
- Quick report generation
- Custom report builder
- Export capabilities (CSV, PDF)
- Trend analysis
- Compliance reporting

### 💬 Driver Communications
- Centralized communication hub for safety coordinators
- Track all driver communications regarding incidents
- Message threading and history
- Communication status tracking
- Filter by driver, incident, or date range

## Design System

### Brand Colors
The application uses custom district branding colors extracted from the district logo:

**Deep Blues:**
- Primary: `#4A6FA5`
- Medium: `#5B8BB8`
- Light: `#6B9BC5`

**Olives:**
- Dark: `#7B8458`
- Medium: `#8B9264`
- Light: `#9FA870`

### Typography
- **Font Family:** Roboto (all text elements)
- **Scale:** Follows Tyler Forge typography tokens
- Custom CSS variables for consistent sizing

### Design Tokens
The application implements 57 color tokens, elevation tokens, spacing tokens, and border radius tokens from the Tyler Forge 3.x design system, all defined in `/styles/globals.css`.

## Technology Stack

- **Frontend:** React 18+ with TypeScript
- **Styling:** Tailwind CSS v4.0 with custom design tokens
- **UI Components:** Custom component library based on Tyler Forge 3.x
- **Icons:** Lucide React
- **Charts:** Recharts
- **State Management:** React Hooks (useState)
- **Build Tool:** Vite

## Project Structure

```
/
├── App.tsx                          # Main application entry point
├── components/
│   ├── dashboard/
│   │   └── DashboardPage.tsx        # Dashboard with statistics and charts
│   ├── incidents/
│   │   └── IncidentsPage.tsx        # Incident management interface
│   ├── students/
│   │   └── StudentsPage.tsx         # Student management with photos
│   ├── vehicles/
│   │   ├── VehiclesPage.tsx         # Fleet management with bus images
│   │   └── bus-icons.tsx            # SVG bus type icons
│   ├── drivers/
│   │   └── DriversPage.tsx          # Driver management with photos
│   ├── new-incident/
│   │   └── NewIncidentPage.tsx      # Incident entry form wizard
│   ├── reports/
│   │   └── ReportsPage.tsx          # Reporting and analytics
│   ├── driver-communications/
│   │   └── DriverCommunicationsPage.tsx # Communication hub
│   ├── ui/                          # Reusable UI components
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── avatar.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   └── ... (other UI components)
│   └── figma/
│       └── ImageWithFallback.tsx    # Protected image component
├── imports/                         # Bus images and imported assets
├── styles/
│   └── globals.css                  # Design system tokens and variables
└── docs/                            # Documentation
    ├── README.md                    # This file
    ├── AI-BUILD-STORY.md            # **NEW! Hackathon guide - How this was built with AI**
    ├── AI-DEVELOPMENT-GUIDE.md      # **START HERE for AI-assisted development**
    ├── USER-GUIDE.md                # End-user documentation
    ├── TECHNICAL-DOCUMENTATION.md   # Developer documentation
    ├── DESIGN-SYSTEM.md             # Design system reference
    ├── FEATURES.md                  # Detailed feature documentation
    └── WORKFLOW-SYSTEM.md           # **NEW! Complete workflow system documentation**
```

## For AI Assistants / Code Generation

**⚠️ IMPORTANT:** If you are an AI assistant (like Claude) generating or modifying code for this application, you **MUST** read `/docs/AI-DEVELOPMENT-GUIDE.md` first.

This guide contains:
- **Mandatory design system requirements** (CSS variables ONLY)
- **Typography rules** (Roboto font ONLY, use CSS tokens)
- **Component patterns** with complete code examples
- **Common mistakes to avoid**
- **Quick reference** for most-used design tokens

**Golden Rules for AI:**
1. ✅ ALL styling MUST use CSS variables from `/styles/globals.css`
2. ❌ NEVER hardcode colors, fonts, spacing, or shadows
3. ✅ Font family is ALWAYS Roboto (inherited from globals.css, don't specify)
4. ✅ Use `--forge-spacing-*`, `--text-*`, `--brand-*`, `--forge-elevation-*` tokens
5. ✅ Follow existing component patterns exactly

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd incident-tracker
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Key UI Patterns

### Navigation
- **Omnibar:** Indigo-branded header with Tyler logo and navigation menu
- **Page Layout:** Consistent spacing using design tokens
- **Responsive Design:** Mobile-first approach with breakpoints

### Data Tables
- **Sortable Columns:** Click headers to sort ascending/descending
- **Visual Indicators:** Chevron icons show sort direction (↑↓)
- **Hover Effects:** Interactive feedback on clickable elements
- **Filtering:** Search and dropdown filters for data refinement

### Cards
- **Elevation:** Consistent shadow tokens for depth
- **Spacing:** Uniform padding using spacing tokens
- **Content Hierarchy:** Clear visual hierarchy with typography scale

### Forms
- **Validation:** Real-time field validation
- **Error States:** Clear error messaging
- **Success Feedback:** Confirmation dialogs and toasts
- **Progressive Disclosure:** Multi-step forms with wizard pattern

### Dialogs
- **Detail Views:** Modal dialogs for complete record information
- **Confirmation:** Action confirmation for destructive operations
- **Max Height:** Scrollable content for long records

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- **Component Optimization:** Memoization where appropriate
- **Image Optimization:** Lazy loading for images
- **Code Splitting:** Run-based code splitting
- **Bundle Size:** Tree shaking and minification

## Accessibility

- **ARIA Labels:** Proper labeling for screen readers
- **Keyboard Navigation:** Full keyboard support
- **Color Contrast:** WCAG AA compliant color combinations
- **Focus Indicators:** Visible focus states

## Future Enhancements

- Real-time notifications
- Mobile application
- Advanced analytics dashboard
- Integration with student information systems
- GPS tracking integration
- Automated incident detection

## Support

For technical support or questions, please contact your district's transportation department.

## License

Proprietary - All rights reserved by the school district.

---

**Version:** 1.0.0  
**Last Updated:** January 27, 2026  
**Maintained By:** District Transportation Department