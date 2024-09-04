import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { PropertyDetailResponse } from '../../interfaces/Iproperty.interface';
import { OverviewComponent } from './propperty-detail-components/overview/overview.component';
import { PhotosComponent } from './propperty-detail-components/photos/photos.component';
import { Photo } from '../../interfaces/IPhoto.interface';
import { PhotoEditorComponent } from './propperty-detail-components/photo-editor/photo-editor.component';
import { LoginStatusService } from '../../services/loginStatus.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [OverviewComponent, PhotosComponent, PhotoEditorComponent, NgIf],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {

  public propertyId!: number ;

  public property!:PropertyDetailResponse | null;

  public primaryImage:string = "assets/house2.jpg";

  loginStatus:boolean = false;

  userId:number = 0;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private propertyService:PropertyService,
    private loginStatusService:LoginStatusService
  ){}

  public photos:Array<Photo> = []
  ngOnInit(): void {
    this.propertyId = +this.route.snapshot.params['id'];

    this.loginStatusService.loginStatus.subscribe(state=>{
      this.loginStatus = state;
      if(state){
         var id = localStorage.getItem("Id");
         if(id){
          this.userId = +id;
         }
      } else {
        this.userId = 0;
      }
    })

    this.propertyService.getPropertyDetail(this.propertyId).subscribe(res=>{
      this.property = res;
      this.photos = [...this.property.photos]
      console.log(this.property);

      var photo = this.photos.find(photo=>Boolean(photo.isPrimary)===true);
      
      if(photo){
        this.primaryImage = photo.imageUrl;
      }

    });
  }

  changePrimaryPhoto(mainPhotoUrl:string){
    this.primaryImage = mainPhotoUrl;
  }
 
}
