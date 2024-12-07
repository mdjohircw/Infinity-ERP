import { Component } from '@angular/core';
import { PermissionService } from './core/services/permission.service';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title="HRMS";
  constructor (private auth :AuthService,private router: Router){

  }
 

  loading: boolean = true;
  logoutUser() {
    sessionStorage.clear(); // Clear all session data
    this.router.navigate(['/login']); // Redirect to login page
  }
}
