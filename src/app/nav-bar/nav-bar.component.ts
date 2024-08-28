import {NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
export class NavBarComponent {
  isloggedinUser:boolean = false;

  changeStatus(){
    this.isloggedinUser = !this.isloggedinUser;
  }

  show:String="";
  handleCursorIn(){
    this.show="show"
  }

  handleCurserOut(){
    this.show="";
  }

  
}
