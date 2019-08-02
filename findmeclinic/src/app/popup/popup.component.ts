import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../app/popup.service';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material';
import * as $ from 'jquery'; 
import * as bootstrap from "bootstrap";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent  implements OnInit  {

  
  public places :any [];
 
  constructor(private dialog:MatDialog,public popupService: PopupService, public router: Router) { }

  ngOnInit() {
    // $(document).ready(function() {
    //   if(sessionStorage.getItem('popState') != 'shown'){
    //       $("#popup").fadeIn();
    //       sessionStorage.setItem('popState','shown')
    //   }
    //    });
  }
  public hyderabad() {
    this.places =["Madinaguda","Miyapur", "Gachibowli","Ameerpet","SR Nagar","L.B Nagar","Kukatpalli"];
    this.popupService.places = this.places;
    // this.popupService.places1=this.places;
    this.popupService.city="Hyderabad";
    // this.popupService.city1="Hyderabad";
    const dialogRef = this.dialog.closeAll();
    this.popupService.check =false;
  }
  public bangalore() {
    this.places =["HSR Layout","Koramangala","Hebbal","Marathahalli","Jayanagar"];
    this.popupService.places = this.places;
    this.popupService.city="Bangalore";
    const dialogRef = this.dialog.closeAll();
    this.popupService.check =false;
  }
  public delhi() {
    this.places =["Ashok Nagar","Chattarpur","Civil Lines","Janakpuri"];
    this.popupService.places = this.places;
    this.popupService.city="New Delhi";
    const dialogRef = this.dialog.closeAll();
    this.popupService.check =false;
  }
  public mumbai() {
    this.places =["Bhandup","Ghatkopar","Borivali","Colaba","Kurla","Govandi"];
    this.popupService.places = this.places;
    this.popupService.city="Mumbai";
    const dialogRef = this.dialog.closeAll();
    this.popupService.check =false;
  }
  public vijayawada() {
    this.places =["Benz circle","Ashok Nagar","Auto Nagar","Bandar Road","Poranki","RTC Colony"];
    this.popupService.places = this.places;
    this.popupService.city="Vijayawada";
    const dialogRef = this.dialog.closeAll();
    this.popupService.check =false;
  }
  public chennai() {
    this.places =["Park town","perambur","Tharamani","K.K.Nagar","Chennai"];
    this.popupService.places = this.places;
    this.popupService.city="Chennai";
    const dialogRef = this.dialog.closeAll();
    this.popupService.check =false;
  }
 
}

