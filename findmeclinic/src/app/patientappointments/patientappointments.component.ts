import { Component, OnInit } from '@angular/core';
import { PatientdashboardService } from '../patientdashboard.service';
import { ActivatedRoute } from '@angular/router';
import { RecommendationsService } from '../recommendations.service';

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
  patientRecommendationData: Object;
 constructor(private appointments:PatientdashboardService,private route1:ActivatedRoute,private recommendationService:RecommendationsService) { }

 ngOnInit() {

  const email= this.route1.snapshot.paramMap.get('username');
  this.recommendationService.getTopDoctorsForPatient(email).subscribe(data=>{
    this.patientRecommendationData=data;
  });

  
  this.appointments.getAllAppointments(sessionStorage.getItem('username')).subscribe((data:any)=>
  {
    
    this.previousAppointmentData = data;
    let previousRecordsData = this.previousAppointmentData.filter(data1 => new Date(data1.appointmentDate) < this.today);
    Object.keys(previousRecordsData).forEach(key => {
      previousRecordsData[key].appointmentDate=(previousRecordsData[key].appointmentDate+"").substring(0,10);
    
    })
    this.previousAppointmentData=previousRecordsData;


    this.upcomingAppointmentData = data;
    let upcomingRecordsData = this.upcomingAppointmentData.filter(data1 => new Date(data1.appointmentDate) > this.today);
    Object.keys(upcomingRecordsData).forEach(key => {
      upcomingRecordsData[key].appointmentDate=(upcomingRecordsData[key].appointmentDate+"").substring(0,10);
    
    
    })

    this.upcomingAppointmentData=upcomingRecordsData;
  });
    

 }
}
