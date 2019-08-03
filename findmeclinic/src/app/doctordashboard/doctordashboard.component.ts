import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorprofileService } from '../DoctorprofileService';
import { Doctor } from '../doctor';
import { DoctorAppointmentsService } from '../doctor-appointments.service';
@Component({
 selector: 'app-doctordashboard',
 templateUrl: './doctordashboard.component.html',
 styleUrls: ['./doctordashboard.component.css']
})
export class DoctordashboardComponent implements OnInit {
 isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
 .pipe(
   map(result => result.matches)
 );
 route: ActivatedRoute;
 doctor: any = null;
 doctorData = new Doctor();
 address: any = {};
 pronoun: string;
 self:string;
 preposition: string;
 today: Date = new Date();
 previousAppointmentData: any;
 upcomingAppointmentData: any;
constructor(private breakpointObserver: BreakpointObserver,private router:Router,private route1:ActivatedRoute,
 private doctorProfile: DoctorprofileService,private appointments:DoctorAppointmentsService) {}
// openTimings(){
//  this.router.navigate(['openTimings'],{relativeTo:this.route});
// }
// openProfile(){
//    const email= this.route1.snapshot.paramMap.get('username');
//    console.log(email);
//    this.router.navigate(['openProfile/'+email],{relativeTo:this.route});
// }
// openAppointments(){
//  this.router.navigate(['openAppointments'],{relativeTo:this.route});
// }
ngOnInit()
{
  this.doctorPro();
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
doctorPro() {
  const emailId = sessionStorage.getItem('username');
  console.log("profile " + emailId);
  this.doctorProfile.getDoctorDetails(emailId).subscribe((data: any) => {
    console.log(data);
    this.doctorData.name = data.name;
    this.doctorData.emailId = data.emailId;
    this.doctorData.gender = data.gender;
    this.doctorData.qualification=data.qualification;
    this.doctorData.phone=data.phone;
    this.doctorData.profileImage=data.profileImage;
    this.doctorData.medicalLicense = data.medicalLicense;
    this.doctorData.practiceStartedDate = data.practiceStartedDate.substring(0, 10);
    this.doctorData.specialization = data.specialization;
    this.doctorData.clinicName = data.clinicName;
    console.log(data.clinicName);
    this.address.state = data.address.state;
    this.address.city = data.address.city;
    this.address.flatNo = data.address.flatNo;
    this.address.area = data.address.area;
    this.address.pinCode = data.address.pinCode;
    this.doctorData.address = this.address;

    if(data.gender==='male' || data.gender==='Male'){
       this.pronoun="He";
       this.self="himself"
    }
    else{
      this.pronoun="She";
      this.self="herself"
    }

 if(data.specialization==='opthalmologist' || data.specialization=='orthopedic' || data.specialization=='Opthalmologist' || data.specialization=='Orthopedic'){
   this.preposition="an";
 }
 else{
   this.preposition="a";
 }
    // console.log(this.doctorData);
  });
}
editDoctorProfile() {
  const name = this.doctorData.name;
  const gender = this.doctorData.gender;
  const emailId = this.doctorData.emailId;
  const medicalLicense = this.doctorData.medicalLicense;
  const specialization = this.doctorData.specialization;
  const practiceStartedDate = this.doctorData.practiceStartedDate;
  const address = this.doctorData.address;
  const clinicName = this.doctorData.clinicName;
  const profileImage = this.doctorData.profileImage;
  const state =this.address.state;
  const city= this.address.city;
  //this.address.area = data.address.area;
  const pincode=this.address.pinCode;
  this.doctorData.address = this.address;
  // console.log(this.doctorData);
  this.router.navigateByUrl('/editDoctor/' + name + '/' + emailId + '/' + specialization + '/' + gender);
}
}