import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CPaper, Paper } from 'src/app/shared/admin.model';
import { AdminService } from 'src/app/shared/admin.service';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-p-create',
  templateUrl: './p-create.component.html',
  styles: [
  ]
})
export class PCreateComponent implements OnInit {
admin:any=[];
Cpaper:any=[];
Newpaper:any;

  constructor(private loginService:LoginService,private service:AdminService, public dialog: MatDialog,
    private modalService: NgbModal) {}

  ngOnInit(): void {
     this.admin = this.loginService.getUser();
     console.log(this.admin);
  }

  onpaper(form:NgForm){
    let paper:Paper= {
     name: form.value.name,
    year: form.value.year,
    branch: form.value.branch,
    class: form.value.class,
    date: form.value.date,
    questions: form.value.questions,
    MperQ: form.value.MperQ,
    timelimit: form.value.timelimit,
    Createdby: this.admin.fullname
    }
    this.service.CreatePaper(paper).subscribe(
      (res:any)=>{
        if(res.status == 201)
         this.Newpaper=res.body.testname;
         console.log(this.Newpaper);
         this.resetForm(form)
         this.dialog.closeAll();
      },(error)=>{
        console.log(error.error);
      });
      this.resetForm(form)
  }
    openVerticallyCentered(content) {
      this.modalService.open(content, { centered: true });
    }
    resetForm(form: NgForm) {
      form.resetForm();
  }
  reload():void{
    this.loginService.reloadPage();
  }

}
