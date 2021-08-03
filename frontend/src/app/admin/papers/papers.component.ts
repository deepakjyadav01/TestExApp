import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CPaper, Question } from 'src/app/shared/admin.model';
import { AdminService } from 'src/app/shared/admin.service';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styles: []
})
export class PapersComponent implements OnInit {
  user: any = [];
  paper: any = [];
  Count: any = [];
  Cvalue: any;
  set: boolean = false;
  Questions:any=[];
  Qs:any=[];
  
  constructor(private service: AdminService, private route: ActivatedRoute, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    try {
      this.user = this.loginService.getUser();
      this.paper = this.service.getUser();
      const value = this.paper.questions;
      this.Cvalue = value;
      for (let i = 1; i <= value; i++) {
        this.Count.push(i);
      }
      setTimeout(() => {
        if (this.user && this.paper == null) {
          this.router.navigate(['./login']);
        }
        if(this.paper.set == true){
          this.getQ(this.paper.testname)
        }
      }, 500);

    } catch (error) {
      this.router.navigate(['./login']);
    }
  }


  onAdd(form: NgForm, i: number) {

    let Question: Question = {
      questionID: i,
      question: form.value.question,
      option1: form.value.option1,
      option2: form.value.option2,
      option3: form.value.option3,
      option4: form.value.option4,
      right: form.value.right,
      testname: this.paper.testname
    }
    console.log(Question);
    this.service.onAdd(Question).subscribe(
      (res: any) => {
        if (res.status == 201)
          this.Questions.push(Question);
        }, (error) => {
        console.log(error.error);
        alert("something went wrong add")
      });
      console.log(this.Questions);
      this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }

  getQ(data:any){
    this.service.getQuestions(data).subscribe(
      (res:any)=>{
      this.Qs=res.body;
      console.log(this.Qs);
      },(error)=>{
     console.log(error.error);
      });
  }
  
  subQ() {
    if (this.Cvalue == this.Questions.length) {
      console.log(this.Questions);
      this.service.set(this.paper.testname).subscribe(
        (res: any) => {
          console.log(res);
          this.service.saveUser(res)
          if(res.set==true){
            alert("succesfull");
          // this.router.navigate(['./admin']);
           this.ngOnInit();
          }
        }, (error) => {
          console.log(error.error);
        });
    }else if (this.paper.set==true){
      //this.router.navigate(['./admin']);
      this.ngOnInit();
    }  
  }

  gotoAd(){
    this.router.navigate(['./admin']);
  }


}
