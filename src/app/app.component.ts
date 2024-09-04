import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginStatusService } from './services/loginStatus.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavBarComponent, 
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(
    private loginStatusService:LoginStatusService
  ){}

  ngOnInit(): void {
    var token = localStorage.getItem("Token");
    if(token){
      this.loginStatusService.updateState(true);
    }
  }

  title = 'FirstLatest';
}
