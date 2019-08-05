import { Component, OnInit } from '@angular/core';
import { ObservableLike, Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { RecommendationsService } from '../recommendations.service';

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

constructor(private breakpointObserver: BreakpointObserver,private router:Router,private route1:ActivatedRoute,private recommendationService:RecommendationsService) {}

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
   this.router.navigateByUrl('');
 }

}


