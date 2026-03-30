import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { IncidentsPage } from './components/incidents/IncidentsPage';
import { IncidentDetailPage } from './components/incidents/IncidentDetailPage';
import { StudentsPage } from './components/students/StudentsPage';
import { VehiclesPage } from './components/vehicles/VehiclesPage';
import { DriversPage } from './components/drivers/DriversPage';
import { ReportsPage } from './components/reports/ReportsPage';
import { CommunicationsPage } from './components/communications/CommunicationsPage';
import { NewIncidentForm } from './components/incidents/NewIncidentForm';
import { HelpPage } from './components/help/HelpPage';
import { WorkflowsPage } from './components/workflows/WorkflowsPage';
import { WorkflowBuilderPage } from './components/workflows/WorkflowBuilderPage';
import { AdminPage } from './components/admin/AdminPage';
import { Toaster } from './components/ui/sonner';
import { assignWorkflowToIncident, workflows } from './data/workflows';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCommIncidentId, setSelectedCommIncidentId] = useState<string | null>(null);
  const [newCommIncidentData, setNewCommIncidentData] = useState<any | null>(null);
  const [selectedIncidentForDetail, setSelectedIncidentForDetail] = useState<any | null>(null);
  const [incidentsAssignedToFilter, setIncidentsAssignedToFilter] = useState<string | null>(null);
  const [incidentsStatusFilter, setIncidentsStatusFilter] = useState<string | null>(null);
  const [incidentsSeverityFilter, setIncidentsSeverityFilter] = useState<string | null>(null);
  const [incidentsDateAfterFilter, setIncidentsDateAfterFilter] = useState<string | null>(null);
  const [sortedFilteredIncidents, setSortedFilteredIncidents] = useState<any[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any | null>(null);
  const [studentsActiveIncidentsFilter, setStudentsActiveIncidentsFilter] = useState(false);

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
    // Clear selected incident when navigating to a different page
    if (page !== 'communications') {
      setSelectedCommIncidentId(null);
      setNewCommIncidentData(null);
    }
    if (page !== 'incident-detail') {
      setSelectedIncidentForDetail(null);
    }
    // Clear incidents filters when navigating to a different page
    if (page !== 'incidents') {
      setIncidentsAssignedToFilter(null);
      setIncidentsStatusFilter(null);
      setIncidentsSeverityFilter(null);
      setIncidentsDateAfterFilter(null);
    }
    // Clear students filters when navigating away
    if (page !== 'students') {
      setStudentsActiveIncidentsFilter(false);
    }
    // Clear selected workflow when navigating away from workflow-builder
    if (page !== 'workflow-builder') {
      setSelectedWorkflow(null);
    }
  };

  const navigateToMyIncidents = (assignedTo: string) => {
    setIncidentsAssignedToFilter(assignedTo);
    setIncidentsStatusFilter('Open');
    setIncidentsSeverityFilter(null);
    setIncidentsDateAfterFilter(null);
    setCurrentPage('incidents');
  };

  const navigateToFilteredIncidents = (filters: { status?: string; severity?: string; dateAfter?: string }) => {
    setIncidentsStatusFilter(filters.status || null);
    setIncidentsSeverityFilter(filters.severity || null);
    setIncidentsDateAfterFilter(filters.dateAfter || null);
    setIncidentsAssignedToFilter(null);
    setCurrentPage('incidents');
  };

  const navigateToStudentsWithActiveIncidents = () => {
    setStudentsActiveIncidentsFilter(true);
    setCurrentPage('students');
  };

  const navigateToCommunication = (incidentId: string, incidentData?: any) => {
    setSelectedCommIncidentId(incidentId);
    setNewCommIncidentData(incidentData || null);
    setCurrentPage('communications');
  };

  const navigateToIncidentDetail = (incident: any) => {
    // Enrich incident with workflow if not already present
    let enrichedIncident = incident;
    
    if (!incident.workflow && incident.type && incident.severity) {
      // Get default workflow for fallback
      const defaultWorkflow = workflows.find(w => w.id === 'WF-DEFAULT');
      
      // Assign workflow based on incident type and severity
      const workflow = assignWorkflowToIncident(incident.type, incident.severity) || defaultWorkflow;
      
      if (workflow) {
        // For open incidents, set appropriate step statuses
        if (incident.status === 'Open') {
          const updatedSteps = workflow.steps.map((step: any, index: number) => {
            if (index === 0) {
              return { 
                ...step, 
                status: 'Completed' as const,
                completedDate: `${incident.date} 7:50 AM`,
                completedBy: incident.driver,
                comments: 'Immediate action taken as per protocol',
              };
            } else if (index === 1) {
              // For high severity incidents, second step might need approval
              if (step.requiresApproval) {
                return { ...step, status: 'Pending Approval' as const };
              }
              return { ...step, status: 'In Progress' as const };
            }
            return step;
          });
          
          enrichedIncident = {
            ...incident,
            workflow: { ...workflow, steps: updatedSteps },
          };
        } else {
          enrichedIncident = {
            ...incident,
            workflow: workflow,
          };
        }
      }
    }
    
    setSelectedIncidentForDetail(enrichedIncident);
    setCurrentPage('incident-detail');
  };

  const navigateToWorkflowBuilder = (workflow: any) => {
    setSelectedWorkflow(workflow);
    setCurrentPage('workflow-builder');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={navigateToPage} onNavigateToCommunication={navigateToCommunication} onNavigateToMyIncidents={navigateToMyIncidents} onNavigateToIncidentDetail={navigateToIncidentDetail} onNavigateToFilteredIncidents={navigateToFilteredIncidents} onNavigateToStudentsWithActiveIncidents={navigateToStudentsWithActiveIncidents} />;
      case 'incidents':
        return <IncidentsPage 
          onNavigate={navigateToPage} 
          onNavigateToCommunication={navigateToCommunication} 
          onNavigateToIncidentDetail={navigateToIncidentDetail} 
          initialAssignedToFilter={incidentsAssignedToFilter} 
          initialStatusFilter={incidentsStatusFilter}
          initialSeverityFilter={incidentsSeverityFilter}
          initialDateAfterFilter={incidentsDateAfterFilter}
          onSortedFilteredIncidentsChange={setSortedFilteredIncidents}
        />;
      case 'incident-detail':
        return selectedIncidentForDetail ? (
          <IncidentDetailPage 
            incident={selectedIncidentForDetail} 
            onNavigate={navigateToPage} 
            onNavigateToCommunication={navigateToCommunication}
            allIncidents={sortedFilteredIncidents}
            onNavigateToIncident={navigateToIncidentDetail}
          />
        ) : (
          <IncidentsPage 
            onNavigate={navigateToPage} 
            onNavigateToCommunication={navigateToCommunication} 
            onNavigateToIncidentDetail={navigateToIncidentDetail} 
            initialAssignedToFilter={incidentsAssignedToFilter} 
            initialStatusFilter={incidentsStatusFilter}
            initialSeverityFilter={incidentsSeverityFilter}
            initialDateAfterFilter={incidentsDateAfterFilter}
            onSortedFilteredIncidentsChange={setSortedFilteredIncidents}
          />
        );
      case 'students':
        return <StudentsPage onNavigate={navigateToPage} initialActiveIncidentsFilter={studentsActiveIncidentsFilter} onNavigateToIncidentDetail={navigateToIncidentDetail} />;
      case 'drivers':
        return <DriversPage onNavigate={navigateToPage} />;
      case 'vehicles':
        return <VehiclesPage onNavigate={navigateToPage} />;
      case 'communications':
        return <CommunicationsPage initialIncidentId={selectedCommIncidentId} initialIncidentData={newCommIncidentData} />;
      case 'reports':
        return <ReportsPage onNavigate={navigateToPage} />;
      case 'new-incident':
        return <NewIncidentForm onNavigate={navigateToPage} />;
      case 'workflows':
        return <WorkflowsPage onNavigate={navigateToPage} onNavigateToWorkflowBuilder={navigateToWorkflowBuilder} />;
      case 'workflow-builder':
        return <WorkflowBuilderPage onNavigate={navigateToPage} selectedWorkflow={selectedWorkflow} />;
      case 'admin':
        return <AdminPage onNavigate={navigateToPage} />;
      case 'help':
        return <HelpPage />;
      default:
        return <DashboardPage onNavigate={navigateToPage} onNavigateToCommunication={navigateToCommunication} onNavigateToMyIncidents={navigateToMyIncidents} />;
    }
  };

  return (
    <>
      <AppLayout 
        currentPage={currentPage} 
        onNavigate={navigateToPage}
        onNavigateToCommunication={navigateToCommunication}
      >
        {renderPage()}
      </AppLayout>
      <Toaster />
    </>
  );
}