import { Component } from '@angular/core';
import { PropertyListComponent } from '../../property/property-list/property-list.component';

@Component({
  selector: 'app-sell-page',
  standalone: true,
  imports: [PropertyListComponent],
  templateUrl: './sell-page.component.html',
  styleUrl: './sell-page.component.css'
})
export class SellPageComponent {
  buySell:string = "Rent";
}
