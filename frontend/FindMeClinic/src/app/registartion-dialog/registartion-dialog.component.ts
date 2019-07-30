import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-registartion-dialog',
  templateUrl: './registartion-dialog.component.html',
  styleUrls: ['./registartion-dialog.component.css']
})
export class RegistartionDialogComponent implements OnInit {

  name:string;
  constructor(public dialogRef1: MatDialogRef<RegistartionDialogComponent>) { }

  ngOnInit() {
    this.name=sessionStorage.getItem('name');
  }

}
