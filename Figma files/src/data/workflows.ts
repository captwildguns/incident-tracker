// Workflow data and workflow assignment logic

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  assignedRole: string;
  estimatedDuration: string;
  required: boolean;
  order: number;
  status?: 'Not Started' | 'In Progress' | 'Completed' | 'Pending Approval' | 'Approved' | 'Rejected';
  completedDate?: string;
  completedBy?: string;
  comments?: string;
  requiresApproval?: boolean;
  approvers?: string[];
  emailNotifications?: {
    notifyOnStart: boolean;
    notifyOnComplete: boolean;
    notifyAssignee: boolean;
    notifyApprovers: boolean;
    notifyGroups?: string[]; // Roles to notify
    additionalRecipients: string[]; // Email addresses for custom recipients
    emailTemplate?: string;
  };
  trigger?: {
    type: 'manual' | 'auto-complete' | 'time-delay' | 'status-change' | 'approval-granted' | 'conditional';
    delayAmount?: number;
    delayUnit?: 'minutes' | 'hours' | 'days';
    requiredStatus?: string;
    conditions?: {
      field: string;
      operator: string;
      value: string;
    }[];
  };
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  incidentTypes: string[];
  severityLevels: string[];
  steps: WorkflowStep[];
  isActive: boolean; // Template is active/enabled in system
  active?: boolean; // Instance is actively being worked on
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

