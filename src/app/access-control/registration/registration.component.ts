import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomeValidatio } from '../../custom-validator';
import { AuthService } from '../Auth.service';
import { PermissionService } from '../permission.service';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  regForm!: FormGroup; // Ensure `regForm` is declared and initialized properly

  constructor (private auth:AuthService, private router: Router){}

  ngOnInit(): void {
    // Initialize the form
    this.regForm = new FormGroup({
      userName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
          CustomeValidatio.noWhiteSpace,
        ]),
        CustomeValidatio.userNameExistAsync // Async validator
      ),
      password: new FormControl('', Validators.required),
    });
  }

  login(): void {
    if (this.regForm.valid) {
      // Transform the form value to match the expected structure
      const credentials = {
        userName: this.regForm.get('userName')?.value || '',
        userPassword: this.regForm.get('password')?.value || '',
      };
  
      console.log('Attempting login with credentials:', credentials);
        this.auth.loginUser(credentials);
        this.router.navigate(['/DashBoard']);
    } else {
      console.error('Form is invalid');
    }
  }
  
}