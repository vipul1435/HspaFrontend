import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../../../interfaces/IPhoto.interface';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent implements OnInit {

  @Input() photos:Array<Photo> =[]

  ngOnInit(): void {

  }

}
