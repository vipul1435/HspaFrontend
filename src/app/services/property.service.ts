import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyDetailResponse } from '../interfaces/Iproperty.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(  private http:HttpClient) { }

  getPropertiesList(SellOrRent:string):Observable<any>{
    return this.http.get<Observable<any>>(`https://localhost:44365/api/Property/type/${SellOrRent}`);
  }

  getPropertyDetail(id:number):Observable<PropertyDetailResponse>{
    return this.http.get<PropertyDetailResponse>(`https://localhost:44365/api/Property/property/${id}`);
  }

}
