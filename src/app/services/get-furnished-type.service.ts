import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFurnishedType } from '../interfaces/furnishedType.interface';

@Injectable({
  providedIn: 'root'
})
export class GetFurnishedTypeService {

  constructor(private http:HttpClient) {  }
  getFurnishedType():Observable<IFurnishedType[]>{
    return this.http.get<IFurnishedType[]>("https://localhost:44365/api/FurnishedType");
  }
}
