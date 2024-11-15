import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomeValidatio } from '../../custom-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  regForm = new FormGroup({
    userName:new FormControl('',Validators.compose([
      
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
        CustomeValidatio.noWhiteSpace
  
      
    ]),
    CustomeValidatio.userNameExistAsync
  ),
    password : new FormControl('',Validators.required),
  })


  SingUp(){
    console.log(this.regForm)
  }
}
