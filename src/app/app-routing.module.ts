import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeEntryComponent } from './employee-entry/employee-entry.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AngularDataTableComponent } from './angular-data-table/angular-data-table.component';
import { profile } from 'console';
import { EmployeeProfileComponent } from './Personnel/employee-profile/employee-profile.component';
import { SeparetionComponent } from './Personnel/separetion/separetion.component';
import { LeaveApplicationComponent } from './Leave/leave-application/leave-application.component';

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
  {
  path:'Employee-list',
  component:EmployeeListComponent
  },
  {
    path:'DataTable',
    component:AngularDataTableComponent
  },
  {
    path:'profile',
    component:EmployeeProfileComponent
  },
  {
    path:'separetion',
    component:SeparetionComponent
  },
  {
    path:'leave-application',
    component:LeaveApplicationComponent
  },

/*   { path: '', redirectTo: '/Employee-entry', pathMatch: 'full' },
  { path: '**', redirectTo: '/Employee-entry' } */
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
