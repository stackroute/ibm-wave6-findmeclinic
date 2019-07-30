import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookAppointment } from './bookappointment';
import { Patient } from './Patient';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  patient:Patient;
  constructor(private http:HttpClient) { }
  httpOptions={
    headers:new HttpHeaders({
      'Content-type':'application/json'
    })
  }
    checkPatient(emailId:String)
    {
      return this.http.get<Patient>("http://localhost:8080/api/v1/patients/"+emailId,this.httpOptions);
    }


    saveAppointment(bookAppointment:BookAppointment){
      
      return this.http.post<BookAppointment>("http://localhost:8084/api/v1/appointment",bookAppointment,this.httpOptions);
    }
}
