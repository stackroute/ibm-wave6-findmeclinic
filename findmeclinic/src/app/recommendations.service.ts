import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  getTopDoctors(city: string) {
    return this.http.get("http://13.234.236.221:8088/rest/neo4j/doctors-by-bity/" + city, this.httpOptions);
  }
  getTopClinics(city: string) {
    return this.http.get("http://13.234.236.221:8088/rest/neo4j/clinics-by-city/" + city, this.httpOptions);
  }
  getTopDoctorsForPatient(emailId: string) {
    return this.http.get("http://13.234.236.221:8088/rest/neo4j/doctors-for-patient/" + emailId, this.httpOptions);
  }

  getTopClinicsForPatient(emailId: string) {
    return this.http.get("http://13.234.236.221:8088/rest/neo4j/clinics-for-patient/" + emailId, this.httpOptions);
  }

}
