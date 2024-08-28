import { Component, OnInit } from '@angular/core';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { CommonModule } from '@angular/common';
import { GetDataService } from '../../services/get-data.service';
import { PropertyInter } from '../../interfaces/property-data.interface';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [PropertyCardComponent,CommonModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit {

  properties: Array<PropertyInter>=[]

  constructor(
    private Property:GetDataService, 

  ){}
  
  ngOnInit(): void {
    this.Property.GetPropertyList().subscribe(
      data=>{
        this.properties = data
    }   
  )
  }
}
