import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { TestsComponent } from './student/tests/tests.component';
import { ResultComponent } from './student/result/result.component';
import { PapersComponent } from './admin/papers/papers.component';
import { ResultsComponent } from './admin/results/results.component';
import { RegisterComponent } from './login/register/register.component';
import { LoginService } from './shared/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdRegComponent } from './admin/ad-reg/ad-reg.component';
import { PCreateComponent } from './admin/p-create/p-create.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    AdminComponent,
    TestsComponent,
    ResultComponent,
    PapersComponent,
    ResultsComponent,
    RegisterComponent,
    AdRegComponent,
    PCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    NgbModule,MatDatepickerModule,MatNativeDateModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
