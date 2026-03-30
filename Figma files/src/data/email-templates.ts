// Shared Email Template definitions used by Admin and Workflow configuration

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  body: string;
  category: 'Notification' | 'Approval' | 'Escalation' | 'Completion' | 'Custom';
  variables: string[];
  lastModified: string;
  isDefault: boolean;
}

export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'ET-001',
    name: 'Default Notification',
    description: 'Standard notification sent when a workflow step starts or completes.',
    subject: '[Incident Tracker] {{step_name}} - {{incident_id}}',
    body: 'Hello {{recipient_name}},\n\nThis is to inform you that the workflow step "{{step_name}}" for incident {{incident_id}} has been {{action}}.\n\nIncident Details:\n- Type: {{incident_type}}\n- Severity: {{severity}}\n- Date: {{incident_date}}\n\nPlease log in to the Incident Tracker to review and take appropriate action.\n\nThank you,\nIncident Tracker System',
    category: 'Notification',
    variables: ['recipient_name', 'step_name', 'incident_id', 'action', 'incident_type', 'severity', 'incident_date'],
    lastModified: '2026-03-10',
    isDefault: true,
  },
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
    id: 'ET-004',
    name: 'Status Update',
    description: 'Notification sent when the status of an incident or workflow step changes.',
    subject: '[Status Update] {{incident_id}} - {{new_status}}',
    body: 'Hello {{recipient_name}},\n\nThe status of incident {{incident_id}} has been updated:\n\nPrevious Status: {{old_status}}\nNew Status: {{new_status}}\nUpdated By: {{updated_by}}\nDate: {{update_date}}\n\nPlease log in to the Incident Tracker for more details.\n\nThank you,\nIncident Tracker System',
    category: 'Notification',
    variables: ['recipient_name', 'incident_id', 'old_status', 'new_status', 'updated_by', 'update_date'],
    lastModified: '2026-03-10',
    isDefault: true,
  },
  {
    id: 'ET-005',
    name: 'Completion Notice',
    description: 'Sent when a workflow is fully completed for an incident.',
    subject: '[Completed] Workflow Complete - {{incident_id}}',
    body: 'Hello {{recipient_name}},\n\nThe workflow for incident {{incident_id}} has been fully completed.\n\nIncident Summary:\n- Type: {{incident_type}}\n- Severity: {{severity}}\n- Total Steps Completed: {{total_steps}}\n- Completed By: {{completed_by}}\n- Completion Date: {{completion_date}}\n\nAll required steps have been fulfilled. Please review the incident for final disposition.\n\nThank you,\nIncident Tracker System',
    category: 'Completion',
    variables: ['recipient_name', 'incident_id', 'incident_type', 'severity', 'total_steps', 'completed_by', 'completion_date'],
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
  {
    id: 'ET-009',
    name: 'Follow-up Reminder',
    description: 'Scheduled reminder for follow-up actions such as 30-day check-ins, behavior plan reviews, or post-incident monitoring.',
    subject: '[Reminder] Follow-up Due: {{step_name}} - {{incident_id}}',
    body: 'Hello {{recipient_name}},\n\nThis is a scheduled reminder that a follow-up action is due:\n\nStep: {{step_name}}\nIncident: {{incident_id}}\nOriginal Incident Date: {{incident_date}}\nFollow-up Due Date: {{due_date}}\n\nOriginal Incident Summary:\n{{incident_summary}}\n\nFollow-up Instructions:\n{{follow_up_instructions}}\n\nPlease log in to the Incident Tracker to complete this follow-up and document your findings.\n\nThank you,\nIncident Tracker System',
    category: 'Notification',
    variables: ['recipient_name', 'step_name', 'incident_id', 'incident_date', 'due_date', 'incident_summary', 'follow_up_instructions'],
    lastModified: '2026-03-17',
    isDefault: true,
  },
  {
    id: 'ET-010',
    name: 'Corrective Action / Retraining Notice',
    description: 'Sent to drivers or staff when corrective action, retraining, or disciplinary measures have been determined following a driver-related incident.',
    subject: '[Action Required] Corrective Action Assigned - {{incident_id}}',
    body: 'Hello {{recipient_name}},\n\nFollowing the review of incident {{incident_id}} ({{incident_type}}, {{incident_date}}), the following corrective action has been determined:\n\nAction Type: {{action_type}}\nDetails: {{action_details}}\nDeadline: {{action_deadline}}\nAssigned By: {{assigned_by}}\n\nIncident Summary:\n{{incident_summary}}\n\nFindings:\n{{investigation_findings}}\n\nPlease acknowledge receipt of this notice and complete the required action by the deadline above. If you have questions, contact {{contact_name}} at {{contact_email}}.\n\nThank you,\n{{sender_name}}\nStudent Transportation Department',
    category: 'Notification',
    variables: ['recipient_name', 'incident_id', 'incident_type', 'incident_date', 'action_type', 'action_details', 'action_deadline', 'assigned_by', 'incident_summary', 'investigation_findings', 'contact_name', 'contact_email', 'sender_name'],
    lastModified: '2026-03-17',
    isDefault: true,
  },
];