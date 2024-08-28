import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {

  public propertyId!: number;

  constructor(
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(): void {
    this.propertyId = +this.route.snapshot.params['id'];

    console.log(this.propertyId)
  }

  goBack(){
    this.router.navigate(['/']);
  }

  goToNext(){
    this.propertyId+=1;
    this.router.navigate(['property-detail/'+this.propertyId])
  }
}
