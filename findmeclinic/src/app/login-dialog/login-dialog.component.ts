import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../User';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  name:string;
  user:User=new User();
  status1:string;
  constructor(private authentication:AuthenticationService,private router:Router,private dialog:MatDialog) { }

  ngOnInit() {
    this.name=sessionStorage.getItem('name');
  }

  confirm(password:string)
  {
     let emailId=sessionStorage.getItem('email');
     this.user.emailId=emailId;
     this.user.password=password;

  this.authentication.saveUser(this.user).subscribe(data =>{
    
   this.status1="true";
   sessionStorage.setItem('status1',this.status1);
   const dialogRef = this.dialog.closeAll();
   
  },
    
    error =>{
      alert("invalid Credentials")
      console.log("Error",error);
    }
  );
}
}
