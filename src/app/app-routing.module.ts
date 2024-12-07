import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeEntryComponent } from './pages/employee/employee-entry/employee-entry.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { AngularDataTableComponent } from './pages/authentication/angular-data-table/angular-data-table.component';
import { profile } from 'console';
import { EmployeeProfileComponent } from './pages/employee/employee-profile/employee-profile.component';
import { SeparetionComponent } from './pages/employee/separetion/separetion.component';
import { LeaveApplicationComponent } from './pages/leave/leave-application/leave-application.component';
import { RegistrationComponent } from './pages/authentication/registration/registration.component';
import { LeaveApproveComponent } from './pages/leave/leave-approve/leave-approve.component';
import { LvAuthorirySetupComponent } from './pages/leave/lv-authoriry-setup/lv-authoriry-setup.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AppComponent } from './app.component';
import { UnauthenticatedLayoutComponent } from './pages/authentication/unauthenticated-layout/unauthenticated-layout.component';
import { AuthenticatedLayoutComponent } from './pages/authentication/authenticated-layout/authenticated-layout.component';
import { DepartmentComponent } from './pages/settings/department/department.component';
import { DesignationComponent } from './pages/settings/designation/designation.component';
import { GradeComponent } from './pages/settings/grade/grade.component';
/* const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full' ,
  },
  {
    path:'login',
    component:RegistrationComponent
  },
 
  { path: '**', redirectTo: 'login' }
  
];
 */
const routes: Routes = [
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
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
      
        {
          path : 'leave-approvelist',
          component:LeaveApproveComponent
        },
        {
          path:'lv-authority-setup',
          component:LvAuthorirySetupComponent
        },
        {
          path:'settings/department',
          component:DepartmentComponent
        },
        {
          path:'settings/designation',
          component:DesignationComponent

        },
        {
          path:'settings/grade',
          component:GradeComponent
        }
    ],
  },
  {
    path: '',
    component: UnauthenticatedLayoutComponent,
    children: [
      { path: 'login', component: RegistrationComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 
export class AppRoutingModule { }
