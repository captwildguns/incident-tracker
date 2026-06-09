import { useState, useRef, useEffect } from 'react';
import { ForgeButton } from '@tylertech/forge-react';
import { defineButtonComponent, defineDialogComponent, defineTextFieldComponent, defineTabBarComponent, defineTabComponent, defineBadgeComponent, defineIconComponent } from '@tylertech/forge';
defineButtonComponent();
defineDialogComponent();
defineTextFieldComponent();
defineTabBarComponent();
defineTabComponent();
defineBadgeComponent();
defineIconComponent();
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  UserPlus,
  X,
  Copy,
  Eye,
  ChevronDown,
  ChevronUp,
  Shield,
  AlertTriangle,
  GitBranch,
  ExternalLink,
  Lock,
} from 'lucide-react';
import {
  INCIDENT_TYPES as SEED_INCIDENT_TYPES,
  INCIDENT_CATEGORIES,
  IncidentType,
} from '../incidents/IncidentTypes';
import { EmailTemplate, INITIAL_EMAIL_TEMPLATES } from '../../data/email-templates';
import { ForgeMultiSelect } from '../ui/forge-multiselect';
import { workflows as SEED_WORKFLOWS, Workflow } from '../../data/workflows';

// ─── Mock Student Transportation users (stand-in for real ST directory) ──────
const ST_USERS = [
  { id: 'ST-1001', firstName: 'Angela', lastName: 'Brooks', email: 'angela.brooks@district.edu', title: 'Transportation Director', department: 'Student Transportation' },
  { id: 'ST-1002', firstName: 'Carlos', lastName: 'Medina', email: 'carlos.medina@district.edu', title: 'Safety Coordinator', department: 'Student Transportation' },
  { id: 'ST-1003', firstName: 'Denise', lastName: 'Harmon', email: 'denise.harmon@district.edu', title: 'Fleet Manager', department: 'Student Transportation' },
  { id: 'ST-1004', firstName: 'Frank', lastName: 'Okafor', email: 'frank.okafor@district.edu', title: 'Bus Driver', department: 'Student Transportation' },
  { id: 'ST-1005', firstName: 'Gloria', lastName: 'Patel', email: 'gloria.patel@district.edu', title: 'Bus Driver', department: 'Student Transportation' },
  { id: 'ST-1006', firstName: 'Henry', lastName: 'Lawson', email: 'henry.lawson@district.edu', title: 'Mechanic', department: 'Student Transportation' },
  { id: 'ST-1007', firstName: 'Iris', lastName: 'Nguyen', email: 'iris.nguyen@district.edu', title: 'School Nurse', department: 'Health Services' },
  { id: 'ST-1008', firstName: 'Jerome', lastName: 'Wallace', email: 'jerome.wallace@district.edu', title: 'School Principal', department: 'Lincoln Middle School' },
  { id: 'ST-1009', firstName: 'Karen', lastName: 'Singh', email: 'karen.singh@district.edu', title: 'Administrator', department: 'District Office' },
  { id: 'ST-1010', firstName: 'Luis', lastName: 'Torres', email: 'luis.torres@district.edu', title: 'Bus Driver', department: 'Student Transportation' },
  { id: 'ST-1011', firstName: 'Megan', lastName: 'Ford', email: 'megan.ford@district.edu', title: 'Safety Coordinator', department: 'Student Transportation' },
  { id: 'ST-1012', firstName: 'Nathan', lastName: 'Kim', email: 'nathan.kim@district.edu', title: 'Fleet Manager', department: 'Student Transportation' },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface UserRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  status: 'Active' | 'Inactive';
  lastLogin?: string;
}

// ─── Roles ───────────────────────────────────────────────────────────────────

const AVAILABLE_ROLES = [
  'Driver',
  'Safety Coordinator',
  'Administrator',
  'Fleet Manager',
  'Mechanic',
  'School Principal',
  'Nurse',
];

// ─── Seed Data ───────────────────────────────────────────────────────────────

const INITIAL_USERS: UserRecord[] = [
  { id: 'U-001', firstName: 'Sarah', lastName: 'Williams', email: 'sarah.williams@district.edu', roles: ['Safety Coordinator', 'Administrator'], status: 'Active', lastLogin: '2026-03-17 08:22 AM' },
  { id: 'U-002', firstName: 'James', lastName: 'Rodriguez', email: 'james.rodriguez@district.edu', roles: ['Driver'], status: 'Active', lastLogin: '2026-03-17 06:45 AM' },
  { id: 'U-003', firstName: 'Patricia', lastName: 'Chen', email: 'patricia.chen@district.edu', roles: ['Fleet Manager'], status: 'Active', lastLogin: '2026-03-16 04:30 PM' },
  { id: 'U-004', firstName: 'Michael', lastName: 'Thompson', email: 'michael.thompson@district.edu', roles: ['Driver'], status: 'Active', lastLogin: '2026-03-17 06:30 AM' },
  { id: 'U-005', firstName: 'Lisa', lastName: 'Nguyen', email: 'lisa.nguyen@district.edu', roles: ['School Principal'], status: 'Active', lastLogin: '2026-03-16 03:15 PM' },
  { id: 'U-006', firstName: 'Robert', lastName: 'Garcia', email: 'robert.garcia@district.edu', roles: ['Mechanic'], status: 'Active', lastLogin: '2026-03-15 02:00 PM' },
  { id: 'U-007', firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@district.edu', roles: ['Nurse'], status: 'Active', lastLogin: '2026-03-17 07:50 AM' },
  { id: 'U-008', firstName: 'David', lastName: 'Martinez', email: 'david.martinez@district.edu', roles: ['Driver', 'Mechanic'], status: 'Inactive', lastLogin: '2026-02-28 11:00 AM' },
];

const INITIAL_TEMPLATES: EmailTemplate[] = INITIAL_EMAIL_TEMPLATES;

// ─── Shared Inline Styles ────────────────────────────────────────────────────

const sectionHeaderStyle: React.CSSProperties = {
  fontSize: 'var(--text-lg)',
  fontWeight: 'var(--forge-font-weight-medium)',
  fontFamily: 'var(--forge-font-family)',
  color: 'var(--foreground)',
};

const cardStyle: React.CSSProperties = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--forge-radius-large)',
  padding: 'var(--forge-spacing-large)',
  boxShadow: 'var(--forge-elevation-1)',
};

const labelStyle: React.CSSProperties = {
  fontSize: 'var(--text-sm)',
  fontFamily: 'var(--forge-font-family)',
  fontWeight: 'var(--forge-font-weight-medium)',
  color: 'var(--foreground)',
  display: 'block',
  marginBottom: 'var(--forge-spacing-xxsmall)',
};

const mutedTextStyle: React.CSSProperties = {
  fontSize: 'var(--text-sm)',
  fontFamily: 'var(--forge-font-family)',
  color: 'var(--muted-foreground)',
};

const inputWrapperStyle: React.CSSProperties = {
  marginTop: 'var(--forge-spacing-xxsmall)',
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--forge-spacing-small)',
  borderRadius: 'var(--forge-radius-medium)',
  border: '1px solid var(--border)',
  fontSize: 'var(--text-base)',
  fontFamily: 'var(--forge-font-family)',
  background: 'var(--input-background)',
};

const tableHeaderCellStyle: React.CSSProperties = {
  padding: 'var(--forge-spacing-small) var(--forge-spacing-medium)',
  fontSize: 'var(--text-sm)',
  fontFamily: 'var(--forge-font-family)',
  fontWeight: 'var(--forge-font-weight-medium)',
  color: 'var(--muted-foreground)',
  textAlign: 'left',
  borderBottom: '2px solid var(--border)',
};

const tableCellStyle: React.CSSProperties = {
  padding: 'var(--forge-spacing-small) var(--forge-spacing-medium)',
  fontSize: 'var(--text-base)',
  fontFamily: 'var(--forge-font-family)',
  color: 'var(--foreground)',
  borderBottom: '1px solid var(--forge-color-border-subtle)',
  verticalAlign: 'middle',
};

// ─── Role Badge Color Helper ─────────────────────────────────────────────────

function roleBadgeStyle(role: string): React.CSSProperties {
  const map: Record<string, { bg: string; border: string }> = {
    Driver: { bg: 'rgba(74, 111, 165, 0.10)', border: 'var(--brand-blue-medium)' },
    'Safety Coordinator': { bg: 'rgba(159, 168, 112, 0.15)', border: 'var(--brand-olive-medium)' },
    Administrator: { bg: 'rgba(63, 81, 181, 0.10)', border: 'var(--primary)' },
    'Fleet Manager': { bg: 'rgba(74, 111, 165, 0.10)', border: 'var(--brand-blue-dark)' },
    Mechanic: { bg: 'rgba(0,0,0,0.06)', border: 'var(--muted-foreground)' },
    'School Principal': { bg: 'rgba(255, 193, 7, 0.12)', border: 'var(--secondary)' },
    Nurse: { bg: 'rgba(176, 0, 32, 0.08)', border: 'var(--destructive)' },
  };
  const c = map[role] || { bg: 'var(--muted)', border: 'var(--border)' };
  return {
    background: c.bg,
    borderColor: c.border,
    fontSize: 'var(--text-xs)',
    fontFamily: 'var(--forge-font-family)',
  };
}

// Category color helper
function categoryBadgeStyle(cat: string): React.CSSProperties {
  const map: Record<string, { bg: string; border: string; color: string }> = {
    Notification: { bg: 'rgba(74, 111, 165, 0.10)', border: 'var(--brand-blue-medium)', color: 'var(--brand-blue-dark)' },
    Approval: { bg: 'rgba(255, 193, 7, 0.12)', border: 'var(--secondary)', color: '#8B6914' },
  };
  const c = map[cat] || { bg: 'var(--muted)', border: 'var(--border)', color: 'var(--foreground)' };
  return {
    background: c.bg,
    borderColor: c.border,
    color: c.color,
    fontSize: 'var(--text-xs)',
    fontFamily: 'var(--forge-font-family)',
  };
}

// ─── Permission Groups ────────────────────────────────────────────────────────

type PermCol = 'read' | 'add' | 'edit' | 'delete';

interface PermArea {
  id: string;
  label: string;
  read: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
}

interface PermTabData { tabId: string; areas: PermArea[]; }

const PERM_TAB_DEFS: { id: string; label: string; areas: string[] }[] = [
  { id: 'general',        label: 'General',        areas: ['My Incidents', 'All Incidents'] },
  { id: 'workflows',      label: 'Workflows',       areas: ['Workflows', 'Workflow Steps', 'Approvals'] },
  { id: 'communications', label: 'Communications',  areas: ['Messages', 'Notifications'] },
  { id: 'reports',        label: 'Reports',         areas: ['Quick Reports', 'Data Export'] },
  { id: 'administration', label: 'Administration',  areas: ['Users', 'Incident Types', 'Workflow Templates', 'Email Templates', 'Permission Groups'] },
];

