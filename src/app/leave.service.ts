import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { LeaveData } from './Leave/leave-data';
import { PaginatedResponse } from './Leave/paginated-response';
@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private RootUrl='https://localhost:7220'
  private userId: string = '113'; 
  private CompanyId : string ='0001';
  private EmpId : string = '00000017'
  private GetLeaveTypeUrl = `/api/Leave/LeaveType/${this.CompanyId}`;
  private GetEmployeeUrl = '/api/Employee/EmployeeName';
  private GetLeavesUrl = `/api/Leave/lvApplications/${this.CompanyId}?EmpId=${this.EmpId}`;
  private PostLeaveUrl = `/api/Leave/create/${this.userId}`;
  private DeleteLeaveUrl = `/api/Leave/delete`;

  private token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MTM5MzIxOTYsImV4cCI6MTc0NTQ2ODE5NiwiYXVkIjoiIiwic3ViIjoiSldUU2VydmljZUFjY2Vzc1Rva2VuIn0.letXzwpes_YaMFumZsklIowaTR80FXr3m5h8mwCABCQ';
  constructor(private http: HttpClient) {}

  getLeaveTypes(): Observable<any> {
    return this.http.get<any>(this.RootUrl+this.GetLeaveTypeUrl);
  }

  getEmployees():Observable<any> {
    return this.http.get<any>(this.RootUrl+this.GetEmployeeUrl)
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
  getLeaves(): Observable<LeaveData[]> {
    return this.http.get<any>(this.RootUrl + this.GetLeavesUrl).pipe(
      map(response => {
        console.log('API Response:', response);
        return response.data || []; // Adjust based on API response structure
      })
    );
  }
  deleteLeave(leaveId: number): Observable<any> {
    const url = `${this.RootUrl}${this.DeleteLeaveUrl}/${leaveId}`;
    console.log('Delete URL:', url); // Log the URL to check if it's valid
    return this.http.delete(url);
  }
  
  getData(pageIndex: number, pageSize: number, filter: string, sortColumn: string, sortDirection: string): Observable<PaginatedResponse<LeaveData>> {
    return this.getLeaves().pipe(
      map((data: LeaveData[] | null | undefined) => {
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
