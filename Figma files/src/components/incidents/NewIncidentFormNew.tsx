import { useState, useEffect, useRef } from 'react';
import { ForgeCard, ForgeButton } from '@tylertech/forge-react';
import { defineCardComponent } from '@tylertech/forge';
defineCardComponent();
import { defineButtonComponent } from '@tylertech/forge';
defineButtonComponent();
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { AlertCircle, Save, Send, Check, Circle, CheckCircle2, MapPin, Upload, X, Image as ImageIcon, FileText, File, UserCircle2, Users } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { INCIDENT_TYPES, getAllCategories } from './IncidentTypes';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';

const mockStudents = [
  { 
    id: 'STU-2891', 
    name: 'Sarah Mitchell', 
    grade: '9th Grade', 
    school: 'Lincoln Middle School',
    photoUrl: 'https://images.unsplash.com/photo-1622319107576-cca7c8a906f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjB0ZWVuYWdlcnxlbnwxfHx8fDE3Njc3MTc2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bus: 'bus-12',
    route: 'lincoln-elem-am-green'
  },
  { 
    id: 'STU-3421', 
    name: 'Marcus Johnson', 
    grade: '10th Grade', 
    school: 'Washington High School',
    photoUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwc2Nob29sJTIwc3R1ZGVudHxlbnwxfHx8fDE3Njc3MTc2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bus: 'bus-15',
    route: 'washington-high-pm-wolf'
  },
  { 
    id: 'STU-1956', 
    name: 'Emma Rodriguez', 
    grade: '8th Grade', 
    school: 'Jefferson Middle School',
    photoUrl: 'https://images.unsplash.com/photo-1613272976530-ebe48380591c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBzY2hvb2wlMjBzdHVkZW50fGVufDF8fHx8MTc2NzcxNzYyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    bus: 'bus-22',
    route: 'jefferson-middle-am-blue'
  },
  { 
    id: 'STU-4782', 
    name: 'James Thompson', 
    grade: '9th Grade', 
    school: 'Roosevelt High School',
    photoUrl: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3Njc3MTc2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bus: 'bus-31',
    route: 'roosevelt-high-pm-red'
  },
  { 
    id: 'STU-5623', 
    name: 'Olivia Davis', 
    grade: '11th Grade', 
    school: 'Washington High School',
    photoUrl: 'https://images.unsplash.com/photo-1615466178532-b6d2f9c304de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkZW50JTIwcGhvdG98ZW58MXx8fHwxNzY3NzAzNTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bus: 'bus-8',
    route: 'washington-high-pm-wolf'
  },
  { 
    id: 'STU-6891', 
    name: 'Noah Wilson', 
    grade: '7th Grade', 
    school: 'Lincoln Middle School',
    photoUrl: 'https://images.unsplash.com/photo-1520423465871-0866049020b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NzY5ODQ2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    bus: 'bus-12',
    route: 'lincoln-elem-am-green'
  },
  { 
    id: 'STU-7234', 
    name: 'Ava Martinez', 
    grade: '10th Grade', 
    school: 'Jefferson Middle School',
    photoUrl: 'https://images.unsplash.com/photo-1606238899933-ac997d8a1bea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHN0dWRlbnR8ZW58MXx8fHwxNzY3NzE3NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bus: 'bus-22',
    route: 'jefferson-middle-am-blue'
  },
  { 
    id: 'STU-8156', 
    name: 'Ethan Anderson', 
    grade: '12th Grade', 
    school: 'Washington High School',
    photoUrl: 'https://images.unsplash.com/photo-1622319107576-cca7c8a906f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjB0ZWVuYWdlcnxlbnwxfHx8fDE3Njc3MTc2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bus: 'bus-15',
    route: 'washington-high-pm-wolf'
  },
];

