import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private permissions: string[] = [];

  constructor(private http: HttpClient) {}

  fetchPermissions() {
    return this.http.get<string[]>(`https://your-api-url.com/api/user/permissions`);
  }

  setPermissions(permissions: string[]): void {
    this.permissions = permissions;
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  getPermissions(): string[] {
    return this.permissions;
  }
}
