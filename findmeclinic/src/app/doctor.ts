import { Address } from './address';
import { DoctorAppointment } from './doctorappointment';

export class Doctor {
  name: string;
  role: string;
  gender: string;
  medicalLicense: string;
  profileImage: string;
  practiceStartedDate: string
  emailId: string;
  password: string;
  qualification: string
  specialization: string;
  clinicName: string;
  address: Address;
  phone: string;
  doctorAppointment: DoctorAppointment;
  clinicImage: string;


}