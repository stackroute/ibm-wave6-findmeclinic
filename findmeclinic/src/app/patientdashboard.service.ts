import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from './Patient';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class PatientdashboardService {

  emailId: string;
  doctor = new Doctor();
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  getAllAppointments(emailId: string) {
    return this.http.get("http://13.234.236.221:8080/api/v1/patient-appointments/" + emailId, this.httpOptions);
  }

  getPatientDetails(emailId: string) {

    return this.http.get("http://13.234.236.221:8080/api/v1/patients/" + emailId, this.httpOptions);
  }

  getDoctorDetails(emailId: string) {

    return this.http.get("http://13.234.236.221:8082/api/v1/doctor-by-email/" + emailId, this.httpOptions);
  }

  updatePatientDetails(patient: Patient) {
    patient.role = "patient";
    return this.http.put<Patient>("http://13.234.236.221:8080/api/v1/patient", patient, this.httpOptions);
  }
}