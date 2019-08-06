import { Component, OnInit } from '@angular/core';
import { OnChanges, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/doctor';
import { DoctorprofileService } from 'src/app/DoctorprofileService';
@Component({
 selector: 'app-doctorprofile',
 templateUrl: './doctorprofile.component.html',
 styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {
 title = 'MyDoctors';
 doctor: any = null;
 doctorData = new Doctor();
 address: any = {};
 pronoun: string;
 self:string;
 preposition: string;
 constructor(private share: DoctorprofileService, private router: Router,
             private doctorProfile: DoctorprofileService, private route1: ActivatedRoute) {
 }
 ngOnInit() {
   this.doctorPro();
 }
 doctorPro() {
   const emailId = this.route1.snapshot.paramMap.get('email');
   this.doctorProfile.getDoctorDetails(emailId).subscribe((data: any) => {
     console.log(data);
     this.doctorData.name = data.name;
     this.doctorData.emailId = data.emailId;
     this.doctorData.gender = data.gender;
     this.doctorData.qualification=data.qualification;
     this.doctorData.phone=data.phone;
     this.doctorData.profileImage=data.profileImage;
     this.doctorData.medicalLicense = data.medicalLicense;
     this.doctorData.practiceStartedDate = data.practiceStartedDate.substring(0, 10);
     this.doctorData.specialization = data.specialization;
     this.doctorData.clinicName = data.clinicName;
     console.log(data.clinicName);
     this.address.state = data.address.state;
     this.address.city = data.address.city;
     this.address.flatNo = data.address.flatNo;
     this.address.area = data.address.area;
     this.address.pinCode = data.address.pinCode;
     this.doctorData.address = this.address;

     if(data.gender==='male' || data.gender==='Male'){
        this.pronoun="He";
        this.self="himself"
     }
     else{
       this.pronoun="She";
       this.self="herself"
     }

  if(data.specialization==='opthalmologist' || data.specialization=='orthopedic' || data.specialization=='Opthalmologist' || data.specialization=='Orthopedic'){
    this.preposition="an";
  }
  else{
    this.preposition="a";
  }
    
   });
 }
 editDoctorProfile() {
   const name = this.doctorData.name;
   const gender = this.doctorData.gender;
   const emailId = this.doctorData.emailId;
   const medicalLicense = this.doctorData.medicalLicense;
   const specialization = this.doctorData.specialization;
   const practiceStartedDate = this.doctorData.practiceStartedDate;
   const address = this.doctorData.address;
   const clinicName = this.doctorData.clinicName;
   const profileImage = this.doctorData.profileImage;
   const state =this.address.state;
   const city= this.address.city;
   const pincode=this.address.pinCode;
   this.doctorData.address = this.address;
   this.router.navigateByUrl('/editDoctor/' + name + '/' + emailId + '/' + specialization + '/' + gender);
 }
}