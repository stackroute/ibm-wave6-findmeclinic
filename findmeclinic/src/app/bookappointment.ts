import { Patient } from './Patient';
import { Doctor } from './doctor';

export class BookAppointment {

    id: string;
    patient: Patient;
    doctor: Doctor;
    appointmentDate: Date;
    slot: string;
    appointmentId: number;
    key: string;
    appointmentTime: string;
}