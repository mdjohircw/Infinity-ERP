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
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeEntryComponent,
    EmployeeListComponent,
    AngularDataTableComponent,
    EmployeeProfileComponent,
    SeparetionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
