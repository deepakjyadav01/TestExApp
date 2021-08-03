import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { StorageService } from './storage.service';
import { Marks, Sprofile, Sprofile1, stRes } from './student.model';
import { WebService } from './web.service';
const User_key: string = "Profile";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  student: Sprofile1[] = [];
  sprofile: Sprofile[];
  runset: boolean;
  score: number = 0;
  test: any = [];
  response: any = [];
  k: number;
  Student: any;
  user: any;

  constructor(private webService: WebService, private loginService: LoginService, private router: Router,
    private storageService: StorageService) { }

  onSprofile(profile: Sprofile) {
    return this.webService.Sprofile('student/profile', profile)
  }
  onstudent(user: any) {
    return this.webService.get(`student/getStudent/${user}`)
  }

  setboolean(username: any) {
    return this.webService.patch(`student/set/${username}`);
  }
  ProfileID(username: any, ID: String) {
    return this.webService.patch(`student/set/${username}/${ID}`);
  }
  getProfile(id: any) {
    return this.webService.get(`student/getProfile/${id}`);
  }
  tests(year: any, branch: any) {
    return this.webService.get(`student/tests/${year}/${branch}`);
  }

  SignOut(): void {
    window.localStorage.clear();
  }

  markscount(test: any, Qs: any, ans: any) {
    this.score = 0;
    let ques: any = Qs
    ques.forEach(i => {
      ans.forEach(j => {
        if (i.questionID == j.questionID) {
          if (i.right == j.rightans) {
            this.score++;
          }
        }
      })
    });
    setTimeout(() => {
      const Tscore = this.score * test.MperQ
      this.score = Tscore
      console.log(this.score);
      this.result(test, Qs, this.score, ans);
    }, 500);

  }

  result(test: any, Qs: any, score: any, ans: any) {
    this.Student = this.getUser();
    // this.user = this.getUser();
    let marks: Marks = {
      fullname: this.Student.firstname + " " + this.Student.lastname,
      year: this.Student.year,
      branch: this.Student.branch,
      class: this.Student.class,
      rollno: this.Student.rollno,
      testname: test.testname,
      Omarks: score,
      Tmarks: test.Tmarks,
    }
    console.log(marks);
    // let StudentRes: any = {
    //   fullname: this.Student.firstname + " " + this.Student.lastname,
    //   year: this.Student.year,
    //   branch: this.Student.branch,
    //   class: this.Student.class,
    //   rollno: this.Student.rollno,
    //   testname: test.testname,
    //   response: ans
    // }
    // this.storageService.addResult(StudentRes);
    this.webService.addmarks(`student/addmarks`, marks).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == 201) {
          console.log(res.body._id);
          this.webService.patch(`student/marks/set/${res.body._id}`).subscribe(
            (res: any) => {
              console.log(res);
              this.router.navigate(['./student'])
            }, (error) => {
              console.log(error.error);
              this.router.navigate(['./student'])
            });
        }
      }, (error) => {
        console.log(error.error);
        this.router.navigate(['./student'])
      });
  }


  getResult(data) {
    return this.webService.get(`student/getmarks/${data}`)
  }
  Result(name, testname) {
    return this.webService.get(`student/getmarks/${name}/${testname}`)
  }

  public saveUserkey(user: string): void {
    window.localStorage.removeItem(User_key);
    window.localStorage.setItem(User_key, user);
  }
  public getUserkey(): string {
    return window.localStorage.getItem(User_key)
  }
  public saveUser(data: any) {
    window.localStorage.removeItem(User_key);
    window.localStorage.setItem(User_key, JSON.stringify(data));
  }

  public getUser() {
    return JSON.parse(window.localStorage.getItem(User_key));
  }

  public clearInfo() {
    window.localStorage.removeItem(User_key)
  }

  public clearAllLocalStorage() {
    window.localStorage.clear();
  }
}


