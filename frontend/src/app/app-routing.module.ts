import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PapersComponent } from './admin/papers/papers.component';
import { ResultsComponent } from './admin/results/results.component';
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './student/result/result.component';
import { StudentComponent } from './student/student.component';
import { TestsComponent } from './student/tests/tests.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'student', children: [
      { path: '', component: StudentComponent },
      { path: 'tests/:testname', component: TestsComponent },
      { path: 'result/:testname', component: ResultComponent }
    ]
  },
  {
    path: 'admin', children: [
      { path: '', component: AdminComponent },
      { path: 'paper/:testname', component: PapersComponent },
      { path: 'result/:testname', component: ResultsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
