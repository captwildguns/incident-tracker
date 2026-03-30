// Incident Type Categories and Definitions for Student Transportation

export const INCIDENT_CATEGORIES = {
  BEHAVIORAL: 'Behavioral',
  SAFETY: 'Safety Violation',
  AGGRESSION: 'Aggression/Violence',
  DRIVER_DEFIANCE: 'Driver Defiance',
  PROPERTY: 'Property Damage',
  PROHIBITED_ITEMS: 'Prohibited Items',
  PRIVACY: 'Privacy Violation',
  DRIVER_OPERATIONAL: 'Driver Operational',
  DRIVER_SAFETY: 'Driver Safety',
  VEHICLE: 'Vehicle Incident',
} as const;

export interface IncidentType {
  id: string;
  label: string;
  category: string;
  description: string;
  defaultSeverity: 'Low' | 'Medium' | 'High';
  applicableTo: 'student' | 'driver' | 'both';
}

export const INCIDENT_TYPES: IncidentType[] = [
  // Behavioral Issues
  {
    id: 'offensive-language',
    label: 'Offensive Language',
    category: INCIDENT_CATEGORIES.BEHAVIORAL,
    description: 'Profane, obscene, or offensive language toward others',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'student-harassment',
    label: 'Student Harassment',
    category: INCIDENT_CATEGORIES.BEHAVIORAL,
    description: 'Abusive language/gestures targeting specific student',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'taunting',
    label: 'Taunting/Bullying',
    category: INCIDENT_CATEGORIES.BEHAVIORAL,
    description: 'Verbally or physically taunting other students',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'unwanted-contact',
    label: 'Unwanted Physical Contact',
    category: INCIDENT_CATEGORIES.BEHAVIORAL,
    description: 'Unwanted touching or contact with others',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'inappropriate-affection',
    label: 'Inappropriate Affection',
    category: INCIDENT_CATEGORIES.BEHAVIORAL,
    description: 'Inappropriate public display of affection',
    defaultSeverity: 'Low',
    applicableTo: 'student',
  },
  {
    id: 'disruptive-volume',
    label: 'Disruptive Volume',
    category: INCIDENT_CATEGORIES.BEHAVIORAL,
    description: 'Playing music loudly, yelling, or creating excessive noise on the bus',
    defaultSeverity: 'Low',
    applicableTo: 'student',
  },
  
  // Safety Violations
  {
    id: 'seat-refusal',
    label: 'Seat Refusal',
    category: INCIDENT_CATEGORIES.SAFETY,
    description: 'Refusal to remain in assigned seat',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'seatbelt-refusal',
    label: 'Seatbelt Refusal',
    category: INCIDENT_CATEGORIES.SAFETY,
    description: 'Refusal to wear seatbelt',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'unsafe-movement',
    label: 'Unsafe Movement',
    category: INCIDENT_CATEGORIES.SAFETY,
    description: 'Crawling over/under seats or unsafe behavior',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'window-misuse',
    label: 'Window Misuse',
    category: INCIDENT_CATEGORIES.SAFETY,
    description: 'Hanging arms/objects out window, opening emergency windows, or unsafe window behavior',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'emergency-exit-misuse',
    label: 'Emergency Exit Misuse',
    category: INCIDENT_CATEGORIES.SAFETY,
    description: 'Exiting via emergency exit or unsafe exit',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'wrong-stop-exit',
    label: 'Wrong Stop Exit',
    category: INCIDENT_CATEGORIES.SAFETY,
    description: 'Exiting at incorrect stop causing safety concern',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'eating-drinking',
    label: 'Eating/Drinking Violation',
    category: INCIDENT_CATEGORIES.SAFETY,
    description: 'Eating or drinking on the bus in violation of bus rules',
    defaultSeverity: 'Low',
    applicableTo: 'student',
  },

  // Technology Misuse
  {
    id: 'unauthorized-device-usage',
    label: 'Unauthorized Device Usage',
    category: INCIDENT_CATEGORIES.SAFETY,
    description: 'Student using electronic device (phone, tablet, speaker) in violation of bus policy, creating distraction or safety concern',
    defaultSeverity: 'Low',
    applicableTo: 'student',
  },
  
  // Aggression/Violence
  {
    id: 'threatening-behavior',
    label: 'Threatening Behavior',
    category: INCIDENT_CATEGORIES.AGGRESSION,
    description: 'Aggressive or threatening behavior toward another student',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'physical-altercation',
    label: 'Physical Altercation',
    category: INCIDENT_CATEGORIES.AGGRESSION,
    description: 'Fighting between two or more students',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'assault',
    label: 'Physical Assault',
    category: INCIDENT_CATEGORIES.AGGRESSION,
    description: 'Unacceptable physical contact causing harm',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'throwing-objects',
    label: 'Throwing Objects',
    category: INCIDENT_CATEGORIES.AGGRESSION,
    description: 'Throwing objects causing injury or damage',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  
  // Driver Defiance
  {
    id: 'driver-defiance',
    label: 'Driver Defiance',
    category: INCIDENT_CATEGORIES.DRIVER_DEFIANCE,
    description: 'Refusing to comply with driver directives',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'driver-harassment',
    label: 'Driver Harassment',
    category: INCIDENT_CATEGORIES.DRIVER_DEFIANCE,
    description: 'Threatening or abusive language toward driver',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'driver-threat',
    label: 'Driver Threat',
    category: INCIDENT_CATEGORIES.DRIVER_DEFIANCE,
    description: 'Aggressive or threatening behavior toward driver',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'verbal-abuse-driver',
    label: 'Verbal Abuse toward Driver',
    category: INCIDENT_CATEGORIES.DRIVER_DEFIANCE,
    description: 'Verbal abuse, insults, or derogatory language directed at the bus driver',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  
  // Property Damage
  {
    id: 'vandalism',
    label: 'Vandalism',
    category: INCIDENT_CATEGORIES.PROPERTY,
    description: 'Property damage requiring monetary restitution',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  
  // Prohibited Items
  {
    id: 'tobacco-vaping',
    label: 'Tobacco/Vaping',
    category: INCIDENT_CATEGORIES.PROHIBITED_ITEMS,
    description: 'Violating tobacco or smoking policy',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'harmful-items',
    label: 'Harmful Items',
    category: INCIDENT_CATEGORIES.PROHIBITED_ITEMS,
    description: 'Possession of harmful item or device',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'weapon-possession',
    label: 'Weapon Possession',
    category: INCIDENT_CATEGORIES.PROHIBITED_ITEMS,
    description: 'Possession of a weapon or weapon-like object on the bus',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'illegal-substances',
    label: 'Illegal Substances',
    category: INCIDENT_CATEGORIES.PROHIBITED_ITEMS,
    description: 'Possessing illegal drugs',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'inappropriate-material',
    label: 'Inappropriate Material',
    category: INCIDENT_CATEGORIES.PROHIBITED_ITEMS,
    description: 'Possession of obscene or pornographic material',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  
  // Privacy Violation
  {
    id: 'unauthorized-recording',
    label: 'Unauthorized Recording',
    category: INCIDENT_CATEGORIES.PRIVACY,
    description: 'Video or recording others without permission',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  
  // Escalation
  {
    id: 'repeated-misconduct',
    label: 'Repeated Misconduct',
    category: INCIDENT_CATEGORIES.BEHAVIORAL,
    description: 'Repeated Level 1 or 2 violations',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },

  // Driver Operational Incidents
  {
    id: 'driver-late-arrival',
    label: 'Late Arrival',
    category: INCIDENT_CATEGORIES.DRIVER_OPERATIONAL,
    description: 'Driver arrived late to location or pick-up',
    defaultSeverity: 'Low',
    applicableTo: 'driver',
  },
  {
    id: 'driver-route-deviation',
    label: 'Route Deviation',
    category: INCIDENT_CATEGORIES.DRIVER_OPERATIONAL,
    description: 'Driver deviated from assigned route',
    defaultSeverity: 'Medium',
    applicableTo: 'driver',
  },
  {
    id: 'driver-missed-stop',
    label: 'Missed Stop',
    category: INCIDENT_CATEGORIES.DRIVER_OPERATIONAL,
    description: 'Driver missed scheduled stop',
    defaultSeverity: 'Medium',
    applicableTo: 'driver',
  },
  {
    id: 'driver-policy-violation',
    label: 'Policy Violation',
    category: INCIDENT_CATEGORIES.DRIVER_OPERATIONAL,
    description: 'Driver violated company or safety policy',
    defaultSeverity: 'Medium',
    applicableTo: 'driver',
  },
  {
    id: 'driver-communication-issue',
    label: 'Communication Issue',
    category: INCIDENT_CATEGORIES.DRIVER_OPERATIONAL,
    description: 'Failure to properly communicate important information',
    defaultSeverity: 'Low',
    applicableTo: 'driver',
  },

  // Driver Safety Incidents
  {
    id: 'driver-unsafe-driving',
    label: 'Unsafe Driving',
    category: INCIDENT_CATEGORIES.DRIVER_SAFETY,
    description: 'Unsafe driving behavior or traffic violation',
    defaultSeverity: 'High',
    applicableTo: 'driver',
  },
  {
    id: 'driver-distracted-driving',
    label: 'Distracted Driving',
    category: INCIDENT_CATEGORIES.DRIVER_SAFETY,
    description: 'Driver distracted while operating vehicle',
    defaultSeverity: 'High',
    applicableTo: 'driver',
  },
  {
    id: 'driver-equipment-violation',
    label: 'Equipment Safety Violation',
    category: INCIDENT_CATEGORIES.DRIVER_SAFETY,
    description: 'Operating vehicle with safety equipment issues',
    defaultSeverity: 'High',
    applicableTo: 'driver',
  },
  {
    id: 'driver-loading-safety',
    label: 'Loading/Unloading Safety Issue',
    category: INCIDENT_CATEGORIES.DRIVER_SAFETY,
    description: 'Safety protocol not followed during loading/unloading',
    defaultSeverity: 'Medium',
    applicableTo: 'driver',
  },

  // Vehicle Incidents
  {
    id: 'vehicle-accident',
    label: 'Vehicle Accident',
    category: INCIDENT_CATEGORIES.VEHICLE,
    description: 'Traffic accident involving the vehicle',
    defaultSeverity: 'High',
    applicableTo: 'driver',
  },
  {
    id: 'vehicle-bumping',
    label: 'Vehicle Bumping/Light Contact',
    category: INCIDENT_CATEGORIES.VEHICLE,
    description: 'Light contact with object or vehicle (e.g., pole, curb, another vehicle)',
    defaultSeverity: 'Medium',
    applicableTo: 'driver',
  },
  {
    id: 'vehicle-collision-object',
    label: 'Collision with Object',
    category: INCIDENT_CATEGORIES.VEHICLE,
    description: 'Vehicle made contact with stationary object',
    defaultSeverity: 'Medium',
    applicableTo: 'driver',
  },
  {
    id: 'vehicle-collision-vehicle',
    label: 'Collision with Vehicle',
    category: INCIDENT_CATEGORIES.VEHICLE,
    description: 'Vehicle made contact with another vehicle',
    defaultSeverity: 'High',
    applicableTo: 'driver',
  },
  {
    id: 'vehicle-backing-incident',
    label: 'Backing Incident',
    category: INCIDENT_CATEGORIES.VEHICLE,
    description: 'Incident occurred while backing vehicle',
    defaultSeverity: 'Medium',
    applicableTo: 'driver',
  },
  {
    id: 'vehicle-mirror-strike',
    label: 'Mirror Strike',
    category: INCIDENT_CATEGORIES.VEHICLE,
    description: 'Vehicle mirror made contact with object',
    defaultSeverity: 'Low',
    applicableTo: 'driver',
  },
  {
    id: 'vehicle-property-damage',
    label: 'Property Damage',
    category: INCIDENT_CATEGORIES.VEHICLE,
    description: 'Vehicle caused damage to property (mailbox, fence, etc.)',
    defaultSeverity: 'Medium',
    applicableTo: 'driver',
  },
  {
    id: 'vehicle-mechanical-failure',
    label: 'Mechanical Failure',
    category: INCIDENT_CATEGORIES.VEHICLE,
    description: 'Vehicle experienced mechanical failure while in service',
    defaultSeverity: 'Medium',
    applicableTo: 'driver',
  },
  {
    id: 'vehicle-breakdown',
    label: 'Vehicle Breakdown',
    category: INCIDENT_CATEGORIES.VEHICLE,
    description: 'Vehicle broke down and could not complete route',
    defaultSeverity: 'High',
    applicableTo: 'driver',
  },
];

// Helper function to get incident types by category
export const getIncidentTypesByCategory = (category: string) => {
  return INCIDENT_TYPES.filter(type => type.category === category);
};

// Helper function to get all categories
export const getAllCategories = () => {
  return Object.values(INCIDENT_CATEGORIES);
};

// Helper function to get categories for a specific incident category (student or driver)
export const getCategoriesForIncidentCategory = (incidentCategory: 'student' | 'driver') => {
  const applicableTypes = INCIDENT_TYPES.filter(
    type => type.applicableTo === incidentCategory || type.applicableTo === 'both'
  );
  const categories = Array.from(new Set(applicableTypes.map(type => type.category)));
  return categories;
};

// Helper function to get incident types for a specific incident category
export const getIncidentTypesForCategory = (incidentCategory: 'student' | 'driver') => {
  return INCIDENT_TYPES.filter(
    type => type.applicableTo === incidentCategory || type.applicableTo === 'both'
  );
};