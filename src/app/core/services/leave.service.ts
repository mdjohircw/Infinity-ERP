import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import {  ILeaveData } from '../models/interfaces/ILeave-data';
import { PaginatedResponse } from './paginated-response';
import { response } from 'express';
import { IEmployee } from '../models/interfaces/IEmployee';
import { IAuthority } from '../models/interfaces/IAuthority';
@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private RootUrl='https://localhost:7220'
  private userId: string = '89'; //masudrana
 /*  private userId: string = '86';  *///abul kalam azad
  private CompanyId : string ='0001';
  private EmpId : string = '00000017'
  private GetLeaveTypeUrl = `/api/Leave/LeaveType/${this.CompanyId}`;
  

  private GetEmployeeUrl = `/api/Employee/EmployeeName?CompanyId=${this.CompanyId}`;
  private GetLeavesUrl = `/api/Leave/lvApplications/${this.CompanyId}?EmpId=${this.EmpId}`;
  private GetLeaveApproveUrl = `/api/Leave/lvApplicationForApprove/${this.CompanyId}?UserId=${this.userId}`;
  private PostLeaveUrl = `/api/Leave/create/${this.userId}`;
  private ApproveLeaveUrl = `/api/Leave/approval`;
  private GetLvAuthority = `/api/User/authority?companyId=${this.CompanyId}`;
  private DeleteLeaveUrl = `/api/Leave/delete`;

  private token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MTM5MzIxOTYsImV4cCI6MTc0NTQ2ODE5NiwiYXVkIjoiIiwic3ViIjoiSldUU2VydmljZUFjY2Vzc1Rva2VuIn0.letXzwpes_YaMFumZsklIowaTR80FXr3m5h8mwCABCQ';
  constructor(private http: HttpClient) {}

  getLeaveTypes(): Observable<any> {
    return this.http.get<any>(this.RootUrl+this.GetLeaveTypeUrl);
  }

/*   getEmployeesApiCall(selectedDepartmentIds: any[] = []):Observable<IEmployee[]> {
    return this.http.get<any>(this.RootUrl+this.GetEmployeeUrl+`&${selectedDepartmentIds.map(id => `DptIds=${id}`).join('&')}`).pipe(
      map(response=>{
        console.log('Employee response',response);
        return response.data || [];
      })
    )
  } */

    getEmployeesApiCall(selectedDepartmentIds: string[] = []): Observable<IEmployee[]> {
      console.log('this log from Emp Service',selectedDepartmentIds);
      const departmentParams = selectedDepartmentIds.map(id => `DptIds=${id}`).join('&');
      const url = `${this.RootUrl}${this.GetEmployeeUrl}${departmentParams ? `&${departmentParams}` : ''}`;
    
      return this.http.get<{ data: IEmployee[] }>(url).pipe(
        map(response => {
          console.log('Employee response', response);
          return response.data || [];
        })
      );
    }
    








  saveLeaveApplication(postData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` // Ensure this.token is initialized
    });
  
    const url = `${this.RootUrl}${this.PostLeaveUrl}`; // Use template literal for better readability
    return this.http.post(url, postData, { headers }).pipe(
      catchError((error) => {
        console.error('Error occurred while saving leave application:', error);
        return throwError(() => new Error('Failed to save leave application'));
      })
    );
  }
  getLeaves(): Observable<ILeaveData[]> {
    return this.http.get<any>(this.RootUrl + this.GetLeavesUrl).pipe(
      map(response => {
        console.log('API Response:', response);
        return response.data || []; // Adjust based on API response structure
      })
    );
  }

  getLeavesForApprove():Observable<ILeaveData[]>{
    return this.http.get<any> (this.RootUrl+this.GetLeaveApproveUrl).pipe(
      map(response =>{
        console.log('API Response ', response);
        return response.data || [];
      })
    )
  }

  getLeavesAuthority():Observable<IAuthority[]>{
    return this.http.get<any> (this.RootUrl+this.GetLvAuthority).pipe(
      map(response =>{
        console.log('API Response ', response);
        return response.data || [];
      }))
    
    }
  approveApplication(postData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` // Ensure this.token is initialized
    });
  
    const url = `${this.RootUrl}${this.ApproveLeaveUrl}`; // Use template literal for better readability
    return this.http.put(url, postData, { headers }).pipe(
      catchError((error) => {
        console.error('Error occurred while saving leave application:', error);
        return throwError(() => new Error('Failed to save leave application'));
      })
    );
  }

