import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  constructor(private router: Router) {} // Ensure Router is injected

  goToEmployeeEntry() {
    this.router.navigate(['/Employee-entry']); // Navigate to Employee-entry route
  }
}
