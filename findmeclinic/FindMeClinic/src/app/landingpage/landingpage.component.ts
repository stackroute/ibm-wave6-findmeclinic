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

   //event handler for the select element's change event
  
  constructor(private dialog:MatDialog, public popupService: PopupService, private myprofile:PatientdashboardService,
    private route: ActivatedRoute,private router:Router,private schedulerService:SchedulerService) {
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
  console.log(areas,"filter areas");
  console.log(this.options);
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
        console.log(this.options,"options");
        this.filteredOptions=this.myControl.valueChanges.pipe(
          startWith(''),
          map(value=>this._filter(value))
        );
       });
      //  console.log(this.options,"hi")
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
    console.log("selected"+this.selectedArea);
  }
 search(){
   console.log(this.location)
   this.selectedArea=this.location;
   console.log("selected location is ",this.selectedArea);
 }
}

