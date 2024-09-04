import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyDetailResponse, ProppretyDetailRequest } from '../interfaces/Iproperty.interface';
import { Photo } from '../interfaces/IPhoto.interface';

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

  addPropertyDetail(property:ProppretyDetailRequest):Observable<any>{
    const httOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      })
    }
    return this.http.post<any>("https://localhost:44365/api/Property/add",property,httOptions);
  }

  setPrimaryPhoto(id:number, publicId:string):Observable<any>{
    const httOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      })
    }
    return this.http.post<any>(`https://localhost:44365/api/Property/set-primary-photo/${id}/${publicId}`,{},httOptions);
  }

  deletePhoto(id:number, publicId:string):Observable<any>{
    const httOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      })
    }
    return this.http.delete<any>(`https://localhost:44365/api/Property/delete-photo/${id}/${publicId}`,httOptions);
  }

  uploadPhoto(id:number,image:File):Observable<Photo>{
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<Photo>(`https://localhost:44365/api/Property/add/upload/${id}`,formData);
  }

}
