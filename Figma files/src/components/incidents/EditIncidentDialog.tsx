import { useState, useEffect, useRef } from 'react';
import { ForgeButton } from '@tylertech/forge-react';
import { defineButtonComponent, defineTextFieldComponent } from '@tylertech/forge';
defineButtonComponent();
defineTextFieldComponent();
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Save, X, Check, Upload, Image as ImageIcon, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { INCIDENT_TYPES, getAllCategories } from './IncidentTypes';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';

// Mock student data - in production this would come from an API or shared data store
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
    location: 'on-bus',
    bus: incident.bus || '',
    route: incident.route || '',
    driver: incident.driver || '',
    status: incident.status || 'Open',
    witnessPresent: false,
    witnessName: '',
    parentNotified: false,
    actionTaken: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [studentLookupOpen, setStudentLookupOpen] = useState(false);
  const studentLookupRef = useRef<HTMLDivElement>(null);

  // Photo and document upload state
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ id: string; name: string; url: string; size: string }>>(
    incident.photos || []
  );
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{ id: string; name: string; size: string; type: string }>>(
    incident.documents || []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    
    // Show toast notification
    toast.success('Incident Updated', {
      description: `${incident.id} has been successfully updated.`,
    });

    // Call onSave callback if provided
    if (onSave) {
      onSave(formData);
    }

    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
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

  return (
    <div className="max-h-[600px] overflow-y-auto">
      {showSuccess && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            Incident updated successfully!
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Information */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-3">Student Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative" ref={studentLookupRef}>
                <Label htmlFor="edit-student">Student Name</Label>
                {/* @ts-ignore */}
                <forge-text-field>
                  <input
                    type="text"
                    id="edit-student"
                    value={formData.student}
                    onChange={(e) => {
                      setFormData({ ...formData, student: e.target.value });
                      setStudentLookupOpen(true);
                    }}
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
                                  });
                                  setStudentLookupOpen(false);
                                }}
                              >
                                <Check
                                  className={
                                    formData.student === student.name
                                      ? "mr-2 h-4 w-4 opacity-100"
                                      : "mr-2 h-4 w-4 opacity-0"
                                  }
                                />
                                <div className="flex flex-col">
                                  <div>{student.name}</div>
                                  <div className="text-sm text-muted-foreground">
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
                <Label htmlFor="edit-studentId">Student ID</Label>
                {/* @ts-ignore */}
                <forge-text-field>
                  <input
                    type="text"
                    id="edit-studentId"
                    value={formData.studentId}
                    disabled
                    style={{ backgroundColor: 'var(--forge-color-surface-subtle)', cursor: 'not-allowed' }}
                  />
                </forge-text-field>
              </div>
            </div>
          </div>
        </div>

        {/* Incident Details */}
        <div className="space-y-4">
          <h3 className="font-medium mb-3">Incident Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-incidentType">Incident Type *</Label>
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
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </forge-text-field>
            </div>

            <div>
              <Label htmlFor="edit-status">Status</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <select
                  id="edit-status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                  style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                >
                  <option value="" disabled>Select status...</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </forge-text-field>
            </div>

            <div>
              <Label htmlFor="edit-bus">Vehicle Number</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <select
                  id="edit-bus"
                  value={formData.bus}
                  onChange={(e) => setFormData({ ...formData, bus: e.target.value })}
                  required
                  style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                >
                  <option value="" disabled>Select vehicle...</option>
                  <option value="Bus 5">Vehicle 5</option>
                  <option value="Bus 8">Vehicle 8</option>
                  <option value="Bus 12">Vehicle 12</option>
                  <option value="Bus 15">Vehicle 15</option>
                  <option value="Bus 22">Vehicle 22</option>
                </select>
              </forge-text-field>
            </div>

            <div>
              <Label htmlFor="edit-route">Run</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <select
                  id="edit-route"
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                  required
                  style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-base)', width: '100%' }}
                >
                  <option value="" disabled>Select run...</option>
                  <option value="Meyers Middle AM - Yellow">Meyers Middle AM - Yellow</option>
                  <option value="Washington High PM - Wolf Rd">Washington High PM - Wolf Rd</option>
                  <option value="Jefferson Middle AM - Blue">Jefferson Middle AM - Blue</option>
                  <option value="Roosevelt High PM - Red">Roosevelt High PM - Red</option>
                  <option value="Lincoln Elementary AM - Green">Lincoln Elementary AM - Green</option>
                  <option value="Colonie High AM - Purple">Colonie High AM - Purple</option>
                </select>
              </forge-text-field>
            </div>

            <div>
              <Label htmlFor="edit-driver">Driver</Label>
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

          <div>
            <Label>Severity Level *</Label>
            <RadioGroup
              value={formData.severity}
              onValueChange={(value) => setFormData({ ...formData, severity: value })}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="edit-low" />
                <Label htmlFor="edit-low" className="cursor-pointer">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="edit-medium" />
                <Label htmlFor="edit-medium" className="cursor-pointer">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="edit-high" />
                <Label htmlFor="edit-high" className="cursor-pointer">High</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="edit-description">Incident Description *</Label>
            <Textarea
              id="edit-description"
              placeholder="Provide a detailed description of what occurred..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <h3 className="font-medium mb-3">Additional Information</h3>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="edit-witnessPresent"
              checked={formData.witnessPresent}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, witnessPresent: checked as boolean })
              }
            />
            <Label htmlFor="edit-witnessPresent" className="cursor-pointer">
              Witness(es) present
            </Label>
          </div>

          {formData.witnessPresent && (
            <div>
              <Label htmlFor="edit-witnessName">Witness Name(s)</Label>
              {/* @ts-ignore */}
              <forge-text-field>
                <input
                  type="text"
                  id="edit-witnessName"
                  placeholder="Enter witness names..."
                  value={formData.witnessName}
                  onChange={(e) => setFormData({ ...formData, witnessName: e.target.value })}
                />
              </forge-text-field>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="edit-parentNotified"
              checked={formData.parentNotified}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, parentNotified: checked as boolean })
              }
            />
            <Label htmlFor="edit-parentNotified" className="cursor-pointer">
              Parent/Guardian has been notified
            </Label>
          </div>

          <div>
            <Label htmlFor="edit-actionTaken">Action Taken</Label>
            <Textarea
              id="edit-actionTaken"
              placeholder="Describe actions taken..."
              rows={3}
              value={formData.actionTaken}
              onChange={(e) => setFormData({ ...formData, actionTaken: e.target.value })}
            />
          </div>
        </div>

        {/* Photo Evidence */}
        <div className="space-y-4">
          <h3 className="font-medium mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>Photo Evidence</h3>
          <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>Upload photos documenting the incident (optional)</p>
          
          <div>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handlePhotoUpload} 
              className="hidden" 
              id="edit-photo-upload" 
            />
            <ForgeButton 
              type="button" 
              variant="outlined" 
              onClick={() => fileInputRef.current?.click()}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Photos
            </ForgeButton>
            <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Supported formats: JPG, PNG, GIF. Maximum 10 photos.
            </p>
          </div>

          {uploadedPhotos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {uploadedPhotos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="relative group border rounded-lg overflow-hidden bg-muted/30"
                  style={{ borderColor: 'var(--forge-color-border-default)', borderRadius: 'var(--forge-radius-medium)' }}
                >
                  <div className="aspect-square relative">
                    <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ForgeButton 
                        type="button" 
                        variant="raised" 
                        size="sm" 
                        onClick={() => handleRemovePhoto(photo.id)}
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </ForgeButton>
                    </div>
                  </div>
                  <div className="p-2 bg-background border-t" style={{ borderColor: 'var(--forge-color-border-default)' }}>
                    <p 
                      className="text-xs truncate" 
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }} 
                      title={photo.name}
                    >
                      {photo.name}
                    </p>
                    <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)' }}>
                      {photo.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center" 
              style={{ borderColor: 'var(--forge-color-border-subtle)', borderRadius: 'var(--forge-radius-medium)' }}
            >
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)' }}>
                No photos uploaded yet
              </p>
              <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)' }}>
                Click "Upload Photos" to add visual evidence
              </p>
            </div>
          )}
        </div>

        {/* Document Evidence */}
        <div className="space-y-4">
          <h3 className="font-medium mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>Document Evidence</h3>
          <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>Upload documents related to the incident (optional)</p>
          
          <div>
            <input 
              ref={documentInputRef} 
              type="file" 
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
              multiple 
              onChange={handleDocumentUpload} 
              className="hidden" 
              id="edit-document-upload" 
            />
            <ForgeButton 
              type="button" 
              variant="outlined" 
              onClick={() => documentInputRef.current?.click()}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Documents
            </ForgeButton>
            <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Supported formats: PDF, DOC, DOCX. Maximum 10 documents.
            </p>
          </div>

          {uploadedDocuments.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {uploadedDocuments.map((doc) => (
                <div 
                  key={doc.id} 
                  className="relative group border rounded-lg overflow-hidden bg-muted/30"
                  style={{ borderColor: 'var(--forge-color-border-default)', borderRadius: 'var(--forge-radius-medium)' }}
                >
                  <div className="aspect-square relative flex items-center justify-center bg-muted/50">
                    <FileText size={48} className="text-muted-foreground" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ForgeButton 
                        type="button" 
                        variant="raised" 
                        size="sm" 
                        onClick={() => handleRemoveDocument(doc.id)}
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </ForgeButton>
                    </div>
                  </div>
                  <div className="p-2 bg-background border-t" style={{ borderColor: 'var(--forge-color-border-default)' }}>
                    <p 
                      className="text-xs truncate" 
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }} 
                      title={doc.name}
                    >
                      {doc.name}
                    </p>
                    <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)' }}>
                      {doc.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center" 
              style={{ borderColor: 'var(--forge-color-border-subtle)', borderRadius: 'var(--forge-radius-medium)' }}
            >
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)' }}>
                No documents uploaded yet
              </p>
              <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-xs)' }}>
                Click "Upload Documents" to add related files
              </p>
            </div>
          )}
        </div>

        {/* Form Actions */}
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
          <ForgeButton
            type="button"
            variant="outlined"
            onClick={onClose}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </ForgeButton>
        </div>
      </form>
    </div>
  );
}