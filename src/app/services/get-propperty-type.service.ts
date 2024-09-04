import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPropertyType } from '../interfaces/proppertyType.interface';

@Injectable({
  providedIn: 'root'
})
export class GetProppertyTypeService {

  constructor(private http:HttpClient) { }

  getPropertyTypes():Observable<IPropertyType[]>{
    return this.http.get<IPropertyType[]>("https://localhost:44365/api/PropertyType");
  }
}
