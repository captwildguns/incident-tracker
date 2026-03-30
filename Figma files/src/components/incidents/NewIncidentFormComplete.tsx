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
import { AlertCircle, Send, Check, Circle, CheckCircle2, MapPin, Upload, X, Image as ImageIcon, FileText, UserCircle2, Users } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { INCIDENT_TYPES, getAllCategories } from './IncidentTypes';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';

const mockStudents = [
  { id: 'STU-2891', name: 'Sarah Mitchell', grade: '9th Grade', school: 'Lincoln Middle School', photoUrl: 'https://images.unsplash.com/photo-1729283098418-e2c849b4e2cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybCUyMHBhc3Nwb3J0JTIwcGhvdG8lMjAxNCUyMHllYXIlMjBvbGR8ZW58MXx8fHwxNzY5NTI3Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bus: 'bus-12', route: 'lincoln-elem-am-green' },
  { id: 'STU-3421', name: 'Marcus Johnson', grade: '10th Grade', school: 'Washington High School', photoUrl: 'https://images.unsplash.com/photo-1696219448339-ce614b610462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYm95JTIwcGFzc3BvcnQlMjBwaG90byUyMDE1JTIweWVhciUyMG9sZHxlbnwxfHx8fDE3Njk1MjcyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bus: 'bus-15', route: 'washington-high-pm-wolf' },
  { id: 'STU-1956', name: 'Emma Rodriguez', grade: '8th Grade', school: 'Jefferson Middle School', photoUrl: 'https://images.unsplash.com/photo-1663550910672-6cf9177ef89d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybCUyMHBhc3Nwb3J0JTIwcGhvdG8lMjAxMyUyMHllYXIlMjBvbGQlMjBoaXNwYW5pY3xlbnwxfHx8fDE3Njk1MjcyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bus: 'bus-22', route: 'jefferson-middle-am-blue' },
  { id: 'STU-4782', name: 'James Thompson', grade: '9th Grade', school: 'Roosevelt High School', photoUrl: 'https://images.unsplash.com/photo-1696219448339-ce614b610462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYm95JTIwcGFzc3BvcnQlMjBwaG90byUyMDE1JTIweWVhciUyMG9sZHxlbnwxfHx8fDE3Njk1MjcyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bus: 'bus-31', route: 'roosevelt-high-pm-red' },
  { id: 'STU-5623', name: 'Olivia Davis', grade: '11th Grade', school: 'Washington High School', photoUrl: 'https://images.unsplash.com/photo-1630003941615-db6a06990434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybCUyMHBhc3Nwb3J0JTIwcGhvdG8lMjAxNyUyMHllYXIlMjBvbGR8ZW58MXx8fHwxNzY5NTI3Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bus: 'bus-8', route: 'washington-high-pm-wolf' },
  { id: 'STU-6891', name: 'Noah Wilson', grade: '7th Grade', school: 'Lincoln Middle School', photoUrl: 'https://images.unsplash.com/photo-1619362405573-7aeaf09ac89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYm95JTIwcGFzc3BvcnQlMjBwaG90byUyMDEzJTIweWVhciUyMG9sZHxlbnwxfHx8fDE3Njk1MjcyODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bus: 'bus-12', route: 'lincoln-elem-am-green' },
  { id: 'STU-7234', name: 'Sophia Garcia', grade: '5th Grade', school: 'Lincoln Elementary', photoUrl: 'https://images.unsplash.com/photo-1729283098418-e2c849b4e2cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGdpcmwlMjBwYXNzcG9ydCUyMHBob3RvJTIwMTAlMjB5ZWFyJTIwb2xkfGVufDF8fHx8MTc2OTUyNzI4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bus: 'bus-9', route: 'lincoln-elem-am-green' },
  { id: 'STU-8512', name: 'Liam Brown', grade: '7th Grade', school: 'Lincoln Middle School', photoUrl: 'https://images.unsplash.com/photo-1619362405573-7aeaf09ac89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYm95JTIwcGFzc3BvcnQlMjBwaG90byUyMDEyJTIweWVhciUyMG9sZHxlbnwxfHx8fDE3Njk1MjcyODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bus: 'bus-12', route: 'lincoln-elem-am-green' },
  { id: 'STU-9123', name: 'Ava Martinez', grade: '6th Grade', school: 'Jefferson Middle School', photoUrl: 'https://images.unsplash.com/photo-1630005500468-3dbe2aeb0b03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybCUyMHBhc3Nwb3J0JTIwcGhvdG8lMjAxMSUyMHllYXIlMjBvbGQlMjBoaXNwYW5pY3xlbnwxfHx8fDE3Njk1MjcyODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bus: 'bus-22', route: 'jefferson-middle-am-blue' },
  { id: 'STU-1045', name: 'Ethan Lee', grade: '9th Grade', school: 'Washington High School', photoUrl: 'https://images.unsplash.com/photo-1655487420177-54b4d969c5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYm95JTIwcGFzc3BvcnQlMjBwaG90byUyMDE0JTIweWVhciUyMG9sZCUyMGFzaWFufGVufDF8fHx8MTc2OTUyNzI4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bus: 'bus-8', route: 'washington-high-pm-wolf' },
];

const mockDrivers = [
  { id: 'DRV-101', name: 'Robert Martinez', employeeId: 'EMP-4521', photoUrl: 'https://images.unsplash.com/photo-1633665503034-78f3628a86e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXMlMjBkcml2ZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njc3MTg2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080', routes: ['lincoln-elem-am-green'] },
  { id: 'DRV-102', name: 'Jennifer Davis', employeeId: 'EMP-4522', photoUrl: 'https://images.unsplash.com/photo-1758691737610-1f18e008f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrZXIlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2NzcxODY2OXww&ixlib=rb-4.1.0&q=80&w=1080', routes: ['washington-high-pm-wolf'] },
  { id: 'DRV-103', name: 'Michael Chen', employeeId: 'EMP-4523', photoUrl: 'https://images.unsplash.com/photo-1568585105565-e372998a195d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrZXIlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3Njc3MTg2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080', routes: ['jefferson-middle-am-blue'] },
  { id: 'DRV-104', name: 'Patricia Johnson', employeeId: 'EMP-4524', photoUrl: 'https://images.unsplash.com/photo-1599768431736-c78b881ae983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkcml2ZXIlMjBoZWFkc2hvdHxlbnwxfHx8fDE3Njc3MTg2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080', routes: ['roosevelt-high-pm-red'] },
  { id: 'DRV-105', name: 'David Thompson', employeeId: 'EMP-4525', photoUrl: 'https://images.unsplash.com/photo-1485540031485-a278dfc63d2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc2l0JTIwZHJpdmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY3NzE4NjY5fDA&ixlib=rb-4.1.0&q=80&w=1080', routes: ['colonie-high-am-purple'] },
  { id: 'DRV-106', name: 'Lisa Anderson', employeeId: 'EMP-4526', photoUrl: 'https://images.unsplash.com/photo-1695395860911-2be98a6cba4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidXMlMjBkcml2ZXIlMjB1bmlmb3JtfGVufDF8fHx8MTc2NzcxODY2OHww&ixlib=rb-4.1.0&q=80&w=1080', routes: ['meyers-middle-am-yellow'] },
];

const mockAddresses = [
  { id: '1', fullAddress: '1234 Main Street, Meridian, ID 83642, USA' },
  { id: '2', fullAddress: '5678 Elm Avenue, Meridian, ID 83646, USA' },
  { id: '3', fullAddress: '910 Oak Drive, Boise, ID 83704, USA' },
  { id: '4', fullAddress: '2345 Maple Lane, Eagle, ID 83616, USA' },
  { id: '5', fullAddress: '3456 Pine Road, Nampa, ID 83651, USA' },
  { id: '6', fullAddress: '4567 Cedar Court, Kuna, ID 83634, USA' },
  { id: '7', fullAddress: '7890 Birch Boulevard, Star, ID 83669, USA' },
  { id: '8', fullAddress: '6789 Willow Way, Caldwell, ID 83605, USA' },
  { id: '9', fullAddress: '8901 Aspen Street, Garden City, ID 83714, USA' },
  { id: '10', fullAddress: '1230 Spruce Avenue, Meridian, ID 83642, USA' },
];

interface NewIncidentFormProps {
  onNavigate: (page: string) => void;
}

export function NewIncidentForm({ onNavigate }: NewIncidentFormProps) {
  const [incidentCategory, setIncidentCategory] = useState<'student' | 'driver' | null>(null);
  const [formData, setFormData] = useState({
    student: '', studentId: '', incidentType: '', severity: '', description: '', location: '', address: '', bus: '', route: '', driver: '',
    witnessPresent: false, witnessName: '', parentNotified: false, actionTaken: '',
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (studentLookupRef.current && !studentLookupRef.current.contains(event.target as Node)) setStudentLookupOpen(false);
      if (addressLookupRef.current && !addressLookupRef.current.contains(event.target as Node)) setAddressLookupOpen(false);
    };
    if (studentLookupOpen || addressLookupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [studentLookupOpen, addressLookupOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => { setShowSuccess(false); onNavigate('incidents'); }, 3000);
  };

  const handleIncidentTypeChange = (value: string) => {
    const selectedType = INCIDENT_TYPES.find(t => t.id === value);
    setFormData({ ...formData, incidentType: value, severity: selectedType?.defaultSeverity.toLowerCase() || '' });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPhotos = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`, name: file.name, url: URL.createObjectURL(file),
      size: file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : `${(file.size / 1024).toFixed(1)} KB`,
    }));
    setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (photoId: string) => setUploadedPhotos(uploadedPhotos.filter(photo => photo.id !== photoId));

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newDocuments = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`, name: file.name, type: file.type,
      size: file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : `${(file.size / 1024).toFixed(1)} KB`,
    }));
    setUploadedDocuments([...uploadedDocuments, ...newDocuments]);
    if (documentInputRef.current) documentInputRef.current.value = '';
  };

  const handleRemoveDocument = (documentId: string) => setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== documentId));

  const getLocationOptions = () => {
    const studentLocations = [
      { category: 'ON ROUTE', items: [{ value: 'on-bus', label: 'On Vehicle' }, { value: 'bus-stop', label: 'At Vehicle Stop' }, { value: 'loading', label: 'Loading/Unloading' }]},
      { category: 'SCHOOL/LOCATION', items: [{ value: 'school-campus', label: 'School Campus' }, { value: 'parking-lot', label: 'Parking Lot' }, { value: 'layover-location', label: 'Layover Location' }]},
      { category: 'OTHER', items: [{ value: 'other', label: 'Other' }]},
    ];
    const driverLocations = [
      { category: 'ON ROUTE', items: [{ value: 'on-bus', label: 'On Vehicle' }, { value: 'bus-stop', label: 'At Vehicle Stop' }, { value: 'loading', label: 'Loading/Unloading' }]},
      { category: 'FACILITY', items: [{ value: 'garage', label: 'Garage' }, { value: 'yard', label: 'Yard' }, { value: 'maintenance-bay', label: 'Maintenance Bay' }, { value: 'fuel-station', label: 'Fuel Station' }, { value: 'wash-bay', label: 'Wash Bay' }]},
      { category: 'SCHOOL/LOCATION', items: [{ value: 'school-campus', label: 'School Campus' }, { value: 'parking-lot', label: 'Parking Lot' }, { value: 'layover-location', label: 'Layover Location' }]},
      { category: 'OTHER', items: [{ value: 'other', label: 'Other' }]},
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

      {!incidentCategory && (
        <ForgeCard style={{ border: 'none', boxShadow: 'none' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }}>
            <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif' }}>Select Incident Type</h3>
            <p className="forge-typography--body2" style={{ color: 'var(--forge-theme-text-medium)', fontFamily: 'Roboto, sans-serif' }}>Choose whether this incident involves a student or a driver</p>
            <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button type="button" onClick={() => setIncidentCategory('student')} className="group relative p-8 border-2 rounded-lg hover:border-primary transition-all bg-white hover:bg-primary/5" style={{ borderColor: 'var(--forge-color-border-default)', borderRadius: 'var(--forge-radius-large)' }}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-100 group-hover:bg-blue-200 transition-colors"><Users className="w-10 h-10 text-blue-600" /></div>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>Student Incident</h3>
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)' }}>Report behavioral, safety, or other incidents involving students on routes or at school locations</p>
                  </div>
                </div>
              </button>
              <button type="button" onClick={() => setIncidentCategory('driver')} className="group relative p-8 border-2 rounded-lg hover:border-primary transition-all bg-white hover:bg-primary/5" style={{ borderColor: 'var(--forge-color-border-default)', borderRadius: 'var(--forge-radius-large)' }}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-100 group-hover:bg-green-200 transition-colors"><UserCircle2 className="w-10 h-10 text-green-600" /></div>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>Driver Incident</h3>
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)' }}>Report safety, operational, or facility incidents involving drivers at any location</p>
                  </div>
                </div>
              </button>
            </div>
            </div>
          </div>
        </ForgeCard>
      )}

      {incidentCategory && (
        <div>
          <div className="mb-6">
            <ForgeButton type="button" variant="outlined" onClick={() => { setIncidentCategory(null); setFormData({ student: '', studentId: '', incidentType: '', severity: '', description: '', location: '', address: '', bus: '', route: '', driver: '', witnessPresent: false, witnessName: '', parentNotified: false, actionTaken: '' }); setSelectedStudent(null); setSelectedDriver(null); }} style={{ fontFamily: 'Roboto, sans-serif' }}>← Change Incident Type</ForgeButton>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Continued in export */}
            <p style={{ fontFamily: 'Roboto, sans-serif' }}>Form loading...</p>
          </form>
        </div>
      )}
    </div>
  );
}