import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import * as alertify from "alertifyjs"
import { LoginResponse } from '../../model/User';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule, RouterLink],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent implements OnInit{

  loginForm!:FormGroup;

  constructor(private fb:FormBuilder,
    private userService:UserService,
  ){}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required,Validators.minLength(8)]]
    })
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password')
  }

  onSubmit(){
  
    let user = {
      Email:this.email?.value,
      Password:this.password?.value,
    }

    console.log(user);
    this.userService.LoginUserMethod(user).subscribe(
     {next: (response) => {
        console.log(response);
        localStorage.setItem('Token',response.token);
        localStorage.setItem('Email',response.email);
        alertify.success("User Logged in successfully.");
      }, 
     error: (error) =>{
        console.log(error)
      },
      complete:()=>console.log("done")
    }
    )
  }
}
