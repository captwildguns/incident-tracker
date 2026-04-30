import { useState, useRef, useEffect } from 'react';
import { ForgeCard, ForgeButton } from '@tylertech/forge-react';
import { defineCardComponent, defineButtonComponent, defineDialogComponent } from '@tylertech/forge';
defineCardComponent();
defineButtonComponent();
defineDialogComponent();
import { Download, Calendar, BarChart3, TrendingUp, Users, AlertTriangle, Bus, Shield, FileText, School, Clock, Target, Eye, X, ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const quickReports = [
  {
    id: 'monthly-summary',
    title: 'Monthly Summary',
    description: 'Incident statistics and trends for the current month',
    icon: Calendar,
    color: 'text-blue-500',
    lastRun: '1 day ago',
  },
  {
    id: 'student-history',
    title: 'Student Incident History',
    description: 'Complete incident history by student',
    icon: Users,
    color: 'text-purple-500',
    lastRun: '3 days ago',
  },
  {
    id: 'driver-performance',
    title: 'Driver Report Summary',
    description: 'Incidents reported by driver with response metrics',
    icon: TrendingUp,
    color: 'text-green-500',
    lastRun: '1 week ago',
  },
  {
    id: 'high-severity',
    title: 'High Severity Incidents',
    description: 'All high severity incidents requiring immediate attention',
    icon: AlertTriangle,
    color: 'text-red-500',
    lastRun: '2 days ago',
  },
  {
    id: 'vehicle-report',
    title: 'Vehicle Incident Report',
    description: 'Incidents grouped by vehicle number',
    icon: Bus,
    color: 'text-amber-500',
    lastRun: '5 days ago',
  },
  {
    id: 'open-incidents',
    title: 'Open Incidents Report',
    description: 'All currently open incidents requiring action',
    icon: FileText,
    color: 'text-cyan-500',
    lastRun: '1 day ago',
  },
  {
    id: 'weekly-trends',
    title: 'Weekly Trends Analysis',
    description: 'Week-over-week incident trends and patterns',
    icon: BarChart3,
    color: 'text-indigo-500',
    lastRun: '2 days ago',
  },
  {
    id: 'repeat-offenders',
    title: 'Repeat Offender Report',
    description: 'Students with multiple incidents requiring intervention',
    icon: Target,
    color: 'text-violet-500',
    lastRun: '1 week ago',
  },
];

// Get filtered data for a specific quick report type
function getReportData(reportId: string) {
  switch (reportId) {
    case 'monthly-summary':
      return mockIncidents.filter(inc => inc.date >= '2025-03-01');
    case 'student-history':
      return mockIncidents;
    case 'driver-performance':
      return mockIncidents;
    case 'high-severity':
      return mockIncidents.filter(inc => inc.severity === 'High');
    case 'vehicle-report':
      return mockIncidents;
    case 'open-incidents':
      return mockIncidents.filter(inc => inc.status === 'Open' || inc.status === 'In Progress');
    case 'weekly-trends':
      return mockIncidents.filter(inc => inc.date >= '2025-03-01');
    case 'repeat-offenders': {
      const studentCounts: Record<string, number> = {};
      mockIncidents.forEach(inc => { studentCounts[inc.student] = (studentCounts[inc.student] || 0) + 1; });
      const repeats = Object.keys(studentCounts).filter(s => studentCounts[s] > 1);
      return mockIncidents.filter(inc => repeats.includes(inc.student));
    }
    default:
      return mockIncidents;
  }
}

interface ReportsPageProps {
  onNavigate: (page: string) => void;
}

// Mock incident data for preview
const mockIncidents = [
  {
    id: 'INC-2025-0042',
    date: '2025-03-15',
    student: 'Sarah Mitchell',
    studentId: 'STU-2891',
    type: 'Seat Refusal',
    description: 'Student refused to remain seated during transport',
    vehicle: 'Vehicle 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'Medium',
    status: 'Open',
  },
  {
    id: 'INC-2025-0041',
    date: '2025-03-15',
    student: 'Marcus Johnson',
    studentId: 'STU-3421',
    type: 'Emergency Exit Misuse',
    description: 'Student attempted to open emergency exit during normal transport',
    vehicle: 'Vehicle 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'High',
    status: 'In Progress',
  },
  {
    id: 'INC-2025-0040',
    date: '2025-03-14',
    student: 'Emma Rodriguez',
    studentId: 'STU-1956',
    type: 'Taunting/Bullying',
    description: 'Verbal altercation with another student',
    vehicle: 'Vehicle 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'High',
    status: 'Open',
  },
  {
    id: 'INC-2025-0039',
    date: '2025-03-14',
    student: 'James Thompson',
    studentId: 'STU-4782',
    type: 'Vandalism',
    description: 'Seat cushion torn - monetary restitution required',
    vehicle: 'Vehicle 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'Low',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0038',
    date: '2025-03-13',
    student: 'Olivia Davis',
    studentId: 'STU-5623',
    type: 'Offensive Language',
    description: 'Using profane and offensive language toward other students',
    vehicle: 'Vehicle 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'Medium',
    status: 'In Progress',
  },
  {
    id: 'INC-2025-0037',
    date: '2025-03-12',
    student: 'Noah Wilson',
    studentId: 'STU-6891',
    type: 'Physical Altercation',
    description: 'Physical fight with another student',
    vehicle: 'Vehicle 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'High',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0036',
    date: '2025-03-10',
    student: 'Sophia Garcia',
    studentId: 'STU-7234',
    type: 'Eating/Drinking Violation',
    description: 'Student eating snacks and spilled drink on seat',
    vehicle: 'Vehicle 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Robert Martinez',
    severity: 'Low',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0035',
    date: '2025-03-08',
    student: 'Liam Brown',
    studentId: 'STU-8512',
    type: 'Window Misuse',
    description: 'Opening windows excessively and throwing paper outside',
    vehicle: 'Vehicle 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'Medium',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0034',
    date: '2025-03-07',
    student: 'Ava Martinez',
    studentId: 'STU-9123',
    type: 'Disruptive Volume',
    description: 'Excessive noise and screaming, disturbing driver',
    vehicle: 'Vehicle 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'Medium',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0033',
    date: '2025-03-05',
    student: 'Ethan Lee',
    studentId: 'STU-1045',
    type: 'Seat Refusal',
    description: 'Refused assigned seat and moved multiple times',
    vehicle: 'Vehicle 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'Low',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0032',
    date: '2025-02-28',
    student: 'Isabella White',
    studentId: 'STU-2387',
    type: 'Taunting/Bullying',
    description: 'Continued verbal harassment of younger student',
    vehicle: 'Vehicle 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Robert Martinez',
    severity: 'High',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0031',
    date: '2025-02-26',
    student: 'Mason Taylor',
    studentId: 'STU-3498',
    type: 'Offensive Language',
    description: 'Repeated use of profanity despite warnings',
    vehicle: 'Vehicle 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'Medium',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0030',
    date: '2025-02-24',
    student: 'Charlotte Anderson',
    studentId: 'STU-4561',
    type: 'Vandalism',
    description: 'Writing on seat backs with permanent marker',
    vehicle: 'Vehicle 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'Medium',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0029',
    date: '2025-02-21',
    student: 'Aiden Thomas',
    studentId: 'STU-5672',
    type: 'Physical Altercation',
    description: 'Pushing and shoving with another student in aisle',
    vehicle: 'Vehicle 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'High',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0028',
    date: '2025-02-19',
    student: 'Mia Jackson',
    studentId: 'STU-6783',
    type: 'Disruptive Volume',
    description: 'Playing loud music from phone speaker',
    vehicle: 'Vehicle 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Robert Martinez',
    severity: 'Low',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0027',
    date: '2025-02-15',
    student: 'Lucas Harris',
    studentId: 'STU-7894',
    type: 'Emergency Exit Misuse',
    description: 'Tampering with emergency exit door mechanism',
    vehicle: 'Vehicle 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'High',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0026',
    date: '2025-02-12',
    student: 'Harper Clark',
    studentId: 'STU-8905',
    type: 'Eating/Drinking Violation',
    description: 'Spilled soda creating slipping hazard',
    vehicle: 'Vehicle 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'Medium',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0025',
    date: '2025-02-10',
    student: 'Benjamin Lewis',
    studentId: 'STU-9016',
    type: 'Seat Refusal',
    description: 'Standing in aisle during transport despite warnings',
    vehicle: 'Vehicle 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'Medium',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0024',
    date: '2025-02-07',
    student: 'Amelia Robinson',
    studentId: 'STU-1127',
    type: 'Window Misuse',
    description: 'Hanging objects out window while bus moving',
    vehicle: 'Vehicle 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Robert Martinez',
    severity: 'High',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0023',
    date: '2025-02-05',
    student: 'Henry Walker',
    studentId: 'STU-2238',
    type: 'Offensive Language',
    description: 'Directing profanity at driver',
    vehicle: 'Vehicle 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'High',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0022',
    date: '2025-02-03',
    student: 'Evelyn Hall',
    studentId: 'STU-3349',
    type: 'Taunting/Bullying',
    description: 'Name-calling and mocking another student',
    vehicle: 'Vehicle 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'Medium',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0021',
    date: '2025-01-31',
    student: 'Alexander Young',
    studentId: 'STU-4450',
    type: 'Vandalism',
    description: 'Scratching window with metal object',
    vehicle: 'Vehicle 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'Medium',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0020',
    date: '2025-01-28',
    student: 'Abigail King',
    studentId: 'STU-5561',
    type: 'Disruptive Volume',
    description: 'Yelling and screaming, refusing to quiet down',
    vehicle: 'Vehicle 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Robert Martinez',
    severity: 'Medium',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0019',
    date: '2025-01-24',
    student: 'Daniel Wright',
    studentId: 'STU-6672',
    type: 'Physical Altercation',
    description: 'Kicked another student during argument',
    vehicle: 'Vehicle 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'High',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0018',
    date: '2025-01-21',
    student: 'Emily Scott',
    studentId: 'STU-7783',
    type: 'Eating/Drinking Violation',
    description: 'Eating messy food and littering wrappers',
    vehicle: 'Vehicle 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'Low',
    status: 'Closed',
  },
  {
    id: 'INC-2025-0017',
    date: '2025-01-17',
    student: 'Matthew Green',
    studentId: 'STU-8894',
    type: 'Seat Refusal',
    description: 'Changed seats multiple times causing disruption',
    vehicle: 'Vehicle 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'Low',
    status: 'Closed',
  },
];

export function ReportsPage({ onNavigate }: ReportsPageProps) {
  const [selectedDateRange, setSelectedDateRange] = useState('this-month');
  const [selectedIncidentTypes, setSelectedIncidentTypes] = useState<string[]>([]);
  const [selectedRuns, setSelectedRuns] = useState<string[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewReport, setPreviewReport] = useState<typeof quickReports[0] | null>(null);

  const previewDialogRef = useRef<HTMLElement>(null);

  // Sync preview dialog open state to forge-dialog
  useEffect(() => {
    const el = previewDialogRef.current as any;
    if (!el) return;
    el.open = isPreviewOpen;
  }, [isPreviewOpen]);

  useEffect(() => {
    const el = previewDialogRef.current as any;
    if (!el) return;
    const handler = () => setIsPreviewOpen(false);
    el.addEventListener('forge-dialog-close', handler);
    return () => el.removeEventListener('forge-dialog-close', handler);
  }, []);

  const incidentTypes = [
    'Behavioral',
    'Safety Violation',
    'Aggression/Violence',
    'Driver Defiance',
    'Property Damage',
    'Prohibited Items',
    'Privacy Violation',
  ];

  const vehicleRuns = [
    'Meyers Middle AM - Yellow', 
    'Washington High PM - Wolf Rd', 
    'Jefferson Middle AM - Blue', 
    'Roosevelt High PM - Red', 
    'Lincoln Elementary AM - Green', 
    'Colonie High AM - Purple'
  ];

  const toggleIncidentType = (type: string) => {
    setSelectedIncidentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAllIncidentTypes = () => {
    if (selectedIncidentTypes.length === incidentTypes.length) {
      setSelectedIncidentTypes([]);
    } else {
      setSelectedIncidentTypes([...incidentTypes]);
    }
  };

  const toggleRun = (run: string) => {
    setSelectedRuns((prev) =>
      prev.includes(run) ? prev.filter((r) => r !== run) : [...prev, run]
    );
  };

  const toggleAllRuns = () => {
    if (selectedRuns.length === vehicleRuns.length) {
      setSelectedRuns([]);
    } else {
      setSelectedRuns([...vehicleRuns]);
    }
  };

  const toggleSeverity = (severity: string) => {
    setSelectedSeverity((prev) =>
      prev.includes(severity) ? prev.filter((s) => s !== severity) : [...prev, severity]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleGenerateReport = () => {
    const formatLabel = selectedFormat === 'pdf' ? 'PDF' : selectedFormat === 'excel' ? 'Excel' : 'CSV';
    toast.success(`Report Generated`, {
      description: `Your custom ${formatLabel} report with ${filteredIncidents.length} incident(s) is ready for download.`
    });
  };

  const handleQuickReport = (reportId: string, reportTitle: string) => {
    // Different messages for different report types
    const messages: Record<string, string> = {
      'monthly-summary': 'Your Monthly Summary PDF report for March 2025 with incident statistics and trends is ready for download.',
      'student-history': 'Your Student Incident History Excel report with complete records for all students is ready for download.',
      'driver-performance': 'Your Driver Report Summary PDF with incident counts and response metrics is ready for download.',
      'high-severity': 'Your High Severity Incidents PDF report with all critical incidents requiring immediate attention is ready for download.',
      'vehicle-report': 'Your Vehicle Incident Report PDF grouping incidents by vehicle number is ready for download.',
      'open-incidents': 'Your Open Incidents Report PDF with all currently open incidents requiring action is ready for download.',
      'weekly-trends': 'Your Weekly Trends Analysis PDF report showing week-over-week incident trends and patterns is ready for download.',
      'repeat-offenders': 'Your Repeat Offender Report PDF with students having multiple incidents requiring intervention is ready for download.',
    };

    toast.success(`${reportTitle} Generated`, {
      description: messages[reportId] || `Your ${reportTitle} report is ready for download.`
    });
  };

  // Filter incidents based on selected criteria
  const getFilteredIncidents = () => {
    let filtered = [...mockIncidents];

    // Filter by incident types if any selected
    if (selectedIncidentTypes.length > 0) {
      filtered = filtered.filter(inc => selectedIncidentTypes.includes(inc.type));
    }

    // Filter by runs if any selected
    if (selectedRuns.length > 0) {
      filtered = filtered.filter(inc => selectedRuns.includes(inc.route));
    }

    // Filter by severity if any selected
    if (selectedSeverity.length > 0) {
      filtered = filtered.filter(inc => selectedSeverity.includes(inc.severity));
    }

    // Filter by status if any selected
    if (selectedStatus.length > 0) {
      filtered = filtered.filter(inc => selectedStatus.includes(inc.status));
    }

    return filtered;
  };

  const filteredIncidents = getFilteredIncidents();
  const totalIncidents = filteredIncidents.length;

  return (
    <div style={{ padding: 'var(--forge-spacing-xlarge)' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <h1 style={{ margin: 0, marginBottom: '8px' }}>Reports</h1>
        <p className="text-muted-foreground" style={{ margin: 0 }}>
          Generate and download incident reports
        </p>
      </div>

      {/* Quick Reports Section */}
      <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
        <div style={{ padding: 'var(--forge-spacing-medium)' }}>
          <h3 className="forge-typography--heading4">Quick Reports</h3>
          <p className="forge-typography--body2" style={{ color: 'var(--forge-theme-text-medium)' }}>
            Pre-configured reports ready to generate with one click
          </p>
        </div>
        <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {quickReports.map((report) => {
              const Icon = report.icon;
              return (
                <ForgeCard
                  key={report.id}
                  className="border-border hover:border-primary/50 transition-colors cursor-pointer"
                  style={{ boxShadow: 'var(--forge-elevation-1)' }}
                >
                  <div style={{ padding: 'var(--forge-spacing-medium)', paddingTop: 'var(--forge-spacing-large)' }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded ${report.color} bg-opacity-10`}>
                        <Icon className={`h-6 w-6 ${report.color}`} />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {report.lastRun}
                      </Badge>
                    </div>
                    
                    <h3 style={{ margin: 0, marginBottom: '8px' }}>{report.title}</h3>
                    <p className="text-muted-foreground" style={{ fontSize: '0.875rem', marginBottom: '16px', minHeight: '3em' }}>
                      {report.description}
                    </p>
                    
                    <button
                      onClick={() => {
                        setPreviewReport(report);
                        setIsPreviewOpen(true);
                      }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        gap: '8px', width: '100%', padding: '6px 12px',
                        backgroundColor: 'var(--forge-theme-primary)', color: 'white',
                        border: 'none', borderRadius: 'var(--forge-shape-medium)',
                        cursor: 'pointer', fontFamily: 'Roboto, sans-serif',
                        fontSize: '14px', fontWeight: 500,
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      View Report
                    </button>
                  </div>
                </ForgeCard>
              );
            })}
          </div>
        </div>
      </ForgeCard>

      {/* Report Preview Modal */}
      {/* @ts-ignore */}
      <forge-dialog ref={previewDialogRef} aria-label={previewReport?.title || 'Report Preview'}>
        <div className="max-h-[85vh] flex flex-col" style={{ maxWidth: '95vw', width: 'fit-content', minWidth: '900px', padding: 'var(--forge-spacing-large)' }}>
          <div style={{ marginBottom: 'var(--forge-spacing-medium)' }}>
            <div className="flex items-center justify-between" style={{ marginRight: 'var(--forge-spacing-large)' }}>
              <h2 style={{ margin: 0, fontSize: 'var(--forge-font-size-xl)', fontWeight: 'var(--forge-font-weight-medium)', fontFamily: 'var(--forge-font-family)' }}>
                {previewReport?.title}
              </h2>
              <button
                onClick={() => {
                  if (previewReport) {
                    handleQuickReport(previewReport.id, previewReport.title);
                  }
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '6px 12px',
                  backgroundColor: 'var(--forge-theme-primary)', color: 'white',
                  border: 'none', borderRadius: 'var(--forge-shape-medium)',
                  cursor: 'pointer', fontFamily: 'Roboto, sans-serif',
                  fontSize: '13px', fontWeight: 500,
                }}
              >
                <Download className="h-4 w-4" />
                Download Report
              </button>
            </div>
          </div>

          {previewReport && (
            <div className="flex-1 overflow-hidden flex flex-col" style={{ minHeight: 0 }}>
              {previewReport.id === 'weekly-trends' ? (
                // Weekly Trends Dashboard
                <>
                  {(() => {
                    const data = getReportData(previewReport.id);
                    
                    // Group incidents by week
                    const weeklyData: Record<string, any[]> = {};
                    data.forEach(inc => {
                      const date = new Date(inc.date);
                      const weekStart = new Date(date);
                      weekStart.setDate(date.getDate() - date.getDay());
                      const weekKey = weekStart.toISOString().split('T')[0];
                      if (!weeklyData[weekKey]) weeklyData[weekKey] = [];
                      weeklyData[weekKey].push(inc);
                    });

                    const weeks = Object.keys(weeklyData).sort();
                    const thisWeek = weeklyData[weeks[weeks.length - 1]] || [];
                    const lastWeek = weeklyData[weeks[weeks.length - 2]] || [];

                    const thisWeekCount = thisWeek.length;
                    const lastWeekCount = lastWeek.length;
                    const weekOverWeekChange = lastWeekCount > 0 ? ((thisWeekCount - lastWeekCount) / lastWeekCount * 100) : 0;

                    const thisWeekHigh = thisWeek.filter(i => i.severity === 'High').length;
                    const lastWeekHigh = lastWeek.filter(i => i.severity === 'High').length;
                    const highSeverityChange = lastWeekHigh > 0 ? ((thisWeekHigh - lastWeekHigh) / lastWeekHigh * 100) : 0;

                    return (
                      <>
                        {/* Trend Summary Cards */}
                        <div className="grid grid-cols-4" style={{ gap: 'var(--forge-spacing-medium)', marginBottom: 'var(--forge-spacing-large)' }}>
                          <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
                            <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                              <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>This Week</div>
                              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--forge-font-weight-medium)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>{thisWeekCount}</div>
                              <div className="flex items-center" style={{ fontSize: 'var(--forge-font-size-xs)' }}>
                                {weekOverWeekChange > 0 ? (
                                  <><ArrowUp className="h-3 w-3 mr-1" style={{ color: 'var(--destructive)' }} /><span style={{ color: 'var(--destructive)' }}>+{weekOverWeekChange.toFixed(1)}%</span></>
                                ) : weekOverWeekChange < 0 ? (
                                  <><ArrowDown className="h-3 w-3 mr-1" style={{ color: 'hsl(var(--success))' }} /><span style={{ color: 'hsl(var(--success))' }}>{weekOverWeekChange.toFixed(1)}%</span></>
                                ) : (
                                  <span className="text-muted-foreground">No change</span>
                                )}
                                <span className="text-muted-foreground ml-1">vs last week</span>
                              </div>
                            </div>
                          </ForgeCard>

                          <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
                            <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                              <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>Last Week</div>
                              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--forge-font-weight-medium)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>{lastWeekCount}</div>
                              <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)' }}>
                                {weeks[weeks.length - 2] ? new Date(weeks[weeks.length - 2]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
                              </div>
                            </div>
                          </ForgeCard>

                          <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
                            <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                              <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>High Severity Trend</div>
                              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--forge-font-weight-medium)', marginBottom: 'var(--forge-spacing-xxsmall)', color: 'var(--destructive)' }}>{thisWeekHigh}</div>
                              <div className="flex items-center" style={{ fontSize: 'var(--forge-font-size-xs)' }}>
                                {highSeverityChange > 0 ? (
                                  <><ArrowUp className="h-3 w-3 mr-1" style={{ color: 'var(--destructive)' }} /><span style={{ color: 'var(--destructive)' }}>+{highSeverityChange.toFixed(1)}%</span></>
                                ) : highSeverityChange < 0 ? (
                                  <><ArrowDown className="h-3 w-3 mr-1" style={{ color: 'hsl(var(--success))' }} /><span style={{ color: 'hsl(var(--success))' }}>{highSeverityChange.toFixed(1)}%</span></>
                                ) : (
                                  <span className="text-muted-foreground">No change</span>
                                )}
                              </div>
                            </div>
                          </ForgeCard>

                          <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
                            <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                              <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>4-Week Average</div>
                              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--forge-font-weight-medium)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>
                                {weeks.length > 0 ? (data.length / weeks.length).toFixed(1) : '0'}
                              </div>
                              <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)' }}>
                                incidents per week
                              </div>
                            </div>
                          </ForgeCard>
                        </div>

                        {/* Charts Section */}
                        <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--forge-spacing-medium)', marginBottom: 'var(--forge-spacing-medium)' }}>
                            {/* Incident Trend Line Chart */}
                            <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
                              <div style={{ padding: 'var(--forge-spacing-medium)', paddingBottom: 'var(--forge-spacing-small)' }}>
                                <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--forge-font-size-base)' }}>Weekly Incident Trend</h3>
                              </div>
                              <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
                                <ResponsiveContainer width="100%" height={250}>
                                  <LineChart data={weeks.map((week, index) => ({
                                    id: `week-${index}`,
                                    week: new Date(week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                                    incidents: weeklyData[week].length,
                                    high: weeklyData[week].filter(i => i.severity === 'High').length,
                                  }))}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="week" style={{ fontSize: 'var(--forge-font-size-xs)' }} stroke="hsl(var(--muted-foreground))" />
                                    <YAxis style={{ fontSize: 'var(--forge-font-size-xs)' }} stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--forge-radius-small)', fontSize: 'var(--forge-font-size-sm)' }} />
                                    <Legend wrapperStyle={{ fontSize: 'var(--forge-font-size-xs)' }} />
                                    <Line type="monotone" dataKey="incidents" stroke="hsl(var(--primary))" strokeWidth={2} name="Total Incidents" />
                                    <Line type="monotone" dataKey="high" stroke="hsl(var(--destructive))" strokeWidth={2} name="High Severity" />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </ForgeCard>

                            {/* Incident Type Breakdown */}
                            <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
                              <div style={{ padding: 'var(--forge-spacing-medium)', paddingBottom: 'var(--forge-spacing-small)' }}>
                                <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--forge-font-size-base)' }}>This Week by Type</h3>
                              </div>
                              <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
                                {(() => {
                                  const typeCounts: Record<string, number> = {};
                                  thisWeek.forEach(inc => {
                                    typeCounts[inc.type] = (typeCounts[inc.type] || 0) + 1;
                                  });
                                  const topTypes = Object.entries(typeCounts)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 5);
                                  
                                  return (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-small)' }}>
                                      {topTypes.map(([type, count]) => (
                                        <div key={type}>
                                          <div className="flex justify-between items-center" style={{ marginBottom: 'var(--forge-spacing-xxsmall)' }}>
                                            <span style={{ fontSize: 'var(--forge-font-size-xs)' }}>{type}</span>
                                            <span style={{ fontSize: 'var(--forge-font-size-xs)', fontWeight: 'var(--forge-font-weight-medium)' }}>{count}</span>
                                          </div>
                                          <div style={{ height: '6px', backgroundColor: 'var(--muted)', borderRadius: 'var(--forge-radius-small)', overflow: 'hidden' }}>
                                            <div style={{ 
                                              width: `${(count / thisWeekCount * 100)}%`, 
                                              height: '100%', 
                                              backgroundColor: 'hsl(var(--primary))',
                                              transition: 'width 0.3s ease'
                                            }} />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                })()}
                              </div>
                            </ForgeCard>
                          </div>

                          {/* Severity Distribution Over Time */}
                          <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
                            <div style={{ padding: 'var(--forge-spacing-medium)', paddingBottom: 'var(--forge-spacing-small)' }}>
                              <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--forge-font-size-base)' }}>Severity Distribution by Week</h3>
                            </div>
                            <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
                              <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={weeks.map((week, index) => ({
                                  id: `severity-week-${index}`,
                                  week: new Date(week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                                  High: weeklyData[week].filter(i => i.severity === 'High').length,
                                  Medium: weeklyData[week].filter(i => i.severity === 'Medium').length,
                                  Low: weeklyData[week].filter(i => i.severity === 'Low').length,
                                }))}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                  <XAxis dataKey="week" style={{ fontSize: 'var(--forge-font-size-xs)' }} stroke="hsl(var(--muted-foreground))" />
                                  <YAxis style={{ fontSize: 'var(--forge-font-size-xs)' }} stroke="hsl(var(--muted-foreground))" />
                                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--forge-radius-small)', fontSize: 'var(--forge-font-size-sm)' }} />
                                  <Legend wrapperStyle={{ fontSize: 'var(--forge-font-size-xs)' }} />
                                  <Bar dataKey="High" stackId="a" fill="hsl(var(--destructive))" />
                                  <Bar dataKey="Medium" stackId="a" fill="hsl(var(--warning))" />
                                  <Bar dataKey="Low" stackId="a" fill="hsl(var(--success))" />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </ForgeCard>

                          {/* Key Insights */}
                          <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', marginTop: 'var(--forge-spacing-medium)' }}>
                            <div style={{ padding: 'var(--forge-spacing-medium)', paddingBottom: 'var(--forge-spacing-small)' }}>
                              <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--forge-font-size-base)' }}>Key Insights</h3>
                            </div>
                            <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-small)' }}>
                                {weekOverWeekChange > 10 && (
                                  <div className="flex items-start" style={{ padding: 'var(--forge-spacing-small)', backgroundColor: 'hsl(var(--destructive) / 0.1)', borderRadius: 'var(--forge-radius-small)' }}>
                                    <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" style={{ color: 'var(--destructive)', flexShrink: 0 }} />
                                    <div>
                                      <div style={{ fontWeight: 'var(--forge-font-weight-medium)', fontSize: 'var(--forge-font-size-sm)' }}>Significant Increase</div>
                                      <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)' }}>
                                        Incidents increased by {weekOverWeekChange.toFixed(1)}% this week. Consider reviewing recent changes.
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {weekOverWeekChange < -10 && (
                                  <div className="flex items-start" style={{ padding: 'var(--forge-spacing-small)', backgroundColor: 'hsl(var(--success) / 0.1)', borderRadius: 'var(--forge-radius-small)' }}>
                                    <TrendingUp className="h-4 w-4 mr-2 mt-0.5" style={{ color: 'hsl(var(--success))', flexShrink: 0 }} />
                                    <div>
                                      <div style={{ fontWeight: 'var(--forge-font-weight-medium)', fontSize: 'var(--forge-font-size-sm)' }}>Positive Trend</div>
                                      <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)' }}>
                                        Incidents decreased by {Math.abs(weekOverWeekChange).toFixed(1)}% this week. Great progress!
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {(() => {
                                  const mostCommonType = Object.entries(
                                    thisWeek.reduce((acc: Record<string, number>, inc) => {
                                      acc[inc.type] = (acc[inc.type] || 0) + 1;
                                      return acc;
                                    }, {})
                                  ).sort((a, b) => b[1] - a[1])[0];
                                  
                                  if (mostCommonType && mostCommonType[1] > 2) {
                                    return (
                                      <div className="flex items-start" style={{ padding: 'var(--forge-spacing-small)', backgroundColor: 'var(--muted)', borderRadius: 'var(--forge-radius-small)' }}>
                                        <BarChart3 className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" style={{ flexShrink: 0 }} />
                                        <div>
                                          <div style={{ fontWeight: 'var(--forge-font-weight-medium)', fontSize: 'var(--forge-font-size-sm)' }}>Most Common Type</div>
                                          <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)' }}>
                                            "{mostCommonType[0]}" accounts for {mostCommonType[1]} incidents ({(mostCommonType[1] / thisWeekCount * 100).toFixed(0)}%) this week.
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                })()}
                              </div>
                            </div>
                          </ForgeCard>
                        </div>
                      </>
                    );
                  })()}
                </>
              ) : (
                // Standard Table View for Other Reports
                <>
                  {/* Summary stats */}
                  <div
                    className="grid grid-cols-4"
                    style={{
                      gap: 'var(--forge-spacing-medium)',
                      padding: 'var(--forge-spacing-medium)',
                      backgroundColor: 'var(--muted)',
                      borderRadius: 'var(--forge-radius-medium)',
                      marginBottom: 'var(--forge-spacing-medium)',
                    }}
                  >
                    {(() => {
                      const data = getReportData(previewReport.id);
                      const highCount = data.filter(d => d.severity === 'High').length;
                      const openCount = data.filter(d => d.status === 'Open' || d.status === 'In Progress').length;
                      const uniqueStudents = new Set(data.map(d => d.student)).size;
                      return (
                        <>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>Total Incidents</div>
                            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--forge-font-weight-medium)' }}>{data.length}</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>High Severity</div>
                            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--forge-font-weight-medium)', color: 'var(--destructive)' }}>{highCount}</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>Open / In Progress</div>
                            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--forge-font-weight-medium)', color: 'var(--primary)' }}>{openCount}</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>Unique Students</div>
                            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--forge-font-weight-medium)' }}>{uniqueStudents}</div>
                          </div>
                        </>
                      );
                    })()}
                  </div>

              {/* Report table */}
              <div className="flex-1 overflow-y-auto" style={{ border: '1px solid var(--forge-color-border-default)', borderRadius: 'var(--forge-radius-medium)' }}>
                <table className="forge-table" style={{ fontSize: 'var(--forge-font-size-sm)', whiteSpace: 'nowrap' }}>
                  <thead>
                    <tr>
                      <th className="forge-table-cell forge-table-cell--header">Incident ID</th>
                      <th className="forge-table-cell forge-table-cell--header">Date</th>
                      {previewReport.id === 'driver-performance' || previewReport.id === 'vehicle-report' ? (
                        <th className="forge-table-cell forge-table-cell--header">Driver</th>
                      ) : (
                        <th className="forge-table-cell forge-table-cell--header">Student</th>
                      )}
                      <th className="forge-table-cell forge-table-cell--header">Type</th>
                      <th className="forge-table-cell forge-table-cell--header">Vehicle</th>
                      {previewReport.id !== 'driver-performance' && previewReport.id !== 'vehicle-report' && (
                        <th className="forge-table-cell forge-table-cell--header">Driver</th>
                      )}
                      <th className="forge-table-cell forge-table-cell--header">Severity</th>
                      <th className="forge-table-cell forge-table-cell--header">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getReportData(previewReport.id).map((incident) => (
                      <tr
                        key={incident.id}
                        className="forge-table-row"
                      >
                        <td className="forge-table-cell" style={{ fontWeight: 'var(--forge-font-weight-medium)', color: 'var(--primary)' }}>{incident.id}</td>
                        <td className="forge-table-cell" style={{ color: 'var(--muted-foreground)' }}>{incident.date}</td>
                        {previewReport.id === 'driver-performance' || previewReport.id === 'vehicle-report' ? (
                          <td className="forge-table-cell">{incident.driver}</td>
                        ) : (
                          <td className="forge-table-cell">
                            <div>{incident.student}</div>
                            <div style={{ fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)' }}>{incident.studentId}</div>
                          </td>
                        )}
                        <td className="forge-table-cell">{incident.type}</td>
                        <td className="forge-table-cell" style={{ color: 'var(--muted-foreground)' }}>{incident.vehicle}</td>
                        {previewReport.id !== 'driver-performance' && previewReport.id !== 'vehicle-report' && (
                          <td className="forge-table-cell">{incident.driver}</td>
                        )}
                        <td className="forge-table-cell">
                          <Badge variant={incident.severity === 'High' ? 'destructive' : incident.severity === 'Medium' ? 'secondary' : 'outline'} style={{ fontSize: 'var(--forge-font-size-xs)' }}>
                            {incident.severity}
                          </Badge>
                        </td>
                        <td className="forge-table-cell">
                          <Badge variant={incident.status === 'Open' ? 'default' : incident.status === 'In Progress' ? 'secondary' : 'outline'} style={{ fontSize: 'var(--forge-font-size-xs)' }}>
                            {incident.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

                  {/* Footer with record count */}
                  <div className="flex items-center justify-between" style={{ paddingTop: 'var(--forge-spacing-small)', fontSize: 'var(--forge-font-size-xs)', color: 'var(--muted-foreground)' }}>
                    <span>Showing {getReportData(previewReport.id).length} record(s)</span>
                    <span>Generated: March 3, 2026</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </forge-dialog>
    </div>
  );
}