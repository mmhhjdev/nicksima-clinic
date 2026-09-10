export interface Doctor {
  id: string;
  name: string;
  title: string;
  role: string;
  medicalCode: string;
  schedule: string;
  bio: string;
  specialties: string[];
  featuredServices: string[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  doctorId: string;
  doctorName: string;
  category: 'hair' | 'rejuvenation' | 'injection' | 'skin_disease' | 'laser';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  duration: string;
  sessions: string;
  recoveryTime: string;
  popular?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Consultation {
  id: string;
  patient_name: string;
  phone: string;
  doctor_name: string;
  service_type: string;
  status: 'pending' | 'called' | 'completed';
  notes?: string;
  created_at: string;
}
