export interface Drug {
  id: string;
  category: string; // Category (Rack No.)
  drugName: string; // Composition / Generic name
  productName: string; // Brand Name
  quantity: number;
  batch: string;
  expiryDate: string;
  purchaseRate: number;
  saleRate: number;
}

export interface User {
  email: string;
  name: string;
  specialization: string;
}

export interface PrescriptionVitals {
  bp?: string;
  pulse?: string;
  temp?: string;
  weight?: string;
  spo2?: string;
}

export interface PrescriptionMedication {
  drugId: string;
  drugName: string; // Composition / Generic name
  productName: string; // Brand Name
  category: string;
  dosage: string; // e.g. "1 Tablet", "5ml"
  frequency: string; // e.g. "1-0-1", "OD", "BD", "TDS"
  duration: string; // e.g. "5 days"
  timing: 'Before Food' | 'After Food' | 'With Food' | 'As Needed';
  instructions?: string;
}

export interface Prescription {
  id: string;
  patientName: string;
  patientAge: string; // supports e.g. "45" or "8 months"
  patientGender: 'Male' | 'Female' | 'Other';
  patientMobile: string;
  symptoms: string;
  diagnosis: string;
  vitals: PrescriptionVitals;
  medications: PrescriptionMedication[];
  advice?: string;
  followUpDate?: string;
  date: string; // ISO date string
  doctorEmail: string;
  doctorName: string;
  isEdited?: boolean;
  lastEditedDate?: string;
  originalDate?: string;
}
