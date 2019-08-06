import { Component, OnInit } from '@angular/core';
import { ObservableLike, Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { RecommendationsService } from '../recommendations.service';
import { SchedulerService } from '../scheduler.service';
import { PatientdashboardService } from '../patientdashboard.service';

@Component({
 selector: 'app-patientdashboard',
 templateUrl: './patientdashboard.component.html',
 styleUrls: ['./patientdashboard.component.css']
})
export class PatientdashboardComponent implements OnInit {

 isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
 .pipe(
   map(result => result.matches)
 );
 route: ActivatedRoute;
  topDoctors: Object;
  slotData:any;
  slotData1:any;

constructor(private breakpointObserver: BreakpointObserver,private router:Router,private route1:ActivatedRoute,private recommendationService:RecommendationsService,private schedulerService:SchedulerService,private myprofile:PatientdashboardService) {}

ngOnInit() {
  const email= this.route1.snapshot.paramMap.get('username');
  this.recommendationService.getTopDoctorsForPatient(email).subscribe(data=>{
    console.log(data);
    this.topDoctors=data;
  });

  this.recommendationService.getTopClinicsForPatient(email).subscribe(data=>{
    console.log(data);
  });

 }
 patientAppointments(){
   this.router.navigate(['myAppointments'],{relativeTo:this.route});
 }
 patientProfile(){
  const email= this.route1.snapshot.paramMap.get('username');
  console.log(email);
  this.router.navigate(['patientProfile/'+email],{relativeTo:this.route});
 }

 logout(){
   sessionStorage.removeItem('username');
   this.router.navigateByUrl('landingpage');
 }
 routingto(emailId:string)
{
  

  this.schedulerService.getSlots(emailId).subscribe(data=>{
    this.slotData=JSON.stringify(data);
    this.slotData1=JSON.parse(this.slotData);
    console.log(this.slotData1);
  });
  this.myprofile.getDoctorDetails(emailId).subscribe(data =>{
    var response=JSON.stringify(data);
    var response1=JSON.parse(response);  

  let navigationExtras: NavigationExtras = {
    queryParams: {
        "name": response1.name,
        "clinicName": response1.clinicName,
        "emailId":response1.emailId,
        "address":response1.address.flatNo,
        "area":response1.address.area,
        "city":response1.address.city,
        "specialization":response1.specialization,
        "todaym":this.slotData1.slots.todaym,
        "todaya":this.slotData1.slots.todaya,
        "todaye":this.slotData1.slots.todaye,
        "tomorrowm":this.slotData1.slots.tomorrowm,
        "tomorrowa":this.slotData1.slots.tomorrowa,
        "tomorrowe":this.slotData1.slots.tomorrowe,
        "overmorrowm":this.slotData1.slots.overmorrowm,
        "overmorrowa":this.slotData1.slots.overmorrowa,
        "overmorrowe":this.slotData1.slots.overmorrowe
      
    },   
   
};
console.log(navigationExtras);

this.router.navigate(['/appointmentSlot'],navigationExtras);  
  }
    );  
  

}

}


