import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeEntryComponent } from './employee-entry/employee-entry.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

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
  { path: '', redirectTo: '/Employee-entry', pathMatch: 'full' },
  { path: '**', redirectTo: '/Employee-entry' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
