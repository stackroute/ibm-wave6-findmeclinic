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
  getTopDoctors(area:String){
    return this.http.get("http://13.234.236.221:8088/rest/neo4j/doctorsByArea/"+area, this.httpOptions);
  }
  getTopClinics(area:String){
    return this.http.get("http://13.234.236.221:8088/rest/neo4j/clinicsByArea/"+area, this.httpOptions);
  }
  }
