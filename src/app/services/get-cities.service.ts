import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCitiesService {

  constructor(
    private http:HttpClient
  ) { }

  getCities(): Observable<string[]>{
    return this.http.get<string[]>("https://localhost:44365/api/City");
  }
}
