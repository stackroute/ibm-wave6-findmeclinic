import { BrowserModule } from '@angular/platform-browser';
import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from './core/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { PopupComponent } from './popup/popup.component';
import { TabbedPaneForRegComponent } from './tabbed-pane-for-reg/tabbed-pane-for-reg.component';
import { PatientregistrationComponent } from './patient-registration/patient-registration.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { PatientappointmentsComponent } from './patientappointments/patientappointments.component';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import {  MatSidenavModule, MatListModule } from '@angular/material';
import { from } from 'rxjs';
import { DoctorregistrationComponent } from './doctorregistration/doctorregistration.component';
import { FormsModule,ReactiveFormsModule, PatternValidator } from '@angular/forms';
import { SearchDoctorComponent } from './search-doctor/search-doctor.component';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

const dashboardRoutes: Routes = [
  {path:'',component:LandingpageComponent},
  {path:'myAppointments',component:PatientappointmentsComponent},
  {path:'patientProfile',component:PatientprofileComponent},
  
  {path:'login',component:LoginComponent},
  {path:'tabbedViewForRegistration',component:TabbedPaneForRegComponent},
  {path:'patientregistration',component:PatientregistrationComponent},
  {path:'patientdashboard',component:PatientdashboardComponent},
  {path:'doctorregistration',component:DoctorregistrationComponent},
  {path:'searchView',component:SearchDoctorComponent},
  { path: 'doctorView', component: ViewDoctorComponent  }
  
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    LandingpageComponent,
    PopupComponent,
    TabbedPaneForRegComponent,
    PatientregistrationComponent,
    PatientdashboardComponent,
    PatientappointmentsComponent,
    PatientprofileComponent,
    DoctorregistrationComponent,
    SearchDoctorComponent,
    ViewDoctorComponent,
    MyDialogComponent,
   
  
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    AppRoutingModule,
    MatSidenavModule, MatListModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(dashboardRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  
  

    
  ],
  entryComponents: [
    MyDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
