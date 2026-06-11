import { useState, useRef, useEffect } from 'react';
import { ForgeCard, ForgeButton } from '@tylertech/forge-react';
import { defineCardComponent, defineButtonComponent, defineTextFieldComponent, defineStepperComponent } from '@tylertech/forge';
defineCardComponent();
defineButtonComponent();
defineTextFieldComponent();
defineStepperComponent();
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import {
  AlertCircle, Send, Circle, CheckCircle2, Upload, X,
  Image as ImageIcon, FileText, Users, ChevronRight, ChevronDown, ChevronUp, Plus,
} from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { INCIDENT_TYPES, getAllCategories } from './IncidentTypes';
import { IncidentLocationMap } from './IncidentLocationMap';
import { mockDrivers } from '../drivers/DriversPage';
import { mockIncidents } from './IncidentsPage';

const mockStudents = [
  { id: 'STU-2891', name: 'Sarah Mitchell', grade: '9th Grade', school: 'Lincoln Middle School', photoUrl: 'https://images.unsplash.com/photo-1729283098418-e2c849b4e2cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybCUyMHBhc3Nwb3J0JTIwcGhvdG8lMjAxNCUyMHllYXIlMjBvbGR8ZW58MXx8fHwxNzY5NTI3Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080', bus: 'bus-12', route: 'lincoln-elem-am-green' },
  { id: 'STU-3421', name: 'Marcus Johnson', grade: '10th Grade', school: 'Washington High School', photoUrl: 'https://images.unsplash.com/photo-1696219448339-ce614b610462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYm95JTIwcGFzc3BvcnQlMjBwaG90byUyMDE1JTIweWVhciUyMG9sZHxlbnwxfHx8fDE3Njk1MjcyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080', bus: 'bus-15', route: 'washington-high-pm-wolf' },
  { id: 'STU-1956', name: 'Emma Rodriguez', grade: '8th Grade', school: 'Jefferson Middle School', photoUrl: 'https://images.unsplash.com/photo-1663550910672-6cf9177ef89d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybCUyMHBhc3Nwb3J0JTIwcGhvdG8lMjAxMyUyMHllYXIlMjBvbGQlMjBoaXNwYW5pY3xlbnwxfHx8fDE3Njk1MjcyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080', bus: 'bus-22', route: 'jefferson-middle-am-blue' },
  { id: 'STU-4782', name: 'James Thompson', grade: '9th Grade', school: 'Roosevelt High School', photoUrl: 'https://images.unsplash.com/photo-1696219448339-ce614b610462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYm95JTIwcGFzc3BvcnQlMjBwaG90byUyMDE1JTIweWVhciUyMG9sZHxlbnwxfHx8fDE3Njk1MjcyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080', bus: 'bus-31', route: 'roosevelt-high-pm-red' },
  { id: 'STU-5623', name: 'Olivia Davis', grade: '11th Grade', school: 'Washington High School', photoUrl: 'https://images.unsplash.com/photo-1630003941615-db6a06990434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybCUyMHBhc3Nwb3J0JTIwcGhvdG8lMjAxNyUyMHllYXIlMjBvbGR8ZW58MXx8fHwxNzY5NTI3Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080', bus: 'bus-8', route: 'washington-high-pm-wolf' },
  { id: 'STU-6891', name: 'Noah Wilson', grade: '7th Grade', school: 'Lincoln Middle School', photoUrl: 'https://images.unsplash.com/photo-1619362405573-7aeaf09ac89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYm95JTIwcGFzc3BvcnQlMjBwaG90byUyMDEzJTIweWVhciUyMG9sZHxlbnwxfHx8fDE3Njk1MjcyODB8MA&ixlib=rb-4.1.0&q=80&w=1080', bus: 'bus-12', route: 'lincoln-elem-am-green' },
  { id: 'STU-7234', name: 'Sophia Garcia', grade: '5th Grade', school: 'Lincoln Elementary', photoUrl: 'https://images.unsplash.com/photo-1729283098418-e2c849b4e2cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGdpcmwlMjBwYXNzcG9ydCUyMHBob3RvJTIwMTAlMjB5ZWFyJTIwb2xkfGVufDF8fHx8MTc2OTUyNzI4MHww&ixlib=rb-4.1.0&q=80&w=1080', bus: 'bus-9', route: 'lincoln-elem-am-green' },
  { id: 'STU-8512', name: 'Liam Brown', grade: '7th Grade', school: 'Lincoln Middle School', photoUrl: 'https://images.unsplash.com/photo-1619362405573-7aeaf09ac89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYm95JTIwcGFzc3BvcnQlMjBwaG90byUyMDEyJTIweWVhciUyMG9sZHxlbnwxfHx8fDE3Njk1MjcyODF8MA&ixlib=rb-4.1.0&q=80&w=1080', bus: 'bus-12', route: 'lincoln-elem-am-green' },
  { id: 'STU-9123', name: 'Ava Martinez', grade: '6th Grade', school: 'Jefferson Middle School', photoUrl: 'https://images.unsplash.com/photo-1630005500468-3dbe2aeb0b03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybCUyMHBhc3Nwb3J0JTIwcGhvdG8lMjAxMSUyMHllYXIlMjBvbGQlMjBoaXNwYW5pY3xlbnwxfHx8fDE3Njk1MjcyODF8MA&ixlib=rb-4.1.0&q=80&w=1080', bus: 'bus-22', route: 'jefferson-middle-am-blue' },
  { id: 'STU-1045', name: 'Ethan Lee', grade: '9th Grade', school: 'Washington High School', photoUrl: 'https://images.unsplash.com/photo-1655487420177-54b4d969c5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYm95JTIwcGFzc3BvcnQlMjBwaG90byUyMDE0JTIweWVhciUyMG9sZCUyMGFzaWFufGVufDF8fHx8MTc2OTUyNzI4MXww&ixlib=rb-4.1.0&q=80&w=1080', bus: 'bus-8', route: 'washington-high-pm-wolf' },
];


