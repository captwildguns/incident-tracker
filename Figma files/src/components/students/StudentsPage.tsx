import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ForgeButton } from '@tylertech/forge-react';
import { defineButtonComponent } from '@tylertech/forge';
defineButtonComponent();
import { ForgeCard } from '@tylertech/forge-react';
import { defineCardComponent } from '@tylertech/forge';
defineCardComponent();
import { Checkbox } from '../ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { ForgeMultiSelect } from '../ui/forge-multiselect';
import { Search, AlertTriangle, AlertCircle, Calendar, GraduationCap, School, Check, Filter, X, Download, ChevronUp, ChevronDown, ChevronsUpDown, Users, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ExportDropdown } from '../shared/ExportDropdown';
import type { ExportFormat } from '../shared/ExportDropdown';
import { toast } from 'sonner@2.0.3';

// Photo URLs for students
const femalePhotos = [
  'https://images.unsplash.com/photo-1695313667713-7303ec9a270f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybCUyMHBhc3Nwb3J0JTIwZGV0YWlsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY5NTMwMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1758521540968-3af0cc2074a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc3R1ZGVudCUyMHBvcnRyYWl0JTIwZGV0YWlsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY5NTMwMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1589220286904-3dcef62c68ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzdHVkZW50JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY5NTMwMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1743329625541-7d9b5a21440e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJsJTIwc3R1ZGVudCUyMHBvcnRyYWl0JTIwc2Nob29sfGVufDF8fHx8MTc2OTUzMDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1762522929454-ee9a3c765f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGZlbWFsZSUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2OTUzMDE1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

const malePhotos = [
  'https://images.unsplash.com/photo-1608976988602-6c7d25ad3bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYm95JTIwcGFzc3BvcnQlMjBoZWFkc2hvdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njk1MzAxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHN0dWRlbnQlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2OTUzMDE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1719861915316-449b8de4b0f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3klMjBzdHVkZW50JTIwcG9ydHJhaXQlMjBzY2hvb2x8ZW58MXx8fHwxNzY5NTMwMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

const mockStudents = [
  {
    id: 'STU-2891',
    name: 'Sarah Mitchell',
    photoUrl: femalePhotos[0],
    grade: '8th Grade',
    school: 'Lincoln Middle School',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    incidentCount: 1,
    lastIncident: '2025-03-15',
    incidents: [
      {
        id: 'INC-2025-0042',
        date: '2025-03-15',
        type: 'Seat Refusal',
        severity: 'Medium',
        status: 'Open',
        description: 'Student refused to remain seated during transport',
      },
    ],
  },
  {
    id: 'STU-3421',
    name: 'Marcus Johnson',
    photoUrl: malePhotos[0],
    grade: '10th Grade',
    school: 'Washington High School',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    incidentCount: 1,
    lastIncident: '2025-03-15',
    incidents: [
      {
        id: 'INC-2025-0041',
        date: '2025-03-15',
        type: 'Emergency Exit Misuse',
        severity: 'High',
        status: 'In Progress',
        description: 'Student attempted to open emergency exit during normal transport',
      },
    ],
  },
  {
    id: 'STU-1956',
    name: 'Emma Rodriguez',
    photoUrl: femalePhotos[1],
    grade: '7th Grade',
    school: 'Jefferson Middle School',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    incidentCount: 1,
    lastIncident: '2025-03-14',
    incidents: [
      {
        id: 'INC-2025-0040',
        date: '2025-03-14',
        type: 'Taunting/Bullying',
        severity: 'High',
        status: 'Open',
        description: 'Verbal altercation with another student',
      },
    ],
  },
  {
    id: 'STU-4782',
    name: 'James Thompson',
    photoUrl: malePhotos[1],
    grade: '9th Grade',
    school: 'Roosevelt High School',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    incidentCount: 1,
    lastIncident: '2025-03-14',
    incidents: [
      {
        id: 'INC-2025-0039',
        date: '2025-03-14',
        type: 'Vandalism',
        severity: 'Low',
        status: 'Closed',
        description: 'Seat cushion torn - monetary restitution required',
      },
    ],
  },
  {
    id: 'STU-5623',
    name: 'Olivia Davis',
    photoUrl: femalePhotos[2],
    grade: '11th Grade',
    school: 'Washington High School',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    incidentCount: 1,
    lastIncident: '2025-03-13',
    incidents: [
      {
        id: 'INC-2025-0038',
        date: '2025-03-13',
        type: 'Offensive Language',
        severity: 'Medium',
        status: 'In Progress',
        description: 'Using profane and offensive language toward other students',
      },
    ],
  },
  {
    id: 'STU-6891',
    name: 'Noah Wilson',
    photoUrl: malePhotos[2],
    grade: '8th Grade',
    school: 'Jefferson Middle School',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    incidentCount: 1,
    lastIncident: '2025-03-12',
    incidents: [
      {
        id: 'INC-2025-0037',
        date: '2025-03-12',
        type: 'Physical Altercation',
        severity: 'High',
        status: 'Closed',
        description: 'Physical fight with another student',
      },
    ],
  },
  {
    id: 'STU-7234',
    name: 'Sophia Garcia',
    photoUrl: femalePhotos[3],
    grade: '5th Grade',
    school: 'Lincoln Elementary',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    incidentCount: 1,
    lastIncident: '2025-03-10',
    incidents: [
      {
        id: 'INC-2025-0036',
        date: '2025-03-10',
        type: 'Eating/Drinking Violation',
        severity: 'Low',
        status: 'Closed',
        description: 'Student eating snacks and spilled drink on seat',
      },
    ],
  },
  {
    id: 'STU-8512',
    name: 'Liam Brown',
    photoUrl: malePhotos[0],
    grade: '7th Grade',
    school: 'Lincoln Middle School',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    incidentCount: 1,
    lastIncident: '2025-03-08',
    incidents: [
      {
        id: 'INC-2025-0035',
        date: '2025-03-08',
        type: 'Window Misuse',
        severity: 'Medium',
        status: 'Closed',
        description: 'Opening windows excessively and throwing paper outside',
      },
    ],
  },
  {
    id: 'STU-9123',
    name: 'Ava Martinez',
    photoUrl: femalePhotos[4],
    grade: '6th Grade',
    school: 'Jefferson Middle School',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    incidentCount: 1,
    lastIncident: '2025-03-07',
    incidents: [
      {
        id: 'INC-2025-0034',
        date: '2025-03-07',
        type: 'Disruptive Volume',
        severity: 'Medium',
        status: 'Closed',
        description: 'Excessive noise and screaming, disturbing driver',
      },
    ],
  },
  {
    id: 'STU-1045',
    name: 'Ethan Lee',
    photoUrl: malePhotos[1],
    grade: '9th Grade',
    school: 'Washington High School',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    incidentCount: 1,
    lastIncident: '2025-03-05',
    incidents: [
      {
        id: 'INC-2025-0033',
        date: '2025-03-05',
        type: 'Seat Refusal',
        severity: 'Low',
        status: 'Closed',
        description: 'Refused assigned seat and moved multiple times',
      },
    ],
  },
  {
    id: 'STU-2387',
    name: 'Isabella White',
    photoUrl: femalePhotos[0],
    grade: '4th Grade',
    school: 'Lincoln Elementary',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    incidentCount: 1,
    lastIncident: '2025-02-28',
    incidents: [
      {
        id: 'INC-2025-0032',
        date: '2025-02-28',
        type: 'Taunting/Bullying',
        severity: 'High',
        status: 'Closed',
        description: 'Continued verbal harassment of younger student',
      },
    ],
  },
  {
    id: 'STU-3498',
    name: 'Mason Taylor',
    photoUrl: malePhotos[2],
    grade: '8th Grade',
    school: 'Lincoln Middle School',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    incidentCount: 1,
    lastIncident: '2025-02-26',
    incidents: [
      {
        id: 'INC-2025-0031',
        date: '2025-02-26',
        type: 'Offensive Language',
        severity: 'Medium',
        status: 'Closed',
        description: 'Repeated use of profanity despite warnings',
      },
    ],
  },
  {
    id: 'STU-4561',
    name: 'Charlotte Anderson',
    photoUrl: femalePhotos[1],
    grade: '7th Grade',
    school: 'Jefferson Middle School',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    incidentCount: 1,
    lastIncident: '2025-02-24',
    incidents: [
      {
        id: 'INC-2025-0030',
        date: '2025-02-24',
        type: 'Vandalism',
        severity: 'Medium',
        status: 'Closed',
        description: 'Writing on seat backs with permanent marker',
      },
    ],
  },
  {
    id: 'STU-5672',
    name: 'Aiden Thomas',
    photoUrl: malePhotos[0],
    grade: '11th Grade',
    school: 'Washington High School',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    incidentCount: 1,
    lastIncident: '2025-02-21',
    incidents: [
      {
        id: 'INC-2025-0029',
        date: '2025-02-21',
        type: 'Physical Altercation',
        severity: 'High',
        status: 'Closed',
        description: 'Pushing and shoving with another student in aisle',
      },
    ],
  },
  {
    id: 'STU-6783',
    name: 'Mia Jackson',
    photoUrl: femalePhotos[2],
    grade: '3rd Grade',
    school: 'Lincoln Elementary',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    incidentCount: 1,
    lastIncident: '2025-02-19',
    incidents: [
      {
        id: 'INC-2025-0028',
        date: '2025-02-19',
        type: 'Disruptive Volume',
        severity: 'Low',
        status: 'Closed',
        description: 'Playing loud music from phone speaker',
      },
    ],
  },
  {
    id: 'STU-7894',
    name: 'Lucas Harris',
    photoUrl: malePhotos[1],
    grade: '6th Grade',
    school: 'Lincoln Middle School',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    incidentCount: 1,
    lastIncident: '2025-02-15',
    incidents: [
      {
        id: 'INC-2025-0027',
        date: '2025-02-15',
        type: 'Emergency Exit Misuse',
        severity: 'High',
        status: 'Closed',
        description: 'Tampering with emergency exit door mechanism',
      },
    ],
  },
  {
    id: 'STU-8905',
    name: 'Harper Clark',
    photoUrl: femalePhotos[3],
    grade: '8th Grade',
    school: 'Jefferson Middle School',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    incidentCount: 1,
    lastIncident: '2025-02-12',
    incidents: [
      {
        id: 'INC-2025-0026',
        date: '2025-02-12',
        type: 'Eating/Drinking Violation',
        severity: 'Medium',
        status: 'Closed',
        description: 'Spilled soda creating slipping hazard',
      },
    ],
  },
  {
    id: 'STU-9016',
    name: 'Benjamin Lewis',
    photoUrl: malePhotos[2],
    grade: '12th Grade',
    school: 'Washington High School',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    incidentCount: 1,
    lastIncident: '2025-02-10',
    incidents: [
      {
        id: 'INC-2025-0025',
        date: '2025-02-10',
        type: 'Seat Refusal',
        severity: 'Medium',
        status: 'Closed',
        description: 'Standing in aisle during transport despite warnings',
      },
    ],
  },
  {
    id: 'STU-1127',
    name: 'Amelia Robinson',
    photoUrl: femalePhotos[4],
    grade: '5th Grade',
    school: 'Lincoln Elementary',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    incidentCount: 1,
    lastIncident: '2025-02-07',
    incidents: [
      {
        id: 'INC-2025-0024',
        date: '2025-02-07',
        type: 'Window Misuse',
        severity: 'High',
        status: 'Closed',
        description: 'Hanging objects out window while bus moving',
      },
    ],
  },
  {
    id: 'STU-2238',
    name: 'Henry Walker',
    photoUrl: malePhotos[0],
    grade: '7th Grade',
    school: 'Lincoln Middle School',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    incidentCount: 1,
    lastIncident: '2025-02-05',
    incidents: [
      {
        id: 'INC-2025-0023',
        date: '2025-02-05',
        type: 'Offensive Language',
        severity: 'High',
        status: 'Closed',
        description: 'Directing profanity at driver',
      },
    ],
  },
  {
    id: 'STU-3349',
    name: 'Evelyn Hall',
    photoUrl: femalePhotos[0],
    grade: '6th Grade',
    school: 'Jefferson Middle School',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    incidentCount: 1,
    lastIncident: '2025-02-03',
    incidents: [
      {
        id: 'INC-2025-0022',
        date: '2025-02-03',
        type: 'Taunting/Bullying',
        severity: 'Medium',
        status: 'Closed',
        description: 'Name-calling and mocking another student',
      },
    ],
  },
  {
    id: 'STU-4450',
    name: 'Alexander Young',
    photoUrl: malePhotos[1],
    grade: '10th Grade',
    school: 'Washington High School',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    incidentCount: 1,
    lastIncident: '2025-01-31',
    incidents: [
      {
        id: 'INC-2025-0021',
        date: '2025-01-31',
        type: 'Vandalism',
        severity: 'Medium',
        status: 'Closed',
        description: 'Scratching window with metal object',
      },
    ],
  },
  {
    id: 'STU-5561',
    name: 'Abigail King',
    photoUrl: femalePhotos[1],
    grade: '4th Grade',
    school: 'Lincoln Elementary',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    incidentCount: 1,
    lastIncident: '2025-01-28',
    incidents: [
      {
        id: 'INC-2025-0020',
        date: '2025-01-28',
        type: 'Disruptive Volume',
        severity: 'Medium',
        status: 'Closed',
        description: 'Yelling and screaming, refusing to quiet down',
      },
    ],
  },
  {
    id: 'STU-6672',
    name: 'Daniel Wright',
    photoUrl: malePhotos[2],
    grade: '8th Grade',
    school: 'Lincoln Middle School',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    incidentCount: 1,
    lastIncident: '2025-01-24',
    incidents: [
      {
        id: 'INC-2025-0019',
        date: '2025-01-24',
        type: 'Physical Altercation',
        severity: 'High',
        status: 'Closed',
        description: 'Kicked another student during argument',
      },
    ],
  },
  {
    id: 'STU-7783',
    name: 'Emily Scott',
    photoUrl: femalePhotos[2],
    grade: '7th Grade',
    school: 'Jefferson Middle School',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    incidentCount: 1,
    lastIncident: '2025-01-21',
    incidents: [
      {
        id: 'INC-2025-0018',
        date: '2025-01-21',
        type: 'Eating/Drinking Violation',
        severity: 'Low',
        status: 'Closed',
        description: 'Eating messy food and littering wrappers',
      },
    ],
  },
  {
    id: 'STU-8894',
    name: 'Matthew Green',
    photoUrl: malePhotos[0],
    grade: '9th Grade',
    school: 'Washington High School',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    incidentCount: 1,
    lastIncident: '2025-01-17',
    incidents: [
      {
        id: 'INC-2025-0017',
        date: '2025-01-17',
        type: 'Seat Refusal',
        severity: 'Low',
        status: 'Closed',
        description: 'Changed seats multiple times causing disruption',
      },
    ],
  },
  {
    id: 'STU-9905',
    name: 'Victoria Martinez',
    photoUrl: femalePhotos[3],
    grade: '10th Grade',
    school: 'Roosevelt High School',
    bus: 'Bus 14',
    route: 'Roosevelt High AM - Red',
    incidentCount: 3,
    lastIncident: '2025-03-16',
    incidents: [
      {
        id: 'INC-2025-0043',
        date: '2025-03-16',
        type: 'Disruptive Volume',
        severity: 'Medium',
        status: 'Open',
        description: 'Playing music loudly on phone without headphones',
      },
      {
        id: 'INC-2025-0016',
        date: '2025-01-15',
        type: 'Offensive Language',
        severity: 'Medium',
        status: 'Closed',
        description: 'Used inappropriate language with peers',
      },
      {
        id: 'INC-2025-0012',
        date: '2025-01-05',
        type: 'Seat Refusal',
        severity: 'Low',
        status: 'Closed',
        description: 'Refused assigned seat',
      },
    ],
  },
  {
    id: 'STU-1016',
    name: 'Christopher Adams',
    photoUrl: malePhotos[1],
    grade: '6th Grade',
    school: 'Jefferson Middle School',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    incidentCount: 1,
    lastIncident: '2025-03-16',
    incidents: [
      {
        id: 'INC-2025-0044',
        date: '2025-03-16',
        type: 'Physical Altercation',
        severity: 'High',
        status: 'Open',
        description: 'Pushed another student causing minor injury',
      },
    ],
  },
  {
    id: 'STU-2127',
    name: 'Grace Phillips',
    photoUrl: femalePhotos[4],
    grade: '4th Grade',
    school: 'Lincoln Elementary',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    incidentCount: 1,
    lastIncident: '2025-03-15',
    incidents: [
      {
        id: 'INC-2025-0045',
        date: '2025-03-15',
        type: 'Taunting/Bullying',
        severity: 'High',
        status: 'In Progress',
        description: 'Repeatedly teasing younger student about appearance',
      },
    ],
  },
  {
    id: 'STU-3238',
    name: 'Ryan Campbell',
    photoUrl: malePhotos[2],
    grade: '11th Grade',
    school: 'Washington High School',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    incidentCount: 1,
    lastIncident: '2025-03-14',
    incidents: [
      {
        id: 'INC-2025-0046',
        date: '2025-03-14',
        type: 'Vandalism',
        severity: 'Medium',
        status: 'In Progress',
        description: 'Carved initials into seat back',
      },
    ],
  },
  {
    id: 'STU-4349',
    name: 'Madison Turner',
    photoUrl: femalePhotos[0],
    grade: '7th Grade',
    school: 'Lincoln Middle School',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    incidentCount: 1,
    lastIncident: '2025-03-13',
    incidents: [
      {
        id: 'INC-2025-0047',
        date: '2025-03-13',
        type: 'Window Misuse',
        severity: 'Low',
        status: 'Closed',
        description: 'Opening and closing window repeatedly',
      },
    ],
  },
  {
    id: 'STU-5450',
    name: 'Joshua Parker',
    photoUrl: malePhotos[0],
    grade: '9th Grade',
    school: 'Roosevelt High School',
    bus: 'Bus 14',
    route: 'Roosevelt High AM - Red',
    incidentCount: 2,
    lastIncident: '2025-03-12',
    incidents: [
      {
        id: 'INC-2025-0048',
        date: '2025-03-12',
        type: 'Seat Refusal',
        severity: 'Medium',
        status: 'Open',
        description: 'Refused assigned seat and sat in restricted area',
      },
      {
        id: 'INC-2025-0015',
        date: '2025-01-12',
        type: 'Disruptive Volume',
        severity: 'Low',
        status: 'Closed',
        description: 'Loud talking during morning route',
      },
    ],
  },
  {
    id: 'STU-6561',
    name: 'Chloe Evans',
    photoUrl: femalePhotos[1],
    grade: '5th Grade',
    school: 'Lincoln Elementary',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    incidentCount: 1,
    lastIncident: '2025-03-11',
    incidents: [
      {
        id: 'INC-2025-0049',
        date: '2025-03-11',
        type: 'Eating/Drinking Violation',
        severity: 'Low',
        status: 'Closed',
        description: 'Spilled juice on seat and floor',
      },
    ],
  },
  {
    id: 'STU-7672',
    name: 'Brandon Edwards',
    photoUrl: malePhotos[1],
    grade: '8th Grade',
    school: 'Jefferson Middle School',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    incidentCount: 1,
    lastIncident: '2025-03-10',
    incidents: [
      {
        id: 'INC-2025-0050',
        date: '2025-03-10',
        type: 'Emergency Exit Misuse',
        severity: 'High',
        status: 'In Progress',
        description: 'Touched emergency exit release without permission',
      },
    ],
  },
  {
    id: 'STU-8783',
    name: 'Natalie Collins',
    photoUrl: femalePhotos[2],
    grade: '10th Grade',
    school: 'Washington High School',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    incidentCount: 1,
    lastIncident: '2025-03-09',
    incidents: [
      {
        id: 'INC-2025-0051',
        date: '2025-03-09',
        type: 'Offensive Language',
        severity: 'High',
        status: 'Open',
        description: 'Directed profanity at driver when asked to quiet down',
      },
    ],
  },
  {
    id: 'STU-9894',
    name: 'Tyler Stewart',
    photoUrl: malePhotos[2],
    grade: '6th Grade',
    school: 'Lincoln Middle School',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    incidentCount: 1,
    lastIncident: '2025-03-08',
    incidents: [
      {
        id: 'INC-2025-0052',
        date: '2025-03-08',
        type: 'Physical Altercation',
        severity: 'High',
        status: 'Open',
        description: 'Grabbed and pushed another student in argument',
      },
    ],
  },
  {
    id: 'STU-1905',
    name: 'Hannah Morris',
    photoUrl: femalePhotos[3],
    grade: '12th Grade',
    school: 'Roosevelt High School',
    bus: 'Bus 14',
    route: 'Roosevelt High AM - Red',
    incidentCount: 1,
    lastIncident: '2025-03-07',
    incidents: [
      {
        id: 'INC-2025-0053',
        date: '2025-03-07',
        type: 'Taunting/Bullying',
        severity: 'Medium',
        status: 'In Progress',
        description: 'Making fun of another student repeatedly',
      },
    ],
  },
  {
    id: 'STU-2016',
    name: 'Andrew Rogers',
    photoUrl: malePhotos[0],
    grade: '3rd Grade',
    school: 'Lincoln Elementary',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    incidentCount: 1,
    lastIncident: '2025-03-06',
    incidents: [
      {
        id: 'INC-2025-0054',
        date: '2025-03-06',
        type: 'Disruptive Volume',
        severity: 'Low',
        status: 'Closed',
        description: 'Yelling and making loud noises',
      },
    ],
  },
  {
    id: 'STU-3127',
    name: 'Samantha Reed',
    photoUrl: femalePhotos[4],
    grade: '7th Grade',
    school: 'Jefferson Middle School',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    incidentCount: 3,
    lastIncident: '2025-03-05',
    incidents: [
      {
        id: 'INC-2025-0055',
        date: '2025-03-05',
        type: 'Vandalism',
        severity: 'Medium',
        status: 'Open',
        description: 'Drew on window with marker',
      },
      {
        id: 'INC-2025-0014',
        date: '2025-01-10',
        type: 'Seat Refusal',
        severity: 'Low',
        status: 'Closed',
        description: 'Refused to sit in assigned seat',
      },
      {
        id: 'INC-2025-0011',
        date: '2024-12-20',
        type: 'Disruptive Volume',
        severity: 'Low',
        status: 'Closed',
        description: 'Talking loudly on bus',
      },
    ],
  },
  {
    id: 'STU-4238',
    name: 'Jacob Cook',
    photoUrl: malePhotos[1],
    grade: '9th Grade',
    school: 'Washington High School',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    incidentCount: 1,
    lastIncident: '2025-03-04',
    incidents: [
      {
        id: 'INC-2025-0056',
        date: '2025-03-04',
        type: 'Window Misuse',
        severity: 'Medium',
        status: 'In Progress',
        description: 'Hanging arm out window while bus moving',
      },
    ],
  },
  {
    id: 'STU-5349',
    name: 'Alexis Morgan',
    photoUrl: femalePhotos[0],
    grade: '8th Grade',
    school: 'Lincoln Middle School',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    incidentCount: 1,
    lastIncident: '2025-03-03',
    incidents: [
      {
        id: 'INC-2025-0057',
        date: '2025-03-03',
        type: 'Eating/Drinking Violation',
        severity: 'Medium',
        status: 'Open',
        description: 'Eating messy food and leaving trash on floor',
      },
    ],
  },
  {
    id: 'STU-6450',
    name: 'Dylan Bell',
    photoUrl: malePhotos[2],
    grade: '11th Grade',
    school: 'Roosevelt High School',
    bus: 'Bus 14',
    route: 'Roosevelt High AM - Red',
    incidentCount: 1,
    lastIncident: '2025-03-02',
    incidents: [
      {
        id: 'INC-2025-0058',
        date: '2025-03-02',
        type: 'Offensive Language',
        severity: 'Medium',
        status: 'Closed',
        description: 'Using inappropriate language with other students',
      },
    ],
  },
  {
    id: 'STU-7561',
    name: 'Brianna Cooper',
    photoUrl: femalePhotos[1],
    grade: '4th Grade',
    school: 'Lincoln Elementary',
    bus: 'Bus 9',
    route: 'Lincoln Elementary AM - Green',
    incidentCount: 1,
    lastIncident: '2025-03-01',
    incidents: [
      {
        id: 'INC-2025-0059',
        date: '2025-03-01',
        type: 'Physical Altercation',
        severity: 'High',
        status: 'In Progress',
        description: 'Hit another student with backpack',
      },
    ],
  },
  {
    id: 'STU-8672',
    name: 'Nathan Richardson',
    photoUrl: malePhotos[0],
    grade: '6th Grade',
    school: 'Jefferson Middle School',
    bus: 'Bus 15',
    route: 'Jefferson Middle AM - Blue',
    incidentCount: 1,
    lastIncident: '2025-02-28',
    incidents: [
      {
        id: 'INC-2025-0060',
        date: '2025-02-28',
        type: 'Disruptive Volume',
        severity: 'Medium',
        status: 'Closed',
        description: 'Playing videos on phone at high volume',
      },
    ],
  },
  {
    id: 'STU-9783',
    name: 'Kayla Bailey',
    photoUrl: femalePhotos[2],
    grade: '10th Grade',
    school: 'Washington High School',
    bus: 'Bus 8',
    route: 'Washington High PM - Wolf Rd',
    incidentCount: 4,
    lastIncident: '2025-02-27',
    incidents: [
      {
        id: 'INC-2025-0061',
        date: '2025-02-27',
        type: 'Taunting/Bullying',
        severity: 'High',
        status: 'Open',
        description: 'Spreading rumors and excluding another student',
      },
      {
        id: 'INC-2025-0013',
        date: '2025-01-08',
        type: 'Offensive Language',
        severity: 'Medium',
        status: 'Closed',
        description: 'Used profanity in conversation',
      },
      {
        id: 'INC-2025-0010',
        date: '2024-12-15',
        type: 'Physical Altercation',
        severity: 'High',
        status: 'Closed',
        description: 'Altercation with another student',
      },
      {
        id: 'INC-2025-0009',
        date: '2024-12-01',
        type: 'Disruptive Volume',
        severity: 'Low',
        status: 'Closed',
        description: 'Loud and disruptive behavior',
      },
    ],
  },
  {
    id: 'STU-1894',
    name: 'Justin Rivera',
    photoUrl: malePhotos[1],
    grade: '7th Grade',
    school: 'Lincoln Middle School',
    bus: 'Bus 12',
    route: 'Meyers Middle AM - Yellow',
    incidentCount: 5,
    lastIncident: '2025-02-26',
    incidents: [
      {
        id: 'INC-2025-0062',
        date: '2025-02-26',
        type: 'Seat Refusal',
        severity: 'Low',
        status: 'Closed',
        description: 'Moved seats without permission',
      },
      {
        id: 'INC-2025-0008',
        date: '2024-11-20',
        type: 'Vandalism',
        severity: 'Medium',
        status: 'Closed',
        description: 'Damage to bus seat',
      },
      {
        id: 'INC-2025-0007',
        date: '2024-11-05',
        type: 'Offensive Language',
        severity: 'Medium',
        status: 'Closed',
        description: 'Inappropriate language',
      },
      {
        id: 'INC-2025-0006',
        date: '2024-10-15',
        type: 'Physical Altercation',
        severity: 'High',
        status: 'Closed',
        description: 'Fighting with another student',
      },
      {
        id: 'INC-2025-0005',
        date: '2024-10-01',
        type: 'Disruptive Volume',
        severity: 'Low',
        status: 'Closed',
        description: 'Excessive noise on bus',
      },
    ],
  },
];

interface StudentsPageProps {
  onNavigate: (page: string) => void;
  initialActiveIncidentsFilter?: boolean;
  onNavigateToIncidentDetail?: (incident: any) => void;
}

const MONTH_NAMES = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];
const MONTH_ABBREVS = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
];

