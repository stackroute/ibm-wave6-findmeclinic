import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  name:string;
  constructor() { }

  ngOnInit() {
    this.name=sessionStorage.getItem('name');
  }

}
