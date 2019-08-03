import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SchedulerService } from '../scheduler.service';
import { Route, Router } from '@angular/router';

export interface DialogData {
  
}
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  appointmentId:string;
  appointmentId1:number;
  key:string;
  appointmentTime:string;
  appointmentDate:Date;
  morning:string[];
  afternoon:string[];
  evening:string[];
  appointmentDate1:string;
  emailId:string;
  patientName:string;
  doctorName:string;
  specialization:string;
  city:string;
  area:string;
  clinicName:string;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,private router:Router,private dialog:MatDialog)
  {
    
  }
 

  ngOnInit() {
    this.city=sessionStorage.getItem('city');
    console.log(this.city);
    this.area=sessionStorage.getItem('area');
    this.clinicName=sessionStorage.getItem('clinicName');
    this.specialization=sessionStorage.getItem('specialization');
    this.doctorName=sessionStorage.getItem('doctorName');
    this.patientName=  sessionStorage.getItem('patientName');
    this.emailId=sessionStorage.getItem('username');
   this.confirm();
   

}

confirm()
{
  this.morning=["10.00 AM","10.15 AM","10.30 AM","10.45 AM","11.00 AM","11.15 AM","11.30 AM","11.45 AM","12.00 AM","12.15 AM","12.30 AM","12.45 AM"];
  this.afternoon=["2.00 PM","2.15 PM","2.30 PM","2.45 PM","3.00 PM","3.15 PM","3.30 PM","3.45 PM","4.00 PM","4.15 PM","4.30 PM","4.45 PM"];
  this.evening=["6.00 PM","6.15 PM","6.30 PM","6.45 PM","7.00 PM","7.15 PM","7.30 PM","7.45 PM","8.00 PM","8.15 PM","8.30 PM","8.45 PM"];
  this.appointmentId=sessionStorage.getItem('appointmentid');
  console.log(this.appointmentId);
  this.key=sessionStorage.getItem('key');
  this.appointmentId1=+this.appointmentId;
  if(this.key=="todaya"||this.key=="todaym"||this.key=="todaye")
  {
     this.appointmentDate=new Date();
     this.appointmentDate1=this.appointmentDate+"";
     this.appointmentDate1=this.appointmentDate1.substring(4,16);
     if(this.key=="todaym")
     {
         
         this.appointmentTime=this.morning[--this.appointmentId1];
     }
     else if(this.key=="todaya")
     {
      this.appointmentTime=this.afternoon[--this.appointmentId1];
     }
     else 
    {
      this.appointmentTime=this.evening[--this.appointmentId1];
    }


  }
  if(this.key=="tomorrowa"||this.key=="tomorrowe"||this.key=="tomorrowm")
  {
     this.appointmentDate=new Date();
     this.appointmentDate.setDate(this.appointmentDate.getDate() + 1);
     this.appointmentDate1=this.appointmentDate+"";
     this.appointmentDate1=this.appointmentDate1.substring(4,16);
     if(this.key=="tomorrowm")
     {
         
         this.appointmentTime=this.morning[--this.appointmentId1];
     }
     else if(this.key=="tomorrowa")
     {
      this.appointmentTime=this.afternoon[--this.appointmentId1];
     }
     else 
    {
      this.appointmentTime=this.evening[--this.appointmentId1];
    }
  }
  if(this.key=="overmorrowm"||this.key=="overmorrowa"||this.key=="overmorrowe")
  {
     this.appointmentDate=new Date();
     this.appointmentDate.setDate(this.appointmentDate.getDate() + 2);
     this.appointmentDate1=this.appointmentDate+"";
     this.appointmentDate1=this.appointmentDate1.substring(4,16);
     if(this.key=="overmorrowm")
     {
         
         this.appointmentTime=this.morning[--this.appointmentId1];
     }
     else if(this.key=="overmorrowa")
     {
      this.appointmentTime=this.afternoon[--this.appointmentId1];
     }
     else 
    {
      this.appointmentTime=this.evening[--this.appointmentId1];
    }



  }
  console.log(this.appointmentTime);
  console.log(this.morning);
  console.log(this.afternoon);
  console.log(this.evening);


}
clear()
{
  sessionStorage.removeItem('emailId');
  sessionStorage.removeItem('clinicName');
  sessionStorage.removeItem('area');
  sessionStorage.removeItem('city');
  sessionStorage.removeItem('specialization');
  sessionStorage.removeItem('doctorName');
  sessionStorage.removeItem('patientName');
  sessionStorage.removeItem('dateOfBirth');
  sessionStorage.removeItem('gender');
  sessionStorage.removeItem('mobile');
  sessionStorage.removeItem('email');
  const dialogRef = this.dialog.closeAll();
  this.router.navigateByUrl('/patientdashboard/'+this.emailId);
  
}
}
