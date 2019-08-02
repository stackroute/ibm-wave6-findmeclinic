import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  getTopDoctors(city:String){
    return this.http.get("http://13.234.236.221:8088/rest/neo4j/doctorsByCity/"+city, this.httpOptions);
  }
  getTopClinics(city:String){
    return this.http.get("http://13.234.236.221:8088/rest/neo4j/clinicsByCity/"+city, this.httpOptions);
  }
  getTopDoctorsForPatient(emailId:String){
      return this.http.get("http://13.234.236.221:8088/rest/neo4j/doctorsForPatient/"+emailId, this.httpOptions);
  }

   getTopClinicsForPatient(emailId:String){
        return this.http.get("http://13.234.236.221:8088/rest/neo4j/clinicsForPatient/"+emailId, this.httpOptions);
    }

  }
