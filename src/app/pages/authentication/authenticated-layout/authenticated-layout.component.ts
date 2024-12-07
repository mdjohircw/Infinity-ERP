import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrl: './authenticated-layout.component.css'
})
export class AuthenticatedLayoutComponent {
  loading: boolean = true;
  constructor(private router: Router){}

  logoutUser() {
    sessionStorage.clear(); // Clear all session data
    this.router.navigate(['/login']); // Redirect to login page
  }
  

}
