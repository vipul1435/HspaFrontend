import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertyInter } from '../interfaces/property-data.interface';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http:HttpClient) {
   }

  GetPropertyList(){
    return  this.http.get<Array<PropertyInter>>('data/properties.json')
  }

}
