import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from '../../../../interfaces/IPhoto.interface';
import { NgFor, NgIf } from '@angular/common';
import { PropertyService } from '../../../../services/property.service';
import * as alertify from "alertifyjs"
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {
  
  @Input() photos:Array<Photo> =[]
  @Input() id!:number

  image = new FormControl();
  selectedFile: File | null = null;

  isUploading:boolean=false;

  @Output() primaryPhotoChangedEvent = new EventEmitter<string>();

  constructor(
    private propertyService:PropertyService
  ) {
  }

  ngOnInit(): void {
    
  }

  primaryPhotoChanged(url:string){
    this.primaryPhotoChangedEvent.emit(url);
  }


  setPrimaryPhoto(Id:number,photo:Photo){
    this.propertyService.setPrimaryPhoto(Id,photo.publicId).subscribe({
      next:response=>{
        alertify.success(response.message);
        console.log(response);
      },
      complete:()=>{
        this.primaryPhotoChanged(photo.imageUrl);
        this.photos.forEach(p=>{
          if(p.isPrimary){ p.isPrimary=false; }
          if(p.publicId==photo.publicId){
            p.isPrimary =true;
          }
        })
      }
    })
  }

  deletePhoto(Id:number, photo:Photo){
    this.propertyService.deletePhoto(Id,photo.publicId).subscribe({
      next:response=>{
        alertify.success(response.message);
        console.log(response);
      },
      complete:()=>{
        this.photos = this.photos.filter(p=>p!=photo);
      }
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadPhoto(Id:number){
    if (this.selectedFile) {
      this.isUploading=true;
      this.propertyService.uploadPhoto(Id, this.selectedFile).subscribe({
        next: response => {
          console.log(response);
          alertify.success("Photo uploaded successfully");
          this.photos.push(response);
        },
        complete:()=>{
          this.isUploading=false;
        }
      });
    } else {
      alertify.error("No file selected");
    }
  
  }

}