/*   approveApplication(data: any): Observable<any> {
      var url =  this.RootUrl+this.ApproveLeaveUrl
      console.log(url);
    return this.http.put(url, data);
  } */
  deleteLeave(leaveId: number): Observable<any> {
    const url = `${this.RootUrl}${this.DeleteLeaveUrl}/${leaveId}`;
    console.log('Delete URL:', url); // Log the URL to check if it's valid
    return this.http.delete(url);
  }

  GetAuthority(pageIndex: number, pageSize: number, filter: string, sortColumn: string, sortDirection: string): Observable<PaginatedResponse<IAuthority>> {
    return this.getLeavesAuthority().pipe(
      map((data: IAuthority[] | null | undefined) => {
        console.log('API Response:', data); // Debugging step
        console.log('this value from GetEmployees');
        let filteredData = data || []; // Default to empty array
  
        // Apply filtering
        if (filter) {
          filter = filter.trim().toLowerCase();
          filteredData = filteredData.filter(authority => 
            authority.empName.toLowerCase().includes(filter) || 
            authority.empCardNo.toLowerCase().includes(filter)
          );
        }
  
        // Apply sorting
        if (sortColumn && sortDirection) {
          filteredData = filteredData.sort((a, b) => {
            const isAsc = sortDirection === 'asc';
            switch (sortColumn) {
              case 'empName': return this.compare(a.empName, b.empName, isAsc);
              case 'empCardNo': return this.compare(a.empCardNo, b.empCardNo, isAsc);
           
              default: return 0;
            }
          });
        }
  
        // Ensure filteredData is an array before slicing
        if (!Array.isArray(filteredData)) {
          throw new Error('filteredData is not an array.');
        }
  
        // Paginate the data
        const startIndex = pageIndex * pageSize;
        const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
  
        return {
          content: paginatedData,
          totalElements: filteredData.length
        };
      })
    );
  }



  GetEmployees(pageIndex: number, pageSize: number, filter: string, sortColumn: string, sortDirection: string, selectedDepartmentIds: any[] = []): Observable<PaginatedResponse<IEmployee>> {
    return this.getEmployeesApiCall(selectedDepartmentIds).pipe(
      map((data: IEmployee[] | null | undefined) => {
        console.log('API Response:', data); // Debugging step
        console.log('this value from GetEmployees',selectedDepartmentIds);
        let filteredData = data || []; // Default to empty array
  
        // Apply filtering
        if (filter) {
          filter = filter.trim().toLowerCase();
          filteredData = filteredData.filter(leave => 
            leave.fullName.toLowerCase().includes(filter) || 
            leave.empCardNo.toLowerCase().includes(filter)
          );
        }
  
        // Apply sorting
        if (sortColumn && sortDirection) {
          filteredData = filteredData.sort((a, b) => {
            const isAsc = sortDirection === 'asc';
            switch (sortColumn) {
              case 'fullName': return this.compare(a.fullName, b.fullName, isAsc);
              case 'empCardNo': return this.compare(a.empCardNo, b.empCardNo, isAsc);
           
              default: return 0;
            }
          });
        }
  
        // Ensure filteredData is an array before slicing
        if (!Array.isArray(filteredData)) {
          throw new Error('filteredData is not an array.');
        }
  
        // Paginate the data
        const startIndex = pageIndex * pageSize;
        const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
  
        return {
          content: paginatedData,
          totalElements: filteredData.length
        };
      })
    );
  }

  
  getData(pageIndex: number, pageSize: number, filter: string, sortColumn: string, sortDirection: string): Observable<PaginatedResponse<ILeaveData>> {
    return this.getLeaves().pipe(
      map((data: ILeaveData[] | null | undefined) => {
        console.log('API Response:', data); // Debugging step
        let filteredData = data || []; // Default to empty array
  
        // Apply filtering
        if (filter) {
          filter = filter.trim().toLowerCase();
          filteredData = filteredData.filter(leave => 
            leave.empName.toLowerCase().includes(filter) || 
            leave.leaveName.toLowerCase().includes(filter)
          );
        }
  
        // Apply sorting
        if (sortColumn && sortDirection) {
          filteredData = filteredData.sort((a, b) => {
            const isAsc = sortDirection === 'asc';
            switch (sortColumn) {
              case 'empName': return this.compare(a.empName, b.empName, isAsc);
              case 'leaveName': return this.compare(a.leaveName, b.leaveName, isAsc);
              case 'applyDate': return this.compare(a.applyDate, b.applyDate, isAsc);
              default: return 0;
            }
          });
        }
  
        // Ensure filteredData is an array before slicing
        if (!Array.isArray(filteredData)) {
          throw new Error('filteredData is not an array.');
        }
  
        // Paginate the data
        const startIndex = pageIndex * pageSize;
        const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
  
        return {
          content: paginatedData,
          totalElements: filteredData.length
        };
      })
    );
  }
  getLvApprove(pageIndex: number, pageSize: number, filter: string, sortColumn: string, sortDirection: string): Observable<PaginatedResponse<ILeaveData>> {
    return this.getLeavesForApprove().pipe(
      map((data: ILeaveData[] | null | undefined) => {
        console.log('API Response:', data); // Debugging step
        let filteredData = data || []; // Default to empty array
  
        // Apply filtering
        if (filter) {
          filter = filter.trim().toLowerCase();
          filteredData = filteredData.filter(leave => 
            leave.empName.toLowerCase().includes(filter) || 
            leave.leaveName.toLowerCase().includes(filter)
          );
        }
  
        // Apply sorting
        if (sortColumn && sortDirection) {
          filteredData = filteredData.sort((a, b) => {
            const isAsc = sortDirection === 'asc';
            switch (sortColumn) {
              case 'empName': return this.compare(a.empName, b.empName, isAsc);
              case 'leaveName': return this.compare(a.leaveName, b.leaveName, isAsc);
              case 'applyDate': return this.compare(a.applyDate, b.applyDate, isAsc);
              default: return 0;
            }
          });
        }
  
        // Ensure filteredData is an array before slicing
        if (!Array.isArray(filteredData)) {
          throw new Error('filteredData is not an array.');
        }
  
        // Paginate the data
        const startIndex = pageIndex * pageSize;
        const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
  
        return {
          content: paginatedData,
          totalElements: filteredData.length
        };
      })
    );
  }

  private compare(a: string, b: string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

    
   
}
