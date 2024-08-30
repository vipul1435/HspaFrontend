import { Component, Input, input } from '@angular/core';
import { PropertyDetailResponse } from '../../../../interfaces/Iproperty.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  @Input() property!:PropertyDetailResponse|null;
}
