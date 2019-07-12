import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientdashboardService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

getAllAppointments() {
  return this.http.get('http://localhost:3000/patientAppointmentDetails', this.httpOptions);
}
getAllPatientDetails() {
  return this.http.get('http://localhost:3000/patientProfile', this.httpOptions);
}
}