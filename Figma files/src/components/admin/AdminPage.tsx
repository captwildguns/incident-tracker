import { useState } from 'react';
import { ForgeButton } from '@tylertech/forge-react';
import { defineButtonComponent } from '@tylertech/forge';
defineButtonComponent();
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Users,
  Mail,
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
} from 'lucide-react';
import {
  INCIDENT_TYPES as SEED_INCIDENT_TYPES,
  INCIDENT_CATEGORIES,
  IncidentType,
} from '../incidents/IncidentTypes';
import { EmailTemplate, INITIAL_EMAIL_TEMPLATES } from '../../data/email-templates';
import { ForgeMultiSelect } from '../ui/forge-multiselect';
import { workflows as SEED_WORKFLOWS, Workflow } from '../../data/workflows';

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
    Escalation: { bg: 'rgba(176, 0, 32, 0.08)', border: 'var(--destructive)', color: 'var(--destructive)' },
    Completion: { bg: 'rgba(159, 168, 112, 0.15)', border: 'var(--brand-olive-medium)', color: 'var(--brand-olive-dark)' },
    Custom: { bg: 'rgba(63, 81, 181, 0.10)', border: 'var(--primary)', color: 'var(--primary)' },
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

// ═════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  // ─── Tab State ──────────────────────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState<'users' | 'templates' | 'incidentTypes'>('users');

  // ─── Users State ─────────────────────────────────────────────────────────────
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<string[]>([]);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
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
    category: 'Custom',
    variables: [],
  });
  const [newVariable, setNewVariable] = useState('');
  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(null);

  // ─── Incident Types State ───────────────────────────────────────────────────
  const [incidentTypes, setIncidentTypes] = useState<IncidentType[]>([...SEED_INCIDENT_TYPES]);
  const [itSearch, setItSearch] = useState('');
  const [itCategoryFilter, setItCategoryFilter] = useState<string[]>([]);
  const [itAppliesFilter, setItAppliesFilter] = useState<string[]>([]);
  const [isItDialogOpen, setIsItDialogOpen] = useState(false);
  const [editingIt, setEditingIt] = useState<IncidentType | null>(null);
  const [itForm, setItForm] = useState<Omit<IncidentType, 'id'>>({
    label: '',
    category: Object.values(INCIDENT_CATEGORIES)[0],
    description: '',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  });

  // ─── Workflows State (for incident type linking) ────────────────────────────
  const [workflowsList, setWorkflowsList] = useState<Workflow[]>([...SEED_WORKFLOWS]);
  const [itWorkflowOption, setItWorkflowOption] = useState<'existing' | 'new' | 'none'>('none');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState('');
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [newWorkflowDesc, setNewWorkflowDesc] = useState('');

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
    setIsUserDialogOpen(true);
  };

  const openEditUser = (user: UserRecord) => {
    setEditingUser(user);
    setUserForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, roles: [...user.roles], status: user.status });
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

  const addVariable = () => {
    const v = newVariable.trim().replace(/\s+/g, '_').toLowerCase();
    if (v && !templateForm.variables.includes(v)) {
      setTemplateForm({ ...templateForm, variables: [...templateForm.variables, v] });
      setNewVariable('');
    }
  };

  const removeVariable = (v: string) => {
    setTemplateForm({ ...templateForm, variables: templateForm.variables.filter((x) => x !== v) });
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
    const matchesApplies = itAppliesFilter.length === 0 || itAppliesFilter.includes(t.applicableTo);
    return matchesSearch && matchesCat && matchesApplies;
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
          Manage user roles, incident types, and email notification templates for the Incident Tracker system.
        </p>
      </div>

      {/* Section Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          borderBottom: '2px solid var(--border)',
          marginBottom: 'var(--forge-spacing-large)',
        }}
      >
        <button
          onClick={() => setActiveSection('users')}
          style={{
            padding: 'var(--forge-spacing-small) var(--forge-spacing-large)',
            background: 'none',
            border: 'none',
            borderBottom: activeSection === 'users' ? '2px solid var(--primary)' : '2px solid transparent',
            marginBottom: '-2px',
            color: activeSection === 'users' ? 'var(--primary)' : 'var(--muted-foreground)',
            cursor: 'pointer',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--forge-font-weight-medium)',
            fontFamily: 'var(--forge-font-family)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--forge-spacing-xsmall)',
          }}
        >
          <Users size={18} />
          User Roles
        </button>
        <button
          onClick={() => setActiveSection('templates')}
          style={{
            padding: 'var(--forge-spacing-small) var(--forge-spacing-large)',
            background: 'none',
            border: 'none',
            borderBottom: activeSection === 'templates' ? '2px solid var(--primary)' : '2px solid transparent',
            marginBottom: '-2px',
            color: activeSection === 'templates' ? 'var(--primary)' : 'var(--muted-foreground)',
            cursor: 'pointer',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--forge-font-weight-medium)',
            fontFamily: 'var(--forge-font-family)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--forge-spacing-xsmall)',
          }}
        >
          <Mail size={18} />
          Email Templates
        </button>
        <button
          onClick={() => setActiveSection('incidentTypes')}
          style={{
            padding: 'var(--forge-spacing-small) var(--forge-spacing-large)',
            background: 'none',
            border: 'none',
            borderBottom: activeSection === 'incidentTypes' ? '2px solid var(--primary)' : '2px solid transparent',
            marginBottom: '-2px',
            color: activeSection === 'incidentTypes' ? 'var(--primary)' : 'var(--muted-foreground)',
            cursor: 'pointer',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--forge-font-weight-medium)',
            fontFamily: 'var(--forge-font-family)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--forge-spacing-xsmall)',
          }}
        >
          <AlertTriangle size={18} />
          Incident Types
        </button>
      </div>

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
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                <Input
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users..."
                  style={{ paddingLeft: '34px', width: '260px', fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }}
                />
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
                            <Badge key={role} variant="outline" style={roleBadgeStyle(role)}>{role}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="forge-table-cell">
                        <Badge
                          variant="outline"
                          style={{
                            background: user.status === 'Active' ? 'rgba(159, 168, 112, 0.15)' : 'rgba(0,0,0,0.06)',
                            borderColor: user.status === 'Active' ? 'var(--brand-olive-medium)' : 'var(--muted-foreground)',
                            color: user.status === 'Active' ? 'var(--brand-olive-dark)' : 'var(--muted-foreground)',
                            fontSize: 'var(--text-xs)',
                            fontFamily: 'var(--forge-font-family)',
                          }}
                        >
                          {user.status}
                        </Badge>
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
          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--forge-spacing-medium)', flexWrap: 'wrap', gap: 'var(--forge-spacing-small)' }}>
            <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                <Input
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  placeholder="Search templates..."
                  style={{ paddingLeft: '34px', width: '260px', fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }}
                />
              </div>
              <ForgeMultiSelect
                selected={templateCategoryFilter}
                onChange={setTemplateCategoryFilter}
                options={[
                  { value: 'Notification', label: 'Notification' },
                  { value: 'Approval', label: 'Approval' },
                  { value: 'Escalation', label: 'Escalation' },
                  { value: 'Completion', label: 'Completion' },
                  { value: 'Custom', label: 'Custom' },
                ]}
                placeholder="All Categories"
                allLabel="All Categories"
                width="200px"
              />
            </div>
            <ForgeButton onClick={openAddTemplate} style={{ fontFamily: 'var(--forge-font-family)' }}>
              <Plus size={16} style={{ marginRight: '6px' }} />
              Create Template
            </ForgeButton>
          </div>

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
                        <Badge variant="outline" style={categoryBadgeStyle(tpl.category)}>{tpl.category}</Badge>
                        {tpl.isDefault && (
                          <Badge variant="outline" style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', background: 'rgba(63,81,181,0.06)', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                            System Default
                          </Badge>
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
                            <Badge key={v} variant="outline" style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)', background: 'var(--input-background)' }}>
                              {'{{' + v + '}}'}
                            </Badge>
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
      <Dialog open={isUserDialogOpen} onOpenChange={() => setIsUserDialogOpen(false)}>
        <DialogContent style={{ maxWidth: '560px', fontFamily: 'var(--forge-font-family)' }}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--forge-font-family)' }}>
              {editingUser ? 'Edit User' : 'Add User'}
            </DialogTitle>
            <DialogDescription style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
              {editingUser ? 'Update user information and role assignments.' : 'Create a new user and assign roles.'}
            </DialogDescription>
          </DialogHeader>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-medium)' }}>
            {/* Name Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--forge-spacing-medium)' }}>
              <div>
                <Label style={labelStyle}>First Name</Label>
                <Input
                  value={userForm.firstName}
                  onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                  placeholder="First name"
                  style={{ ...inputWrapperStyle, fontFamily: 'var(--forge-font-family)' }}
                />
              </div>
              <div>
                <Label style={labelStyle}>Last Name</Label>
                <Input
                  value={userForm.lastName}
                  onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                  placeholder="Last name"
                  style={{ ...inputWrapperStyle, fontFamily: 'var(--forge-font-family)' }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label style={labelStyle}>Email</Label>
              <Input
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                placeholder="email@district.edu"
                style={{ ...inputWrapperStyle, fontFamily: 'var(--forge-font-family)' }}
              />
            </div>

            {/* Status */}
            <div>
              <Label style={labelStyle}>Status</Label>
              <select
                value={userForm.status}
                onChange={(e) => setUserForm({ ...userForm, status: e.target.value as 'Active' | 'Inactive' })}
                style={selectStyle}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TEMPLATE DIALOG                                                       */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={() => setIsTemplateDialogOpen(false)}>
        <DialogContent style={{ maxWidth: '700px', maxHeight: '90vh', overflow: 'auto', fontFamily: 'var(--forge-font-family)' }}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--forge-font-family)' }}>
              {editingTemplate ? 'Edit Email Template' : 'Create Email Template'}
            </DialogTitle>
            <DialogDescription style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
              {editingTemplate ? 'Update the email template details and body.' : 'Define a new email template for workflow notifications.'}
            </DialogDescription>
          </DialogHeader>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-medium)' }}>
            {/* Name & Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--forge-spacing-medium)' }}>
              <div>
                <Label style={labelStyle}>Template Name</Label>
                <Input
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                  placeholder="e.g., Parent Notification"
                  style={{ ...inputWrapperStyle, fontFamily: 'var(--forge-font-family)' }}
                />
              </div>
              <div>
                <Label style={labelStyle}>Category</Label>
                <select
                  value={templateForm.category}
                  onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value as EmailTemplate['category'] })}
                  style={selectStyle}
                >
                  <option value="Notification">Notification</option>
                  <option value="Approval">Approval</option>
                  <option value="Escalation">Escalation</option>
                  <option value="Completion">Completion</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label style={labelStyle}>Description</Label>
              <Input
                value={templateForm.description}
                onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                placeholder="Brief description of when this template is used"
                style={{ ...inputWrapperStyle, fontFamily: 'var(--forge-font-family)' }}
              />
            </div>

            {/* Subject */}
            <div>
              <Label style={labelStyle}>Email Subject</Label>
              <Input
                value={templateForm.subject}
                onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                placeholder="e.g., [Incident Tracker] {{step_name}} - {{incident_id}}"
                style={{ ...inputWrapperStyle, fontFamily: 'var(--forge-font-family)' }}
              />
              <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)', marginTop: 'var(--forge-spacing-xxsmall)' }}>
                Use {'{{variable_name}}'} syntax for dynamic values.
              </p>
            </div>

            {/* Body */}
            <div>
              <Label style={labelStyle}>Email Body</Label>
              <Textarea
                value={templateForm.body}
                onChange={(e) => setTemplateForm({ ...templateForm, body: e.target.value })}
                placeholder="Compose the email body here..."
                rows={10}
                style={{ ...inputWrapperStyle, fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }}
              />
            </div>

            {/* Variables */}
            <div>
              <Label style={labelStyle}>Template Variables</Label>
              <p style={{ ...mutedTextStyle, marginBottom: 'var(--forge-spacing-small)' }}>
                Define variables that will be replaced with actual values when the email is sent.
              </p>
              <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', marginBottom: 'var(--forge-spacing-small)' }}>
                <Input
                  value={newVariable}
                  onChange={(e) => setNewVariable(e.target.value)}
                  placeholder="e.g., recipient_name"
                  onKeyDown={(e) => e.key === 'Enter' && addVariable()}
                  style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }}
                />
                <ForgeButton onClick={addVariable} disabled={!newVariable.trim()} style={{ fontFamily: 'var(--forge-font-family)' }}>
                  <Plus size={16} />
                </ForgeButton>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--forge-spacing-xxsmall)' }}>
                {templateForm.variables.map((v) => (
                  <Badge
                    key={v}
                    variant="outline"
                    style={{
                      fontFamily: 'var(--forge-font-family)',
                      fontSize: 'var(--text-xs)',
                      background: 'var(--input-background)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {'{{' + v + '}}'}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeVariable(v)} />
                  </Badge>
                ))}
              </div>
            </div>
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
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TEMPLATE PREVIEW DIALOG                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <Dialog open={isPreviewOpen} onOpenChange={() => setIsPreviewOpen(false)}>
        <DialogContent style={{ maxWidth: '640px', maxHeight: '80vh', overflow: 'auto', fontFamily: 'var(--forge-font-family)' }}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--forge-font-family)' }}>
              <Eye size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
              Email Preview
            </DialogTitle>
            <DialogDescription style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
              Preview of "{previewTemplate?.name}" template with sample data.
            </DialogDescription>
          </DialogHeader>
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
                    <Badge key={v} variant="outline" style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)', background: 'var(--input-background)' }}>
                      {'{{' + v + '}}'}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* INCIDENT TYPES SECTION                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeSection === 'incidentTypes' && (
        <div>
          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--forge-spacing-medium)', flexWrap: 'wrap', gap: 'var(--forge-spacing-small)' }}>
            <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                <Input
                  value={itSearch}
                  onChange={(e) => setItSearch(e.target.value)}
                  placeholder="Search incident types..."
                  style={{ paddingLeft: '36px', width: '260px', fontFamily: 'var(--forge-font-family)' }}
                />
              </div>
              <ForgeMultiSelect
                selected={itCategoryFilter}
                onChange={setItCategoryFilter}
                options={allItCategories.map((cat) => ({ value: cat, label: cat }))}
                placeholder="All Categories"
                allLabel="All Categories"
                width="200px"
              />
              <ForgeMultiSelect
                selected={itAppliesFilter}
                onChange={setItAppliesFilter}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'driver', label: 'Driver' },
                ]}
                placeholder="All (Student & Driver)"
                allLabel="All (Student & Driver)"
                width="210px"
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
                    <th className="forge-table-cell forge-table-cell--header">Applies To</th>
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
                        <Badge variant="outline" style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-xs)' }}>{it.category}</Badge>
                      </td>
                      <td className="forge-table-cell">
                        <Badge
                          variant="outline"
                          style={{
                            fontFamily: 'var(--forge-font-family)',
                            fontSize: 'var(--text-xs)',
                            background: it.applicableTo === 'student' ? 'rgba(74, 111, 165, 0.10)' : it.applicableTo === 'driver' ? 'rgba(159, 168, 112, 0.15)' : 'rgba(63, 81, 181, 0.10)',
                            borderColor: it.applicableTo === 'student' ? 'var(--brand-blue-medium)' : it.applicableTo === 'driver' ? 'var(--brand-olive-medium)' : 'var(--primary)',
                          }}
                        >
                          {it.applicableTo === 'student' ? 'Student' : it.applicableTo === 'driver' ? 'Driver' : 'Both'}
                        </Badge>
                      </td>
                      <td className="forge-table-cell">
                        <Badge
                          variant="outline"
                          style={{
                            fontFamily: 'var(--forge-font-family)',
                            fontSize: 'var(--text-xs)',
                            background: it.defaultSeverity === 'High' ? 'rgba(176, 0, 32, 0.08)' : it.defaultSeverity === 'Medium' ? 'rgba(255, 193, 7, 0.12)' : 'rgba(159, 168, 112, 0.15)',
                            borderColor: it.defaultSeverity === 'High' ? 'var(--destructive)' : it.defaultSeverity === 'Medium' ? 'var(--secondary)' : 'var(--brand-olive-medium)',
                            color: it.defaultSeverity === 'High' ? 'var(--destructive)' : it.defaultSeverity === 'Medium' ? '#8B6914' : 'var(--brand-olive-dark)',
                          }}
                        >
                          {it.defaultSeverity}
                        </Badge>
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
                      <td colSpan={7} className="forge-table-cell" style={{ textAlign: 'center', padding: 'var(--forge-spacing-xlarge)', color: 'var(--muted-foreground)' }}>
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
      <Dialog open={isItDialogOpen} onOpenChange={setIsItDialogOpen}>
        <DialogContent style={{ maxWidth: '620px', maxHeight: '90vh', overflow: 'auto', fontFamily: 'var(--forge-font-family)' }}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--forge-font-family)' }}>
              {editingIt ? 'Edit Incident Type' : 'Add Incident Type'}
            </DialogTitle>
            <DialogDescription style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
              {editingIt ? 'Update the details for this incident type.' : 'Define a new incident type for the system.'}
            </DialogDescription>
          </DialogHeader>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-medium)' }}>
            {/* Label */}
            <div>
              <div style={labelStyle}>Label <span style={{ color: 'var(--destructive)' }}>*</span></div>
              <Input
                value={itForm.label}
                onChange={(e) => setItForm({ ...itForm, label: e.target.value })}
                placeholder="e.g., Unauthorized Device Usage"
                style={{ ...inputWrapperStyle, fontFamily: 'var(--forge-font-family)' }}
              />
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

            {/* Category + Applies To row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--forge-spacing-medium)' }}>
              <div>
                <div style={labelStyle}>Category <span style={{ color: 'var(--destructive)' }}>*</span></div>
                <select
                  value={itForm.category}
                  onChange={(e) => setItForm({ ...itForm, category: e.target.value })}
                  style={selectStyle}
                >
                  {allItCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <div style={labelStyle}>Applies To <span style={{ color: 'var(--destructive)' }}>*</span></div>
                <select
                  value={itForm.applicableTo}
                  onChange={(e) => setItForm({ ...itForm, applicableTo: e.target.value as 'student' | 'driver' | 'both' })}
                  style={selectStyle}
                >
                  <option value="student">Student</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
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
                  <select
                    value={selectedWorkflowId}
                    onChange={(e) => setSelectedWorkflowId(e.target.value)}
                    style={selectStyle}
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
                    <Input
                      value={newWorkflowName}
                      onChange={(e) => setNewWorkflowName(e.target.value)}
                      placeholder={itForm.label ? `${itForm.label} Response` : 'e.g., Unauthorized Device Response'}
                      style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--text-sm)' }}
                    />
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