const PERM_COLS: { key: PermCol; label: string }[] = [
  { key: 'read',   label: 'Read' },
  { key: 'add',    label: 'Add' },
  { key: 'edit',   label: 'Edit' },
  { key: 'delete', label: 'Delete' },
];

const GROUP_COLORS = ['#4A6FA5', '#3F51B5', '#7B8458', '#607D8B', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6'];

function makeTabs(overrides: Partial<Record<string, Partial<Record<string, Partial<Record<PermCol, boolean>>>>>> = {}): PermTabData[] {
  return PERM_TAB_DEFS.map(t => ({
    tabId: t.id,
    areas: t.areas.map(label => {
      const o = overrides[t.id]?.[label] ?? {};
      return { id: label.toLowerCase().replace(/\s+/g, '-'), label, read: o.read ?? false, add: o.add ?? false, edit: o.edit ?? false, delete: o.delete ?? false };
    }),
  }));
}

function countGroupPerms(tabs: PermTabData[]) {
  return tabs.reduce((n, t) => n + t.areas.reduce((m, a) => m + (a.read?1:0) + (a.add?1:0) + (a.edit?1:0) + (a.delete?1:0), 0), 0);
}
const TOTAL_GROUP_PERMS = PERM_TAB_DEFS.reduce((n, t) => n + t.areas.length * 4, 0);

interface PermissionGroup { id: string; name: string; description: string; color: string; active: boolean; tabs: PermTabData[]; }

const ALL_ON = { read: true, add: true, edit: true, delete: false };

const INITIAL_GROUPS: PermissionGroup[] = [
  {
    id: 'G-001', name: 'Administrator', color: '#3F51B5', active: true,
    description: 'Full access to all incident management features and administrative controls.',
    tabs: makeTabs({
      general:        { 'My Incidents': ALL_ON, 'All Incidents': ALL_ON },
      workflows:      { 'Workflows': ALL_ON, 'Workflow Steps': ALL_ON, 'Approvals': ALL_ON },
      communications: { 'Messages': ALL_ON, 'Notifications': ALL_ON },
      reports:        { 'Quick Reports': ALL_ON, 'Data Export': ALL_ON },
      administration: { 'Users': ALL_ON, 'Incident Types': ALL_ON, 'Workflow Templates': ALL_ON, 'Email Templates': ALL_ON, 'Permission Groups': ALL_ON },
    }),
  },
  {
    id: 'G-002', name: 'Safety Coordinator', color: '#7B8458', active: true,
    description: 'Manages incidents end-to-end including workflows, communications, and reporting.',
    tabs: makeTabs({
      general:        { 'My Incidents': { read: true, add: true, edit: true }, 'All Incidents': { read: true, add: true, edit: true } },
      workflows:      { 'Workflows': { read: true, add: true, edit: true }, 'Workflow Steps': { read: true, add: true, edit: true }, 'Approvals': { read: true, add: true, edit: true } },
      communications: { 'Messages': { read: true, add: true }, 'Notifications': { read: true } },
      reports:        { 'Quick Reports': { read: true }, 'Data Export': { read: true } },
    }),
  },
  {
    id: 'G-003', name: 'Driver', color: '#4A6FA5', active: true,
    description: 'Can create and view own incidents and participate in assigned workflow steps.',
    tabs: makeTabs({
      general:        { 'My Incidents': { read: true, add: true } },
      workflows:      { 'Workflows': { read: true }, 'Workflow Steps': { read: true, edit: true } },
      communications: { 'Messages': { read: true, add: true }, 'Notifications': { read: true } },
    }),
  },
  {
    id: 'G-004', name: 'Fleet Manager', color: '#607D8B', active: true,
    description: 'Read-only access to all incidents with reporting capabilities.',
    tabs: makeTabs({
      general:        { 'My Incidents': { read: true, add: true }, 'All Incidents': { read: true } },
      workflows:      { 'Workflows': { read: true }, 'Workflow Steps': { read: true } },
      communications: { 'Messages': { read: true }, 'Notifications': { read: true } },
      reports:        { 'Quick Reports': { read: true }, 'Data Export': { read: true } },
    }),
  },
  {
    id: 'G-005', name: 'School Principal', color: '#F59E0B', active: true,
    description: 'View-only access to all incidents with communication capability.',
    tabs: makeTabs({
      general:        { 'All Incidents': { read: true } },
      workflows:      { 'Workflows': { read: true } },
      communications: { 'Messages': { read: true, add: true }, 'Notifications': { read: true } },
      reports:        { 'Quick Reports': { read: true } },
    }),
  },
];

function PermToggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      aria-pressed={checked}
      style={{
        width: 40, height: 22, borderRadius: 11,
        background: checked ? 'var(--primary)' : '#94a3b8',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: 'background 0.15s', flexShrink: 0,
        outline: 'none',
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: checked ? 21 : 3,
        width: 16, height: 16, borderRadius: '50%',
        background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: 'left 0.15s', display: 'block',
      }} />
    </button>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  // ─── Tab State ──────────────────────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState<'users' | 'templates' | 'incidentTypes' | 'permissions'>('users');

  // ─── Users State ─────────────────────────────────────────────────────────────
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<string[]>([]);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [stUserSearch, setStUserSearch] = useState('');
  const [stUserSearchOpen, setStUserSearchOpen] = useState(false);
  const [selectedStUser, setSelectedStUser] = useState<typeof ST_USERS[0] | null>(null);
  const stUserSearchRef = useRef<HTMLDivElement>(null);
  const [userForm, setUserForm] = useState<Omit<UserRecord, 'id' | 'lastLogin'>>({
    firstName: '',
    lastName: '',
    email: '',
    roles: [],
    status: 'Active',
  });

  // ─── Templates State ─────────────────────────────────────────────────────────
  const [templates, setTemplates] = useState<EmailTemplate[]>(INITIAL_TEMPLATES);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<string[]>([]);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [templateForm, setTemplateForm] = useState<Omit<EmailTemplate, 'id' | 'lastModified' | 'isDefault'>>({
    name: '',
    description: '',
    subject: '',
    body: '',
    category: 'Notification',
    variables: [],
  });
  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [lastFocusedField, setLastFocusedField] = useState<'subject' | 'body'>('body');
  const savedCursorRef = useRef<{ start: number; end: number }>({ start: 0, end: 0 });
  const [varPopoverOpen, setVarPopoverOpen] = useState(false);
  const [varSearch, setVarSearch] = useState('');
  const varPopoverRef = useRef<HTMLDivElement>(null);

  // ─── Incident Types State ───────────────────────────────────────────────────
  const [incidentTypes, setIncidentTypes] = useState<IncidentType[]>([...SEED_INCIDENT_TYPES]);
  const [itSearch, setItSearch] = useState('');
  const [itCategoryFilter, setItCategoryFilter] = useState<string[]>([]);
  const [isItDialogOpen, setIsItDialogOpen] = useState(false);
  const [editingIt, setEditingIt] = useState<IncidentType | null>(null);
  const [itForm, setItForm] = useState<Omit<IncidentType, 'id'>>({
    label: '',
    category: Object.values(INCIDENT_CATEGORIES)[0],
    description: '',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  });

  // ─── Permission Groups State ─────────────────────────────────────────────────
  const [groups, setGroups] = useState<PermissionGroup[]>(INITIAL_GROUPS.map(g => ({ ...g, tabs: g.tabs.map(t => ({ ...t, areas: t.areas.map(a => ({ ...a })) })) })));
  const [groupSearch, setGroupSearch] = useState('');
  const [permView, setPermView] = useState<'list' | 'edit'>('list');
  const [editingGroup, setEditingGroup] = useState<PermissionGroup | null>(null);
  const [permActiveTab, setPermActiveTab] = useState('general');
  const [groupForm, setGroupForm] = useState<Omit<PermissionGroup, 'id'>>({
    name: '', description: '', color: GROUP_COLORS[0], active: true, tabs: makeTabs(),
  });

  // ─── Workflows State (for incident type linking) ────────────────────────────
  const [workflowsList, setWorkflowsList] = useState<Workflow[]>([...SEED_WORKFLOWS]);
  const [itWorkflowOption, setItWorkflowOption] = useState<'existing' | 'new' | 'none'>('none');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState('');
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [newWorkflowDesc, setNewWorkflowDesc] = useState('');

  // ─── Dialog Refs & Effects ─────────────────────────────────────────────────
  const userDialogRef = useRef<HTMLElement>(null);
  const templateDialogRef = useRef<HTMLElement>(null);
  const previewDialogRef = useRef<HTMLElement>(null);
  const itDialogRef = useRef<HTMLElement>(null);

  // User Dialog sync
  useEffect(() => { const el = userDialogRef.current as any; if (!el) return; el.open = isUserDialogOpen; }, [isUserDialogOpen]);
  useEffect(() => { const el = userDialogRef.current as any; if (!el) return; const handler = () => setIsUserDialogOpen(false); el.addEventListener('forge-dialog-close', handler); return () => el.removeEventListener('forge-dialog-close', handler); }, []);

  // Variable popover click-outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (varPopoverRef.current && !varPopoverRef.current.contains(e.target as Node)) {
        setVarPopoverOpen(false);
        setVarSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ST user search click-outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (stUserSearchRef.current && !stUserSearchRef.current.contains(e.target as Node)) setStUserSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Template Dialog sync
  useEffect(() => { const el = templateDialogRef.current as any; if (!el) return; el.open = isTemplateDialogOpen; }, [isTemplateDialogOpen]);
  useEffect(() => { const el = templateDialogRef.current as any; if (!el) return; const handler = () => setIsTemplateDialogOpen(false); el.addEventListener('forge-dialog-close', handler); return () => el.removeEventListener('forge-dialog-close', handler); }, []);

  // Preview Dialog sync
  useEffect(() => { const el = previewDialogRef.current as any; if (!el) return; el.open = isPreviewOpen; }, [isPreviewOpen]);
  useEffect(() => { const el = previewDialogRef.current as any; if (!el) return; const handler = () => setIsPreviewOpen(false); el.addEventListener('forge-dialog-close', handler); return () => el.removeEventListener('forge-dialog-close', handler); }, []);

  // Incident Type Dialog sync
  useEffect(() => { const el = itDialogRef.current as any; if (!el) return; el.open = isItDialogOpen; }, [isItDialogOpen]);
  useEffect(() => { const el = itDialogRef.current as any; if (!el) return; const handler = () => setIsItDialogOpen(false); el.addEventListener('forge-dialog-close', handler); return () => el.removeEventListener('forge-dialog-close', handler); }, []);

  // ─── User Helpers ────────────────────────────────────────────────────────────

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !userSearch ||
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter.length === 0 || u.roles.some(r => userRoleFilter.includes(r));
    return matchesSearch && matchesRole;
  });

  const openAddUser = () => {
    setEditingUser(null);
    setUserForm({ firstName: '', lastName: '', email: '', roles: [], status: 'Active' });
    setStUserSearch('');
    setSelectedStUser(null);
    setStUserSearchOpen(false);
    setIsUserDialogOpen(true);
  };

  const openEditUser = (user: UserRecord) => {
    setEditingUser(user);
    setUserForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, roles: [...user.roles], status: user.status });
    setStUserSearch(`${user.firstName} ${user.lastName}`);
    setSelectedStUser(null);
    setStUserSearchOpen(false);
    setIsUserDialogOpen(true);
  };

  const saveUser = () => {
    if (!userForm.firstName || !userForm.lastName || !userForm.email || userForm.roles.length === 0) return;
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...userForm } : u)));
    } else {
      const newUser: UserRecord = {
        id: `U-${String(users.length + 1).padStart(3, '0')}`,
        ...userForm,
        lastLogin: undefined,
      };
      setUsers([...users, newUser]);
    }
    setIsUserDialogOpen(false);
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const toggleFormRole = (role: string) => {
    setUserForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(role) ? prev.roles.filter((r) => r !== role) : [...prev.roles, role],
    }));
  };

  // ─── Template Helpers ────────────────────────────────────────────────────────

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch =
      !templateSearch ||
      t.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
      t.description.toLowerCase().includes(templateSearch.toLowerCase());
    const matchesCat = templateCategoryFilter.length === 0 || templateCategoryFilter.includes(t.category);
    return matchesSearch && matchesCat;
  });

  const openAddTemplate = () => {
    setEditingTemplate(null);
    setTemplateForm({ name: '', description: '', subject: '', body: '', category: 'Custom', variables: [] });
    setIsTemplateDialogOpen(true);
  };

  const openEditTemplate = (tpl: EmailTemplate) => {
    setEditingTemplate(tpl);
    setTemplateForm({
      name: tpl.name,
      description: tpl.description,
      subject: tpl.subject,
      body: tpl.body,
      category: tpl.category,
      variables: [...tpl.variables],
    });
    setIsTemplateDialogOpen(true);
  };

  const duplicateTemplate = (tpl: EmailTemplate) => {
    const copy: EmailTemplate = {
      ...tpl,
      id: `ET-${String(templates.length + 1).padStart(3, '0')}`,
      name: `${tpl.name} (Copy)`,
      isDefault: false,
      lastModified: '2026-03-17',
    };
    setTemplates([...templates, copy]);
  };

  const saveTemplate = () => {
    if (!templateForm.name || !templateForm.subject || !templateForm.body) return;
    if (editingTemplate) {
      setTemplates(
        templates.map((t) =>
          t.id === editingTemplate.id ? { ...t, ...templateForm, lastModified: '2026-03-17' } : t
        )
      );
    } else {
      const newT: EmailTemplate = {
        id: `ET-${String(templates.length + 1).padStart(3, '0')}`,
        ...templateForm,
        lastModified: '2026-03-17',
        isDefault: false,
      };
      setTemplates([...templates, newT]);
    }
    setIsTemplateDialogOpen(false);
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  const saveCursor = (el: HTMLInputElement | HTMLTextAreaElement) => {
    savedCursorRef.current = { start: el.selectionStart ?? el.value.length, end: el.selectionEnd ?? el.value.length };
  };

  const insertVariable = (token: string) => {
    const tag = `{{${token}}}`;
    const { start, end } = savedCursorRef.current;
    if (lastFocusedField === 'subject' && subjectInputRef.current) {
      const el = subjectInputRef.current;
      const cur = el.value.length > 0 ? start : 0;
      const newValue = el.value.slice(0, cur) + tag + el.value.slice(end);
      setTemplateForm(f => ({ ...f, subject: newValue }));
      setTimeout(() => { el.focus(); el.setSelectionRange(cur + tag.length, cur + tag.length); }, 0);
    } else if (bodyTextareaRef.current) {
      const el = bodyTextareaRef.current;
      const cur = el.value.length > 0 ? start : 0;
      const newValue = el.value.slice(0, cur) + tag + el.value.slice(end);
      setTemplateForm(f => ({ ...f, body: newValue }));
      setTimeout(() => { el.focus(); el.setSelectionRange(cur + tag.length, cur + tag.length); }, 0);
    }
  };

  // ─── Incident Type Helpers ──────────────────────────────────────────────────

  const allItCategories = Object.values(INCIDENT_CATEGORIES);

  const filteredIncidentTypes = incidentTypes.filter((t) => {
    const matchesSearch =
      !itSearch ||
      t.label.toLowerCase().includes(itSearch.toLowerCase()) ||
      t.description.toLowerCase().includes(itSearch.toLowerCase()) ||
      t.id.toLowerCase().includes(itSearch.toLowerCase());
    const matchesCat = itCategoryFilter.length === 0 || itCategoryFilter.includes(t.category);
    return matchesSearch && matchesCat;
  });

  // Find linked workflow for an incident type label
  const findLinkedWorkflow = (label: string): Workflow | undefined =>
    workflowsList.find((w) => w.incidentTypes.includes(label) && w.isActive);

  const openAddIt = () => {
    setEditingIt(null);
    setItForm({ label: '', category: allItCategories[0], description: '', defaultSeverity: 'Medium', applicableTo: 'student' });
    setItWorkflowOption('none');
    setSelectedWorkflowId('');
    setNewWorkflowName('');
    setNewWorkflowDesc('');
    setIsItDialogOpen(true);
  };

  const openEditIt = (it: IncidentType) => {
    setEditingIt(it);
    setItForm({ label: it.label, category: it.category, description: it.description, defaultSeverity: it.defaultSeverity, applicableTo: it.applicableTo });
    const linked = findLinkedWorkflow(it.label);
    if (linked) {
      setItWorkflowOption('existing');
      setSelectedWorkflowId(linked.id);
    } else {
      setItWorkflowOption('none');
      setSelectedWorkflowId('');
    }
    setNewWorkflowName('');
    setNewWorkflowDesc('');
    setIsItDialogOpen(true);
  };

  const saveIt = () => {
    const label = itForm.label;
    if (editingIt) {
      setIncidentTypes(incidentTypes.map((t) => t.id === editingIt.id ? { ...t, ...itForm } : t));
      // Update workflow link if label changed
      if (editingIt.label !== label) {
        setWorkflowsList((wfs) =>
          wfs.map((w) =>
            w.incidentTypes.includes(editingIt.label)
              ? { ...w, incidentTypes: w.incidentTypes.map((t) => (t === editingIt.label ? label : t)) }
              : w
          )
        );
      }
    } else {
      const newId = itForm.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newIt: IncidentType = { id: newId || `it-${Date.now()}`, ...itForm };
      setIncidentTypes([...incidentTypes, newIt]);
    }

    // Handle workflow linking
    if (itWorkflowOption === 'existing' && selectedWorkflowId) {
      // Remove this type from any other workflow, add to selected
      setWorkflowsList((wfs) =>
        wfs.map((w) => {
          const without = w.incidentTypes.filter((t) => t !== label);
          if (w.id === selectedWorkflowId) {
            return { ...w, incidentTypes: w.incidentTypes.includes(label) ? w.incidentTypes : [...w.incidentTypes, label] };
          }
          return { ...w, incidentTypes: without };
        })
      );
    } else if (itWorkflowOption === 'new' && newWorkflowName) {
      // Remove from any existing workflow
      setWorkflowsList((wfs) => {
        const cleaned = wfs.map((w) => ({
          ...w,
          incidentTypes: w.incidentTypes.filter((t) => t !== label),
        }));
        const nextNum = Math.max(...wfs.map((w) => { const m = w.id.match(/WF-(\d+)/); return m ? parseInt(m[1]) : 0; }), 0) + 1;
        const newWf: Workflow = {
          id: `WF-${String(nextNum).padStart(3, '0')}`,
          name: newWorkflowName,
          description: newWorkflowDesc || `Workflow for ${label}`,
          incidentTypes: [label],
          severityLevels: [itForm.defaultSeverity],
          steps: [
            {
              id: `step-${Date.now()}-1`,
              name: 'Initial Review',
              description: `Review the ${label} incident and gather preliminary information.`,
              assignedRole: 'Safety Coordinator',
              estimatedDuration: '2 hours',
              required: true,
              order: 1,
              status: 'Not Started',
            },
            {
              id: `step-${Date.now()}-2`,
              name: 'Investigation',
              description: 'Conduct a thorough investigation of the incident.',
              assignedRole: 'Safety Coordinator',
              estimatedDuration: '24 hours',
              required: true,
              order: 2,
              status: 'Not Started',
            },
            {
              id: `step-${Date.now()}-3`,
              name: 'Resolution & Documentation',
              description: 'Document findings and close the incident.',
              assignedRole: 'Safety Coordinator',
              estimatedDuration: '4 hours',
              required: true,
              order: 3,
              status: 'Not Started',
            },
          ],
          isActive: true,
          createdBy: 'Sarah Williams',
          createdDate: '2026-03-18',
          lastModified: '2026-03-18',
        };
        return [...cleaned, newWf];
      });
    }

    setIsItDialogOpen(false);
  };

  const deleteIt = (id: string) => {
    setIncidentTypes(incidentTypes.filter((t) => t.id !== id));
  };

  const studentItCount = incidentTypes.filter((t) => t.applicableTo === 'student' || t.applicableTo === 'both').length;
  const driverItCount = incidentTypes.filter((t) => t.applicableTo === 'driver' || t.applicableTo === 'both').length;

  // ─── Permission Group Helpers ────────────────────────────────────────────────

  const filteredGroups = groups.filter(g =>
    !groupSearch ||
    g.name.toLowerCase().includes(groupSearch.toLowerCase()) ||
    g.description.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const openAddGroup = () => {
    setEditingGroup(null);
    setGroupForm({ name: '', description: '', color: GROUP_COLORS[0], active: true, tabs: makeTabs() });
    setPermActiveTab('general');
    setPermView('edit');
  };

  const openEditGroup = (g: PermissionGroup) => {
    setEditingGroup(g);
    setGroupForm({ name: g.name, description: g.description, color: g.color, active: g.active, tabs: g.tabs.map(t => ({ ...t, areas: t.areas.map(a => ({ ...a })) })) });
    setPermActiveTab('general');
    setPermView('edit');
  };

  const saveGroup = () => {
    if (!groupForm.name) return;
    if (editingGroup) {
      setGroups(groups.map(g => g.id === editingGroup.id ? { ...g, ...groupForm } : g));
    } else {
      setGroups([...groups, { id: `G-${String(groups.length + 1).padStart(3, '0')}`, ...groupForm }]);
    }
    setPermView('list');
  };

  const deleteGroup = (id: string) => setGroups(groups.filter(g => g.id !== id));

  const toggleAreaPerm = (areaId: string, key: PermCol) => {
    setGroupForm(prev => ({
      ...prev,
      tabs: prev.tabs.map(t => ({
        ...t,
        areas: t.areas.map(a => a.id === areaId ? { ...a, [key]: !a[key] } : a),
      })),
    }));
  };

  // ═════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════════════════════════

  return (
    <div style={{ fontFamily: 'var(--forge-font-family)', maxWidth: '1280px', margin: '0 auto', padding: 'var(--forge-spacing-large)' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-small)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>
          <Shield size={24} style={{ color: 'var(--primary)' }} />
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--forge-font-weight-medium)', fontFamily: 'var(--forge-font-family)', color: 'var(--foreground)', margin: 0 }}>
            Administration
          </h1>
        </div>
        <p style={{ ...mutedTextStyle, marginTop: 'var(--forge-spacing-xxsmall)' }}>
          Manage user roles, incident types, email notification templates, and role-based permissions for the Incident Tracker system.
        </p>
      </div>

      {/* Section Tabs */}
      {/* @ts-ignore */}
      <forge-tab-bar
        active-tab={activeSection === 'users' ? 0 : activeSection === 'templates' ? 1 : activeSection === 'incidentTypes' ? 2 : 3}
        style={{ marginBottom: 'var(--forge-spacing-large)' }}
      >
        {/* @ts-ignore */}
        <forge-tab onClick={() => setActiveSection('users')}>
          <forge-icon name="people" slot="leading"></forge-icon>
          Incident Tracker Roles
        {/* @ts-ignore */}
        </forge-tab>
        {/* @ts-ignore */}
        <forge-tab onClick={() => setActiveSection('templates')}>
          <forge-icon name="email" slot="leading"></forge-icon>
          Email Templates
        {/* @ts-ignore */}
        </forge-tab>
        {/* @ts-ignore */}
        <forge-tab onClick={() => setActiveSection('incidentTypes')}>
          <forge-icon name="warning" slot="leading"></forge-icon>
          Incident Types
        {/* @ts-ignore */}
        </forge-tab>
        {/* @ts-ignore */}
        <forge-tab onClick={() => setActiveSection('permissions')}>
          <forge-icon name="shield" slot="leading"></forge-icon>
          Permissions
        {/* @ts-ignore */}
        </forge-tab>
      {/* @ts-ignore */}
      </forge-tab-bar>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* USER ROLES SECTION                                                    */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeSection === 'users' && (
        <div>
          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--forge-spacing-medium)', flexWrap: 'wrap', gap: 'var(--forge-spacing-small)' }}>
            <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)', zIndex: 1 }} />
                {/* @ts-ignore */}
                <forge-text-field>
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users..."
                    style={{ paddingLeft: '2rem', width: '260px', fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }}
                  />
                {/* @ts-ignore */}
                </forge-text-field>
              </div>
              {/* Role Filter */}
              <ForgeMultiSelect
                selected={userRoleFilter}
                onChange={setUserRoleFilter}
                options={AVAILABLE_ROLES.map((r) => ({ value: r, label: r }))}
                placeholder="All Roles"
                allLabel="All Roles"
                width="200px"
              />
            </div>
            <ForgeButton onClick={openAddUser} style={{ fontFamily: 'var(--forge-font-family)' }}>
              <UserPlus size={16} style={{ marginRight: '6px' }} />
              Add User
            </ForgeButton>
          </div>

          {/* Users Table */}
          <div style={cardStyle}>
            <div style={{ overflowX: 'auto' }}>
              <table className="forge-table">
                <thead>
                  <tr>
                    <th className="forge-table-cell forge-table-cell--header">Name</th>
                    <th className="forge-table-cell forge-table-cell--header">Email</th>
                    <th className="forge-table-cell forge-table-cell--header">Roles</th>
                    <th className="forge-table-cell forge-table-cell--header">Status</th>
                    <th className="forge-table-cell forge-table-cell--header">Last Login</th>
                    <th className="forge-table-cell forge-table-cell--header" style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="forge-table-cell" style={{ textAlign: 'center', padding: 'var(--forge-spacing-xlarge)', color: 'var(--muted-foreground)' }}>
                        No users found matching your criteria.
                      </td>
                    </tr>
                  )}
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="forge-table-row"
                    >
                      <td className="forge-table-cell">
                        <div style={{ fontWeight: 'var(--forge-font-weight-medium)' }}>{user.firstName} {user.lastName}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--forge-font-family)' }}>{user.id}</div>
                      </td>
                      <td className="forge-table-cell">{user.email}</td>
                      <td className="forge-table-cell">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--forge-spacing-xxsmall)' }}>
                          {user.roles.map((role) => (
                            // @ts-ignore
                            <forge-badge key={role} theme="default" style={roleBadgeStyle(role)}>{role}</forge-badge>
                          ))}
                        </div>
                      </td>
                      <td className="forge-table-cell">
                        {/* @ts-ignore */}
                        <forge-badge
                          theme={user.status === 'Active' ? 'success' : 'default'}
                        >
                          {user.status}
                        {/* @ts-ignore */}
                        </forge-badge>
                      </td>
                      <td className="forge-table-cell" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                        {user.lastLogin || '—'}
                      </td>
                      <td className="forge-table-cell" style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: 'var(--forge-spacing-xxsmall)', justifyContent: 'flex-end' }}>
                          <ForgeButton variant="flat" size="sm" onClick={() => openEditUser(user)} title="Edit user">
                            <Pencil size={14} />
                          </ForgeButton>
                          <ForgeButton variant="flat" size="sm" onClick={() => deleteUser(user.id)} title="Delete user" style={{ color: 'var(--destructive)' }}>
                            <Trash2 size={14} />
                          </ForgeButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* EMAIL TEMPLATES SECTION                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeSection === 'templates' && (
        <div>
          {/* Template Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-small)' }}>
            {filteredTemplates.length === 0 && (
              <div style={{ ...cardStyle, textAlign: 'center', padding: 'var(--forge-spacing-xlarge)', color: 'var(--muted-foreground)', fontFamily: 'var(--forge-font-family)' }}>
                No templates found matching your criteria.
              </div>
            )}
            {filteredTemplates.map((tpl) => {
              const isExpanded = expandedTemplateId === tpl.id;
              return (
                <div key={tpl.id} style={cardStyle}>
                  {/* Header Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--forge-spacing-medium)' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-small)', flexWrap: 'wrap' }}>
                        <span style={{ ...sectionHeaderStyle, fontSize: 'var(--text-base)' }}>{tpl.name}</span>
                        {/* @ts-ignore */}
                        <forge-badge style={categoryBadgeStyle(tpl.category)}>{tpl.category}</forge-badge>
                        {tpl.isDefault && (
                          // @ts-ignore
                          <forge-badge theme="info-primary">System Default</forge-badge>
                        )}
                      </div>
                      <p style={{ ...mutedTextStyle, marginTop: 'var(--forge-spacing-xxsmall)' }}>{tpl.description}</p>
                      <div style={{ marginTop: 'var(--forge-spacing-xsmall)', fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)' }}>
                        <strong>Subject:</strong> {tpl.subject}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--forge-spacing-xxsmall)', flexShrink: 0 }}>
                      <ForgeButton variant="flat" size="sm" onClick={() => setExpandedTemplateId(isExpanded ? null : tpl.id)} title={isExpanded ? 'Collapse' : 'Expand'}>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </ForgeButton>
                      <ForgeButton variant="flat" size="sm" onClick={() => { setPreviewTemplate(tpl); setIsPreviewOpen(true); }} title="Preview">
                        <Eye size={14} />
                      </ForgeButton>
                      <ForgeButton variant="flat" size="sm" onClick={() => duplicateTemplate(tpl)} title="Duplicate">
                        <Copy size={14} />
                      </ForgeButton>
                      <ForgeButton variant="flat" size="sm" onClick={() => openEditTemplate(tpl)} title="Edit">
                        <Pencil size={14} />
                      </ForgeButton>
                      <ForgeButton variant="flat" size="sm" onClick={() => deleteTemplate(tpl.id)} title="Delete" style={{ color: 'var(--destructive)' }}>
                        <Trash2 size={14} />
                      </ForgeButton>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div style={{ marginTop: 'var(--forge-spacing-medium)', borderTop: '1px solid var(--forge-color-border-subtle)', paddingTop: 'var(--forge-spacing-medium)' }}>
                      {/* Variables */}
                      <div style={{ marginBottom: 'var(--forge-spacing-medium)' }}>
                        <div style={{ ...labelStyle, marginBottom: 'var(--forge-spacing-xsmall)' }}>Template Variables</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--forge-spacing-xxsmall)' }}>
                          {tpl.variables.map((v) => (
                            // @ts-ignore
                            <forge-badge key={v} theme="default" style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)', background: 'var(--input-background)' }}>
                              {'{{' + v + '}}'}
                            {/* @ts-ignore */}
                            </forge-badge>
                          ))}
                        </div>
                      </div>
                      {/* Body Preview */}
                      <div>
                        <div style={labelStyle}>Body Preview</div>
                        <pre
                          style={{
                            background: 'var(--input-background)',
                            border: '1px solid var(--forge-color-border-subtle)',
                            borderRadius: 'var(--forge-radius-medium)',
                            padding: 'var(--forge-spacing-medium)',
                            fontSize: 'var(--text-sm)',
                            fontFamily: 'var(--forge-font-family)',
                            color: 'var(--foreground)',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            margin: 0,
                          }}
                        >
                          {tpl.body}
                        </pre>
                      </div>
                      <div style={{ marginTop: 'var(--forge-spacing-small)', fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)' }}>
                        Last Modified: {tpl.lastModified}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* USER DIALOG                                                           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* @ts-ignore */}
      <forge-dialog ref={userDialogRef} style={{ '--forge-dialog-width': '560px' }}>
        <div style={{ fontFamily: 'var(--forge-font-family)', padding: 'var(--forge-spacing-large)' }}>
          <div style={{ marginBottom: 'var(--forge-spacing-medium)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--forge-font-family)', fontWeight: 'var(--forge-font-weight-medium)', margin: 0 }}>
              {editingUser ? 'Edit User' : 'Add User'}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)', margin: 'var(--forge-spacing-xxsmall) 0 0 0' }}>
              {editingUser ? 'Update user information and role assignments.' : 'Create a new user and assign roles.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-medium)' }}>
            {/* ST User Search */}
            <div>
              <Label style={labelStyle}>Student Transportation User *</Label>
              <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)', margin: '2px 0 6px' }}>
                Search and select an existing Student Transportation user to grant Incident Tracker access.
              </p>
              <div className="relative" ref={stUserSearchRef}>
                {/* @ts-ignore */}
                <forge-text-field style={inputWrapperStyle}>
                  <input
                    type="text"
                    value={stUserSearch}
                    onChange={(e) => {
                      setStUserSearch(e.target.value);
                      setStUserSearchOpen(true);
                      if (!e.target.value) {
                        setSelectedStUser(null);
                        setUserForm(f => ({ ...f, firstName: '', lastName: '', email: '' }));
                      }
                    }}
                    onFocus={() => setStUserSearchOpen(true)}
                    placeholder="Search by name or email..."
                    style={{ fontFamily: 'var(--forge-font-family)' }}
                    readOnly={!!selectedStUser && !editingUser}
                  />
                {/* @ts-ignore */}
                </forge-text-field>
                {stUserSearchOpen && !selectedStUser && (
                  <div style={{ position: 'absolute', zIndex: 50, width: '100%', marginTop: 4, background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--forge-radius-medium)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: 260, overflowY: 'auto' }}>
                    {ST_USERS.filter(u =>
                      !stUserSearch ||
                      `${u.firstName} ${u.lastName}`.toLowerCase().includes(stUserSearch.toLowerCase()) ||
                      u.email.toLowerCase().includes(stUserSearch.toLowerCase()) ||
                      u.title.toLowerCase().includes(stUserSearch.toLowerCase())
                    ).filter(u => !users.some(existing => existing.email === u.email))
                    .map(u => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStUser(u);
                          setStUserSearch(`${u.firstName} ${u.lastName}`);
                          setUserForm(f => ({ ...f, firstName: u.firstName, lastName: u.lastName, email: u.email }));
                          setStUserSearchOpen(false);
                        }}
                        style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px 14px', background: 'none', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', textAlign: 'left' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                      >
                        <span style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                          {u.firstName} {u.lastName}
                        </span>
                        <span style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                          {u.title} · {u.department}
                        </span>
                        <span style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                          {u.email}
                        </span>
                      </button>
                    ))}
                    {ST_USERS.filter(u =>
                      !stUserSearch ||
                      `${u.firstName} ${u.lastName}`.toLowerCase().includes(stUserSearch.toLowerCase()) ||
                      u.email.toLowerCase().includes(stUserSearch.toLowerCase())
                    ).filter(u => !users.some(existing => existing.email === u.email)).length === 0 && (
                      <div style={{ padding: '12px 14px', fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                        No matching users found.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selected user card */}
              {selectedStUser && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, padding: '10px 12px', background: '#EEF2F8', border: '1px solid #C5D2E8', borderRadius: 'var(--forge-radius-medium)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>{selectedStUser.firstName} {selectedStUser.lastName}</div>
                    <div style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{selectedStUser.title} · {selectedStUser.department}</div>
                    <div style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{selectedStUser.email}</div>
                  </div>
                  <button type="button" onClick={() => { setSelectedStUser(null); setStUserSearch(''); setUserForm(f => ({ ...f, firstName: '', lastName: '', email: '' })); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', padding: 0 }}>
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Edit mode: show current user info read-only */}
              {editingUser && !selectedStUser && (
                <div style={{ marginTop: 8, padding: '10px 12px', background: 'var(--input-background)', border: '1px solid var(--border)', borderRadius: 'var(--forge-radius-medium)' }}>
                  <div style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>{userForm.firstName} {userForm.lastName}</div>
                  <div style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{userForm.email}</div>
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <Label style={labelStyle}>Status</Label>
              {/* @ts-ignore */}
              <forge-text-field style={inputWrapperStyle}>
                <select
                  value={userForm.status}
                  onChange={(e) => setUserForm({ ...userForm, status: e.target.value as 'Active' | 'Inactive' })}
                  style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)', width: '100%' }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              {/* @ts-ignore */}
              </forge-text-field>
            </div>

            {/* Roles */}
            <div>
              <Label style={labelStyle}>Assign Roles</Label>
              <p style={{ ...mutedTextStyle, marginBottom: 'var(--forge-spacing-small)' }}>
                Select one or more roles for this user.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--forge-spacing-xsmall)' }}>
                {AVAILABLE_ROLES.map((role) => {
                  const isSelected = userForm.roles.includes(role);
                  return (
                    <button
                      key={role}
                      onClick={() => toggleFormRole(role)}
                      style={{
                        padding: 'var(--forge-spacing-xsmall) var(--forge-spacing-small)',
                        borderRadius: 'var(--forge-radius-medium)',
                        border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                        background: isSelected ? 'rgba(63, 81, 181, 0.10)' : 'var(--input-background)',
                        color: isSelected ? 'var(--primary)' : 'var(--foreground)',
                        cursor: 'pointer',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'var(--forge-font-family)',
                        fontWeight: 'var(--forge-font-weight-medium)',
                        transition: 'all 150ms',
                      }}
                    >
                      {isSelected && <span style={{ marginRight: '4px' }}>&#10003;</span>}
                      {role}
                    </button>
                  );
                })}
              </div>
              {userForm.roles.length === 0 && (
                <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--destructive)', marginTop: 'var(--forge-spacing-xxsmall)' }}>
                  At least one role is required.
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', gap: 'var(--forge-spacing-medium)', marginTop: 'var(--forge-spacing-medium)', borderTop: '1px solid var(--border)', paddingTop: 'var(--forge-spacing-medium)' }}>
            <ForgeButton variant="outlined" onClick={() => setIsUserDialogOpen(false)} style={{ flex: 1, fontFamily: 'var(--forge-font-family)' }}>
              Cancel
            </ForgeButton>
            <ForgeButton
              onClick={saveUser}
              disabled={!userForm.firstName || !userForm.lastName || !userForm.email || userForm.roles.length === 0}
              style={{ flex: 1, fontFamily: 'var(--forge-font-family)' }}
            >
              {editingUser ? 'Save Changes' : 'Add User'}
            </ForgeButton>
          </div>
        </div>
      {/* @ts-ignore */}
      </forge-dialog>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TEMPLATE DIALOG                                                       */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* @ts-ignore */}
      <forge-dialog ref={templateDialogRef} style={{ '--forge-dialog-width': '700px' }}>
        <div style={{ maxHeight: '90vh', overflow: 'auto', fontFamily: 'var(--forge-font-family)', padding: 'var(--forge-spacing-large)' }}>
          <div style={{ marginBottom: 'var(--forge-spacing-medium)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--forge-font-family)', fontWeight: 'var(--forge-font-weight-medium)', margin: 0 }}>
              {editingTemplate ? 'Edit Email Template' : 'Create Email Template'}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)', margin: 'var(--forge-spacing-xxsmall) 0 0 0' }}>
              {editingTemplate ? 'Update the email template details and body.' : 'Define a new email template for workflow notifications.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-medium)' }}>
            {/* Name & Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--forge-spacing-medium)' }}>
              <div>
                <Label style={labelStyle}>Template Name</Label>
                {/* @ts-ignore */}
                <forge-text-field style={inputWrapperStyle}>
                  <input
                    type="text"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                    placeholder="e.g., Parent Notification"
                    style={{ fontFamily: 'var(--forge-font-family)' }}
                  />
                {/* @ts-ignore */}
                </forge-text-field>
              </div>
              <div>
                <Label style={labelStyle}>Category</Label>
                {/* @ts-ignore */}
                <forge-text-field style={inputWrapperStyle}>
                  <select
                    value={templateForm.category}
                    onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value as EmailTemplate['category'] })}
                    style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)', width: '100%' }}
                  >
                    <option value="Notification">Notification</option>
                    <option value="Approval">Approval</option>
                  </select>
                {/* @ts-ignore */}
                </forge-text-field>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label style={labelStyle}>Description</Label>
              {/* @ts-ignore */}
              <forge-text-field style={inputWrapperStyle}>
                <input
                  type="text"
                  value={templateForm.description}
                  onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                  placeholder="Brief description of when this template is used"
                  style={{ fontFamily: 'var(--forge-font-family)' }}
                />
              {/* @ts-ignore */}
              </forge-text-field>
            </div>

            {/* Subject */}
            <div>
              <Label style={labelStyle}>Email Subject</Label>
              {/* @ts-ignore */}
              <forge-text-field style={inputWrapperStyle}>
                <input
                  ref={subjectInputRef}
                  type="text"
                  value={templateForm.subject}
                  onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                  onFocus={(e) => { setLastFocusedField('subject'); saveCursor(e.target); }}
                  onKeyUp={(e) => saveCursor(e.currentTarget)}
                  onMouseUp={(e) => saveCursor(e.currentTarget)}
                  onSelect={(e) => saveCursor(e.currentTarget)}
                  placeholder="e.g., [Incident Tracker] Incident {{incident_id}} — Action Required"
                  style={{ fontFamily: 'var(--forge-font-family)' }}
                />
              {/* @ts-ignore */}
              </forge-text-field>
            </div>

            {/* Body + variable popover */}
            {(() => {
              const ALL_VARS = [
                { group: 'Incident', vars: [
                  { token: 'incident_id', label: 'Incident ID' },
                  { token: 'incident_type', label: 'Incident Type' },
                  { token: 'incident_date', label: 'Date' },
                  { token: 'incident_time', label: 'Time' },
                  { token: 'incident_severity', label: 'Severity' },
                  { token: 'incident_location', label: 'Location' },
                  { token: 'incident_address', label: 'Address' },
                  { token: 'incident_description', label: 'Description' },
                  { token: 'incident_status', label: 'Status' },
                ]},
                { group: 'Student', vars: [
                  { token: 'student_name', label: 'Student Name' },
                  { token: 'student_id', label: 'Student ID' },
                  { token: 'student_grade', label: 'Grade' },
                  { token: 'student_school', label: 'School' },
                  { token: 'student_role', label: 'Role in Incident' },
                  { token: 'parent_name', label: 'Parent/Guardian Name' },
                  { token: 'parent_email', label: 'Parent/Guardian Email' },
                ]},
                { group: 'Vehicle & Run', vars: [
                  { token: 'vehicle_number', label: 'Vehicle Number' },
                  { token: 'route_name', label: 'Run Name' },
                  { token: 'driver_name', label: 'Driver Name' },
                ]},
                { group: 'Workflow', vars: [
                  { token: 'workflow_name', label: 'Workflow Name' },
                  { token: 'step_name', label: 'Step Name' },
                  { token: 'step_assignee', label: 'Step Assignee' },
                  { token: 'due_date', label: 'Due Date' },
                ]},
                { group: 'Recipient', vars: [
                  { token: 'recipient_name', label: 'Recipient Name' },
                  { token: 'recipient_role', label: 'Recipient Role' },
                  { token: 'district_name', label: 'District Name' },
                  { token: 'reported_by', label: 'Reported By' },
                ]},
              ];
              const q = varSearch.toLowerCase();
              const filtered = q
                ? ALL_VARS.map(g => ({ ...g, vars: g.vars.filter(v => v.label.toLowerCase().includes(q) || v.token.includes(q)) })).filter(g => g.vars.length > 0)
                : ALL_VARS;
              return (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Label style={labelStyle}>Email Body</Label>
                    <div ref={varPopoverRef} style={{ position: 'relative' }}>
                      <button
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); setVarPopoverOpen(o => !o); setVarSearch(''); }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          padding: '3px 10px', borderRadius: '4px',
                          border: '1px solid #C5D2E8',
                          background: varPopoverOpen ? '#EEF2F8' : '#fff',
                          fontFamily: 'var(--forge-font-family)', fontSize: '12px',
                          color: '#4A6FA5', cursor: 'pointer', fontWeight: 500,
                        }}
                      >
                        <span style={{ fontSize: 13 }}>{'{ }'}</span> Insert Variable
                      </button>
                      {varPopoverOpen && (
                        <div style={{
                          position: 'absolute', right: 0, top: 'calc(100% + 4px)', zIndex: 100,
                          width: 320, maxHeight: 380, overflowY: 'auto',
                          background: '#fff', border: '1px solid #C5D2E8',
                          borderRadius: '6px', boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                        }}>
                          {/* Search */}
                          <div style={{ padding: '8px 10px', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
                            <input
                              type="text"
                              autoFocus
                              value={varSearch}
                              onChange={e => setVarSearch(e.target.value)}
                              placeholder="Search variables..."
                              style={{ width: '100%', padding: '4px 8px', border: '1px solid #C5D2E8', borderRadius: 4, fontFamily: 'var(--forge-font-family)', fontSize: '12px', outline: 'none' }}
                            />
                          </div>
                          {/* Groups */}
                          <div style={{ padding: '6px 0' }}>
                            {filtered.map(({ group, vars }) => (
                              <div key={group}>
                                <div style={{ padding: '4px 10px 2px', fontFamily: 'var(--forge-font-family)', fontSize: '10px', fontWeight: 700, color: '#9BAEC8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                  {group}
                                </div>
                                {vars.map(({ token, label }) => (
                                  <button
                                    key={token}
                                    type="button"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      insertVariable(token);
                                      setVarPopoverOpen(false);
                                      setVarSearch('');
                                    }}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#F4F7FB')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                                  >
                                    <span style={{ fontFamily: 'var(--forge-font-family)', fontSize: '13px', color: '#1a1a2e' }}>{label}</span>
                                    <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#9BAEC8', marginLeft: 8 }}>{'{{' + token + '}}'}</span>
                                  </button>
                                ))}
                              </div>
                            ))}
                            {filtered.length === 0 && (
                              <div style={{ padding: '10px', fontFamily: 'var(--forge-font-family)', fontSize: '12px', color: '#9BAEC8', textAlign: 'center' }}>No variables match</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Textarea
                    ref={bodyTextareaRef}
                    value={templateForm.body}
                    onChange={(e) => setTemplateForm({ ...templateForm, body: e.target.value })}
                    onFocus={(e) => { setLastFocusedField('body'); saveCursor(e.target); }}
                    onKeyUp={(e) => saveCursor(e.currentTarget)}
                    onMouseUp={(e) => saveCursor(e.currentTarget)}
                    onSelect={(e) => saveCursor(e.currentTarget)}
                    placeholder="Compose the email body here. Use the Insert Variable button to add dynamic values."
                    rows={12}
                    style={{ ...inputWrapperStyle, fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }}
                  />
                </div>
              );
            })()}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', gap: 'var(--forge-spacing-medium)', marginTop: 'var(--forge-spacing-medium)', borderTop: '1px solid var(--border)', paddingTop: 'var(--forge-spacing-medium)' }}>
            <ForgeButton variant="outlined" onClick={() => setIsTemplateDialogOpen(false)} style={{ flex: 1, fontFamily: 'var(--forge-font-family)' }}>
              Cancel
            </ForgeButton>
            <ForgeButton
              onClick={saveTemplate}
              disabled={!templateForm.name || !templateForm.subject || !templateForm.body}
              style={{ flex: 1, fontFamily: 'var(--forge-font-family)' }}
            >
              {editingTemplate ? 'Save Changes' : 'Create Template'}
            </ForgeButton>
          </div>
        </div>
      {/* @ts-ignore */}
      </forge-dialog>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TEMPLATE PREVIEW DIALOG                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* @ts-ignore */}
      <forge-dialog ref={previewDialogRef} style={{ '--forge-dialog-width': '640px' }}>
        <div style={{ maxHeight: '80vh', overflow: 'auto', fontFamily: 'var(--forge-font-family)', padding: 'var(--forge-spacing-large)' }}>
          <div style={{ marginBottom: 'var(--forge-spacing-medium)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--forge-font-family)', fontWeight: 'var(--forge-font-weight-medium)', margin: 0 }}>
              <Eye size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
              Email Preview
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)', margin: 'var(--forge-spacing-xxsmall) 0 0 0' }}>
              Preview of "{previewTemplate?.name}" template with sample data.
            </p>
          </div>
          {previewTemplate && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-medium)' }}>
              {/* Simulated email chrome */}
              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--forge-radius-large)',
                  overflow: 'hidden',
                }}
              >
                {/* Email header bar */}
                <div
                  style={{
                    background: 'var(--input-background)',
                    padding: 'var(--forge-spacing-medium)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <div style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>
                    <strong>From:</strong> noreply@incidenttracker.district.edu
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', marginBottom: 'var(--forge-spacing-xxsmall)' }}>
                    <strong>To:</strong> sarah.williams@district.edu
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                    <strong>Subject:</strong>{' '}
                    {previewTemplate.subject
                      .replace('{{step_name}}', 'Medical Assessment')
                      .replace('{{incident_id}}', 'INC-2026-042')
                      .replace('{{new_status}}', 'In Progress')
                      .replace('{{subject_line}}', 'Custom Notification')}
                  </div>
                </div>
                {/* Email body */}
                <div style={{ padding: 'var(--forge-spacing-large)' }}>
                  <pre
                    style={{
                      fontFamily: 'var(--forge-font-family)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--foreground)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      margin: 0,
                      lineHeight: '1.6',
                    }}
                  >
                    {previewTemplate.body
                      .replace(/\{\{recipient_name\}\}/g, 'Sarah Williams')
                      .replace(/\{\{step_name\}\}/g, 'Medical Assessment')
                      .replace(/\{\{incident_id\}\}/g, 'INC-2026-042')
                      .replace(/\{\{action\}\}/g, 'started')
                      .replace(/\{\{incident_type\}\}/g, 'Student Injury')
                      .replace(/\{\{severity\}\}/g, 'High')
                      .replace(/\{\{incident_date\}\}/g, 'March 17, 2026')
                      .replace(/\{\{assigned_role\}\}/g, 'Safety Coordinator')
                      .replace(/\{\{requested_by\}\}/g, 'James Rodriguez')
                      .replace(/\{\{request_date\}\}/g, 'March 17, 2026')
                      .replace(/\{\{step_description\}\}/g, 'Complete the medical assessment for the involved student.')
                      .replace(/\{\{old_status\}\}/g, 'Open')
                      .replace(/\{\{new_status\}\}/g, 'In Progress')
                      .replace(/\{\{updated_by\}\}/g, 'Sarah Williams')
                      .replace(/\{\{update_date\}\}/g, 'March 17, 2026')
                      .replace(/\{\{total_steps\}\}/g, '5')
                      .replace(/\{\{completed_by\}\}/g, 'Sarah Williams')
                      .replace(/\{\{completion_date\}\}/g, 'March 17, 2026')
                      .replace(/\{\{custom_body\}\}/g, 'This is a sample custom notification body.')
                      .replace(/\{\{subject_line\}\}/g, 'Custom Notification')}
                  </pre>
                </div>
              </div>
              {/* Variables list */}
              <div>
                <div style={labelStyle}>Available Variables</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--forge-spacing-xxsmall)' }}>
                  {previewTemplate.variables.map((v) => (
                    // @ts-ignore
                    <forge-badge key={v} theme="default" style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)', background: 'var(--input-background)' }}>
                      {'{{' + v + '}}'}
                    {/* @ts-ignore */}
                    </forge-badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      {/* @ts-ignore */}
      </forge-dialog>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* INCIDENT TYPES SECTION                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeSection === 'incidentTypes' && (
        <div>
          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--forge-spacing-medium)', flexWrap: 'wrap', gap: 'var(--forge-spacing-small)' }}>
            <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)', zIndex: 1 }} />
                {/* @ts-ignore */}
                <forge-text-field>
                  <input
                    type="text"
                    value={itSearch}
                    onChange={(e) => setItSearch(e.target.value)}
                    placeholder="Search incident types..."
                    style={{ paddingLeft: '2rem', width: '260px', fontFamily: 'var(--forge-font-family)' }}
                  />
                {/* @ts-ignore */}
                </forge-text-field>
              </div>
              <ForgeMultiSelect
                selected={itCategoryFilter}
                onChange={setItCategoryFilter}
                options={allItCategories.map((cat) => ({ value: cat, label: cat }))}
                placeholder="All Categories"
                allLabel="All Categories"
                width="200px"
              />
            </div>
            <ForgeButton onClick={openAddIt} style={{ fontFamily: 'var(--forge-font-family)' }}>
              <Plus size={16} style={{ marginRight: 'var(--forge-spacing-xxsmall)' }} />
              Add Incident Type
            </ForgeButton>
          </div>

          {/* Incident Types Table */}
          <div style={cardStyle}>
            <div style={{ overflowX: 'auto' }}>
              <table className="forge-table">
                <thead>
                  <tr>
                    <th className="forge-table-cell forge-table-cell--header">Label</th>
                    <th className="forge-table-cell forge-table-cell--header">Category</th>
                    <th className="forge-table-cell forge-table-cell--header">Severity</th>
                    <th className="forge-table-cell forge-table-cell--header">Linked Workflow</th>
                    <th className="forge-table-cell forge-table-cell--header">Description</th>
                    <th className="forge-table-cell forge-table-cell--header" style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncidentTypes.map((it) => (
                    <tr key={it.id} className="forge-table-row">
                      <td className="forge-table-cell">
                        <div style={{ fontWeight: 'var(--forge-font-weight-medium)', fontFamily: 'var(--forge-font-family)' }}>{it.label}</div>
                        <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)' }}>{it.id}</div>
                      </td>
                      <td className="forge-table-cell">
                        {/* @ts-ignore */}
                        <forge-badge theme="default" style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)' }}>{it.category}</forge-badge>
                      </td>
                      <td className="forge-table-cell">
                        {/* @ts-ignore */}
                        <forge-badge
                          theme={it.defaultSeverity === 'Critical' ? 'danger' : it.defaultSeverity === 'High' ? 'error' : it.defaultSeverity === 'Medium' ? 'warning' : 'info'}
                          strong
                          style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)' }}
                        >
                          {it.defaultSeverity}
                        {/* @ts-ignore */}
                        </forge-badge>
                      </td>
                      <td className="forge-table-cell">
                        {(() => {
                          const linked = findLinkedWorkflow(it.label);
                          return linked ? (
                            <button
                              onClick={() => onNavigate('workflow-builder')}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--forge-spacing-xxsmall)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                fontFamily: 'var(--forge-font-family)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--primary)',
                              }}
                              title={`${linked.id}: ${linked.name}`}
                            >
                              <GitBranch size={13} />
                              <span>{linked.id}</span>
                              <ExternalLink size={11} style={{ opacity: 0.5 }} />
                            </button>
                          ) : (
                            <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
                              No workflow
                            </span>
                          );
                        })()}
                      </td>
                      <td className="forge-table-cell" style={{ maxWidth: '300px' }}>
                        <span style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)' }}>{it.description}</span>
                      </td>
                      <td className="forge-table-cell" style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <ForgeButton variant="flat" size="sm" onClick={() => openEditIt(it)} style={{ fontFamily: 'var(--forge-font-family)' }}>
                          <Pencil size={14} />
                        </ForgeButton>
                        <ForgeButton variant="flat" size="sm" onClick={() => deleteIt(it.id)} style={{ color: 'var(--destructive)', fontFamily: 'var(--forge-font-family)' }}>
                          <Trash2 size={14} />
                        </ForgeButton>
                      </td>
                    </tr>
                  ))}
                  {filteredIncidentTypes.length === 0 && (
                    <tr>
                      <td colSpan={6} className="forge-table-cell" style={{ textAlign: 'center', padding: 'var(--forge-spacing-xlarge)', color: 'var(--muted-foreground)' }}>
                        No incident types match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ padding: 'var(--forge-spacing-small) var(--forge-spacing-medium)', borderTop: '1px solid var(--forge-color-border-subtle)', fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)' }}>
              Showing {filteredIncidentTypes.length} of {incidentTypes.length} incident types
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Incident Type Dialog */}
      {/* @ts-ignore */}
      <forge-dialog ref={itDialogRef} style={{ '--forge-dialog-width': '620px' }}>
        <div style={{ maxHeight: '90vh', overflow: 'auto', fontFamily: 'var(--forge-font-family)', padding: 'var(--forge-spacing-large)' }}>
          <div style={{ marginBottom: 'var(--forge-spacing-medium)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--forge-font-family)', fontWeight: 'var(--forge-font-weight-medium)', margin: 0 }}>
              {editingIt ? 'Edit Incident Type' : 'Add Incident Type'}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)', margin: 'var(--forge-spacing-xxsmall) 0 0 0' }}>
              {editingIt ? 'Update the details for this incident type.' : 'Define a new incident type for the system.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-medium)' }}>
            {/* Label */}
            <div>
              <div style={labelStyle}>Label <span style={{ color: 'var(--destructive)' }}>*</span></div>
              {/* @ts-ignore */}
              <forge-text-field style={inputWrapperStyle}>
                <input
                  type="text"
                  value={itForm.label}
                  onChange={(e) => setItForm({ ...itForm, label: e.target.value })}
                  placeholder="e.g., Unauthorized Device Usage"
                  style={{ fontFamily: 'var(--forge-font-family)' }}
                />
              {/* @ts-ignore */}
              </forge-text-field>
            </div>

            {/* Description */}
            <div>
              <div style={labelStyle}>Description <span style={{ color: 'var(--destructive)' }}>*</span></div>
              <Textarea
                value={itForm.description}
                onChange={(e) => setItForm({ ...itForm, description: e.target.value })}
                placeholder="Describe the incident type..."
                rows={3}
                style={{ ...inputWrapperStyle, fontFamily: 'var(--forge-font-family)' }}
              />
            </div>

            {/* Category */}
            <div>
              <div style={labelStyle}>Category <span style={{ color: 'var(--destructive)' }}>*</span></div>
              {/* @ts-ignore */}
              <forge-text-field style={inputWrapperStyle}>
                <select
                  value={itForm.category}
                  onChange={(e) => setItForm({ ...itForm, category: e.target.value })}
                  style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)', width: '100%' }}
                >
                  {allItCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              {/* @ts-ignore */}
              </forge-text-field>
            </div>

            {/* Default Severity */}
            <div>
              <div style={labelStyle}>Default Severity <span style={{ color: 'var(--destructive)' }}>*</span></div>
              <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', marginTop: 'var(--forge-spacing-xxsmall)' }}>
                {(['Low', 'Medium', 'High'] as const).map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setItForm({ ...itForm, defaultSeverity: sev })}
                    style={{
                      flex: 1,
                      padding: 'var(--forge-spacing-small)',
                      borderRadius: 'var(--forge-radius-medium)',
                      border: itForm.defaultSeverity === sev ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: itForm.defaultSeverity === sev
                        ? (sev === 'High' ? 'rgba(176, 0, 32, 0.08)' : sev === 'Medium' ? 'rgba(255, 193, 7, 0.12)' : 'rgba(159, 168, 112, 0.15)')
                        : 'var(--input-background)',
                      color: itForm.defaultSeverity === sev
                        ? (sev === 'High' ? 'var(--destructive)' : sev === 'Medium' ? '#8B6914' : 'var(--brand-olive-dark)')
                        : 'var(--muted-foreground)',
                      cursor: 'pointer',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--forge-font-weight-medium)',
                      fontFamily: 'var(--forge-font-family)',
                      transition: 'all 0.15s',
                    }}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            {/* ─── Linked Workflow ─── */}
            <div style={{ borderTop: '1px solid var(--forge-color-border-subtle)', paddingTop: 'var(--forge-spacing-medium)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-xsmall)', marginBottom: 'var(--forge-spacing-small)' }}>
                <GitBranch size={16} style={{ color: 'var(--primary)' }} />
                <span style={{ ...labelStyle, margin: 0 }}>Linked Workflow <span style={{ color: 'var(--destructive)' }}>*</span></span>
              </div>
              <p style={{ ...mutedTextStyle, marginBottom: 'var(--forge-spacing-small)' }}>
                Every incident type must be tied to a workflow. Select an existing workflow or create a new one.
              </p>

              {/* Option selector */}
              <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', marginBottom: 'var(--forge-spacing-medium)' }}>
                {(['existing', 'new'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setItWorkflowOption(opt);
                      if (opt === 'existing') { setNewWorkflowName(''); setNewWorkflowDesc(''); }
                      if (opt === 'new') { setSelectedWorkflowId(''); }
                    }}
                    style={{
                      flex: 1,
                      padding: 'var(--forge-spacing-small)',
                      borderRadius: 'var(--forge-radius-medium)',
                      border: itWorkflowOption === opt ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: itWorkflowOption === opt ? 'rgba(63, 81, 181, 0.08)' : 'var(--input-background)',
                      color: itWorkflowOption === opt ? 'var(--primary)' : 'var(--foreground)',
                      cursor: 'pointer',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--forge-font-weight-medium)',
                      fontFamily: 'var(--forge-font-family)',
                      transition: 'all 150ms',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'var(--forge-spacing-xxsmall)',
                    }}
                  >
                    {opt === 'existing' ? (
                      <><GitBranch size={14} /> Use Existing Workflow</>
                    ) : (
                      <><Plus size={14} /> Create New Workflow</>
                    )}
                  </button>
                ))}
              </div>

              {/* Existing workflow selector */}
              {itWorkflowOption === 'existing' && (
                <div>
                  {/* @ts-ignore */}
                  <forge-text-field>
                    <select
                      value={selectedWorkflowId}
                      onChange={(e) => setSelectedWorkflowId(e.target.value)}
                      style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)', width: '100%' }}
                    >
                      <option value="">— Select a workflow —</option>
                      {workflowsList
                        .filter((w) => w.isActive)
                        .sort((a, b) => a.id.localeCompare(b.id))
                        .map((w) => (
                          <option key={w.id} value={w.id}>
                            {w.id}: {w.name}
                          </option>
                        ))}
                    </select>
                  {/* @ts-ignore */}
                  </forge-text-field>
                  {selectedWorkflowId && (() => {
                    const wf = workflowsList.find((w) => w.id === selectedWorkflowId);
                    return wf ? (
                      <div
                        style={{
                          marginTop: 'var(--forge-spacing-small)',
                          padding: 'var(--forge-spacing-small) var(--forge-spacing-medium)',
                          background: 'var(--input-background)',
                          borderRadius: 'var(--forge-radius-medium)',
                          border: '1px solid var(--forge-color-border-subtle)',
                        }}
                      >
                        <div style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--foreground)', marginBottom: '2px' }}>
                          <strong>{wf.name}</strong>
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)' }}>
                          {wf.description}
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', marginTop: 'var(--forge-spacing-xsmall)', fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)' }}>
                          <span>{wf.steps.length} steps</span>
                          <span>•</span>
                          <span>Currently linked to: {wf.incidentTypes.join(', ') || 'none'}</span>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              {/* New workflow form */}
              {itWorkflowOption === 'new' && (
                <div
                  style={{
                    padding: 'var(--forge-spacing-medium)',
                    background: 'var(--input-background)',
                    borderRadius: 'var(--forge-radius-medium)',
                    border: '1px solid var(--forge-color-border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--forge-spacing-small)',
                  }}
                >
                  <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-xxsmall)' }}>
                    <Plus size={12} />
                    New Workflow Details
                  </div>
                  <div>
                    <div style={{ ...labelStyle, fontSize: 'var(--text-xs)' }}>Workflow Name <span style={{ color: 'var(--destructive)' }}>*</span></div>
                    {/* @ts-ignore */}
                    <forge-text-field>
                      <input
                        type="text"
                        value={newWorkflowName}
                        onChange={(e) => setNewWorkflowName(e.target.value)}
                        placeholder={itForm.label ? `${itForm.label} Response` : 'e.g., Unauthorized Device Response'}
                        style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }}
                      />
                    {/* @ts-ignore */}
                    </forge-text-field>
                  </div>
                  <div>
                    <div style={{ ...labelStyle, fontSize: 'var(--text-xs)' }}>Description</div>
                    <Textarea
                      value={newWorkflowDesc}
                      onChange={(e) => setNewWorkflowDesc(e.target.value)}
                      placeholder={itForm.label ? `Workflow for handling ${itForm.label} incidents` : 'Brief description of the workflow purpose'}
                      rows={2}
                      style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }}
                    />
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-xxsmall)' }}>
                    <AlertTriangle size={11} />
                    A 3-step starter workflow (Initial Review → Investigation → Resolution) will be created. You can customize steps in the Workflow Builder after saving.
                  </div>
                </div>
              )}

              {itWorkflowOption === 'none' && !editingIt && (
                <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--destructive)', marginTop: 'var(--forge-spacing-xxsmall)' }}>
                  Please select or create a workflow for this incident type.
                </p>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', marginTop: 'var(--forge-spacing-small)' }}>
              <ForgeButton variant="outlined" onClick={() => setIsItDialogOpen(false)} style={{ flex: 1, fontFamily: 'var(--forge-font-family)' }}>
                Cancel
              </ForgeButton>
              <ForgeButton
                onClick={saveIt}
                disabled={
                  !itForm.label || !itForm.description ||
                  (itWorkflowOption === 'none' && !editingIt) ||
                  (itWorkflowOption === 'existing' && !selectedWorkflowId) ||
                  (itWorkflowOption === 'new' && !newWorkflowName)
                }
                style={{ flex: 1, fontFamily: 'var(--forge-font-family)' }}
              >
                {editingIt ? 'Save Changes' : 'Add Type'}
              </ForgeButton>
            </div>
          </div>
        </div>
      {/* @ts-ignore */}
      </forge-dialog>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* PERMISSIONS SECTION                                                   */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeSection === 'permissions' && permView === 'list' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--forge-spacing-medium)', flexWrap: 'wrap', gap: 'var(--forge-spacing-small)' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)', zIndex: 1 }} />
              {/* @ts-ignore */}
              <forge-text-field>
                <input type="text" value={groupSearch} onChange={(e) => setGroupSearch(e.target.value)} placeholder="Search groups..." style={{ paddingLeft: '2rem', width: '260px', fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }} />
              {/* @ts-ignore */}
              </forge-text-field>
            </div>
            <ForgeButton onClick={openAddGroup} style={{ fontFamily: 'var(--forge-font-family)' }}>
              <Plus size={16} style={{ marginRight: '6px' }} />
              Add Group
            </ForgeButton>
          </div>
          <div style={cardStyle}>
            <div style={{ overflowX: 'auto' }}>
              <table className="forge-table">
                <thead>
                  <tr>
                    <th className="forge-table-cell forge-table-cell--header">Group</th>
                    <th className="forge-table-cell forge-table-cell--header">Description</th>
                    <th className="forge-table-cell forge-table-cell--header">Permissions</th>
                    <th className="forge-table-cell forge-table-cell--header">Active</th>
                    <th className="forge-table-cell forge-table-cell--header" style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGroups.map(g => (
                    <tr key={g.id} className="forge-table-row">
                      <td className="forge-table-cell">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-small)' }}>
                          <span style={{ width: 12, height: 12, borderRadius: '50%', background: g.color, flexShrink: 0, display: 'inline-block' }} />
                          <span style={{ fontWeight: 'var(--forge-font-weight-medium)', fontFamily: 'var(--forge-font-family)' }}>{g.name}</span>
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--forge-font-family)', marginLeft: 20 }}>{g.id}</div>
                      </td>
                      <td className="forge-table-cell" style={{ maxWidth: 320 }}>
                        <span style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)' }}>{g.description}</span>
                      </td>
                      <td className="forge-table-cell">
                        {/* @ts-ignore */}
                        <forge-badge theme="default" style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)' }}>
                          {countGroupPerms(g.tabs)} of {TOTAL_GROUP_PERMS}
                        {/* @ts-ignore */}
                        </forge-badge>
                      </td>
                      <td className="forge-table-cell">
                        <PermToggle checked={g.active} onChange={() => setGroups(groups.map(r => r.id === g.id ? { ...r, active: !r.active } : r))} />
                      </td>
                      <td className="forge-table-cell" style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: 'var(--forge-spacing-xxsmall)', justifyContent: 'flex-end' }}>
                          <ForgeButton variant="outlined" onClick={() => openEditGroup(g)} style={{ fontFamily: 'var(--forge-font-family)' }}>
                            <Pencil size={14} style={{ marginRight: 4 }} />Edit
                          </ForgeButton>
                          <ForgeButton variant="outlined" onClick={() => deleteGroup(g.id)} style={{ fontFamily: 'var(--forge-font-family)', color: 'var(--destructive)', borderColor: 'var(--destructive)' }}>
                            <Trash2 size={14} />
                          </ForgeButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredGroups.length === 0 && (
                    <tr><td colSpan={5} style={{ padding: 'var(--forge-spacing-large)', textAlign: 'center', color: 'var(--muted-foreground)', fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }}>No groups found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ padding: 'var(--forge-spacing-small) var(--forge-spacing-medium)', color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', borderTop: '1px solid var(--border)' }}>
              Showing {filteredGroups.length} of {groups.length} groups
            </div>
          </div>
        </div>
      )}

      {/* ── Group Editor (inline, ST-style) ──────────────────────────────────── */}
      {activeSection === 'permissions' && permView === 'edit' && (() => {
        const activeTabData = groupForm.tabs.find(t => t.tabId === permActiveTab);
        const activeTabIdx = PERM_TAB_DEFS.findIndex(t => t.id === permActiveTab);
        return (
          <div>
            {/* Back */}
            <button onClick={() => setPermView('list')} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)', fontWeight: 500, padding: 0, marginBottom: 'var(--forge-spacing-medium)' }}>
              ← Back to Groups
            </button>

            {/* Group info bar */}
            <div style={{ ...cardStyle, marginBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, display: 'flex', gap: 'var(--forge-spacing-large)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: '0 0 200px' }}>
                <div style={labelStyle}>Name <span style={{ color: 'var(--destructive)' }}>*</span></div>
                {/* @ts-ignore */}
                <forge-text-field style={inputWrapperStyle}>
                  <input type="text" value={groupForm.name} onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })} placeholder="Group name" style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }} />
                {/* @ts-ignore */}
                </forge-text-field>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={labelStyle}>Description</div>
                {/* @ts-ignore */}
                <forge-text-field style={inputWrapperStyle}>
                  <input type="text" value={groupForm.description} onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })} placeholder="Brief description" style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }} />
                {/* @ts-ignore */}
                </forge-text-field>
              </div>
              <div>
                <div style={labelStyle}>Color</div>
                <div style={{ display: 'flex', gap: 'var(--forge-spacing-xxsmall)', marginTop: 'var(--forge-spacing-xxsmall)' }}>
                  {GROUP_COLORS.map(c => (
                    <button key={c} onClick={() => setGroupForm({ ...groupForm, color: c })} style={{ width: 20, height: 20, borderRadius: '50%', background: c, border: 'none', cursor: 'pointer', boxShadow: groupForm.color === c ? `0 0 0 2px #fff, 0 0 0 3px ${c}` : 'none' }} />
                  ))}
                </div>
              </div>
              <div>
                <div style={labelStyle}>Active</div>
                <div style={{ marginTop: 'var(--forge-spacing-xxsmall)' }}>
                  <PermToggle checked={groupForm.active} onChange={() => setGroupForm({ ...groupForm, active: !groupForm.active })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', marginLeft: 'auto' }}>
                <ForgeButton variant="outlined" onClick={() => setPermView('list')} style={{ fontFamily: 'var(--forge-font-family)' }}>Cancel</ForgeButton>
                <ForgeButton onClick={saveGroup} disabled={!groupForm.name} style={{ fontFamily: 'var(--forge-font-family)' }}>
                  {editingGroup ? 'Save Changes' : 'Add Group'}
                </ForgeButton>
              </div>
            </div>

            {/* Permission tabs */}
            {/* @ts-ignore */}
            <forge-tab-bar active-tab={activeTabIdx} style={{ borderBottom: '1px solid var(--border)', background: 'var(--card)' }}>
              {PERM_TAB_DEFS.map(t => (
                // @ts-ignore
                <forge-tab key={t.id} onClick={() => setPermActiveTab(t.id)}>{t.label}{/* @ts-ignore */}</forge-tab>
              ))}
            {/* @ts-ignore */}
            </forge-tab-bar>

            {/* Permission grid — ST style */}
            <div style={{ ...cardStyle, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none', padding: 0, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--forge-font-family)', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #d0d7e2', background: '#f8fafc' }}>
                    <th style={{ textAlign: 'left', padding: '8px 14px', fontSize: 12, fontWeight: 600, color: 'var(--muted-foreground)', width: '40%' }}>Area</th>
                    {PERM_COLS.map(c => (
                      <th key={c.key} style={{ textAlign: 'center', padding: '8px 14px', fontSize: 12, fontWeight: 600, color: c.key === 'delete' ? '#c0c8d4' : 'var(--muted-foreground)', width: '15%' }}>
                        {c.label}{c.key === 'delete' && <Lock size={10} style={{ marginLeft: 3, verticalAlign: 'middle', color: '#c0c8d4' }} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeTabData?.areas.map((area, idx) => (
                    <tr key={area.id} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f0f5fb', borderBottom: '1px solid #e8edf4' }}>
                      <td style={{ padding: '7px 14px', color: 'var(--foreground)' }}>{area.label}</td>
                      {PERM_COLS.map(c => (
                        <td key={c.key} style={{ textAlign: 'center', padding: '7px 14px', background: c.key === 'delete' ? 'rgba(0,0,0,0.02)' : undefined }}>
                          <input
                            type="checkbox"
                            checked={area[c.key]}
                            disabled={c.key === 'delete'}
                            onChange={() => c.key !== 'delete' && toggleAreaPerm(area.id, c.key)}
                            style={{ cursor: c.key === 'delete' ? 'not-allowed' : 'pointer', accentColor: '#3B5EA6', width: 14, height: 14, transform: 'scale(1.15)', opacity: c.key === 'delete' ? 0.3 : 1 }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
