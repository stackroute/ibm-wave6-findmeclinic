import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material';
import { PopupService } from '../../app/popup.service';
import { ActivatedRoute, Router ,NavigationExtras} from '@angular/router';
import { Doctor } from '../doctor';
import { Address } from '../address';
import { PatientdashboardService } from '../patientdashboard.service';
import { SchedulerService } from '../scheduler.service';
import { SearchDoctorComponent } from '../search-doctor/search-doctor.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RecommendationsService } from '../recommendations.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
 

  public dialogRef:any;
 route1:ActivatedRoute;
  public places :any [];
  public places1:any[];
  public city1:any;
  public city:any;
  selectedArea: string = '';
  options: string[];
 myControl=new FormControl();
 filteredOptions: Observable<string[]>;
 public location='';
 topDoctors:any;
 topClinics:any;
  //event handler for the select element's change event
 constructor(private dialog:MatDialog, public popupService: PopupService, private myprofile:PatientdashboardService,
   private route: ActivatedRoute,private router:Router,private schedulerService:SchedulerService,private recommendatioService:RecommendationsService) {
     }
 ngOnInit() {
   this.dialogRef = this.dialog.open(PopupComponent, {
     width: '750px',
     height: '320px',
      disableClose: true,
     });
  this.start();
 // this.next();
}
private  _filter(value:string): string[] {
 const filterValue=value.toLowerCase();
 var areas=JSON.parse(sessionStorage.getItem('area'));
 return areas.filter(option => option.toLowerCase().includes(filterValue)
 );
}
start()
{
     this.dialogRef.afterClosed().subscribe(result =>{
       this.city=this.popupService.city;
       // console.log("cities",this.city);
       // sessionStorage.setItem('city',this.popupService.city);
       sessionStorage.setItem('area',JSON.stringify(this.popupService.places));
       // console.log(JSON.parse(sessionStorage.getItem('area')),"sesionstorage");
       // this.places = this.popupService.places;
       // console.log("checking ",this.places, this.popupService.check);
       this.options=this.popupService.places;
       this.filteredOptions=this.myControl.valueChanges.pipe(
         startWith(''),
         map(value=>this._filter(value))
       );
      });
   }
 // next()
 // {
 //   console.log(sessionStorage.getItem('city'));
 //       console.log(sessionStorage.getItem('places'));
 //   // console.log("HII "+this.popupService.places);
 //   this.city1=sessionStorage.getItem('city');
 //   this.places1=JSON.parse(sessionStorage.getItem('places'));
 // }
   openTabbedPane(){
     this.router.navigateByUrl("/login");
   }
   routeto()
   {
     this.router.navigate(['popup'],{relativeTo:this.route1});
   }
   doctorDetails()
   {
     // console.log("place is here");
     // console.log(place);
   //  if(place=='null' || place=='undefined' || place==''){
   //   this.displayData.getAllDoctors();
   //  }
   //  else
   // this.displayData.getAllDoctorsByArea(place);
   this.router.navigate(['/searchView'],
   {queryParams: {area:this.selectedArea}
   })
 }
 selectChangeHandler (event: any ) {
   //update the ui
   this.selectedArea = event.target.value;
 }
search(){
  this.selectedArea=this.location;
  this.getTopDoctors();
  this.getTopClinics();
}
getTopDoctors(){
  this.recommendatioService.getTopDoctors(this.selectedArea).subscribe(data=>{
    this.topDoctors=JSON.stringify(data);
    console.log("recommended docs-->"+this.topDoctors);
  })
}
getTopClinics(){
  this.recommendatioService.getTopClinics(this.selectedArea).subscribe(data=>{
    this.topClinics=JSON.stringify(data);
    console.log("recommended clinics-->"+this.topClinics);
  })
}
public hyderabad() {
  
  this.places =["Madinaguda","Miyapur", "Gachibowli","Ameerpet","SR Nagar","L.B Nagar","Kukatpalli"];
  this.popupService.places = this.places;
  // this.popupService.places1=this.places;
  this.popupService.city="Hyderabad";
  // this.popupService.city1="Hyderabad";
  const dialogRef = this.dialog.closeAll();
  this.popupService.check =false;
}
public bangalore() {
  this.places =["HSR Layout","Koramangala","Hebbal","Marathahalli","Jayanagar"];
  this.popupService.places = this.places;
  this.popupService.city="Bangalore";
  const dialogRef = this.dialog.closeAll();
  this.popupService.check =false;
}
public delhi() {
  this.places =["Ashok Nagar","Chattarpur","Civil Lines","Janakpuri"];
  this.popupService.places = this.places;
  this.popupService.city="New Delhi";
  const dialogRef = this.dialog.closeAll();
  this.popupService.check =false;
}
public mumbai() {
  this.places =["Bhandup","Ghatkopar","Borivali","Colaba","Kurla","Govandi"];
  this.popupService.places = this.places;
  this.popupService.city="Mumbai";
  const dialogRef = this.dialog.closeAll();
  this.popupService.check =false;
}
public vijayawada() {
  this.places =["Benz circle","Ashok Nagar","Auto Nagar","Bandar Road","Poranki","RTC Colony"];
  this.popupService.places = this.places;
  this.popupService.city="Vijayawada";
  const dialogRef = this.dialog.closeAll();
  this.popupService.check =false;
}
public chennai() {
  this.places =["Park town","perambur","Tharamani","K.K.Nagar","Chennai"];
  this.popupService.places = this.places;
  this.popupService.city="Chennai";
  const dialogRef = this.dialog.closeAll();
  this.popupService.check =false;
}
}

