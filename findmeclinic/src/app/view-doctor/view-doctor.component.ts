import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { SearchDoctorService } from '../search-doctor.service';
import { SharedService } from '../shared.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { SchedulerService } from '../scheduler.service';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DoctordashboardComponent } from '../doctordashboard/doctordashboard.component';
import { PatientdashboardService } from '../patientdashboard.service';

@Component({
 selector: 'app-view-doctor',
 templateUrl: './view-doctor.component.html',
 styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {
 title = 'MyDoctors';
 doctor : any = null;
 slotData:any;
 slotData1:any;
 constructor(private share: SharedService,
   private doctorservice: SearchDoctorService,private schedulerService:SchedulerService,private router:Router,private myprofile:PatientdashboardService) {

 }


 ngOnInit() {
   this.share.doctorDetail$.subscribe(data => {
     this.doctor = data;


   })
 }
getExp = function(str) {
 var today = new Date();
 var startDate = new Date(str);
 var exp = today.getFullYear() - startDate.getFullYear();
 var m = today.getMonth() - startDate.getMonth();
 if(exp==0){
   return m+" months";
 }
 else
   return exp+" years";
};

routingto(emailId:string)
{
  
  console.log(emailId);
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
this.router.navigate(['/appointmentSlot'],navigationExtras);  
  }
    );  
  
}


back()
{
  this.router.navigate(['/searchView'],
  {
    queryParams: { area: sessionStorage.getItem('key') }
  })
}


}
