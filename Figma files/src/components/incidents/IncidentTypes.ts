// Incident Type Categories and Definitions for Student Transportation

export const INCIDENT_CATEGORIES = {
  BEHAVIORAL: 'Behavioral',
  SAFETY: 'Safety',
  AGGRESSION: 'Aggression / Violence',
  DRIVER: 'Driver',
  PROPERTY: 'Property',
  PROHIBITED: 'Prohibited',
} as const;

export interface IncidentType {
  id: string;
  label: string;
  category: string;
  description: string;
  defaultSeverity: 'Low' | 'Medium' | 'High' | 'Critical';
  applicableTo: 'student' | 'driver' | 'both';
}

export const INCIDENT_TYPES: IncidentType[] = [
  {
    id: 'disruptive-behavior',
    label: 'Disruptive Behavior',
    category: INCIDENT_CATEGORIES.BEHAVIORAL,
    description: 'Offensive language, excessive noise, inappropriate affection, unauthorized device usage, or unauthorized recording',
    defaultSeverity: 'Low',
    applicableTo: 'student',
  },
  {
    id: 'harassment-bullying',
    label: 'Harassment / Bullying',
    category: INCIDENT_CATEGORIES.BEHAVIORAL,
    description: 'Verbal harassment, taunting, bullying, or unwanted physical contact toward another student',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'repeated-misconduct',
    label: 'Repeated Misconduct',
    category: INCIDENT_CATEGORIES.BEHAVIORAL,
    description: 'Pattern of repeated violations requiring escalation beyond a single incident',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'safety-violation',
    label: 'Safety Violation',
    category: INCIDENT_CATEGORIES.SAFETY,
    description: 'Seat or seatbelt refusal, unsafe movement, window misuse, emergency exit misuse, wrong stop exit, or eating/drinking on the bus',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'physical-altercation',
    label: 'Physical Altercation',
    category: INCIDENT_CATEGORIES.AGGRESSION,
    description: 'Fighting, physical assault, or throwing objects causing or risking injury',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'threatening-behavior',
    label: 'Threatening Behavior',
    category: INCIDENT_CATEGORIES.AGGRESSION,
    description: 'Verbal or physical threats directed toward another student or any person on the bus',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'driver-non-compliance',
    label: 'Driver Non-Compliance',
    category: INCIDENT_CATEGORIES.DRIVER,
    description: 'Refusing driver directives, verbal abuse, harassment, or threatening behavior directed at the driver',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'property-damage',
    label: 'Property Damage',
    category: INCIDENT_CATEGORIES.PROPERTY,
    description: 'Vandalism or damage to the bus, equipment, or personal belongings requiring restitution',
    defaultSeverity: 'Medium',
    applicableTo: 'student',
  },
  {
    id: 'prohibited-items',
    label: 'Prohibited Items',
    category: INCIDENT_CATEGORIES.PROHIBITED,
    description: 'Tobacco, vaping, illegal substances, harmful objects, or inappropriate materials brought onto the bus',
    defaultSeverity: 'High',
    applicableTo: 'student',
  },
  {
    id: 'weapon-possession',
    label: 'Weapon Possession',
    category: INCIDENT_CATEGORIES.PROHIBITED,
    description: 'Possession of a weapon or weapon-like object on the bus',
    defaultSeverity: 'Critical',
    applicableTo: 'student',
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
