import { BrowserModule } from '@angular/platform-browser';
import { Routes,RouterModule } from '@angular/router';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
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
//import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { PatientappointmentsComponent } from './patientappointments/patientappointments.component';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import {  MatSidenavModule, MatListModule } from '@angular/material';
import { from } from 'rxjs';
import { DoctorregistrationComponent } from './doctorregistration/doctorregistration.component';
import { FormsModule,ReactiveFormsModule, PatternValidator } from '@angular/forms';
import { SearchDoctorComponent } from './search-doctor/search-doctor.component';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarModule } from 'angular-bootstrap-md';
import { DoctordashboardComponent } from './doctordashboard/doctordashboard.component';
import { DoctorappointmentsComponent } from './doctorappointments/doctorappointments.component';
import { DoctortimingsComponent } from './doctortimings/doctortimings.component';

import { MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule  } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { Popup1Component } from './popup1/popup1.component';
import { PatientEditProfileComponent } from './patient-edit-profile/patient-edit-profile.component';
import { AppointmentSlotBookingComponent } from './appointment-slot-booking/appointment-slot-booking.component';
import { ConfirmbookingComponent } from './confirmbooking/confirmbooking.component';
import { SecondcardComponent } from './secondcard/secondcard.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { RegistartionDialogComponent } from './registartion-dialog/registartion-dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {MatAutocompleteModule, MAT_AUTOCOMPLETE_DEFAULT_OPTIONS} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { PatientreviewsComponent } from './patientreviews/patientreviews.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { StartingPageComponent } from './starting-page/starting-page.component';





const dashboardRoutes: Routes = [
  //{ path: "**", component: PopupComponent },
  {path:'',component:LandingpageComponent},
 //{path:'',component:StartingPageComponent},
  // {path:'myAppointments',component:PatientappointmentsComponent},
  // {path:'patientProfile',component:PatientprofileComponent},
  
  {path:'login',component:LoginComponent},
  {path:'tabbedViewForRegistration',component:TabbedPaneForRegComponent},
  {path:'patientregistration',component:PatientregistrationComponent},
  {path:'doctordashboard',component:DoctordashboardComponent},
  {path:'patientdashboard/:username',component:PatientdashboardComponent},
  {path:'doctorregistration',component:DoctorregistrationComponent},
  {path:'patientProfile',component:PatientprofileComponent},
  //{path:'patientProfile/:email',component:PatientprofileComponent},
  {path:'searchView',component:SearchDoctorComponent},
  {path:'searchView/:location/:specialization',component:SearchDoctorComponent},
  { path: 'doctorView', component: ViewDoctorComponent  },
  {path:'landingpage',component:LandingpageComponent},
  {path:'openLogin',component: LoginComponent},
  {path:'appointmentSlot',component:AppointmentSlotBookingComponent},
  {path:'editPatient/:name/:emailId/:dateOfBirth/:gender/:phone',component:PatientEditProfileComponent},
  {path:'confirmBooking',component:ConfirmbookingComponent},
  {path:'doctordashboard/:username',component:DoctordashboardComponent},

  //{path:'popup',component:Popup1Component}

  
];

const appRoutes:Routes=[

  {  path: 'landingpage', component:LandingpageComponent, pathMatch: 'prefix',
  children:[
 
    {path:'popup',component:Popup1Component},
 
  ]
 
 },

  {
    path: '', component: PatientdashboardComponent, pathMatch: 'prefix',
   children:[{path:'myAppointments',component:PatientappointmentsComponent},
           {path:'patientProfile/:email',component:PatientprofileComponent}


 ]

},

{  path: '', component:DoctordashboardComponent, pathMatch: 'prefix',
children:[
 {path:'openProfile/:email',component:DoctorprofileComponent},
 {path:'openAppointments',component:DoctorappointmentsComponent},
 {path:'openTimings',component:DoctortimingsComponent }
]
},
 
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
    PatientappointmentsComponent,
    PatientprofileComponent,
    DoctorregistrationComponent,
    SearchDoctorComponent,
    ViewDoctorComponent,
    MyDialogComponent,
    DoctordashboardComponent,
    DoctorappointmentsComponent,
    DoctorprofileComponent,
    DoctortimingsComponent,
    PatientdashboardComponent,
    Popup1Component,
    PatientEditProfileComponent,
    AppointmentSlotBookingComponent,
    ConfirmbookingComponent,
    SecondcardComponent,
    ConfirmationDialogComponent,
    RegistartionDialogComponent,
    LoginDialogComponent,
    PatientreviewsComponent,
    StartingPageComponent
   
  
  ],
  imports: [
    BrowserModule,
    NavbarModule, 
    CustomMaterialModule,
    AppRoutingModule,
    MatSidenavModule, MatListModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(dashboardRoutes),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserModule,
   MatExpansionModule,
   MatToolbarModule,
   MatButtonModule,
   MatIconModule,
   MatCardModule,
   HttpClientModule,
   MDBBootstrapModule.forRoot(),
   AppRoutingModule,
   Ng2CarouselamosModule,

   BrowserAnimationsModule,
   MatAutocompleteModule,
   MatChipsModule
   
  
  

    
  ],
  entryComponents: [
     PopupComponent,
    MyDialogComponent,
    ConfirmationDialogComponent,
    RegistartionDialogComponent,
    LoginDialogComponent
  ],
  providers: [{provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, useValue: {autoActiveFirstOption: false}}],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
