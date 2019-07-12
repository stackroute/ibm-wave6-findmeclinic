import { Component, OnInit } from '@angular/core';
import { PatientdashboardService } from '../patientdashboard.service';

@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.css']
})
export class PatientprofileComponent implements OnInit {

  patientData:any;
  constructor(private myProfile:PatientdashboardService) { }

  ngOnInit() {
    this.myProfile.getAllPatientDetails().subscribe((data: any) => {
      console.log(this)
      this.patientData = data
    });

    console.log(this)

  }
}
