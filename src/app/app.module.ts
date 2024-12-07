import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeEntryComponent } from './pages/employee/employee-entry/employee-entry.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { AngularDataTableComponent } from './pages/authentication/angular-data-table/angular-data-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EmployeeProfileComponent } from './pages/employee/employee-profile/employee-profile.component';
import { SeparetionComponent } from './pages/employee/separetion/separetion.component';
import { MatIconModule } from '@angular/material/icon';
import { LeaveApplicationComponent } from './pages/leave/leave-application/leave-application.component';
import { LeaveService } from './core/services/leave.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { RegistrationComponent } from './pages/authentication/registration/registration.component';
import { LeaveApproveComponent } from './pages/leave/leave-approve/leave-approve.component';
import { MatButtonModule } from '@angular/material/button';
import { LvAuthorirySetupComponent } from './pages/leave/lv-authoriry-setup/lv-authoriry-setup.component';
import { MatPseudoCheckbox } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from './core/services/auth.service';
import { MatRadioModule } from '@angular/material/radio'; // Import the MatRadioModule
import express from 'express';
import process from 'process';
import { PermissionService } from './core/services/permission.service';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedLayoutComponent } from './pages/authentication/authenticated-layout/authenticated-layout.component';
import { UnauthenticatedLayoutComponent } from './pages/authentication/unauthenticated-layout/unauthenticated-layout.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DepartmentComponent } from './pages/settings/department/department.component';
import { DesignationComponent } from './pages/settings/designation/designation.component';
import { GradeComponent } from './pages/settings/grade/grade.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeEntryComponent,
    EmployeeListComponent,
    AngularDataTableComponent,
    EmployeeProfileComponent,
    SeparetionComponent,
    LeaveApplicationComponent,
    RegistrationComponent,
    LeaveApproveComponent,
    LvAuthorirySetupComponent,
    AuthenticatedLayoutComponent,
    UnauthenticatedLayoutComponent,
    DepartmentComponent,
    DesignationComponent,
    GradeComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,         
    MatFormFieldModule,
    MatSelectModule,
    NgSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    
    
  ],
  providers: [
      LeaveService,
      AuthService,
      PermissionService,
      AuthGuard,
      provideHttpClient(withFetch()),
      provideHttpClient(),
      provideClientHydration()
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
