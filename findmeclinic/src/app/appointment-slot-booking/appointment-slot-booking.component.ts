import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Doctor } from '../doctor';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Scheduler } from '../scheduler';
import { SchedulerService } from '../scheduler.service';


@Component({
  selector: 'app-appointment-slot-booking',
  templateUrl: './appointment-slot-booking.component.html',
  styleUrls: ['./appointment-slot-booking.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppointmentSlotBookingComponent implements OnInit {

  name: string;
  clinicName: string;
  emailId: string;
  address: string;
  area: string;
  date: Date;
  slot: string;
  day: string;
  city:string;
  todaym: number;
  todaya: number;
  todaye: number;
  tomorrowm: number;
  tomorrowa: number;
  tomorrowe: number;
  overmorrowm: number;
  overmorrowa: number;
  overmorrowe: number;
  status1 = "false"; status2 = "false"; status3 = "false";
  status4 = "false"; status5 = "false"; status6 = "false";
  status7 = "false"; status8 = "false"; status9 = "false";
  key:string;
  value:number;

 


  constructor(private route: ActivatedRoute, private route1: Router, private schedulerService: SchedulerService) {
    this.route.queryParams.subscribe(params => {
      this.name = params["name"];
      this.clinicName = params["clinicName"];
      this.emailId = params["emailId"];
      this.address = params["address"];
      this.area = params["area"];
      this.city=params["city"];
      this.todaym = params["todaym"];
      this.todaya = params["todaya"];
      this.todaye = params["todaye"];
      this.tomorrowm = params["tomorrowm"];
      this.tomorrowa = params["tomorrowa"];
      this.tomorrowe = params["tomorrowe"];
      this.overmorrowm = params["overmorrowm"];
      this.overmorrowa = params["overmorrowa"];
      this.overmorrowe = params["overmorrowe"];

    });
  }

  ngOnInit() {

    if (this.todaym == 12) {
      this.status1 = "true";

    }

    if (this.todaya == 12) {
      this.status2 = "true";
    }

    if (this.todaye == 12) {
      this.status3 = "true";
    }

    if (this.tomorrowm == 12) {
      this.status4 = "true";
    }

    if (this.tomorrowa == 12) {
      this.status5 = "true";
    }

    if (this.tomorrowe == 12) {
      this.status6 = "true";
    }

    if (this.overmorrowm == 12) {
      this.status7 = "true";
    }
    if (this.overmorrowa == 12) {
      this.status8 = "true";
    }
    if (this.overmorrowe == 12) {
      this.status9 = "true";
    }

  }

  clickMe1(day: string, slot: string) {
    this.slot = slot;
    this.todaym =++ this.todaym;
    this.key="todaym";
    this.value=this.todaym;




  }
  clickMe2(day: string, slot: string) {
    this.slot = slot;
    this.todaya = ++this.todaya ;
    this.key="todaya";
    this.value=this.todaya;

  }
  clickMe3(day: string, slot: string) {

    this.slot = slot;
    this.todaye = ++this.todaye ;
    this.key="todaye";
    this.value=this.todaye;

  }
  clickMe4(day: string, slot: string) {
   
    this.slot = slot;
    this.tomorrowm =++ this.tomorrowm;
    this.key="tomorrowm";
    this.value=this.tomorrowm;

  }
  clickMe5(day: string, slot: string) {

    this.slot = slot;
    this.tomorrowa = ++this.tomorrowa ;
    this.key="tomorrowa";
    this.value=this.tomorrowa;

  }
  clickMe6(day: string, slot: string) {

    this.slot = slot;
    this.tomorrowe =++ this.tomorrowe ;
    this.key="tomorrowe";
    this.value=this.tomorrowe;

  }
  clickMe7(day: string, slot: string) {
    this.slot = slot;
    this.overmorrowm = ++this.overmorrowm ;
    this.key="overmorrowm";
    this.value=this.overmorrowm;

  }
  clickMe8(day: string, slot: string) {
    this.slot = slot;
    this.overmorrowa = ++this.overmorrowa;
    this.key="overmorrowa";
    this.value=this.overmorrowa;

  }
  clickMe9(day: string, slot: string) {
    this.slot = slot;
    this.overmorrowe = ++this.overmorrowe ;
    this.key="overmorrowe";
    this.value=this.overmorrowe;

  }

  routingto() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "name": this.name,
        "clinicName": this.clinicName,
        "emailId": this.emailId,
        "address": this.address,
        "area": this.area,
        "city":this.city,
        "slot": this.slot,
        "key":this.key,
        "appointmentId":this.value,
        
      },
     
    };

    this.schedulerService.putSlots(this.emailId,this.key,this.value).subscribe(data1 => {
    });


    this.route1.navigate(['/confirmBooking'], navigationExtras);
  }
  searchDoctor(){
    this.route1.navigateByUrl('/searchDoctor');
  }

}

