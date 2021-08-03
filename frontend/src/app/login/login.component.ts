import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {  Alogin, Slogin } from '../shared/login.model';
import { LoginService } from '../shared/login.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  admin: Alogin[];
  student: Slogin[];
  localStorage: any;

  constructor(private Service: LoginService, private router: Router,public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  onAlogin(form: NgForm) {
    let admin: Alogin = {
      collegeID: form.value.collegeID,
      email: form.value.email,
      password: form.value.password
    }
    this.Service.OnAlogin(admin);
    this.Service.saveUserkey("admin")
    this.Service.saveUser(admin)
    this.resetForm(form);
  }

  onSlogin(form: NgForm) {
    let student: Slogin = {
      username: form.value.username,
      password: form.value.password
    }
    this.Service.OnSlogin(student);
    this.Service.saveUserkey("student")
    this.Service.saveUser(student)
    this.resetForm(form);
  }

  resetForm(form?: NgForm) {
      form.resetForm();
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent,{
        width: '500px',
        height: '600px'
    });
  }

 
}



