import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Patient } from '../Patient';
import { PatientRegistrationService } from '../patient-registration.service';

@Component({
  selector: 'app-registartion-dialog',
  templateUrl: './registartion-dialog.component.html',
  styleUrls: ['./registartion-dialog.component.css']
})
export class RegistartionDialogComponent implements OnInit {

  name:string;
  patient:Patient=new Patient();
  constructor(public dialogRef1: MatDialogRef<RegistartionDialogComponent>,private registration:PatientRegistrationService,private dialog:MatDialog)
  {
    
  }
  ngOnInit() {
    this.name=sessionStorage.getItem('name');
  }

  confirm(password:string)
  {
    this.patient.name=sessionStorage.getItem('patientName');
    this.patient.dateOfBirth=sessionStorage.getItem('dateOfBirth');
    this.patient.gender=sessionStorage.getItem('gender');
    this.patient.phone=sessionStorage.getItem('mobile');
    this.patient.emailId=sessionStorage.getItem('email');
    this.patient.password=password;

    this.registration.savePatient(this.patient).subscribe(data=>{
       sessionStorage.setItem('username',this.patient.emailId);
       const dialogRef = this.dialog.closeAll();



    });



    
    

  }

}
