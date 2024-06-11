import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-entry',
  templateUrl: './employee-entry.component.html',
  styleUrl: './employee-entry.component.css'
})
export class EmployeeEntryComponent {
  constructor(private router: Router) {} // Ensure Router is injected

  goToEmployeeList() {
    this.router.navigate(['/Employee-list']); // Navigate to Employee-list route
  }
}