type Student = typeof mockStudents[0];
interface PerStudentData {
  role: 'instigator' | 'participant' | 'victim' | 'bystander' | '';
  severityOverride: 'shared' | 'low' | 'medium' | 'high' | 'critical';
  incidentTypeOverride: string;
  parentNotified: boolean;
  description: string;
  actionTaken: string;
  notes: string;
}

interface SharedFormData {
  incidentType: string;
  severity: string;
  description: string;
  location: string;
  bus: string;
  route: string;
  driver: string;
  witnessPresent: boolean;
  witnessNames: string[];
  tags: string[];
}


interface NewIncidentFormProps {
  onNavigate: (page: string) => void;
}

const STEPS = [
  { number: 1, label: 'Involved Students' },
  { number: 2, label: 'Incident Details' },
  { number: 3, label: 'Per-Student Details' },
  { number: 4, label: 'Review & Submit' },
];

const LOCATION_OPTIONS = [
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
  { category: 'OTHER', items: [{ value: 'other', label: 'Other' }] },
];

const ROUTE_LABELS: Record<string, string> = {
  'colonie-high-am-purple': 'Colonie High AM - Purple',
  'jefferson-middle-am-blue': 'Jefferson Middle AM - Blue',
  'lincoln-elem-am-green': 'Lincoln Elementary AM - Green',
  'meyers-middle-am-yellow': 'Meyers Middle AM - Yellow',
  'roosevelt-high-pm-red': 'Roosevelt High PM - Red',
  'washington-high-pm-wolf': 'Washington High PM - Wolf Rd',
};

const DRIVER_LOCATION_OPTIONS = [
  ...LOCATION_OPTIONS.slice(0, 1),
  { category: 'FACILITY', items: [
    { value: 'garage', label: 'Garage' },
    { value: 'yard', label: 'Yard' },
    { value: 'maintenance-bay', label: 'Maintenance Bay' },
    { value: 'fuel-station', label: 'Fuel Station' },
    { value: 'wash-bay', label: 'Wash Bay' },
  ]},
  ...LOCATION_OPTIONS.slice(1),
];

function WitnessFields({ names, onChange }: { names: string[]; onChange: (names: string[]) => void }) {
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
  return (
    <div>
      {names.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
          {names.map((name, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', width: '20%', minWidth: '160px' }}>
              <div style={{
                flex: 1,
                border: `1px solid ${focusedIdx === idx ? '#4A6FA5' : '#C5D2E8'}`,
                borderRadius: '6px', padding: '8px 12px', background: '#fff',
              }}>
                <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', color: 'var(--forge-theme-text-medium)', marginBottom: '2px' }}>
                  Witness Name
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    const updated = [...names];
                    updated[idx] = e.target.value;
                    onChange(updated);
                  }}
                  onFocus={() => setFocusedIdx(idx)}
                  onBlur={() => setFocusedIdx(null)}
                  style={{ width: '100%', border: 'none', outline: 'none', fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-base)', background: 'transparent' }}
                />
              </div>
              <button
                type="button"
                onClick={() => onChange(names.filter((_, i) => i !== idx))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--forge-theme-text-medium)', marginTop: '10px', flexShrink: 0 }}
                aria-label="Remove witness"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => onChange([...names, ''])}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '8px 20px', borderRadius: '6px',
          border: '1px solid #4A6FA5', background: '#fff',
          fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)',
          color: '#4A6FA5', fontWeight: 500, cursor: 'pointer',
        }}
      >
        <Plus className="h-4 w-4" /> Add Witness
      </button>
    </div>
  );
}

