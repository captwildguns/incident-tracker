// Shared Email Template definitions used by Admin and Workflow configuration

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  body: string;
  category: 'Notification' | 'Approval';
  variables: string[];
  lastModified: string;
  isDefault: boolean;
}

// IDs are assigned sequentially in alphabetical order by template name.
export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'ET-001',
    name: 'Action Required',
    description: 'General notification that a workflow step requires action by the assigned role. Suitable for routine and time-sensitive steps alike.',
    subject: 'Action Required: {{step_name}} - {{incident_id}}',
    body: 'Hello,\n\nA workflow step requires your attention:\n\nStep: {{step_name}}\nIncident: {{incident_id}}\nSeverity: {{severity}}\nAssigned To: {{assigned_role}}\n\nPlease log in to the Incident Tracker to review and complete this step.\n\nThank you,\nIncident Tracker System',
    category: 'Notification',
    variables: ['step_name', 'incident_id', 'severity', 'assigned_role'],
    lastModified: '2026-06-19',
    isDefault: true,
  },
  {
    id: 'ET-002',
    name: 'Approval Request',
    description: 'Sent to designated approvers when a step requires approval before proceeding.',
    subject: 'Approval needed for workflow step: {{step_name}} ({{incident_id}})',
    body: 'Hello,\n\nYour approval is needed for the following workflow step:\n\nStep: {{step_name}}\nIncident: {{incident_id}}\nRequested By: {{requested_by}}\nDate: {{request_date}}\n\nDetails:\n{{step_description}}\n\nPlease log in to the Incident Tracker to review and approve or reject this step.\n\nThank you,\nIncident Tracker System',
    category: 'Approval',
    variables: ['step_name', 'incident_id', 'requested_by', 'request_date', 'step_description'],
    lastModified: '2026-03-10',
    isDefault: true,
  },
  {
    id: 'ET-003',
    name: 'Parent/Guardian Notification',
    description: 'Sent to parents or guardians when their child is involved in a bus incident. Used across most student-related workflows.',
    subject: 'Incident Involving Your Child - {{incident_type}} - {{incident_id}}',
    body: 'Hello,\n\nWe are writing to inform you of an incident that occurred on {{incident_date}} involving your child, {{student_name}}, while riding {{bus_route}}.\n\nIncident Type: {{incident_type}}\nSeverity: {{severity}}\nLocation: {{incident_location}}\n\nSummary:\n{{incident_summary}}\n\nImmediate actions taken:\n{{actions_taken}}\n\nIf you have any questions or concerns, please contact INSERT NAME at PHONE# or EMAIL.\n\nSincerely,\n{{sender_name}}\n{{sender_title}}\nStudent Transportation Department',
    category: 'Notification',
    variables: ['student_name', 'bus_route', 'incident_date', 'incident_type', 'severity', 'incident_location', 'incident_summary', 'actions_taken', 'sender_name', 'sender_title'],
    lastModified: '2026-03-17',
    isDefault: true,
  },
];