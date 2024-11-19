import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeEntryComponent } from './employee-entry/employee-entry.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AngularDataTableComponent } from './angular-data-table/angular-data-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EmployeeProfileComponent } from './Personnel/employee-profile/employee-profile.component';
import { SeparetionComponent } from './Personnel/separetion/separetion.component';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { LeaveApplicationComponent } from './Leave/leave-application/leave-application.component';
import { ApiServiceService } from './api-service.service';
import { LeaveService } from './leave.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { RegistrationComponent } from './access-control/registration/registration.component';
import { LeaveApproveComponent } from './Leave/leave-approve/leave-approve.component';
import { MatButtonModule } from '@angular/material/button';

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
    ReactiveFormsModule, // Required for formControl in reactive forms
    FormsModule,         // Optional, useful if also using template-driven forms
    MatFormFieldModule,
    MatSelectModule,
    NgSelectModule,
    MatButtonModule,
  ],
  providers: [
      ApiServiceService,
      LeaveService,
      provideHttpClient(),
      provideClientHydration()
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
