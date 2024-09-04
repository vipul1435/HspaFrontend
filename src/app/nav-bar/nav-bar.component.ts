import {NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginStatusService } from '../services/loginStatus.service';
import * as alertify from "alertifyjs";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive, 
    NgIf,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit{
  isUserLoggedIn:boolean = false;

  constructor(
    private loginStatusService:LoginStatusService
  ){

  }

  ngOnInit(): void {
    this.loginStatusService.loginStatus.subscribe(state=>{
      this.isUserLoggedIn = state;
    })
  }


  show:String="";
  handleCursorIn(){
    this.show="show"
  }

  handleCurserOut(){
    this.show="";
  }

  logoutUser(){
    localStorage.clear();
    this.loginStatusService.updateState(false);
    alertify.success("Log out successfully")
  }
  
}
