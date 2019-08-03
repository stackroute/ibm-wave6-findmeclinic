import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
providedIn: 'root'
})
export class DoctorprofileService {
saveDoctor(doctor: import("./doctor").Doctor) {
  throw new Error("Method not implemented.");
}
constructor(private http: HttpClient) { }
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

getDoctorDetails(emailId:string){
  return this.http.get("http://13.234.236.221:8082/api/v1/doctor-by-email/"+emailId,this.httpOptions);
 }
//  updatePatientDetails(doctor:Doctor){
//   doctor.role="doctor";
//   return this.http.put<Doctor>("http://13.234.236.221:8080/api/v1/patient",patient,this.httpOptions);
//  }
}