import { Component } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { PermissionService } from './access-control/permission.service';
import { Router } from '@angular/router';
import { AuthService } from './access-control/Auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title="HRMS";
  constructor (private auth :AuthService,private router: Router){

  }
 
  logout(): void {
    this.auth.logout();
    // Optionally, you could navigate to a login page or perform other actions
  }

}
