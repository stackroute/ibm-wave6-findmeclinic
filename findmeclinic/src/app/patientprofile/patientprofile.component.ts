import { Component, OnInit } from '@angular/core';
import { PatientdashboardService } from '../patientdashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../Patient';




@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.css']
})
export class PatientprofileComponent implements OnInit {


  let1: any;
  month: string;
  day: string;
  days: string;



  morning: string[];
  afternoon: string[];
  evening: string[];
  myAppointmentData: any;
 
 today: Date = new Date();
 myAppointmentData1: any;
 previousAppointmentData: any;
 upcomingAppointmentData: any;
 upcomingRecordsData: any;
 appointmentDate: string;
 appointmentDate1: string;
 data1: any;
 emailId1:string;




  patientData = new Patient();
  emailId: string;
  constructor(private myProfile: PatientdashboardService, private appointments: PatientdashboardService, private router: Router, private route1: ActivatedRoute) { }
 
  ngOnInit() {
      

    this.emailId1=sessionStorage.getItem('username');
    this.appointments.getAllAppointments(this.emailId1).subscribe((data: any) =>
    {
      
      
      this.previousAppointmentData = data;
      console.log(this.previousAppointmentData);
      let previousRecordsData = this.previousAppointmentData.filter(data1 => new Date(data1.appointmentDate) < this.today);
      Object.keys(previousRecordsData).forEach(key => {
        previousRecordsData[key].appointmentDate = (previousRecordsData[key].appointmentDate + '').substring(0, 10);
        console.log(previousRecordsData[key].appointmentDate);
      
      })
      this.previousAppointmentData = previousRecordsData;
  
  
      this.upcomingAppointmentData = data;
      let upcomingRecordsData = this.upcomingAppointmentData.filter(data1 => new Date(data1.appointmentDate) > this.today);
      Object.keys(upcomingRecordsData).forEach(key => {
        upcomingRecordsData[key].appointmentDate = (upcomingRecordsData[key].appointmentDate + '').substring(0, 10);
        console.log(upcomingRecordsData[key].appointmentDate);
      
      })
      console.log(upcomingRecordsData);
      this.upcomingAppointmentData = upcomingRecordsData;
    });
      
  
    this.patientPro();
     
   }
 
 patientPro(){

  
  
  // console.log('profile ' + emailId);
   this.myProfile.getPatientDetails(this.emailId1).subscribe((data: any) => {
 
     this.patientData.name = data.name;
     this.patientData.emailId = data.emailId;
     this.patientData.dateOfBirth = data.dateOfBirth.substring(0, 10);
     this.patientData.gender = data.gender;
     this.patientData.phone = data.phone;
  
     if (this.patientData.gender === 'Female' || this.patientData.gender === 'female'){
       this.let1 = 'women.jpg';
} 
else{
  this.let1 = 'boy.jpg';
}



     if ((this.patientData.dateOfBirth).length != 0) {
       this.day = (this.patientData.dateOfBirth).slice(8, 10);
       if ((this.patientData.dateOfBirth.slice(5, 7) == '01')){ this.month = 'January'}
       if ((this.patientData.dateOfBirth.slice(5, 7) == '02')){ this.month = 'Febrauary'}
       if ((this.patientData.dateOfBirth.slice(5, 7) == '03')){ this.month = 'March'}
       if ((this.patientData.dateOfBirth.slice(5, 7) == '04')){ this.month = 'April'}
       if ((this.patientData.dateOfBirth.slice(5, 7) == '05')){ this.month = 'May'}
       if ((this.patientData.dateOfBirth.slice(5, 7) == '06')){ this.month = 'June'}
       if ((this.patientData.dateOfBirth.slice(5, 7) == '07')){ this.month = 'July'}
       if ((this.patientData.dateOfBirth.slice(5, 7) == '08')){ this.month = ' August'}
       if ((this.patientData.dateOfBirth.slice(5, 7) == '09')){ this.month = 'September'}
       if ((this.patientData.dateOfBirth.slice(5, 7) == '10')){ this.month = 'October'}
       if ((this.patientData.dateOfBirth.slice(5, 7) == '11')){ this.month = 'November'}
       if ((this.patientData.dateOfBirth.slice(5, 7) == '12')){ this.month = 'December'}    
        
 }

     
 
   });
 }

    
editPatientProfile(){
 
   const name = this.patientData.name;
   const emailId = this.patientData.emailId;
   const dateOfBirth = this.patientData.dateOfBirth;
   const gender = this.patientData.gender;
   const phone = this.patientData.phone;
   
 
   this.router.navigateByUrl('/editPatient/' + name + '/' + emailId + '/' + dateOfBirth + '/' + gender + '/' + phone);
 }
 recommendations(){
   this.router.navigateByUrl('patientdashboard/'+sessionStorage.getItem('username'));
 }
 
}