import { Component, OnInit ,Input} from '@angular/core';
import { Patient } from '../Patient';

import { PatientRegistrationService } from '../patient-registration.service';

@Component({
 selector: 'app-patientregistration',
 templateUrl: './patient-registration.component.html',
 styleUrls: ['./patient-registration.component.css']
})
export class PatientregistrationComponent implements OnInit {

  @Input() public parent;

 patient:Patient=new Patient();
 constructor(private registration:PatientRegistrationService) { }

 ngOnInit() {
   console.log(this.parent);
 }

 register(patientname,phone,email,date,password)
 {
   this.patient.name=patientname;
   this.patient.phone=phone;
   this.patient.emailId=email;
   this.patient.dateOfBirth=date;
   this.patient.password=password;
   this.patient.role=this.parent;

   console.log(this.patient);

   this.registration.savePatient(this.patient).subscribe(data =>{
    console.log(data);
     }
   );
 }
}