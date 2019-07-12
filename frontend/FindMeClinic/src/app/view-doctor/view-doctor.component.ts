import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { SearchDoctorService } from '../search-doctor.service';
import { SharedService } from '../shared.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {
  title = 'MyDoctors';
  doctor : any = null;
  // myVar: any = null;
  constructor(private share: SharedService,
    private doctorservice: SearchDoctorService) {
  
  }

 
  ngOnInit() {
    this.share.doctorDetail$.subscribe(data => {
      console.log(data, "this is data form the observable!!")
      this.doctor = data;
     
   
    })
  }



}


