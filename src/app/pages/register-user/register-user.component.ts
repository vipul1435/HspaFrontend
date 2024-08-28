import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import * as alertify from "alertifyjs"
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ,NgIf, RouterLink],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit{

  registrationForm!:FormGroup;

  constructor(private fb:FormBuilder, 
    private userService:UserService
  ){}

  ngOnInit(): void {
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    //   email: new FormControl(null,[Validators.required,Validators.email]),
    //   password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
    //   Cpassword: new FormControl(null,[Validators.required,Validators.minLength(8)])
    // }, {validators: this.passwordMathchingValidator})

    this.createRegistrationForm();
  }


  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      userName: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      Cpassword: [null, [Validators.required, Validators.minLength(8)]]
    }, { validators: this.passwordMatchingValidator });
  }

  passwordMatchingValidator: ValidatorFn = (fg: AbstractControl): ValidationErrors | null => {
    if (fg instanceof FormGroup) {
      const password = fg.get('password')?.value;
      const confirmPassword = fg.get('Cpassword')?.value;
      return password === confirmPassword ? null : { notMatched: true };
    }
    return null;
  };

  get userName(){
    return this.registrationForm.get('userName');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get password(){
    return this.registrationForm.get('password');
  }

  get Cpassword(){
    return this.registrationForm.get('Cpassword');
  }

  User:any={};
  onSubmit(){
    Object.assign(this.User,this.registrationForm.value);
    this.userService.addUsers(this.User);
    this.registrationForm.reset();
    alertify.success("User reistered successfully.")
  }

  
  

}
