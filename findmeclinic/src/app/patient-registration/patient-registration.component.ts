import { Component, OnInit ,Input} from '@angular/core';
import { Patient } from '../Patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientdashboardService } from '../patientdashboard.service';
import { PatientRegistrationService } from '../patient-registration.service';


@Component({
 selector: 'app-patientregistration',
 templateUrl: './patient-registration.component.html',
 styleUrls: ['./patient-registration.component.css']
})
export class PatientregistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  status=false;
  gender="";

//   minDate = new Date(1990, 0, 1);
//  maxDate =  new Date(2019, 7, 31);

 patient:Patient=new Patient();
  patientData: any;
  patientName:string;
    patientDateOfBirth:string;
    patientEmail:string;
    patientPhone:string;
 constructor(private registration:PatientRegistrationService,private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute,
  private patientEditProfile:PatientdashboardService,private router:Router) { }

 ngOnInit() {
  this.patientName=sessionStorage.getItem('patientName');
  this.patientDateOfBirth=sessionStorage.getItem('dateOfBirth');
  this.patientEmail=sessionStorage.getItem('email');
  this.patientPhone=sessionStorage.getItem('mobile');
  this.validation();
 
 
 }
 

 validation()
 {
  this.registerForm = this.formBuilder.group({
    firstName: [this.patientName, Validators.required],
    date: [this.patientDateOfBirth, Validators.required],
    phone: [this.patientPhone,[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    gender: ['', Validators.required],
    email: [this.patientEmail,[Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
    
}, );
 }
 

 register(patientname,phone,email,date,password)
 {
   console.log(this.gender);
   this.patient.name=patientname;
   this.patient.phone=phone;
   this.patient.emailId=email;
   this.patient.dateOfBirth=date;
   this.patient.password=password;
   this.patient.gender=this.gender;

   console.log(this.patient);

 }
get f() { return this.registerForm.controls; }

onSubmit() {
  console.log("Hii");
    this.submitted = true;
    this.findInvalidControls();
 //  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
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
    
    return this.registration.savePatient(this.patient).subscribe(data =>{
     this.router.navigateByUrl('/login');
      }
     );
  }
  else
  {
    return;
  }
}
}
