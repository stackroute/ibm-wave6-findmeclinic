import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Doctor } from '../doctor';
import { DoctorregistrationService } from '../doctorregistration.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
 selector: 'app-doctorregistration',
 templateUrl: './doctorregistration.component.html',
 styleUrls: ['./doctorregistration.component.css']
})
export class DoctorregistrationComponent implements OnInit {

  minDate = new Date(1990, 0, 1);
  maxDate = new Date(2019, 6, 31);

  selectedVideo: any;
  currentFileUpload: any;
  mediaName: any;
  [x: string]: any;
  cardSpecializaion='';

  myControl = new FormControl();
  options: string[] = ['Dermatologist', 'Dietician', 'ENT Specialist','Homoeopath','Physiotherapist','Psychiatrist'];
  filteredOptions: Observable<string[]>;

  control = new FormControl();
  streets: string[] = ['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu','Telangana','Andhra Pradesh','Uttar Pradesh','Madhya Pradesh'];
  filteredStreets: Observable<string[]>;

  namePattern = "[a-zA-Z\\s]*$";
 emailPattern =   "[a-z0-9._%+-]{1,40}[@]{1}[a-z]{1,10}[.]{1}[a-z]{3}";
 passwordPattern = "[a-zA-Z0-9$#@]*$";
 qualificationPattern = "[a-zA-Z,\\s]*$";
 medicalLicensePattern = "[a-zA-Z0-9\\s]*$";
specializationPattern = "[a-zA-Z\\s]*$";


clinicNamePattern = "[a-zA-Z\\s]*$";
mobilePattern = "[0-9]{10}";
statePattern = "[a-zA-Z\\s]*$";
cityPattern = "[a-zA-Z\\s]*$";
flatNoPattern = "[a-zA-Z0-9,/-\\s]*$";
areaPattern = "[a-zA-Z\\s]*$";
 pincodePattern= "[0-9]{6}";




 firstFormGroup: FormGroup;
 secondFormGroup:FormGroup;
 thirdFormGroup: FormGroup;
 doctor = new Doctor();
 address: any = {}
 hide= true;



   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
   .pipe(
     map(result => result.matches)
   );
   route: ActivatedRoute;




 constructor(private _formBuilder: FormBuilder,
   private doctors: DoctorregistrationService,
   private breakpointObserver: BreakpointObserver,
   private router:Router
 ) { }

goToLogin(){
 this.router.navigate(['openLogin'],{relativeTo:this.route});
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}


private _filter1(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.streets.filter(street => street.toLowerCase().includes(filterValue));
}



 ngOnInit() {

  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );

  this.filteredStreets = this.control.valueChanges.pipe(
    startWith(''),
    map(value => this._filter1(value))
  );


   this.firstFormGroup = this._formBuilder.group({
     NameCtrl: ['', Validators.pattern(this.namePattern)],
     GenderCtrl: ['', Validators.required],
     QualificationCtrl: ['', Validators.pattern(this.qualificationPattern)],
     MedicalLicenseCtrl: ['', Validators.pattern(this.medicalLicensePattern)],
     PracticeStartedDateCtrl: ['', Validators.required],
     EmailCtrl: ['',Validators.pattern(this.emailPattern)],
     PasswordCtrl: ['', Validators.pattern(this.passwordPattern)],
     ProfilePhotoCtrl: ['', Validators.required],
   });

   this.secondFormGroup = this._formBuilder.group({
    SpecializationCtrl: ['',Validators.pattern(this.specializationPattern)]

    });


   this.thirdFormGroup = this._formBuilder.group({
     ClinicNameCtrl: ['', Validators.pattern(this.clinicNamePattern)],
     MobileCtrl:['', Validators.pattern(this.mobilePattern)],
     StateCtrl: ['', Validators.pattern(this.statePattern)],
     CityCtrl: ['', Validators.pattern(this.cityPattern)],
     FlatNoCtrl: ['', Validators.pattern(this.flatNoPattern)],
     AreaCtrl: ['', Validators.pattern(this.areaPattern)],
     PincodeCtrl: ['',Validators.pattern(this.pincodePattern)],
     ClinicPhotoCtrl:['',Validators.required]
   });
 }



 saveDoctor() {
   this.doctor.name = this.firstFormGroup.controls.NameCtrl.value;
   this.doctor.gender = this.firstFormGroup.controls.GenderCtrl.value;
   this.doctor.emailId = this.firstFormGroup.controls.EmailCtrl.value;
   this.doctor.practiceStartedDate = this.firstFormGroup.controls.PracticeStartedDateCtrl.value;
   this.doctor.qualification = this.firstFormGroup.controls.QualificationCtrl.value;
   this.doctor.medicalLicense = this.firstFormGroup.controls.MedicalLicenseCtrl.value;
   this.doctor.password = this.firstFormGroup.controls.PasswordCtrl.value;
  //  this.doctor.profileImage = this.firstFormGroup.controls.ProfilePhotoCtrl.value;
  this.doctor.profileImage = this.mediaName;

 }

onValChange(something) {
   this.cardSpecializaion=something;
 }

saveSpecialization()
{
  if(this.secondFormGroup.controls.SpecializationCtrl.value===undefined){
    this.doctor.specialization=this.cardSpecializaion;
    console.log(this.doctor.specialization);
  }
  else
  {
    this.doctor.specialization=this.secondFormGroup.controls.SpecializationCtrl.value;
  console.log(this.doctor.specialization);
  }
}


 saveClinic() {
   this.doctor.clinicName=this.thirdFormGroup.controls.ClinicNameCtrl.value;
   this.address.state = this.thirdFormGroup.controls.StateCtrl.value;
  //  this.address.mobile = this.thirdFormGroup.controls.MobileCtrl.value;
  this.doctor.phone = this.thirdFormGroup.controls.MobileCtrl.value;
   this.address.city = this.thirdFormGroup.controls.CityCtrl.value;
   this.address.flatNo = this.thirdFormGroup.controls.FlatNoCtrl.value;
   this.address.area = this.thirdFormGroup.controls.AreaCtrl.value;
   this.address.pinCode = this.thirdFormGroup.controls.PincodeCtrl.value;
   this.doctor.clinicImage = this.mediaName;
   this.doctor.address = this.address;
   console.log(this.doctor.phone);
   console.log(this.doctor.address);
   return this.doctors.saveDoctor(this.doctor).subscribe(data => {
     console.log(data);
   });
 }
 
 selectVideo(event){
  this.selectedVideo=event.target.files;
  this.currentFileUpload = this.selectedVideo.item(0)
  this.mediaName=this.currentFileUpload.name;
  console.log(this.mediaName);
 }
 
}