// Shared Email Template definitions used by Admin and Workflow configuration

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  body: string;
  category: 'Notification' | 'Approval' | 'Escalation' | 'Custom';
  variables: string[];
  lastModified: string;
  isDefault: boolean;
}

export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'ET-002',
    name: 'Urgent Action Required',
    description: 'High-priority notification for critical or time-sensitive workflow steps.',
    subject: '[URGENT] Action Required: {{step_name}} - {{incident_id}}',
    body: 'URGENT: Immediate action is required.\n\nHello {{recipient_name}},\n\nA high-priority workflow step requires your immediate attention:\n\nStep: {{step_name}}\nIncident: {{incident_id}}\nSeverity: {{severity}}\nAssigned To: {{assigned_role}}\n\nPlease log in to the Incident Tracker immediately to address this matter.\n\nThis notification was sent because the incident severity is {{severity}} and requires prompt resolution.\n\nThank you,\nIncident Tracker System',
    category: 'Notification',
    variables: ['recipient_name', 'step_name', 'incident_id', 'severity', 'assigned_role'],
    lastModified: '2026-03-10',
    isDefault: true,
  },
  {
    id: 'ET-003',
    name: 'Approval Request',
    description: 'Sent to designated approvers when a step requires approval before proceeding.',
    subject: '[Approval Needed] {{step_name}} - {{incident_id}}',
    body: 'Hello {{recipient_name}},\n\nYour approval is needed for the following workflow step:\n\nStep: {{step_name}}\nIncident: {{incident_id}}\nRequested By: {{requested_by}}\nDate: {{request_date}}\n\nDetails:\n{{step_description}}\n\nPlease log in to the Incident Tracker to review and approve or reject this step.\n\nThank you,\nIncident Tracker System',
    category: 'Approval',
    variables: ['recipient_name', 'step_name', 'incident_id', 'requested_by', 'request_date', 'step_description'],
    lastModified: '2026-03-10',
    isDefault: true,
  },
  {
    id: 'ET-006',
    name: 'Custom Template',
    description: 'A blank customizable template for creating unique notifications.',
    subject: '[Incident Tracker] {{subject_line}}',
    body: 'Hello {{recipient_name}},\n\n{{custom_body}}\n\nThank you,\nIncident Tracker System',
    category: 'Custom',
    variables: ['recipient_name', 'subject_line', 'custom_body'],
    lastModified: '2026-03-10',
    isDefault: true,
  },
  {
    id: 'ET-007',
    name: 'Parent/Guardian Notification',
    description: 'Sent to parents or guardians when their child is involved in a bus incident. Used across most student-related workflows.',
    subject: '[Incident Tracker] Bus Incident Involving Your Child - {{incident_id}}',
    body: 'Dear {{parent_name}},\n\nWe are writing to inform you of an incident that occurred on {{incident_date}} involving your child, {{student_name}}, while riding {{bus_route}}.\n\nIncident Type: {{incident_type}}\nSeverity: {{severity}}\nLocation: {{incident_location}}\n\nSummary:\n{{incident_summary}}\n\nImmediate actions taken:\n{{actions_taken}}\n\nIf you have any questions or concerns, please contact {{contact_name}} at {{contact_phone}} or {{contact_email}}.\n\nSincerely,\n{{sender_name}}\n{{sender_title}}\nStudent Transportation Department',
    category: 'Notification',
    variables: ['parent_name', 'student_name', 'bus_route', 'incident_date', 'incident_type', 'severity', 'incident_location', 'incident_summary', 'actions_taken', 'contact_name', 'contact_phone', 'contact_email', 'sender_name', 'sender_title'],
    lastModified: '2026-03-17',
    isDefault: true,
  },
  {
    id: 'ET-008',
    name: 'Escalation Notice',
    description: 'Sent when an incident is escalated due to repeated offenses or increased severity. Used for progressive discipline workflows.',
    subject: '[ESCALATION] Repeated Incident - {{student_name}} - {{incident_id}}',
    body: 'Hello {{recipient_name}},\n\nThis incident has been escalated due to {{escalation_reason}}.\n\nStudent: {{student_name}}\nCurrent Incident: {{incident_id}} — {{incident_type}}\nPrior Incidents: {{prior_incident_count}}\n\nIncident History Summary:\n{{incident_history}}\n\nRecommended Action: {{recommended_action}}\n\nThis matter requires your review to determine progressive discipline measures per district policy. Please log in to the Incident Tracker to review the full history and take action.\n\nThank you,\nIncident Tracker System',
    category: 'Escalation',
    variables: ['recipient_name', 'student_name', 'incident_id', 'incident_type', 'escalation_reason', 'prior_incident_count', 'incident_history', 'recommended_action'],
    lastModified: '2026-03-17',
    isDefault: true,
  },
];