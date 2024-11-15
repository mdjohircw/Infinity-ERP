import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private RootUrl='https://localhost:7220'
  private userId: string = '89'; 
  private GetLeaveTypeUrl = '/api/Leave/LeaveType/0001';
  private GetEmployeeUrl = '/api/Employee/EmployeeName';
  private PostLeaveUrl = `/api/Leave/create/${this.userId}`;
  private token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MTM5MzIxOTYsImV4cCI6MTc0NTQ2ODE5NiwiYXVkIjoiIiwic3ViIjoiSldUU2VydmljZUFjY2Vzc1Rva2VuIn0.letXzwpes_YaMFumZsklIowaTR80FXr3m5h8mwCABCQ';
  constructor(private http: HttpClient) {}

  getLeaveTypes(): Observable<any> {
    return this.http.get<any>(this.RootUrl+this.GetLeaveTypeUrl);
  }

  getEmployees():Observable<any> {
    return this.http.get<any>(this.RootUrl+this.GetEmployeeUrl)
  }


  postLeave(postData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post(`${this.RootUrl}/${this.PostLeaveUrl}`, postData, { headers });
  }
}
