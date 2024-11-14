import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private RootUrl='https://localhost:7220'

  private GetLeaveTypeUrl = '/api/Leave/LeaveType/0001';
  private GetEmployeeUrl = '/api/Employee/EmployeeName';

  constructor(private http: HttpClient) {}

  getLeaveTypes(): Observable<any> {
    return this.http.get<any>(this.RootUrl+this.GetLeaveTypeUrl);
  }

  getEmployees():Observable<any> {
    return this.http.get<any>(this.RootUrl+this.GetEmployeeUrl)
  }
}
