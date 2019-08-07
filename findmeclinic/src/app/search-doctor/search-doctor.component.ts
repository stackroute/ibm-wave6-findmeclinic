import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { SearchDoctorService} from '../search-doctor.service';
import { SharedService } from '../shared.service';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Doctor } from '../doctor';
import { PatientdashboardService } from '../patientdashboard.service';
import { SchedulerService } from '../scheduler.service';
import { Overlay } from '@angular/cdk/overlay';


@Component({
 selector: 'app-search-doctor',
 templateUrl: './search-doctor.component.html',
 styleUrls: ['./search-doctor.component.css']
})

export class SearchDoctorComponent implements OnInit {
 
 
  title = 'MyDoctors';
 doctors = [];
 special:any;
 x:any;
  doctor =new Doctor();
  address: any = {};
  slotData:any;
   slotData1:any;

 constructor(private doctorservice: SearchDoctorService,
             private share:SharedService,
             public dialog: MatDialog,
             private router:Router,
             private route: ActivatedRoute,
             private myprofile:PatientdashboardService,
             private schedulerService:SchedulerService,
             private overlay:Overlay
             ) {

 }

 ngOnInit() {
   const dialogRef = this.dialog.open(MyDialogComponent, {
     width: '650px',
     height: '300px',
     scrollStrategy: this.overlay.scrollStrategies.noop()
   });
 
  const location=this.route.snapshot.queryParams;
   console.log(this.route.snapshot.queryParams);

console.log('area ',location.area);


    this.doctorservice.getAllDoctorsByArea(location.area).subscribe((data:any) => {
      if(location.area!==undefined || location.area!==null){
      this.doctors  =  data;
      sessionStorage.setItem('key', location.area);
  }
}
  )


this.doctorservice.byAreaDoctors.subscribe((data:any)=> {
      this.doctors = data;  
    }
   )
}


passDetails(details) {
         this.share.send(details);
         this.router.navigateByUrl("/doctorView");
}
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