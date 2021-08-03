import { Injectable } from '@angular/core';
import { adminReg, Paper, Question } from './admin.model';
import { LoginService } from './login.service';
import { WebService } from './web.service';
const User_key ="admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  Areg:adminReg[];
paper:Paper[];
Questions:Question[];
  constructor(private service:LoginService,private webService: WebService) { }
  

  adReg(Areg:adminReg){
     return this.webService.aReg('admin/adminregister', Areg)
  }
  CreatePaper(paper:Paper){
    return this.webService.Cpaper('admin/Createpaper',paper)
  }
  getPapers(name:any){
    return this.webService.get(`admin/paperCreatedby/${name}`)
  }
  onAdd(Questions:Question){
   return this.webService.addQ('admin/addquestion',Questions)
  }
  adminDetail(clgID:any){
    return this.webService.get(`admin/getDetails/${clgID}`)
  }
  set(test:any){
    return this.webService.patch(`admin/paper/set/${test}`);
  }
  delpaper(data:any){
    return this.webService.delete(`admin/paper/${data}`);
  }
  delQ(data:any){
    return this.webService.delete(`admin/question/${data}`);
  }
  getQuestions(data:any){
    return this.webService.get(`admin/getQuestion/${data}`);
  }
  getResult(data:any){
    return this.webService.get(`admin/results/${data}`);
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
}
