import { Component, OnInit } from '@angular/core';
import { PatientdashboardService } from '../patientdashboard.service';

@Component({
  selector: 'app-patientappointments',
  templateUrl: './patientappointments.component.html',
  styleUrls: ['./patientappointments.component.css']
})
export class PatientappointmentsComponent implements OnInit {

  morning:string[];
  afternoon:string[];
  evening:string[];
  myAppointmentData: any;
 
 today: Date = new Date();
 myAppointmentData1: any;
 previousAppointmentData: any;
 upcomingAppointmentData: any;
 upcomingRecordsData: any;
 appointmentDate:string;
 appointmentDate1:string;
 data1:any;
 constructor(private appointments:PatientdashboardService) { }

 ngOnInit() {

  
  this.appointments.getAllAppointments(sessionStorage.getItem('username')).subscribe((data:any)=>
  {
    // Object.keys(data).forEach(key => {

    //   this.myAppointmentData = data[key];
    //   if(this.myAppointmentData.appointmentDate<this.today)
    //   {
    
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