// Mock driver data
const mockDrivers = [
  { 
    id: 'DRV-101', 
    name: 'Robert Martinez',
    employeeId: 'EMP-4521',
    photoUrl: 'https://images.unsplash.com/photo-1633665503034-78f3628a86e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXMlMjBkcml2ZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njc3MTg2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    routes: ['lincoln-elem-am-green']
  },
  { 
    id: 'DRV-102', 
    name: 'Jennifer Davis',
    employeeId: 'EMP-4522',
    photoUrl: 'https://images.unsplash.com/photo-1758691737610-1f18e008f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrZXIlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2NzcxODY2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    routes: ['washington-high-pm-wolf']
  },
  { 
    id: 'DRV-103', 
    name: 'Michael Chen',
    employeeId: 'EMP-4523',
    photoUrl: 'https://images.unsplash.com/photo-1568585105565-e372998a195d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrZXIlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3Njc3MTg2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    routes: ['jefferson-middle-am-blue']
  },
  { 
    id: 'DRV-104', 
    name: 'Patricia Johnson',
    employeeId: 'EMP-4524',
    photoUrl: 'https://images.unsplash.com/photo-1599768431736-c78b881ae983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkcml2ZXIlMjBoZWFkc2hvdHxlbnwxfHx8fDE3Njc3MTg2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    routes: ['roosevelt-high-pm-red']
  },
  { 
    id: 'DRV-105', 
    name: 'David Thompson',
    employeeId: 'EMP-4525',
    photoUrl: 'https://images.unsplash.com/photo-1485540031485-a278dfc63d2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc2l0JTIwZHJpdmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY3NzE4NjY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    routes: ['colonie-high-am-purple']
  },
  { 
    id: 'DRV-106', 
    name: 'Lisa Anderson',
    employeeId: 'EMP-4526',
    photoUrl: 'https://images.unsplash.com/photo-1695395860911-2be98a6cba4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidXMlMjBkcml2ZXIlMjB1bmlmb3JtfGVufDF8fHx8MTc2NzcxODY2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    routes: ['meyers-middle-am-yellow']
  },
];

// Mock verified addresses (simulating Google Places API)
const mockAddresses = [
  { id: '1', fullAddress: '1234 Main Street, Meridian, ID 83642, USA', street: '1234 Main Street', city: 'Meridian', state: 'ID', zip: '83642' },
  { id: '2', fullAddress: '5678 Elm Avenue, Meridian, ID 83646, USA', street: '5678 Elm Avenue', city: 'Meridian', state: 'ID', zip: '83646' },
  { id: '3', fullAddress: '910 Oak Drive, Boise, ID 83704, USA', street: '910 Oak Drive', city: 'Boise', state: 'ID', zip: '83704' },
  { id: '4', fullAddress: '2345 Maple Lane, Eagle, ID 83616, USA', street: '2345 Maple Lane', city: 'Eagle', state: 'ID', zip: '83616' },
  { id: '5', fullAddress: '3456 Pine Road, Nampa, ID 83651, USA', street: '3456 Pine Road', city: 'Nampa', state: 'ID', zip: '83651' },
  { id: '6', fullAddress: '4567 Cedar Court, Kuna, ID 83634, USA', street: '4567 Cedar Court', city: 'Kuna', state: 'ID', zip: '83634' },
  { id: '7', fullAddress: '7890 Birch Boulevard, Star, ID 83669, USA', street: '7890 Birch Boulevard', city: 'Star', state: 'ID', zip: '83669' },
  { id: '8', fullAddress: '6789 Willow Way, Caldwell, ID 83605, USA', street: '6789 Willow Way', city: 'Caldwell', state: 'ID', zip: '83605' },
  { id: '9', fullAddress: '8901 Aspen Street, Garden City, ID 83714, USA', street: '8901 Aspen Street', city: 'Garden City', state: 'ID', zip: '83714' },
  { id: '10', fullAddress: '1230 Spruce Avenue, Meridian, ID 83642, USA', street: '1230 Spruce Avenue', city: 'Meridian', state: 'ID', zip: '83642' },
  { id: '11', fullAddress: '456 Cherry Lane, Boise, ID 83702, USA', street: '456 Cherry Lane', city: 'Boise', state: 'ID', zip: '83702' },
  { id: '12', fullAddress: '789 Walnut Drive, Eagle, ID 83616, USA', street: '789 Walnut Drive', city: 'Eagle', state: 'ID', zip: '83616' },
];

interface NewIncidentFormProps {
  onNavigate: (page: string) => void;
}

