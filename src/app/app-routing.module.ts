import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeEntryComponent } from './employee-entry/employee-entry.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
  path:'DashBoard',
  component:DashboardComponent
  },
  {
  path:'Employee-entry',
  component:EmployeeEntryComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
