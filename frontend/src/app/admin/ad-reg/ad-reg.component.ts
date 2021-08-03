import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { adminReg } from 'src/app/shared/admin.model';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-ad-reg',
  templateUrl: './ad-reg.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`.dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: white;
  }
  .light-blue-backdrop {
    background-color: #5cb3fd;
  }
`]
})
export class AdRegComponent implements OnInit {
  Areg: adminReg[];
  closeResult: string;
  newAd: any = [];
  constructor(private service:AdminService,private modalService: NgbModal, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onReg(form: NgForm) {
    let Areg: adminReg = {
      fullname: form.value.fullname,
      email: form.value.email,
      password: form.value.password,
      cnfpass: form.value.cnfpass
    }
    this.service.adReg(Areg).subscribe(
      (res:any)=>{
       this.newAd=res.body;
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
}