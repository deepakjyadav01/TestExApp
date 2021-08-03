import { Injectable } from '@angular/core';
import { Adetail, Alogin, Slogin, Sregister } from './login.model';
import { WebService } from './web.service';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';
const User_key = 'User';
  

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  admin: Alogin;
  student: Slogin;
  adetail: Adetail;
  Sregister: Sregister;
  regID: any;
  adID: any;
 

  constructor(private webService: WebService, private router: Router) { }

  OnAlogin(admin: Alogin) {
    this.webService.alogin('admin/adminlogin', admin).subscribe(
      (res: any) => {
        if (res.status == 200)
          this.router.navigate([`/admin`]);
      }, (error) => {
        alert(error.error);
      });
  }
  
  OnSlogin(student: Slogin) {
    this.webService.slogin('student/login', student).subscribe(
      (res: any) => {
        if (res.status == 200)
        this.router.navigate(['./student']);
      }, (error) => {
        alert(error.error)
      })
  }

  OnSregister(Sregister: Sregister) {
    this.webService.sregister('student/register', Sregister).subscribe(
      (res: any) => {
        if (res.status == 201)
          alert("New user " + res.body.username + " created succesfully");
        this.Sregister = res.body;
        this.regID = res.body._id
      }, (error) => {
        alert(error.error);
      })
  }

  SignOut():void{
    window.localStorage.clear();
    
  }

  public saveUserkey(user:string):void{
    window.localStorage.removeItem(User_key);
    window.localStorage.setItem(User_key,user);
  }
  public getUserkey():string{
    return window.localStorage.getItem(User_key)
  }
  public saveUser(data:any) {
    window.localStorage.removeItem(User_key);
    window.localStorage.setItem(User_key,JSON.stringify(data));
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
  reloadPage(): void {
    window.location.reload();
  }

}
