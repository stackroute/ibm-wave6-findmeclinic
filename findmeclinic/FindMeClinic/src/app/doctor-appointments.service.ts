import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorAppointmentsService {
  constructor(private http: HttpClient) {  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      
    })
  };
  getAllAppointments(emailId:string){
    return this.http.get("http://13.234.236.221:8082/api/v1/doctors2/"+emailId,this.httpOptions);
  }




  }

