import { Patient } from './Patient';
import { Doctor } from './doctor';

export class BookAppointment {
    
    id:String;
    patient:Patient;
    doctor:Doctor;
    appointmentDate:Date;
    slot:String;
    appointmentId:number;
    key:String;
    appointmentTime:string;
}