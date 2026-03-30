import React, { useState } from 'react';
import { ForgeCard, ForgeButton } from '@tylertech/forge-react';
import { defineCardComponent } from '@tylertech/forge';
defineCardComponent();
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
  DialogTrigger,
} from '../ui/dialog';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  FileText,
  Mail,
  Phone,
  UserCheck,
  Clock,
  AlertCircle,
  CheckCircle,
  Settings,
  Users,
  Bell,
  Calendar,
  ClipboardCheck,
  MessageSquare,
  Shield,
  Video,
  FileCheck,
  UserPlus,
  Ban,
  Archive,
  Library,
} from 'lucide-react';
import { workflowStepTemplates, WorkflowStepTemplate } from './WorkflowStepLibrary';
import { toast } from 'sonner';

interface StepTemplateManagerProps {
  customTemplates?: WorkflowStepTemplate[];
  onAddTemplate?: (template: WorkflowStepTemplate) => void;
  onEditTemplate?: (template: WorkflowStepTemplate) => void;
  onDeleteTemplate?: (templateId: string) => void;
}

const iconOptions = [
  { name: 'Phone', icon: Phone },
  { name: 'Mail', icon: Mail },
  { name: 'MessageSquare', icon: MessageSquare },
  { name: 'Bell', icon: Bell },
  { name: 'Calendar', icon: Calendar },
  { name: 'FileText', icon: FileText },
  { name: 'Users', icon: Users },
  { name: 'Video', icon: Video },
  { name: 'FileCheck', icon: FileCheck },
  { name: 'UserCheck', icon: UserCheck },
  { name: 'ClipboardCheck', icon: ClipboardCheck },
  { name: 'Shield', icon: Shield },
  { name: 'UserPlus', icon: UserPlus },
  { name: 'Ban', icon: Ban },
  { name: 'Clock', icon: Clock },
  { name: 'CheckCircle', icon: CheckCircle },
  { name: 'Settings', icon: Settings },
  { name: 'Archive', icon: Archive },
];

const categoryOptions: Array<'Communication' | 'Documentation' | 'Investigation' | 'Intervention' | 'Administrative' | 'Follow-up'> = [
  'Communication',
  'Documentation',
  'Investigation',
  'Intervention',
  'Administrative',
  'Follow-up',
];

const roleOptions = [
  'Safety Coordinator',
  'Administrator',
  'Fleet Manager',
  'Driver',
  'Nurse',
  'Counselor',
  'Principal',
  'Transportation Director',
];

