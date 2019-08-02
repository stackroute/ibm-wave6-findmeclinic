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
 

  public dialogRef: any;
 route1: ActivatedRoute;
 public places: any[];
 public places1: any[];
 public city: any;
 selectedArea: string = '';
 options: string[];
 myControl = new FormControl();
 filteredOptions: Observable<string[]>;
 public location = '';
 topDoctors: any;
 topClinics: any[];
 //event handler for the select element's change event
 constructor(private dialog: MatDialog, public popupService: PopupService, private myprofile: PatientdashboardService,
   private route: ActivatedRoute, private router: Router, private schedulerService: SchedulerService, private recommendatioService: RecommendationsService) {
 }
 ngOnInit() {
   this.dialogRef = this.dialog.open(PopupComponent, {
     width: '650px',
    //  height: '250px',
     disableClose: true,
   });
   this.start();
   // this.next();
 }
 private _filter(value: string): string[] {
   const filterValue = value.toLowerCase();
   var areas = JSON.parse(sessionStorage.getItem('area'));
   return areas.filter(option => option.toLowerCase().includes(filterValue)
   );
 }
 start() {
   this.dialogRef.afterClosed().subscribe(result => {
     this.city = this.popupService.city;
     this.getTopDoctors();
     this.getTopClinics();
     sessionStorage.setItem('area', JSON.stringify(this.popupService.places));
     this.options = this.popupService.places;
     this.filteredOptions = this.myControl.valueChanges.pipe(
       startWith(''),
       map(value => this._filter(value))
     );
   });
 }
 openTabbedPane() {
   this.router.navigateByUrl("/login");
 }
 routeto() {
   this.router.navigate(['popup'], { relativeTo: this.route1 });
 }
 doctorDetails() {
   this.router.navigate(['/searchView'],
     {
       queryParams: { area: this.selectedArea }
     })
 }
 selectChangeHandler(event: any) {
   //update the ui
   this.selectedArea = event.target.value;
 }
 search() {
   this.selectedArea = this.location;
 }
 getTopDoctors() {
   this.recommendatioService.getTopDoctors(this.city).subscribe(data => {
    //  this.topDoctors = JSON.parse(JSON.stringify(data));
    this.topDoctors=data;
     console.log("recommended docs-->" + this.topDoctors);
   })
 }
 getTopClinics() {
   this.recommendatioService.getTopClinics(this.city).subscribe(data => {
     this.topClinics = JSON.parse(JSON.stringify(data));
     console.log("recommended clinics-->"+this.topClinics);
   })
 }
}

