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
    notifyRoles?: string[]; // Roles to notify
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
    id: 'WF-001',
    name: 'Physical Altercation Response',
    description: 'Workflow for handling physical altercations between students requiring immediate intervention and parent notification',
    incidentTypes: ['Physical Altercation', 'Physical Assault', 'Throwing Objects'],
    severityLevels: ['High'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-01-15',
    lastModified: '2025-03-10',
    steps: [
      {
        id: 'step-1',
        name: 'Immediate Driver Response',
        description: 'Driver must safely stop bus and separate students involved in altercation',
        assignedRole: 'Driver',
        estimatedDuration: '5 minutes',
        required: true,
        order: 1,
        status: 'Completed',
        completedDate: '2025-03-14 7:50 AM',
        completedBy: 'Robert Martinez',
        comments: 'Bus stopped safely, students separated. No injuries observed.',
        trigger: {
          type: 'manual',
        },
      },
      {
        id: 'step-2',
        name: 'Safety Coordinator Notification',
        description: 'Notify safety coordinator of incident details and student injuries if any',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '15 minutes',
        required: true,
        order: 2,
        status: 'In Progress',
        trigger: {
          type: 'auto-complete',
        },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
          emailTemplate: 'Urgent Action Required',
        },
      },
      {
        id: 'step-3',
        name: 'Parent Notification - Both Students',
        description: 'Contact parents of all students involved and explain incident',
        assignedRole: 'School Principal',
        estimatedDuration: '30 minutes',
        required: true,
        order: 3,
        status: 'Not Started',
        trigger: {
          type: 'auto-complete',
        },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: false,
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
        approvers: ['Administrator', 'District Superintendent'],
        trigger: {
          type: 'time-delay',
          delayAmount: 2,
          delayUnit: 'hours',
        },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          additionalRecipients: [],
          emailTemplate: 'Approval Request',
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
        trigger: {
          type: 'approval-granted',
        },
      },
    ],
  },
  {
    id: 'WF-008',
    name: 'Threatening Behavior Protocol',
    description: 'Workflow for assessing and responding to threatening behavior from a student',
    incidentTypes: ['Threatening Behavior'],
    severityLevels: ['High'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-02-20',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Immediate Threat Assessment',
        description: 'Driver assesses immediate danger level; if weapon or imminent harm, contact dispatch/911',
        assignedRole: 'Driver',
        estimatedDuration: '5 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Separate & Secure',
        description: 'Isolate the threatening student from other passengers and ensure all students are safe',
        assignedRole: 'Driver',
        estimatedDuration: '10 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
      },
      {
        id: 'step-3',
        name: 'Safety Coordinator Notification',
        description: 'Notify safety coordinator with full details of threatening behavior and any witnesses',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '15 minutes',
        required: true,
        order: 3,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
          emailTemplate: 'Urgent Action Required',
        },
      },
      {
        id: 'step-4',
        name: 'Parent & School Notification',
        description: 'Contact parents of involved students and notify school administration',
        assignedRole: 'School Principal',
        estimatedDuration: '30 minutes',
        required: true,
        order: 4,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: false,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-5',
        name: 'Behavioral Intervention & Disciplinary Review',
        description: 'Determine disciplinary action, potential bus suspension, and behavioral intervention plan',
        assignedRole: 'Administrator',
        estimatedDuration: '1 hour',
        required: true,
        order: 5,
        requiresApproval: true,
        approvers: ['Administrator'],
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          additionalRecipients: [],
          emailTemplate: 'Approval Request',
        },
      },
      {
        id: 'step-6',
        name: 'Documentation & Close',
        description: 'Finalize incident report, file documentation, and close case',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '15 minutes',
        required: true,
        order: 6,
        trigger: { type: 'approval-granted' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // BEHAVIORAL
  // ─────────────────────────────────────────────
  {
    id: 'WF-002',
    name: 'Bullying & Harassment Investigation',
    description: 'Comprehensive workflow for investigating and resolving bullying, taunting, harassment, and unwanted contact incidents',
    incidentTypes: ['Taunting/Bullying', 'Student Harassment', 'Unwanted Physical Contact'],
    severityLevels: ['High', 'Medium'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-01-20',
    lastModified: '2025-03-12',
    steps: [
      {
        id: 'step-1',
        name: 'Initial Report Documentation',
        description: 'Driver documents incident details, witness information, and immediate actions taken',
        assignedRole: 'Driver',
        estimatedDuration: '15 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Victim Support & Assessment',
        description: 'School counselor or nurse meets with victim to assess emotional and physical impact',
        assignedRole: 'Nurse',
        estimatedDuration: '30 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
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
        name: 'Witness Interviews',
        description: 'Conduct interviews with other students who witnessed the incident',
        assignedRole: 'School Principal',
        estimatedDuration: '45 minutes',
        required: true,
        order: 3,
        trigger: { type: 'time-delay', delayAmount: 1, delayUnit: 'hours' },
      },
      {
        id: 'step-4',
        name: 'Parent Notification',
        description: 'Contact parents of both victim and aggressor',
        assignedRole: 'School Principal',
        estimatedDuration: '30 minutes',
        required: true,
        order: 4,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: false,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: ['counselor@district.edu'],
        },
      },
      {
        id: 'step-5',
        name: 'Intervention Plan Development',
        description: 'Create behavior intervention plan and seating arrangements',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '1 hour',
        required: true,
        order: 5,
        requiresApproval: true,
        approvers: ['School Principal', 'Administrator'],
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          additionalRecipients: [],
          emailTemplate: 'Approval Request',
        },
      },
      {
        id: 'step-6',
        name: '30-Day Follow-up',
        description: 'Check in with victim and monitor aggressor behavior',
        assignedRole: 'Nurse',
        estimatedDuration: '20 minutes',
        required: false,
        order: 6,
        trigger: { type: 'time-delay', delayAmount: 30, delayUnit: 'days' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: false,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
    ],
  },
  {
    id: 'WF-004',
    name: 'Offensive Language Protocol',
    description: 'Workflow for addressing inappropriate language and profanity incidents',
    incidentTypes: ['Offensive Language'],
    severityLevels: ['Medium', 'High'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-02-05',
    lastModified: '2025-03-05',
    steps: [
      {
        id: 'step-1',
        name: 'Immediate Documentation',
        description: 'Driver documents exact language used and context',
        assignedRole: 'Driver',
        estimatedDuration: '10 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Principal Review',
        description: 'School principal reviews incident severity and determines appropriate response',
        assignedRole: 'School Principal',
        estimatedDuration: '20 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
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
        name: 'Parent Conference',
        description: 'Schedule and conduct parent conference to address behavior',
        assignedRole: 'School Principal',
        estimatedDuration: '30 minutes',
        required: true,
        order: 3,
        trigger: { type: 'time-delay', delayAmount: 24, delayUnit: 'hours' },
      },
      {
        id: 'step-4',
        name: 'Disciplinary Action',
        description: 'Implement appropriate disciplinary measures per district policy',
        assignedRole: 'Administrator',
        estimatedDuration: '15 minutes',
        required: true,
        order: 4,
        requiresApproval: true,
        approvers: ['Administrator'],
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          additionalRecipients: [],
          emailTemplate: 'Approval Request',
        },
      },
    ],
  },
  {
    id: 'WF-005',
    name: 'Disruptive Behavior - Minor',
    description: 'Quick resolution workflow for minor disruptive behaviors like loud music, yelling, or inappropriate affection',
    incidentTypes: ['Disruptive Volume', 'Inappropriate Affection'],
    severityLevels: ['Low', 'Medium'],
    isActive: true,
    createdBy: 'Jane Doe',
    createdDate: '2025-02-10',
    lastModified: '2025-02-28',
    steps: [
      {
        id: 'step-1',
        name: 'Driver Warning & Documentation',
        description: 'Driver issues warning and logs incident',
        assignedRole: 'Driver',
        estimatedDuration: '5 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Automated Parent Notification',
        description: 'System sends automated email/text to parent',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '5 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: false,
          notifyOnComplete: false,
          notifyAssignee: false,
          notifyApprovers: false,
          additionalRecipients: [],
          emailTemplate: 'Default Notification',
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
        trigger: { type: 'time-delay', delayAmount: 2, delayUnit: 'days' },
      },
    ],
  },
  {
    id: 'WF-014',
    name: 'Repeated Misconduct Escalation',
    description: 'Escalation workflow for students with repeated behavioral violations requiring progressive discipline',
    incidentTypes: ['Repeated Misconduct'],
    severityLevels: ['High'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-02-25',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Compile Incident History',
        description: 'Pull all prior incident records for this student and summarize pattern of behavior',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '20 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Administrator Review',
        description: 'Administrator reviews full history and current incident to determine escalation level',
        assignedRole: 'Administrator',
        estimatedDuration: '30 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
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
        name: 'Parent Conference & Written Warning',
        description: 'Schedule mandatory parent conference and issue formal written warning',
        assignedRole: 'School Principal',
        estimatedDuration: '45 minutes',
        required: true,
        order: 3,
        trigger: { type: 'auto-complete' },
      },
      {
        id: 'step-4',
        name: 'Progressive Discipline Decision',
        description: 'Determine progressive discipline action: bus suspension, reassignment, or other measures',
        assignedRole: 'Administrator',
        estimatedDuration: '30 minutes',
        required: true,
        order: 4,
        requiresApproval: true,
        approvers: ['Administrator', 'District Superintendent'],
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          additionalRecipients: [],
          emailTemplate: 'Approval Request',
        },
      },
      {
        id: 'step-5',
        name: 'Behavior Plan & Monitoring',
        description: 'Create formal behavior improvement plan with monitoring schedule and close case',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '30 minutes',
        required: true,
        order: 5,
        trigger: { type: 'approval-granted' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SAFETY VIOLATIONS
  // ─────────────────────────────────────────────
  {
    id: 'WF-003',
    name: 'Seat & Seatbelt Compliance',
    description: 'Workflow for handling seat refusal, seatbelt refusal, and unsafe movement on the bus',
    incidentTypes: ['Seat Refusal', 'Seatbelt Refusal', 'Unsafe Movement', 'Window Misuse'],
    severityLevels: ['Low', 'Medium', 'High'],
    isActive: true,
    createdBy: 'Jane Doe',
    createdDate: '2025-02-01',
    lastModified: '2025-03-01',
    steps: [
      {
        id: 'step-1',
        name: 'Driver Verbal Warning',
        description: 'Driver issues verbal warning, re-seats student if needed, and documents incident',
        assignedRole: 'Driver',
        estimatedDuration: '5 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Parent Notification',
        description: 'Send automated notification to parent about safety compliance issue',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '10 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: false,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
          emailTemplate: 'Default Notification',
        },
      },
      {
        id: 'step-3',
        name: 'Escalation Review (if repeated)',
        description: 'Review student history and escalate if this is a repeat offense',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '15 minutes',
        required: false,
        order: 3,
        trigger: {
          type: 'conditional',
          conditions: [
            { field: 'repeatOffense', operator: 'equals', value: 'true' },
          ],
        },
      },
    ],
  },
  {
    id: 'WF-009',
    name: 'Emergency Safety Response',
    description: 'Workflow for high-risk safety violations including emergency exit misuse and wrong stop exit',
    incidentTypes: ['Emergency Exit Misuse', 'Wrong Stop Exit'],
    severityLevels: ['Medium', 'High'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-02-22',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Immediate Safety Response',
        description: 'Driver secures the bus, accounts for all students, and ensures no one is in danger',
        assignedRole: 'Driver',
        estimatedDuration: '10 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Dispatch & Safety Coordinator Alert',
        description: 'Notify dispatch and safety coordinator immediately; request assistance if student left the bus at wrong location',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '10 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: ['dispatch@district.edu'],
          emailTemplate: 'Urgent Action Required',
        },
      },
      {
        id: 'step-3',
        name: 'Parent Notification',
        description: 'Contact parent/guardian immediately to inform them of the safety incident',
        assignedRole: 'School Principal',
        estimatedDuration: '15 minutes',
        required: true,
        order: 3,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: false,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-4',
        name: 'Safety Review & Disciplinary Action',
        description: 'Review incident for safety protocol improvements and determine disciplinary measures',
        assignedRole: 'Administrator',
        estimatedDuration: '30 minutes',
        required: true,
        order: 4,
        requiresApproval: true,
        approvers: ['Administrator'],
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          additionalRecipients: [],
          emailTemplate: 'Approval Request',
        },
      },
      {
        id: 'step-5',
        name: 'Documentation & Close',
        description: 'Complete all documentation and close the incident',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '15 minutes',
        required: true,
        order: 5,
        trigger: { type: 'approval-granted' },
      },
    ],
  },
  {
    id: 'WF-007',
    name: 'Food & Beverage Violation',
    description: 'Simple workflow for handling eating/drinking violations on buses',
    incidentTypes: ['Eating/Drinking Violation'],
    severityLevels: ['Low', 'Medium'],
    isActive: true,
    createdBy: 'Jane Doe',
    createdDate: '2025-02-20',
    lastModified: '2025-02-25',
    steps: [
      {
        id: 'step-1',
        name: 'Driver Warning & Cleanup',
        description: 'Driver issues warning and has student clean up mess if applicable',
        assignedRole: 'Driver',
        estimatedDuration: '10 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Parent Notification',
        description: 'Send notification to parent about bus rules',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '5 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: false,
          notifyOnComplete: false,
          notifyAssignee: false,
          notifyApprovers: false,
          additionalRecipients: [],
          emailTemplate: 'Default Notification',
        },
      },
      {
        id: 'step-3',
        name: 'Review & Close',
        description: 'Safety coordinator reviews and closes incident',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '5 minutes',
        required: true,
        order: 3,
        trigger: { type: 'time-delay', delayAmount: 24, delayUnit: 'hours' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // DRIVER DEFIANCE (student toward driver)
  // ─────────────────────────────────────────────
  {
    id: 'WF-010',
    name: 'Driver Defiance & Harassment Protocol',
    description: 'Workflow for student defiance, harassment, or threats directed at the bus driver',
    incidentTypes: ['Driver Defiance', 'Driver Harassment', 'Driver Threat', 'Verbal Abuse toward Driver'],
    severityLevels: ['Medium', 'High'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-02-25',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Driver Documentation & De-escalation',
        description: 'Driver documents the incident, uses de-escalation techniques, and contacts dispatch if needed',
        assignedRole: 'Driver',
        estimatedDuration: '10 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Safety Coordinator Review',
        description: 'Safety coordinator reviews incident details, assesses severity, and determines next steps',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '20 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
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
        name: 'Parent & Principal Notification',
        description: 'Contact parent/guardian and school principal to discuss student behavior toward driver',
        assignedRole: 'School Principal',
        estimatedDuration: '30 minutes',
        required: true,
        order: 3,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: false,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-4',
        name: 'Disciplinary Action & Bus Privilege Review',
        description: 'Determine disciplinary action, potential bus suspension, or route reassignment',
        assignedRole: 'Administrator',
        estimatedDuration: '30 minutes',
        required: true,
        order: 4,
        requiresApproval: true,
        approvers: ['Administrator'],
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          additionalRecipients: [],
          emailTemplate: 'Approval Request',
        },
      },
      {
        id: 'step-5',
        name: 'Driver Follow-up & Close',
        description: 'Follow up with driver to ensure they feel supported, document resolution, and close case',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '15 minutes',
        required: true,
        order: 5,
        trigger: { type: 'approval-granted' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PROPERTY DAMAGE
  // ─────────────────────────────────────────────
  {
    id: 'WF-006',
    name: 'Property Damage Investigation',
    description: 'Workflow for investigating and resolving vandalism and property damage incidents',
    incidentTypes: ['Vandalism'],
    severityLevels: ['Medium', 'High'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-02-15',
    lastModified: '2025-03-08',
    steps: [
      {
        id: 'step-1',
        name: 'Damage Assessment & Photo Documentation',
        description: 'Driver photographs damage and estimates repair cost',
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
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: ['maintenance@district.edu'],
        },
      },
      {
        id: 'step-3',
        name: 'Parent Notification & Restitution',
        description: 'Contact parents and discuss restitution for damages',
        assignedRole: 'Administrator',
        estimatedDuration: '45 minutes',
        required: true,
        order: 3,
        trigger: { type: 'auto-complete' },
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
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          additionalRecipients: [],
          emailTemplate: 'Approval Request',
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
        trigger: { type: 'approval-granted' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PROHIBITED ITEMS
  // ─────────────────────────────────────────────
  {
    id: 'WF-011',
    name: 'Prohibited Items Response',
    description: 'Workflow for handling possession of prohibited items including tobacco, harmful items, illegal substances, and inappropriate materials',
    incidentTypes: ['Tobacco/Vaping', 'Harmful Items', 'Illegal Substances', 'Inappropriate Material', 'Weapon Possession'],
    severityLevels: ['Medium', 'High'],
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
        estimatedDuration: '10 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Safety Coordinator & Administration Alert',
        description: 'Notify safety coordinator and school administration; for illegal substances or weapons, notify law enforcement',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '15 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
          emailTemplate: 'Urgent Action Required',
        },
      },
      {
        id: 'step-3',
        name: 'Parent Notification',
        description: 'Contact parent/guardian to inform them of the prohibited item and policy violation',
        assignedRole: 'School Principal',
        estimatedDuration: '20 minutes',
        required: true,
        order: 3,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: false,
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
        approvers: ['Administrator', 'District Superintendent'],
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          additionalRecipients: [],
          emailTemplate: 'Approval Request',
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
        trigger: { type: 'approval-granted' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PRIVACY VIOLATION
  // ─────────────────────────────────────────────
  {
    id: 'WF-012',
    name: 'Privacy Violation Response',
    description: 'Workflow for handling unauthorized recording or photography on the bus',
    incidentTypes: ['Unauthorized Recording'],
    severityLevels: ['Medium', 'High'],
    isActive: true,
    createdBy: 'Jane Doe',
    createdDate: '2025-03-01',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Immediate Intervention',
        description: 'Driver instructs student to stop recording immediately and documents the incident',
        assignedRole: 'Driver',
        estimatedDuration: '5 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Safety Coordinator Review',
        description: 'Review what was recorded, assess privacy impact, and determine if content was shared online',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '30 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
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
        name: 'Parent Notification & Content Removal',
        description: 'Contact parent/guardian; request deletion of any recordings and removal from social media if shared',
        assignedRole: 'School Principal',
        estimatedDuration: '30 minutes',
        required: true,
        order: 3,
        trigger: { type: 'auto-complete' },
      },
      {
        id: 'step-4',
        name: 'Disciplinary Action & Close',
        description: 'Implement disciplinary measures per district privacy policy and close case',
        assignedRole: 'Administrator',
        estimatedDuration: '20 minutes',
        required: true,
        order: 4,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // DRIVER OPERATIONAL
  // ─────────────────────────────────────────────
  {
    id: 'WF-015',
    name: 'Driver Operational Review',
    description: 'Workflow for reviewing and resolving driver operational incidents such as late arrivals, route deviations, missed stops, policy violations, and communication issues',
    incidentTypes: ['Late Arrival', 'Route Deviation', 'Missed Stop', 'Policy Violation', 'Communication Issue'],
    severityLevels: ['Low', 'Medium'],
    isActive: true,
    createdBy: 'Jane Doe',
    createdDate: '2025-03-05',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Incident Documentation',
        description: 'Document the operational incident including time, location, affected routes, and number of students impacted',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '15 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Driver Statement & Review',
        description: 'Obtain driver statement and review GPS/route data to verify the incident details',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '20 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
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
        name: 'Supervisor Review & Corrective Action',
        description: 'Transportation supervisor reviews incident and determines if corrective action, retraining, or disciplinary measures are needed',
        assignedRole: 'Administrator',
        estimatedDuration: '30 minutes',
        required: true,
        order: 3,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-4',
        name: 'Documentation & Close',
        description: 'Record corrective action taken, update driver file if needed, and close incident',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '10 minutes',
        required: true,
        order: 4,
        trigger: { type: 'auto-complete' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // DRIVER SAFETY
  // ─────────────────────────────────────────────
  {
    id: 'WF-016',
    name: 'Driver Safety Investigation',
    description: 'Workflow for investigating serious driver safety violations including unsafe driving, distracted driving, equipment violations, and loading/unloading safety issues',
    incidentTypes: ['Unsafe Driving', 'Distracted Driving', 'Equipment Safety Violation', 'Loading/Unloading Safety Issue'],
    severityLevels: ['Medium', 'High'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-03-05',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Immediate Safety Assessment',
        description: 'Assess if the driver should be immediately removed from route; pull driver from service if safety risk is ongoing',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '15 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Evidence Collection & Driver Statement',
        description: 'Collect dashcam footage, GPS data, witness statements, and obtain the driver written statement',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '45 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
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
        name: 'Formal Investigation Review',
        description: 'Transportation director conducts formal review of all evidence and determines findings',
        assignedRole: 'Administrator',
        estimatedDuration: '1 hour',
        required: true,
        order: 3,
        requiresApproval: true,
        approvers: ['Administrator'],
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          additionalRecipients: [],
          emailTemplate: 'Approval Request',
        },
      },
      {
        id: 'step-4',
        name: 'Corrective Action & Retraining',
        description: 'Implement corrective action: written warning, mandatory retraining, suspension, or termination per policy',
        assignedRole: 'Administrator',
        estimatedDuration: '30 minutes',
        required: true,
        order: 4,
        trigger: { type: 'approval-granted' },
      },
      {
        id: 'step-5',
        name: 'Documentation & Close',
        description: 'Update driver personnel file, complete all documentation, and close investigation',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '20 minutes',
        required: true,
        order: 5,
        trigger: { type: 'auto-complete' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // VEHICLE INCIDENTS
  // ─────────────────────────────────────────────
  {
    id: 'WF-017',
    name: 'Vehicle Accident Response',
    description: 'Comprehensive workflow for major vehicle accidents and collisions with other vehicles',
    incidentTypes: ['Vehicle Accident', 'Collision with Vehicle'],
    severityLevels: ['High'],
    isActive: true,
    createdBy: 'Sarah Williams',
    createdDate: '2025-03-08',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Emergency Response & Student Safety',
        description: 'Ensure all students are safe; call 911 if injuries; do not move the vehicle unless directed by emergency services',
        assignedRole: 'Driver',
        estimatedDuration: '15 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Dispatch & Administration Notification',
        description: 'Notify dispatch, safety coordinator, and administration immediately with location and status',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '10 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: ['dispatch@district.edu', 'fleet@district.edu'],
          emailTemplate: 'Urgent Action Required',
        },
      },
      {
        id: 'step-3',
        name: 'Parent Notification (All Students)',
        description: 'Contact parents/guardians of ALL students on the bus at the time of the accident',
        assignedRole: 'School Principal',
        estimatedDuration: '1 hour',
        required: true,
        order: 3,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: false,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: [],
        },
      },
      {
        id: 'step-4',
        name: 'Police Report & Insurance Documentation',
        description: 'Obtain police report, file insurance claim, photograph all damage, and collect witness information',
        assignedRole: 'Fleet Manager',
        estimatedDuration: '2 hours',
        required: true,
        order: 4,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: ['insurance@district.edu'],
        },
      },
      {
        id: 'step-5',
        name: 'Post-Accident Driver Review',
        description: 'Conduct post-accident review; drug/alcohol testing per DOT requirements if applicable',
        assignedRole: 'Administrator',
        estimatedDuration: '1 hour',
        required: true,
        order: 5,
        requiresApproval: true,
        approvers: ['Administrator', 'District Superintendent'],
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: true,
          additionalRecipients: [],
          emailTemplate: 'Approval Request',
        },
      },
      {
        id: 'step-6',
        name: 'Vehicle Repair & Return to Service',
        description: 'Coordinate vehicle repair, safety inspection, and return-to-service certification',
        assignedRole: 'Fleet Manager',
        estimatedDuration: '1–5 days',
        required: true,
        order: 6,
        trigger: { type: 'approval-granted' },
      },
      {
        id: 'step-7',
        name: 'Final Documentation & Close',
        description: 'Complete all documentation, update fleet records, and close the incident',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '30 minutes',
        required: true,
        order: 7,
        trigger: { type: 'auto-complete' },
      },
    ],
  },
  {
    id: 'WF-018',
    name: 'Minor Vehicle Incident',
    description: 'Streamlined workflow for minor vehicle incidents such as bumping, backing incidents, mirror strikes, object collisions, and property damage',
    incidentTypes: ['Vehicle Bumping/Light Contact', 'Collision with Object', 'Backing Incident', 'Mirror Strike', 'Property Damage'],
    severityLevels: ['Low', 'Medium'],
    isActive: true,
    createdBy: 'Jane Doe',
    createdDate: '2025-03-08',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Scene Documentation',
        description: 'Driver photographs damage to bus and any other property/vehicle; exchange information if another party is involved',
        assignedRole: 'Driver',
        estimatedDuration: '15 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Fleet Manager & Safety Review',
        description: 'Fleet manager assesses damage; safety coordinator reviews dashcam footage and driver statement',
        assignedRole: 'Fleet Manager',
        estimatedDuration: '30 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: ['maintenance@district.edu'],
        },
      },
      {
        id: 'step-3',
        name: 'Corrective Action (if needed)',
        description: 'Determine if driver retraining, route modification, or other corrective action is needed',
        assignedRole: 'Administrator',
        estimatedDuration: '20 minutes',
        required: false,
        order: 3,
        trigger: { type: 'auto-complete' },
      },
      {
        id: 'step-4',
        name: 'Repair & Documentation Close',
        description: 'Schedule repair if needed, complete documentation, and close incident',
        assignedRole: 'Fleet Manager',
        estimatedDuration: '30 minutes',
        required: true,
        order: 4,
        trigger: { type: 'auto-complete' },
      },
    ],
  },
  {
    id: 'WF-019',
    name: 'Vehicle Mechanical Response',
    description: 'Workflow for handling mechanical failures and vehicle breakdowns during service',
    incidentTypes: ['Mechanical Failure', 'Vehicle Breakdown'],
    severityLevels: ['Medium', 'High'],
    isActive: true,
    createdBy: 'Jane Doe',
    createdDate: '2025-03-10',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Safe Stop & Student Safety',
        description: 'Driver pulls over safely, secures the bus, and ensures all students are safe; contact dispatch for replacement vehicle',
        assignedRole: 'Driver',
        estimatedDuration: '10 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Dispatch Replacement & Parent Notification',
        description: 'Dispatch a replacement bus; notify parents of delay and any route changes',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '20 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: ['dispatch@district.edu'],
          emailTemplate: 'Urgent Action Required',
        },
      },
      {
        id: 'step-3',
        name: 'Mechanical Assessment & Tow',
        description: 'Fleet manager arranges tow if necessary and conducts initial mechanical assessment',
        assignedRole: 'Fleet Manager',
        estimatedDuration: '1 hour',
        required: true,
        order: 3,
        trigger: { type: 'auto-complete' },
        emailNotifications: {
          notifyOnStart: true,
          notifyOnComplete: true,
          notifyAssignee: true,
          notifyApprovers: false,
          additionalRecipients: ['maintenance@district.edu'],
        },
      },
      {
        id: 'step-4',
        name: 'Pre-Trip Inspection Review',
        description: 'Review pre-trip inspection records to determine if the issue should have been caught; address any gaps',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '20 minutes',
        required: true,
        order: 4,
        trigger: { type: 'auto-complete' },
      },
      {
        id: 'step-5',
        name: 'Repair, Recertify & Close',
        description: 'Complete repairs, pass safety inspection, return vehicle to service, and close incident',
        assignedRole: 'Fleet Manager',
        estimatedDuration: '1–3 days',
        required: true,
        order: 5,
        trigger: { type: 'auto-complete' },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // DEFAULT / GENERAL (catch-all)
  // ─────────────────────────────────────────────
  {
    id: 'WF-DEFAULT',
    name: 'General Incident Review',
    description: 'Default workflow for reviewing and determining follow-up actions for incidents without specialized workflows',
    incidentTypes: [], // Empty means it applies to any type not covered by other workflows
    severityLevels: ['Low', 'Medium', 'High'], // Applies to all severities
    isActive: true,
    createdBy: 'System',
    createdDate: '2025-01-01',
    lastModified: '2025-03-16',
    steps: [
      {
        id: 'step-1',
        name: 'Initial Review',
        description: 'Review incident details, driver report, and any supporting documentation or photos',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '10 minutes',
        required: true,
        order: 1,
        trigger: { type: 'manual' },
      },
      {
        id: 'step-2',
        name: 'Determine Follow-up Action',
        description: 'Based on incident review, determine the appropriate next steps and follow-up actions',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '15 minutes',
        required: true,
        order: 2,
        trigger: { type: 'auto-complete' },
      },
      {
        id: 'step-3',
        name: 'Complete Documentation & Close',
        description: 'Document the determined action, update incident status, and close the workflow',
        assignedRole: 'Safety Coordinator',
        estimatedDuration: '10 minutes',
        required: true,
        order: 3,
        trigger: { type: 'auto-complete' },
      },
    ],
  },
];

// ─────────────────────────────────────────────
// WORKFLOW ASSIGNMENT & HELPER FUNCTIONS
// ─────────────────────────────────────────────

// Function to automatically assign workflow based on incident type and severity
export function assignWorkflowToIncident(incidentType: string, severity: string): Workflow | null {
  // Normalise severity to title-case so callers can pass "low", "Low", "LOW", etc.
  const normSeverity = severity.charAt(0).toUpperCase() + severity.slice(1).toLowerCase();

  // 1. Try exact match on type AND severity (ideal path)
  let matchingWorkflow = workflows.find(
    (workflow) =>
      workflow.isActive &&
      workflow.id !== 'WF-DEFAULT' &&
      workflow.incidentTypes.includes(incidentType) &&
      workflow.severityLevels.includes(normSeverity)
  );

  // 2. If the severity didn't match but the type DID, still use that workflow.
  //    The workflow is determined by the incident type; severity is informational.
  if (!matchingWorkflow) {
    matchingWorkflow = workflows.find(
      (workflow) =>
        workflow.isActive &&
        workflow.id !== 'WF-DEFAULT' &&
        workflow.incidentTypes.includes(incidentType)
    );
  }

  // If specific workflow found, use it
  if (matchingWorkflow) {
    // Clone workflow and reset step statuses for new incident
    const newWorkflow: Workflow = {
      ...matchingWorkflow,
      active: true, // Set instance as active when first assigned
      steps: matchingWorkflow.steps.map((step) => ({
        ...step,
        status: 'Not Started',
        completedDate: undefined,
        completedBy: undefined,
        comments: undefined,
      })),
    };
    
    return newWorkflow;
  }

  // If no specific workflow found, use default workflow
  const defaultWorkflow = workflows.find((workflow) => workflow.id === 'WF-DEFAULT');
  
  if (defaultWorkflow) {
    const newWorkflow: Workflow = {
      ...defaultWorkflow,
      active: true,
      steps: defaultWorkflow.steps.map((step) => ({
        ...step,
        status: 'Not Started',
        completedDate: undefined,
        completedBy: undefined,
        comments: undefined,
      })),
    };
    
    return newWorkflow;
  }

  return null;
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
    (wf) => wf.id !== 'WF-DEFAULT' && wf.incidentTypes.includes(incidentTypeLabel)
  );
}

// Helper: list all incident type labels that have NO dedicated workflow (should be empty if coverage is complete)
export function getUncoveredIncidentTypes(allTypeLabels: string[]): string[] {
  return allTypeLabels.filter(
    (label) => !workflows.some((wf) => wf.id !== 'WF-DEFAULT' && wf.incidentTypes.includes(label))
  );
}
