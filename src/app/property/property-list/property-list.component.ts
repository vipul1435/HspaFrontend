import { Component, OnInit } from '@angular/core';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { CommonModule } from '@angular/common';
import { GetDataService } from '../../services/get-data.service';
import { PropertyInter } from '../../interfaces/property-data.interface';
import { PropertyService } from '../../services/property.service';

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
    private propertyService:PropertyService
  ){}
  
  ngOnInit(): void {
  //   this.Property.GetPropertyList().subscribe(
  //     data=>{
  //       this.properties = data
  //   }   
  // )
  this.propertyService.getPropertiesList("Sell").subscribe(res=>
  {
    console.log(res)
    this.properties = res
  }
  );
  }
}
