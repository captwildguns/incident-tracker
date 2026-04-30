import React, { useState } from 'react';
import { ForgeCard } from '@tylertech/forge-react';
import { defineCardComponent, defineButtonComponent, defineTextFieldComponent } from '@tylertech/forge';
defineCardComponent();
import { ForgeButton } from '@tylertech/forge-react';
defineButtonComponent();
defineTextFieldComponent();
import { Badge } from '../ui/badge';
import { 
  Search, 
  Plus, 
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
  Archive
} from 'lucide-react';

export interface WorkflowStepTemplate {
  id: string;
  name: string;
  description: string;
  category: 'Communication' | 'Documentation' | 'Investigation' | 'Intervention' | 'Administrative' | 'Follow-up';
  icon: any;
  defaultRole: string;
  defaultDuration: string;
  requiresApproval: boolean;
  emailNotifications?: {
    notifyOnStart: boolean;
    notifyOnComplete: boolean;
    notifyAssignee: boolean;
  };
  tags: string[];
}

export const workflowStepTemplates: WorkflowStepTemplate[] = [
  // Communication Steps
  {
    id: 'comm-parent-initial',
    name: 'Initial Parent Contact',
    description: 'Contact parent/guardian to inform them of the incident',
    category: 'Communication',
    icon: Phone,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '30 minutes',
    requiresApproval: false,
    emailNotifications: {
      notifyOnStart: true,
      notifyOnComplete: true,
      notifyAssignee: true,
    },
    tags: ['parent', 'phone', 'notification', 'initial'],
  },
  {
    id: 'comm-parent-email',
    name: 'Send Parent Email Summary',
    description: 'Email detailed incident summary to parent/guardian',
    category: 'Communication',
    icon: Mail,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '15 minutes',
    requiresApproval: false,
    emailNotifications: {
      notifyOnStart: false,
      notifyOnComplete: true,
      notifyAssignee: true,
    },
    tags: ['parent', 'email', 'summary'],
  },
  {
    id: 'comm-driver-followup',
    name: 'Driver Follow-up',
    description: 'Follow up with driver for additional details or clarification',
    category: 'Communication',
    icon: MessageSquare,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '20 minutes',
    requiresApproval: false,
    tags: ['driver', 'follow-up', 'clarification'],
  },
  {
    id: 'comm-admin-notify',
    name: 'Notify Administration',
    description: 'Inform school administration of the incident',
    category: 'Communication',
    icon: Bell,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '15 minutes',
    requiresApproval: false,
    emailNotifications: {
      notifyOnStart: true,
      notifyOnComplete: false,
      notifyAssignee: true,
    },
    tags: ['administration', 'notification', 'school'],
  },
  {
    id: 'comm-parent-meeting',
    name: 'Schedule Parent Meeting',
    description: 'Arrange in-person or virtual meeting with parent/guardian',
    category: 'Communication',
    icon: Calendar,
    defaultRole: 'Administrator',
    defaultDuration: '1 hour',
    requiresApproval: false,
    tags: ['parent', 'meeting', 'conference'],
  },

  // Documentation Steps
  {
    id: 'doc-incident-report',
    name: 'Complete Incident Report',
    description: 'Fill out formal incident documentation with all details',
    category: 'Documentation',
    icon: FileText,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '30 minutes',
    requiresApproval: true,
    emailNotifications: {
      notifyOnStart: true,
      notifyOnComplete: true,
      notifyAssignee: true,
    },
    tags: ['report', 'documentation', 'formal'],
  },
  {
    id: 'doc-witness-statements',
    name: 'Collect Witness Statements',
    description: 'Gather written or verbal statements from witnesses',
    category: 'Documentation',
    icon: Users,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '45 minutes',
    requiresApproval: false,
    tags: ['witness', 'statements', 'evidence'],
  },
  {
    id: 'doc-photo-evidence',
    name: 'Document Photo/Video Evidence',
    description: 'Review and document any photo or video evidence',
    category: 'Documentation',
    icon: Video,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '20 minutes',
    requiresApproval: false,
    tags: ['video', 'photo', 'evidence', 'camera'],
  },
  {
    id: 'doc-medical-report',
    name: 'Obtain Medical Documentation',
    description: 'Collect medical reports if injuries were sustained',
    category: 'Documentation',
    icon: FileCheck,
    defaultRole: 'Nurse',
    defaultDuration: '30 minutes',
    requiresApproval: false,
    tags: ['medical', 'injury', 'health'],
  },

  // Investigation Steps
  {
    id: 'inv-review-video',
    name: 'Review Bus Camera Footage',
    description: 'Review video footage from bus cameras',
    category: 'Investigation',
    icon: Video,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '45 minutes',
    requiresApproval: false,
    tags: ['video', 'camera', 'footage', 'review'],
  },
  {
    id: 'inv-interview-student',
    name: 'Interview Student',
    description: 'Conduct formal interview with student involved',
    category: 'Investigation',
    icon: UserCheck,
    defaultRole: 'Administrator',
    defaultDuration: '30 minutes',
    requiresApproval: false,
    tags: ['student', 'interview', 'investigation'],
  },
  {
    id: 'inv-interview-witnesses',
    name: 'Interview Witnesses',
    description: 'Interview other students or staff who witnessed the incident',
    category: 'Investigation',
    icon: Users,
    defaultRole: 'Administrator',
    defaultDuration: '1 hour',
    requiresApproval: false,
    tags: ['witness', 'interview', 'investigation'],
  },
  {
    id: 'inv-incident-history',
    name: 'Review Student Incident History',
    description: 'Review student\'s previous incident reports and patterns',
    category: 'Investigation',
    icon: Archive,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '20 minutes',
    requiresApproval: false,
    tags: ['history', 'pattern', 'review', 'records'],
  },

  // Intervention Steps
  {
    id: 'int-behavior-plan',
    name: 'Create Behavior Intervention Plan',
    description: 'Develop individualized behavior intervention plan',
    category: 'Intervention',
    icon: ClipboardCheck,
    defaultRole: 'Administrator',
    defaultDuration: '2 hours',
    requiresApproval: true,
    emailNotifications: {
      notifyOnStart: true,
      notifyOnComplete: true,
      notifyAssignee: true,
    },
    tags: ['behavior', 'intervention', 'plan', 'support'],
  },
  {
    id: 'int-seating-assign',
    name: 'Assign Specific Seat',
    description: 'Assign student to specific seat on bus',
    category: 'Intervention',
    icon: Settings,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '10 minutes',
    requiresApproval: false,
    tags: ['seating', 'assignment', 'placement'],
  },
  {
    id: 'int-bus-monitor',
    name: 'Assign Bus Monitor',
    description: 'Assign additional bus monitor for supervision',
    category: 'Intervention',
    icon: UserPlus,
    defaultRole: 'Fleet Manager',
    defaultDuration: '30 minutes',
    requiresApproval: true,
    tags: ['monitor', 'supervision', 'support'],
  },
  {
    id: 'int-suspension',
    name: 'Implement Bus Suspension',
    description: 'Suspend student from bus transportation',
    category: 'Intervention',
    icon: Ban,
    defaultRole: 'Administrator',
    defaultDuration: '1 hour',
    requiresApproval: true,
    emailNotifications: {
      notifyOnStart: true,
      notifyOnComplete: true,
      notifyAssignee: true,
    },
    tags: ['suspension', 'discipline', 'consequence'],
  },
  {
    id: 'int-counseling',
    name: 'Refer to Counseling',
    description: 'Refer student to school counselor or social worker',
    category: 'Intervention',
    icon: UserCheck,
    defaultRole: 'Administrator',
    defaultDuration: '20 minutes',
    requiresApproval: false,
    tags: ['counseling', 'support', 'mental-health'],
  },
  {
    id: 'int-parent-transport',
    name: 'Require Parent Transportation',
    description: 'Require parent to provide transportation temporarily',
    category: 'Intervention',
    icon: Users,
    defaultRole: 'Administrator',
    defaultDuration: '30 minutes',
    requiresApproval: true,
    tags: ['parent', 'transportation', 'alternative'],
  },

  // Administrative Steps
  {
    id: 'admin-legal-review',
    name: 'Legal/Compliance Review',
    description: 'Review incident for legal or compliance implications',
    category: 'Administrative',
    icon: Shield,
    defaultRole: 'Administrator',
    defaultDuration: '1 hour',
    requiresApproval: true,
    tags: ['legal', 'compliance', 'risk'],
  },
  {
    id: 'admin-board-notify',
    name: 'Notify School Board',
    description: 'Inform school board of serious incident',
    category: 'Administrative',
    icon: Bell,
    defaultRole: 'Administrator',
    defaultDuration: '30 minutes',
    requiresApproval: true,
    emailNotifications: {
      notifyOnStart: true,
      notifyOnComplete: false,
      notifyAssignee: true,
    },
    tags: ['board', 'notification', 'serious'],
  },
  {
    id: 'admin-insurance-claim',
    name: 'File Insurance Claim',
    description: 'Submit insurance claim if property damage or injury occurred',
    category: 'Administrative',
    icon: FileText,
    defaultRole: 'Fleet Manager',
    defaultDuration: '2 hours',
    requiresApproval: true,
    tags: ['insurance', 'claim', 'damage'],
  },
  {
    id: 'admin-police-report',
    name: 'File Police Report',
    description: 'File official police report for criminal incidents',
    category: 'Administrative',
    icon: Shield,
    defaultRole: 'Administrator',
    defaultDuration: '1 hour',
    requiresApproval: true,
    emailNotifications: {
      notifyOnStart: true,
      notifyOnComplete: true,
      notifyAssignee: true,
    },
    tags: ['police', 'law-enforcement', 'criminal'],
  },

  // Follow-up Steps
  {
    id: 'follow-check-in',
    name: '1-Week Check-in',
    description: 'Follow up with student and driver after 1 week',
    category: 'Follow-up',
    icon: Clock,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '20 minutes',
    requiresApproval: false,
    tags: ['follow-up', 'check-in', 'monitoring'],
  },
  {
    id: 'follow-behavior-review',
    name: 'Review Behavior Progress',
    description: 'Review student behavior improvements or concerns',
    category: 'Follow-up',
    icon: CheckCircle,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '30 minutes',
    requiresApproval: false,
    tags: ['behavior', 'progress', 'review'],
  },
  {
    id: 'follow-parent-update',
    name: 'Parent Progress Update',
    description: 'Update parent on student progress and next steps',
    category: 'Follow-up',
    icon: Mail,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '15 minutes',
    requiresApproval: false,
    tags: ['parent', 'update', 'progress'],
  },
  {
    id: 'follow-plan-review',
    name: 'Review Intervention Plan',
    description: 'Review and adjust intervention plan as needed',
    category: 'Follow-up',
    icon: ClipboardCheck,
    defaultRole: 'Administrator',
    defaultDuration: '45 minutes',
    requiresApproval: false,
    tags: ['plan', 'review', 'adjustment'],
  },
  {
    id: 'follow-close-incident',
    name: 'Close Incident',
    description: 'Finalize and close the incident after resolution',
    category: 'Follow-up',
    icon: CheckCircle,
    defaultRole: 'Safety Coordinator',
    defaultDuration: '10 minutes',
    requiresApproval: true,
    emailNotifications: {
      notifyOnStart: false,
      notifyOnComplete: true,
      notifyAssignee: true,
    },
    tags: ['close', 'complete', 'resolution'],
  },
];

