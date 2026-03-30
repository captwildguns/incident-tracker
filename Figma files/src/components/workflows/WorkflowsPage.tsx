import React, { useState, useEffect } from 'react';
import { ForgeCard, ForgeButton } from '@tylertech/forge-react';
import { defineCardComponent } from '@tylertech/forge';
defineCardComponent();
import { defineButtonComponent } from '@tylertech/forge';
defineButtonComponent();
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  Circle,
  ArrowRight,
  Settings,
  AlertTriangle,
  FileText,
  Users,
  Clock,
  Mail,
  UserCheck,
  Zap,
  GitBranch,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { workflows as importedWorkflows, Workflow, WorkflowStep } from '../../data/workflows';
import { INCIDENT_TYPES, INCIDENT_CATEGORIES } from '../incidents/IncidentTypes';
import { toast } from 'sonner';
import { WorkflowStepLibrary, WorkflowStepTemplate } from './WorkflowStepLibrary';
import { StepTemplateManager } from './StepTemplateManager';
import { ForgeMultiSelect } from '../ui/forge-multiselect';

interface WorkflowsPageProps {
  onNavigate: (page: string) => void;
  onNavigateToWorkflowBuilder: (workflow: any) => void;
}

export function WorkflowsPage({ onNavigate, onNavigateToWorkflowBuilder }: WorkflowsPageProps) {
  // Tab state
  const [activeTab, setActiveTab] = useState<'workflows' | 'templates'>('workflows');
  
  // Custom step templates
  const [customStepTemplates, setCustomStepTemplates] = useState<WorkflowStepTemplate[]>([]);
  
  // Convert imported workflows to match local format
  const convertedWorkflows: any[] = importedWorkflows.map((w) => ({
    id: w.id,
    name: w.name,
    description: w.description,
    category: 'Safety', // Default category
    severity: w.severityLevels?.[0] || 'Medium',
    incidentTypes: w.incidentTypes,
    steps: w.steps,
    active: w.isActive,
    createdDate: w.createdDate,
    lastModified: w.lastModified,
  }));

  const [workflows, setWorkflows] = useState<any[]>(convertedWorkflows);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [expandedWorkflowId, setExpandedWorkflowId] = useState<string | null>(null);

  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    category: 'Safety',
    severity: '',
    incidentTypes: [] as string[],
    associatedIncidentType: '',
  });

  const categories = ['Safety', 'Discipline', 'Maintenance', 'Administrative'];
  const severityLevels = ['Critical', 'High', 'Medium', 'Low'];

  // Group incident types by category for the selector
  const studentIncidentTypes = INCIDENT_TYPES.filter(t => t.applicableTo === 'student' || t.applicableTo === 'both');
  const driverIncidentTypes = INCIDENT_TYPES.filter(t => t.applicableTo === 'driver' || t.applicableTo === 'both');

  // Compute which incident type labels are already linked to an active workflow
  const linkedIncidentTypeLabels = new Set(
    workflows.flatMap((w: any) => w.incidentTypes || [])
  );

  // Filter out the default workflow (General Incident Review) from the displayed list
  const customWorkflows = workflows.filter((w) => w.id !== 'WF-DEFAULT');

  const filteredWorkflows = customWorkflows.filter((workflow) => {
    const matchesSearch =
      searchTerm === '' ||
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategories.length === 0 || filterCategories.includes(workflow.category);

    const matchesActive =
      filterStatuses.length === 0 ||
      (filterStatuses.includes('Active') && workflow.active) ||
      (filterStatuses.includes('Inactive') && !workflow.active);

    return matchesSearch && matchesCategory && matchesActive;
  });

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination calculations
  const totalPages = Math.ceil(filteredWorkflows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedWorkflows = filteredWorkflows.slice(startIndex, startIndex + rowsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategories, filterStatuses, rowsPerPage]);

  const handleCreateWorkflow = () => {
    const selectedType = INCIDENT_TYPES.find(t => t.id === newWorkflow.associatedIncidentType);
    const workflow: Workflow = {
      id: Date.now().toString(),
      name: newWorkflow.name,
      description: newWorkflow.description,
      category: newWorkflow.category,
      severity: newWorkflow.severity,
      incidentTypes: selectedType ? [selectedType.id] : newWorkflow.incidentTypes,
      steps: [],
      active: true,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };

    setWorkflows([...workflows, workflow]);
    setIsCreateDialogOpen(false);
    setSelectedWorkflow(workflow);
    setIsBuilderOpen(true);

    setNewWorkflow({
      name: '',
      description: '',
      category: 'Safety',
      severity: '',
      incidentTypes: [],
      associatedIncidentType: '',
    });
  };

  const handleDuplicateWorkflow = (workflow: Workflow) => {
    const duplicated: Workflow = {
      ...workflow,
      id: Date.now().toString(),
      name: `${workflow.name} (Copy)`,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };

    setWorkflows([...workflows, duplicated]);
  };

  const handleDeleteWorkflow = (id: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(workflows.filter((w) => w.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setWorkflows(
      workflows.map((w) =>
        w.id === id ? { ...w, active: !w.active } : w
      )
    );
  };

  const handleOpenBuilder = (workflow: Workflow) => {
    onNavigateToWorkflowBuilder(workflow);
  };

  const toggleIncidentType = (type: string) => {
    setNewWorkflow((prev) => ({
      ...prev,
      incidentTypes: prev.incidentTypes.includes(type)
        ? prev.incidentTypes.filter((t) => t !== type)
        : [...prev.incidentTypes, type],
    }));
  };

  return (
    <div style={{ padding: 'var(--forge-spacing-xlarge)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <h1
          style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--forge-font-weight-medium)',
            marginBottom: 'var(--forge-spacing-small)',
          }}
        >
          Workflow Management
        </h1>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--muted-foreground)',
          }}
        >
          Create and manage custom workflows for different incident types and severities
        </p>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <div 
          style={{ 
            display: 'flex', 
            gap: 'var(--forge-spacing-small)',
            borderBottom: '2px solid var(--border)',
          }}
        >
          <button
            onClick={() => setActiveTab('workflows')}
            style={{
              padding: 'var(--forge-spacing-small) var(--forge-spacing-medium)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--forge-font-weight-medium)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderBottom: activeTab === 'workflows' ? '3px solid var(--brand-blue-dark)' : '3px solid transparent',
              color: activeTab === 'workflows' ? 'var(--brand-blue-dark)' : 'var(--muted-foreground)',
              marginBottom: '-2px',
              transition: 'all 0.2s',
            }}
          >
            <GitBranch className="h-4 w-4 inline mr-2" />
            Workflows
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            style={{
              padding: 'var(--forge-spacing-small) var(--forge-spacing-medium)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--forge-font-weight-medium)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderBottom: activeTab === 'templates' ? '3px solid var(--brand-blue-dark)' : '3px solid transparent',
              color: activeTab === 'templates' ? 'var(--brand-blue-dark)' : 'var(--muted-foreground)',
              marginBottom: '-2px',
              transition: 'all 0.2s',
            }}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            Step Templates
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'workflows' && (
        <>
          {/* Stats Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--forge-spacing-medium)',
              marginBottom: 'var(--forge-spacing-large)',
            }}
          >
            <ForgeCard>
              <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-small)' }}>
                  <FileText className="h-8 w-8" style={{ color: 'var(--brand-blue-dark)' }} />
                  <div>
                    <div
                      style={{
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--forge-font-weight-medium)',
                      }}
                    >
                      {workflows.length}
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      Total Workflows
                    </div>
                  </div>
                </div>
              </div>
            </ForgeCard>

            <ForgeCard>
              <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-small)' }}>
                  <CheckCircle className="h-8 w-8" style={{ color: 'var(--brand-olive-medium)' }} />
                  <div>
                    <div
                      style={{
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--forge-font-weight-medium)',
                      }}
                    >
                      {workflows.filter((w) => w.active).length}
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      Active Workflows
                    </div>
                  </div>
                </div>
              </div>
            </ForgeCard>
          </div>

          {/* Filters and Actions */}
          <ForgeCard style={{ marginBottom: 'var(--forge-spacing-large)' }}>
            <div style={{ padding: 'var(--forge-spacing-medium)' }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--forge-spacing-medium)',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <Input
                    placeholder="Search workflows..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <ForgeMultiSelect
                  selected={filterCategories}
                  onChange={setFilterCategories}
                  options={categories.map(cat => ({ value: cat, label: cat }))}
                  placeholder="All Categories"
                  allLabel="All Categories"
                  width="200px"
                />

                <ForgeMultiSelect
                  selected={filterStatuses}
                  onChange={setFilterStatuses}
                  options={[
                    { value: 'Active', label: 'Active' },
                    { value: 'Inactive', label: 'Inactive' },
                  ]}
                  placeholder="All Status"
                  allLabel="All Status"
                  width="180px"
                />

                <ForgeButton onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Workflow
                </ForgeButton>
              </div>
            </div>
          </ForgeCard>

          {/* Workflows Table */}
          <ForgeCard>
            <div style={{ padding: 0 }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="forge-table" style={{ fontFamily: 'var(--forge-font-family)' }}>
                  <thead>
                    <tr>
                      <th className="forge-table-cell forge-table-cell--header" style={{ whiteSpace: 'nowrap' }}>Workflow Name</th>
                      <th className="forge-table-cell forge-table-cell--header" style={{ whiteSpace: 'nowrap' }}>Category</th>
                      <th className="forge-table-cell forge-table-cell--header" style={{ whiteSpace: 'nowrap' }}>Status</th>
                      <th className="forge-table-cell forge-table-cell--header" style={{ whiteSpace: 'nowrap' }}>Severity</th>
                      <th className="forge-table-cell forge-table-cell--header" style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>Steps</th>
                      <th className="forge-table-cell forge-table-cell--header" style={{ whiteSpace: 'nowrap' }}>Last Modified</th>
                      <th className="forge-table-cell forge-table-cell--header" style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedWorkflows.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="forge-table-cell" style={{ padding: 'var(--forge-spacing-xlarge)', textAlign: 'center' }}>
                          <AlertTriangle
                            className="h-12 w-12"
                            style={{ color: 'var(--muted-foreground)', margin: '0 auto var(--forge-spacing-medium)' }}
                          />
                          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--muted-foreground)', fontFamily: 'var(--forge-font-family)' }}>
                            No workflows found matching your criteria
                          </p>
                        </td>
                      </tr>
                    ) : (
                      paginatedWorkflows.map((workflow) => (
                        <tr
                          key={workflow.id}
                          className="forge-table-row"
                          style={{
                            opacity: workflow.active ? 1 : 0.6,
                          }}
                        >
                          <td className="forge-table-cell">
                            <div style={{ fontFamily: 'var(--forge-font-family)', fontWeight: 'var(--forge-font-weight-medium)', fontSize: 'var(--text-base)' }}>
                              {workflow.name}
                            </div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--forge-font-family)', marginTop: '2px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {workflow.description}
                            </div>
                          </td>
                          <td className="forge-table-cell">
                            <Badge variant="outline" style={{ fontFamily: 'var(--forge-font-family)' }}>{workflow.category}</Badge>
                          </td>
                          <td className="forge-table-cell">
                            <Badge
                              style={{
                                background: workflow.active ? 'var(--brand-olive-medium)' : 'var(--muted)',
                                color: workflow.active ? 'white' : 'var(--muted-foreground)',
                                fontFamily: 'var(--forge-font-family)',
                              }}
                            >
                              {workflow.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>
                          <td className="forge-table-cell">
                            <Badge
                              variant="outline"
                              style={{
                                fontSize: 'var(--text-xs)',
                                fontFamily: 'var(--forge-font-family)',
                                background:
                                  workflow.severity === 'Critical'
                                    ? 'rgba(176, 0, 32, 0.1)'
                                    : workflow.severity === 'High'
                                    ? 'rgba(255, 193, 7, 0.1)'
                                    : workflow.severity === 'Medium'
                                    ? 'rgba(63, 81, 181, 0.1)'
                                    : 'rgba(159, 168, 112, 0.15)',
                              }}
                            >
                              {workflow.severity}
                            </Badge>
                          </td>
                          <td className="forge-table-cell" style={{ textAlign: 'center', fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                            {workflow.steps.length}
                          </td>
                          <td className="forge-table-cell" style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>
                            {workflow.lastModified}
                          </td>
                          <td className="forge-table-cell" style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: 'var(--forge-spacing-xxsmall)', justifyContent: 'flex-end' }}>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <ForgeButton
                                      variant="flat"
                                      size="sm"
                                      onClick={() => handleOpenBuilder(workflow)}
                                    >
                                      <Settings className="h-4 w-4" />
                                    </ForgeButton>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit workflow</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <ForgeButton
                                      variant="flat"
                                      size="sm"
                                      onClick={() => handleDuplicateWorkflow(workflow)}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </ForgeButton>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Duplicate workflow</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <ForgeButton
                                      variant="flat"
                                      size="sm"
                                      onClick={() => handleToggleActive(workflow.id)}
                                    >
                                      {workflow.active ? (
                                        <Circle className="h-4 w-4" />
                                      ) : (
                                        <CheckCircle className="h-4 w-4" />
                                      )}
                                    </ForgeButton>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{workflow.active ? 'Set to Inactive' : 'Set to Active'}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <ForgeButton
                                      variant="flat"
                                      size="sm"
                                      onClick={() => handleDeleteWorkflow(workflow.id)}
                                      style={{ color: 'var(--destructive)' }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </ForgeButton>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete workflow</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {filteredWorkflows.length > 0 && (
                <div className="flex items-center justify-between" style={{ padding: 'var(--forge-spacing-medium)', borderTop: '1px solid var(--border)' }}>
                  <div className="flex items-center" style={{ gap: 'var(--forge-spacing-small)' }}>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--forge-font-family)' }}>
                      Showing {startIndex + 1}&ndash;{Math.min(startIndex + rowsPerPage, filteredWorkflows.length)} of {filteredWorkflows.length} workflows
                    </span>
                    {rowsPerPage === 10 && filteredWorkflows.length > 10 && (
                      <ForgeButton
                        variant="outlined"
                        size="sm"
                        onClick={() => { setRowsPerPage(25); setCurrentPage(1); }}
                        style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}
                      >
                        Show 25
                      </ForgeButton>
                    )}
                    {rowsPerPage === 25 && (
                      <ForgeButton
                        variant="outlined"
                        size="sm"
                        onClick={() => { setRowsPerPage(10); setCurrentPage(1); }}
                        style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}
                      >
                        Show 10
                      </ForgeButton>
                    )}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center" style={{ gap: 'var(--forge-spacing-xsmall)' }}>
                      <ForgeButton
                        variant="outlined"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        style={{ padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)' }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </ForgeButton>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <ForgeButton
                          key={page}
                          variant={page === currentPage ? 'raised' : 'outlined'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          style={{ minWidth: '32px', padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)', fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}
                        >
                          {page}
                        </ForgeButton>
                      ))}
                      <ForgeButton
                        variant="outlined"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        style={{ padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)' }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </ForgeButton>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ForgeCard>

          {/* Create Workflow Dialog */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle style={{ fontSize: 'var(--text-2xl)' }}>Create New Workflow</DialogTitle>
                <DialogDescription style={{ fontSize: 'var(--text-base)' }}>
                  Define a new workflow for handling specific incident types
                </DialogDescription>
              </DialogHeader>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-medium)' }}>
                <div>
                  <Label htmlFor="workflow-name" style={{ fontSize: 'var(--text-sm)' }}>
                    Workflow Name
                  </Label>
                  <Input
                    id="workflow-name"
                    value={newWorkflow.name}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                    placeholder="e.g., Bus Accident Response"
                    style={{ marginTop: 'var(--forge-spacing-xsmall)' }}
                  />
                </div>

                <div>
                  <Label htmlFor="workflow-description" style={{ fontSize: 'var(--text-sm)' }}>
                    Description
                  </Label>
                  <Textarea
                    id="workflow-description"
                    value={newWorkflow.description}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                    placeholder="Describe when this workflow should be used..."
                    rows={3}
                    style={{ marginTop: 'var(--forge-spacing-xsmall)' }}
                  />
                </div>

                <div>
                  <Label style={{ fontSize: 'var(--text-sm)' }}>Category</Label>
                  <select
                    value={newWorkflow.category}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, category: e.target.value })}
                    style={{
                      width: '100%',
                      marginTop: 'var(--forge-spacing-xsmall)',
                      padding: 'var(--forge-spacing-small)',
                      borderRadius: 'var(--forge-radius-medium)',
                      border: '1px solid var(--border)',
                      fontSize: 'var(--text-base)',
                      background: 'var(--input-background)',
                    }}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--forge-spacing-small)', display: 'block' }}>
                    Severity Level
                  </Label>
                  <select
                    value={newWorkflow.severity}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, severity: e.target.value })}
                    style={{
                      width: '100%',
                      padding: 'var(--forge-spacing-small)',
                      borderRadius: 'var(--forge-radius-medium)',
                      border: '1px solid var(--border)',
                      fontSize: 'var(--text-base)',
                      fontFamily: 'var(--forge-font-family)',
                      background: 'var(--input-background)',
                    }}
                  >
                    <option value="">-- Select severity --</option>
                    {severityLevels.map((sev) => (
                      <option key={sev} value={sev}>
                        {sev}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--forge-spacing-small)', display: 'block' }}>
                    Associated Incident Type <span style={{ color: 'var(--destructive)' }}>*</span>
                  </Label>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--forge-spacing-small)' }}>
                    Each workflow is mapped to a specific incident type. Select the incident type this workflow will handle.
                  </p>
                  {(() => {
                    const unlinkedCount = INCIDENT_TYPES.filter(t => !linkedIncidentTypeLabels.has(t.label) && !linkedIncidentTypeLabels.has(t.id)).length;
                    return unlinkedCount > 0 ? (
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--brand-olive-dark)', marginBottom: 'var(--forge-spacing-small)', fontFamily: 'var(--forge-font-family)', display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-xxsmall)' }}>
                        <AlertTriangle size={12} />
                        {unlinkedCount} incident type{unlinkedCount > 1 ? 's' : ''} available (not yet linked to a workflow). Linked types are greyed out.
                      </p>
                    ) : (
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--forge-spacing-small)', fontFamily: 'var(--forge-font-family)', fontStyle: 'italic' }}>
                        All incident types are currently linked to a workflow.
                      </p>
                    );
                  })()}
                  <select
                    value={newWorkflow.associatedIncidentType}
                    onChange={(e) => {
                      const selectedType = INCIDENT_TYPES.find(t => t.id === e.target.value);
                      setNewWorkflow({
                        ...newWorkflow,
                        associatedIncidentType: e.target.value,
                        severity: selectedType ? selectedType.defaultSeverity : newWorkflow.severity,
                      });
                    }}
                    style={{
                      width: '100%',
                      padding: 'var(--forge-spacing-small)',
                      borderRadius: 'var(--forge-radius-medium)',
                      border: '1px solid var(--border)',
                      fontSize: 'var(--text-base)',
                      fontFamily: 'var(--forge-font-family)',
                      background: 'var(--input-background)',
                    }}
                  >
                    <option value="">-- Select an incident type --</option>
                    <optgroup label="Student Incident Types">
                      {studentIncidentTypes.map((t) => {
                        const isLinked = linkedIncidentTypeLabels.has(t.label) || linkedIncidentTypeLabels.has(t.id);
                        return (
                          <option key={t.id} value={t.id} disabled={isLinked} style={isLinked ? { color: 'var(--muted-foreground)' } : {}}>
                            {t.label} ({t.category}) — {t.defaultSeverity}{isLinked ? '  ✓ Linked' : ''}
                          </option>
                        );
                      })}
                    </optgroup>
                    <optgroup label="Driver Incident Types">
                      {driverIncidentTypes.map((t) => {
                        const isLinked = linkedIncidentTypeLabels.has(t.label) || linkedIncidentTypeLabels.has(t.id);
                        return (
                          <option key={t.id} value={t.id} disabled={isLinked} style={isLinked ? { color: 'var(--muted-foreground)' } : {}}>
                            {t.label} ({t.category}) — {t.defaultSeverity}{isLinked ? '  ✓ Linked' : ''}
                          </option>
                        );
                      })}
                    </optgroup>
                  </select>
                  {newWorkflow.associatedIncidentType && (() => {
                    const selectedType = INCIDENT_TYPES.find(t => t.id === newWorkflow.associatedIncidentType);
                    return selectedType ? (
                      <div style={{
                        marginTop: 'var(--forge-spacing-small)',
                        padding: 'var(--forge-spacing-small)',
                        background: 'var(--input-background)',
                        borderRadius: 'var(--forge-radius-medium)',
                        border: '1px solid var(--border)',
                      }}>
                        <div style={{ display: 'flex', gap: 'var(--forge-spacing-xsmall)', marginBottom: 'var(--forge-spacing-xxsmall)', flexWrap: 'wrap' }}>
                          <Badge variant="outline" style={{
                            background: selectedType.applicableTo === 'student' ? 'rgba(74, 111, 165, 0.10)' : selectedType.applicableTo === 'driver' ? 'rgba(159, 168, 112, 0.15)' : 'rgba(63, 81, 181, 0.10)',
                            fontSize: 'var(--text-xs)',
                          }}>
                            {selectedType.applicableTo === 'student' ? 'Student' : selectedType.applicableTo === 'driver' ? 'Driver' : 'Both'}
                          </Badge>
                          <Badge variant="outline" style={{ fontSize: 'var(--text-xs)' }}>{selectedType.category}</Badge>
                          <Badge variant="outline" style={{
                            fontSize: 'var(--text-xs)',
                            background: selectedType.defaultSeverity === 'High' ? 'rgba(176, 0, 32, 0.08)' : selectedType.defaultSeverity === 'Medium' ? 'rgba(255, 193, 7, 0.12)' : 'rgba(159, 168, 112, 0.15)',
                          }}>
                            {selectedType.defaultSeverity}
                          </Badge>
                        </div>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', margin: 0 }}>
                          {selectedType.description}
                        </p>
                      </div>
                    ) : null;
                  })()}
                </div>

                <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', marginTop: 'var(--forge-spacing-medium)' }}>
                  <ForgeButton
                    variant="outlined"
                    onClick={() => setIsCreateDialogOpen(false)}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </ForgeButton>
                  <ForgeButton
                    onClick={handleCreateWorkflow}
                    disabled={!newWorkflow.name || !newWorkflow.severity || !newWorkflow.associatedIncidentType}
                    style={{ flex: 1 }}
                  >
                    Create & Build Steps
                  </ForgeButton>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Workflow Builder Dialog */}
          {selectedWorkflow && (
            <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
              <DialogContent style={{ maxWidth: '800px' }}>
                <DialogHeader>
                  <DialogTitle style={{ fontSize: 'var(--text-2xl)' }}>
                    Workflow Builder: {selectedWorkflow.name}
                  </DialogTitle>
                  <DialogDescription style={{ fontSize: 'var(--text-base)' }}>
                    Define the steps for this workflow
                  </DialogDescription>
                </DialogHeader>

                <div style={{ marginBottom: 'var(--forge-spacing-medium)' }}>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                    {selectedWorkflow.description}
                  </p>
                </div>

                <ForgeButton
                  onClick={() => {
                    setIsBuilderOpen(false);
                    onNavigateToWorkflowBuilder(selectedWorkflow);
                  }}
                  style={{ width: '100%' }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Open Advanced Workflow Builder
                </ForgeButton>
              </DialogContent>
            </Dialog>
          )}
        </>
      )}

      {activeTab === 'templates' && (
        <>
          {/* Step Templates Manager */}
          <StepTemplateManager
            customTemplates={customStepTemplates}
            onAddTemplate={(template) => setCustomStepTemplates([...customStepTemplates, template])}
            onEditTemplate={(template) => {
              setCustomStepTemplates(
                customStepTemplates.map((t) => (t.id === template.id ? template : t))
              );
            }}
            onDeleteTemplate={(templateId) => {
              setCustomStepTemplates(customStepTemplates.filter((t) => t.id !== templateId));
            }}
          />
        </>
      )}
    </div>
  );
}