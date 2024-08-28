import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, LoginUser } from '../model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

    LoginUserMethod(user:any):Observable<LoginResponse>{
      return this.http.post<LoginResponse>("https://localhost:44365/api/Account/login",user);
    }
    addUsers(user:any){
      let users = [];
      let preSavedUsers = localStorage.getItem('Users');
      if(preSavedUsers){
        users = JSON.parse(preSavedUsers);
        users = [user, ...users];
        } else{
          users = [user];
          }
          
          localStorage.setItem('Users',JSON.stringify(users));
          }
          
          /* Login for storing data in Local storage and fetch from it 
  loginUser(user:any) : boolean {
    let preSavedUsers = localStorage.getItem('Users');
    if(preSavedUsers){
      let users = JSON.parse(preSavedUsers);
      let res = users.find((p: any) =>{
        return (user.email===p.email && user.password===p.password);
      });
      if(res){
        return true;
      } else {
        return false;
      }

    }
    return false;
  }
    */
}
