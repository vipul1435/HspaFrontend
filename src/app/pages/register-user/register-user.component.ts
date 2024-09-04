import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import * as alertify from "alertifyjs"
import { Router, RouterLink } from '@angular/router';
import { RegisterUser } from '../../model/User';

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
    private userService:UserService,
    private router:Router
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

  registerUser!:RegisterUser;
  onSubmit(){
    // Object.assign(
    this.registerUser = {
      UserName: this.userName?.value,
      Email:this.email?.value,
      Password:this.password?.value
    }
    // );
    // console.log(this.registerUser)
    this.userService.RegisterUserMethod(this.registerUser).subscribe({
      next:(response) => {
        localStorage.setItem('Token',response.token);
        localStorage.setItem('Email',response.email);
        localStorage.setItem('Id',`${response.id}`);
        alertify.success("User Register successfully");
        this.router.navigate(["/"]);
      }
    });
  }

  
  

}