interface WorkflowStepLibraryProps {
  onAddStep: (template: WorkflowStepTemplate) => void;
  selectedCategory?: string;
  addedTemplateIds?: string[]; // Track which templates have been added
}

export function WorkflowStepLibrary({ onAddStep, selectedCategory, addedTemplateIds = [] }: WorkflowStepLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>(selectedCategory || 'All');

  const categories = ['All', 'Communication', 'Documentation', 'Investigation', 'Intervention', 'Administrative', 'Follow-up'];

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
    if (category === 'All') return workflowStepTemplates.length;
    return workflowStepTemplates.filter(t => t.category === category).length;
  };

  const filteredTemplates = workflowStepTemplates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = filterCategory === 'All' || template.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search Bar */}
      <div style={{ marginBottom: 'var(--forge-spacing-medium)' }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {/* @ts-ignore */}
          <forge-text-field>
            <input
              type="text"
              placeholder="Search workflow steps by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2rem' }}
            />
          </forge-text-field>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: 'var(--forge-spacing-medium)' }}>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              style={{
                padding: 'var(--forge-spacing-xsmall) var(--forge-spacing-medium)',
                borderRadius: 'var(--forge-radius-full, 9999px)',
                border: '1px solid',
                background: filterCategory === category ? 'var(--brand-blue-dark)' : 'transparent',
                color: filterCategory === category ? 'white' : 'var(--foreground)',
                borderColor: filterCategory === category ? 'var(--brand-blue-dark)' : 'var(--border)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--forge-font-family)',
                cursor: 'pointer',
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Step Library Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((template) => {
          const isAdded = addedTemplateIds.includes(template.id);
          return (
            <div
              key={template.id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--forge-radius-medium)',
                padding: 'var(--forge-spacing-medium)',
                background: 'var(--card)',
                fontFamily: 'var(--forge-font-family)',
              }}
            >
              <h3
                style={{
                  fontWeight: 'var(--forge-font-weight-medium)',
                  fontSize: 'var(--text-sm)',
                  marginBottom: 'var(--forge-spacing-xsmall)',
                  color: 'var(--card-foreground)',
                }}
              >
                {template.name}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                  marginBottom: 'var(--forge-spacing-medium)',
                  lineHeight: '1.4',
                }}
              >
                {template.description}
              </p>
              <button
                onClick={() => !isAdded && onAddStep(template)}
                disabled={isAdded}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: 'var(--forge-spacing-xsmall) var(--forge-spacing-medium)',
                  borderRadius: 'var(--forge-radius-medium)',
                  border: '1px solid',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--forge-font-family)',
                  cursor: isAdded ? 'default' : 'pointer',
                  background: isAdded ? 'var(--brand-blue-dark)' : 'transparent',
                  color: isAdded ? 'white' : 'var(--brand-blue-dark)',
                  borderColor: isAdded ? 'var(--brand-blue-dark)' : 'var(--brand-blue-medium)',
                  opacity: isAdded ? 0.8 : 1,
                }}
              >
                {isAdded ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Added to Workflow
                  </>
                ) : (
                  <>
                    <Plus className="h-3 w-3" />
                    Add to Workflow
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div 
          className="text-center py-12" 
          style={{ color: 'var(--muted-foreground)' }}
        >
          <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p style={{ fontSize: 'var(--text-base)' }}>
            No workflow steps found matching your search.
          </p>
          <p style={{ fontSize: 'var(--text-sm)', marginTop: '8px' }}>
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}