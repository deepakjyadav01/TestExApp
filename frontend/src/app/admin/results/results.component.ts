import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {
  user: any = [];
  paper: any = [];
  result:any =[];
  constructor(private service: AdminService, private route: ActivatedRoute, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    try {
      this.user = this.loginService.getUser();
     this.paper = this.service.getUser();
     
      setTimeout(() => {
        if (this.user && this.paper == null) {
          this.router.navigate(['./login']);
        }
        if(this.paper.set == true){
          this.getResult(this.paper.testname)
        }
      }, 500);

    } catch (error) {
      this.router.navigate(['./login']);
    }
  }

  getResult(data:any){
    this.service.getResult(data).subscribe(
      (res: any) => {
        if(res.status == 200){
          this.result = res.body;
          console.log((this.result[0]));
          
        }
      }, (error) => {
        console.log(error.error);
      });
  }
  gotoAd(){
    this.router.navigate(['./admin']);
  }

}
