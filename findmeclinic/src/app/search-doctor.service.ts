import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDoctorService {
  location: any;

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  filteredDoctors: any = new Subject();
  byAreaDoctors: any = new Subject();

  getAllDoctors() {
    return this.http.get('http://13.234.236.221:8082/api/v1/doctors', this.httpOptions);
  }

  getAllDoctorsBySpecialization(specialization: string) {

    this.http.get('http://13.234.236.221:8082/api/v1/doctor/' + specialization).subscribe(data => {
      this.filteredDoctors.next(data)
    });

  }

  getAllDoctorsBySpecializationAndArea(specialization: string) {
    let y = sessionStorage.getItem('key');
    this.http.get('http://13.234.236.221:8082/api/v1/doctor/' + y + '/' + specialization, this.httpOptions).subscribe(data => {
      this.byAreaDoctors.next(data);
    });
  }

  getAllDoctorsByArea(area) {

    return this.http.get('http://13.234.236.221:8082/api/v1/doctors/' + area, this.httpOptions);
  }

}
