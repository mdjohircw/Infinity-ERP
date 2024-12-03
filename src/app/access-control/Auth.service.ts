import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Router } from '@angular/router';

interface LoginResponse {
  statusCode: number;
  message: string;
  accessToken: string;
  data: UserData;
}

interface UserData {
  userId: number;
  name: string;
  userName: string;
  userPassword: string;
  userImage: string;
  firstName: string;
  lastName: string;
  userRoleID: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  email: string;
  isGuestUser: boolean;
  empId: string;
  deleted: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  additionalPermissions: string;
  removedPermissions: string;
  dptId: string | null;
  dptName: string | null;
  dsgName: string | null;
  dsgId: string | null;
  roleId: string | null;
  roleName: string | null;
  gId: string | null;
  sftId: string | null;
  dataAccessLevel: string | null;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://localhost:7220/api/LogIn/Login?CompanyId=0001'; // Replace with your API URL

  constructor(private http: HttpClient,private router: Router) {}
  loginUser(credentials: { userName: string; userPassword: string }) {
    this.http.post<LoginResponse>(this.apiUrl, credentials).subscribe(
      (response) => {
        console.log('Login successful:', response.message);
        
        const userData = response.data;
        console.log('User Data:', userData);
        console.log(userData.userId);
        console.log(response.accessToken)
        // Store user data in localStorage

        sessionStorage.setItem('token', response.accessToken);     
        sessionStorage.setItem('userData', JSON.stringify(userData));     
        sessionStorage.setItem('useId', userData.userId.toString());     
        sessionStorage.setItem('userName', (userData.userName));     
        sessionStorage.setItem('EmpId', (userData.empId));     
        sessionStorage.setItem('dsgId', userData.dsgId != null ? userData.dsgId.toString() : '');
        sessionStorage.setItem('dsgName', userData.dsgName != null ? userData.dsgName.toString() : '');
        sessionStorage.setItem('dptId', userData.dptId != null ? userData.dptId.toString() : '');
        sessionStorage.setItem('dptName', userData.dptName != null ? userData.dptName.toString() : '');
    
        },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
  


  

  saveToken(token: string): void {
    localStorage.setItem('authToken', token); 
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']); 
  }


}
