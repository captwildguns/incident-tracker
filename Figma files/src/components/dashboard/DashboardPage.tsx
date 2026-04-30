import { useState, useRef, useEffect } from 'react';
import { ForgeCard, ForgeButton } from '@tylertech/forge-react';
import { defineCardComponent, defineDialogComponent } from '@tylertech/forge';
defineCardComponent();
defineDialogComponent();
import { EditIncidentDialog } from '../incidents/EditIncidentDialog';
import { Badge } from '../ui/badge';
import { defineButtonComponent } from '@tylertech/forge';
defineButtonComponent();
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, CheckCircle, XCircle, TrendingUp, Clock, MessageSquare, Bell, AlertTriangle, ArrowRight, Mail, Users, TrendingDown, UserCheck, MoreVertical, Eye, Edit, CheckCheck, Send, UserPlus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner';

// Mock current user - in production, this would come from authentication context
const currentUser = {
  name: 'Sarah Williams',
  role: 'Safety Coordinator',
  email: 'sarah.williams@district.edu'
};

const incidentTypeData = [
  { name: 'Behavioral', value: 35, fill: '#4A6FA5' },
  { name: 'Safety Violation', value: 22, fill: '#5B8BB8' },
  { name: 'Aggression/Violence', value: 18, fill: '#8B9264' },
  { name: 'Driver Defiance', value: 12, fill: '#9FA870' },
  { name: 'Property Damage', value: 8, fill: '#6B9BC5' },
  { name: 'Prohibited Items', value: 5, fill: '#7B8458' },
];

const incidentsByDriverData = [
  { driver: 'M. Chen', incidents: 8 },
  { driver: 'L. Anderson', incidents: 7 },
  { driver: 'D. Park', incidents: 6 },
  { driver: 'R. Martinez', incidents: 5 },
  { driver: 'J. Martinez', incidents: 4 },
  { driver: 'M. Washington', incidents: 3 },
  { driver: 'R. Williams', incidents: 3 },
  { driver: 'T. Nguyen', incidents: 2 },
  { driver: 'D. Coleman', incidents: 2 },
  { driver: 'A. Foster', incidents: 2 },
];

const incidentsByDayData = [
  { day: 'Mon', incidents: 8 },
  { day: 'Tue', incidents: 12 },
  { day: 'Wed', incidents: 6 },
  { day: 'Thu', incidents: 10 },
  { day: 'Fri', incidents: 15 },
];

