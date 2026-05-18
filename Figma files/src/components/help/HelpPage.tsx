import { ForgeCard } from '@tylertech/forge-react';
import { defineCardComponent } from '@tylertech/forge';
defineCardComponent();
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import {
  BookOpen, HelpCircle, FileText, Users, BarChart3, Bus,
  UserCircle, Mail, GitBranch, AlertCircle, MessageSquare,
  Shield, Settings, CheckCircle,
} from 'lucide-react';

/* ───────────────────── shared inline style helpers ───────────────────── */
const sectionCard: React.CSSProperties = {
  boxShadow: 'var(--forge-elevation-2)',
  marginBottom: 'var(--forge-spacing-large)',
};

const featureCard: React.CSSProperties = {
  borderRadius: 'var(--forge-radius-large)',
  padding: 'var(--forge-spacing-medium)',
  border: '1px solid var(--forge-color-border-default)',
};

const highlightCard: React.CSSProperties = {
  ...featureCard,
  borderColor: 'var(--brand-blue-medium)',
  borderWidth: '2px',
};

const badgeNew: React.CSSProperties = {
  backgroundColor: 'var(--brand-olive-light)',
  color: 'var(--brand-olive-dark)',
};

/* ───────────────────── component ───────────────────── */
export function HelpPage() {
  return (
    <div style={{ padding: 'var(--forge-spacing-xlarge)', fontFamily: 'var(--forge-font-family)' }}>
      {/* Page Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <div>
          <h1 style={{ margin: 0, marginBottom: 'var(--forge-spacing-xsmall)', fontFamily: 'var(--forge-font-family)' }}>
            Help &amp; Support
          </h1>
          <p className="text-muted-foreground" style={{ margin: 0, fontFamily: 'var(--forge-font-family)' }}>
            Learn how to use the Incident Tracker in Student Transportation
          </p>
        </div>
      </div>

      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="grid w-full grid-cols-3" style={{ marginBottom: 'var(--forge-spacing-large)' }}>
          <TabsTrigger value="getting-started">
            <BookOpen className="mr-2 h-4 w-4" />
            Getting Started
          </TabsTrigger>
          <TabsTrigger value="user-guide">
            <FileText className="mr-2 h-4 w-4" />
            User Guide
          </TabsTrigger>
          <TabsTrigger value="faq">
            <HelpCircle className="mr-2 h-4 w-4" />
            FAQ
          </TabsTrigger>
        </TabsList>

        {/* ═══════════════════  GETTING STARTED  ═══════════════════ */}
        <TabsContent value="getting-started">
          <ForgeCard style={sectionCard}>
            <div style={{ padding: 'var(--forge-spacing-medium)' }}>
              <h3 className="forge-typography--heading4" style={{ fontFamily: 'var(--forge-font-family)' }}>
                Welcome to the Student Transportation Incident Tracker
              </h3>
              <div className="space-y-6" style={{ marginTop: 'var(--forge-spacing-small)' }}>
              {/* Overview */}
              <div>
                <h3 className="mb-3" style={{ fontFamily: 'var(--forge-font-family)' }}>Overview</h3>
                <p className="text-foreground leading-relaxed" style={{ fontFamily: 'var(--forge-font-family)' }}>
                  The Incident Tracker is a comprehensive application designed for Student Transportation departments
                  to capture, manage, and communicate about incidents that occur during bus transportation.
                  Built on the <strong>Tyler Forge 3.x</strong> design system and integrated into Student Transportation
                  (powered by Traversa), the system helps safety coordinators, supervisors, and administrators track
                  both <strong>student behavioral incidents</strong> and <strong>driver operational/safety incidents</strong> across
                  10 categories and 47 specific types, manage multi-step workflows, communicate with drivers,
                  monitor fleet vehicles, administer email templates and user roles, and generate reports for
                  analysis and compliance.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="mb-3" style={{ fontFamily: 'var(--forge-font-family)' }}>Navigation</h3>
                <p className="text-foreground leading-relaxed" style={{ marginBottom: 'var(--forge-spacing-small)', fontFamily: 'var(--forge-font-family)' }}>
                  The application uses Tyler Forge navigation patterns:
                </p>
                <ul className="space-y-2 ml-5 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                  <li><strong>Hamburger Menu:</strong> Click the menu icon in the top-left to open the slide-out navigation panel with your profile and all application areas</li>
                  <li><strong>Top Navigation Tabs:</strong> Quick access to Dashboard, Incidents, Students, Drivers, Vehicles, Communications, Reports, Workflows, and Admin</li>
                  <li><strong>Help Icon (?):</strong> Located in the top-right omnibar, click to access this Help &amp; Support page</li>
                  <li><strong>Notifications Bell:</strong> View system notifications and alerts requiring your attention</li>
                  <li><strong>Profile Menu:</strong> Click your name/avatar in the top-right to access settings and sign out</li>
                  <li><strong>Global Search:</strong> Search bar in the top-right for quick access to students, incidents, and data</li>
                </ul>
              </div>

              {/* Roles */}
              <div>
                <h3 className="mb-3" style={{ fontFamily: 'var(--forge-font-family)' }}>User Roles</h3>
                <p className="text-foreground leading-relaxed" style={{ marginBottom: 'var(--forge-spacing-small)', fontFamily: 'var(--forge-font-family)' }}>
                  The system supports seven role types, managed through Administration &rarr; User Roles:
                </p>
                <ul className="space-y-1 ml-5 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                  <li><strong>Safety Coordinator</strong> &mdash; Primary user; manages incidents, communicates with drivers, runs reports</li>
                  <li><strong>Administrator</strong> &mdash; Full system access including Admin configuration, workflow builder, and system settings</li>
                  <li><strong>School Principal</strong> &mdash; Reviews incidents involving their school&rsquo;s students, participates in disciplinary workflows</li>
                  <li><strong>Driver</strong> &mdash; Completes initial response workflow steps, receives communications</li>
                  <li><strong>Fleet Manager</strong> &mdash; Manages vehicle incidents, repairs, and fleet maintenance workflows</li>
                  <li><strong>Nurse</strong> &mdash; Provides victim support and medical assessments in behavioral incident workflows</li>
                  <li><strong>Mechanic</strong> &mdash; Handles vehicle repair tasks within maintenance and breakdown workflows</li>
                </ul>
              </div>

              {/* Key Features Grid */}
              <div>
                <h3 className="mb-3" style={{ fontFamily: 'var(--forge-font-family)' }}>Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={featureCard}>
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <h4 className="m-0" style={{ fontFamily: 'var(--forge-font-family)' }}>Dashboard</h4>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                      Personalized triage view with &ldquo;My Incidents,&rdquo; &ldquo;Needs Attention&rdquo; queue, KPI summary cards, trend charts, and unanswered communications count.
                    </p>
                  </div>

                  <div style={featureCard}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      <h4 className="m-0" style={{ fontFamily: 'var(--forge-font-family)' }}>Incident Management</h4>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                      Create, edit, filter, and track 29 student and 18 driver incident types across 10 categories with visual bus seat selection, photo/document attachments, and full audit history.
                    </p>
                  </div>

                  <div style={featureCard}>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h4 className="m-0" style={{ fontFamily: 'var(--forge-font-family)' }}>Student Profiles</h4>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                      View student incident history, pattern analysis, and transportation details to support behavioral interventions.
                    </p>
                  </div>

                  <div style={featureCard}>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <h4 className="m-0" style={{ fontFamily: 'var(--forge-font-family)' }}>Driver Communications</h4>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                      Incident-linked messaging hub between coordinators and drivers with delivery tracking, acknowledgment status, and unread filters.
                    </p>
                  </div>

                  <div style={featureCard}>
                    <div className="flex items-center gap-2 mb-2">
                      <Bus className="h-5 w-5 text-primary" />
                      <h4 className="m-0" style={{ fontFamily: 'var(--forge-font-family)' }}>Fleet Management</h4>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                      Monitor vehicles with visual bus icons matching make/model, track maintenance, GPS/AVL, and view detailed vehicle specifications.
                    </p>
                  </div>

                  <div style={featureCard}>
                    <div className="flex items-center gap-2 mb-2">
                      <UserCircle className="h-5 w-5 text-primary" />
                      <h4 className="m-0" style={{ fontFamily: 'var(--forge-font-family)' }}>Driver Management</h4>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                      Track driver assignments, certifications, incident history, safety ratings, and performance scores.
                    </p>
                  </div>

                  <div style={featureCard}>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h4 className="m-0" style={{ fontFamily: 'var(--forge-font-family)' }}>Reports &amp; Analytics</h4>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                      8 quick reports, custom report builder with filters and grouping, Weekly Trends Analysis dashboard, and CSV/PDF export.
                    </p>
                  </div>

                  <div style={featureCard}>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <h4 className="m-0" style={{ fontFamily: 'var(--forge-font-family)' }}>Notifications</h4>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                      Real-time alerts for new incidents, workflow step assignments, approval requests, and overdue items.
                    </p>
                  </div>

                  <div style={highlightCard}>
                    <div className="flex items-center gap-2 mb-2">
                      <GitBranch className="h-5 w-5 text-primary" />
                      <h4 className="m-0" style={{ fontFamily: 'var(--forge-font-family)' }}>Workflow System</h4>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                      17 pre-configured workflows (WF-001 &ndash; WF-019 + WF-DEFAULT) with two-pass auto-assignment, manual step progression, role-based assignments, approval gates, configurable email notifications, and full audit trail.
                    </p>
                  </div>

                  <div style={highlightCard}>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <h4 className="m-0" style={{ fontFamily: 'var(--forge-font-family)' }}>Administration</h4>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--forge-font-family)' }}>
                      Manage user roles (7 types), email notification templates (10 system defaults with variable placeholders), and all 47 incident types with full CRUD operations.
                    </p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </ForgeCard>
        </TabsContent>

        {/* ═══════════════════  USER GUIDE  ═══════════════════ */}
        <TabsContent value="user-guide">
          <ForgeCard style={sectionCard}>
            <div style={{ padding: 'var(--forge-spacing-medium)' }}>
              <h3 className="forge-typography--heading4" style={{ fontFamily: 'var(--forge-font-family)' }}>Complete User Guide</h3>
              <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
              <Accordion type="single" collapsible className="w-full">

                {/* ─── Dashboard ─── */}
                <AccordionItem value="dashboard">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span style={{ fontFamily: 'var(--forge-font-family)' }}>Dashboard</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p>
                      The Dashboard is your personalized command center, showing assigned incidents, a triage queue, unanswered driver messages, and analytics charts.
                    </p>
                    <div>
                      <h4 className="mb-2">Summary Statistics (KPI Cards)</h4>
                      <ul className="ml-5 space-y-1">
                        <li><strong>Total Incidents:</strong> All incidents for the selected time period</li>
                        <li><strong>Active Incidents:</strong> Count currently in review or pending status</li>
                        <li><strong>Students w/ Incidents:</strong> Dynamic count of distinct students who have at least one incident</li>
                        <li><strong>Avg. Response Time:</strong> Average hours to first response (clickable for breakdown)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2">My Incidents Section</h4>
                      <p className="mb-2">
                        Shows only incidents assigned to you. Each triage card displays the incident ID, student/driver info, severity badge, current status, and age. Cards update their badge when you mark an incident as in-progress.
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-2">Needs Attention Queue</h4>
                      <p>
                        Priority-sorted list of your oldest unresolved items requiring action, ensuring nothing falls through the cracks.
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-2">Trend Charts</h4>
                      <ul className="ml-5 space-y-1">
                        <li><strong>Incidents by Type:</strong> Bar chart showing distribution across categories</li>
                        <li><strong>Monthly Trends:</strong> Line chart of incident volume over time</li>
                        <li><strong>Severity Breakdown:</strong> Pie chart of high/medium/low proportions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2">Active Incidents Table</h4>
                      <p>
                        Table rows are optionally clickable, navigating directly to the incident detail page. Table headers use the Forge font family for consistency.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Incidents ─── */}
                <AccordionItem value="incidents">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <span style={{ fontFamily: 'var(--forge-font-family)' }}>Incident Management</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p>
                      The Incidents page is the central hub for managing all incident records with powerful filtering, search, and pagination.
                    </p>

                    <div>
                      <h4 className="mb-2">Incident Categories &amp; Types</h4>
                      <p className="mb-2">
                        The system tracks <strong>47 incident types</strong> across two main categories:
                      </p>
                      <div className="mb-3">
                        <p className="mb-1"><strong>Student Incidents (29 types) across 7 categories:</strong></p>
                        <ul className="ml-5 space-y-1">
                          <li><strong>Behavioral:</strong> Offensive Language, Student Harassment, Taunting/Bullying, Unwanted Physical Contact, Inappropriate Affection, Disruptive Volume, Repeated Misconduct</li>
                          <li><strong>Safety Violation:</strong> Seat Refusal, Seatbelt Refusal, Unsafe Movement, Window Misuse, Emergency Exit Misuse, Wrong Stop Exit, Eating/Drinking Violation</li>
                          <li><strong>Aggression/Violence:</strong> Threatening Behavior, Physical Altercation, Physical Assault, Throwing Objects</li>
                          <li><strong>Driver Defiance:</strong> Driver Defiance, Driver Harassment, Driver Threat, Verbal Abuse toward Driver</li>
                          <li><strong>Property Damage:</strong> Vandalism</li>
                          <li><strong>Prohibited Items:</strong> Tobacco/Vaping, Harmful Items, Weapon Possession, Illegal Substances, Inappropriate Material</li>
                          <li><strong>Privacy Violation:</strong> Unauthorized Recording</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-1"><strong>Driver Incidents (18 types) across 3 categories:</strong></p>
                        <ul className="ml-5 space-y-1">
                          <li><strong>Driver Operational:</strong> Late Arrival, Run Deviation, Missed Stop, Policy Violation, Communication Issue</li>
                          <li><strong>Driver Safety:</strong> Unsafe Driving, Distracted Driving, Equipment Safety Violation, Loading/Unloading Safety Issue</li>
                          <li><strong>Vehicle Incident:</strong> Vehicle Accident, Vehicle Bumping/Light Contact, Collision with Object, Collision with Vehicle, Backing Incident, Mirror Strike, Property Damage, Mechanical Failure, Vehicle Breakdown</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2">Creating a New Incident</h4>
                      <ol className="ml-5 space-y-1">
                        <li>Click <strong>&ldquo;+ New Incident&rdquo;</strong> on the Incidents page</li>
                        <li>Select <strong>Student Incident</strong> or <strong>Driver Incident</strong> using the toggle</li>
                        <li>Complete required fields (marked with red asterisks)</li>
                        <li>For student incidents: select student, choose type/severity, use the visual bus diagram to mark the seat location, add description and witnesses</li>
                        <li>For driver incidents: select driver, choose type/severity, enter description, add vehicle and route details</li>
                        <li>Click <strong>&ldquo;Save Incident&rdquo;</strong> &mdash; the system automatically assigns the matching workflow</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="mb-2">Filtering &amp; Pagination</h4>
                      <ul className="ml-5 space-y-1">
                        <li><strong>Category Toggle:</strong> Student Incidents, Driver Incidents, or All</li>
                        <li><strong>Search:</strong> By ID, student name, driver name, or description</li>
                        <li><strong>Status:</strong> Pending, In Review, Resolved, Closed</li>
                        <li><strong>Severity:</strong> High, Medium, Low</li>
                        <li><strong>Type:</strong> Any of the 47 incident types</li>
                        <li><strong>Date Range:</strong> Filter by incident date</li>
                        <li><strong>Pagination:</strong> Navigate through large result sets with page controls</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2">Incident Detail Page</h4>
                      <p className="mb-2">Click any incident row or ID to open the full detail page with these tabs:</p>
                      <ul className="ml-5 space-y-1">
                        <li><strong>Overview:</strong> Complete incident info, student/driver profile, severity, assigned coordinator, and workflow status widget</li>
                        <li><strong>Workflow:</strong> Step-by-step progress with &ldquo;Complete this step&rdquo; buttons, role assignments, approval gates, and timestamps</li>
                        <li><strong>Communications:</strong> All messages related to this incident</li>
                        <li><strong>Documents &amp; Photos:</strong> Attached evidence, photos, and documentation</li>
                        <li><strong>History:</strong> Full audit trail with chronological timeline of all activities</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2">Exporting Data</h4>
                      <p>
                        Click the <strong>&ldquo;Export&rdquo;</strong> dropdown for CSV or PDF export of filtered incident data.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Workflow System ─── */}
                <AccordionItem value="workflows">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      <span style={{ fontFamily: 'var(--forge-font-family)' }}>Workflow System</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p>
                      The Workflow System provides structured, multi-step incident response processes. <strong>17 pre-configured workflows</strong> cover all 47 incident types, with a default catch-all for any unmatched types.
                    </p>

                    <div>
                      <h4 className="mb-2">How Workflows Are Assigned</h4>
                      <p className="mb-2">
                        When an incident is created, the system uses a <strong>two-pass matching strategy</strong>:
                      </p>
                      <ol className="ml-5 space-y-1">
                        <li><strong>Pass 1:</strong> Exact match on both incident type AND severity level</li>
                        <li><strong>Pass 2:</strong> If no severity match, match on incident type alone (severity is informational)</li>
                        <li><strong>Fallback:</strong> If no specific workflow matches, the <strong>General Incident Review</strong> (WF-DEFAULT) is assigned</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="mb-2">Pre-Configured Workflows</h4>
                      <ul className="ml-5 space-y-1">
                        <li><strong>WF-001 Physical Altercation Response</strong> &mdash; Physical Altercation, Physical Assault, Throwing Objects</li>
                        <li><strong>WF-002 Bullying &amp; Harassment Investigation</strong> &mdash; Taunting/Bullying, Student Harassment, Unwanted Physical Contact</li>
                        <li><strong>WF-003 Seat &amp; Seatbelt Compliance</strong> &mdash; Seat Refusal, Seatbelt Refusal, Unsafe Movement, Window Misuse</li>
                        <li><strong>WF-004 Offensive Language Protocol</strong> &mdash; Offensive Language</li>
                        <li><strong>WF-005 Disruptive Behavior &ndash; Minor</strong> &mdash; Disruptive Volume, Inappropriate Affection</li>
                        <li><strong>WF-006 Property Damage Investigation</strong> &mdash; Vandalism</li>
                        <li><strong>WF-007 Food &amp; Beverage Violation</strong> &mdash; Eating/Drinking Violation</li>
                        <li><strong>WF-008 Threatening Behavior Protocol</strong> &mdash; Threatening Behavior</li>
                        <li><strong>WF-009 Emergency Safety Response</strong> &mdash; Emergency Exit Misuse, Wrong Stop Exit</li>
                        <li><strong>WF-010 Driver Defiance &amp; Harassment Protocol</strong> &mdash; Driver Defiance, Driver Harassment, Driver Threat, Verbal Abuse toward Driver</li>
                        <li><strong>WF-011 Prohibited Items Response</strong> &mdash; Tobacco/Vaping, Harmful Items, Illegal Substances, Inappropriate Material, Weapon Possession</li>
                        <li><strong>WF-012 Privacy Violation Response</strong> &mdash; Unauthorized Recording</li>
                        <li><strong>WF-014 Repeated Misconduct Escalation</strong> &mdash; Repeated Misconduct</li>
                        <li><strong>WF-015 Driver Operational Review</strong> &mdash; Late Arrival, Run Deviation, Missed Stop, Policy Violation, Communication Issue</li>
                        <li><strong>WF-016 Driver Safety Investigation</strong> &mdash; Unsafe Driving, Distracted Driving, Equipment Safety Violation, Loading/Unloading Safety Issue</li>
                        <li><strong>WF-017 Vehicle Accident Response</strong> &mdash; Vehicle Accident, Collision with Vehicle</li>
                        <li><strong>WF-018 Minor Vehicle Incident</strong> &mdash; Vehicle Bumping, Collision with Object, Backing Incident, Mirror Strike, Property Damage</li>
                        <li><strong>WF-019 Vehicle Mechanical Response</strong> &mdash; Mechanical Failure, Vehicle Breakdown</li>
                        <li><strong>WF-DEFAULT General Incident Review</strong> &mdash; Catch-all for any unmatched types</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2">Workflow Step Progression</h4>
                      <p className="mb-2">
                        <strong>All step progression is manual.</strong> Users click &ldquo;Complete this step&rdquo; within the incident detail&rsquo;s Workflow tab &mdash; there are no automated triggers. Each step includes:
                      </p>
                      <ul className="ml-5 space-y-1">
                        <li><strong>Assigned Role:</strong> Who is responsible (Driver, Safety Coordinator, Administrator, School Principal, Fleet Manager, Nurse)</li>
                        <li><strong>Clear Instructions:</strong> Detailed description of what needs to be done</li>
                        <li><strong>Time Estimate:</strong> Expected completion timeframe</li>
                        <li><strong>Status Tracking:</strong> Not Started, In Progress, Completed, Pending Approval, Approved, Rejected</li>
                        <li><strong>Completion Record:</strong> Date, time, user, and detailed comments</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2">Step Configuration (Configure Step Modal)</h4>
                      <p className="mb-2">
                        When building or editing a workflow, click the gear icon on any step to open the three-tab configuration dialog:
                      </p>
                      <ul className="ml-5 space-y-1">
                        <li><strong>General Tab:</strong> Step name, description, assigned role, estimated duration, and required/optional toggle</li>
                        <li><strong>Notifications Tab:</strong> Toggle notify-on-start, notify-on-complete, notify-assignee, and notify-approvers. Select an <strong>email template</strong> from the 10 system templates defined in Admin &rarr; Email Templates. Add additional recipient email addresses. Select roles to notify.</li>
                        <li><strong>Approvals Tab:</strong> Enable/disable approval requirement and select approver roles</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2">Creating a Custom Workflow</h4>
                      <ol className="ml-5 space-y-1">
                        <li>Navigate to the <strong>Workflows</strong> page</li>
                        <li>Click <strong>&ldquo;+ Create New Workflow&rdquo;</strong></li>
                        <li>Enter workflow name and description</li>
                        <li>Select a <strong>specific incident type</strong> from the full list (grouped by student vs. driver categories)</li>
                        <li>Severity auto-populates from the incident type&rsquo;s default (single value, not multi-select)</li>
                        <li>Add steps from the step library (condensed cards) or create custom steps</li>
                        <li>Configure each step&rsquo;s notifications and approvals using the gear icon</li>
                        <li>Save as draft or activate immediately</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="mb-2">Workflow Notifications &amp; Email Templates</h4>
                      <p className="mb-2">
                        Each workflow step can be configured to send email notifications using one of the <strong>10 system email templates</strong>:
                      </p>
                      <ul className="ml-5 space-y-1">
                        <li><strong>Urgent Action Required</strong> &mdash; High-priority alerts for critical steps</li>
                        <li><strong>Approval Request</strong> &mdash; Sent to approvers when approval is needed</li>
                        <li><strong>Custom Template</strong> &mdash; Blank customizable template</li>
                        <li><strong>Parent/Guardian Notification</strong> &mdash; Tailored for parent communication about student incidents</li>
                        <li><strong>Escalation Notice</strong> &mdash; For repeated offenses and progressive discipline</li>
                      </ul>
                      <p className="mt-2" style={{ fontStyle: 'italic', fontSize: 'var(--text-sm)' }}>
                        Templates are managed in Administration &rarr; Email Templates. Each template supports {`{{variable}}`} placeholders that are populated at send time.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Students ─── */}
                <AccordionItem value="students">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span style={{ fontFamily: 'var(--forge-font-family)' }}>Student Profiles</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p>
                      The Students page provides a comprehensive view of all students with incident records, helping identify patterns and students needing support.
                    </p>
                    <div>
                      <h4 className="mb-2">Student List View</h4>
                      <ul className="ml-5 space-y-1">
                        <li><strong>Student ID:</strong> Clickable unique identifier</li>
                        <li><strong>Name:</strong> Student&rsquo;s full name</li>
                        <li><strong>Grade Level:</strong> Current grade (K-12)</li>
                        <li><strong>School:</strong> Assigned school building</li>
                        <li><strong>Total Incidents:</strong> Count with trend indicator</li>
                        <li><strong>Last Incident:</strong> Date of most recent incident</li>
                        <li><strong>Status:</strong> Active or Inactive</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2">Filtering Students</h4>
                      <ul className="ml-5 space-y-1">
                        <li><strong>Search:</strong> By name, ID, or school</li>
                        <li><strong>Grade Filter:</strong> Specific grade levels</li>
                        <li><strong>School Filter:</strong> Specific schools</li>
                        <li><strong>Incident Count:</strong> 0, 1-3, 4-6, 7+</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2">Student Detail</h4>
                      <p>Click a student ID to view their full profile: basic information, transportation details, incident summary with severity breakdown, chronological incident history with links to each incident, and pattern analysis visualization.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Communications ─── */}
                <AccordionItem value="communications">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span style={{ fontFamily: 'var(--forge-font-family)' }}>Driver Communications</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p>
                      The Communications page manages all incident-linked messaging between safety coordinators and bus drivers.
                    </p>
                    <div>
                      <h4 className="mb-2">Creating a Communication</h4>
                      <ol className="ml-5 space-y-1">
                        <li>Click &ldquo;+ New Communication&rdquo;</li>
                        <li>Select driver and related incident</li>
                        <li>Choose communication type (Incident Follow-up, Acknowledgment Required, Training/Reminder, General Info)</li>
                        <li>Choose delivery method (Email, In-Person, Phone Call, Written Notice)</li>
                        <li>Enter message content and set priority</li>
                        <li>Click &ldquo;Send Communication&rdquo;</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="mb-2">Tracking &amp; Filtering</h4>
                      <ul className="ml-5 space-y-1">
                        <li><strong>Status Badges:</strong> Sent (gray), Acknowledged (green), Pending (yellow)</li>
                        <li><strong>Delivery Tracking:</strong> Simulated delivered/read status indicators</li>
                        <li><strong>Unread Filter:</strong> Quickly find unread communications</li>
                        <li><strong>Search:</strong> By driver name, incident ID, or message content</li>
                        <li><strong>Filter by:</strong> Status, type, delivery method, date range</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Vehicles ─── */}
                <AccordionItem value="vehicles">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4" />
                      <span style={{ fontFamily: 'var(--forge-font-family)' }}>Fleet Management</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p>
                      The Vehicles page provides comprehensive fleet management with visual bus icons matching each vehicle&rsquo;s make and model, full pagination support, and clickable table rows.
                    </p>
                    <div>
                      <h4 className="mb-2">Vehicle List View</h4>
                      <ul className="ml-5 space-y-1">
                        <li><strong>Vehicle ID:</strong> Clickable unique identifier</li>
                        <li><strong>Details:</strong> Bus name, year, make, model</li>
                        <li><strong>Assigned Driver:</strong> Current assignment</li>
                        <li><strong>Primary Run:</strong> Main run with icon</li>
                        <li><strong>Status:</strong> Active, Inactive, or Maintenance</li>
                        <li><strong>Maintenance Status:</strong> Excellent, Good, Needs Attention, In Repair (color-coded badges)</li>
                        <li><strong>Incidents:</strong> Count with trend indicator</li>
                        <li><strong>Mileage:</strong> Current odometer reading</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2">Vehicle Detail</h4>
                      <p>Click any vehicle to view: accurate bus icon for the make/model (Blue Bird Vision, IC Bus CE, Thomas C2/HDX, Blue Bird All American), specifications, GPS/AVL configuration, garage assignments, maintenance &amp; inspection records, and incident history.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Drivers ─── */}
                <AccordionItem value="drivers">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4" />
                      <span style={{ fontFamily: 'var(--forge-font-family)' }}>Driver Management</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p>
                      The Drivers page manages driver records, certifications, performance tracking, and safety ratings.
                    </p>
                    <div>
                      <h4 className="mb-2">Driver List View</h4>
                      <ul className="ml-5 space-y-1">
                        <li><strong>Driver ID:</strong> Clickable identifier</li>
                        <li><strong>Name, Status, Vehicle, Run, Certifications, Incidents, Communications</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2">Certification Tracking</h4>
                      <ul className="ml-5 space-y-1">
                        <li>CDL expiration: 90-day warning (yellow), expired (red)</li>
                        <li>Medical card: 60-day warning</li>
                        <li>Background check: 5-year cycle</li>
                        <li>Filter by: All Valid, Expiring Soon, Has Expired</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2">Driver Detail</h4>
                      <p>Full profile with certifications, assigned vehicle and routes, performance metrics (years of service, incident count, communication count, safety rating), recent incidents, and communication history.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Reports ─── */}
                <AccordionItem value="reports">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span style={{ fontFamily: 'var(--forge-font-family)' }}>Reports &amp; Analytics</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p>
                      The Reports page provides quick reports, a custom report builder, and a Weekly Trends Analysis dashboard.
                    </p>
                    <div>
                      <h4 className="mb-2">Quick Reports</h4>
                      <ul className="ml-5 space-y-1">
                        <li>All Open Incidents</li>
                        <li>High Severity Incidents</li>
                        <li>Incidents This Month</li>
                        <li>Incidents by Student</li>
                        <li>Incidents by Driver (with enriched driver names for student incidents)</li>
                        <li>Incidents by Run</li>
                        <li>Resolution Time Report</li>
                        <li>Monthly Summary</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2">Weekly Trends Analysis</h4>
                      <p className="mb-2">Dashboard view with:</p>
                      <ul className="ml-5 space-y-1">
                        <li>Week-over-week comparison metrics (current week, last week, high severity trends, 4-week average)</li>
                        <li>Weekly Incident Trend line chart</li>
                        <li>Top 5 incident types with progress bars</li>
                        <li>Severity Distribution by Week stacked bar chart</li>
                        <li>Key Insights section with automated analysis</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2">Custom Report Builder</h4>
                      <p>Select data fields, apply filters (using ForgeMultiSelect dropdowns), group by dimension, sort, preview, and export as CSV or PDF.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Administration ─── */}
                <AccordionItem value="admin">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span style={{ fontFamily: 'var(--forge-font-family)' }}>Administration</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p>
                      The Admin page provides system configuration across three tabbed sections. Access requires the Administrator role.
                    </p>

                    <div>
                      <h4 className="mb-2">User Roles Tab</h4>
                      <p className="mb-2">Full CRUD management of system users and their role assignments:</p>
                      <ul className="ml-5 space-y-1">
                        <li><strong>KPI Summary Cards:</strong> Total Users, Active Users, Roles in Use, and per-role counts</li>
                        <li><strong>User Table:</strong> ID, Name, Email, Roles (multi-select), Status, Last Login</li>
                        <li><strong>Search &amp; Filter:</strong> Search by name/email; filter by role</li>
                        <li><strong>Actions:</strong> Add new user, edit user, delete user</li>
                        <li><strong>7 Roles:</strong> Safety Coordinator, Administrator, School Principal, Driver, Fleet Manager, Nurse, Mechanic</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2">Email Templates Tab</h4>
                      <p className="mb-2">Manage notification email templates used by workflow step notifications:</p>
                      <ul className="ml-5 space-y-1">
                        <li><strong>5 System-Default Templates:</strong> Urgent Action Required, Approval Request, Custom Template, Parent/Guardian Notification, Escalation Notice</li>
                        <li><strong>Variable Placeholders:</strong> Templates use {`{{variable_name}}`} syntax (e.g., {`{{recipient_name}}`}, {`{{incident_id}}`}, {`{{step_name}}`}) that are populated when emails are sent</li>
                        <li><strong>Template Categories:</strong> Notification, Approval, Escalation, Completion, Custom</li>
                        <li><strong>Actions:</strong> Create new template, edit, duplicate, preview, delete</li>
                        <li><strong>Workflow Integration:</strong> Templates selected here appear in the Configure Step &rarr; Notifications &rarr; Email Template dropdown when building workflows</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2">Incident Types Tab</h4>
                      <p className="mb-2">Full CRUD management for all 47 incident types:</p>
                      <ul className="ml-5 space-y-1">
                        <li><strong>KPI Summary Cards:</strong> Total Types, Student Types (29), Driver Types (18), Categories (10)</li>
                        <li><strong>Type Table:</strong> ID, Label, Category, Description, Default Severity, Applies To</li>
                        <li><strong>Search &amp; Filter:</strong> Search by name/description; filter by category and &ldquo;Applies To&rdquo;</li>
                        <li><strong>Add/Edit Dialog:</strong> Configure label, category, description, default severity, and <strong>Applies To</strong> (only &ldquo;Student&rdquo; or &ldquo;Driver&rdquo; &mdash; &ldquo;Both&rdquo; is not an option)</li>
                        <li><strong>Delete:</strong> Remove custom incident types (system defaults are protected)</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* ─── Notifications ─── */}
                <AccordionItem value="notifications">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span style={{ fontFamily: 'var(--forge-font-family)' }}>Notifications</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p>
                      The system provides real-time notifications for important events.
                    </p>
                    <div>
                      <h4 className="mb-2">Notification Types</h4>
                      <ul className="ml-5 space-y-1">
                        <li><strong>New Incident Assigned:</strong> When an incident is assigned to you</li>
                        <li><strong>Workflow Step Assigned:</strong> When a step is assigned to your role</li>
                        <li><strong>Approval Requested:</strong> When your approval is needed</li>
                        <li><strong>Step Completed:</strong> When previous step completes and yours is next</li>
                        <li><strong>Incident Status Change:</strong> When incidents you track change status</li>
                        <li><strong>High Severity Alert:</strong> Immediate notification for high-severity incidents</li>
                        <li><strong>Overdue Items:</strong> Steps or communications past deadline</li>
                        <li><strong>Driver Communication:</strong> Delivery confirmations and acknowledgments</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2">Accessing Notifications</h4>
                      <ul className="ml-5 space-y-1">
                        <li>Click the bell icon in the top-right omnibar</li>
                        <li>Red badge shows count of unread notifications</li>
                        <li>Click any notification to navigate to the related record</li>
                        <li>Mark individual items as read or use &ldquo;Mark All as Read&rdquo;</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
              </div>
            </div>
          </ForgeCard>
        </TabsContent>

        {/* ═══════════════════  FAQ  ═══════════════════ */}
        <TabsContent value="faq">
          <ForgeCard style={sectionCard}>
            <div style={{ padding: 'var(--forge-spacing-medium)' }}>
              <h3 className="forge-typography--heading4" style={{ fontFamily: 'var(--forge-font-family)' }}>Frequently Asked Questions</h3>
              <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
              <Accordion type="single" collapsible className="w-full">

                {/* General */}
                <AccordionItem value="faq-1">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>How do I change the status of an incident?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p className="mb-2">To update an incident status:</p>
                    <ol className="ml-5 space-y-1">
                      <li>Click the incident row to open its detail page</li>
                      <li>Click the &ldquo;Edit&rdquo; button</li>
                      <li>Change the status dropdown (Pending, In Review, Resolved, Closed)</li>
                      <li>Add notes about the change</li>
                      <li>Click &ldquo;Save Changes&rdquo;</li>
                    </ol>
                    <p className="mt-2">
                      <strong>Note:</strong> Status changes are logged in the History tab and create notifications for relevant users.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>What&rsquo;s the difference between &ldquo;Student&rdquo; and &ldquo;Driver&rdquo; incident types?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <ul className="ml-5 space-y-2">
                      <li><strong>Student Incidents (29 types):</strong> Behavioral, safety, or other issues involving students during transportation. Categories include Behavioral, Safety Violation, Aggression/Violence, Driver Defiance, Property Damage, Prohibited Items, and Privacy Violation.</li>
                      <li><strong>Driver Incidents (18 types):</strong> Operational, safety, and vehicle events involving bus drivers. Categories include Driver Operational, Driver Safety, and Vehicle Incident.</li>
                    </ul>
                    <p className="mt-2">
                      Each incident type is assigned to exactly one category (&ldquo;Student&rdquo; or &ldquo;Driver&rdquo;). The &ldquo;Applies To&rdquo; field in Admin does not offer a &ldquo;Both&rdquo; option; each type belongs to one category.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>What&rsquo;s the difference between &ldquo;Resolved&rdquo; and &ldquo;Closed&rdquo;?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <ul className="ml-5 space-y-1">
                      <li><strong>Resolved:</strong> Actions have been taken but the incident may still need monitoring or follow-up. Remains active in some reports.</li>
                      <li><strong>Closed:</strong> Completely finalized with no further action. Archived from active counts but still searchable for historical analysis.</li>
                    </ul>
                    <p className="mt-2">General workflow: Pending &rarr; In Review &rarr; Resolved &rarr; Closed</p>
                  </AccordionContent>
                </AccordionItem>

                {/* Workflows */}
                <AccordionItem value="faq-4">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>What is a workflow and how does it help me?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p className="mb-2">
                      A workflow is a structured, step-by-step process that guides you through incident response according to district policies. Instead of remembering all the steps manually, the workflow:
                    </p>
                    <ul className="ml-5 space-y-1">
                      <li>Automatically assigns the right process based on incident type and severity (two-pass matching)</li>
                      <li>Tells you exactly what to do at each step with clear instructions</li>
                      <li>Assigns responsibility to specific roles</li>
                      <li>Enforces approval gates for critical decisions</li>
                      <li>Records completion timestamps and comments for full accountability</li>
                      <li>Sends email notifications using configurable templates</li>
                      <li>Provides a complete audit trail for compliance</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-5">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>How are workflows assigned to incidents?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p className="mb-2">The system uses a <strong>two-pass matching strategy</strong>:</p>
                    <ol className="ml-5 space-y-1">
                      <li><strong>Pass 1 (exact):</strong> Match on both incident type AND severity level</li>
                      <li><strong>Pass 2 (type-only):</strong> If no severity match, match on incident type alone</li>
                      <li><strong>Fallback:</strong> If no specific workflow matches, &ldquo;General Incident Review&rdquo; (WF-DEFAULT) is assigned</li>
                    </ol>
                    <p className="mt-2">
                      You can see the assigned workflow on the incident detail page&rsquo;s Overview and Workflow tabs.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-6">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>How do I complete a workflow step?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <ol className="ml-5 space-y-1">
                      <li>Open the incident&rsquo;s detail page and go to the <strong>Workflow</strong> tab</li>
                      <li>Find the current step (highlighted as &ldquo;In Progress&rdquo; or your assigned step)</li>
                      <li>Click <strong>&ldquo;Complete this step&rdquo;</strong></li>
                      <li>Enter completion comments describing actions taken, outcomes, and relevant details</li>
                      <li>If the step requires approval, it enters &ldquo;Pending Approval&rdquo; status</li>
                      <li>The system records your name, date/time, and comments</li>
                    </ol>
                    <p className="mt-2">
                      <strong>Important:</strong> All step progression is manual. There are no automated triggers &mdash; you must click &ldquo;Complete this step&rdquo; to advance.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-7">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>What happens when a step requires approval?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <ol className="ml-5 space-y-1">
                      <li>Assigned user completes the step with comments</li>
                      <li>Step changes to <strong>&ldquo;Pending Approval&rdquo;</strong></li>
                      <li>Approval request notification sent to designated approvers (using the Approval Request email template)</li>
                      <li>Workflow pauses until approval is granted</li>
                      <li>Approver can <strong>Approve</strong> (workflow continues) or <strong>Reject</strong> (step returns for revision)</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-8">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>Can I create a custom workflow for my district?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p className="mb-2">Yes! Navigate to the Workflows page and click &ldquo;+ Create New Workflow&rdquo;:</p>
                    <ol className="ml-5 space-y-1">
                      <li>Enter name and description</li>
                      <li>Select a <strong>specific incident type</strong> from the full list of 47 types (grouped by student vs. driver)</li>
                      <li>Choose a severity level (auto-populated from the selected incident type&rsquo;s default severity)</li>
                      <li>Add steps from the step library (simplified cards with name, description, and add button) or create custom steps</li>
                      <li>Configure email notifications per step (using Admin email templates)</li>
                      <li>Save and activate</li>
                    </ol>
                    <p className="mt-2">
                      <strong>Tip:</strong> Duplicate an existing workflow as a starting point &mdash; it&rsquo;s faster than building from scratch.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                {/* Admin */}
                <AccordionItem value="faq-9">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>How do I manage email templates?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p className="mb-2">Go to <strong>Admin &rarr; Email Templates</strong> tab:</p>
                    <ul className="ml-5 space-y-1">
                      <li>The system includes <strong>10 pre-built templates</strong> covering all workflow notification scenarios</li>
                      <li>Click any template to edit its subject, body, and variable placeholders</li>
                      <li>Use <strong>&ldquo;Duplicate&rdquo;</strong> to create a copy of an existing template for customization</li>
                      <li>Click <strong>&ldquo;Preview&rdquo;</strong> to see how the template looks with sample data</li>
                      <li>Create entirely new templates with the &ldquo;+ Create Template&rdquo; button</li>
                      <li>Templates use {`{{variable_name}}`} placeholders (e.g., {`{{recipient_name}}`}, {`{{incident_id}}`}) that are automatically replaced when emails are sent</li>
                    </ul>
                    <p className="mt-2">
                      Templates you create or edit here are immediately available in the Configure Step &rarr; Notifications &rarr; Email Template dropdown when building workflows.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-10">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>How do I add or edit incident types?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p className="mb-2">Go to <strong>Admin &rarr; Incident Types</strong> tab:</p>
                    <ul className="ml-5 space-y-1">
                      <li>Click <strong>&ldquo;+ Add Incident Type&rdquo;</strong> to create a new type</li>
                      <li>Set the label, category, description, and default severity</li>
                      <li>Select <strong>&ldquo;Applies To&rdquo;</strong>: choose &ldquo;Student&rdquo; or &ldquo;Driver&rdquo; (there is no &ldquo;Both&rdquo; option)</li>
                      <li>Edit existing types by clicking the edit icon on any row</li>
                      <li>Delete custom types (system defaults are protected)</li>
                      <li>Use search and category/applicableTo filters to find specific types</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-11">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>How do I manage user roles?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p className="mb-2">Go to <strong>Admin &rarr; User Roles</strong> tab:</p>
                    <ul className="ml-5 space-y-1">
                      <li>View all users with their assigned roles, status, and last login</li>
                      <li>Click <strong>&ldquo;+ Add User&rdquo;</strong> to create a new user record</li>
                      <li>Assign one or more of the 7 roles: Safety Coordinator, Administrator, School Principal, Driver, Fleet Manager, Nurse, Mechanic</li>
                      <li>Edit user details or toggle Active/Inactive status</li>
                      <li>Use the KPI cards to see total users, active count, and per-role breakdowns</li>
                      <li>Search by name/email and filter by role</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                {/* Communications */}
                <AccordionItem value="faq-12">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>How do I know if a driver has read my communication?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <ul className="ml-5 space-y-1">
                      <li>The status badge changes from &ldquo;Sent&rdquo; (gray) to &ldquo;Acknowledged&rdquo; (green)</li>
                      <li>Simulated delivered/read status indicators show delivery progress</li>
                      <li>You receive a notification when acknowledgment is received</li>
                      <li>Communications past deadline show in red with an alert icon</li>
                      <li>Filter by &ldquo;Pending&rdquo; or &ldquo;Unread&rdquo; to see items awaiting response</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                {/* Data & Export */}
                <AccordionItem value="faq-13">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>Can I export data for use in other systems?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <ul className="ml-5 space-y-1">
                      <li><strong>CSV Export:</strong> Available on Incidents, Students, Vehicles, and Drivers pages via the Export dropdown</li>
                      <li><strong>PDF Reports:</strong> Generate formatted reports from the Reports page</li>
                      <li><strong>Custom Reports:</strong> Use the report builder to select fields, filters, and grouping before export</li>
                    </ul>
                    <p className="mt-2">
                      All exports respect your current filter selections.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-14">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>How do I use the seat selection when creating a student incident?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <ol className="ml-5 space-y-1">
                      <li>In the new incident form, scroll to the &ldquo;Incident Location&rdquo; section</li>
                      <li>Click on a seat in the visual bus diagram &mdash; it turns red when selected</li>
                      <li>The seat number is automatically recorded</li>
                      <li>Click a different seat to change the selection</li>
                      <li>The diagram shows driver position and emergency exits for reference</li>
                    </ol>
                    <p className="mt-2">
                      This helps identify incident location patterns (e.g., frequent back-seat incidents) and supports seating interventions.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-15">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>Who has access to view incident data?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p className="mb-2">Access is role-based, managed in Admin &rarr; User Roles:</p>
                    <ul className="ml-5 space-y-1">
                      <li><strong>Safety Coordinators:</strong> Full CRUD on assigned incidents, messaging, reports</li>
                      <li><strong>Administrators:</strong> Complete system access including Admin configuration and workflow builder</li>
                      <li><strong>School Principals:</strong> View and participate in incidents involving their students</li>
                      <li><strong>Drivers:</strong> View incidents involving their bus, receive communications</li>
                      <li><strong>Fleet Managers:</strong> Manage vehicle incidents and maintenance workflows</li>
                      <li><strong>Nurses:</strong> Participate in behavioral/medical assessment workflow steps</li>
                      <li><strong>Mechanics:</strong> Handle repair-related workflow steps</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-16">
                  <AccordionTrigger style={{ fontFamily: 'var(--forge-font-family)' }}>Where can I see the complete audit trail for an incident?</AccordionTrigger>
                  <AccordionContent className="text-foreground" style={{ fontFamily: 'var(--forge-font-family)' }}>
                    <p className="mb-2">The <strong>History tab</strong> on the incident detail page provides a complete audit trail:</p>
                    <ul className="ml-5 space-y-1">
                      <li>Chronological timeline of all activities (most recent first)</li>
                      <li>Workflow steps with &ldquo;Completed by [User] on MM/DD/YYYY, HH:MM AM/PM&rdquo;</li>
                      <li>Status changes, communications, photos, and approvals</li>
                      <li>Filter by activity type (workflow steps only, communications, etc.)</li>
                      <li>Export complete history as PDF for compliance records</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
              </div>
            </div>
          </ForgeCard>
        </TabsContent>
      </Tabs>

      {/* Support Contact Card */}
      <ForgeCard style={{ boxShadow: 'var(--forge-elevation-2)', marginTop: 'var(--forge-spacing-large)' }}>
        <div style={{ padding: 'var(--forge-spacing-medium)' }}>
          <h3 className="forge-typography--heading4" style={{ fontFamily: 'var(--forge-font-family)' }}>Need Additional Help?</h3>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <p className="text-foreground mb-4" style={{ fontFamily: 'var(--forge-font-family)' }}>
              If you can&rsquo;t find the answer in this documentation, please contact your system administrator
              or the Transportation Technology team.
            </p>
          </div>
        </div>
      </ForgeCard>
    </div>
  );
}