function TagFields({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (tag && !tags.includes(tag)) onChange([...tags, tag]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div>
      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          {tags.map((tag, idx) => (
            <div key={idx} style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '4px 10px', borderRadius: '999px',
              background: '#EEF2F9', border: '1px solid #C5D2E8',
              fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', color: '#4A6FA5',
            }}>
              {tag}
              <button
                type="button"
                onClick={() => onChange(tags.filter((_, i) => i !== idx))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: '#4A6FA5' }}
                aria-label={`Remove tag ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div style={{
        display: 'flex', alignItems: 'center',
        border: `1px solid ${focused ? '#4A6FA5' : '#C5D2E8'}`,
        borderRadius: '6px', padding: '8px 12px', background: '#fff',
      }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); if (inputValue.trim()) addTag(inputValue); }}
          placeholder="Type a tag and press Enter..."
          style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-base)', background: 'transparent' }}
        />
      </div>
      <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', color: 'var(--forge-theme-text-medium)', marginTop: '4px' }}>
        Press Enter or comma to add a tag
      </div>
    </div>
  );
}

export function NewIncidentForm({ onNavigate }: NewIncidentFormProps) {
  const [incidentCategory] = useState<'student'>('student');
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Step 1: involved students
  const [involvedStudents, setInvolvedStudents] = useState<Student[]>([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentSearchOpen, setStudentSearchOpen] = useState(false);
  const studentSearchRef = useRef<HTMLDivElement>(null);
  const studentInputRef = useRef<HTMLInputElement>(null);

  // Step 2: shared incident data
  const [sharedData, setSharedData] = useState<SharedFormData>({
    incidentType: '', severity: '', description: '', location: '',
    bus: '', route: '', driver: '', witnessPresent: false, witnessNames: [], tags: [],
  });
  const [locationCoordinates, setLocationCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [locationAddress, setLocationAddress] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ id: string; name: string; url: string; size: string }>>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{ id: string; name: string; size: string; type: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  // Step 3: per-student data
  const [perStudentData, setPerStudentData] = useState<Record<string, PerStudentData>>({});
  const [expandedStudents, setExpandedStudents] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (studentSearchRef.current && !studentSearchRef.current.contains(e.target as Node)) setStudentSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addStudent = (student: Student) => {
    if (!involvedStudents.find(s => s.id === student.id)) {
      setInvolvedStudents(prev => [...prev, student]);
      setPerStudentData(prev => ({
        ...prev,
        [student.id]: { role: 'participant', severityOverride: 'shared', incidentTypeOverride: '', parentNotified: false, description: '', actionTaken: '', notes: '' },
      }));
      setExpandedStudents(prev => new Set([...prev, student.id]));
    }
    setStudentSearch('');
    setStudentSearchOpen(false);
    studentInputRef.current?.blur();
  };

  const removeStudent = (studentId: string) => {
    setInvolvedStudents(prev => prev.filter(s => s.id !== studentId));
    setPerStudentData(prev => { const n = { ...prev }; delete n[studentId]; return n; });
    setExpandedStudents(prev => { const n = new Set(prev); n.delete(studentId); return n; });
  };

  const updatePerStudent = (studentId: string, field: keyof PerStudentData, value: string | boolean) => {
    setPerStudentData(prev => ({ ...prev, [studentId]: { ...prev[studentId], [field]: value } }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPhotos = Array.from(files).map((f, i) => ({
      id: `${Date.now()}-${i}`, name: f.name, url: URL.createObjectURL(f),
      size: f.size > 1048576 ? `${(f.size / 1048576).toFixed(2)} MB` : `${(f.size / 1024).toFixed(1)} KB`,
    }));
    setUploadedPhotos(p => [...p, ...newPhotos]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newDocs = Array.from(files).map((f, i) => ({
      id: `${Date.now()}-${i}`, name: f.name, type: f.type,
      size: f.size > 1048576 ? `${(f.size / 1048576).toFixed(2)} MB` : `${(f.size / 1024).toFixed(1)} KB`,
    }));
    setUploadedDocuments(d => [...d, ...newDocs]);
    if (documentInputRef.current) documentInputRef.current.value = '';
  };

  const handleStudentSubmit = () => {
    const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
    const typeLabel = getIncidentTypeLabel(sharedData.incidentType);
    const sharedSeverity = cap(sharedData.severity);
    const today = new Date().toISOString().slice(0, 10);
    const createdBy = sharedData.driver || 'Current User';

    // Build the per-student records (role / severity / type override / notes)
    const involved = involvedStudents.map(stu => {
      const d = perStudentData[stu.id] || ({} as PerStudentData);
      const sev = d.severityOverride && d.severityOverride !== 'shared' ? cap(d.severityOverride) : sharedSeverity;
      const typeOv = d.incidentTypeOverride ? getIncidentTypeLabel(d.incidentTypeOverride) : '';
      return {
        studentId: stu.id,
        name: stu.name,
        role: cap(d.role || 'participant'),
        severity: sev,
        parentNotified: !!d.parentNotified,
        description: d.description || '',
        actionTaken: d.actionTaken || '',
        notes: d.notes || '',
        ...(typeOv ? { incidentTypeOverride: typeOv } : {}),
        ...(d.role === 'bystander' ? { noWorkflow: true } : {}),
      };
    });

    // Next sequential incident ID (INC-YYYY-NNNN)
    const maxNum = mockIncidents.reduce((m, i: any) => {
      const n = parseInt(String(i.id).split('-')[2] || '0', 10);
      return Math.max(m, isNaN(n) ? 0 : n);
    }, 0);
    const newId = `INC-${new Date().getFullYear()}-${String(maxNum + 1).padStart(4, '0')}`;

    const first = involvedStudents[0];
    const newIncident: any = {
      id: newId,
      date: today,
      student: first?.name || '',
      studentId: first?.id || '',
      type: typeLabel,
      description: sharedData.description,
      bus: sharedData.bus ? `Bus ${sharedData.bus.replace('bus-', '')}` : '',
      route: ROUTE_LABELS[sharedData.route] || sharedData.route || '',
      driver: sharedData.driver,
      severity: sharedSeverity,
      status: 'Open',
      createdBy,
      assignedTo: 'Sarah Williams',
      location: sharedData.location,
      ...(locationCoordinates ? { locationCoordinates } : {}),
      ...(locationAddress ? { locationAddress } : {}),
      witnessPresent: sharedData.witnessPresent,
      witnessNames: sharedData.witnessNames.filter(Boolean),
      tags: sharedData.tags,
      involvedStudents: involved,
      ...(uploadedPhotos.length
        ? { photos: uploadedPhotos.map(p => ({ id: p.id, url: p.url, thumbnail: p.url, uploadedBy: createdBy, uploadedAt: today, caption: p.name })) }
        : {}),
      ...(uploadedDocuments.length
        ? { documents: uploadedDocuments.map(doc => ({ id: doc.id, name: doc.name, size: doc.size, type: doc.type, uploadedBy: createdBy, uploadedAt: today })) }
        : {}),
    };

    // Persist into the shared incidents list (in-memory for the session)
    mockIncidents.unshift(newIncident);

    setShowSuccess(true);
    setTimeout(() => { setShowSuccess(false); onNavigate('incidents'); }, 3000);
  };


  const filteredStudents = mockStudents.filter(
    s => (studentSearch === '' || s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.id.toLowerCase().includes(studentSearch.toLowerCase()))
      && !involvedStudents.find(added => added.id === s.id)
  );

  const getLocationLabel = (value: string) => {
    for (const group of LOCATION_OPTIONS) {
      const item = group.items.find(i => i.value === value);
      if (item) return item.label;
    }
    return value;
  };

  const getIncidentTypeLabel = (id: string) => INCIDENT_TYPES.find(t => t.id === id)?.label || id;

  // ── Student incident 4-step wizard ──────────────────────────────────────────

  return (
    <div>
      {showSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {involvedStudents.length} incident record{involvedStudents.length !== 1 ? 's' : ''} created and linked successfully! Supervisor has been notified.
          </AlertDescription>
        </Alert>
      )}

      {/* Forge Stepper */}
      <div className="mb-6">
        {/* @ts-ignore */}
        <forge-stepper
          selected-index={currentStep - 1}
          linear="true"
          layout-mode="fixed"
          style={{ width: '100%' }}
        >
          {STEPS.map((step) => {
            const isDone = currentStep > step.number;
            const isActive = currentStep === step.number;
            return (
              // @ts-ignore
              <forge-step
                key={step.number}
                completed={isDone ? 'true' : undefined}
                editable={isDone ? 'true' : undefined}
                selected={isActive ? 'true' : undefined}
              >
                {step.label}
              </forge-step>
            );
          })}
        {/* @ts-ignore */}
        </forge-stepper>
      </div>

      {/* ── Step 1: Involved Students ── */}
      {currentStep === 1 && (
        <ForgeCard style={{ border: 'none', boxShadow: 'none' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }}>
            <div className="flex items-start gap-3 mb-1">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EEF2F8' }}>
                <Users className="w-5 h-5" style={{ color: '#4A6FA5' }} />
              </div>
              <div>
                <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif', marginBottom: 2 }}>Involved Students</h3>
                <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', color: 'var(--forge-theme-text-medium)' }}>
                  Add all students involved in this incident. A separate incident record will be created for each student, linked together as a group.
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative mt-4" ref={studentSearchRef}>
              {/* @ts-ignore */}
              <forge-text-field>
                <input
                  ref={studentInputRef}
                  type="text"
                  placeholder="+ Search students by name or ID to add..."
                  value={studentSearch}
                  onChange={(e) => { setStudentSearch(e.target.value); setStudentSearchOpen(true); }}
                  onFocus={() => setStudentSearchOpen(true)}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </forge-text-field>
              {studentSearchOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-[280px] overflow-auto" style={{ borderColor: 'var(--forge-color-border-default)' }}>
                  {filteredStudents.length === 0 ? (
                    <div style={{ padding: '12px 16px', fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', color: 'var(--forge-theme-text-medium)' }}>
                      No students found.
                    </div>
                  ) : (
                    filteredStudents.map(student => (
                      <button
                        key={student.id}
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); addStudent(student); }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 16px', background: 'none', border: 'none', borderBottom: '1px solid var(--forge-color-border-subtle)', cursor: 'pointer', textAlign: 'left' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#F4F7FB')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                      >
                        <div className="flex flex-col">
                          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-base)', fontWeight: 500 }}>{student.name}</span>
                          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)' }}>
                            {student.id} · {student.grade} · {student.school}
                          </span>
                        </div>
                        <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Student list or empty state */}
            <div className="mt-4">
              {involvedStudents.length === 0 ? (
                <div
                  className="border-2 border-dashed rounded-lg py-12 text-center"
                  style={{ borderColor: 'var(--forge-color-border-subtle)', borderRadius: 'var(--forge-radius-medium)' }}
                >
                  <Users className="mx-auto mb-3" style={{ width: 40, height: 40, color: 'var(--forge-theme-text-medium)', opacity: 0.5 }} />
                  <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', color: 'var(--forge-theme-text-medium)' }}>
                    No students added yet. Search above to add involved students.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {involvedStudents.length} student{involvedStudents.length !== 1 ? 's' : ''} selected
                    </span>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)' }}>
                      {involvedStudents.length} individual incident{involvedStudents.length !== 1 ? 's' : ''} will be created
                    </span>
                  </div>
                  <div className="space-y-2">
                    {involvedStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center gap-3 p-3 rounded-lg border"
                        style={{ borderColor: 'var(--forge-color-border-default)', borderRadius: 'var(--forge-radius-medium)', background: '#F8F9FA' }}
                      >
                        <div className="flex flex-col flex-1 min-w-0">
                          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-base)', fontWeight: 500 }}>{student.name}</span>
                          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)' }}>
                            {student.id} · {student.grade}
                          </span>
                          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)' }}>
                            {student.school}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeStudent(student.id)}
                          className="flex-shrink-0 w-6 h-6 flex items-center justify-center hover:text-red-500 transition-colors"
                          style={{ color: 'var(--forge-theme-text-medium)', background: 'none', border: 'none', cursor: 'pointer' }}
                          aria-label={`Remove ${student.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-4 border-t" style={{ borderColor: 'var(--forge-color-border-subtle)' }}>
            <button
              type="button"
              disabled={involvedStudents.length === 0}
              onClick={() => setCurrentStep(2)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '0 20px', height: '38px',
                background: involvedStudents.length === 0 ? '#9BAEC8' : '#4A6FA5',
                color: '#fff', border: 'none', borderRadius: '4px',
                fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: 500,
                cursor: involvedStudents.length === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              Next: Incident Details <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </ForgeCard>
      )}

      {/* ── Step 2: Incident Details ── */}
      {currentStep === 2 && (
        <ForgeCard style={{ border: 'none', boxShadow: 'none' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }}>
            <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif', marginBottom: 4 }}>Incident Details</h3>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', color: 'var(--forge-theme-text-medium)', marginBottom: 'var(--forge-spacing-medium)' }}>
              These details apply to all {involvedStudents.length} student{involvedStudents.length !== 1 ? 's' : ''}. You can customize per-student details in the next step.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ fontFamily: 'Roboto, sans-serif' }}>Incident Type *</Label>
                  {/* @ts-ignore */}
                  <forge-text-field>
                    <select
                      value={sharedData.incidentType}
                      onChange={(e) => {
                        const t = INCIDENT_TYPES.find(t => t.id === e.target.value);
                        setSharedData(s => ({ ...s, incidentType: e.target.value, severity: t?.defaultSeverity.toLowerCase() || '' }));
                      }}
                      required
                      style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                    >
                      <option value="">Select type...</option>
                      {getAllCategories().map(cat => {
                        const types = INCIDENT_TYPES.filter(t => t.category === cat && (t.applicableTo === 'student' || t.applicableTo === 'both')).sort((a, b) => a.label.localeCompare(b.label));
                        if (!types.length) return null;
                        return <optgroup key={cat} label={cat}>{types.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}</optgroup>;
                      })}
                    </select>
                  </forge-text-field>
                  {sharedData.incidentType && (
                    <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', marginTop: 4 }}>
                      {INCIDENT_TYPES.find(t => t.id === sharedData.incidentType)?.description}
                    </p>
                  )}
                </div>

                <div>
                  <Label style={{ fontFamily: 'Roboto, sans-serif' }}>Location *</Label>
                  {/* @ts-ignore */}
                  <forge-text-field>
                    <select
                      value={sharedData.location}
                      onChange={(e) => setSharedData(s => ({ ...s, location: e.target.value }))}
                      required
                      style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                    >
                      <option value="">Select location...</option>
                      {LOCATION_OPTIONS.map(g => (
                        <optgroup key={g.category} label={g.category}>
                          {g.items.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </forge-text-field>
                </div>

                <div>
                  <Label style={{ fontFamily: 'Roboto, sans-serif' }}>Vehicle Number</Label>
                  {/* @ts-ignore */}
                  <forge-text-field>
                    <select value={sharedData.bus} onChange={(e) => setSharedData(s => ({ ...s, bus: e.target.value }))} style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}>
                      <option value="">Select vehicle (optional)...</option>
                      {['bus-12', 'bus-15', 'bus-22', 'bus-31', 'bus-8'].map(b => <option key={b} value={b}>Vehicle {b.replace('bus-', '')}</option>)}
                    </select>
                  </forge-text-field>
                </div>

                <div>
                  <Label style={{ fontFamily: 'Roboto, sans-serif' }}>Run</Label>
                  {/* @ts-ignore */}
                  <forge-text-field>
                    <select value={sharedData.route} onChange={(e) => setSharedData(s => ({ ...s, route: e.target.value }))} style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}>
                      <option value="">Select run (optional)...</option>
                      <option value="colonie-high-am-purple">Colonie High AM - Purple</option>
                      <option value="jefferson-middle-am-blue">Jefferson Middle AM - Blue</option>
                      <option value="lincoln-elem-am-green">Lincoln Elementary AM - Green</option>
                      <option value="meyers-middle-am-yellow">Meyers Middle AM - Yellow</option>
                      <option value="roosevelt-high-pm-red">Roosevelt High PM - Red</option>
                      <option value="washington-high-pm-wolf">Washington High PM - Wolf Rd</option>
                    </select>
                  </forge-text-field>
                  <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', marginTop: 4 }}>Leave blank if incident occurred outside of a run</p>
                </div>

                <div>
                  <Label style={{ fontFamily: 'Roboto, sans-serif' }}>Driver</Label>
                  {/* @ts-ignore */}
                  <forge-text-field>
                    <select
                      value={sharedData.driver}
                      onChange={(e) => setSharedData(s => ({ ...s, driver: e.target.value }))}
                      style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                    >
                      <option value="">Select driver (optional)...</option>
                      {mockDrivers
                        .filter(d => d.status === 'Active')
                        .sort((a, b) => a.fullName.localeCompare(b.fullName))
                        .map(d => (
                          <option key={d.id} value={d.fullName}>{d.fullName}</option>
                        ))}
                    </select>
                  </forge-text-field>
                </div>

                <div>
                  <Label style={{ fontFamily: 'Roboto, sans-serif' }}>Severity Level *</Label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {(['low', 'medium', 'high', 'critical'] as const).map(level => (
                      <button key={level} type="button" onClick={() => setSharedData(s => ({ ...s, severity: level }))}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 transition-all ${sharedData.severity === level ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/50 hover:bg-muted'}`}>
                        {sharedData.severity === level ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                        <Badge
                          variant={level === 'critical' || level === 'high' ? 'destructive' : level === 'medium' ? 'secondary' : 'outline'}
                          style={level === 'critical' ? { background: 'var(--forge-theme-critical)', color: '#fff', borderColor: 'var(--forge-theme-critical)' } : undefined}
                          className="pointer-events-none"
                        >{level.charAt(0).toUpperCase() + level.slice(1)}</Badge>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label style={{ fontFamily: 'Roboto, sans-serif' }}>Incident Description *</Label>
                <Textarea
                  placeholder="Provide a detailed description of what occurred. Include time, specific behaviors, and any relevant context..."
                  rows={5}
                  value={sharedData.description}
                  onChange={(e) => setSharedData(s => ({ ...s, description: e.target.value }))}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="witnessPresent" checked={sharedData.witnessPresent} onCheckedChange={(v) => setSharedData(s => ({ ...s, witnessPresent: v as boolean }))} />
                <Label htmlFor="witnessPresent" className="cursor-pointer" style={{ fontFamily: 'Roboto, sans-serif' }}>Witness(es) present</Label>
              </div>
              {sharedData.witnessPresent && (
                <WitnessFields
                  names={sharedData.witnessNames}
                  onChange={(names) => setSharedData(s => ({ ...s, witnessNames: names }))}
                />
              )}

              <div>
                <Label style={{ fontFamily: 'Roboto, sans-serif', display: 'block', marginBottom: '8px' }}>Tags</Label>
                <TagFields
                  tags={sharedData.tags}
                  onChange={(tags) => setSharedData(s => ({ ...s, tags }))}
                />
              </div>

              {/* Location map */}
              <IncidentLocationMap
                location={locationCoordinates}
                onLocationChange={setLocationCoordinates}
                address={locationAddress}
                onAddressChange={setLocationAddress}
              />

              {/* Photo evidence */}
              <div>
                <h4 style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-base)', fontWeight: 500, marginBottom: 8 }}>Photo Evidence <span style={{ fontWeight: 400, color: 'var(--forge-theme-text-medium)', fontSize: 'var(--text-sm)' }}>(optional, shared across all records)</span></h4>
                <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                <ForgeButton type="button" variant="outlined" onClick={() => fileInputRef.current?.click()} style={{ fontFamily: 'Roboto, sans-serif' }}>
                  <Upload className="mr-2 h-4 w-4" /> Upload Photos
                </ForgeButton>
                {uploadedPhotos.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
                    {uploadedPhotos.map(p => (
                      <div key={p.id} className="relative group border rounded-lg overflow-hidden" style={{ borderColor: 'var(--forge-color-border-default)' }}>
                        <div className="aspect-square"><img src={p.url} alt={p.name} className="w-full h-full object-cover" /></div>
                        <button type="button" onClick={() => setUploadedPhotos(photos => photos.filter(x => x.id !== p.id))} className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-3 w-3 text-white" />
                        </button>
                        <div className="p-1"><p className="text-xs truncate" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)' }} title={p.name}>{p.name}</p></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Document evidence */}
              <div>
                <h4 style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-base)', fontWeight: 500, marginBottom: 8 }}>Document Evidence <span style={{ fontWeight: 400, color: 'var(--forge-theme-text-medium)', fontSize: 'var(--text-sm)' }}>(optional)</span></h4>
                <input ref={documentInputRef} type="file" accept=".pdf,.doc,.docx" multiple onChange={handleDocumentUpload} className="hidden" />
                <ForgeButton type="button" variant="outlined" onClick={() => documentInputRef.current?.click()} style={{ fontFamily: 'Roboto, sans-serif' }}>
                  <Upload className="mr-2 h-4 w-4" /> Upload Documents
                </ForgeButton>
                {uploadedDocuments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {uploadedDocuments.map(d => (
                      <div key={d.id} className="flex items-center gap-2 px-3 py-2 border rounded-md" style={{ borderColor: 'var(--forge-color-border-default)' }}>
                        <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)' }}>{d.name}</span>
                        <button type="button" onClick={() => setUploadedDocuments(docs => docs.filter(x => x.id !== d.id))}><X className="h-3 w-3 text-muted-foreground" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between p-4 border-t" style={{ borderColor: 'var(--forge-color-border-subtle)' }}>
            <ForgeButton type="button" variant="outlined" onClick={() => setCurrentStep(1)} style={{ fontFamily: 'Roboto, sans-serif' }}>
              ← Back
            </ForgeButton>
            <button
              type="button"
              disabled={!sharedData.incidentType || !sharedData.severity || !sharedData.description || !sharedData.location}
              onClick={() => setCurrentStep(3)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '0 20px', height: '38px',
                background: (!sharedData.incidentType || !sharedData.severity || !sharedData.description || !sharedData.location) ? '#9BAEC8' : '#4A6FA5',
                color: '#fff', border: 'none', borderRadius: '4px',
                fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: 500,
                cursor: (!sharedData.incidentType || !sharedData.severity || !sharedData.description || !sharedData.location) ? 'not-allowed' : 'pointer',
              }}
            >
              Next: Per-Student Details <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </ForgeCard>
      )}

      {/* ── Step 3: Per-Student Details ── */}
      {currentStep === 3 && (
        <ForgeCard style={{ border: 'none', boxShadow: 'none' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }}>
            <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif', marginBottom: 4 }}>Per-Student Details</h3>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', color: 'var(--forge-theme-text-medium)', marginBottom: 'var(--forge-spacing-medium)' }}>
              Customize details for each individual student. Parent notification and specific actions can differ per student.
            </p>

            <div className="space-y-3">
              {involvedStudents.map((student, idx) => {
                const data = perStudentData[student.id] || { parentNotified: false, actionTaken: '', notes: '' };
                const isExpanded = expandedStudents.has(student.id);
                return (
                  <div key={student.id} className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--forge-color-border-default)', borderRadius: 'var(--forge-radius-medium)' }}>
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
                      onClick={() => {
                        setExpandedStudents(prev => {
                          const n = new Set(prev);
                          if (n.has(student.id)) n.delete(student.id); else n.add(student.id);
                          return n;
                        });
                      }}
                    >
                      <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', minWidth: 20, textAlign: 'center' }}>{idx + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-base)', fontWeight: 500 }}>{student.name}</p>
                        <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)' }}>
                          {student.grade} · {student.school}
                          {data.parentNotified && <span className="ml-2 text-green-600">· Parent notified</span>}
                        </p>
                      </div>
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-4 border-t" style={{ borderColor: 'var(--forge-color-border-subtle)' }}>
                        <div className="pt-4">

                          {/* Role in Incident */}
                          <div className="mb-4">
                            <Label style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}>
                              Role in Incident <span style={{ color: '#c0392b' }}>*</span>
                            </Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {([
                                { value: 'instigator', label: 'Instigator' },
                                { value: 'participant', label: 'Participant' },
                                { value: 'victim', label: 'Victim' },
                                { value: 'bystander', label: 'Bystander/Witness' },
                              ] as const).map(option => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => updatePerStudent(student.id, 'role', option.value)}
                                  style={{
                                    padding: '6px 16px',
                                    minWidth: 72,
                                    borderRadius: '4px',
                                    border: data.role === option.value ? '2px solid #4A6FA5' : '1px solid var(--forge-color-border-default)',
                                    background: data.role === option.value ? '#EEF2F8' : '#fff',
                                    color: data.role === option.value ? '#4A6FA5' : 'inherit',
                                    fontFamily: 'Roboto, sans-serif',
                                    fontSize: 'var(--text-sm)',
                                    fontWeight: data.role === option.value ? 500 : 400,
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                  }}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Severity Override */}
                          <div className="mb-4">
                            <Label style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}>Severity Override</Label>
                            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', margin: '2px 0 8px' }}>
                              Leave as "Use Shared" to use the default severity ({sharedData.severity || 'not set'}). Override only if this student's involvement warrants a different level.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {([
                                { value: 'shared', label: `Use Shared\n(${sharedData.severity || 'not set'})` },
                                { value: 'low', label: 'Low' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'high', label: 'High' },
                                { value: 'critical', label: 'Critical' },
                              ] as const).map(option => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => updatePerStudent(student.id, 'severityOverride', option.value)}
                                  style={{
                                    padding: '6px 16px',
                                    minWidth: 72,
                                    borderRadius: '4px',
                                    border: data.severityOverride === option.value ? '2px solid #4A6FA5' : '1px solid var(--forge-color-border-default)',
                                    background: data.severityOverride === option.value ? '#EEF2F8' : '#fff',
                                    color: data.severityOverride === option.value ? '#4A6FA5' : 'inherit',
                                    fontFamily: 'Roboto, sans-serif',
                                    fontSize: 'var(--text-sm)',
                                    fontWeight: data.severityOverride === option.value ? 500 : 400,
                                    cursor: 'pointer',
                                    whiteSpace: 'pre-line',
                                    lineHeight: 1.3,
                                    textAlign: 'center',
                                  }}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Incident Type Override */}
                          <div className="mb-4">
                            <Label style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}>Incident Type Override</Label>
                            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', margin: '2px 0 8px' }}>
                              Leave as "Use Shared" to assign the default incident type and workflow ({sharedData.incidentType ? getIncidentTypeLabel(sharedData.incidentType) : 'not set'}). Override to assign a different workflow for this student — e.g. a bystander may need a recap workflow instead of a disciplinary one.
                            </p>
                            {/* @ts-ignore */}
                            <forge-text-field>
                              <select
                                value={data.incidentTypeOverride}
                                onChange={(e) => updatePerStudent(student.id, 'incidentTypeOverride', e.target.value)}
                                style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                              >
                                <option value="">Use Shared ({sharedData.incidentType ? getIncidentTypeLabel(sharedData.incidentType) : 'not set'})</option>
                                {getAllCategories().map(cat => {
                                  const types = INCIDENT_TYPES.filter(t => t.category === cat && (t.applicableTo === 'student' || t.applicableTo === 'both')).sort((a, b) => a.label.localeCompare(b.label));
                                  if (!types.length) return null;
                                  return (
                                    <optgroup key={cat} label={cat}>
                                      {types.map(t => (
                                        <option key={t.id} value={t.id}>
                                          {t.label}{t.id === sharedData.incidentType ? ' (shared)' : ''}
                                        </option>
                                      ))}
                                    </optgroup>
                                  );
                                })}
                              </select>
                            </forge-text-field>
                            {data.incidentTypeOverride && (
                              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: '#4A6FA5', marginTop: 4 }}>
                                {INCIDENT_TYPES.find(t => t.id === data.incidentTypeOverride)?.description}
                              </p>
                            )}
                          </div>

                          <div className="mb-4">
                            <Label htmlFor={`desc-${student.id}`} style={{ fontFamily: 'Roboto, sans-serif' }}>Description of Involvement</Label>
                            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', margin: '2px 0 8px' }}>
                              Describe what this student specifically did or experienced during the incident.
                            </p>
                            <Textarea
                              id={`desc-${student.id}`}
                              placeholder="e.g. Verbally confronted another student, threw backpack, was struck by..."
                              rows={3}
                              value={data.description}
                              onChange={(e) => updatePerStudent(student.id, 'description', e.target.value)}
                              style={{ fontFamily: 'Roboto, sans-serif', marginTop: 6 }}
                            />
                          </div>

                          <div className="flex items-center space-x-2 mb-4">
                            <Checkbox
                              id={`parent-${student.id}`}
                              checked={data.parentNotified}
                              onCheckedChange={(v) => updatePerStudent(student.id, 'parentNotified', v as boolean)}
                            />
                            <Label htmlFor={`parent-${student.id}`} className="cursor-pointer" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              Parent/Guardian has been notified
                            </Label>
                          </div>
                          <div className="mb-4">
                            <Label htmlFor={`action-${student.id}`} style={{ fontFamily: 'Roboto, sans-serif' }}>Immediate Action Taken</Label>
                            <Textarea
                              id={`action-${student.id}`}
                              placeholder="Describe any immediate actions taken for this student (e.g., student moved seats, verbal warning given)..."
                              rows={3}
                              value={data.actionTaken}
                              onChange={(e) => updatePerStudent(student.id, 'actionTaken', e.target.value)}
                              style={{ fontFamily: 'Roboto, sans-serif', marginTop: 6 }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`notes-${student.id}`} style={{ fontFamily: 'Roboto, sans-serif' }}>Additional Notes</Label>
                            <Textarea
                              id={`notes-${student.id}`}
                              placeholder="Any additional notes specific to this student's involvement..."
                              rows={2}
                              value={data.notes}
                              onChange={(e) => updatePerStudent(student.id, 'notes', e.target.value)}
                              style={{ fontFamily: 'Roboto, sans-serif', marginTop: 6 }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between p-4 border-t" style={{ borderColor: 'var(--forge-color-border-subtle)' }}>
            <ForgeButton type="button" variant="outlined" onClick={() => setCurrentStep(2)} style={{ fontFamily: 'Roboto, sans-serif' }}>
              ← Back
            </ForgeButton>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '0 20px', height: '38px',
                background: '#4A6FA5', color: '#fff', border: 'none', borderRadius: '4px',
                fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
              }}
            >
              Next: Review & Submit <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </ForgeCard>
      )}

      {/* ── Step 4: Review & Submit ── */}
      {currentStep === 4 && (
        <ForgeCard style={{ border: 'none', boxShadow: 'none' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }}>
            <h3 className="forge-typography--heading4" style={{ fontFamily: 'Roboto, sans-serif', marginBottom: 4 }}>Review & Submit</h3>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', color: 'var(--forge-theme-text-medium)', marginBottom: 'var(--forge-spacing-medium)' }}>
              Submitting will create <strong>{involvedStudents.length} linked incident record{involvedStudents.length !== 1 ? 's' : ''}</strong> — one for each student below.
            </p>

            {/* Shared summary */}
            <div className="rounded-lg p-4 mb-4" style={{ background: '#F4F7FB', border: '1px solid #D4DFF0', borderRadius: 'var(--forge-radius-medium)' }}>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--forge-theme-text-medium)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Shared Incident Details</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {[
                  { label: 'Type', value: getIncidentTypeLabel(sharedData.incidentType) },
                  { label: 'Severity', value: sharedData.severity.charAt(0).toUpperCase() + sharedData.severity.slice(1) },
                  { label: 'Location', value: getLocationLabel(sharedData.location) },
                  ...(sharedData.bus ? [{ label: 'Vehicle', value: `Vehicle ${sharedData.bus.replace('bus-', '')}` }] : []),
                  ...(sharedData.route ? [{ label: 'Run', value: sharedData.route }] : []),
                  ...(sharedData.driver ? [{ label: 'Driver', value: sharedData.driver }] : []),
                  ...(uploadedPhotos.length ? [{ label: 'Photos', value: `${uploadedPhotos.length} attached` }] : []),
                  ...(uploadedDocuments.length ? [{ label: 'Documents', value: `${uploadedDocuments.length} attached` }] : []),
                ].map(item => (
                  <div key={item.label}>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)' }}>{item.label}: </span>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
              {sharedData.description && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: '#D4DFF0' }}>
                  <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', marginBottom: 4 }}>Description:</p>
                  <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>{sharedData.description}</p>
                </div>
              )}
            </div>

            {/* Per-student summary */}
            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--forge-theme-text-medium)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
              Students ({involvedStudents.length})
            </p>
            <div className="space-y-2 mb-4">
              {involvedStudents.map((student, idx) => {
                const data = perStudentData[student.id];
                return (
                  <div key={student.id} className="flex items-start gap-3 p-3 rounded-lg border" style={{ borderColor: 'var(--forge-color-border-default)', borderRadius: 'var(--forge-radius-medium)' }}>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', minWidth: 20, textAlign: 'center', paddingTop: 2 }}>{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-base)', fontWeight: 500 }}>{student.name}</p>
                      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)' }}>
                        {student.id} · {student.grade} · {student.school}
                      </p>
                      {data && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {data.role && <Badge variant="outline" style={{ fontSize: 'var(--text-xs)', textTransform: 'capitalize' }}>{data.role}</Badge>}
                          {data.incidentTypeOverride && <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50" style={{ fontSize: 'var(--text-xs)' }}>Type: {getIncidentTypeLabel(data.incidentTypeOverride)}</Badge>}
                          {data.severityOverride !== 'shared' && <Badge variant="outline" style={{ fontSize: 'var(--text-xs)', textTransform: 'capitalize' }}>Severity: {data.severityOverride}</Badge>}
                          {data.parentNotified && <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50" style={{ fontSize: 'var(--text-xs)' }}>Parent notified</Badge>}
                          {data.description && <Badge variant="outline" style={{ fontSize: 'var(--text-xs)' }}>Description added</Badge>}
                          {data.actionTaken && <Badge variant="outline" style={{ fontSize: 'var(--text-xs)' }}>Action documented</Badge>}
                          {data.notes && <Badge variant="outline" style={{ fontSize: 'var(--text-xs)' }}>Notes added</Badge>}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: '#4A6FA5', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', flexShrink: 0 }}
                    >
                      Edit
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between p-4 border-t" style={{ borderColor: 'var(--forge-color-border-subtle)' }}>
            <ForgeButton type="button" variant="outlined" onClick={() => setCurrentStep(3)} style={{ fontFamily: 'Roboto, sans-serif' }}>
              ← Back
            </ForgeButton>
            <div className="flex gap-3">
              <ForgeButton type="button" variant="outlined" onClick={() => onNavigate('incidents')} style={{ fontFamily: 'Roboto, sans-serif' }}>Cancel</ForgeButton>
              <button
                type="button"
                onClick={handleStudentSubmit}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '0 20px', height: '38px',
                  background: '#4A6FA5', color: '#fff', border: 'none', borderRadius: '4px',
                  fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                }}
              >
                <Send className="h-4 w-4" />
                Submit {involvedStudents.length} Incident{involvedStudents.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </ForgeCard>
      )}
    </div>
  );
}
