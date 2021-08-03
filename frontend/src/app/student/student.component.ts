import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isBreakOrContinueStatement } from 'typescript';
import { LoginService } from '../shared/login.service';
import { StorageService } from '../shared/storage.service';
import { Sprofile } from '../shared/student.model';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  profile: Sprofile[];
  roles: any = [];
  studentProfile: any = [];
  tests: any = [];
  results: any = [];
  NGtests: any = [];
  Gtests: any = [];
  constructor(private service: StudentService, private loginService: LoginService, private router: Router,
    private storageService: StorageService, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    try {
      if (this.roles == null) {
        this.router.navigate(['./login'])
      }
      this.roles = this.loginService.getUser();
      this.getstudent(this.roles.username);

      setTimeout(() => {
         console.log(this.roles);
        if (this.roles == null) {
          this.router.navigate(['./login'])
        }
        if (this.studentProfile.length != 0) {
          console.log(this.studentProfile);
          this.gettests(this.studentProfile);

        }
      }, 500);
    } catch (error) {
      this.router.navigate(['./login'])
    }
  }

  onProfile(form: NgForm) {
    let profile: Sprofile = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email,
      phone: form.value.phone,
      gender: form.value.gender,
      year: form.value.year,
      branch: form.value.branch,
      class: form.value.class,
      rollno: form.value.rollno
    }
    this.service.onSprofile(profile).subscribe(
      (res: any) => {
        this.studentProfile = res.body;
        this.service.saveUser(res.body);
        alert("Successfully Submitted");
        this.setProfileID(this.studentProfile);
        this.set();
      }, (error) => {
        alert("something went wrong");
        console.log(error.error);
      });
    this.resetForm(form);
    setTimeout(() => {
      this.ngOnInit();
    }, 1500);
  }

  public getstudent(user: any) {
    this.service.onstudent(user).subscribe(
      (res: any) => {
        if (res.status == 200)
          this.loginService.saveUser(res.body);
        this.roles = this.loginService.getUser();
        if (this.roles.set == true) {
          this.getProfile(this.roles.profileID)
        }
      }, (error) => {
        console.log(error.error);
      })
  }

  public set(): void {
    this.service.setboolean(this.roles.username).subscribe(
      () => {
        console.log("set to true");
      }, (error) => {
        console.log(error);
      })
  }
  public setProfileID(studentProfile: any) {
    this.service.ProfileID(this.roles.username, studentProfile._id).subscribe(
      () => {
        console.log("set to SprofileID");
      }, (error) => {
        console.log(error);
      })
  }

  public getProfile(ID: any) {
    this.service.getProfile(ID).subscribe(
      (res: any) => {
        if (res.status == 200)
          this.service.saveUser(res.body);
        this.studentProfile = this.service.getUser();
        const name = this.studentProfile.firstname + " " + this.studentProfile.lastname
        this.getresult(name);
      }
    )
  }
  gettests(data: any) {
    this.service.tests(data.year, data.branch).subscribe(
      (res: any) => {
        if (res.status == 200)
          this.tests = res.body;
        //console.log(this.tests);
      }, (error) => {
       console.log(error.error);
      });
    setTimeout(() => {
      this.updatetest(this.tests, this.results);
    }, 1000);
  }
  getresult(data: any) {
    this.service.getResult(data).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.results = res.body;
        //  console.log(this.results);
        }
      }, (error) => {
        console.log(error.error)
      });
  }
  updatetest(test: any[], result: any[]) {
    result.forEach((a, index) => {
      test.forEach((b, index) => {
        if (b.set == true) {
          if (a.testname == b.testname) {
            test.indexOf(b);
            if (index > -1) {
              test.splice(index, 1);
            }
          }
        }
      });
    });
    setTimeout(() => {
      //console.log(test);
    }, 1000);

  }

  test(data: any) {
    this.storageService.saveUser(data);
    this.router.navigate([`tests/${data.testname}`], { relativeTo: this.route });
  }
  result(data: any) {
    console.log(data);
    this.storageService.saveUser(data);
    this.router.navigate([`result/${data.testname}`], { relativeTo: this.route });

  }

  resetForm(form?: NgForm) {
    form.resetForm();
  }

  logout(): void {
    this.loginService.SignOut();
    this.loginService.clearAllLocalStorage();
    this.router.navigate(['./login']);
    setTimeout(() => {
      this.loginService.reloadPage();
    }, 500);
  }


}