/** Match a search term against multiple representations of a YYYY-MM-DD date */
function matchesDate(dateStr: string | undefined, term: string): boolean {
  if (!dateStr) return false;
  const lower = term.toLowerCase();

  // Direct substring on raw ISO date
  if (dateStr.toLowerCase().includes(lower)) return true;

  const parts = dateStr.split('-');
  if (parts.length !== 3) return false;
  const [yyyy, mm, dd] = parts;
  const monthIdx = parseInt(mm, 10) - 1;
  if (monthIdx < 0 || monthIdx > 11) return false;

  const monthFull = MONTH_NAMES[monthIdx];
  const monthAbbr = MONTH_ABBREVS[monthIdx];
  const day = parseInt(dd, 10).toString();
  const year = yyyy;

  const variants = [
    `${monthFull} ${day}, ${year}`,
    `${monthFull} ${dd}, ${year}`,
    `${monthFull} ${day}`,
    `${monthAbbr} ${day}, ${year}`,
    `${monthAbbr} ${day}`,
    `${mm}/${dd}/${yyyy}`,
    `${parseInt(mm, 10)}/${day}/${yyyy}`,
    `${mm}/${dd}`,
    `${parseInt(mm, 10)}/${day}`,
    `${mm}-${dd}-${yyyy}`,
    monthFull,
    monthAbbr,
  ];

  return variants.some(v => v.includes(lower));
}

