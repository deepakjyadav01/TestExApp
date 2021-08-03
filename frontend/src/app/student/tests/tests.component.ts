import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/admin.service';
import { LoginService } from 'src/app/shared/login.service';
import { StorageService } from 'src/app/shared/storage.service';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
  ]
})
export class TestsComponent implements OnInit {
  roles: any=[];
  test: any=[];
  student: any=[];
  Cvalue: any;
  Count: any=[];
  Qs: any=[];
  selectedOptions:any[];
 answer:any=[];


  constructor(private service: StudentService, private loginService: LoginService, private router: Router,
    private storageService:StorageService,private route:ActivatedRoute,private adminService: AdminService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    try {
      if (this.roles == null) {
        this.router.navigate(['./login'])
      }
      this.roles = this.loginService.getUser();
      this.student = this.service.getUser();
      this.test = this.storageService.getUser();
      const value = this.test.questions;
      this.Cvalue = value;
      for (let i = 1; i <= value; i++) {
        this.Count.push(i);
      }
      // console.log(this.roles);
      // console.log(this.student);
      // console.log(this.test);

      setTimeout(() => {
        if (this.roles == null) {
          this.router.navigate(['./login']);}
          this.getQ(this.test.testname);

      }, 1000);
    } catch (error) {
      this.router.navigate(['./login'])
    }
  }

  getQ(data:any){
    this.adminService.getQuestions(data).subscribe(
      (res:any)=>{
      this.Qs=res.body;
      },(error)=>{
     console.log(error.error);
      });
  }

  answers(form:NgForm,i:number){
    let ans:any = {
      questionID: i,
      rightans: form.value.rightans
    }  
    this.answer.push(ans);
    this.resetForm(form);
  }
  resetForm(form: NgForm) {
    form.resetForm();
  }

  getData(){
   this.service.markscount(this.test,this.Qs,this.answer)
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
