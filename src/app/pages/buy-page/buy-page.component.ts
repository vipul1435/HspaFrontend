import { Component } from '@angular/core';
import { PropertyListComponent } from '../../property/property-list/property-list.component';

@Component({
  selector: 'app-buy-page',
  standalone: true,
  imports: [PropertyListComponent],
  templateUrl: './buy-page.component.html',
  styleUrl: './buy-page.component.css'
})
export class BuyPageComponent {
  buySell:string = "Sell";
}
