import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Sregister } from 'src/app/shared/login.model';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  DialogOverviewExampleDialog: any;
  dialogRef: any;
  Sregister: Sregister[];
  router: any;

  constructor(public dialog: MatDialog, private service: LoginService) { }

  ngOnInit(): void {
  }

  onSregister(form: NgForm) {
    let Sregister: Sregister = {
      username: form.value.username,
      password: form.value.password,
      cnfpass: form.value.cnfpass
    }
    if(Sregister.password === Sregister.cnfpass){
      this.service.OnSregister(Sregister);
      this.dialog.closeAll();
    }else{
      alert("Passwords Not Matching");
    }
    this.resetForm(form);
  }

  resetForm(form?: NgForm) {
    form.resetForm();
  }
}

