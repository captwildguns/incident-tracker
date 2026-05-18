import { useState, useEffect, useRef } from 'react';
import { ForgeButton } from '@tylertech/forge-react';
import { defineButtonComponent, defineTextFieldComponent } from '@tylertech/forge';
defineButtonComponent();
defineTextFieldComponent();
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Save, X, Check, Circle, CheckCircle2, Upload, Image as ImageIcon, FileText, Plus } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { INCIDENT_TYPES, getAllCategories } from './IncidentTypes';
import { IncidentLocationMap } from './IncidentLocationMap';
import { toast } from 'sonner';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';

const mockStudents = [
  { id: 'STU-2891', name: 'Sarah Mitchell', grade: '8th Grade', school: 'Lincoln Middle School' },
  { id: 'STU-3421', name: 'Marcus Johnson', grade: '10th Grade', school: 'Washington High School' },
  { id: 'STU-1956', name: 'Emma Rodriguez', grade: '7th Grade', school: 'Jefferson Middle School' },
  { id: 'STU-4782', name: 'James Thompson', grade: '9th Grade', school: 'Roosevelt High School' },
  { id: 'STU-5623', name: 'Olivia Davis', grade: '11th Grade', school: 'Washington High School' },
  { id: 'STU-6234', name: 'Liam Anderson', grade: '6th Grade', school: 'Lincoln Middle School' },
  { id: 'STU-7845', name: 'Sophia Martinez', grade: '9th Grade', school: 'Roosevelt High School' },
  { id: 'STU-8956', name: 'Noah Williams', grade: '7th Grade', school: 'Jefferson Middle School' },
  { id: 'STU-9067', name: 'Isabella Brown', grade: '10th Grade', school: 'Washington High School' },
  { id: 'STU-1178', name: 'Ethan Taylor', grade: '8th Grade', school: 'Lincoln Middle School' },
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

interface EditIncidentDialogProps {
  incident: any;
  onClose: () => void;
  onSave?: (updatedIncident: any) => void;
}

export function EditIncidentDialog({ incident, onClose, onSave }: EditIncidentDialogProps) {
  const [formData, setFormData] = useState({
    studentId: incident.studentId || '',
    student: incident.student || '',
    incidentType: incident.type || '',
    severity: incident.severity?.toLowerCase() || '',
    description: incident.description || '',
    location: incident.location || 'on-bus',
    bus: incident.bus || '',
    route: incident.route || '',
    driver: incident.driver || '',
    status: incident.status || 'Open',
    witnessPresent: (incident.witnesses?.length > 0) || false,
    witnessNames: (incident.witnesses as string[] | undefined) || [],
    tags: (incident.tags as string[] | undefined) || [],
    parentNotified: incident.parentNotified || false,
    actionTaken: incident.actionTaken || '',
    assignedTo: incident.assignedTo || '',
  });

  const [locationCoordinates, setLocationCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [locationAddress, setLocationAddress] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [studentLookupOpen, setStudentLookupOpen] = useState(false);
  const studentLookupRef = useRef<HTMLDivElement>(null);

  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ id: string; name: string; url: string; size: string }>>(
    incident.photos || []
  );
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{ id: string; name: string; size: string; type: string }>>(
    incident.documents || []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (studentLookupRef.current && !studentLookupRef.current.contains(event.target as Node)) {
        setStudentLookupOpen(false);
      }
    };
    if (studentLookupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [studentLookupOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    toast.success('Incident Updated', {
      description: `${incident.id} has been successfully updated.`,
    });
    if (onSave) onSave(formData);
    setTimeout(() => { setShowSuccess(false); onClose(); }, 1500);
  };

  const handleIncidentTypeChange = (value: string) => {
    const selectedType = INCIDENT_TYPES.find(t => t.id === value);
    setFormData({ ...formData, incidentType: value, severity: selectedType?.defaultSeverity.toLowerCase() || '' });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPhotos = Array.from(files).map((file, index) => {
      const url = URL.createObjectURL(file);
      const sizeInKB = (file.size / 1024).toFixed(1);
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      return { id: `${Date.now()}-${index}`, name: file.name, url, size: file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB` };
    });
    setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newDocuments = Array.from(files).map((file, index) => {
      const sizeInKB = (file.size / 1024).toFixed(1);
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      return { id: `${Date.now()}-${index}`, name: file.name, size: file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`, type: file.type };
    });
    setUploadedDocuments([...uploadedDocuments, ...newDocuments]);
    if (documentInputRef.current) documentInputRef.current.value = '';
  };

  const selectedIncidentType = INCIDENT_TYPES.find(t => t.id === formData.incidentType);

  return (
    <div className="max-h-[600px] overflow-y-auto">
      {showSuccess && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">Incident updated successfully!</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── Student Information ── */}
        <div className="space-y-4">
          <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, marginBottom: 12 }}>Student Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative" ref={studentLookupRef}>
              <Label htmlFor="edit-student" style={{ fontFamily: 'Roboto, sans-serif' }}>Student Name</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <input
                  type="text"
                  id="edit-student"
                  value={formData.student}
                  onChange={(e) => { setFormData({ ...formData, student: e.target.value }); setStudentLookupOpen(true); }}
                  placeholder="Type to search students..."
                  required
                />
              </forge-text-field>
              {studentLookupOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-[300px] overflow-hidden">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No student found.</CommandEmpty>
                      <CommandGroup>
                        {mockStudents
                          .filter(s => s.name.toLowerCase().includes(formData.student.toLowerCase()) || s.id.toLowerCase().includes(formData.student.toLowerCase()))
                          .map(student => (
                            <CommandItem
                              key={student.id}
                              value={student.name}
                              onSelect={() => { setFormData({ ...formData, student: student.name, studentId: student.id }); setStudentLookupOpen(false); }}
                            >
                              <Check className={formData.student === student.name ? 'mr-2 h-4 w-4 opacity-100' : 'mr-2 h-4 w-4 opacity-0'} />
                              <div className="flex flex-col">
                                <div>{student.name}</div>
                                <div className="text-sm text-muted-foreground">{student.id} · {student.grade} · {student.school}</div>
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
              <Label htmlFor="edit-studentId" style={{ fontFamily: 'Roboto, sans-serif' }}>Student ID</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <input type="text" id="edit-studentId" value={formData.studentId} disabled style={{ cursor: 'not-allowed' }} />
              </forge-text-field>
            </div>
          </div>
        </div>

        {/* ── Incident Details ── */}
        <div className="space-y-4">
          <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, marginBottom: 12 }}>Incident Details</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-incidentType" style={{ fontFamily: 'Roboto, sans-serif' }}>Incident Type *</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <select
                  id="edit-incidentType"
                  value={formData.incidentType}
                  onChange={(e) => handleIncidentTypeChange(e.target.value)}
                  required
                  style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                >
                  <option value="" disabled>Select type...</option>
                  {getAllCategories().map((category) => (
                    <optgroup key={category} label={category}>
                      {INCIDENT_TYPES.filter(type => type.category === category).map((type) => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </forge-text-field>
              {selectedIncidentType && (
                <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', marginTop: 4 }}>
                  {selectedIncidentType.description}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="edit-status" style={{ fontFamily: 'Roboto, sans-serif' }}>Status</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <select
                  id="edit-status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </forge-text-field>
            </div>

            <div>
              <Label htmlFor="edit-location" style={{ fontFamily: 'Roboto, sans-serif' }}>Location *</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <select
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                >
                  <option value="" disabled>Select location...</option>
                  {LOCATION_OPTIONS.map(g => (
                    <optgroup key={g.category} label={g.category}>
                      {g.items.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
                    </optgroup>
                  ))}
                </select>
              </forge-text-field>
            </div>

            <div>
              <Label htmlFor="edit-bus" style={{ fontFamily: 'Roboto, sans-serif' }}>Vehicle Number</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <select
                  id="edit-bus"
                  value={formData.bus}
                  onChange={(e) => setFormData({ ...formData, bus: e.target.value })}
                  style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                >
                  <option value="">Select vehicle (optional)...</option>
                  <option value="Bus 5">Vehicle 5</option>
                  <option value="Bus 8">Vehicle 8</option>
                  <option value="Bus 12">Vehicle 12</option>
                  <option value="Bus 15">Vehicle 15</option>
                  <option value="Bus 22">Vehicle 22</option>
                  <option value="Bus 31">Vehicle 31</option>
                  <option value="Bus 14">Vehicle 14</option>
                  <option value="Bus 9">Vehicle 9</option>
                </select>
              </forge-text-field>
            </div>

            <div>
              <Label htmlFor="edit-route" style={{ fontFamily: 'Roboto, sans-serif' }}>Run</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <select
                  id="edit-route"
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                  style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                >
                  <option value="">Select run (optional)...</option>
                  <option value="Colonie High AM - Purple">Colonie High AM - Purple</option>
                  <option value="Jefferson Middle AM - Blue">Jefferson Middle AM - Blue</option>
                  <option value="Lincoln Elementary AM - Green">Lincoln Elementary AM - Green</option>
                  <option value="Meyers Middle AM - Yellow">Meyers Middle AM - Yellow</option>
                  <option value="Roosevelt High AM - Red">Roosevelt High AM - Red</option>
                  <option value="Washington High PM - Wolf Rd">Washington High PM - Wolf Rd</option>
                </select>
              </forge-text-field>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', marginTop: 4 }}>
                Leave blank if incident occurred outside of a run
              </p>
            </div>

            <div>
              <Label htmlFor="edit-driver" style={{ fontFamily: 'Roboto, sans-serif' }}>Driver</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <input
                  type="text"
                  id="edit-driver"
                  value={formData.driver}
                  onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                />
              </forge-text-field>
            </div>
          </div>

          {/* Severity — same badge-button style as creation */}
          <div>
            <Label style={{ fontFamily: 'Roboto, sans-serif' }}>Severity Level *</Label>
            <div className="flex gap-3 mt-2">
              {(['low', 'medium', 'high', 'critical'] as const).map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, severity: level })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 transition-all ${formData.severity === level ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/50 hover:bg-muted'}`}
                >
                  {formData.severity === level
                    ? <CheckCircle2 className="h-4 w-4 text-primary" />
                    : <Circle className="h-4 w-4 text-muted-foreground" />}
                  <Badge
                    variant={level === 'critical' || level === 'high' ? 'destructive' : level === 'medium' ? 'secondary' : 'outline'}
                    style={level === 'critical' ? { background: 'var(--forge-theme-critical)', color: '#fff', borderColor: 'var(--forge-theme-critical)' } : undefined}
                    className="pointer-events-none"
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="edit-description" style={{ fontFamily: 'Roboto, sans-serif' }}>Incident Description *</Label>
            <Textarea
              id="edit-description"
              placeholder="Provide a detailed description of what occurred..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              style={{ fontFamily: 'Roboto, sans-serif' }}
            />
          </div>
        </div>

        {/* ── Additional Information ── */}
        <div className="space-y-4">
          <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, marginBottom: 12 }}>Additional Information</h3>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="edit-witnessPresent"
              checked={formData.witnessPresent}
              onCheckedChange={(checked) => setFormData({ ...formData, witnessPresent: checked as boolean })}
            />
            <Label htmlFor="edit-witnessPresent" className="cursor-pointer" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Witness(es) present
            </Label>
          </div>

          {formData.witnessPresent && (
            <WitnessFields
              names={formData.witnessNames}
              onChange={(witnessNames) => setFormData({ ...formData, witnessNames })}
            />
          )}

          <div>
            <Label style={{ fontFamily: 'Roboto, sans-serif', display: 'block', marginBottom: '8px' }}>Tags</Label>
            <TagFields
              tags={formData.tags}
              onChange={(tags) => setFormData({ ...formData, tags })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="edit-parentNotified"
              checked={formData.parentNotified}
              onCheckedChange={(checked) => setFormData({ ...formData, parentNotified: checked as boolean })}
            />
            <Label htmlFor="edit-parentNotified" className="cursor-pointer" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Parent/Guardian has been notified
            </Label>
          </div>

          <div>
            <Label htmlFor="edit-actionTaken" style={{ fontFamily: 'Roboto, sans-serif' }}>Action Taken</Label>
            <Textarea
              id="edit-actionTaken"
              placeholder="Describe actions taken..."
              rows={3}
              value={formData.actionTaken}
              onChange={(e) => setFormData({ ...formData, actionTaken: e.target.value })}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            />
          </div>
        </div>

        {/* ── Location Map ── */}
        <div className="space-y-2">
          <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, marginBottom: 8 }}>Incident Location</h3>
          <IncidentLocationMap
            location={locationCoordinates}
            onLocationChange={setLocationCoordinates}
            address={locationAddress}
            onAddressChange={setLocationAddress}
          />
        </div>

        {/* ── Photo Evidence ── */}
        <div className="space-y-4">
          <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, marginBottom: 4 }}>Photo Evidence</h3>
          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" id="edit-photo-upload" />
          <ForgeButton type="button" variant="outlined" onClick={() => fileInputRef.current?.click()} style={{ fontFamily: 'Roboto, sans-serif' }}>
            <Upload className="mr-2 h-4 w-4" /> Upload Photos
          </ForgeButton>
          <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', marginTop: 4 }}>
            Supported formats: JPG, PNG, GIF. Maximum 10 photos.
          </p>

          {uploadedPhotos.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
              {uploadedPhotos.map((p) => (
                <div key={p.id} className="relative group border rounded-lg overflow-hidden" style={{ borderColor: 'var(--forge-color-border-default)' }}>
                  <div className="aspect-square"><img src={p.url} alt={p.name} className="w-full h-full object-cover" /></div>
                  <button type="button" onClick={() => setUploadedPhotos(photos => photos.filter(x => x.id !== p.id))}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="h-3 w-3 text-white" />
                  </button>
                  <div className="p-1"><p className="text-xs truncate" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)' }} title={p.name}>{p.name}</p></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: 'var(--forge-color-border-subtle)' }}>
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', color: 'var(--forge-theme-text-medium)' }}>No photos uploaded yet</p>
            </div>
          )}
        </div>

        {/* ── Document Evidence ── */}
        <div className="space-y-4">
          <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, marginBottom: 4 }}>Document Evidence</h3>
          <input ref={documentInputRef} type="file" accept=".pdf,.doc,.docx" multiple onChange={handleDocumentUpload} className="hidden" id="edit-document-upload" />
          <ForgeButton type="button" variant="outlined" onClick={() => documentInputRef.current?.click()} style={{ fontFamily: 'Roboto, sans-serif' }}>
            <Upload className="mr-2 h-4 w-4" /> Upload Documents
          </ForgeButton>
          <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', color: 'var(--forge-theme-text-medium)', marginTop: 4 }}>
            Supported formats: PDF, DOC, DOCX. Maximum 10 documents.
          </p>

          {uploadedDocuments.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-3">
              {uploadedDocuments.map((d) => (
                <div key={d.id} className="flex items-center gap-2 px-3 py-2 border rounded-md" style={{ borderColor: 'var(--forge-color-border-default)' }}>
                  <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)' }}>{d.name}</span>
                  <button type="button" onClick={() => setUploadedDocuments(docs => docs.filter(x => x.id !== d.id))}>
                    <X className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: 'var(--forge-color-border-subtle)' }}>
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', color: 'var(--forge-theme-text-medium)' }}>No documents uploaded yet</p>
            </div>
          )}
        </div>

        {/* ── Form Actions ── */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            type="submit"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0 16px', height: '36px',
              background: '#4A6FA5', color: '#ffffff',
              border: 'none', borderRadius: '4px',
              fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: 500,
              cursor: 'pointer', letterSpacing: '0.0125em',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#3d5d8a')}
            onMouseLeave={e => (e.currentTarget.style.background = '#4A6FA5')}
          >
            <Save className="h-4 w-4" />
            Update Incident
          </button>
          <ForgeButton type="button" variant="outlined" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </ForgeButton>
        </div>
      </form>
    </div>
  );
}
