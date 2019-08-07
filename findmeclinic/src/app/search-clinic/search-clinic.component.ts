import { Component, OnInit } from '@angular/core';
import { SearchDoctorService } from '../search-doctor.service';
import { SharedService } from '../shared.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Doctor } from '../doctor';
import { PatientdashboardService } from '../patientdashboard.service';
import { SchedulerService } from '../scheduler.service';
import { Overlay } from '@angular/cdk/overlay';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-search-clinic',
  templateUrl: './search-clinic.component.html',
  styleUrls: ['./search-clinic.component.css']
})
export class SearchClinicComponent implements OnInit {

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
   
   const location=this.route.snapshot.queryParams;

 

     this.doctorservice.getAllDoctorsByArea(location.area).subscribe((data:any) => {
       if(location.area!==undefined || location.area!==null){
       let listOfClinic = []
       let duplicates = []
       this.doctors = data.map((e, i, arr) => {
         e.listOfDoctors = []
         if (listOfClinic.indexOf(e.clinicName) === -1) {
            listOfClinic.push(e.clinicName)
             e.listOfDoctors.push({name: e.name, specialization: e.specialization, profileImage: e.profileImage,
              qualification: e.qualification, emailId: e.emailId 
            })
            return e
         }else {
           duplicates.push(e)
         }
       });
       
       this.doctors = this.doctors.filter(e => e !== undefined)
       this.doctors = this.doctors.map((e, i) => {
         duplicates.map((j, k) => {
           if(e.clinicName ===  j.clinicName) {
             
              e.listOfDoctors.push({name: j.name, specialization: j.specialization, profileImage: j.profileImage,
                qualification: j.qualification, emailId: j.emailId 
              })
              
            }
          })
          // console.log(e)
          return e
       })
       console.log(this.doctors, "this is the list of doctors !!!!")
    
      
      
      
       //  let listOfAllDoctorsEmail = [];
      //  listOfAllDoctorsEmail = data.map(e => e.clinicName);
      //  console.log(listOfAllDoctorsEmail)
      //  let removeDuplicateEntries = []
      //  listOfAllDoctorsEmail = listOfAllDoctorsEmail.filter((e , i) => listOfAllDoctorsEmail.indexOf(e) === i)
      //  this.doctor = this.doctor.map(e => {
      //    if(e.clinicName === )
      //  })
   }
   sessionStorage.setItem('key', location.area);
  
 }
   )
 
 
 this.doctorservice.byAreaDoctors.subscribe((data:any)=> {
       this.doctors = data;  
     }
    )
 }
 
 
 passDetails(details) {
          this.share.send(details);
          this.router.navigateByUrl("/clinicView");
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
