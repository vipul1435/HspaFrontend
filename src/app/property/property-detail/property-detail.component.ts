import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { PropertyDetailResponse } from '../../interfaces/Iproperty.interface';
import { OverviewComponent } from './propperty-detail-components/overview/overview.component';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [OverviewComponent],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {

  public propertyId!: number ;

  public property!:PropertyDetailResponse | null;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private propertyService:PropertyService
  ){}

  ngOnInit(): void {
    this.propertyId = +this.route.snapshot.params['id'];
    this.propertyService.getPropertyDetail(this.propertyId).subscribe(res=>{
      this.property = res;
      console.log(this.property);
    });
  }

  // goBack(){
  //   this.router.navigate(['/']);
  // }

  // goToNext(){
  //   this.propertyId+=1;
  //   this.router.navigate(['property-detail/'+this.propertyId])
  // }
}
