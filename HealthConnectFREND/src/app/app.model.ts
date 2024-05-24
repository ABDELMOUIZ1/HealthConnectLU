export enum Title {
  MR = "MR",
  MRS = "MRS",
  MISS = "MISS",
  MS = "MS"
}

export enum Specialization {
  Dentist = "Dentist",
  Chirurgien = "Chirurgien",
  Midwife = "Midwife",
  Nurse = "Nurse",
  Psychologue = "Psychologue",
  Allergy_and_Immunology = "Allergy_and_Immunology",
  Anesthesiology = "Anesthesiology",
  Dermatology = "Dermatology",
  Diagnostic_Radiology = "Diagnostic_Radiology",
  Emergency_Medicine = "Emergency_Medicine",
  Family_Medicine = "Family_Medicine",
  Internal_Medicine = "Internal_Medicine",
  Medical_Genetics = "Medical_Genetics",
  Neurology = "Neurology",
  Nuclear_Medicine = "Nuclear_Medicine",
  Obstetrics_and_Gynecology = "Obstetrics_and_Gynecology",
  Ophthalmology = "Ophthalmology",
  Pathology = "Pathology",
  Pediatrics = "Pediatrics",
  Physical_Medicine_and_Rehabilitation = "Physical_Medicine_and_Rehabilitation",
  Preventive_Medicine = "Preventive_Medicine",
  Psychiatry = "Psychiatry",
  Radiation_Oncology = "Radiation_Oncology",
  Surgery = "Surgery",
  Urology = "Urology"
}

export interface DoctorDTO {
  doctorId?: number;
  doctorFirstName?: string;
  doctorLastName?: string;
  title?: Title;
  doctorContact?: string;
  doctorEmail?: string;
  currentCity?: string;
  officeAddress?: string;
  specialization?: Specialization;
  startTimeOfWork?: string;
  endTimeOfWork?: string;
}

export interface DoctorSearchDTO {
  doctorFirstName?: string;
  doctorLastName?: string;
  currentCity?: string;
  officeAddress?: string;
  specialization?: Specialization;
}
export interface Doctor {
  doctorId?: number;
  doctorFirstName?: string;
  doctorLastName?: string;
  age?: number;
  title?: 'MR' | 'MRS' ;
  cityOfBirth?: string;
  address?: string;
  currentCity?: string;
  doctorEmail?: string;
  doctorPassword?: string;
  doctorContact?: string;
  officeAddress?: string;
  specialization?: 'Allergy_and_Immunology' | 'Anesthesiology' | 'Dermatology' | 'Diagnostic_Radiology' | 'Emergency_Medicine' | 'Family_Medicine' | 'Internal_Medicine' | 'Medical_Genetics' | 'Neurology' | 'Nuclear_Medicine' | 'Obstetrics_and_Gynecology' | 'Ophthalmology' | 'Pathology' | 'Pediatrics' | 'Physical_Medicine_and_Rehabilitation' | 'Preventive_Medicine' | 'Psychiatry' | 'Radiation_Oncology' | 'Surgery' | 'Urology';
  startTimeOfWork?: string;
  endTimeOfWork?: string;
  newPassword?: string;

}
export interface Patient {
  patientId?: number;
  patientFirstName?: string;
  patientLastName?: string;
  age?: number;
  title?: 'MR' | 'MISS' ;
  cityOfBirth?: string;
  address?: string;
  currentCity?: string;
  patientEmail?: string;
  patientPassword?: string;
  patientContact?: string;
  newPassword?: string;

}
export interface CreateAppointmentDTO {
  startTime: string; // Use string to simplify time handling in Angular
  availableSlotDTO: AvailableSlotDTO;
  statusAppointment: StatusAppointment;
  patientId: number;
  doctorId: number;
  dateOnly: string; // Use string to simplify date handling in Angular
}
export interface AvailableSlotDTO {
  startTime: string;
  endTime: string;
}
export enum StatusAppointment {
  PENDING = 'PENDING',
  CONFIRMED = 'DONE',
  CANCELLED = 'CANCELED'
}