// Pre-configured workflows for different incident types
// Every incident type defined in IncidentTypes.ts is covered by exactly one workflow below.
export const workflows: Workflow[] = [
  // ─────────────────────────────────────────────
  // AGGRESSION / VIOLENCE
  // ─────────────────────────────────────────────
  {
    id: 'WF-002',
    name: 'Physical Altercation Response',
    description: 'Workflow for handling physical altercations and threatening behavior between students requiring immediate intervention and parent notification',
    incidentTypes: ['Physical Altercation'],
    severityLevels: ['High'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-01-15',
    lastModified: '2026-05-19',
    steps: [
      {
        id: 'step-1',
        name: 'Immediate Driver Response',
        description: 'Safely stop bus, assess threat level, separate involved students, and contact dispatch/911 if there is imminent danger or a weapon',
        assignedRole: 'Driver',
        estimatedDuration: '15 minutes',
        required: true,
        order: 1,
        status: 'Completed',
        completedDate: '2025-03-14 7:50 AM',
        completedBy: 'Robert Martinez',
        comments: 'Bus stopped safely, students separated. No injuries observed.',
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Submit Incident Report',
        description: 'Driver submits the incident details — what occurred, injuries, and any threatening behavior — through the tablet app. Submitting the report notifies the safety coordinator.',
        assignedRole: 'Driver',
        estimatedDuration: '15 minutes',
        required: true,
        order: 2,
        status: 'In Progress',
        trigger: { type: 'manual' },
      },
      {
        id: 'step-3',
        name: 'Parent Notification',
        description: 'Contact parents of all students involved and explain incident',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '30 minutes',
        required: true,
        order: 3,
        status: 'Not Started',
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: false,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-4',
        name: 'Disciplinary Action Review',
        description: 'Administrator reviews incident and determines appropriate disciplinary measures',
        assignedRole: 'Administrator',
        estimatedDuration: '1 hour',
        required: true,
        order: 4,
        status: 'Not Started',
        requiresApproval: true,
        approvers: ['Administrator'],
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: false,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          notifyGroups: ['Safety Coordinator'],
          additionalRecipients: [],
          emailTemplate: 'Action Required',
        },
      },
      {
        id: 'step-5',
        name: 'Documentation & Close',
        description: 'Complete incident documentation and close case',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '20 minutes',
        required: true,
        order: 5,
        status: 'Not Started',
        trigger: { type: 'manual' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // BEHAVIORAL
  // ─────────────────────────────────────────────
  {
    id: 'WF-001',
    name: 'Disruptive Behavior Response',
    description: 'Workflow for all disruptive behavior incidents including offensive language, excessive noise, bullying, harassment, defiance toward the driver, and unauthorized device usage',
    incidentTypes: ['Disruptive Behavior'],
    severityLevels: ['Low'],
    isActive: true,
    createdBy: 'Jane Doe',
    createdDate: '2025-02-10',
    lastModified: '2026-05-19',
    steps: [
      {
        id: 'step-1',
        name: 'Driver Warning & Documentation',
        description: 'Driver issues warning, logs incident details, and contacts dispatch if situation cannot be de-escalated',
        assignedRole: 'Driver',
        estimatedDuration: '15 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Parent Notification',
        description: 'Notify parent/guardian of the incident and expected behavior standards',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '10 minutes',
        required: true,
        order: 2,
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: false,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-3',
        name: 'Close Incident',
        description: 'Review and close incident if no further action needed',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '5 minutes',
        required: true,
        order: 3,
        trigger: { type: 'manual' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SAFETY VIOLATIONS
  // ─────────────────────────────────────────────
  {
    id: 'WF-005',
    name: 'Safety Violation Response',
    description: 'Workflow for all student safety violations on the bus including seat/seatbelt refusal, unsafe movement, window misuse, emergency exit misuse, wrong stop exit, and eating/drinking',
    incidentTypes: ['Safety Violation'],
    severityLevels: ['Medium'],
    isActive: true,
    createdBy: 'Jane Doe',
    createdDate: '2025-02-01',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Immediate Safety Response',
        description: 'Driver addresses the safety issue, secures the situation, and documents the incident',
        assignedRole: 'Driver',
        estimatedDuration: '15 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Dispatch & Safety Coordinator Alert',
        description: 'For high-severity situations (emergency exit, wrong stop): notify dispatch and safety coordinator immediately',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '10 minutes',
        required: true,
        order: 2,
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: false,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-3',
        name: 'Parent Notification',
        description: 'Contact parent/guardian to inform them of the safety violation and reinforce bus safety expectations',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '15 minutes',
        required: true,
        order: 3,
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: false,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-4',
        name: 'Safety Review & Disciplinary Action',
        description: 'Review incident severity and history. Determine if disciplinary measures are warranted.',
        assignedRole: 'Administrator',
        estimatedDuration: '20 minutes',
        required: false,
        order: 4,
        requiresApproval: true,
        approvers: ['Administrator'],
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: false,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          notifyGroups: ['Safety Coordinator'],
          additionalRecipients: [],
          emailTemplate: 'Action Required',
        },
      },
      {
        id: 'step-5',
        name: 'Documentation & Close',
        description: 'Complete all documentation and close the incident',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '10 minutes',
        required: true,
        order: 5,
        trigger: { type: 'manual' },
      },
    ],
  },


  // ─────────────────────────────────────────────
  // PROPERTY DAMAGE
  // ─────────────────────────────────────────────
  {
    id: 'WF-004',
    name: 'Property Damage Investigation',
    description: 'Workflow for investigating and resolving vandalism and property damage incidents',
    incidentTypes: ['Property Damage'],
    severityLevels: ['Medium'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-02-15',
    lastModified: '2025-03-08',
    steps: [
      {
        id: 'step-1',
        name: 'Damage Assessment & Photo Documentation',
        description: 'Driver photographs damage',
        assignedRole: 'Driver',
        estimatedDuration: '15 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Fleet Manager Review',
        description: 'Fleet manager assesses damage and provides repair estimate',
        assignedRole: 'Fleet Manager',
        estimatedDuration: '30 minutes',
        required: true,
        order: 2,
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-3',
        name: 'Parent Notification & Restitution',
        description: 'Contact parents and discuss restitution for damages',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '45 minutes',
        required: true,
        order: 3,
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: false,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-4',
        name: 'Disciplinary Action',
        description: 'Implement disciplinary measures per district policy',
        assignedRole: 'School Principal',
        estimatedDuration: '20 minutes',
        required: true,
        order: 4,
        requiresApproval: true,
        approvers: ['Administrator'],
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: false,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          notifyGroups: ['Safety Coordinator'],
          additionalRecipients: [],
          emailTemplate: 'Action Required',
        },
      },
      {
        id: 'step-5',
        name: 'Repair Scheduling',
        description: 'Schedule and complete vehicle repairs',
        assignedRole: 'Fleet Manager',
        estimatedDuration: '2 hours',
        required: true,
        order: 5,
        trigger: { type: 'manual' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PROHIBITED ITEMS
  // ─────────────────────────────────────────────
  {
    id: 'WF-003',
    name: 'Prohibited Items Response',
    description: 'Workflow for handling possession of prohibited items including tobacco, harmful items, illegal substances, and inappropriate materials',
    incidentTypes: ['Weapon / Prohibited Items'],
    severityLevels: ['Critical'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-02-28',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Confiscation & Secure',
        description: 'Driver safely confiscates item (if possible) and secures it; do not handle weapons or suspected drugs directly—contact dispatch',
        assignedRole: 'Driver',
        estimatedDuration: '15 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Safety Coordinator & Administration Alert',
        description: 'Notify safety coordinator and school administration; for illegal substances or weapons, notify law enforcement',
        assignedRole: 'Driver',
        estimatedDuration: '15 minutes',
        required: true,
        order: 2,
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-3',
        name: 'Parent Notification',
        description: 'Contact parent/guardian to inform them of the prohibited item and policy violation',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '20 minutes',
        required: true,
        order: 3,
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: false,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-4',
        name: 'Disciplinary & Legal Action Review',
        description: 'Determine appropriate disciplinary action per district policy; coordinate with law enforcement if applicable',
        assignedRole: 'Administrator',
        estimatedDuration: '45 minutes',
        required: true,
        order: 4,
        requiresApproval: true,
        approvers: ['Administrator'],
        trigger: { type: 'manual' },
        emailNotifications: {
          notifyOnStart: false,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          notifyGroups: ['Safety Coordinator'],
          additionalRecipients: [],
          emailTemplate: 'Action Required',
        },
      },
      {
        id: 'step-5',
        name: 'Documentation & Close',
        description: 'Complete all documentation including evidence chain of custody if applicable, and close case',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '20 minutes',
        required: true,
        order: 5,
        trigger: { type: 'manual' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // INFORMATIONAL — WITNESS / BYSTANDER
  // ─────────────────────────────────────────────
  {
    id: 'WF-006',
    name: 'Witness / Bystander Statement',
    description: 'Non-disciplinary workflow for capturing the account of a student who witnessed or tried to help during another incident. No disciplinary action is taken; the statement is recorded and linked to the related incident.',
    incidentTypes: ['Witness / Bystander Statement'],
    severityLevels: ['Low'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2026-06-18',
    lastModified: '2026-06-18',
    steps: [
      {
        id: 'step-1',
        name: 'Record Witness Statement',
        description: 'Driver or staff records the witness/bystander account of what they saw or how they helped. No fault is assigned to this student.',
        assignedRole: 'Driver',
        estimatedDuration: '10 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Link to Related Incident',
        description: 'Safety coordinator reviews the statement and links it to the related disciplinary incident (e.g. the physical altercation) for context.',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '10 minutes',
        required: false,
        order: 2,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-3',
        name: 'File & Close',
        description: 'File the witness statement and close. No disciplinary measures or parent notification are required for the witness.',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '5 minutes',
        required: true,
        order: 3,
        trigger: { type: 'manual' },
      },
    ],
  },

];

// ─────────────────────────────────────────────
// WORKFLOW ASSIGNMENT & HELPER FUNCTIONS
// ─────────────────────────────────────────────

// Maps legacy/pre-consolidation incident type labels to the current 5 canonical types
const LEGACY_TYPE_MAP: Record<string, string> = {
  'Harassment / Bullying': 'Disruptive Behavior',
  'Offensive Language': 'Disruptive Behavior',
  'Excessive Noise / Disruption': 'Disruptive Behavior',
  'Defiance of Driver': 'Disruptive Behavior',
  'Unauthorized Device Usage': 'Disruptive Behavior',
  'Seat / Seatbelt Refusal': 'Safety Violation',
  'Unsafe Movement': 'Safety Violation',
  'Window Misuse': 'Safety Violation',
  'Emergency Exit Misuse': 'Safety Violation',
  'Wrong Stop Exit': 'Safety Violation',
  'Eating / Drinking': 'Safety Violation',
  'Physical Assault': 'Physical Altercation',
  'Fighting': 'Physical Altercation',
  'Throwing Objects': 'Physical Altercation',
  'Verbal Threats': 'Physical Altercation',
  'Vandalism': 'Property Damage',
  'Bus Damage': 'Property Damage',
  'Personal Property Damage': 'Property Damage',
  'Weapon Possession': 'Weapon / Prohibited Items',
  'Prohibited Items': 'Weapon / Prohibited Items',
  'Tobacco / Vaping': 'Weapon / Prohibited Items',
  'Illegal Substances': 'Weapon / Prohibited Items',
};

// Function to automatically assign workflow based on incident type and severity
export function assignWorkflowToIncident(incidentType: string, severity: string): Workflow | null {
  // Normalise severity to title-case so callers can pass "low", "Low", "LOW", etc.
  const normSeverity = severity.charAt(0).toUpperCase() + severity.slice(1).toLowerCase();

  // Normalise legacy type names to the current canonical 5
  const normType = LEGACY_TYPE_MAP[incidentType] ?? incidentType;

  // 1. Try exact match on type AND severity (ideal path)
  let matchingWorkflow = workflows.find(
    (workflow) =>
      workflow.isActive &&
      workflow.incidentTypes.includes(normType) &&
      workflow.severityLevels.includes(normSeverity)
  );

  // 2. If the severity didn't match but the type DID, still use that workflow.
  //    The workflow is determined by the incident type; severity is informational.
  if (!matchingWorkflow) {
    matchingWorkflow = workflows.find(
      (workflow) =>
        workflow.isActive &&
        workflow.incidentTypes.includes(normType)
    );
  }

  if (!matchingWorkflow) return null;

  return {
    ...matchingWorkflow,
    active: true,
    steps: matchingWorkflow.steps.map((step) => ({
      ...step,
      status: 'Not Started',
      completedDate: undefined,
      completedBy: undefined,
      comments: undefined,
    })),
  };
}

// Check if a workflow instance is currently active
export function isWorkflowActive(workflow: Workflow | null): boolean {
  if (!workflow) return false;
  
  // Check if explicitly set to active
  if (workflow.active !== undefined) {
    return workflow.active;
  }
  
  // Fallback: workflow is active if it has steps in progress or pending
  const hasActiveSteps = workflow.steps.some(
    (step) => step.status === 'In Progress' || step.status === 'Pending Approval'
  );
  
  // Not active if all steps are completed
  const allCompleted = workflow.steps.every((step) => step.status === 'Completed');
  
  return hasActiveSteps || !allCompleted;
}

// Mark workflow as completed (inactive)
export function completeWorkflow(workflow: Workflow): Workflow {
  return {
    ...workflow,
    active: false,
  };
}

// Get workflow progress percentage
export function getWorkflowProgress(steps: WorkflowStep[]): number {
  const completedSteps = steps.filter((step) => step.status === 'Completed').length;
  return Math.round((completedSteps / steps.length) * 100);
}

// Get current active step
export function getCurrentStep(steps: WorkflowStep[]): WorkflowStep | null {
  // Find first step that's not completed
  return steps.find((step) => step.status !== 'Completed') || null;
}

// Helper: get the workflow that covers a given incident type label
export function getWorkflowForIncidentType(incidentTypeLabel: string): Workflow | undefined {
  return workflows.find(
    (wf) => wf.incidentTypes.includes(incidentTypeLabel)
  );
}

// Helper: list all incident type labels that have NO dedicated workflow (should be empty if coverage is complete)
export function getUncoveredIncidentTypes(allTypeLabels: string[]): string[] {
  return allTypeLabels.filter(
    (label) => !workflows.some((wf) => wf.incidentTypes.includes(label))
  );
}