export function NewIncidentForm({ onNavigate }: NewIncidentFormProps) {
  const [incidentCategory, setIncidentCategory] = useState<'student' | 'driver' | null>(null);
  const [formData, setFormData] = useState({
    student: '',
    studentId: '',
    incidentType: '',
    severity: '',
    description: '',
    location: '',
    address: '',
    bus: '',
    route: '',
    driver: '',
    witnessPresent: false,
    witnessName: '',
    parentNotified: false,
    actionTaken: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [studentLookupOpen, setStudentLookupOpen] = useState(false);
  const [addressLookupOpen, setAddressLookupOpen] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ id: string; name: string; url: string; size: string }>>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{ id: string; name: string; size: string; type: string }>>([]);
  const [selectedStudent, setSelectedStudent] = useState<typeof mockStudents[0] | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<typeof mockDrivers[0] | null>(null);
  const studentLookupRef = useRef<HTMLDivElement>(null);
  const addressLookupRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (studentLookupRef.current && !studentLookupRef.current.contains(event.target as Node)) {
        setStudentLookupOpen(false);
      }
      if (addressLookupRef.current && !addressLookupRef.current.contains(event.target as Node)) {
        setAddressLookupOpen(false);
      }
    };

    if (studentLookupOpen || addressLookupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [studentLookupOpen, addressLookupOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate('incidents');
    }, 3000);
  };

  // Auto-set severity based on incident type
  const handleIncidentTypeChange = (value: string) => {
    const selectedType = INCIDENT_TYPES.find(t => t.id === value);
    setFormData({ 
      ...formData, 
      incidentType: value,
      severity: selectedType?.defaultSeverity.toLowerCase() || ''
    });
  };

  // Handle photo uploads
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = Array.from(files).map((file, index) => {
      const url = URL.createObjectURL(file);
      const sizeInKB = (file.size / 1024).toFixed(1);
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      const displaySize = file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`;
      
      return {
        id: `${Date.now()}-${index}`,
        name: file.name,
        url: url,
        size: displaySize,
      };
    });

    setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
    
    // Reset input so same file can be uploaded again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove photo
  const handleRemovePhoto = (photoId: string) => {
    setUploadedPhotos(uploadedPhotos.filter(photo => photo.id !== photoId));
  };

  // Handle document uploads
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newDocuments = Array.from(files).map((file, index) => {
      const sizeInKB = (file.size / 1024).toFixed(1);
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      const displaySize = file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`;
      
      return {
        id: `${Date.now()}-${index}`,
        name: file.name,
        size: displaySize,
        type: file.type,
      };
    });

    setUploadedDocuments([...uploadedDocuments, ...newDocuments]);
    
    // Reset input so same file can be uploaded again if removed
    if (documentInputRef.current) {
      documentInputRef.current.value = '';
    }
  };

  // Remove document
  const handleRemoveDocument = (documentId: string) => {
    setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== documentId));
  };

  // Get filtered locations based on incident category
  const getLocationOptions = () => {
    const studentLocations = [
      { category: 'ON ROUTE', items: [
        { value: 'on-bus', label: 'On Vehicle' },
        { value: 'bus-stop', label: 'At Vehicle Stop' },
        { value: 'loading', label: 'Loading/Unloading' },
      ]},
      { category: 'SCHOOL/LOCATION', items: [
        { value: 'school-campus', label: 'School Campus' },
        { value: 'parking-lot', label: 'Parking Lot' },
        { value: 'layover-location', label: 'Layover Location' },
      ]},
      { category: 'OTHER', items: [
        { value: 'other', label: 'Other' },
      ]},
    ];

    const driverLocations = [
      { category: 'ON ROUTE', items: [
        { value: 'on-bus', label: 'On Vehicle' },
        { value: 'bus-stop', label: 'At Vehicle Stop' },
        { value: 'loading', label: 'Loading/Unloading' },
      ]},
      { category: 'FACILITY', items: [
        { value: 'garage', label: 'Garage' },
        { value: 'yard', label: 'Yard' },
        { value: 'maintenance-bay', label: 'Maintenance Bay' },
        { value: 'fuel-station', label: 'Fuel Station' },
        { value: 'wash-bay', label: 'Wash Bay' },
      ]},
      { category: 'SCHOOL/LOCATION', items: [
        { value: 'school-campus', label: 'School Campus' },
        { value: 'parking-lot', label: 'Parking Lot' },
        { value: 'layover-location', label: 'Layover Location' },
      ]},
      { category: 'OTHER', items: [
        { value: 'other', label: 'Other' },
      ]},
    ];

    return incidentCategory === 'student' ? studentLocations : driverLocations;
  };

  return (
    <div>
      {showSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Incident report submitted successfully! Supervisor has been notified.
          </AlertDescription>
        </Alert>
      )}

      {/* Incident Category Selection */}
      {!incidentCategory && (
        <ForgeCard style={{ border: 'none', boxShadow: 'none' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }}>
            <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif' }}>Select Incident Type</h3>
            <p className="forge-typography--body2" style={{ color: 'var(--forge-theme-text-medium)', fontFamily: 'Roboto, sans-serif' }}>
              Choose whether this incident involves a student or a driver
            </p>
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => setIncidentCategory('student')}
                className="group relative p-8 border-2 rounded-lg hover:border-primary transition-all bg-white hover:bg-primary/5"
                style={{ 
                  borderColor: 'var(--forge-color-border-default)',
                  borderRadius: 'var(--forge-radius-large)'
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-100 group-hover:bg-blue-200 transition-colors"
                  >
                    <Users className="w-10 h-10 text-blue-600" />
                  </div>
                  <div>
                    <h3 
                      className="font-semibold mb-2"
                      style={{ 
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)'
                      }}
                    >
                      Student Incident
                    </h3>
                    <p 
                      className="text-sm text-muted-foreground"
                      style={{ 
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 'var(--text-sm)'
                      }}
                    >
                      Report behavioral, safety, or other incidents involving students on routes or at school locations
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIncidentCategory('driver')}
                className="group relative p-8 border-2 rounded-lg hover:border-primary transition-all bg-white hover:bg-primary/5"
                style={{ 
                  borderColor: 'var(--forge-color-border-default)',
                  borderRadius: 'var(--forge-radius-large)'
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center bg-green-100 group-hover:bg-green-200 transition-colors"
                  >
                    <UserCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <div>
                    <h3 
                      className="font-semibold mb-2"
                      style={{ 
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)'
                      }}
                    >
                      Driver Incident
                    </h3>
                    <p 
                      className="text-sm text-muted-foreground"
                      style={{ 
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 'var(--text-sm)'
                      }}
                    >
                      Report safety, operational, or facility incidents involving drivers at any location
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </ForgeCard>
      )}

      {/* Main Form - Only show after category is selected */}
      {incidentCategory && (
        <div>
          {/* Back button */}
          <div className="mb-6">
            <ForgeButton
              type="button"
              variant="outlined"
              onClick={() => {
                setIncidentCategory(null);
                setFormData({
                  student: '',
                  studentId: '',
                  incidentType: '',
                  severity: '',
                  description: '',
                  location: '',
                  address: '',
                  bus: '',
                  route: '',
                  driver: '',
                  witnessPresent: false,
                  witnessName: '',
                  parentNotified: false,
                  actionTaken: '',
                });
                setSelectedStudent(null);
                setSelectedDriver(null);
              }}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              ← Change Incident Type
            </ForgeButton>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Student Information - Only show for student incidents */}
            {incidentCategory === 'student' && (
              <ForgeCard style={{ border: 'none', boxShadow: 'none', marginBottom: 'var(--forge-spacing-large)' }}>
                <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                  <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif' }}>Student Information</h3>
                  <p className="forge-typography--body2" style={{ color: 'var(--forge-theme-text-medium)', fontFamily: 'Roboto, sans-serif' }}>Identify the student involved in the incident</p>
                </div>
                <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Student Input Fields */}
                    <div className="space-y-4">
                      <div className="relative" ref={studentLookupRef}>
                        <Label htmlFor="student" style={{ fontFamily: 'Roboto, sans-serif' }}>Student Name *</Label>
                        <Input
                          id="student"
                          value={formData.student}
                          onChange={(e) => {
                            setFormData({ ...formData, student: e.target.value });
                            setStudentLookupOpen(true);
                          }}
                          placeholder="Type to search students..."
                          required
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                        {studentLookupOpen && (
                          <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-[300px] overflow-hidden">
                            <Command>
                              <CommandList>
                                <CommandEmpty style={{ fontFamily: 'Roboto, sans-serif' }}>No student found.</CommandEmpty>
                                <CommandGroup>
                                  {mockStudents
                                    .filter((student) =>
                                      student.name.toLowerCase().includes(formData.student.toLowerCase()) ||
                                      student.id.toLowerCase().includes(formData.student.toLowerCase())
                                    )
                                    .map((student) => (
                                      <CommandItem
                                        key={student.id}
                                        value={student.name}
                                        onSelect={() => {
                                          setFormData({
                                            ...formData,
                                            student: student.name,
                                            studentId: student.id,
                                            bus: student.bus,
                                            route: student.route,
                                          });
                                          setSelectedStudent(student);
                                          setStudentLookupOpen(false);
                                        }}
                                        style={{ fontFamily: 'Roboto, sans-serif' }}
                                      >
                                        <Check
                                          className={
                                            formData.student === student.name
                                              ? "mr-2 h-4 w-4 opacity-100"
                                              : "mr-2 h-4 w-4 opacity-0"
                                          }
                                        />
                                        <div className="flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                          <div style={{ fontSize: 'var(--text-base)' }}>{student.name}</div>
                                          <div className="text-sm text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
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
                      
                      <div>
                        <Label htmlFor="studentId" style={{ fontFamily: 'Roboto, sans-serif' }}>Student ID</Label>
                        <Input
                          id="studentId"
                          value={formData.studentId}
                          disabled
                          className="bg-muted cursor-not-allowed"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                      </div>
                    </div>

                    {/* Right: Student Photo */}
                    {selectedStudent && (
                      <div className="flex flex-col items-center justify-center">
                        <div 
                          className="w-32 h-32 rounded-full overflow-hidden border-4 mb-3"
                          style={{ 
                            borderColor: 'var(--forge-color-border-default)',
                          }}
                        >
                          <img 
                            src={selectedStudent.photoUrl} 
                            alt={selectedStudent.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p 
                          className="text-center font-medium"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-medium)'
                          }}
                        >
                          {selectedStudent.name}
                        </p>
                        <p 
                          className="text-muted-foreground text-center"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          {selectedStudent.grade}
                        </p>
                        <p 
                          className="text-muted-foreground text-center text-xs"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 'var(--text-xs)'
                          }}
                        >
                          {selectedStudent.school}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </ForgeCard>
            )}

            {/* Driver Information - Only show for driver incidents */}
            {incidentCategory === 'driver' && (
              <ForgeCard style={{ border: 'none', boxShadow: 'none', marginBottom: 'var(--forge-spacing-large)' }}>
                <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                  <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif' }}>Driver Information</h3>
                  <p className="forge-typography--body2" style={{ color: 'var(--forge-theme-text-medium)', fontFamily: 'Roboto, sans-serif' }}>Identify the driver involved in the incident</p>
                </div>
                <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Driver Selection */}
                    <div>
                      <Label htmlFor="driverSelect" style={{ fontFamily: 'Roboto, sans-serif' }}>Driver *</Label>
                      <Select
                        value={formData.driver}
                        onValueChange={(value) => {
                          setFormData({ ...formData, driver: value });
                          const driver = mockDrivers.find(d => d.id === value);
                          setSelectedDriver(driver || null);
                        }}
                        required
                      >
                        <SelectTrigger id="driverSelect" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          <SelectValue placeholder="Select driver..." />
                        </SelectTrigger>
                        <SelectContent>
                          {mockDrivers.map((driver) => (
                            <SelectItem key={driver.id} value={driver.id} style={{ fontFamily: 'Roboto, sans-serif' }}>
                              {driver.name} ({driver.employeeId})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Right: Driver Photo */}
                    {selectedDriver && (
                      <div className="flex flex-col items-center justify-center">
                        <div 
                          className="w-32 h-32 rounded-full overflow-hidden border-4 mb-3"
                          style={{ 
                            borderColor: 'var(--forge-color-border-default)',
                          }}
                        >
                          <img 
                            src={selectedDriver.photoUrl} 
                            alt={selectedDriver.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p 
                          className="text-center font-medium"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-medium)'
                          }}
                        >
                          {selectedDriver.name}
                        </p>
                        <p 
                          className="text-muted-foreground text-center"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Employee ID: {selectedDriver.employeeId}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </ForgeCard>
            )}

            {/* Incident Details */}
            <ForgeCard style={{ border: 'none', boxShadow: 'none', marginBottom: 'var(--forge-spacing-large)' }}>
              <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif' }}>Incident Details</h3>
                <p className="forge-typography--body2" style={{ color: 'var(--forge-theme-text-medium)', fontFamily: 'Roboto, sans-serif' }}>Provide specific information about the incident</p>
              </div>
              <div className="space-y-4" style={{ marginTop: 'var(--forge-spacing-small)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="incidentType" style={{ fontFamily: 'Roboto, sans-serif' }}>Incident Type *</Label>
                    <Select
                      value={formData.incidentType}
                      onValueChange={handleIncidentTypeChange}
                      required
                    >
                      <SelectTrigger id="incidentType" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-[400px]">
                        {getAllCategories().map((category) => {
                          const typesInCategory = INCIDENT_TYPES.filter(type => type.category === category)
                            .sort((a, b) => a.label.localeCompare(b.label));
                          return (
                            <div key={category}>
                              <div 
                                className="px-2 py-1.5" 
                                style={{ 
                                  fontFamily: 'Roboto, sans-serif',
                                  fontSize: 'var(--text-xs)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  color: 'rgba(255, 255, 255, 0.5)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px'
                                }}
                              >
                                {category}
                              </div>
                              {typesInCategory.map((type) => (
                                <SelectItem key={type.id} value={type.id} style={{ fontFamily: 'Roboto, sans-serif' }}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </div>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    {formData.incidentType && (
                      <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)', fontFamily: 'Roboto, sans-serif' }}>
                        {INCIDENT_TYPES.find(t => t.id === formData.incidentType)?.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="location" style={{ fontFamily: 'Roboto, sans-serif' }}>Location *</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => setFormData({ ...formData, location: value })}
                      required
                    >
                      <SelectTrigger id="location" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <SelectValue placeholder="Select location..." />
                      </SelectTrigger>
                      <SelectContent>
                        {getLocationOptions().map((locationGroup) => (
                          <div key={locationGroup.category}>
                            <div 
                              className="px-2 py-1.5 mt-2 first:mt-0" 
                              style={{ 
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: 'var(--text-xs)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: 'rgba(255, 255, 255, 0.5)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}
                            >
                              {locationGroup.category}
                            </div>
                            {locationGroup.items.map((item) => (
                              <SelectItem key={item.value} value={item.value} style={{ fontFamily: 'Roboto, sans-serif' }}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative" ref={addressLookupRef}>
                    <Label htmlFor="address" style={{ fontFamily: 'Roboto, sans-serif' }}>Address</Label>
                    <div className="relative">
                      <MapPin 
                        size={16} 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => {
                          setFormData({ ...formData, address: e.target.value });
                          setAddressLookupOpen(true);
                        }}
                        placeholder="Type to search addresses..."
                        style={{ paddingLeft: '36px', fontFamily: 'Roboto, sans-serif' }}
                      />
                    </div>
                    {addressLookupOpen && formData.address && (
                      <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-[300px] overflow-hidden">
                        <Command>
                          <CommandList>
                            <CommandEmpty style={{ fontFamily: 'Roboto, sans-serif' }}>No address found.</CommandEmpty>
                            <CommandGroup>
                              {mockAddresses
                                .filter((address) =>
                                  address.fullAddress.toLowerCase().includes(formData.address.toLowerCase())
                                )
                                .map((address) => (
                                  <CommandItem
                                    key={address.id}
                                    value={address.fullAddress}
                                    onSelect={() => {
                                      setFormData({
                                        ...formData,
                                        address: address.fullAddress,
                                      });
                                      setAddressLookupOpen(false);
                                    }}
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                  >
                                    <MapPin
                                      className={
                                        formData.address === address.fullAddress
                                          ? "mr-2 h-4 w-4 opacity-100 text-primary"
                                          : "mr-2 h-4 w-4 opacity-60 text-muted-foreground"
                                      }
                                    />
                                    <div className="flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                      <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}>{address.fullAddress}</div>
                                      <div className="text-sm text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontFamily: 'Roboto, sans-serif' }}>
                                        Verified Address
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

                  <div>
                    <Label htmlFor="bus" style={{ fontFamily: 'Roboto, sans-serif' }}>Vehicle Number</Label>
                    <Select
                      value={formData.bus}
                      onValueChange={(value) => setFormData({ ...formData, bus: value })}
                    >
                      <SelectTrigger id="bus" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <SelectValue placeholder="Select vehicle (optional)..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bus-12" style={{ fontFamily: 'Roboto, sans-serif' }}>Vehicle 12</SelectItem>
                        <SelectItem value="bus-15" style={{ fontFamily: 'Roboto, sans-serif' }}>Vehicle 15</SelectItem>
                        <SelectItem value="bus-22" style={{ fontFamily: 'Roboto, sans-serif' }}>Vehicle 22</SelectItem>
                        <SelectItem value="bus-31" style={{ fontFamily: 'Roboto, sans-serif' }}>Vehicle 31</SelectItem>
                        <SelectItem value="bus-8" style={{ fontFamily: 'Roboto, sans-serif' }}>Vehicle 8</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="route" style={{ fontFamily: 'Roboto, sans-serif' }}>Run</Label>
                    <Select
                      value={formData.route}
                      onValueChange={(value) => {
                        // Find the driver assigned to this route
                        const assignedDriver = mockDrivers.find(driver => 
                          driver.routes.includes(value)
                        );
                        
                        setFormData({ 
                          ...formData, 
                          route: value,
                          driver: assignedDriver ? assignedDriver.id : formData.driver
                        });
                        
                        // Update selected driver if found and we're in driver mode
                        if (assignedDriver && incidentCategory === 'driver') {
                          setSelectedDriver(assignedDriver);
                        }
                      }}
                    >
                      <SelectTrigger id="route" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <SelectValue placeholder="Select run (optional)..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="colonie-high-am-purple" style={{ fontFamily: 'Roboto, sans-serif' }}>Colonie High AM - Purple</SelectItem>
                        <SelectItem value="jefferson-middle-am-blue" style={{ fontFamily: 'Roboto, sans-serif' }}>Jefferson Middle AM - Blue</SelectItem>
                        <SelectItem value="lincoln-elem-am-green" style={{ fontFamily: 'Roboto, sans-serif' }}>Lincoln Elementary AM - Green</SelectItem>
                        <SelectItem value="meyers-middle-am-yellow" style={{ fontFamily: 'Roboto, sans-serif' }}>Meyers Middle AM - Yellow</SelectItem>
                        <SelectItem value="roosevelt-high-pm-red" style={{ fontFamily: 'Roboto, sans-serif' }}>Roosevelt High PM - Red</SelectItem>
                        <SelectItem value="washington-high-pm-wolf" style={{ fontFamily: 'Roboto, sans-serif' }}>Washington High PM - Wolf Rd</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-xs)', fontFamily: 'Roboto, sans-serif' }}>
                      Leave blank if incident occurred outside of a run
                    </p>
                  </div>
                </div>

                <div>
                  <Label style={{ fontFamily: 'Roboto, sans-serif' }}>Severity Level *</Label>
                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, severity: 'low' })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 transition-all ${
                        formData.severity === 'low'
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      {formData.severity === 'low' ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Badge variant="outline" className="pointer-events-none">Low</Badge>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, severity: 'medium' })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 transition-all ${
                        formData.severity === 'medium'
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      {formData.severity === 'medium' ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Badge variant="secondary" className="pointer-events-none">Medium</Badge>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, severity: 'high' })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 transition-all ${
                        formData.severity === 'high'
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      {formData.severity === 'high' ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Badge variant="destructive" className="pointer-events-none">High</Badge>
                    </button>
                  </div>
                  {formData.incidentType && (
                    <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)', fontFamily: 'Roboto, sans-serif' }}>
                      Recommended severity based on incident type. Adjust if needed.
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description" style={{ fontFamily: 'Roboto, sans-serif' }}>Incident Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of what occurred..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  />
                  <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)', fontFamily: 'Roboto, sans-serif' }}>
                    Include time, specific behaviors, and any relevant context
                  </p>
                </div>
              </div>
            </ForgeCard>

            {/* Witness Information */}
            <ForgeCard style={{ border: 'none', boxShadow: 'none', marginBottom: 'var(--forge-spacing-large)' }}>
              <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif' }}>Additional Information</h3>
              </div>
              <div className="space-y-4" style={{ marginTop: 'var(--forge-spacing-small)' }}>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="witnessPresent"
                    checked={formData.witnessPresent}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, witnessPresent: checked as boolean })
                    }
                  />
                  <Label htmlFor="witnessPresent" className="cursor-pointer" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Witness(es) present
                  </Label>
                </div>

                {formData.witnessPresent && (
                  <div>
                    <Label htmlFor="witnessName" style={{ fontFamily: 'Roboto, sans-serif' }}>Witness Name(s)</Label>
                    <Input
                      id="witnessName"
                      placeholder="Enter witness names..."
                      value={formData.witnessName}
                      onChange={(e) => setFormData({ ...formData, witnessName: e.target.value })}
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    />
                  </div>
                )}

                {incidentCategory === 'student' && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="parentNotified"
                      checked={formData.parentNotified}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, parentNotified: checked as boolean })
                      }
                    />
                    <Label htmlFor="parentNotified" className="cursor-pointer" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Parent/Guardian has been notified
                    </Label>
                  </div>
                )}

                <div>
                  <Label htmlFor="actionTaken" style={{ fontFamily: 'Roboto, sans-serif' }}>Immediate Action Taken</Label>
                  <Textarea
                    id="actionTaken"
                    placeholder={incidentCategory === 'student' 
                      ? "Describe any immediate actions taken (e.g., student moved seats, verbal warning given)..."
                      : "Describe any immediate actions taken (e.g., vehicle taken out of service, safety protocol followed)..."}
                    rows={3}
                    value={formData.actionTaken}
                    onChange={(e) => setFormData({ ...formData, actionTaken: e.target.value })}
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  />
                </div>
              </div>
            </ForgeCard>

            {/* Photo Evidence */}
            <ForgeCard style={{ border: 'none', boxShadow: 'none', marginBottom: 'var(--forge-spacing-large)' }}>
              <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif' }}>Photo Evidence</h3>
                <p className="forge-typography--body2" style={{ color: 'var(--forge-theme-text-medium)', fontFamily: 'Roboto, sans-serif' }}>
                  Upload photos documenting the incident (optional)
                </p>
              </div>
              <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
                <div className="space-y-4">
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <ForgeButton
                      type="button"
                      variant="outlined"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full sm:w-auto"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photos
                    </ForgeButton>
                    <p className="text-muted-foreground mt-2" style={{ fontSize: 'var(--text-xs)', fontFamily: 'Roboto, sans-serif' }}>
                      Supported formats: JPG, PNG, GIF. Maximum 10 photos.
                    </p>
                  </div>

                  {uploadedPhotos.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {uploadedPhotos.map((photo) => (
                        <div
                          key={photo.id}
                          className="relative group border rounded-lg overflow-hidden bg-muted/30"
                          style={{ 
                            borderColor: 'var(--forge-color-border-default)',
                            borderRadius: 'var(--forge-radius-medium)'
                          }}
                        >
                          <div className="aspect-square relative">
                            <img
                              src={photo.url}
                              alt={photo.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <ForgeButton
                                type="button"
                                variant="raised"
                                size="sm"
                                onClick={() => handleRemovePhoto(photo.id)}
                                className="gap-1"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                <X className="h-4 w-4" />
                                Remove
                              </ForgeButton>
                            </div>
                          </div>
                          <div 
                            className="p-2 bg-background border-t" 
                            style={{ borderColor: 'var(--forge-color-border-default)' }}
                          >
                            <p 
                              className="text-xs truncate" 
                              style={{ 
                                fontSize: 'var(--text-xs)', 
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 'var(--font-weight-medium)'
                              }}
                              title={photo.name}
                            >
                              {photo.name}
                            </p>
                            <p 
                              className="text-xs text-muted-foreground"
                              style={{ 
                                fontSize: 'var(--text-xs)', 
                                fontFamily: 'Roboto, sans-serif'
                              }}
                            >
                              {photo.size}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {uploadedPhotos.length === 0 && (
                    <div 
                      className="border-2 border-dashed rounded-lg p-8 text-center"
                      style={{ 
                        borderColor: 'var(--forge-color-border-subtle)',
                        borderRadius: 'var(--forge-radius-medium)'
                      }}
                    >
                      <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <p 
                        className="text-sm text-muted-foreground"
                        style={{ 
                          fontSize: 'var(--text-sm)', 
                          fontFamily: 'Roboto, sans-serif'
                        }}
                      >
                        No photos uploaded yet
                      </p>
                      <p 
                        className="text-xs text-muted-foreground mt-1"
                        style={{ 
                          fontSize: 'var(--text-xs)', 
                          fontFamily: 'Roboto, sans-serif'
                        }}
                      >
                        Click "Upload Photos" to add visual evidence
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ForgeCard>

            {/* Document Evidence */}
            <ForgeCard style={{ border: 'none', boxShadow: 'none', marginBottom: 'var(--forge-spacing-large)' }}>
              <div style={{ padding: 'var(--forge-spacing-medium)' }}>
                <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif' }}>Document Evidence</h3>
                <p className="forge-typography--body2" style={{ color: 'var(--forge-theme-text-medium)', fontFamily: 'Roboto, sans-serif' }}>
                  Upload documents related to the incident (optional)
                </p>
              </div>
              <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
                <div className="space-y-4">
                  <div>
                    <input
                      ref={documentInputRef}
                      type="file"
                      accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      multiple
                      onChange={handleDocumentUpload}
                      className="hidden"
                      id="document-upload"
                    />
                    <ForgeButton
                      type="button"
                      variant="outlined"
                      onClick={() => documentInputRef.current?.click()}
                      className="w-full sm:w-auto"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Documents
                    </ForgeButton>
                    <p className="text-muted-foreground mt-2" style={{ fontSize: 'var(--text-xs)', fontFamily: 'Roboto, sans-serif' }}>
                      Supported formats: PDF, DOC, DOCX. Maximum 10 documents.
                    </p>
                  </div>

                  {uploadedDocuments.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {uploadedDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="relative group border rounded-lg overflow-hidden bg-muted/30"
                          style={{ 
                            borderColor: 'var(--forge-color-border-default)',
                            borderRadius: 'var(--forge-radius-medium)'
                          }}
                        >
                          <div className="aspect-square relative flex items-center justify-center bg-muted/50">
                            <FileText
                              size={48}
                              className="text-muted-foreground"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <ForgeButton
                                type="button"
                                variant="raised"
                                size="sm"
                                onClick={() => handleRemoveDocument(doc.id)}
                                className="gap-1"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                <X className="h-4 w-4" />
                                Remove
                              </ForgeButton>
                            </div>
                          </div>
                          <div 
                            className="p-2 bg-background border-t" 
                            style={{ borderColor: 'var(--forge-color-border-default)' }}
                          >
                            <p 
                              className="text-xs truncate" 
                              style={{ 
                                fontSize: 'var(--text-xs)', 
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 'var(--font-weight-medium)'
                              }}
                              title={doc.name}
                            >
                              {doc.name}
                            </p>
                            <p 
                              className="text-xs text-muted-foreground"
                              style={{ 
                                fontSize: 'var(--text-xs)', 
                                fontFamily: 'Roboto, sans-serif'
                              }}
                            >
                              {doc.size}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {uploadedDocuments.length === 0 && (
                    <div 
                      className="border-2 border-dashed rounded-lg p-8 text-center"
                      style={{ 
                        borderColor: 'var(--forge-color-border-subtle)',
                        borderRadius: 'var(--forge-radius-medium)'
                      }}
                    >
                      <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <p 
                        className="text-sm text-muted-foreground"
                        style={{ 
                          fontSize: 'var(--text-sm)', 
                          fontFamily: 'Roboto, sans-serif'
                        }}
                      >
                        No documents uploaded yet
                      </p>
                      <p 
                        className="text-xs text-muted-foreground mt-1"
                        style={{ 
                          fontSize: 'var(--text-xs)', 
                          fontFamily: 'Roboto, sans-serif'
                        }}
                      >
                        Click "Upload Documents" to add related files
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ForgeCard>

            {/* Form Actions */}
            <div className="flex gap-3">
              <ForgeButton
                type="submit"
                className="bg-primary hover:bg-primary/90"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Report
              </ForgeButton>
              <ForgeButton
                type="button"
                variant="outlined"
                onClick={() => onNavigate('incidents')}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Cancel
              </ForgeButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
