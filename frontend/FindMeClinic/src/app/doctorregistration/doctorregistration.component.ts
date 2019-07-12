import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../doctor';
import { DoctorregistrationService } from '../doctorregistration.service';


@Component({
  selector: 'app-doctorregistration',
  templateUrl: './doctorregistration.component.html',
  styleUrls: ['./doctorregistration.component.css']
})
export class DoctorregistrationComponent implements OnInit {

  firstFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  doctor = new Doctor();
  address: any = {}
  hide: true;


  constructor(private _formBuilder: FormBuilder,
    private doctors: DoctorregistrationService
  ) { }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      NameCtrl: ['', Validators.required],
      GenderCtrl: ['', Validators.required],
      MedicalLicenseCtrl: ['', Validators.required],
      PracticeStartedDateCtrl: ['', Validators.required],
      EmailCtrl: ['', Validators.required],
      PasswordCtrl: ['', Validators.required],
      ProfilePhotoCtrl: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      ClinicNameCtrl: ['', Validators.required],
      StateCtrl: ['', Validators.required],
      CityCtrl: ['', Validators.required],
      FlatNoCtrl: ['', Validators.required],
      AreaCtrl: ['', Validators.required],
      PincodeCtrl: ['', Validators.required]
    });
  }

  saveDoctor() {
    this.doctor.name = this.firstFormGroup.controls.NameCtrl.value;
    this.doctor.gender = this.firstFormGroup.controls.GenderCtrl.value;
    this.doctor.emailId = this.firstFormGroup.controls.EmailCtrl.value;
    this.doctor.practiceStartedDate = this.firstFormGroup.controls.PracticeStartedDateCtrl.value;
    this.doctor.medicalLicense = this.firstFormGroup.controls.MedicalLicenseCtrl.value;
    this.doctor.password = this.firstFormGroup.controls.PasswordCtrl.value;
    this.doctor.profileImage = this.firstFormGroup.controls.ProfilePhotoCtrl.value;

  }

  onValChange(something) {
    this.doctor.specialization = something;
  }

  saveClinic() {

    this.address.state = this.thirdFormGroup.controls.StateCtrl.value;
    this.address.city = this.thirdFormGroup.controls.CityCtrl.value;
    this.address.address = this.thirdFormGroup.controls.FlatNoCtrl.value;
    this.address.area = this.thirdFormGroup.controls.AreaCtrl.value;
    this.address.pinCode = this.thirdFormGroup.controls.PincodeCtrl.value;
    this.doctor.address = this.address;

    return this.doctors.saveDoctor(this.doctor).subscribe(data => {
      console.log(data);
    });
  }

}




