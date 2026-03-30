# Student Transportation Incident Tracker - Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Component Documentation](#component-documentation)
5. [State Management](#state-management)
6. [Data Models](#data-models)
7. [Styling System](#styling-system)
8. [Development Guide](#development-guide)
9. [Build and Deployment](#build-and-deployment)
10. [Testing](#testing)
11. [Performance Optimization](#performance-optimization)
12. [Security Considerations](#security-considerations)

---

## Architecture Overview

### Application Architecture

The Student Transportation Incident Tracker is a single-page application (SPA) built with React and TypeScript, implementing a component-based architecture with the following layers:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components + Tyler Forge UI)   │
├─────────────────────────────────────────┤
│         State Management Layer          │
│     (React Hooks - useState)            │
├─────────────────────────────────────────┤
│         Business Logic Layer            │
│  (Filtering, Sorting, Validation)       │
├─────────────────────────────────────────┤
│         Data Layer (Mock Data)          │
│   (Future: API Integration Layer)       │
└─────────────────────────────────────────┘
```

### Design Patterns

1. **Component Composition:** Small, reusable components composed into larger page components
2. **Container/Presentational:** Pages act as containers managing state, UI components handle presentation
3. **Custom Hooks:** Reusable logic extracted into custom hooks (future enhancement)
4. **Prop Drilling:** Navigation callback passed through component tree
5. **Render Props:** Dialog components use render props pattern for trigger elements

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18+ | UI framework |
| TypeScript | 5+ | Type safety and developer experience |
| Vite | 5+ | Build tool and dev server |
| Tailwind CSS | 4.0 | Utility-first styling |

### UI Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| Lucide React | Latest | Icon system |
| Recharts | 2+ | Data visualization |
| Radix UI | Latest | Headless UI primitives |

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| TypeScript ESLint | TypeScript-specific linting |

---

## Project Structure

```
incident-tracker/
│
├── public/                          # Static assets
│   └── (none currently)
│
├── src/
│   ├── App.tsx                      # Root component with navigation
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── DashboardPage.tsx    # Dashboard with stats and charts
│   │   │
│   │   ├── incidents/
│   │   │   └── IncidentsPage.tsx    # Incident management page
│   │   │
│   │   ├── students/
│   │   │   └── StudentsPage.tsx     # Student management page
│   │   │
│   │   ├── vehicles/
│   │   │   ├── VehiclesPage.tsx     # Fleet management page
│   │   │   └── bus-icons.tsx        # SVG bus type icons
│   │   │
│   │   ├── drivers/
│   │   │   └── DriversPage.tsx      # Driver management page
│   │   │
│   │   ├── new-incident/
│   │   │   └── NewIncidentPage.tsx  # Multi-step incident form
│   │   │
│   │   ├── reports/
│   │   │   └── ReportsPage.tsx      # Reporting and analytics
│   │   │
│   │   ├── driver-communications/
│   │   │   └── DriverCommunicationsPage.tsx
│   │   │
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── ... (other components)
│   │   │
│   │   └── figma/
│   │       └── ImageWithFallback.tsx # Protected image component
│   │
│   ├── imports/                     # Imported Figma assets
│   │   └── (bus images)
│   │
│   ├── styles/
│   │   └── globals.css              # Design system tokens and base styles
│   │
│   └── main.tsx                     # Application entry point
│
├── docs/                            # Documentation
│   ├── README.md
│   ├── USER-GUIDE.md
│   ├── TECHNICAL-DOCUMENTATION.md
│   ├── DESIGN-SYSTEM.md
│   └── FEATURES.md
│
├── index.html                       # HTML entry point
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── vite.config.ts                   # Vite configuration
└── README.md                        # Project overview

```

---

## Component Documentation

### App Component (`/App.tsx`)

**Purpose:** Root component managing navigation and page routing

**Props:** None

**State:**
```typescript
const [currentPage, setCurrentPage] = useState('dashboard');
```

**Key Features:**
- Omnibar navigation with Tyler branding
- Page switching logic
- Consistent layout structure

**Code Structure:**
```typescript
export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Omnibar */}
      <nav>...</nav>
      
      {/* Page Content */}
      {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
      {/* ... other pages */}
    </div>
  );
}
```

---

### Dashboard Page (`/components/dashboard/DashboardPage.tsx`)

**Purpose:** Display incident overview, statistics, and charts

**Props:**
```typescript
interface DashboardPageProps {
  onNavigate: (page: string) => void;
}
```

**State:**
```typescript
const [timeFilter, setTimeFilter] = useState('30');
const [selectedIncident, setSelectedIncident] = useState<any>(null);
```

**Key Features:**
1. **Summary Statistics Cards:**
   - Total Incidents
   - Active Incidents
   - Critical Incidents
   - Avg Response Time

2. **Charts:**
   - Line Chart: Incident trends over time (Recharts)
   - Pie Chart: Incidents by type
   - Bar Chart: Incidents by school

3. **Recent Incidents Timeline:**
   - Last 5 incidents
   - Click to view details

**Data Flow:**
```typescript
// Mock data at top of file
const mockIncidents = [...];

// Filter based on time period
const filteredIncidents = mockIncidents.filter(incident => {
  // filtering logic
});

// Calculate statistics
const totalIncidents = filteredIncidents.length;
const activeIncidents = filteredIncidents.filter(i => 
  i.status === 'Open' || i.status === 'Under Review'
).length;
```

**Chart Implementation:**
```typescript
<LineChart width={width} height={300} data={trendData}>
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
```

---

### Incidents Page (`/components/incidents/IncidentsPage.tsx`)

**Purpose:** Manage and view all incidents with filtering and sorting

**Props:**
```typescript
interface IncidentsPageProps {
  onNavigate: (page: string) => void;
}
```

**State:**
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState('all');
const [severityFilter, setSeverityFilter] = useState('all');
const [typeFilter, setTypeFilter] = useState('all');
const [sortColumn, setSortColumn] = useState<'id' | 'date' | 'student' | 'driver' | 'vehicle' | 'type' | 'severity' | 'status'>('date');
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
const [selectedIncident, setSelectedIncident] = useState<any>(null);
```

**Key Features:**

1. **Advanced Filtering:**
```typescript
const filteredIncidents = mockIncidents.filter((incident) => {
  const matchesSearch = 
    incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.description.toLowerCase().includes(searchTerm.toLowerCase());
  
  const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
  const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;
  const matchesType = typeFilter === 'all' || incident.type === typeFilter;

  return matchesSearch && matchesStatus && matchesSeverity && matchesType;
});
```

2. **Column Sorting:**
```typescript
const handleSort = (column: typeof sortColumn) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  } else {
    setSortColumn(column);
    setSortDirection('asc');
  }
};

const sortedIncidents = [...filteredIncidents].sort((a, b) => {
  let compareResult = 0;
  
  switch (sortColumn) {
    case 'id':
      compareResult = a.id.localeCompare(b.id);
      break;
    case 'date':
      compareResult = new Date(a.date).getTime() - new Date(b.date).getTime();
      break;
    // ... other cases
  }
  
  return sortDirection === 'asc' ? compareResult : -compareResult;
});
```

3. **Sort Icon Component:**
```typescript
const SortIcon = ({ column }: { column: typeof sortColumn }) => {
  if (sortColumn !== column) {
    return <ChevronsUpDown className="h-4 w-4 ml-1 text-muted-foreground" />;
  }
  return sortDirection === 'asc' 
    ? <ChevronUp className="h-4 w-4 ml-1" /> 
    : <ChevronDown className="h-4 w-4 ml-1" />;
};
```

4. **Export Functionality:**
```typescript
const handleExport = () => {
  const headers = ['Incident ID', 'Date', 'Student', 'Driver', 'Vehicle', 'Type', 'Severity', 'Status'];
  const csvContent = [
    headers.join(','),
    ...filteredIncidents.map(i => [
      i.id,
      i.date,
      `"${i.studentName}"`,
      `"${i.driverName}"`,
      i.vehicle,
      i.type,
      i.severity,
      i.status
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `incidents-export-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
```

---

### Students Page (`/components/students/StudentsPage.tsx`)

**Purpose:** Manage student records and view incident associations

**Props:**
```typescript
interface StudentsPageProps {
  onNavigate: (page: string) => void;
}
```

**State:**
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [gradeFilter, setGradeFilter] = useState('all');
const [sortColumn, setSortColumn] = useState<'id' | 'name' | 'grade' | 'school' | 'contact' | 'route' | 'incidents' | 'lastIncident'>('name');
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
const [selectedStudent, setSelectedStudent] = useState<any>(null);
```

**Key Features:**

1. **Student Photos with Avatar Component:**
```typescript
<td className="p-3">
  <div className="flex items-center gap-3">
    <Avatar className="h-10 w-10">
      <AvatarImage 
        src={student.photoUrl}
        alt={student.name}
        className="object-cover"
      />
      <AvatarFallback className="bg-primary/10 text-primary" style={{ fontSize: '0.875rem' }}>
        {student.name.split(' ').map(n => n[0]).join('')}
      </AvatarFallback>
    </Avatar>
    <div>
      <div style={{ fontWeight: 500 }}>{student.name}</div>
      {hasActiveIncidents && (
        <div className="flex items-center gap-1 mt-0.5">
          <Badge className="h-5 text-xs bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>
      )}
    </div>
  </div>
</td>
```

2. **Active Incident Detection:**
```typescript
const hasActiveIncidents = student.incidents.some((incident: any) => 
  incident.status !== 'Closed'
);
```

3. **Sortable Columns:**
All columns sortable with visual indicators (same pattern as Incidents page)

---

### Vehicles Page (`/components/vehicles/VehiclesPage.tsx`)

**Purpose:** Fleet management with bus images and maintenance tracking

**Props:**
```typescript
interface VehiclesPageProps {
  onNavigate: (page: string) => void;
}
```

**State:**
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState('all');
const [maintenanceFilter, setMaintenanceFilter] = useState('all');
const [sortColumn, setSortColumn] = useState<'id' | 'details' | 'driver' | 'route' | 'status' | 'maintenance' | 'incidents' | 'mileage'>('details');
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
```

**Key Features:**

1. **Bus Image Helper Function:**
```typescript
const getBusImage = (make: string, model: string) => {
  const key = `${make} ${model}`;
  const imageMap: { [key: string]: string } = {
    'Blue Bird Vision': blueBirdVisionImage,
    'IC Bus CE Series': icBusCESeriesImage,
    'Thomas Saf-T-Liner C2': thomasSafTLinerC2Image,
    'Blue Bird All American': blueBirdAllAmericanImage,
    'Thomas Saf-T-Liner HDX': thomasSafTLinerHDXImage,
  };
  return imageMap[key] || blueBirdVisionImage;
};
```

2. **Bus Images with Avatar:**
```typescript
<td className="p-3">
  <div className="flex items-center gap-3">
    <Avatar className="h-10 w-10">
      <AvatarImage 
        src={getBusImage(vehicle.make, vehicle.model)}
        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        className="object-cover"
      />
      <AvatarFallback className="bg-primary/10 text-primary" style={{ fontSize: '0.75rem' }}>
        {vehicle.name}
      </AvatarFallback>
    </Avatar>
    <div>
      <div style={{ fontWeight: 500 }}>{vehicle.name}</div>
      <div className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </div>
    </div>
  </div>
</td>
```

3. **Maintenance Status Icons:**
```typescript
const getMaintenanceIcon = (status: string) => {
  switch (status) {
    case 'Excellent':
    case 'Good':
      return <CheckCircle className="h-4 w-4" />;
    case 'Needs Attention':
      return <AlertTriangle className="h-4 w-4" />;
    case 'In Repair':
      return <Wrench className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};
```

4. **Custom Maintenance Sorting:**
```typescript
case 'maintenance':
  const maintenanceOrder = { 
    'Excellent': 4, 
    'Good': 3, 
    'Needs Attention': 2, 
    'In Repair': 1 
  };
  compareResult = (maintenanceOrder[a.maintenanceStatus as keyof typeof maintenanceOrder] || 0) - 
                 (maintenanceOrder[b.maintenanceStatus as keyof typeof maintenanceOrder] || 0);
  break;
```

---

### Drivers Page (`/components/drivers/DriversPage.tsx`)

**Purpose:** Driver management with photos and safety tracking

**Props:**
```typescript
interface DriversPageProps {
  onNavigate: (page: string) => void;
}
```

**State:**
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState('all');
const [sortColumn, setSortColumn] = useState<'id' | 'name' | 'contact' | 'vehicle' | 'route' | 'status' | 'safety'>('name');
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
const [selectedDriver, setSelectedDriver] = useState<any>(null);
```

**Key Features:**

1. **Driver Photos with Avatar:**
```typescript
<td className="p-3">
  <div className="flex items-center gap-3">
    <Avatar className="h-10 w-10">
      <AvatarImage 
        src={driver.photo}
        alt={driver.fullName}
        className="object-cover"
      />
      <AvatarFallback className="bg-primary/10 text-primary" style={{ fontSize: '0.875rem' }}>
        {driver.fullName.split(' ').map(n => n[0]).join('')}
      </AvatarFallback>
    </Avatar>
    <div>
      <div style={{ fontWeight: 500 }}>{driver.fullName}</div>
      <div className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
        {driver.employeeId}
      </div>
    </div>
  </div>
</td>
```

2. **Safety Rating Display:**
```typescript
<td className="p-3">
  <div className="flex items-center gap-1">
    <Award className="h-4 w-4 text-yellow-500" />
    <span style={{ fontWeight: 500 }}>{driver.safetyRating}</span>
    <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>/5.0</span>
  </div>
</td>
```

3. **Default Sorting:**
```typescript
// Default sort by name, ascending
const [sortColumn, setSortColumn] = useState<...>('name');
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
```

---

### New Incident Page (`/components/new-incident/NewIncidentPage.tsx`)

**Purpose:** Multi-step form for creating new incident reports

**Props:**
```typescript
interface NewIncidentPageProps {
  onNavigate: (page: string) => void;
}
```

**State:**
```typescript
const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState({
  // Basic Information
  date: new Date().toISOString().split('T')[0],
  time: '',
  type: '',
  severity: '',
  location: '',
  route: '',
  
  // Involved Parties
  studentName: '',
  studentId: '',
  driverName: '',
  driverEmployeeId: '',
  vehicle: '',
  
  // Incident Details
  description: '',
  actionsTaken: '',
  injuriesReported: false,
  injuryDetails: '',
  witnesses: [] as any[],
  
  // Additional Information
  attachments: [] as File[],
  followUpRequired: false,
  assignedTo: '',
  followUpDueDate: '',
  internalNotes: '',
  tags: [] as string[],
});
```

**Key Features:**

1. **Step Navigation:**
```typescript
const steps = [
  { number: 1, title: 'Basic Information', description: 'When and where' },
  { number: 2, title: 'Involved Parties', description: 'Who was involved' },
  { number: 3, title: 'Incident Details', description: 'What happened' },
  { number: 4, title: 'Additional Information', description: 'Attachments and follow-up' },
  { number: 5, title: 'Review & Submit', description: 'Confirm details' },
];

const handleNext = () => {
  if (currentStep < 5) setCurrentStep(currentStep + 1);
};

const handleBack = () => {
  if (currentStep > 1) setCurrentStep(currentStep - 1);
};
```

2. **Form Data Management:**
```typescript
const updateFormData = (field: string, value: any) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};
```

3. **Validation:**
```typescript
const validateStep = (step: number) => {
  switch (step) {
    case 1:
      return formData.date && formData.time && formData.type && formData.severity;
    case 2:
      return formData.studentName && formData.driverName && formData.vehicle;
    case 3:
      return formData.description.length >= 50 && formData.actionsTaken;
    default:
      return true;
  }
};
```

4. **Witness Management:**
```typescript
const addWitness = () => {
  setFormData(prev => ({
    ...prev,
    witnesses: [...prev.witnesses, { name: '', type: '', contact: '', statement: '' }]
  }));
};

const updateWitness = (index: number, field: string, value: string) => {
  setFormData(prev => ({
    ...prev,
    witnesses: prev.witnesses.map((w, i) => 
      i === index ? { ...w, [field]: value } : w
    )
  }));
};
```

---

### Reports Page (`/components/reports/ReportsPage.tsx`)

**Purpose:** Generate reports and analytics

**Props:**
```typescript
interface ReportsPageProps {
  onNavigate: (page: string) => void;
}
```

**State:**
```typescript
const [activeTab, setActiveTab] = useState('quick');
const [selectedReport, setSelectedReport] = useState<string | null>(null);
// Custom Report Builder states
const [dataSource, setDataSource] = useState('incidents');
const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
const [filters, setFilters] = useState<any[]>([]);
const [sortBy, setSortBy] = useState('');
const [groupBy, setGroupBy] = useState('');
```

**Key Features:**

1. **Quick Reports:**
- Predefined report templates
- One-click generation
- Multiple export formats

2. **Custom Report Builder:**
- Multi-step process
- Dynamic column selection
- Advanced filtering
- Sorting and grouping
- Chart visualization options

3. **Export Functionality:**
```typescript
const generateReport = (reportType: string) => {
  // Generate report data
  const reportData = /* data based on reportType */;
  
  // Create export
  const csvContent = convertToCSV(reportData);
  downloadFile(csvContent, `${reportType}-${Date.now()}.csv`);
};
```

---

### Driver Communications Page (`/components/driver-communications/DriverCommunicationsPage.tsx`)

**Purpose:** Centralized driver communication hub

**Props:**
```typescript
interface DriverCommunicationsPageProps {
  onNavigate: (page: string) => void;
}
```

**State:**
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState('all');
const [priorityFilter, setPriorityFilter] = useState('all');
const [selectedCommunication, setSelectedCommunication] = useState<any>(null);
```

**Key Features:**

1. **Communication Tracking:**
- All driver communications in one place
- Status tracking
- Response time monitoring

2. **Communication Thread:**
- Full conversation history
- Timestamps and read receipts
- Attachment support

3. **Templates:**
- Pre-written message templates
- Incident notification templates
- Follow-up request templates

---

### UI Components (`/components/ui/`)

All UI components follow a consistent pattern based on Tyler Forge 3.x design system:

#### Avatar (`/components/ui/avatar.tsx`)

```typescript
export function Avatar({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    />
  );
}

export function AvatarImage({ className, src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      className={`aspect-square h-full w-full ${className}`}
      src={src}
      alt={alt}
      {...props}
    />
  );
}

export function AvatarFallback({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
```

#### Badge (`/components/ui/badge.tsx`)

```typescript
export function Badge({ 
  variant = 'default', 
  className, 
  ...props 
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
        variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/80'
      } ${
        variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      } ${
        variant === 'destructive' && 'bg-destructive text-destructive-foreground hover:bg-destructive/80'
      } ${
        variant === 'outline' && 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
      } ${className}`}
      {...props}
    />
  );
}
```

#### Card (`/components/ui/card.tsx`)

```typescript
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
}
```

#### Button (`/components/ui/button.tsx`)

```typescript
export function Button({ 
  variant = 'default', 
  size = 'default',
  className, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'underline-offset-4 hover:underline text-primary',
  };
  
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
```

---

## State Management

### Current Implementation

The application currently uses React's built-in `useState` hook for state management. Each page component manages its own local state.

**Example:**
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState('all');
const [sortColumn, setSortColumn] = useState('date');
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
```

### State Flow

```
User Interaction
      ↓
Event Handler (e.g., onChange, onClick)
      ↓
State Update (useState setter)
      ↓
React Re-render
      ↓
Updated UI
```

### Future Enhancements

For larger scale applications, consider:

1. **Context API:** Share state across components without prop drilling
2. **Redux/Zustand:** Centralized state management
3. **React Query:** Server state management and caching
4. **Custom Hooks:** Extract reusable stateful logic

---

## Data Models

### Incident Model

```typescript
interface Incident {
  id: string;                    // Unique identifier (e.g., "INC-001")
  date: string;                  // ISO date string
  time: string;                  // HH:MM format
  studentName: string;
  studentId: string;
  driverName: string;
  driverEmployeeId: string;
  vehicle: string;               // Bus number
  route: string;
  type: 'Student Behavior' | 'Safety Violation' | 'Mechanical' | 'Accident' | 'Other';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Under Review' | 'Resolved' | 'Closed';
  description: string;
  actionsTaken: string;
  injuriesReported: boolean;
  injuryDetails?: string;
  location: string;
  witnesses: Witness[];
  attachments?: File[];
  followUpRequired: boolean;
  assignedTo?: string;
  internalNotes?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}
```

### Student Model

```typescript
interface Student {
  id: string;                    // Student ID (e.g., "STU-12345")
  name: string;
  photoUrl: string;              // URL to student photo
  grade: string;                 // K-12
  school: string;
  dateOfBirth: string;
  contact: string;               // Primary phone
  secondaryContact?: string;
  email?: string;
  emergencyContact: string;
  route: string;
  pickupLocation: string;
  dropoffLocation: string;
  specialNeeds?: string;
  medicalConditions?: string;
  allergies?: string;
  incidents: Incident[];         // Associated incidents
  activeIncidents: boolean;      // Has open incidents
}
```

### Vehicle Model

```typescript
interface Vehicle {
  id: string;                    // Vehicle ID (e.g., "VEH-015")
  name: string;                  // Bus name (e.g., "Bus 15")
  make: string;                  // Manufacturer
  model: string;                 // Model name
  year: number;
  vin: string;                   // Vehicle Identification Number
  licensePlate: string;
  capacity: number;              // Passenger capacity
  status: 'Active' | 'Maintenance' | 'Inactive';
  driver: string;                // Assigned driver name
  primaryRoute: string;
  secondaryRoute?: string;
  defaultGarage: string;
  midDayGarage: string;
  gpsHardwareId: string;
  hourmeter: number;             // Engine hours
  useTydAvl: boolean;            // AVL integration enabled
  lastInspection: string;        // ISO date
  nextInspection: string;        // ISO date
  maintenanceStatus: 'Excellent' | 'Good' | 'Needs Attention' | 'In Repair';
  incidentCount: number;
  mileage: number;
  fuelType: string;
  notes?: string;
}
```

### Driver Model

```typescript
interface Driver {
  id: string;                    // Employee ID (e.g., "DRV-1001")
  employeeId: string;
  fullName: string;
  photo: string;                 // URL to driver photo
  phone: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  hireDate: string;              // ISO date
  assignedVehicle: string;       // Bus number
  primaryRoute: string;
  secondaryRoute?: string;
  safetyRating: number;          // 0-5.0
  cdlNumber: string;
  cdlClass: string;              // A, B, C
  cdlExpiration: string;
  firstAidCertified: boolean;
  firstAidExpiration?: string;
  defensiveDrivingDate?: string;
  specialTraining?: string[];
  incidentCount: number;
  violations: number;
  commendations: number;
  lastEvaluation?: string;
}
```

### Communication Model

```typescript
interface Communication {
  id: string;                    // Communication ID
  date: string;                  // ISO date
  driverName: string;
  driverPhoto: string;
  relatedIncidentId?: string;
  type: 'Email' | 'Phone' | 'In-Person' | 'Text Message';
  subject: string;
  status: 'Pending Response' | 'Responded' | 'Acknowledged' | 'Follow-up Required';
  priority: 'High' | 'Medium' | 'Low';
  messages: Message[];
  attachments?: File[];
}

interface Message {
  id: string;
  sender: string;
  timestamp: string;
  content: string;
  read: boolean;
}
```

### Witness Model

```typescript
interface Witness {
  name: string;
  type: 'Student' | 'Staff' | 'Parent' | 'Other';
  contact: string;
  statement: string;
}
```

---

## Styling System

### Tailwind CSS v4.0

The application uses Tailwind CSS v4.0 with custom configuration.

**Configuration File:** `tailwind.config.js`

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Design System Tokens

All design tokens are defined in `/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Brand Colors - Blues */
    --brand-blue-dark: #4A6FA5;
    --brand-blue-medium: #5B8BB8;
    --brand-blue-light: #6B9BC5;
    
    /* Brand Colors - Olives */
    --brand-olive-dark: #7B8458;
    --brand-olive-medium: #8B9264;
    --brand-olive-light: #9FA870;
    
    /* Typography */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;
    
    /* Spacing */
    --forge-spacing-xsmall: 0.25rem;
    --forge-spacing-small: 0.5rem;
    --forge-spacing-medium: 1rem;
    --forge-spacing-large: 1.5rem;
    --forge-spacing-xlarge: 2rem;
    
    /* Elevation (Shadows) */
    --forge-elevation-0: none;
    --forge-elevation-1: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --forge-elevation-2: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --forge-elevation-3: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    
    /* Border Radius */
    --forge-radius-small: 0.25rem;
    --forge-radius-medium: 0.375rem;
    --forge-radius-large: 0.5rem;
    --forge-radius-xlarge: 0.75rem;
    
    /* Additional color tokens (57 total) */
    /* ... see /styles/globals.css for complete list */
  }
  
  body {
    font-family: 'Roboto', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
  }
}
```

### Using Design Tokens

**In Components:**
```typescript
// Use CSS variables directly
<div style={{ 
  padding: 'var(--forge-spacing-large)',
  boxShadow: 'var(--forge-elevation-1)',
  borderRadius: 'var(--forge-radius-medium)'
}}>
  Content
</div>

// Or use Tailwind utilities
<div className="p-4 shadow-sm rounded-md">
  Content
</div>
```

### Typography System

All typography uses Roboto font family:

```css
/* Font weights */
font-weight: 400;  /* Normal */
font-weight: 500;  /* Medium - used for emphasis */
font-weight: 600;  /* Semibold - used for headings */
font-weight: 700;  /* Bold - used for statistics */

/* Font sizes */
style={{ fontSize: 'var(--text-sm)' }}
style={{ fontSize: 'var(--text-base)' }}
style={{ fontSize: 'var(--text-lg)' }}
style={{ fontSize: 'var(--text-xl)' }}
style={{ fontSize: 'var(--text-2xl)' }}
style={{ fontSize: 'var(--text-3xl)' }}
```

### Color Usage

**Brand Colors:**
```typescript
// Primary actions, headers
color: var(--brand-blue-dark)

// Secondary elements
color: var(--brand-blue-medium)

// Accents
color: var(--brand-olive-medium)
```

**Semantic Colors:**
```typescript
// Success
className="text-green-600"

// Warning
className="text-orange-600"

// Error/Destructive
className="text-red-600"

// Critical
className="bg-red-100 text-red-700"
```

---

## Development Guide

### Setup Development Environment

1. **Clone Repository:**
```bash
git clone <repository-url>
cd incident-tracker
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Start Development Server:**
```bash
npm run dev
```

4. **Open Browser:**
Navigate to `http://localhost:5173`

### Development Workflow

1. **Create Feature Branch:**
```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes:**
- Edit components in `/src/components/`
- Update styles in `/src/styles/globals.css`
- Test changes in browser

3. **Commit Changes:**
```bash
git add .
git commit -m "Description of changes"
```

4. **Push and Create PR:**
```bash
git push origin feature/your-feature-name
```

### Code Style Guidelines

**TypeScript:**
- Use TypeScript for all new files
- Define interfaces for props and data models
- Use type annotations for state variables
- Avoid `any` types when possible

**React Components:**
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components focused on single responsibility
- Use meaningful component and prop names

**Styling:**
- Use Tailwind utility classes when possible
- Use CSS variables for custom values
- Follow Tyler Forge design system guidelines
- Maintain consistent spacing and typography

**File Organization:**
- One component per file
- Group related components in directories
- Keep file names consistent with component names
- Use lowercase with hyphens for file names

### Adding New Features

#### Adding a New Page

1. Create component file:
```bash
touch src/components/your-page/YourPage.tsx
```

2. Define component:
```typescript
interface YourPageProps {
  onNavigate: (page: string) => void;
}

export function YourPage({ onNavigate }: YourPageProps) {
  return (
    <div style={{ padding: 'var(--forge-spacing-xlarge)' }}>
      {/* Your content */}
    </div>
  );
}
```

3. Add to App.tsx:
```typescript
import { YourPage } from './components/your-page/YourPage';

// In navigation
<button onClick={() => handleNavigate('yourpage')}>
  Your Page
</button>

// In content area
{currentPage === 'yourpage' && <YourPage onNavigate={handleNavigate} />}
```

#### Adding a New UI Component

1. Create component file:
```bash
touch src/components/ui/your-component.tsx
```

2. Define component:
```typescript
import React from 'react';

interface YourComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'custom';
}

export function YourComponent({ variant = 'default', className, ...props }: YourComponentProps) {
  return (
    <div
      className={`base-styles ${variant === 'custom' && 'custom-styles'} ${className}`}
      {...props}
    />
  );
}
```

3. Use in pages:
```typescript
import { YourComponent } from '../ui/your-component';

<YourComponent variant="custom">
  Content
</YourComponent>
```

### Debugging

**React DevTools:**
- Install React Developer Tools browser extension
- Inspect component hierarchy
- View component props and state
- Profile performance

**Console Logging:**
```typescript
console.log('Current state:', state);
console.table(filteredData);
```

**Breakpoints:**
- Use browser DevTools
- Set breakpoints in source code
- Step through execution

---

## Build and Deployment

### Building for Production

```bash
npm run build
```

This creates optimized production files in `/dist/` directory.

### Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
```

### Deployment Options

#### Static Hosting (Recommended)

1. **Vercel:**
```bash
npm install -g vercel
vercel deploy
```

2. **Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

3. **GitHub Pages:**
```bash
npm run build
git subtree push --prefix dist origin gh-pages
```

#### Server Deployment

1. **Build application:**
```bash
npm run build
```

2. **Copy dist folder to server:**
```bash
scp -r dist/ user@server:/var/www/html/
```

3. **Configure web server (nginx example):**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Environment Variables

Create `.env` file for environment-specific configuration:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Incident Tracker
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Testing

### Manual Testing Checklist

**Dashboard:**
- [ ] Statistics display correctly
- [ ] Charts render properly
- [ ] Time filter changes data
- [ ] Recent incidents clickable
- [ ] Navigation works

**Incidents:**
- [ ] Search filters incidents
- [ ] Dropdown filters work
- [ ] Sorting works on all columns
- [ ] Sort indicators display correctly
- [ ] Incident details open
- [ ] Export generates CSV

**Students:**
- [ ] Photos display correctly
- [ ] Search works
- [ ] Grade filter works
- [ ] Sorting works
- [ ] Active incident badge shows
- [ ] Student details open

**Vehicles:**
- [ ] Bus images display
- [ ] Filters work
- [ ] Sorting works
- [ ] Maintenance icons show
- [ ] Vehicle details open
- [ ] Export works

**Drivers:**
- [ ] Photos display
- [ ] Search works
- [ ] Status filter works
- [ ] Sorting works (defaults to name)
- [ ] Safety ratings display
- [ ] Driver details open

**New Incident:**
- [ ] All steps accessible
- [ ] Form validation works
- [ ] Required fields enforced
- [ ] Witnesses can be added
- [ ] Review shows all data
- [ ] Submit creates incident

**Reports:**
- [ ] Quick reports generate
- [ ] Custom builder works
- [ ] Filters apply correctly
- [ ] Export works
- [ ] Charts display

**Driver Communications:**
- [ ] Communications list displays
- [ ] Filters work
- [ ] Detail view opens
- [ ] Reply functionality works
- [ ] Status updates work

### Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Responsive Testing

Test at breakpoints:
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Alt text on images

---

## Performance Optimization

### Current Optimizations

1. **Code Splitting:** 
   - Vite automatically splits code by route
   - Lazy loading for heavy components

2. **Image Optimization:**
   - Figma assets optimized
   - Unsplash images use CDN

3. **Bundle Optimization:**
   - Tree shaking enabled
   - Minification in production
   - Gzip compression

### Future Optimizations

1. **React Optimization:**
```typescript
// Memoize expensive calculations
const filteredData = useMemo(() => {
  return data.filter(/* filtering logic */);
}, [data, filters]);

// Memoize components
const MemoizedComponent = React.memo(Component);

// Lazy load pages
const DashboardPage = lazy(() => import('./components/dashboard/DashboardPage'));
```

2. **Virtualization:**
For large lists, implement virtualization:
```bash
npm install react-window
```

3. **Debouncing:**
```typescript
import { debounce } from 'lodash';

const debouncedSearch = useMemo(
  () => debounce((value) => setSearchTerm(value), 300),
  []
);
```

### Performance Monitoring

```typescript
// Measure render time
useEffect(() => {
  console.time('Component Render');
  return () => console.timeEnd('Component Render');
}, []);
```

---

## Security Considerations

### Current Implementation

1. **No Authentication:** 
   - Application is client-side only
   - No sensitive data stored
   - Mock data only

### Future Security Measures

When integrating with backend:

1. **Authentication:**
```typescript
// JWT token storage
localStorage.setItem('token', authToken);

// API requests with auth
fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

2. **Input Validation:**
```typescript
// Sanitize user input
const sanitizeInput = (input: string) => {
  return input.replace(/[<>]/g, '');
};
```

3. **XSS Prevention:**
- Never use `dangerouslySetInnerHTML`
- Sanitize all user input
- Use React's built-in escaping

4. **CSRF Protection:**
- Use CSRF tokens for API requests
- Validate origin headers

5. **Data Privacy:**
- Encrypt sensitive data
- Follow FERPA guidelines
- Implement role-based access control

### Security Checklist

- [ ] Input validation on all forms
- [ ] Sanitize user-generated content
- [ ] Secure API endpoints
- [ ] Use HTTPS in production
- [ ] Implement authentication
- [ ] Add authorization checks
- [ ] Encrypt sensitive data
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Follow OWASP guidelines

---

## API Integration (Future)

### Planned API Structure

```typescript
// API service
class IncidentAPI {
  private baseUrl = 'https://api.example.com';
  
  async getIncidents(filters?: any): Promise<Incident[]> {
    const response = await fetch(`${this.baseUrl}/incidents`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return response.json();
  }
  
  async createIncident(data: Incident): Promise<Incident> {
    const response = await fetch(`${this.baseUrl}/incidents`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  }
  
  async updateIncident(id: string, data: Partial<Incident>): Promise<Incident> {
    const response = await fetch(`${this.baseUrl}/incidents/${id}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  }
  
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
  }
}

export const incidentAPI = new IncidentAPI();
```

### Using API in Components

```typescript
import { useEffect, useState } from 'react';
import { incidentAPI } from '../services/api';

export function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const data = await incidentAPI.getIncidents();
        setIncidents(data);
      } catch (err) {
        setError('Failed to load incidents');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchIncidents();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {/* Render incidents */}
    </div>
  );
}
```

---

## Troubleshooting

### Common Issues

**Issue: Components not rendering**
- Check console for errors
- Verify imports are correct
- Ensure component is exported

**Issue: Styles not applying**
- Clear browser cache
- Check Tailwind class names
- Verify globals.css is imported

**Issue: Build fails**
- Check for TypeScript errors
- Verify all dependencies installed
- Clear node_modules and reinstall

**Issue: Images not loading**
- Verify image paths
- Check figma:asset import format
- Ensure images exist in imports folder

### Debug Mode

Enable verbose logging:
```typescript
const DEBUG = true;

if (DEBUG) {
  console.log('Component rendered', { props, state });
}
```

---

## Maintenance

### Regular Tasks

**Weekly:**
- Review error logs
- Update data as needed
- Check performance metrics

**Monthly:**
- Update dependencies
- Review and update documentation
- Security audit

**Quarterly:**
- Comprehensive testing
- Performance optimization
- Feature planning

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions
npm install package@latest
```

---

## Contributing

### Git Workflow

1. Create feature branch from `main`
2. Make changes and commit
3. Push to remote
4. Create pull request
5. Code review
6. Merge to main

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] No console errors
- [ ] Documentation updated
- [ ] Performance acceptable
- [ ] Accessibility maintained
- [ ] Security considerations addressed

---

## Resources

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

### Design System
- Tyler Forge 3.x Design System (internal)
- District Branding Guidelines (internal)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [VS Code](https://code.visualstudio.com/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

---

**Document Version:** 1.0.0  
**Last Updated:** January 27, 2026  
**Maintained By:** Development Team
