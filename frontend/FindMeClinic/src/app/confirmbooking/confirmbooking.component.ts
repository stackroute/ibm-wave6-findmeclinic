import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../Patient';
import { BookAppointment } from '../bookappointment';
import { Doctor } from '../doctor';
import { AppointmentService } from '../appointment.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { SchedulerService } from '../scheduler.service';
import { RegistartionDialogComponent } from '../registartion-dialog/registartion-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-confirmbooking',
  templateUrl: './confirmbooking.component.html',
  styleUrls: ['./confirmbooking.component.css']
})

export class ConfirmbookingComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    name: string;
    clinicName:string;
    emailId:string;
    address1:string;
    area:string;
    // appointmentDate:Date;
    appointmentId:number;
    slot:string;
    id:string;
    doctor=new Doctor();
    address: any = {}
    patient=new Patient();
    key:string;
    morning:string[];
    afternoon:string[];
    evening:string[];
    bookAppointment=new BookAppointment();
    appointmentId1:number;
    patientName:string;
    patientDateOfBirth:string;
    patientEmail:string;
    patientPhone:string;
   

    constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,private appointment:AppointmentService,public dialog: MatDialog,private schedulerService:SchedulerService) {
        this.route.queryParams.subscribe(params => {
            this.name = params["name"];
            this.clinicName = params["clinicName"];
            this.emailId = params["emailId"];
            this.address1 = params["address"];
            this.area = params["area"];
            //this.appointmentDate=params["appointmentDate"];
            this.slot=params["slot"];
            this.appointmentId=params["appointmentId"];
            this.key=params["key"];
        });
          this.id="EBRYS"+Math.floor(Math.random() * 123) + 1
         
     }

    ngOnInit() {
      this.morning=["10.00 AM","10.15 AM","10.30 AM","10.45 AM","11.00 AM","11.15 AM","11.30 AM","11.45 AM","12.00 AM","12.15 AM","12.30 AM","12.45 AM"];
  this.afternoon=["2.00 PM","2.15 PM","2.30 PM","2.45 PM","3.00 PM","3.15 PM","3.30 PM","3.45 PM","4.00 PM","4.15 PM","4.30 PM","4.45 PM"];
  this.evening=["6.00 PM","6.15 PM","6.30 PM","6.45 PM","7.00 PM","7.15 PM","7.30 PM","7.45 PM","8.00 PM","8.15 PM","8.30 PM","8.45 PM"];
  this.patientName=sessionStorage.getItem('patientName');
  this.patientDateOfBirth=sessionStorage.getItem('dateOfBirth');
  this.patientEmail=sessionStorage.getItem('email');
  this.patientPhone=sessionStorage.getItem('mobile');  
  console.log(this.patientName+this.patientDateOfBirth+this.patientEmail+this.patientPhone);   
 this.validation();
       
      
    }
    validation()
    {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        date: ['', Validators.required],
        phone: ['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        gender: ['', Validators.required],
        email: ['',Validators.required, Validators.email],
    });
    }

    register()
    {
       this.patient.name=this.registerForm.controls.firstName.value;
       this.patient.phone=this.registerForm.controls.phone.value;
       this.patient.emailId=this.registerForm.controls.email.value;
       this.patient.dateOfBirth=this.registerForm.controls.date.value;
      console.log(this.patient);
      
       
    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.findInvalidControls();
    }

   
    findInvalidControls() {
        console.log("hii");
        const invalid = [];
        const controls = this.registerForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        console.log(invalid);
        if(invalid.length==0)
        { 
          this.doctor.name=this.name;
          this.doctor.clinicName=this.clinicName;
          this.doctor.emailId=this.emailId;
          this.address.address=this.address1;
          this.address.area=this.area;
          this.doctor.address = this.address;
          this.bookAppointment.doctor=this.doctor;
          this.bookAppointment.slot=this.slot;
          this.bookAppointment.appointmentId=this.appointmentId;
          this.bookAppointment.key=this.key;
          this.bookAppointment.patient=this.patient;
          this.bookAppointment.id=this.id;
          sessionStorage.setItem('appointmentid',this.appointmentId+"");
          sessionStorage.setItem('key',this.key);
          var url=location.href;
          localStorage.setItem('url',url);
          sessionStorage.setItem('patientName',this.patient.name);
          sessionStorage.setItem('dateOfBirth',this.patient.dateOfBirth);
          sessionStorage.setItem('gender',this.patient.gender);
          sessionStorage.setItem('mobile',this.patient.phone);
          sessionStorage.setItem('email',this.patient.emailId);
          

          this.appointment.checkPatient(this.bookAppointment.patient.emailId).subscribe(data=>
          {
            if(this.bookAppointment.patient.emailId==sessionStorage.getItem('username'))
            {
            if(data.emailId==this.bookAppointment.patient.emailId)
            {
              this.appointmentId1=this.bookAppointment.appointmentId;
              
                 if(this.key=="todaym")
                 {
                     
                     this.bookAppointment.appointmentTime=this.morning[--this.appointmentId1];
                 }
                 else if(this.key=="todaya")
                 {
                  this.bookAppointment.appointmentTime=this.afternoon[--this.appointmentId1];
                 }
                 else  if(this.key=="todaye")
                {
                  this.bookAppointment.appointmentTime=this.evening[--this.appointmentId1];
                }
            
               else  if(this.key=="tomorrowm")
                 {
                     
                     this.bookAppointment.appointmentTime=this.morning[--this.appointmentId1];
                 }
                 else if(this.key=="tomorrowa")
                 {
                  this.bookAppointment.appointmentTime=this.afternoon[--this.appointmentId1];
                 }
                 else if(this.key=="tomorrowe")
                {
                  this.bookAppointment.appointmentTime=this.evening[--this.appointmentId1];
                }
            
                 else if(this.key=="overmorrowm")
                 {
                     
                     this.bookAppointment.appointmentTime=this.morning[--this.appointmentId1];
                 }
                 else if(this.key=="overmorrowa")
                 {
                  this.bookAppointment.appointmentTime=this.afternoon[--this.appointmentId1];
                 }
                 else 
                {
                  this.bookAppointment.appointmentTime=this.evening[--this.appointmentId1];
                }
            
          
              this.appointment.saveAppointment(this.bookAppointment).subscribe(data =>{
              console.log(data);
                   }
                 );
                 const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                  width: '350px',
                
                  disableClose: true,
                 
                });
            
                dialogRef.afterClosed().subscribe(result => {
                  console.log('The dialog was closed');
                });
          }
        }
        
        else{
          const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: '350px',
          
            disableClose: true,
           
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
          
        }  
          
        },
        error=>{

          sessionStorage.setItem('name',this.bookAppointment.patient.name);
          const dialogRef = this.dialog.open(RegistartionDialogComponent, {
            width: '350px',
          
            disableClose: true,
           
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });

        }
      );
          
         
      }
    }
  }
