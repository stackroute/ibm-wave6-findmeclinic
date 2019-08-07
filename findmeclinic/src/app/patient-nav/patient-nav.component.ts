import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-nav',
  templateUrl: './patient-nav.component.html',
  styleUrls: ['./patient-nav.component.css']
})
export class PatientNavComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  logout(){
    sessionStorage.removeItem('username');
    this.router.navigateByUrl('landingpage');
  }
}
