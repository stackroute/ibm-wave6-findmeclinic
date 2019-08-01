import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {  DoctorAppointmentsService} from '../doctor-appointments.service';
import { PatientdashboardService } from '../patientdashboard.service';
@Component({
 selector: 'app-doctorappointments',
   templateUrl: './doctorappointments.component.html',
   styleUrls: ['./doctorappointments.component.css']

})
export class DoctorappointmentsComponent implements OnInit {

 today: Date = new Date();
 previousAppointmentData: any;
 upcomingAppointmentData: any;
  constructor(private appointments:DoctorAppointmentsService) {

 }

 ngOnInit() {
  this.appointments.getAllAppointments(sessionStorage.getItem('username')).subscribe((data:any)=>
  {
    
    
    this.previousAppointmentData = data;
    console.log(this.previousAppointmentData);
    let previousRecordsData = this.previousAppointmentData.filter(data1 => new Date(data1.appointmentDate) < this.today);
    Object.keys(previousRecordsData).forEach(key => {
      previousRecordsData[key].appointmentDate=(previousRecordsData[key].appointmentDate+"").substring(0,10);
      console.log(previousRecordsData[key].appointmentDate);
    
    })
    this.previousAppointmentData=previousRecordsData;


    this.upcomingAppointmentData = data;
    let upcomingRecordsData = this.upcomingAppointmentData.filter(data1 => new Date(data1.appointmentDate) > this.today);
    Object.keys(upcomingRecordsData).forEach(key => {
      upcomingRecordsData[key].appointmentDate=(upcomingRecordsData[key].appointmentDate+"").substring(0,10);
      console.log(upcomingRecordsData[key].appointmentDate);
    
    })
     console.log(upcomingRecordsData);
    this.upcomingAppointmentData=upcomingRecordsData;
  });
    
 }
}
  