// Custom SVG Pie Chart component to avoid recharts duplicate key bug
function CustomPieChart({ data }: { data: { name: string; value: number; fill: string }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = 65;
  const cy = 100;
  const radius = 55;
  let cumulativeAngle = -90;

  const slices = data.map((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const d = [
      `M ${cx} ${cy}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    return (
      <path
        key={`slice-${index}`}
        d={d}
        fill={item.fill}
        stroke="white"
        strokeWidth={2}
      >
        <title>{`${item.name}: ${item.value} (${Math.round((item.value / total) * 100)}%)`}</title>
      </path>
    );
  });

  return (
    <div className="flex items-center" style={{ height: 200 }}>
      <svg width={130} height={200} viewBox="0 0 130 200">
        {slices}
      </svg>
      <div className="flex flex-col gap-1 ml-4" style={{ fontFamily: 'var(--forge-font-family, Roboto, sans-serif)', fontSize: '11px' }}>
        {data.map((item, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="rounded-full flex-shrink-0"
              style={{ width: 8, height: 8, backgroundColor: item.fill }}
            />
            <span style={{ color: 'var(--forge-text-secondary, #666)', lineHeight: '16px' }}>
              {item.name} ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Custom SVG Horizontal Bar Chart (for Incidents by Driver - layout="vertical" means horizontal bars)
function CustomHorizontalBarChart({ data }: { data: { driver: string; incidents: number }[] }) {
  const maxValue = Math.max(...data.map(d => d.incidents));
  const barHeight = 22;
  const gap = 6;
  const labelWidth = 80;
  const chartWidth = 240;
  const svgHeight = data.length * (barHeight + gap) + 20;

  return (
    <div style={{ height: 200, overflow: 'hidden' }}>
      <svg width="100%" height={svgHeight} viewBox={`0 0 ${labelWidth + chartWidth + 30} ${svgHeight}`} preserveAspectRatio="xMinYMin meet">
        {data.map((item, index) => {
          const y = index * (barHeight + gap) + 8;
          const barWidth = maxValue > 0 ? (item.incidents / maxValue) * chartWidth : 0;
          return (
            <g key={`bar-${index}`}>
              <text
                x={labelWidth - 4}
                y={y + barHeight / 2 + 4}
                textAnchor="end"
                style={{ fontSize: '11px', fill: 'var(--forge-text-secondary, #666)', fontFamily: 'var(--forge-font-family, Roboto, sans-serif)' }}
              >
                {item.driver}
              </text>
              <rect
                x={labelWidth}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill="#4A6FA5"
              >
                <title>{`${item.driver}: ${item.incidents} incidents`}</title>
              </rect>
              <text
                x={labelWidth + barWidth + 6}
                y={y + barHeight / 2 + 4}
                style={{ fontSize: '11px', fill: 'var(--forge-text-secondary, #666)', fontFamily: 'var(--forge-font-family, Roboto, sans-serif)' }}
              >
                {item.incidents}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Custom SVG Vertical Bar Chart (for Incidents by Day)
function CustomVerticalBarChart({ data }: { data: { day: string; incidents: number }[] }) {
  const maxValue = Math.max(...data.map(d => d.incidents));
  const chartHeight = 140;
  const barWidth = 36;
  const gap = 16;
  const totalWidth = data.length * (barWidth + gap);
  const leftPad = 30;
  const bottomPad = 24;

  // Y-axis ticks
  const yTicks = [0, Math.round(maxValue / 2), maxValue];

  return (
    <div style={{ height: 200, overflow: 'hidden' }}>
      <svg width="100%" height={chartHeight + bottomPad + 10} viewBox={`0 0 ${leftPad + totalWidth + 10} ${chartHeight + bottomPad + 10}`} preserveAspectRatio="xMinYMin meet">
        {/* Y-axis ticks */}
        {yTicks.map((tick, i) => {
          const y = chartHeight - (tick / maxValue) * chartHeight + 5;
          return (
            <g key={`ytick-${i}`}>
              <text
                x={leftPad - 6}
                y={y + 3}
                textAnchor="end"
                style={{ fontSize: '11px', fill: 'var(--forge-text-secondary, #666)', fontFamily: 'var(--forge-font-family, Roboto, sans-serif)' }}
              >
                {tick}
              </text>
              <line
                x1={leftPad}
                x2={leftPad + totalWidth}
                y1={y}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
            </g>
          );
        })}
        {/* Bars */}
        {data.map((item, index) => {
          const barH = maxValue > 0 ? (item.incidents / maxValue) * chartHeight : 0;
          const x = leftPad + index * (barWidth + gap) + gap / 2;
          const y = chartHeight - barH + 5;
          return (
            <g key={`vbar-${index}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={4}
                fill="#4A6FA5"
              >
                <title>{`${item.day}: ${item.incidents} incidents`}</title>
              </rect>
              <text
                x={x + barWidth / 2}
                y={chartHeight + bottomPad}
                textAnchor="middle"
                style={{ fontSize: '11px', fill: 'var(--forge-text-secondary, #666)', fontFamily: 'var(--forge-font-family, Roboto, sans-serif)' }}
              >
                {item.day}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const activeIncidents = [
  {
    id: 'INC-2025-0044',
    student: 'Christopher Adams',
    studentId: 'STU-1016',
    type: 'Physical Altercation',
    description: 'Pushed another student causing minor injury',
    bus: 'Vehicle 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    time: '5 mins ago',
    date: '2025-03-16',
    severity: 'High',
    status: 'Open',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0043',
    student: 'Victoria Martinez',
    studentId: 'STU-9905',
    type: 'Disruptive Volume',
    description: 'Playing music loudly on phone without headphones',
    bus: 'Vehicle 14',
    route: 'Roosevelt High AM - Red',
    driver: 'Robert Thompson',
    time: '12 mins ago',
    date: '2025-03-16',
    severity: 'Medium',
    status: 'Open',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0042',
    student: 'Sarah Mitchell',
    studentId: 'STU-2891',
    type: 'Seat Refusal',
    description: 'Student refused to remain seated during transport',
    bus: 'Vehicle 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    time: '2 hours ago',
    date: '2025-03-15',
    severity: 'Medium',
    status: 'Open',
    assignedTo: 'Sarah Williams',
  },
];

const needsAttention = [
  {
    id: 'INC-2025-0044',
    student: 'Christopher Adams',
    type: 'Physical Altercation',
    bus: 'Bus 15',
    reason: 'High severity - student caused minor injury to another student',
    priority: 'critical',
    time: '5 mins ago',
    timeValue: 5,
    actionNeeded: 'Contact parents immediately and review with administration',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0052',
    student: 'Tyler Stewart',
    type: 'Physical Altercation',
    bus: 'Bus 12',
    reason: 'High severity - physical aggression requires immediate response',
    priority: 'critical',
    time: '8 hours ago',
    timeValue: 8 * 60,
    actionNeeded: 'Contact parents and schedule student meeting',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0051',
    student: 'Natalie Collins',
    type: 'Offensive Language',
    bus: 'Bus 8',
    reason: 'High severity - profanity directed at driver',
    priority: 'high',
    time: '9 hours ago',
    timeValue: 9 * 60,
    actionNeeded: 'Contact parents about disrespectful behavior toward staff',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0061',
    student: 'Kayla Bailey',
    type: 'Taunting/Bullying',
    bus: 'Bus 8',
    reason: 'High severity - bullying behavior requires intervention',
    priority: 'high',
    time: '2 days ago',
    timeValue: 48 * 60,
    actionNeeded: 'Parent meeting and anti-bullying intervention plan',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0045',
    student: 'Grace Phillips',
    type: 'Taunting/Bullying',
    bus: 'Bus 9',
    reason: 'High severity - ongoing bullying of younger student',
    priority: 'high',
    time: '1 day ago',
    timeValue: 24 * 60,
    actionNeeded: 'Contact parents and implement supervision plan',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0043',
    student: 'Victoria Martinez',
    type: 'Disruptive Volume',
    bus: 'Bus 14',
    reason: 'Open incident requires assignment of action items',
    priority: 'medium',
    time: '12 mins ago',
    timeValue: 12,
    actionNeeded: 'Contact parents about bus behavior expectations',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0048',
    student: 'Joshua Parker',
    type: 'Seat Refusal',
    bus: 'Bus 14',
    reason: 'Medium severity - sat in restricted driver area',
    priority: 'medium',
    time: '4 days ago',
    timeValue: 4 * 24 * 60,
    actionNeeded: 'Review bus safety rules with student and parents',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0057',
    student: 'Alexis Morgan',
    type: 'Eating/Drinking Violation',
    bus: 'Bus 12',
    reason: 'Open incident - left mess requiring cleanup',
    priority: 'medium',
    time: '13 days ago',
    timeValue: 13 * 24 * 60,
    actionNeeded: 'Contact parents about cleanliness expectations',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0055',
    student: 'Samantha Reed',
    type: 'Vandalism',
    bus: 'Bus 15',
    reason: 'Open incident - property damage requires parent meeting',
    priority: 'medium',
    time: '11 days ago',
    timeValue: 11 * 24 * 60,
    actionNeeded: 'Schedule parent meeting for restitution discussion',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0053',
    student: 'Hannah Morris',
    type: 'Taunting/Bullying',
    bus: 'Bus 14',
    reason: 'In Progress - awaiting parent meeting follow-up',
    priority: 'medium',
    time: '9 days ago',
    timeValue: 9 * 24 * 60,
    actionNeeded: 'Follow up on parent meeting and monitor behavior',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0059',
    student: 'Brianna Cooper',
    type: 'Physical Altercation',
    bus: 'Bus 9',
    reason: 'In Progress - high severity requires continued monitoring',
    priority: 'high',
    time: '15 days ago',
    timeValue: 15 * 24 * 60,
    actionNeeded: 'Review progress and determine if escalation needed',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0035',
    student: 'James Patterson',
    type: 'Verbal Abuse toward Driver',
    bus: 'Bus 12',
    reason: 'Overdue - incident reported 24+ hours ago',
    priority: 'medium',
    time: '26 hours ago',
    timeValue: 26 * 60,
    actionNeeded: 'Schedule parent meeting',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0037',
    student: 'Olivia Chen',
    type: 'Physical Altercation',
    bus: 'Bus 5',
    reason: 'Multiple students involved - investigation pending',
    priority: 'high',
    time: '6 hours ago',
    timeValue: 6 * 60,
    actionNeeded: 'Review video footage and interview students',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0038',
    student: 'Tyler Washington',
    type: 'Weapon Possession',
    bus: 'Bus 22',
    reason: 'Critical incident - no action taken in 4 hours',
    priority: 'critical',
    time: '4 hours ago',
    timeValue: 4 * 60,
    actionNeeded: 'Escalate to administration immediately',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0040',
    student: 'Emma Rodriguez',
    type: 'Taunting/Bullying',
    bus: 'Bus 15',
    reason: 'Driver awaiting response - 2 unread messages',
    priority: 'high',
    time: '1 hour ago',
    timeValue: 60,
    actionNeeded: 'Respond to driver communication',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0041',
    student: 'Marcus Johnson',
    type: 'Emergency Exit Misuse',
    bus: 'Bus 8',
    reason: 'High severity - requires immediate parent contact',
    priority: 'critical',
    time: '32 mins ago',
    timeValue: 32,
    actionNeeded: 'Contact parents and administration',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0042',
    student: 'Sarah Mitchell',
    type: 'Seat Refusal',
    bus: 'Bus 12',
    reason: 'Driver awaiting response on behavior plan',
    priority: 'medium',
    time: '2 hours ago',
    timeValue: 2 * 60,
    actionNeeded: 'Respond to driver and establish seating plan',
    assignedTo: 'Sarah Williams',
  },
];

// Communications with unanswered driver messages
const unansweredCommunications = [
  {
    incidentId: 'INC-2025-0042',
    student: 'Sarah Mitchell',
    driver: 'Michael Chen',
    type: 'Seat Refusal',
    lastMessage: 'She was trying to talk to friends in the back. When I asked her to sit down, she complied briefly but stood up again after a few minutes.',
    timeSent: '10:45 AM',
    severity: 'Medium',
  },
  {
    incidentId: 'INC-2025-0040',
    student: 'Emma Rodriguez',
    driver: 'David Park',
    type: 'Taunting/Bullying',
    lastMessage: 'Yes, I separated them and had Emma sit closer to the front. She stopped the verbal taunting but gave dirty looks. I think this needs parent involvement.',
    timeSent: 'Yesterday 4:30 PM',
    severity: 'High',
  },
];

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  onNavigateToCommunication: (incidentId: string, incidentData?: any) => void;
  onNavigateToMyIncidents: (assignedTo: string) => void;
  onNavigateToIncidentDetail?: (incident: any) => void;
  onNavigateToFilteredIncidents?: (filters: { status?: string; severity?: string; dateAfter?: string }) => void;
  onNavigateToStudentsWithActiveIncidents?: () => void;
}

export function DashboardPage({ onNavigate, onNavigateToCommunication, onNavigateToMyIncidents, onNavigateToIncidentDetail, onNavigateToFilteredIncidents, onNavigateToStudentsWithActiveIncidents }: DashboardPageProps) {
  const [triageDetailsOpen, setTriageDetailsOpen] = useState(false);
  const [selectedTriageItem, setSelectedTriageItem] = useState<any>(null);
  const [editingIncident, setEditingIncident] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [reassignDialogOpen, setReassignDialogOpen] = useState(false);
  const [reassigningIncident, setReassigningIncident] = useState<any>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');
  const [inProgressItems, setInProgressItems] = useState<Set<string>>(new Set());

  // Forge dialog refs
  const triageDialogRef = useRef<HTMLElement>(null);
  const editDialogRef = useRef<HTMLElement>(null);
  const reassignDialogRef = useRef<HTMLElement>(null);

  // Sync triageDetailsOpen state with forge-dialog
  useEffect(() => { const el = triageDialogRef.current as any; if (!el) return; el.open = triageDetailsOpen; }, [triageDetailsOpen]);
  useEffect(() => { const el = triageDialogRef.current as any; if (!el) return; const handler = () => setTriageDetailsOpen(false); el.addEventListener('forge-dialog-close', handler); return () => el.removeEventListener('forge-dialog-close', handler); }, []);

  // Sync editDialogOpen state with forge-dialog
  useEffect(() => { const el = editDialogRef.current as any; if (!el) return; el.open = editDialogOpen; }, [editDialogOpen]);
  useEffect(() => { const el = editDialogRef.current as any; if (!el) return; const handler = () => setEditDialogOpen(false); el.addEventListener('forge-dialog-close', handler); return () => el.removeEventListener('forge-dialog-close', handler); }, []);

  // Sync reassignDialogOpen state with forge-dialog
  useEffect(() => { const el = reassignDialogRef.current as any; if (!el) return; el.open = reassignDialogOpen; }, [reassignDialogOpen]);
  useEffect(() => { const el = reassignDialogRef.current as any; if (!el) return; const handler = () => setReassignDialogOpen(false); el.addEventListener('forge-dialog-close', handler); return () => el.removeEventListener('forge-dialog-close', handler); }, []);

  // List of available assignees
  const availableAssignees = [
    'Sarah Williams',
    'Jane Doe',
    'Michael Chen',
    'David Park',
    'Robert Thompson',
  ];

  // Incidents that have communications on the Communications page
  const incidentsWithCommunications = ['INC-2025-0042', 'INC-2025-0041', 'INC-2025-0040'];

  // Filter incidents assigned to the current user
  const myIncidents = needsAttention.filter(item => item.assignedTo === currentUser.name);
  
  // Get the 3 most urgent of my incidents (sorted by priority and time)
  const myTopIncidents = [...myIncidents]
    .sort((a, b) => {
      // Sort by priority first (critical > high > medium)
      const priorityOrder = { critical: 3, high: 2, medium: 1 };
      const priorityDiff = (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
                          (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
      if (priorityDiff !== 0) return priorityDiff;
      // Then by time (oldest first)
      return b.timeValue - a.timeValue;
    })
    .slice(0, 3);

  // Get the 3 oldest items (longest waiting) for general triage
  const oldestNeedingAttention = [...needsAttention]
    .sort((a, b) => b.timeValue - a.timeValue)
    .slice(0, 3);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', badge: 'bg-red-600 text-white', borderLeft: 'border-l-red-500' };
      case 'high':
        return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900', badge: 'bg-orange-600 text-white', borderLeft: 'border-l-orange-500' };
      case 'medium':
        return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', badge: 'bg-amber-600 text-white', borderLeft: 'border-l-amber-500' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-900', badge: 'bg-gray-600 text-white', borderLeft: 'border-l-gray-500' };
    }
  };

  return (
    <div style={{ padding: 'var(--forge-spacing-xlarge)' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <h1 style={{ margin: 0, marginBottom: '8px' }}>Dashboard</h1>
        <p className="text-muted-foreground" style={{ margin: 0 }}>
          Overview of student incident tracking and management
        </p>
      </div>

      {/* My Incidents Section */}
      {myIncidents.length > 0 && (
        <div style={{ marginBottom: 'var(--forge-spacing-large)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="flex items-center gap-2" style={{ margin: 0 }}>
                  My Incidents
                  <Badge className="bg-blue-600 text-white">{myIncidents.length}</Badge>
                </h2>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem', margin: 0, marginTop: '4px' }}>
                  Assigned to {currentUser.name}
                </p>
              </div>
            </div>
            <ForgeButton 
              variant="outline" 
              size="sm" 
              onClick={() => onNavigateToMyIncidents(currentUser.name)}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              View All My Incidents
              <ArrowRight className="h-4 w-4 ml-2" />
            </ForgeButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myTopIncidents.map((item) => {
              const colors = getPriorityColor(item.priority);
              return (
                <ForgeCard
                  key={item.id}
                  className="border hover:shadow-md transition-all border-l-4 relative"
                  style={{ boxShadow: 'var(--forge-elevation-1)', borderLeftColor: colors.borderLeft.split('-')[2] === 'red' ? '#dc2626' : colors.borderLeft.split('-')[2] === 'orange' ? '#ea580c' : '#f59e0b' }}
                >
                  <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => {
                          if (onNavigateToIncidentDetail) {
                            // Convert triage item to full incident format for navigation
                            // Map priority to severity for workflow assignment
                            let severity = 'Medium';
                            if (item.priority === 'critical') {
                              severity = 'High';
                            } else if (item.priority === 'high') {
                              severity = 'High';
                            } else if (item.priority === 'medium') {
                              severity = 'Medium';
                            } else if (item.priority === 'low') {
                              severity = 'Low';
                            }
                            
                            const fullIncident = {
                              ...item,
                              description: item.reason,
                              route: item.bus,
                              severity: severity,
                              status: 'Open',
                              date: new Date().toISOString().split('T')[0],
                              studentId: '', // Will be populated from incidents page
                              driver: '', // Will be populated from incidents page
                              createdBy: '', // Will be populated from incidents page
                            };
                            onNavigateToIncidentDetail(fullIncident);
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="font-medium" style={{ fontSize: '0.875rem' }}>{item.id}</div>
                        </div>
                        <p className="text-muted-foreground" style={{ fontSize: '0.8125rem', margin: 0 }}>
                          {item.student}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={colors.badge} style={{ fontSize: '0.6875rem', padding: '2px 8px' }}>
                          {item.priority.toUpperCase()}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <button
                              className="h-8 w-8 p-0 inline-flex items-center justify-center rounded hover:bg-black/5"
                              style={{
                                backgroundColor: 'transparent',
                                color: 'var(--forge-text-secondary, #6b7280)',
                                border: 'none',
                                cursor: 'pointer',
                                flexShrink: 0,
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Quick actions</span>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onNavigateToIncidentDetail) {
                                  // Map priority to severity for workflow assignment
                                  let severity = 'Medium';
                                  if (item.priority === 'critical') {
                                    severity = 'High';
                                  } else if (item.priority === 'high') {
                                    severity = 'High';
                                  } else if (item.priority === 'medium') {
                                    severity = 'Medium';
                                  } else if (item.priority === 'low') {
                                    severity = 'Low';
                                  }
                                  
                                  const fullIncident = {
                                    ...item,
                                    description: item.reason,
                                    route: item.bus,
                                    severity: severity,
                                    status: 'Open',
                                    date: new Date().toISOString().split('T')[0],
                                    studentId: '',
                                    driver: '',
                                    createdBy: '',
                                  };
                                  onNavigateToIncidentDetail(fullIncident);
                                }
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingIncident(item);
                                setEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Incident</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigateToCommunication(item.id, {
                                  student: item.student,
                                  type: item.type,
                                  bus: item.bus,
                                  priority: item.priority,
                                  assignedTo: item.assignedTo,
                                });
                              }}
                            >
                              <Send className="mr-2 h-4 w-4" />
                              <span>Message Driver</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setReassigningIncident(item);
                                setSelectedAssignee(item.assignedTo);
                                setReassignDialogOpen(true);
                              }}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              <span>Reassign</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setInProgressItems(prev => {
                                  const next = new Set(prev);
                                  next.add(item.id);
                                  return next;
                                });
                                toast.success('Status Updated', {
                                  description: `${item.id} marked as In Progress`,
                                });
                              }}
                            >
                              {inProgressItems.has(item.id) ? (
                                <CheckCircle className="mr-2 h-4 w-4" />
                              ) : (
                                <Clock className="mr-2 h-4 w-4" />
                              )}
                              <span>{inProgressItems.has(item.id) ? 'In Progress' : 'Mark In Progress'}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="mb-2">
                      <Badge variant="outline" style={{ fontSize: '0.75rem' }}>{item.type}</Badge>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground mb-2" style={{ fontSize: '0.8125rem' }}>
                      <Clock className="h-3 w-3" />
                      <span>{item.bus} • {item.time}</span>
                    </div>

                    <div className="flex items-start gap-1 text-muted-foreground mb-3" style={{ fontSize: '0.8125rem' }}>
                      <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{item.reason}</span>
                    </div>

                    {/* Quick Action Buttons */}
                    <div style={{
                      display: 'flex', gap: 'var(--forge-spacing-xsmall)',
                      paddingTop: 'var(--forge-spacing-small)',
                      borderTop: '1px solid var(--forge-theme-outline)',
                    }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onNavigateToIncidentDetail) {
                            let severity = 'Medium';
                            if (item.priority === 'critical' || item.priority === 'high') severity = 'High';
                            else if (item.priority === 'low') severity = 'Low';
                            const fullIncident = {
                              ...item,
                              description: item.reason,
                              route: item.bus,
                              severity,
                              status: 'Open',
                              date: new Date().toISOString().split('T')[0],
                              studentId: '', driver: '', createdBy: '',
                            };
                            onNavigateToIncidentDetail(fullIncident);
                          }
                        }}
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                          padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)',
                          border: '1px solid var(--forge-theme-outline-medium)',
                          borderRadius: 'var(--forge-shape-medium)',
                          background: 'var(--forge-theme-surface)',
                          cursor: 'pointer', fontFamily: 'Roboto, sans-serif', fontSize: '0.75rem',
                          color: 'var(--forge-theme-text-high)',
                        }}
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToCommunication(item.id, {
                            student: item.student, type: item.type, bus: item.bus,
                            priority: item.priority, assignedTo: item.assignedTo,
                          });
                        }}
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                          padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)',
                          border: '1px solid var(--forge-theme-outline-medium)',
                          borderRadius: 'var(--forge-shape-medium)',
                          background: 'var(--forge-theme-surface)',
                          cursor: 'pointer', fontFamily: 'Roboto, sans-serif', fontSize: '0.75rem',
                          color: 'var(--forge-theme-text-high)',
                        }}
                      >
                        <MessageSquare className="h-3 w-3" />
                        Message
                      </button>
                      <button
                        disabled={inProgressItems.has(item.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInProgressItems(prev => {
                            const next = new Set(prev);
                            next.add(item.id);
                            return next;
                          });
                          toast.success('Status Updated', {
                            description: `${item.id} has been marked as In Progress`,
                          });
                        }}
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                          padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)',
                          border: inProgressItems.has(item.id)
                            ? '1px solid #86efac'
                            : '1px solid var(--forge-theme-outline-medium)',
                          borderRadius: 'var(--forge-shape-medium)',
                          background: inProgressItems.has(item.id) ? '#f0fdf4' : 'var(--forge-theme-surface)',
                          cursor: inProgressItems.has(item.id) ? 'default' : 'pointer',
                          fontFamily: 'Roboto, sans-serif', fontSize: '0.75rem',
                          color: inProgressItems.has(item.id) ? '#15803d' : 'var(--forge-theme-text-high)',
                          opacity: inProgressItems.has(item.id) ? 0.8 : 1,
                        }}
                      >
                        {inProgressItems.has(item.id) ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {inProgressItems.has(item.id) ? 'In Progress' : 'Mark In Progress'}
                      </button>
                    </div>
                  </div>
                </ForgeCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <ForgeCard
          style={{ boxShadow: 'var(--forge-elevation-1)', cursor: 'pointer' }}
          className="hover:shadow-lg transition-shadow"
          onClick={() => onNavigateToFilteredIncidents?.({ status: 'Open', severity: 'High' })}
        >
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: '0.875rem', fontWeight: 500, fontFamily: 'var(--forge-font-family)' }}>Critical Incidents</h3>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#dc2626', fontFamily: 'var(--forge-font-family)' }}>8</div>
            <p className="text-muted-foreground" style={{ fontSize: '0.75rem', margin: 0, fontFamily: 'var(--forge-font-family)' }}>
              High severity requiring action
            </p>
          </div>
        </ForgeCard>

        <ForgeCard
          style={{ boxShadow: 'var(--forge-elevation-1)', cursor: 'pointer' }}
          className="hover:shadow-lg transition-shadow"
          onClick={() => onNavigateToFilteredIncidents?.({ status: 'Open' })}
        >
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: '0.875rem', fontWeight: 500, fontFamily: 'var(--forge-font-family)' }}>Open Incidents</h3>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--brand-blue-dark)', fontFamily: 'var(--forge-font-family)' }}>23</div>
            <p className="text-muted-foreground" style={{ fontSize: '0.75rem', margin: 0, fontFamily: 'var(--forge-font-family)' }}>
              <TrendingUp className="inline h-3 w-3" /> +12% from last month
            </p>
          </div>
        </ForgeCard>

        <ForgeCard
          style={{ boxShadow: 'var(--forge-elevation-1)', cursor: 'pointer' }}
          className="hover:shadow-lg transition-shadow"
          onClick={() => onNavigateToStudentsWithActiveIncidents?.()}
        >
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: '0.875rem', fontWeight: 500, fontFamily: 'var(--forge-font-family)' }}>Students w/ Incidents</h3>
            <Users className="h-4 w-4 text-purple-600" />
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#9333ea', fontFamily: 'var(--forge-font-family)' }}>26</div>
            <p className="text-muted-foreground" style={{ fontSize: '0.75rem', margin: 0, fontFamily: 'var(--forge-font-family)' }}>
              Click to view students with active incidents
            </p>
          </div>
        </ForgeCard>

        <ForgeCard
          style={{ boxShadow: 'var(--forge-elevation-1)', cursor: 'pointer' }}
          className="hover:shadow-lg transition-shadow"
          onClick={() => {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const dateStr = sevenDaysAgo.toISOString().split('T')[0];
            onNavigateToFilteredIncidents?.({ status: 'Open', dateAfter: dateStr });
          }}
        >
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: '0.875rem', fontWeight: 500, fontFamily: 'var(--forge-font-family)' }}>Incidents This Week</h3>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#16a34a', fontFamily: 'var(--forge-font-family)' }}>12</div>
            <p className="text-muted-foreground" style={{ fontSize: '0.75rem', margin: 0, fontFamily: 'var(--forge-font-family)' }}>
              -18% from last week
            </p>
          </div>
        </ForgeCard>

        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Avg Response Time</h3>
            <Clock className="h-4 w-4 text-blue-500" />
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>4.2<span style={{ fontSize: '1rem' }}>hrs</span></div>
            <p className="text-muted-foreground" style={{ fontSize: '0.75rem', margin: 0 }}>
              Target: {'<'} 6 hours
            </p>
          </div>
        </ForgeCard>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        {/* Incident Type Distribution */}
        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)', paddingBottom: 'var(--forge-spacing-small)' }}>
            <h3 className="forge-typography--heading4" style={{ fontSize: '1rem' }}>Incidents by Type</h3>
          </div>
          <div style={{ paddingTop: 0 }}>
            <CustomPieChart data={incidentTypeData} />
          </div>
        </ForgeCard>

        {/* Incidents by Driver */}
        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)', paddingBottom: 'var(--forge-spacing-small)' }}>
            <h3 className="forge-typography--heading4" style={{ fontSize: '1rem' }}>Incidents by Driver</h3>
          </div>
          <div style={{ paddingTop: 0 }}>
            <CustomHorizontalBarChart data={incidentsByDriverData} />
          </div>
        </ForgeCard>

        {/* Incidents by Day of Week */}
        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)', paddingBottom: 'var(--forge-spacing-small)' }}>
            <h3 className="forge-typography--heading4" style={{ fontSize: '1rem' }}>Incidents by Day</h3>
          </div>
          <div style={{ paddingTop: 0 }}>
            <CustomVerticalBarChart data={incidentsByDayData} />
          </div>
        </ForgeCard>
      </div>

      {/* Active Incidents Table */}
      <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
        <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between">
          <h3 className="forge-typography--heading4">Active Incidents</h3>
          <ForgeButton variant="outlined" size="sm" onClick={() => onNavigate('incidents')}>
            View All
          </ForgeButton>
        </div>
        <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
          <div className="overflow-x-auto">
            <table className="forge-table">
              <thead>
                <tr>
                  <th className="forge-table-cell forge-table-cell--header">Incident ID</th>
                  <th className="forge-table-cell forge-table-cell--header">Student</th>
                  <th className="forge-table-cell forge-table-cell--header">Type</th>
                  <th className="forge-table-cell forge-table-cell--header">Severity</th>
                  <th className="forge-table-cell forge-table-cell--header">Assigned To</th>
                  <th className="forge-table-cell forge-table-cell--header">Time</th>
                  <th className="forge-table-cell forge-table-cell--header">Messages</th>
                </tr>
              </thead>
              <tbody>
                {activeIncidents.map((incident) => (
                  <tr
                    key={incident.id}
                    className="forge-table-row"
                    onClick={() => {
                      if (onNavigateToIncidentDetail) {
                        onNavigateToIncidentDetail({
                          ...incident,
                          description: incident.description,
                          route: incident.route,
                        });
                      }
                    }}
                    style={{ cursor: 'pointer', transition: 'background-color 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--forge-theme-primary-container-minimum)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                  >
                    <td className="forge-table-cell" style={{ fontWeight: 500, fontFamily: 'var(--forge-font-family)' }}>
                      {incident.id}
                    </td>
                    <td className="forge-table-cell" style={{ fontFamily: 'var(--forge-font-family)' }}>{incident.student}</td>
                    <td className="forge-table-cell">
                      <Badge variant="outline" style={{ fontFamily: 'var(--forge-font-family)' }}>{incident.type}</Badge>
                    </td>
                    <td className="forge-table-cell">
                      <Badge
                        variant={incident.severity === 'High' ? 'destructive' : 'secondary'}
                        style={{ fontFamily: 'var(--forge-font-family)' }}
                      >
                        {incident.severity}
                      </Badge>
                    </td>
                    <td className="forge-table-cell" style={{ fontFamily: 'var(--forge-font-family)' }}>{incident.assignedTo}</td>
                    <td className="forge-table-cell" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--forge-theme-text-low)' }}>
                      {incident.time}
                    </td>
                    <td className="forge-table-cell">
                      {incidentsWithCommunications.includes(incident.id) && (
                        <ForgeButton
                          variant="ghost"
                          size="sm"
                          onClick={() => onNavigateToCommunication(incident.id)}
                          title="View driver communication"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </ForgeButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ForgeCard>

      {/* Triage Item Details Dialog */}
      {/* @ts-ignore */}
      <forge-dialog ref={triageDialogRef}>
        <div style={{ padding: '24px', maxWidth: '672px', minWidth: '400px' }}>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '1.125rem', fontWeight: 600 }}>Incident Details - {selectedTriageItem?.id}</h2>
          <p className="text-muted-foreground" style={{ margin: '0 0 16px 0', fontSize: '0.875rem' }}>
            Review incident triage information and take action
          </p>
          {selectedTriageItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Student</div>
                  <div style={{ fontWeight: 500 }}>{selectedTriageItem.student}</div>
                </div>
                <div>
                  <div className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Priority</div>
                  <Badge className={getPriorityColor(selectedTriageItem.priority).badge}>
                    {selectedTriageItem.priority.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <div className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Incident Type</div>
                  <Badge variant="outline">{selectedTriageItem.type}</Badge>
                </div>
                <div>
                  <div className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Vehicle</div>
                  <div>{selectedTriageItem.bus}</div>
                </div>
                <div>
                  <div className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Time Reported</div>
                  <div>{selectedTriageItem.time}</div>
                </div>
              </div>

              <div>
                <div className="text-muted-foreground" style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                  Why This Needs Attention
                </div>
                <Alert className={`${getPriorityColor(selectedTriageItem.priority).bg} border ${getPriorityColor(selectedTriageItem.priority).border}`}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className={getPriorityColor(selectedTriageItem.priority).text}>
                    {selectedTriageItem.reason}
                  </AlertDescription>
                </Alert>
              </div>

              <div>
                <div className="text-muted-foreground" style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                  Recommended Action
                </div>
                <p className="bg-blue-50 border border-blue-200 rounded-md p-3 text-blue-900">
                  {selectedTriageItem.actionNeeded}
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <ForgeButton
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  style={{ color: '#ffffff' }}
                  onClick={() => {
                    setTriageDetailsOpen(false);
                    onNavigate('incidents');
                  }}
                >
                  Take Action on Incident
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ForgeButton>
                <ForgeButton
                  variant="outline"
                  onClick={() => {
                    setTriageDetailsOpen(false);
                    onNavigate('communications');
                  }}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Driver
                </ForgeButton>
              </div>
            </div>
          )}
        </div>
      {/* @ts-ignore */}
      </forge-dialog>

      {/* Edit Incident Dialog */}
      {/* @ts-ignore */}
      <forge-dialog ref={editDialogRef}>
        <div style={{ padding: '24px', maxWidth: '720px', minWidth: '480px' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '1.125rem', fontWeight: 600 }}>
                Edit Incident — {editingIncident?.id}
              </h2>
              <p className="text-muted-foreground" style={{ margin: 0, fontSize: '0.875rem' }}>
                Update incident details and information
              </p>
            </div>
            <button
              onClick={() => setEditDialogOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--forge-text-secondary, #6b7280)' }}
            >
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>×</span>
            </button>
          </div>
          {editingIncident && (
            <EditIncidentDialog
              incident={editingIncident}
              onClose={() => setEditDialogOpen(false)}
              onSave={() => setEditDialogOpen(false)}
            />
          )}
        </div>
      {/* @ts-ignore */}
      </forge-dialog>

      {/* Reassign Dialog */}
      {/* @ts-ignore */}
      <forge-dialog ref={reassignDialogRef}>
        <div style={{ padding: '24px', maxWidth: '448px', minWidth: '350px' }}>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '1.125rem', fontWeight: 600 }}>Reassign Incident - {reassigningIncident?.id}</h2>
          <p className="text-muted-foreground" style={{ margin: '0 0 16px 0', fontSize: '0.875rem' }}>
            Select a new assignee for this incident
          </p>
          {reassigningIncident && (
            <div className="space-y-4">
              <div>
                <div className="text-muted-foreground" style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                  Current Assignee
                </div>
                <div style={{ fontWeight: 500 }}>{reassigningIncident.assignedTo}</div>
              </div>

              <div>
                <div className="text-muted-foreground" style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                  New Assignee
                </div>
                <select
                  value={selectedAssignee}
                  onChange={(e) => setSelectedAssignee(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  style={{ fontSize: '0.875rem' }}
                >
                  {availableAssignees.map((assignee) => (
                    <option key={assignee} value={assignee}>
                      {assignee}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <ForgeButton
                  className="flex-1"
                  onClick={() => {
                    toast.success('Incident Reassigned', {
                      description: `${reassigningIncident.id} has been assigned to ${selectedAssignee}`,
                    });
                    setReassignDialogOpen(false);
                    setReassigningIncident(null);
                  }}
                >
                  Reassign Incident
                </ForgeButton>
                <ForgeButton
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setReassignDialogOpen(false);
                    setReassigningIncident(null);
                  }}
                >
                  Cancel
                </ForgeButton>
              </div>
            </div>
          )}
        </div>
      {/* @ts-ignore */}
      </forge-dialog>
    </div>
  );
}