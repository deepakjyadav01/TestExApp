import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { AdminService } from '../shared/admin.service';
import { ActivatedRoute, Router ,Params} from '@angular/router';
import { adminReg } from '../shared/admin.model';
import { MatDialog } from '@angular/material/dialog';
import { AdRegComponent } from './ad-reg/ad-reg.component';
import { PCreateComponent } from './p-create/p-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  Areg: adminReg[];
  roles: any = [];
  admin:any =[];
  papers: any = [];
  results: any = [];
  Pcount:number;
  Cpaper:any=[];
  delP:any;

  constructor(private service: AdminService, private loginService: LoginService, private router: Router,
    public dialog: MatDialog,private route:ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    try {
      if (this.roles == null) {
        this.router.navigate(['./login'])
      }
      this.roles = this.loginService.getUser();
      this.Adetail(this.roles.collegeID);

      setTimeout(() => {
        if (this.roles == null) {
          this.router.navigate(['./login'])
        }console.log(this.roles);
        this.getPapers(this.roles.fullname);
      }, 500);
    } catch (error) {
      this.router.navigate(['./login']);
    }
  }

  Adetail(clgID: any) {
    this.service.adminDetail(clgID).subscribe(
      (res: any) => {
        if (res.status == 200)
        this.admin=res.body;
        this.loginService.saveUser(res.body);
        this.roles = this.loginService.getUser();
      }, (error) => {
        console.log(error.error);
      }
    )};
  
  getPapers(name:any){
   this.service.getPapers(name).subscribe(
    (res: any) => {
      if (res.status == 200)
      this.papers=res.body;
      this.Pcount=this.papers.length;
    }, (error) => {
      console.log(error.error);
    });
  }
  addQ(data:any){
    console.log(data);
    this.service.saveUser(data);
    this.router.navigate([`paper/${data.testname}`], { relativeTo: this.route });
  }
  view(data:any){
    this.service.saveUser(data);
    this.router.navigate([`paper/${data.testname}`], { relativeTo: this.route });
  }
  delete(data:any){
    this.delP = data.testname;
    this.service.delQ(data.testname).subscribe(
      (res:any)=>{
      console.log(res);
    },(error)=>{
      console.log(error.error);
    });
    this.service.delpaper(data.testname).subscribe(
      (res:any)=>{
        if(res.status==200)
        this.delP=res.body;
        console.log(this.delP);
        this.ngOnInit();
      },(error)=>{
        console.log(error.error);
      });
   
  }
  result(op:any){
    this.service.saveUser(op);
    this.router.navigate([`result/${op.testname}`], { relativeTo: this.route });

  }
  openDialog() {
    this.dialog.open(AdRegComponent, {
      width: '750px',
      height: '650px'
    });
  }
  openDialog1() {
    this.dialog.open(PCreateComponent, {
      width: '800px',
      height: '600px'
    });
  }

  logout(): void {
    this.loginService.SignOut();
    this.loginService.clearAllLocalStorage();
    this.router.navigate(['./login']);
    setTimeout(() => {
      this.loginService.reloadPage();
    }, 1000);
  }
  reload():void{
    this.loginService.reloadPage();
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}






