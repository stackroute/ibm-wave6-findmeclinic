import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchDoctorService {

  constructor(private http: HttpClient) {  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'user-key': 'db933142c91d582345976098a6d7b451'
    })
  };
 
  getAllDoctors() {
     return this.http.get('http://127.0.0.1:8082/api/v1/doctors', this.httpOptions);
  }
  getAllDoctorsBySpecialization(specialization:string) {
    return this.http.get('http://127.0.0.1:8082/api/v1/doctors'+specialization, this.httpOptions);
 }
 

}



