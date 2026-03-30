import { useState, useEffect, useRef, useMemo } from 'react';
import { ForgeCard } from '@tylertech/forge-react';
import { defineCardComponent } from '@tylertech/forge';
defineCardComponent();
import { ForgeButton } from '@tylertech/forge-react';
import { defineButtonComponent } from '@tylertech/forge';
defineButtonComponent();
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ForgeMultiSelect } from '../ui/forge-multiselect';
import { Search, Download, Plus, MessageSquare, ArrowUpDown, ArrowUp, ArrowDown, Check, Camera, X, ZoomIn, GitBranch, AlertCircle, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { EditIncidentDialog } from './EditIncidentDialog';
import { NewIncidentForm } from './NewIncidentForm';
import { hasActiveCommunication } from '../communications/communicationsData';
import { toast } from 'sonner';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';
import { IncidentWorkflowProgress } from './IncidentWorkflowProgress';
import { assignWorkflowToIncident, Workflow, workflows } from '../../data/workflows';
import { ExportDropdown } from '../shared/ExportDropdown';
import type { ExportFormat } from '../shared/ExportDropdown';

// Get default workflow for direct reference
const defaultWorkflow = workflows.find(w => w.id === 'WF-DEFAULT');

const mockIncidents = [
  {
    id: 'INC-2025-0062',
    date: '2025-02-26',
    student: 'Justin Rivera',
    studentId: 'STU-1894',
    type: 'Seat Refusal',
    description: 'Moved seats without permission',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'Low',
    status: 'Closed',
    createdBy: 'Michael Chen',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0061',
    date: '2025-02-27',
    student: 'Kayla Bailey',
    studentId: 'STU-9783',
    type: 'Taunting/Bullying',
    description: 'Spreading rumors and excluding another student',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'High',
    status: 'Open',
    createdBy: 'Lisa Anderson',
    assignedTo: 'Sarah Williams',
    documents: [
      {
        id: 'doc-1',
        name: 'Witness-Statement-Form.pdf',
        size: '245 KB',
        type: 'application/pdf',
        uploadedBy: 'Lisa Anderson',
        uploadedAt: '2025-02-27 02:45 PM'
      },
      {
        id: 'doc-2',
        name: 'Student-Behavior-Policy.pdf',
        size: '1.2 MB',
        type: 'application/pdf',
        uploadedBy: 'Sarah Williams',
        uploadedAt: '2025-02-28 09:15 AM'
      }
    ]
  },
  {
    id: 'INC-2025-0060',
    date: '2025-02-28',
    student: 'Nathan Richardson',
    studentId: 'STU-8672',
    type: 'Disruptive Volume',
    description: 'Playing videos on phone at high volume',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'Medium',
    status: 'Closed',
    createdBy: 'David Park',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0059',
    date: '2025-03-01',
    student: 'Brianna Cooper',
    studentId: 'STU-7561',
    type: 'Physical Altercation',
    description: 'Hit another student with backpack',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Jennifer Martinez',
    severity: 'High',
    status: 'Open',
    createdBy: 'Jennifer Martinez',
    assignedTo: 'Sarah Williams',
    photos: [
      {
        id: 'photo-7',
        url: 'https://images.unsplash.com/photo-1764083029045-4c45c365b710?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1764083029045-4c45c365b710?w=200&h=150&fit=crop',
        uploadedBy: 'Jennifer Martinez',
        uploadedAt: '2025-03-01 07:42 AM',
        caption: 'Altercation location on bus'
      }
    ],
    documents: [
      {
        id: 'doc-7',
        name: 'Incident-Report-Physical.pdf',
        size: '178 KB',
        type: 'application/pdf',
        uploadedBy: 'Jennifer Martinez',
        uploadedAt: '2025-03-01 08:15 AM'
      },
      {
        id: 'doc-8',
        name: 'Student-Injury-Assessment.pdf',
        size: '92 KB',
        type: 'application/pdf',
        uploadedBy: 'Sarah Williams',
        uploadedAt: '2025-03-01 10:30 AM'
      }
    ]
  },
  {
    id: 'INC-2025-0058',
    date: '2025-03-02',
    student: 'Dylan Bell',
    studentId: 'STU-6450',
    type: 'Offensive Language',
    description: 'Using inappropriate language with other students',
    bus: 'Bus 14',
    route: 'Roosevelt High AM - Red',
    driver: 'Robert Thompson',
    severity: 'Medium',
    status: 'Closed',
    createdBy: 'Robert Thompson',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0057',
    date: '2025-03-03',
    student: 'Alexis Morgan',
    studentId: 'STU-5349',
    type: 'Eating/Drinking Violation',
    description: 'Eating messy food and leaving trash on floor',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'Medium',
    status: 'Open',
    createdBy: 'Michael Chen',
    assignedTo: 'Sarah Williams',
    photos: [
      {
        id: 'photo-8',
        url: 'https://images.unsplash.com/photo-1764083029045-4c45c365b710?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1764083029045-4c45c365b710?w=200&h=150&fit=crop',
        uploadedBy: 'Michael Chen',
        uploadedAt: '2025-03-03 07:52 AM',
        caption: 'Food debris on floor'
      }
    ]
  },
  {
    id: 'INC-2025-0056',
    date: '2025-03-04',
    student: 'Jacob Cook',
    studentId: 'STU-4238',
    type: 'Window Misuse',
    description: 'Hanging arm out window while bus moving',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'Medium',
    status: 'In Progress',
    createdBy: 'Lisa Anderson',
    assignedTo: 'Jane Doe',
    photos: [
      {
        id: 'photo-9',
        url: 'https://images.unsplash.com/photo-1764083029047-6c9b160d3554?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1764083029047-6c9b160d3554?w=200&h=150&fit=crop',
        uploadedBy: 'Lisa Anderson',
        uploadedAt: '2025-03-04 03:15 PM',
        caption: 'Student at window'
      }
    ],
    documents: [
      {
        id: 'doc-9',
        name: 'Safety-Violation-Window.pdf',
        size: '134 KB',
        type: 'application/pdf',
        uploadedBy: 'Lisa Anderson',
        uploadedAt: '2025-03-04 03:20 PM'
      }
    ]
  },
  {
    id: 'INC-2025-0055',
    date: '2025-03-05',
    student: 'Samantha Reed',
    studentId: 'STU-3127',
    type: 'Vandalism',
    description: 'Drew on window with marker',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'Medium',
    status: 'Open',
    createdBy: 'David Park',
    assignedTo: 'Sarah Williams',
    photos: [
      {
        id: 'photo-10',
        url: 'https://images.unsplash.com/photo-1708831736377-9387cd8dec1c?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1708831736377-9387cd8dec1c?w=200&h=150&fit=crop',
        uploadedBy: 'David Park',
        uploadedAt: '2025-03-05 08:05 AM',
        caption: 'Marker vandalism on window'
      }
    ],
    documents: [
      {
        id: 'doc-10',
        name: 'Vandalism-Report.pdf',
        size: '201 KB',
        type: 'application/pdf',
        uploadedBy: 'David Park',
        uploadedAt: '2025-03-05 08:10 AM'
      },
      {
        id: 'doc-11',
        name: 'Repair-Cost-Estimate.pdf',
        size: '67 KB',
        type: 'application/pdf',
        uploadedBy: 'Sarah Williams',
        uploadedAt: '2025-03-05 11:00 AM'
      }
    ]
  },
  {
    id: 'INC-2025-0054',
    date: '2025-03-06',
    student: 'Andrew Rogers',
    studentId: 'STU-2016',
    type: 'Disruptive Volume',
    description: 'Yelling and making loud noises',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Jennifer Martinez',
    severity: 'Low',
    status: 'Closed',
    createdBy: 'Jennifer Martinez',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0053',
    date: '2025-03-07',
    student: 'Hannah Morris',
    studentId: 'STU-1905',
    type: 'Taunting/Bullying',
    description: 'Making fun of another student repeatedly',
    bus: 'Bus 14',
    route: 'Roosevelt High AM - Red',
    driver: 'Robert Thompson',
    severity: 'Medium',
    status: 'Open',
    createdBy: 'Robert Thompson',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0052',
    date: '2025-03-08',
    student: 'Tyler Stewart',
    studentId: 'STU-9894',
    type: 'Physical Altercation',
    description: 'Grabbed and pushed another student in argument',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'High',
    status: 'Open',
    createdBy: 'Michael Chen',
    assignedTo: 'Sarah Williams',
    photos: [
      {
        id: 'photo-11',
        url: 'https://images.unsplash.com/photo-1764083029045-4c45c365b710?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1764083029045-4c45c365b710?w=200&h=150&fit=crop',
        uploadedBy: 'Michael Chen',
        uploadedAt: '2025-03-08 07:58 AM',
        caption: 'Location of incident on bus'
      },
      {
        id: 'photo-12',
        url: 'https://images.unsplash.com/photo-1764703810989-1c69e849f8f3?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1764703810989-1c69e849f8f3?w=200&h=150&fit=crop',
        uploadedBy: 'Michael Chen',
        uploadedAt: '2025-03-08 07:59 AM',
        caption: 'View from driver position'
      }
    ],
    documents: [
      {
        id: 'doc-12',
        name: 'Physical-Altercation-Report.pdf',
        size: '189 KB',
        type: 'application/pdf',
        uploadedBy: 'Michael Chen',
        uploadedAt: '2025-03-08 08:30 AM'
      },
      {
        id: 'doc-13',
        name: 'Witness-Statements.pdf',
        size: '312 KB',
        type: 'application/pdf',
        uploadedBy: 'Sarah Williams',
        uploadedAt: '2025-03-08 02:15 PM'
      }
    ]
  },
  {
    id: 'INC-2025-0051',
    date: '2025-03-09',
    student: 'Natalie Collins',
    studentId: 'STU-8783',
    type: 'Offensive Language',
    description: 'Directed profanity at driver when asked to quiet down',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'High',
    status: 'Open',
    createdBy: 'Lisa Anderson',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0050',
    date: '2025-03-10',
    student: 'Brandon Edwards',
    studentId: 'STU-7672',
    type: 'Emergency Exit Misuse',
    description: 'Touched emergency exit release without permission',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'High',
    status: 'In Progress',
    createdBy: 'David Park',
    assignedTo: 'Jane Doe',
    photos: [
      {
        id: 'photo-13',
        url: 'https://images.unsplash.com/photo-1675853628373-f079f2ff0e52?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1675853628373-f079f2ff0e52?w=200&h=150&fit=crop',
        uploadedBy: 'David Park',
        uploadedAt: '2025-03-10 08:22 AM',
        caption: 'Emergency exit door'
      }
    ],
    documents: [
      {
        id: 'doc-14',
        name: 'Emergency-Exit-Incident.pdf',
        size: '167 KB',
        type: 'application/pdf',
        uploadedBy: 'David Park',
        uploadedAt: '2025-03-10 08:30 AM'
      },
      {
        id: 'doc-15',
        name: 'Safety-Protocol-Review.pdf',
        size: '543 KB',
        type: 'application/pdf',
        uploadedBy: 'Jane Doe',
        uploadedAt: '2025-03-10 01:45 PM'
      }
    ]
  },
  {
    id: 'INC-2025-0049',
    date: '2025-03-11',
    student: 'Chloe Evans',
    studentId: 'STU-6561',
    type: 'Eating/Drinking Violation',
    description: 'Spilled juice on seat and floor',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Jennifer Martinez',
    severity: 'Low',
    status: 'Closed',
    createdBy: 'Jennifer Martinez',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0048',
    date: '2025-03-12',
    student: 'Joshua Parker',
    studentId: 'STU-5450',
    type: 'Seat Refusal',
    description: 'Refused assigned seat and sat in restricted area',
    bus: 'Bus 14',
    route: 'Roosevelt High AM - Red',
    driver: 'Robert Thompson',
    severity: 'Medium',
    status: 'Open',
    createdBy: 'Robert Thompson',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0047',
    date: '2025-03-13',
    student: 'Madison Turner',
    studentId: 'STU-4349',
    type: 'Window Misuse',
    description: 'Opening and closing window repeatedly',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'Low',
    status: 'Closed',
    createdBy: 'Michael Chen',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0046',
    date: '2025-03-14',
    student: 'Ryan Campbell',
    studentId: 'STU-3238',
    type: 'Vandalism',
    description: 'Carved initials into seat back',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'Medium',
    status: 'In Progress',
    createdBy: 'Lisa Anderson',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0045',
    date: '2025-03-15',
    student: 'Grace Phillips',
    studentId: 'STU-2127',
    type: 'Taunting/Bullying',
    description: 'Repeatedly teasing younger student about appearance',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Jennifer Martinez',
    severity: 'High',
    status: 'Open',
    createdBy: 'Jennifer Martinez',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0044',
    date: '2025-03-16',
    student: 'Christopher Adams',
    studentId: 'STU-1016',
    type: 'Physical Altercation',
    description: 'Pushed another student causing minor injury',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'High',
    status: 'Open',
    createdBy: 'David Park',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0043',
    date: '2025-03-16',
    student: 'Victoria Martinez',
    studentId: 'STU-9905',
    type: 'Disruptive Volume',
    description: 'Playing music loudly on phone without headphones',
    bus: 'Bus 14',
    route: 'Roosevelt High AM - Red',
    driver: 'Robert Thompson',
    severity: 'Medium',
    status: 'Open',
    createdBy: 'Robert Thompson',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0042',
    date: '2025-03-15',
    student: 'Sarah Mitchell',
    studentId: 'STU-2891',
    type: 'Seat Refusal',
    description: 'Student refused to remain seated during transport',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'Medium',
    status: 'Open',
    createdBy: 'Michael Chen',
    assignedTo: 'Sarah Williams',
    photos: [
      {
        id: 'photo-1',
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=150&fit=crop',
        uploadedBy: 'Michael Chen',
        uploadedAt: '2025-03-15 08:15 AM',
        caption: 'Student standing in aisle'
      },
      {
        id: 'photo-2',
        url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=200&h=150&fit=crop',
        uploadedBy: 'Michael Chen',
        uploadedAt: '2025-03-15 08:16 AM',
        caption: 'View from driver mirror'
      }
    ],
    documents: [
      {
        id: 'doc-3',
        name: 'Safety-Violation-Report.pdf',
        size: '156 KB',
        type: 'application/pdf',
        uploadedBy: 'Michael Chen',
        uploadedAt: '2025-03-15 08:20 AM'
      },
      {
        id: 'doc-4',
        name: 'Bus-Camera-Footage-Transcript.pdf',
        size: '89 KB',
        type: 'application/pdf',
        uploadedBy: 'Sarah Williams',
        uploadedAt: '2025-03-15 10:30 AM'
      },
      {
        id: 'doc-5',
        name: 'Parent-Notification-Letter.pdf',
        size: '124 KB',
        type: 'application/pdf',
        uploadedBy: 'Sarah Williams',
        uploadedAt: '2025-03-15 02:45 PM'
      },
      {
        id: 'doc-6',
        name: 'Student-Seating-Chart.xlsx',
        size: '45 KB',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        uploadedBy: 'Michael Chen',
        uploadedAt: '2025-03-15 08:25 AM'
      }
    ]
  },
  {
    id: 'INC-2025-0041',
    date: '2025-03-15',
    student: 'Marcus Johnson',
    studentId: 'STU-3421',
    type: 'Emergency Exit Misuse',
    description: 'Student attempted to open emergency exit during normal transport',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'High',
    status: 'In Progress',
    createdBy: 'Lisa Anderson',
    assignedTo: 'Jane Doe',
    photos: [
      {
        id: 'photo-3',
        url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&h=150&fit=crop',
        uploadedBy: 'Lisa Anderson',
        uploadedAt: '2025-03-15 03:42 PM',
        caption: 'Emergency exit door area'
      }
    ]
  },
  {
    id: 'INC-2025-0040',
    date: '2025-03-14',
    student: 'Emma Rodriguez',
    studentId: 'STU-1956',
    type: 'Taunting/Bullying',
    description: 'Verbal altercation with another student',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'High',
    status: 'Open',
    createdBy: 'David Park',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0039',
    date: '2025-03-14',
    student: 'James Thompson',
    studentId: 'STU-4782',
    type: 'Vandalism',
    description: 'Seat cushion torn - monetary restitution required',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'Low',
    status: 'Closed',
    createdBy: 'Michael Chen',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0038',
    date: '2025-03-13',
    student: 'Olivia Davis',
    studentId: 'STU-5623',
    type: 'Offensive Language',
    description: 'Using profane and offensive language toward other students',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'Medium',
    status: 'In Progress',
    createdBy: 'Lisa Anderson',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0037',
    date: '2025-03-12',
    student: 'Noah Wilson',
    studentId: 'STU-6891',
    type: 'Physical Altercation',
    description: 'Physical fight with another student',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'High',
    status: 'Open',
    createdBy: 'David Park',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0036',
    date: '2025-03-10',
    student: 'Sophia Garcia',
    studentId: 'STU-7234',
    type: 'Eating/Drinking Violation',
    description: 'Student eating snacks and spilled drink on seat',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Robert Martinez',
    severity: 'Low',
    status: 'Closed',
    createdBy: 'Robert Martinez',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0035',
    date: '2025-03-08',
    student: 'Liam Brown',
    studentId: 'STU-8512',
    type: 'Window Misuse',
    description: 'Opening windows excessively and throwing paper outside',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    driver: 'Michael Chen',
    severity: 'Medium',
    status: 'Closed',
    createdBy: 'Michael Chen',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0034',
    date: '2025-03-07',
    student: 'Ava Martinez',
    studentId: 'STU-9123',
    type: 'Disruptive Volume',
    description: 'Excessive noise and screaming, disturbing driver',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'Medium',
    status: 'Closed',
    createdBy: 'David Park',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0033',
    date: '2025-03-05',
    student: 'Ethan Lee',
    studentId: 'STU-1045',
    type: 'Seat Refusal',
    description: 'Refused assigned seat and moved multiple times',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'Low',
    status: 'Closed',
    createdBy: 'Lisa Anderson',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0032',
    date: '2025-02-28',
    student: 'Isabella White',
    studentId: 'STU-2387',
    type: 'Taunting/Bullying',
    description: 'Continued verbal harassment of younger student',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Robert Martinez',
    severity: 'High',
    status: 'Closed',
    createdBy: 'Robert Martinez',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0031',
    date: '2025-02-26',
    student: 'Mason Taylor',
    studentId: 'STU-3498',
    type: 'Offensive Language',
    description: 'Repeated use of profanity despite warnings',
    bus: 'Bus 4',
    route: 'Eastside Middle AM - Teal',
    driver: 'Marcus Washington',
    severity: 'Medium',
    status: 'Closed',
    createdBy: 'Marcus Washington',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0030',
    date: '2025-02-24',
    student: 'Charlotte Anderson',
    studentId: 'STU-4561',
    type: 'Vandalism',
    description: 'Writing on seat backs with permanent marker',
    bus: 'Bus 6',
    route: 'Oakwood Elementary AM - Bronze',
    driver: 'Angela Foster',
    severity: 'Medium',
    status: 'Closed',
    createdBy: 'Angela Foster',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0029',
    date: '2025-02-21',
    student: 'Aiden Thomas',
    studentId: 'STU-5672',
    type: 'Physical Altercation',
    description: 'Pushing and shoving with another student in aisle',
    bus: 'Bus 11',
    route: 'Hillcrest High AM - Crimson',
    driver: 'Thomas Nguyen',
    severity: 'High',
    status: 'Closed',
    createdBy: 'Thomas Nguyen',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0028',
    date: '2025-02-19',
    student: 'Mia Jackson',
    studentId: 'STU-6783',
    type: 'Disruptive Volume',
    description: 'Playing loud music from phone speaker',
    bus: 'Bus 5',
    route: 'Riverside Elementary AM - Violet',
    driver: 'Sandra Brooks',
    severity: 'Low',
    status: 'Closed',
    createdBy: 'Sandra Brooks',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0027',
    date: '2025-02-15',
    student: 'Lucas Harris',
    studentId: 'STU-7894',
    type: 'Emergency Exit Misuse',
    description: 'Tampering with emergency exit door mechanism',
    bus: 'Bus 10',
    route: 'Parkview Middle AM - Navy',
    driver: 'Derek Coleman',
    severity: 'High',
    status: 'Closed',
    createdBy: 'Derek Coleman',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0026',
    date: '2025-02-12',
    student: 'Harper Clark',
    studentId: 'STU-8905',
    type: 'Eating/Drinking Violation',
    description: 'Spilled soda creating slipping hazard',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'Medium',
    status: 'Closed',
    createdBy: 'David Park',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0025',
    date: '2025-02-10',
    student: 'Benjamin Lewis',
    studentId: 'STU-9016',
    type: 'Seat Refusal',
    description: 'Standing in aisle during transport despite warnings',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'Medium',
    status: 'Closed',
    createdBy: 'Lisa Anderson',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0024',
    date: '2025-02-07',
    student: 'Amelia Robinson',
    studentId: 'STU-1127',
    type: 'Window Misuse',
    description: 'Hanging objects out window while bus moving',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    driver: 'Robert Martinez',
    severity: 'High',
    status: 'Closed',
    createdBy: 'Robert Martinez',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0023',
    date: '2025-02-05',
    student: 'Henry Walker',
    studentId: 'STU-2238',
    type: 'Offensive Language',
    description: 'Directing profanity at driver',
    bus: 'Bus 4',
    route: 'Eastside Middle AM - Teal',
    driver: 'Marcus Washington',
    severity: 'High',
    status: 'Closed',
    createdBy: 'Marcus Washington',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0022',
    date: '2025-02-03',
    student: 'Evelyn Hall',
    studentId: 'STU-3349',
    type: 'Taunting/Bullying',
    description: 'Name-calling and mocking another student',
    bus: 'Bus 6',
    route: 'Oakwood Elementary AM - Bronze',
    driver: 'Angela Foster',
    severity: 'Medium',
    status: 'Closed',
    createdBy: 'Angela Foster',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0021',
    date: '2025-01-31',
    student: 'Alexander Young',
    studentId: 'STU-4450',
    type: 'Vandalism',
    description: 'Scratching window with metal object',
    bus: 'Bus 11',
    route: 'Hillcrest High AM - Crimson',
    driver: 'Thomas Nguyen',
    severity: 'Medium',
    status: 'Closed',
    createdBy: 'Thomas Nguyen',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0020',
    date: '2025-01-28',
    student: 'Abigail King',
    studentId: 'STU-5561',
    type: 'Disruptive Volume',
    description: 'Yelling and screaming, refusing to quiet down',
    bus: 'Bus 10',
    route: 'Parkview Middle AM - Navy',
    driver: 'Derek Coleman',
    severity: 'Medium',
    status: 'Closed',
    createdBy: 'Derek Coleman',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0019',
    date: '2025-01-24',
    student: 'Daniel Wright',
    studentId: 'STU-6672',
    type: 'Physical Altercation',
    description: 'Kicked another student during argument',
    bus: 'Bus 4',
    route: 'Eastside Middle AM - Teal',
    driver: 'Marcus Washington',
    severity: 'High',
    status: 'Closed',
    createdBy: 'Marcus Washington',
    assignedTo: 'Jane Doe',
  },
  {
    id: 'INC-2025-0018',
    date: '2025-01-21',
    student: 'Emily Scott',
    studentId: 'STU-7783',
    type: 'Eating/Drinking Violation',
    description: 'Eating messy food and littering wrappers',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    driver: 'David Park',
    severity: 'Low',
    status: 'Closed',
    createdBy: 'David Park',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 'INC-2025-0017',
    date: '2025-01-17',
    student: 'Matthew Green',
    studentId: 'STU-8894',
    type: 'Seat Refusal',
    description: 'Changed seats multiple times causing disruption',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    driver: 'Lisa Anderson',
    severity: 'Low',
    status: 'Closed',
    createdBy: 'Lisa Anderson',
    assignedTo: 'Jane Doe',
  },
];

interface IncidentsPageProps {
  onNavigate: (page: string) => void;
  onNavigateToCommunication: (incidentId: string, incidentData?: any) => void;
  onNavigateToIncidentDetail: (incident: any) => void;
  initialAssignedToFilter?: string | null;
  initialStatusFilter?: string | null;
  initialSeverityFilter?: string | null;
  initialDateAfterFilter?: string | null;
  onSortedFilteredIncidentsChange?: (incidents: any[]) => void;
}

type SortField = 'id' | 'date' | 'student' | 'type' | 'severity' | 'status' | 'workflow';
type SortDirection = 'asc' | 'desc' | null;

export function IncidentsPage({ onNavigate, onNavigateToCommunication, onNavigateToIncidentDetail, initialAssignedToFilter = null, initialStatusFilter = null, initialSeverityFilter = null, initialDateAfterFilter = null, onSortedFilteredIncidentsChange }: IncidentsPageProps) {
  // Active (committed) filter values — used to actually filter the table
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>(initialStatusFilter ? [initialStatusFilter] : []);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [assignedToFilter, setAssignedToFilter] = useState<string[]>(initialAssignedToFilter ? [initialAssignedToFilter] : []);
  const [severityFilter, setSeverityFilter] = useState<string[]>(initialSeverityFilter ? [initialSeverityFilter] : []);
  const [dateAfterFilter, setDateAfterFilter] = useState(initialDateAfterFilter || '');

  // Pending (uncommitted) filter values — updated by inputs, applied on Search click
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [pendingStatusFilter, setPendingStatusFilter] = useState<string[]>(initialStatusFilter ? [initialStatusFilter] : []);
  const [pendingTypeFilter, setPendingTypeFilter] = useState<string[]>([]);
  const [pendingAssignedToFilter, setPendingAssignedToFilter] = useState<string[]>(initialAssignedToFilter ? [initialAssignedToFilter] : []);
  const [pendingSeverityFilter, setPendingSeverityFilter] = useState<string[]>(initialSeverityFilter ? [initialSeverityFilter] : []);
  const [pendingDateAfterFilter, setPendingDateAfterFilter] = useState(initialDateAfterFilter || '');

  const [isNewIncidentDialogOpen, setIsNewIncidentDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [studentLookupOpen, setStudentLookupOpen] = useState(false);
  const [showAllIncidents, setShowAllIncidents] = useState(
    !!(initialSeverityFilter || initialDateAfterFilter || initialStatusFilter)
  );
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const studentLookupRef = useRef<HTMLDivElement>(null);

  // Enrich incidents with workflow data
  const incidentsWithWorkflows = mockIncidents.map((incident) => {
    const workflow = assignWorkflowToIncident(incident.type, incident.severity) || defaultWorkflow;
    
    // For open incidents with workflows, set appropriate step statuses
    if (workflow && incident.status === 'Open') {
      // Mark first step as completed and second step as in progress
      const updatedSteps = workflow.steps.map((step, index) => {
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
      
      return {
        ...incident,
        workflow: { ...workflow, steps: updatedSteps },
      };
    }
    
    return {
      ...incident,
      workflow: workflow,
    };
  });

  // Get unique students from incidents for lookup
  const uniqueStudents = Array.from(
    new Map(
      mockIncidents.map(inc => [inc.studentId, { id: inc.studentId, name: inc.student }])
    ).values()
  );

  // Get unique assigned users
  const uniqueAssignedUsers = Array.from(
    new Set(mockIncidents.map(inc => inc.assignedTo))
  ).sort();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (studentLookupRef.current && !studentLookupRef.current.contains(event.target as Node)) {
        setStudentLookupOpen(false);
      }
    };

    if (studentLookupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [studentLookupOpen]);

  // Apply pending filters to active filters
  const handleSearch = () => {
    setSearchTerm(pendingSearchTerm);
    setStatusFilter(pendingStatusFilter);
    setTypeFilter(pendingTypeFilter);
    setAssignedToFilter(pendingAssignedToFilter);
    setSeverityFilter(pendingSeverityFilter);
    setDateAfterFilter(pendingDateAfterFilter);
    setStudentLookupOpen(false);
    setShowAllIncidents(false);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction: desc -> asc -> null -> desc
      if (sortDirection === 'desc') {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortDirection(null);
        setSortField('date'); // Reset to default
      }
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleExport = (format: ExportFormat) => {
    const formatLabels: Record<ExportFormat, string> = {
      excel: 'Excel Spreadsheet',
      word: 'Word Document',
      csv: 'CSV',
      'csv-no-header': 'CSV (no header)',
    };
    const formatExtensions: Record<ExportFormat, string> = {
      excel: 'xlsx',
      word: 'docx',
      csv: 'csv',
      'csv-no-header': 'csv',
    };

    toast.success('Export started', {
      description: `Your ${formatLabels[format]} is being prepared and will download shortly.`,
    });

    // Simulate export delay
    setTimeout(() => {
      // Create CSV content
      const headers = ['Incident ID', 'Date', 'Student', 'Student ID', 'Type', 'Vehicle', 'Route', 'Driver', 'Severity', 'Status', 'Description'];
      const rows = filteredIncidents.map(inc => [
        inc.id,
        inc.date,
        `"${inc.student}"`,
        inc.studentId,
        `"${inc.type}"`,
        inc.bus,
        `"${inc.route}"`,
        `"${inc.driver}"`,
        inc.severity,
        inc.status,
        `"${inc.description}"`
      ].join(','));

      const csvContent = format === 'csv-no-header'
        ? rows.join('\\n')
        : [headers.join(','), ...rows].join('\\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `incidents-export-${new Date().toISOString().split('T')[0]}.${formatExtensions[format]}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success('Export complete', {
        description: `Your ${formatLabels[format]} has been downloaded.`,
      });
    }, 1500);
  };

  const filteredIncidents = useMemo(() => incidentsWithWorkflows.filter((incident) => {
    const matchesSearch =
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.bus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(incident.status);
    const matchesType = typeFilter.length === 0 || typeFilter.includes(incident.type);
    const matchesAssignedTo = assignedToFilter.length === 0 || assignedToFilter.includes(incident.assignedTo);
    const matchesSeverity = severityFilter.length === 0 || severityFilter.includes(incident.severity);
    const matchesDateAfter = !dateAfterFilter || incident.date >= dateAfterFilter;

    return matchesSearch && matchesStatus && matchesType && matchesAssignedTo && matchesSeverity && matchesDateAfter;
  }), [incidentsWithWorkflows, searchTerm, statusFilter, typeFilter, assignedToFilter, severityFilter, dateAfterFilter]);

  // Sort incidents
  const sortedIncidents = useMemo(() => [...filteredIncidents].sort((a, b) => {
    if (!sortDirection) return 0;

    let comparison = 0;
    
    switch (sortField) {
      case 'id':
        comparison = a.id.localeCompare(b.id);
        break;
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'student':
        comparison = a.student.localeCompare(b.student);
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
      case 'severity': {
        const severityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        comparison = (severityOrder[a.severity as keyof typeof severityOrder] || 0) - 
                     (severityOrder[b.severity as keyof typeof severityOrder] || 0);
        break;
      }
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'workflow': {
        // Sort by workflow presence and progress
        const aProgress = a.workflow ? a.workflow.steps.filter(s => s.status === 'Completed').length : -1;
        const bProgress = b.workflow ? b.workflow.steps.filter(s => s.status === 'Completed').length : -1;
        comparison = aProgress - bProgress;
        break;
      }
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  }), [filteredIncidents, sortField, sortDirection]);

  // Display only first 5 incidents if not expanded
  const displayedIncidents = showAllIncidents ? sortedIncidents : sortedIncidents.slice(0, 5);

  // Notify parent component of sorted and filtered incidents using ref-based ID comparison
  const prevSortedIdsRef = useRef<string>('');
  useEffect(() => {
    if (onSortedFilteredIncidentsChange) {
      const currentIds = sortedIncidents.map(i => i.id).join(',');
      if (currentIds !== prevSortedIdsRef.current) {
        prevSortedIdsRef.current = currentIds;
        onSortedFilteredIncidentsChange(sortedIncidents);
      }
    }
  }, [sortedIncidents, onSortedFilteredIncidentsChange]);

  // KPI calculations
  const totalIncidents = mockIncidents.length;
  const openIncidents = mockIncidents.filter(i => i.status === 'Open').length;
  const highSeverity = mockIncidents.filter(i => i.severity === 'High').length;
  const closedIncidents = mockIncidents.filter(i => i.status === 'Closed').length;

  return (
    <div style={{ padding: 'var(--forge-spacing-xlarge)' }}>
      {/* Page Header */}
      <div className="flex items-start justify-between" style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <div>
          <h1 style={{ margin: 0, marginBottom: 'var(--forge-spacing-xxsmall)', fontFamily: 'Roboto, sans-serif' }}>Incidents</h1>
          <p className="text-muted-foreground" style={{ margin: 0, fontFamily: 'Roboto, sans-serif', fontSize: 'var(--forge-font-size-base)' }}>
            Track and manage all student incidents
          </p>
        </div>
        <button
          onClick={() => setIsNewIncidentDialogOpen(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            borderRadius: 'var(--forge-shape-medium)',
            backgroundColor: 'var(--forge-theme-primary)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Plus className="h-4 w-4" />
          New Incident
        </button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', borderRadius: 'var(--forge-radius-large)', borderColor: 'var(--forge-color-border-default)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }}>
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>Total Incidents</h3>
            <AlertCircle className="h-4 w-4" style={{ color: 'var(--brand-blue-dark)' }} />
            </div>
            <div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--brand-blue-dark)', fontFamily: 'Roboto, sans-serif' }}>
              {totalIncidents}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--forge-spacing-xxsmall)', fontFamily: 'Roboto, sans-serif' }}>
              All recorded incidents
            </p>
            </div>
          </div>
        </ForgeCard>

        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', borderRadius: 'var(--forge-radius-large)', borderColor: 'var(--forge-color-border-default)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }}>
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>Open Incidents</h3>
              <Clock className="h-4 w-4" style={{ color: '#ea580c' }} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: '#ea580c', fontFamily: 'Roboto, sans-serif' }}>
                {openIncidents}
              </div>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--forge-spacing-xxsmall)', fontFamily: 'Roboto, sans-serif' }}>
                Awaiting resolution
              </p>
            </div>
          </div>
        </ForgeCard>

        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', borderRadius: 'var(--forge-radius-large)', borderColor: 'var(--forge-color-border-default)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }}>
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>High Severity</h3>
              <AlertTriangle className="h-4 w-4" style={{ color: '#dc2626' }} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: '#dc2626', fontFamily: 'Roboto, sans-serif' }}>
                {highSeverity}
              </div>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--forge-spacing-xxsmall)', fontFamily: 'Roboto, sans-serif' }}>
                Require immediate attention
              </p>
            </div>
          </div>
        </ForgeCard>

        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', borderRadius: 'var(--forge-radius-large)', borderColor: 'var(--forge-color-border-default)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }}>
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>Closed Incidents</h3>
              <TrendingUp className="h-4 w-4" style={{ color: 'var(--brand-olive-medium)' }} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--brand-olive-medium)', fontFamily: 'Roboto, sans-serif' }}>
                {closedIncidents}
              </div>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--forge-spacing-xxsmall)', fontFamily: 'Roboto, sans-serif' }}>
                Successfully resolved
              </p>
            </div>
          </div>
        </ForgeCard>
      </div>

      {/* Filters Card */}
      <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', marginBottom: 'var(--forge-spacing-large)', borderRadius: 'var(--forge-radius-large)', borderColor: 'var(--forge-color-border-default)' }}>
        <div style={{ padding: 'var(--forge-spacing-medium)' }}>
          <div className="flex items-center" style={{ gap: 'var(--forge-spacing-small)' }}>
            {/* Search */}
            <div className="flex-1 min-w-0">
              <div className="relative" ref={studentLookupRef}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  placeholder="Search incidents, students, vehicles, routes..."
                  value={pendingSearchTerm}
                  onChange={(e) => {
                    setPendingSearchTerm(e.target.value);
                    setStudentLookupOpen(true);
                  }}
                  onFocus={() => setStudentLookupOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className="pl-10"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--forge-font-size-base)', borderRadius: 'var(--forge-radius-medium)', borderColor: 'var(--forge-color-border-default)' }}
                />
                {studentLookupOpen && pendingSearchTerm && (
                  <div className="absolute z-50 w-full mt-1 border overflow-auto" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--forge-color-border-default)', borderRadius: 'var(--forge-radius-medium)', boxShadow: 'var(--forge-elevation-2)', maxHeight: '400px' }}>
                    <Command>
                      <CommandList>
                        <CommandEmpty>No student found.</CommandEmpty>
                        <CommandGroup>
                          {uniqueStudents
                            .filter((student) =>
                              student.name.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
                              student.id.toLowerCase().includes(pendingSearchTerm.toLowerCase())
                            )
                            .map((student) => (
                              <CommandItem
                                key={student.id}
                                value={student.name}
                                onSelect={() => {
                                  setPendingSearchTerm(student.name);
                                  setStudentLookupOpen(false);
                                }}
                              >
                                <Check
                                  className={
                                    pendingSearchTerm === student.name
                                      ? "mr-2 h-4 w-4 opacity-100"
                                      : "mr-2 h-4 w-4 opacity-0"
                                  }
                                />
                                <div className="flex flex-col">
                                  <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--forge-font-size-base)' }}>{student.name}</div>
                                  <div className="text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--forge-font-size-sm)' }}>
                                    {student.id}
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </div>
                )}
              </div>
            </div>

            {/* Status Filter */}
            <div className="shrink-0">
              <ForgeMultiSelect
                options={[
                  { value: 'Open', label: 'Open' },
                  { value: 'In Progress', label: 'In Progress' },
                  { value: 'Closed', label: 'Closed' },
                  { value: 'Cancelled', label: 'Cancelled' },
                ]}
                selected={pendingStatusFilter}
                onChange={setPendingStatusFilter}
                placeholder="Status"
                allLabel="All Statuses"
                width="160px"
              />
            </div>

            {/* Type Filter */}
            <div className="shrink-0">
              <ForgeMultiSelect
                options={[
                  { value: 'Seat Refusal', label: 'Seat Refusal' },
                  { value: 'Seatbelt Refusal', label: 'Seatbelt Refusal' },
                  { value: 'Emergency Exit Misuse', label: 'Emergency Exit Misuse' },
                  { value: 'Taunting/Bullying', label: 'Taunting/Bullying' },
                  { value: 'Offensive Language', label: 'Offensive Language' },
                  { value: 'Physical Altercation', label: 'Physical Altercation' },
                  { value: 'Driver Defiance', label: 'Driver Defiance' },
                  { value: 'Driver Harassment', label: 'Driver Harassment' },
                  { value: 'Vandalism', label: 'Vandalism' },
                  { value: 'Tobacco/Vaping', label: 'Tobacco/Vaping' },
                  { value: 'Harmful Items', label: 'Harmful Items' },
                ]}
                selected={pendingTypeFilter}
                onChange={setPendingTypeFilter}
                placeholder="Type"
                allLabel="All Types"
                width="180px"
              />
            </div>

            {/* Assigned To Filter */}
            <div className="shrink-0">
              <ForgeMultiSelect
                options={uniqueAssignedUsers.map(user => ({ value: user, label: user }))}
                selected={pendingAssignedToFilter}
                onChange={setPendingAssignedToFilter}
                placeholder="Assigned To"
                allLabel="All Assigned To"
                width="180px"
              />
            </div>

            {/* Severity Filter */}
            <div className="shrink-0">
              <ForgeMultiSelect
                options={[
                  { value: 'High', label: 'High' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'Low', label: 'Low' },
                ]}
                selected={pendingSeverityFilter}
                onChange={setPendingSeverityFilter}
                placeholder="Severity"
                allLabel="All Severities"
                width="160px"
              />
            </div>

            {/* Search Button */}
            <ForgeButton
              variant="outlined"
              className="shrink-0"
              onClick={handleSearch}
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--forge-font-size-base)',
                fontWeight: 'var(--forge-font-weight-medium)',
                borderRadius: 'var(--forge-radius-medium)',
                borderColor: 'var(--forge-color-border-default)',
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </ForgeButton>
          </div>
        </div>
      </ForgeCard>

      {/* Active Filter Banner */}
      {(severityFilter.length > 0 || statusFilter.length > 0 || dateAfterFilter) && (
        <div className="flex items-center gap-3 p-3 rounded-md mb-4" style={{ backgroundColor: 'var(--forge-color-surface-info, #eff6ff)', border: '1px solid var(--forge-color-border-info, #bfdbfe)', borderRadius: 'var(--forge-radius-medium)', fontFamily: 'var(--forge-font-family)' }}>
          <AlertCircle className="h-4 w-4 shrink-0" style={{ color: 'var(--forge-color-text-info, #2563eb)' }} />
          <span style={{ fontSize: 'var(--forge-font-size-sm)', color: 'var(--forge-color-text-info, #1e40af)' }}>
            Filtered view: 
            {severityFilter.length > 0 && ` Severity = ${severityFilter.join(', ')}`}
            {statusFilter.length > 0 && ` • Status = ${statusFilter.join(', ')}`}
            {dateAfterFilter && ` • Created after ${dateAfterFilter}`}
          </span>
          <ForgeButton
            variant="flat"
            size="sm"
            className="ml-auto h-7"
            style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}
            onClick={() => {
              setStatusFilter([]);
              setSeverityFilter([]);
              setDateAfterFilter('');
              setAssignedToFilter([]);
              setTypeFilter([]);
              setSearchTerm('');
              setPendingStatusFilter([]);
              setPendingSeverityFilter([]);
              setPendingDateAfterFilter('');
              setPendingAssignedToFilter([]);
              setPendingTypeFilter([]);
              setPendingSearchTerm('');
            }}
          >
            Clear Filters
          </ForgeButton>
        </div>
      )}

      {/* Incidents Table */}
      <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
        <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between">
          <h3 className="forge-typography--heading4">
            All Incidents <span className="text-muted-foreground">({filteredIncidents.length})</span>
          </h3>
          <div className="flex gap-2">
            <ExportDropdown onExport={handleExport} />
          </div>
        </div>
        <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
          <div className="overflow-x-auto">
            <table className="forge-table">
              <thead>
                <tr>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('id')}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Incident ID
                      {sortField === 'id' && sortDirection === 'desc' && <ArrowDown className="h-4 w-4" />}
                      {sortField === 'id' && sortDirection === 'asc' && <ArrowUp className="h-4 w-4" />}
                      {sortField !== 'id' && <ArrowUpDown className="h-4 w-4 opacity-30" />}
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Date
                      {sortField === 'date' && sortDirection === 'desc' && <ArrowDown className="h-4 w-4" />}
                      {sortField === 'date' && sortDirection === 'asc' && <ArrowUp className="h-4 w-4" />}
                      {sortField !== 'date' && <ArrowUpDown className="h-4 w-4 opacity-30" />}
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('student')}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Student
                      {sortField === 'student' && sortDirection === 'desc' && <ArrowDown className="h-4 w-4" />}
                      {sortField === 'student' && sortDirection === 'asc' && <ArrowUp className="h-4 w-4" />}
                      {sortField !== 'student' && <ArrowUpDown className="h-4 w-4 opacity-30" />}
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('type')}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Type
                      {sortField === 'type' && sortDirection === 'desc' && <ArrowDown className="h-4 w-4" />}
                      {sortField === 'type' && sortDirection === 'asc' && <ArrowUp className="h-4 w-4" />}
                      {sortField !== 'type' && <ArrowUpDown className="h-4 w-4 opacity-30" />}
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">Vehicle/Run</th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('severity')}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Severity
                      {sortField === 'severity' && sortDirection === 'desc' && <ArrowDown className="h-4 w-4" />}
                      {sortField === 'severity' && sortDirection === 'asc' && <ArrowUp className="h-4 w-4" />}
                      {sortField !== 'severity' && <ArrowUpDown className="h-4 w-4 opacity-30" />}
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Status
                      {sortField === 'status' && sortDirection === 'desc' && <ArrowDown className="h-4 w-4" />}
                      {sortField === 'status' && sortDirection === 'asc' && <ArrowUp className="h-4 w-4" />}
                      {sortField !== 'status' && <ArrowUpDown className="h-4 w-4 opacity-30" />}
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header" style={{ minWidth: '200px' }}>
                    <button
                      onClick={() => handleSort('workflow')}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <GitBranch className="h-4 w-4" />
                      Workflow Step
                      {sortField === 'workflow' && sortDirection === 'desc' && <ArrowDown className="h-4 w-4" />}
                      {sortField === 'workflow' && sortDirection === 'asc' && <ArrowUp className="h-4 w-4" />}
                      {sortField !== 'workflow' && <ArrowUpDown className="h-4 w-4 opacity-30" />}
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">Assigned To</th>
                  <th className="forge-table-cell forge-table-cell--header">Messages</th>
                </tr>
              </thead>
              <tbody>
                {displayedIncidents.map((incident) => (
                  <tr
                    key={incident.id}
                    className="forge-table-row cursor-pointer"
                    onClick={() => onNavigateToIncidentDetail(incident)}
                    style={{ transition: 'background-color 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--forge-theme-primary-container-minimum)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                  >
                      <td className="forge-table-cell">
                        <div style={{ fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>
                          {incident.id}
                        </div>
                      </td>
                      <td className="forge-table-cell">{incident.date}</td>
                      <td className="forge-table-cell">
                        <div>{incident.student}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--forge-theme-text-low)' }}>
                          {incident.studentId}
                        </div>
                      </td>
                      <td className="forge-table-cell">
                        <Badge variant="outline">{incident.type}</Badge>
                      </td>
                      <td className="forge-table-cell">
                        <div>{incident.bus}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--forge-theme-text-low)' }}>
                          {incident.route}
                        </div>
                      </td>
                      <td className="forge-table-cell">
                        <Badge
                          variant={
                            incident.severity === 'High' ? 'destructive' :
                            incident.severity === 'Medium' ? 'secondary' :
                            'outline'
                          }
                        >
                          {incident.severity}
                        </Badge>
                      </td>
                      <td className="forge-table-cell">
                        <Badge
                          variant={
                            incident.status === 'Open' ? 'default' :
                            incident.status === 'In Progress' ? 'secondary' :
                            'outline'
                          }
                        >
                          {incident.status}
                        </Badge>
                      </td>
                      <td className="forge-table-cell">
                        <IncidentWorkflowProgress workflow={incident.workflow} />
                      </td>
                      <td className="forge-table-cell">
                        <div style={{ fontSize: '0.875rem', color: 'var(--forge-theme-text-low)' }}>
                          {incident.assignedTo}
                        </div>
                      </td>
                      <td className="forge-table-cell">
                        {hasActiveCommunication(incident.id) && (
                          <ForgeButton
                            variant="flat"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateToCommunication(incident.id);
                            }}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </ForgeButton>
                        )}
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sortedIncidents.length > 5 && (
            <div className="flex justify-start pt-4 border-t mt-4">
              <ForgeButton
                variant="outlined"
                onClick={() => setShowAllIncidents(!showAllIncidents)}
              >
                {showAllIncidents 
                  ? 'Show Less' 
                  : `Show All Incidents (${sortedIncidents.length})`
                }
              </ForgeButton>
            </div>
          )}
        </div>
      </ForgeCard>

      {/* New Incident Dialog */}
      <Dialog open={isNewIncidentDialogOpen} onOpenChange={setIsNewIncidentDialogOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-y-auto p-0">
          <div className="sticky top-0 bg-white z-10 border-b px-6 py-4">
            <DialogHeader>
              <DialogTitle>Report New Incident</DialogTitle>
              <DialogDescription>
                Fill out the form below to report a new student incident
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="px-6 pb-6">
            <NewIncidentForm onNavigate={(page) => {
              setIsNewIncidentDialogOpen(false);
              if (page === 'incidents') {
                // Optionally refresh the page or show success message
                toast.success('Incident reported successfully!');
              }
            }} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Lightbox */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedPhoto?.caption}</DialogTitle>
            <DialogDescription>
              Submitted by {selectedPhoto?.uploadedBy} on {selectedPhoto?.uploadedAt}
            </DialogDescription>
          </DialogHeader>
          {selectedPhoto && (
            <div className="relative">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-auto rounded-lg"
                style={{ maxHeight: '70vh', objectFit: 'contain' }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}