export function StudentsPage({ onNavigate, initialActiveIncidentsFilter = false, onNavigateToIncidentDetail }: StudentsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [incidentSearchTerm, setIncidentSearchTerm] = useState('');
  const [studentLookupOpen, setStudentLookupOpen] = useState(false);
  const studentLookupRef = useRef<HTMLDivElement>(null);
  const [gradeFilter, setGradeFilter] = useState<string[]>([]);
  const [schoolFilter, setSchoolFilter] = useState<string[]>([]);
  const [activeIncidentsFilter, setActiveIncidentsFilter] = useState<boolean>(initialActiveIncidentsFilter);
  
  // Sorting state - default sort by name, then school
  const [sortColumn, setSortColumn] = useState<'id' | 'name' | 'grade' | 'school' | 'incidents' | 'lastIncident'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique grades and schools for filters
  const uniqueGrades = Array.from(new Set(mockStudents.map(s => s.grade))).sort();
  const uniqueSchools = Array.from(new Set(mockStudents.map(s => s.school))).sort();

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

  const filteredStudents = mockStudents.filter((student) => {
    // Search filter
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.school.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Grade filter (empty array = all)
    const matchesGrade = gradeFilter.length === 0 || gradeFilter.includes(student.grade);
    
    // School filter (empty array = all)
    const matchesSchool = schoolFilter.length === 0 || schoolFilter.includes(student.school);
    
    // Active incidents filter
    const hasActiveIncidents = student.incidents.some((incident: any) => incident.status !== 'Closed');
    const matchesActiveFilter = !activeIncidentsFilter || hasActiveIncidents;
    
    return matchesSearch && matchesGrade && matchesSchool && matchesActiveFilter;
  });
  
  // Function to handle column header clicks
  const handleSort = (column: typeof sortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column with ascending direction
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  // Sort the filtered students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let compareResult = 0;
    
    switch (sortColumn) {
      case 'id':
        compareResult = a.id.localeCompare(b.id);
        break;
      case 'name':
        compareResult = a.name.localeCompare(b.name);
        // Secondary sort by school if names are equal
        if (compareResult === 0) {
          compareResult = a.school.localeCompare(b.school);
        }
        break;
      case 'grade':
        compareResult = a.grade.localeCompare(b.grade);
        break;
      case 'school':
        compareResult = a.school.localeCompare(b.school);
        break;
      case 'incidents':
        compareResult = a.incidentCount - b.incidentCount;
        break;
      case 'lastIncident':
        compareResult = new Date(a.lastIncident).getTime() - new Date(b.lastIncident).getTime();
        break;
    }
    
    return sortDirection === 'asc' ? compareResult : -compareResult;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedStudents.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedStudents = sortedStudents.slice(startIndex, startIndex + rowsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, gradeFilter, schoolFilter, activeIncidentsFilter, rowsPerPage]);
  
  // Render sort icon for column header
  const SortIcon = ({ column }: { column: typeof sortColumn }) => {
    if (sortColumn !== column) {
      return <ChevronsUpDown className="h-4 w-4 ml-1 text-muted-foreground" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 ml-1" /> 
      : <ChevronDown className="h-4 w-4 ml-1" />;
  };

  const activeFilterCount = [
    gradeFilter.length > 0,
    schoolFilter.length > 0,
    activeIncidentsFilter
  ].filter(Boolean).length;

  const clearFilters = () => {
    setGradeFilter([]);
    setSchoolFilter([]);
    setActiveIncidentsFilter(false);
  };

  const handleExport = (format: ExportFormat) => {
    const formatLabels: Record<ExportFormat, string> = {
      excel: 'Excel Spreadsheet', word: 'Word Document', csv: 'CSV', 'csv-no-header': 'CSV (no header)',
    };
    toast.success('Export started', {
      description: `Preparing ${formatLabels[format]} export for students data.`,
    });
  };

  // KPI calculations
  const totalStudents = mockStudents.length;
  const studentsWithActiveIncidents = mockStudents.filter(s => s.incidents.some((i: any) => i.status !== 'Closed')).length;
  const totalStudentIncidents = mockStudents.reduce((sum, s) => sum + s.incidentCount, 0);
  const repeatOffenders = mockStudents.filter(s => s.incidentCount >= 3).length;

  return (
    <div style={{ padding: 'var(--forge-spacing-xlarge)' }}>
      {/* Page Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <div>
          <h1 style={{ margin: 0, marginBottom: '8px', fontFamily: 'Roboto, sans-serif' }}>Students</h1>
          <p className="text-muted-foreground" style={{ margin: 0, fontFamily: 'Roboto, sans-serif' }}>
            View student records and associated incidents
          </p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', borderRadius: 'var(--forge-radius-large)', borderColor: 'var(--forge-color-border-default)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>Total Students</h3>
            <Users className="h-4 w-4" style={{ color: 'var(--brand-blue-dark)' }} />
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--brand-blue-dark)', fontFamily: 'Roboto, sans-serif' }}>
              {totalStudents}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--forge-spacing-xxsmall)', fontFamily: 'Roboto, sans-serif' }}>
              In district transportation
            </p>
          </div>
        </ForgeCard>

        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', borderRadius: 'var(--forge-radius-large)', borderColor: 'var(--forge-color-border-default)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>Active Incidents</h3>
            <AlertCircle className="h-4 w-4" style={{ color: '#ea580c' }} />
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: '#ea580c', fontFamily: 'Roboto, sans-serif' }}>
              {studentsWithActiveIncidents}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--forge-spacing-xxsmall)', fontFamily: 'Roboto, sans-serif' }}>
              Students with open incidents
            </p>
          </div>
        </ForgeCard>

        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', borderRadius: 'var(--forge-radius-large)', borderColor: 'var(--forge-color-border-default)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>Total Incidents</h3>
            <AlertTriangle className="h-4 w-4" style={{ color: '#dc2626' }} />
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: '#dc2626', fontFamily: 'Roboto, sans-serif' }}>
              {totalStudentIncidents}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--forge-spacing-xxsmall)', fontFamily: 'Roboto, sans-serif' }}>
              Across all students
            </p>
          </div>
        </ForgeCard>

        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', borderRadius: 'var(--forge-radius-large)', borderColor: 'var(--forge-color-border-default)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>Repeat Offenders</h3>
            <RefreshCw className="h-4 w-4" style={{ color: 'var(--brand-olive-medium)' }} />
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--brand-olive-medium)', fontFamily: 'Roboto, sans-serif' }}>
              {repeatOffenders}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--forge-spacing-xxsmall)', fontFamily: 'Roboto, sans-serif' }}>
              Students with 3+ incidents
            </p>
          </div>
        </ForgeCard>
      </div>

      {/* Search and Filters */}
      <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', marginBottom: 'var(--forge-spacing-large)' }}>
        <div style={{ padding: 'var(--forge-spacing-medium)', paddingTop: 'var(--forge-spacing-large)' }}>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[300px]" ref={studentLookupRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Input
                placeholder="Search by student name, ID, or school..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setStudentLookupOpen(true);
                }}
                onFocus={() => setStudentLookupOpen(true)}
                className="pl-10"
              />
              {studentLookupOpen && searchTerm && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-[400px] overflow-auto">
                  <Command className="bg-white">
                    <CommandList className="bg-white">
                      <CommandEmpty className="text-foreground p-4 text-center">No student found.</CommandEmpty>
                      <CommandGroup className="bg-white">
                        {mockStudents
                          .filter((student) =>
                            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.school.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((student) => (
                            <CommandItem
                              key={student.id}
                              value={student.name}
                              onSelect={() => {
                                setSearchTerm(student.name);
                                setStudentLookupOpen(false);
                              }}
                              className="hover:bg-accent text-foreground cursor-pointer group"
                            >
                              <Check
                                className={
                                  searchTerm === student.name
                                    ? "mr-2 h-4 w-4 opacity-100 group-hover:text-white"
                                    : "mr-2 h-4 w-4 opacity-0"
                                }
                              />
                              <div className="flex flex-col">
                                <div className="text-foreground group-hover:text-white">{student.name}</div>
                                <div className="text-sm text-muted-foreground group-hover:text-white">
                                  {student.id} • {student.grade} • {student.school}
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

            {/* Filters Section */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters:</span>
              </div>

              {/* Grade Filter - Forge MultiSelect */}
              <ForgeMultiSelect
                options={uniqueGrades.map(g => ({ value: g, label: g }))}
                selected={gradeFilter}
                onChange={setGradeFilter}
                placeholder="Grade"
                allLabel="All Grades"
                width="180px"
              />

              {/* School Filter - Forge MultiSelect */}
              <ForgeMultiSelect
                options={uniqueSchools.map(s => ({ value: s, label: s }))}
                selected={schoolFilter}
                onChange={setSchoolFilter}
                placeholder="School"
                allLabel="All Schools"
                width="220px"
              />

              {/* Active Incidents Filter */}
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={activeIncidentsFilter}
                  onCheckedChange={(checked) => setActiveIncidentsFilter(checked === true)}
                  id="active-incidents"
                />
                <label 
                  htmlFor="active-incidents"
                  className="text-sm text-muted-foreground cursor-pointer whitespace-nowrap"
                >
                  Active Incidents Only
                </label>
              </div>

              {/* Clear Filters Button */}
              {activeFilterCount > 0 && (
                <ForgeButton variant="outlined" size="sm" onClick={clearFilters}>
                  Clear Filters
                </ForgeButton>
              )}
            </div>
          </div>
        </div>
      </ForgeCard>

      {/* Active Filter Banner */}
      {activeIncidentsFilter && (
        <div className="flex items-center gap-3 p-3 rounded-md mb-4" style={{ backgroundColor: 'var(--forge-color-surface-info, #f5f3ff)', border: '1px solid var(--forge-color-border-info, #c4b5fd)', borderRadius: 'var(--forge-radius-medium)', fontFamily: 'var(--forge-font-family)' }}>
          <AlertCircle className="h-4 w-4 shrink-0" style={{ color: 'var(--forge-color-text-info, #7c3aed)' }} />
          <span style={{ fontSize: 'var(--forge-font-size-sm)', color: 'var(--forge-color-text-info, #5b21b6)', fontFamily: 'var(--forge-font-family)' }}>
            Filtered view: Showing only students with active (non-closed) incidents
          </span>
          <ForgeButton
            variant="flat"
            size="sm"
            className="ml-auto h-7"
            style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}
            onClick={clearFilters}
          >
            Clear Filters
          </ForgeButton>
        </div>
      )}

      {/* Students Table */}
      <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
        <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between">
          <h3 className="forge-typography--heading4">
            All Students <span className="text-muted-foreground">({filteredStudents.length})</span>
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
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Student ID
                      <SortIcon column="id" />
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Name
                      <SortIcon column="name" />
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('grade')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Grade
                      <SortIcon column="grade" />
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('school')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      School
                      <SortIcon column="school" />
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('incidents')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Total Incidents
                      <SortIcon column="incidents" />
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('lastIncident')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Last Incident
                      <SortIcon column="lastIncident" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student) => {
                  const activeIncidents = student.incidents.filter((incident: any) => incident.status !== 'Closed');
                  const hasActiveIncidents = activeIncidents.length > 0;
                  const highestActiveSeverity = hasActiveIncidents
                    ? (activeIncidents.some((i: any) => i.severity === 'High') ? 'High'
                      : activeIncidents.some((i: any) => i.severity === 'Medium') ? 'Medium'
                      : 'Low')
                    : null;
                  
                  return (
                    <Dialog key={student.id}>
                      <DialogTrigger asChild>
                        <tr
                          className="forge-table-row cursor-pointer"
                          onClick={() => { setSelectedStudent(student); setIncidentSearchTerm(''); }}
                        >
                        <td className="forge-table-cell">
                          <span
                            style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-sm)' }}
                          >
                            {student.id}
                          </span>
                        </td>
                        <td className="forge-table-cell">
                          <div>
                            <div style={{ fontWeight: 500, fontFamily: 'var(--forge-font-family)' }}>{student.name}</div>
                            {hasActiveIncidents && (
                              <div className="flex items-center gap-1 mt-0.5">
                                <Badge
                                  className={
                                    highestActiveSeverity === 'High'
                                      ? 'h-5 text-xs bg-red-100 text-red-700 hover:bg-red-200 border-red-300'
                                      : highestActiveSeverity === 'Medium'
                                      ? 'h-5 text-xs bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300'
                                      : 'h-5 text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300'
                                  }
                                  style={{ fontFamily: 'var(--forge-font-family)' }}
                                >
                                  Active Incident
                                </Badge>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="forge-table-cell">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span style={{ fontSize: '0.875rem' }}>{student.grade}</span>
                          </div>
                        </td>
                        <td className="forge-table-cell">
                          <div className="flex items-center gap-2">
                            <School className="h-4 w-4 text-muted-foreground" />
                            <span style={{ fontSize: '0.875rem' }}>{student.school}</span>
                          </div>
                        </td>
                        <td className="forge-table-cell">
                          {/* Incident count badge with color coding:
                              1-2 incidents: yellow
                              3 incidents: orange
                              4+ incidents: red */}
                          <Badge
                            className={
                              student.incidentCount >= 4
                                ? "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
                                : student.incidentCount === 3
                                ? "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200"
                                : "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                            }
                          >
                            {student.incidentCount} {student.incidentCount === 1 ? 'incident' : 'incidents'}
                          </Badge>
                        </td>
                        <td className="forge-table-cell">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span style={{ fontSize: '0.875rem' }}>{student.lastIncident}</span>
                          </div>
                        </td>
                        </tr>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col" aria-describedby={undefined}>
                        <DialogHeader>
                          <DialogTitle style={{ fontFamily: 'var(--forge-font-family)', fontWeight: 'var(--forge-font-weight-medium)' }}>Student Profile - {selectedStudent?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="overflow-y-auto flex-1 pr-2" style={{ maxHeight: 'calc(85vh - 120px)' }}>
                          {selectedStudent && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-large)' }}>
                              {/* Student Quick Info - No Photo */}
                              <div style={{ paddingBottom: 'var(--forge-spacing-medium)', borderBottom: '1px solid var(--forge-color-border-default)' }}>
                                <div style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-sm)', color: 'var(--foreground)' }}>
                                  Student ID: {selectedStudent.id}
                                  <span style={{ margin: '0 var(--forge-spacing-xsmall)', color: 'var(--muted-foreground)' }}>·</span>
                                  {selectedStudent.grade}
                                </div>
                                <div style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-sm)', color: 'var(--muted-foreground)', marginTop: 'var(--forge-spacing-xxsmall)' }}>
                                  {selectedStudent.school}
                                </div>
                              </div>

                              {/* Incident Summary */}
                              <div>
                                <h3 style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-lg)', fontWeight: 'var(--forge-font-weight-medium)', marginBottom: 'var(--forge-spacing-small)' }}>
                                  Incident Summary
                                </h3>
                                <div className="grid grid-cols-2" style={{ gap: 'var(--forge-spacing-medium)', marginBottom: 'var(--forge-spacing-medium)' }}>
                                  <div>
                                    <div style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-sm)', color: 'var(--muted-foreground)' }}>Total Incidents</div>
                                    <div style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-xl)', fontWeight: 'var(--forge-font-weight-medium)' }}>{selectedStudent.incidentCount}</div>
                                  </div>
                                  <div>
                                    <div style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-sm)', color: 'var(--muted-foreground)' }}>Last Incident</div>
                                    <div className="flex items-center" style={{ gap: 'var(--forge-spacing-xsmall)', fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-sm)' }}>
                                      <Calendar className="h-4 w-4 text-muted-foreground" />
                                      <span>{selectedStudent.lastIncident}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Incident Search/Filter */}
                                <div className="relative" style={{ marginBottom: 'var(--forge-spacing-xsmall)' }}>
                                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                  <input
                                    type="text"
                                    placeholder="Search incidents by ID, type, status, or description..."
                                    value={incidentSearchTerm}
                                    onChange={(e) => setIncidentSearchTerm(e.target.value)}
                                    className="w-full border rounded pl-7 pr-7 py-1.5 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                    style={{
                                      fontFamily: 'var(--forge-font-family)',
                                      fontSize: 'var(--forge-font-size-xs)',
                                      borderColor: 'var(--forge-color-border-default)',
                                      borderRadius: 'var(--forge-radius-medium)',
                                    }}
                                  />
                                  {incidentSearchTerm && (
                                    <button
                                      onClick={() => setIncidentSearchTerm('')}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground bg-transparent border-none p-0 cursor-pointer"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  )}
                                </div>

                                {/* Incidents List */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--forge-spacing-small)' }}>
                                  {selectedStudent.incidents
                                    .filter((incident: any) => {
                                      if (!incidentSearchTerm.trim()) return true;
                                      const term = incidentSearchTerm.toLowerCase();
                                      return (
                                        incident.id?.toLowerCase().includes(term) ||
                                        incident.type?.toLowerCase().includes(term) ||
                                        incident.status?.toLowerCase().includes(term) ||
                                        incident.severity?.toLowerCase().includes(term) ||
                                        incident.description?.toLowerCase().includes(term) ||
                                        matchesDate(incident.date, incidentSearchTerm)
                                      );
                                    })
                                    .map((incident: any) => (
                                    <ForgeCard
                                      key={incident.id}
                                      className="hover:bg-accent/50 transition-colors cursor-pointer"
                                      style={{ border: '1px solid var(--forge-color-border-subtle)', borderRadius: 'var(--forge-radius-large)' }}
                                      onClick={() => {
                                        if (onNavigateToIncidentDetail && selectedStudent) {
                                          const fullIncident = {
                                            ...incident,
                                            student: selectedStudent.name,
                                            studentId: selectedStudent.id,
                                            bus: selectedStudent.bus,
                                            route: selectedStudent.route,
                                            driver: 'Assigned Driver',
                                            assignedTo: 'Jane Doe',
                                            createdBy: 'System',
                                          };
                                          onNavigateToIncidentDetail(fullIncident);
                                        }
                                      }}
                                    >
                                      <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                                        {/* Row 1: Incident ID + Date */}
                                        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--forge-spacing-xsmall)' }}>
                                          <span
                                            style={{ fontWeight: 'var(--forge-font-weight-medium)', fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-sm)', color: 'var(--foreground)' }}
                                          >
                                            {incident.id}
                                          </span>
                                          <span style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)' }}>
                                            {incident.date}
                                          </span>
                                        </div>
                                        {/* Row 2: Type + Severity badges left, Status badge right */}
                                        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--forge-spacing-xsmall)' }}>
                                          <div className="flex items-center" style={{ gap: 'var(--forge-spacing-xxsmall)' }}>
                                            <Badge variant="outline" style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-xs)' }}>{incident.type}</Badge>
                                            <Badge
                                              variant={
                                                incident.severity === 'High' ? 'destructive' :
                                                incident.severity === 'Medium' ? 'secondary' :
                                                'outline'
                                              }
                                              style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-xs)' }}
                                            >
                                              {incident.severity}
                                            </Badge>
                                          </div>
                                          <Badge
                                            variant={
                                              incident.status === 'Open' ? 'default' :
                                              incident.status === 'In Progress' ? 'secondary' :
                                              'outline'
                                            }
                                            style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-xs)' }}
                                          >
                                            {incident.status}
                                          </Badge>
                                        </div>
                                        {/* Row 3: Description */}
                                        <p style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)', color: 'var(--muted-foreground)', margin: 0 }}>
                                          {incident.description}
                                        </p>
                                      </div>
                                    </ForgeCard>
                                  ))}
                                  {incidentSearchTerm.trim() && selectedStudent.incidents.filter((inc: any) => {
                                    const t = incidentSearchTerm.toLowerCase();
                                    return inc.id?.toLowerCase().includes(t) || inc.type?.toLowerCase().includes(t) || inc.status?.toLowerCase().includes(t) || inc.severity?.toLowerCase().includes(t) || inc.description?.toLowerCase().includes(t) || matchesDate(inc.date, incidentSearchTerm);
                                  }).length === 0 && (
                                    <div className="text-center" style={{ padding: 'var(--forge-spacing-medium)', color: 'var(--muted-foreground)', fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-sm)' }}>
                                      No incidents match &ldquo;{incidentSearchTerm}&rdquo;
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between" style={{ paddingTop: 'var(--forge-spacing-medium)', borderTop: '1px solid var(--forge-color-border-subtle)', marginTop: 'var(--forge-spacing-medium)' }}>
            <div className="flex items-center" style={{ gap: 'var(--forge-spacing-small)' }}>
              <span style={{ fontSize: 'var(--forge-font-size-sm)', color: 'var(--muted-foreground)' }}>
                Showing {startIndex + 1}–{Math.min(startIndex + rowsPerPage, sortedStudents.length)} of {sortedStudents.length} students
              </span>
              {rowsPerPage === 10 && sortedStudents.length > 10 && (
                <ForgeButton
                  variant="outlined"
                  size="sm"
                  onClick={() => { setRowsPerPage(25); setCurrentPage(1); }}
                  style={{ fontSize: 'var(--forge-font-size-sm)' }}
                >
                  Show 25
                </ForgeButton>
              )}
              {rowsPerPage === 25 && (
                <ForgeButton
                  variant="outlined"
                  size="sm"
                  onClick={() => { setRowsPerPage(10); setCurrentPage(1); }}
                  style={{ fontSize: 'var(--forge-font-size-sm)' }}
                >
                  Show 10
                </ForgeButton>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center" style={{ gap: 'var(--forge-spacing-xsmall)' }}>
                <ForgeButton
                  variant="outlined"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  style={{ padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)' }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </ForgeButton>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <ForgeButton
                    key={page}
                    variant={page === currentPage ? 'raised' : 'outlined'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    style={{ minWidth: '32px', padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)', fontSize: 'var(--forge-font-size-sm)' }}
                  >
                    {page}
                  </ForgeButton>
                ))}
                <ForgeButton
                  variant="outlined"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  style={{ padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)' }}
                >
                  <ChevronRight className="h-4 w-4" />
                </ForgeButton>
              </div>
            )}
          </div>
        </div>
      </ForgeCard>
    </div>
  );
}