export function StepTemplateManager({
  customTemplates = [],
  onAddTemplate,
  onEditTemplate,
  onDeleteTemplate,
}: StepTemplateManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<WorkflowStepTemplate | null>(null);

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'Communication' as WorkflowStepTemplate['category'],
    icon: 'Phone',
    defaultRole: 'Safety Coordinator',
    defaultDuration: '30 minutes',
    requiresApproval: false,
    emailNotifications: {
      notifyOnStart: false,
      notifyOnComplete: false,
      notifyAssignee: true,
    },
    tags: [] as string[],
  });

  const [tagInput, setTagInput] = useState('');

  // Combine built-in and custom templates
  const allTemplates = [...workflowStepTemplates, ...customTemplates];

  const categories = ['All', ...categoryOptions];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Communication':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Documentation':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Investigation':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Intervention':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Administrative':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Follow-up':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryCount = (category: string) => {
    if (category === 'All') return allTemplates.length;
    return allTemplates.filter((t) => t.category === category).length;
  };

  const filteredTemplates = allTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = filterCategory === 'All' || template.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const selectedIcon = iconOptions.find((i) => i.name === newTemplate.icon);
    
    const template: WorkflowStepTemplate = {
      id: `custom-${Date.now()}`,
      name: newTemplate.name,
      description: newTemplate.description,
      category: newTemplate.category,
      icon: selectedIcon?.icon || Phone,
      defaultRole: newTemplate.defaultRole,
      defaultDuration: newTemplate.defaultDuration,
      requiresApproval: newTemplate.requiresApproval,
      emailNotifications: newTemplate.emailNotifications,
      tags: newTemplate.tags,
    };

    if (onAddTemplate) {
      onAddTemplate(template);
    }

    toast.success('Template created', {
      description: `"${template.name}" has been added to your step library`,
    });

    // Reset form
    setNewTemplate({
      name: '',
      description: '',
      category: 'Communication',
      icon: 'Phone',
      defaultRole: 'Safety Coordinator',
      defaultDuration: '30 minutes',
      requiresApproval: false,
      emailNotifications: {
        notifyOnStart: false,
        notifyOnComplete: false,
        notifyAssignee: true,
      },
      tags: [],
    });
    setTagInput('');
    setIsCreateDialogOpen(false);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newTemplate.tags.includes(tagInput.trim())) {
      setNewTemplate({
        ...newTemplate,
        tags: [...newTemplate.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewTemplate({
      ...newTemplate,
      tags: newTemplate.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const isBuiltIn = (templateId: string) => {
    return workflowStepTemplates.some((t) => t.id === templateId);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--forge-spacing-large)' }}>
        <div>
          <h2
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--forge-font-weight-medium)',
              marginBottom: 'var(--forge-spacing-xsmall)',
            }}
          >
            Step Template Library
          </h2>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--muted-foreground)',
            }}
          >
            Manage pre-built workflow step templates for quick workflow creation
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <ForgeButton
              style={{
                background: 'var(--brand-blue-dark)',
                color: 'white',
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </ForgeButton>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle style={{ fontSize: 'var(--text-2xl)' }}>Create Step Template</DialogTitle>
              <DialogDescription style={{ fontSize: 'var(--text-base)' }}>
                Create a reusable step template that can be added to any workflow
              </DialogDescription>
            </DialogHeader>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-medium)' }}>
              {/* Template Name */}
              <div>
                <Label htmlFor="template-name" style={{ fontSize: 'var(--text-sm)' }}>
                  Template Name *
                </Label>
                <Input
                  id="template-name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  placeholder="e.g., Emergency Parent Notification"
                  style={{ marginTop: 'var(--forge-spacing-xsmall)' }}
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="template-description" style={{ fontSize: 'var(--text-sm)' }}>
                  Description *
                </Label>
                <Textarea
                  id="template-description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  placeholder="Describe what this step does..."
                  rows={3}
                  style={{ marginTop: 'var(--forge-spacing-xsmall)' }}
                />
              </div>

              {/* Category and Icon */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--forge-spacing-medium)' }}>
                <div>
                  <Label htmlFor="template-category" style={{ fontSize: 'var(--text-sm)' }}>
                    Category
                  </Label>
                  <select
                    id="template-category"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value as WorkflowStepTemplate['category'] })}
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
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="template-icon" style={{ fontSize: 'var(--text-sm)' }}>
                    Icon
                  </Label>
                  <select
                    id="template-icon"
                    value={newTemplate.icon}
                    onChange={(e) => setNewTemplate({ ...newTemplate, icon: e.target.value })}
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
                    {iconOptions.map((iconOpt) => (
                      <option key={iconOpt.name} value={iconOpt.name}>
                        {iconOpt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Role and Duration */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--forge-spacing-medium)' }}>
                <div>
                  <Label htmlFor="template-role" style={{ fontSize: 'var(--text-sm)' }}>
                    Default Assigned Role
                  </Label>
                  <select
                    id="template-role"
                    value={newTemplate.defaultRole}
                    onChange={(e) => setNewTemplate({ ...newTemplate, defaultRole: e.target.value })}
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
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="template-duration" style={{ fontSize: 'var(--text-sm)' }}>
                    Default Duration
                  </Label>
                  <Input
                    id="template-duration"
                    value={newTemplate.defaultDuration}
                    onChange={(e) => setNewTemplate({ ...newTemplate, defaultDuration: e.target.value })}
                    placeholder="e.g., 30 minutes, 1 hour"
                    style={{ marginTop: 'var(--forge-spacing-xsmall)' }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label htmlFor="template-tags" style={{ fontSize: 'var(--text-sm)' }}>
                  Tags
                </Label>
                <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)', marginTop: 'var(--forge-spacing-xsmall)' }}>
                  <Input
                    id="template-tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Add a tag and press Enter"
                  />
                  <ForgeButton type="button" variant="outlined" onClick={handleAddTag}>
                    Add
                  </ForgeButton>
                </div>
                {newTemplate.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--forge-spacing-small)', marginTop: 'var(--forge-spacing-small)' }}>
                    {newTemplate.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        style={{
                          fontSize: '0.6875rem',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleRemoveTag(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkboxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-small)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-small)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newTemplate.requiresApproval}
                    onChange={(e) => setNewTemplate({ ...newTemplate, requiresApproval: e.target.checked })}
                  />
                  <span style={{ fontSize: 'var(--text-sm)' }}>Requires approval</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-small)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newTemplate.emailNotifications.notifyOnStart}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        emailNotifications: {
                          ...newTemplate.emailNotifications,
                          notifyOnStart: e.target.checked,
                        },
                      })
                    }
                  />
                  <span style={{ fontSize: 'var(--text-sm)' }}>Send email notification on step start</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-small)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newTemplate.emailNotifications.notifyOnComplete}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        emailNotifications: {
                          ...newTemplate.emailNotifications,
                          notifyOnComplete: e.target.checked,
                        },
                      })
                    }
                  />
                  <span style={{ fontSize: 'var(--text-sm)' }}>Send email notification on step completion</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-small)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newTemplate.emailNotifications.notifyAssignee}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        emailNotifications: {
                          ...newTemplate.emailNotifications,
                          notifyAssignee: e.target.checked,
                        },
                      })
                    }
                  />
                  <span style={{ fontSize: 'var(--text-sm)' }}>Notify assigned person</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 'var(--forge-spacing-medium)', justifyContent: 'flex-end', marginTop: 'var(--forge-spacing-medium)' }}>
                <ForgeButton variant="outlined" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </ForgeButton>
                <ForgeButton
                  onClick={handleCreateTemplate}
                  style={{
                    background: 'var(--brand-blue-dark)',
                    color: 'white',
                  }}
                >
                  Create Template
                </ForgeButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
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
              <Library className="h-8 w-8" style={{ color: 'var(--brand-blue-dark)' }} />
              <div>
                <div
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--forge-font-weight-medium)',
                  }}
                >
                  {allTemplates.length}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>Total Templates</div>
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
                  {workflowStepTemplates.length}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>Built-in Templates</div>
              </div>
            </div>
          </div>
        </ForgeCard>

        <ForgeCard>
          <div style={{ padding: 'var(--forge-spacing-medium)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-small)' }}>
              <Plus className="h-8 w-8" style={{ color: 'var(--brand-blue-medium)' }} />
              <div>
                <div
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--forge-font-weight-medium)',
                  }}
                >
                  {customTemplates.length}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>Custom Templates</div>
              </div>
            </div>
          </div>
        </ForgeCard>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: 'var(--forge-spacing-medium)' }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search step templates by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: 'calc(var(--forge-spacing-large) + 8px)' }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <ForgeButton
              key={category}
              variant={filterCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategory(category)}
              style={{
                background: filterCategory === category ? 'var(--brand-blue-dark)' : 'transparent',
                color: filterCategory === category ? 'white' : 'var(--foreground)',
                borderColor: filterCategory === category ? 'var(--brand-blue-dark)' : 'var(--border)',
              }}
            >
              {category}
              <Badge
                variant="secondary"
                className="ml-2"
                style={{
                  fontSize: '0.6875rem',
                  background: filterCategory === category ? 'rgba(255,255,255,0.2)' : 'var(--muted)',
                  color: filterCategory === category ? 'white' : 'var(--muted-foreground)',
                }}
              >
                {getCategoryCount(category)}
              </Badge>
            </ForgeButton>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const IconComponent = template.icon;
          const isTemplateBuiltIn = isBuiltIn(template.id);

          return (
            <ForgeCard
              key={template.id}
              style={{ boxShadow: 'var(--forge-elevation-1)' }}
            >
              <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-small)' }}>
                  <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--forge-spacing-small)' }}>
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent)', color: 'var(--brand-blue-dark)' }}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 'var(--forge-spacing-small)' }}>
                        <h3
                          className="font-medium"
                          style={{ fontSize: 'var(--text-sm)', lineHeight: '1.4' }}
                        >
                          {template.name}
                        </h3>
                        {!isTemplateBuiltIn && (
                          <div style={{ display: 'flex', gap: 'var(--forge-spacing-xsmall)' }}>
                            <ForgeButton
                              variant="flat"
                              size="sm"
                              style={{ padding: 'var(--forge-spacing-xsmall)' }}
                              onClick={() => {
                                setEditingTemplate(template);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </ForgeButton>
                            <ForgeButton
                              variant="flat"
                              size="sm"
                              style={{ padding: 'var(--forge-spacing-xsmall)', color: 'var(--destructive)' }}
                              onClick={() => {
                                if (onDeleteTemplate) {
                                  onDeleteTemplate(template.id);
                                  toast.success('Template deleted');
                                }
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </ForgeButton>
                          </div>
                        )}
                      </div>
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', lineHeight: '1.4', marginTop: 'var(--forge-spacing-xsmall)' }}
                      >
                        {template.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className={getCategoryColor(template.category)}
                      style={{ fontSize: '0.6875rem' }}
                    >
                      {template.category}
                    </Badge>
                    {isTemplateBuiltIn && (
                      <Badge variant="outline" style={{ fontSize: '0.6875rem', borderColor: 'var(--brand-olive-medium)', color: 'var(--brand-olive-dark)' }}>
                        Built-in
                      </Badge>
                    )}
                    <Badge variant="outline" style={{ fontSize: '0.6875rem' }}>
                      <Clock className="h-3 w-3 mr-1" />
                      {template.defaultDuration}
                    </Badge>
                    <Badge variant="outline" style={{ fontSize: '0.6875rem' }}>
                      <UserCheck className="h-3 w-3 mr-1" />
                      {template.defaultRole}
                    </Badge>
                    {template.requiresApproval && (
                      <Badge variant="outline" style={{ fontSize: '0.6875rem' }}>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Approval Required
                      </Badge>
                    )}
                  </div>

                  {template.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--forge-spacing-xsmall)' }}>
                      {template.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          style={{
                            fontSize: '0.625rem',
                            background: 'var(--muted)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 3 && (
                        <Badge
                          variant="secondary"
                          style={{
                            fontSize: '0.625rem',
                            background: 'var(--muted)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          +{template.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </ForgeCard>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div
          className="text-center py-12"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p style={{ fontSize: 'var(--text-base)' }}>No step templates found matching your search.</p>
          <p style={{ fontSize: 'var(--text-sm)', marginTop: '8px' }}>
            Try adjusting your search or create a new template.
          </p>
        </div>
      )}
    </div>
  );
}
