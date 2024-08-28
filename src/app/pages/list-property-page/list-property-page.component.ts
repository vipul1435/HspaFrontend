import { NgFor, NgIf } from '@angular/common';
import { Component, numberAttribute, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyInter } from '../../interfaces/property-data.interface';
import { PropertyCardComponent } from '../../property/property-card/property-card.component';
import { GetCitiesService } from '../../services/get-cities.service';

@Component({
  selector: 'app-list-property-page',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, NgFor, PropertyCardComponent],
  templateUrl: './list-property-page.component.html',
  styleUrl: './list-property-page.component.css'
})
export class ListPropertyPageComponent implements OnInit {

  propertyDataForm!: FormGroup;

  propertyType: Array<string> = ['Single', 'Apartment', 'Duplex'];

  furnishTypeData: Array<string> = ['Semi', 'Fully', 'Unfurnished'];

  mainEntryData: Array<string> = ['East', 'West', 'North', 'South'];

  cities: Array<any> = [{
    "id":0,
    "name":"--select-city--"
  }];

  propertyCapturedValues: PropertyInter = {
    Id: 1,
    Name: "",
    Price: 0,
    Type: "Single"
  }

  constructor(
    private fb: FormBuilder,
    private citiesService:GetCitiesService
  ) { }

  ngOnInit(): void {

    this.citiesService.getCities().subscribe(c=>{
      this.cities = [...this.cities,...c]
      console.log(this.cities)
    })

    this.createPropertyDataForm();
    this.propertyDataForm.get('basicInfo')?.get('type')?.valueChanges.subscribe((newValue) => {
      this.propertyCapturedValues.Type = newValue;
      console.log(newValue);
    });
  }

  createPropertyDataForm() {
    this.propertyDataForm = this.fb.group({

      basicInfo: this.fb.group({
        sellOrRent: ['Rent', [Validators.required]],
        bhk: ['1', [Validators.required]],
        name: [null, [Validators.required, Validators.minLength(3)]],
        type: ['Single'],
        furnishedType: ['Fully'],
        city:["--select-city--"]
      }),

      pricingAndArea: this.fb.group({
        price: [null, [Validators.required]],
        maintenance: [null, [Validators.required]],
        security: [null, [Validators.required]],
        builtArea: [null, [Validators.required]],
        carpetArea: [null, [Validators.required]],
      }),

      addressAndContact: this.fb.group({
        address: [null, [Validators.required, Validators.minLength(10)]],
        floor: [null, [Validators.required]],
        numberOfFloors: [null, [Validators.required]],
        landmark: [null, [Validators.required, Validators.minLength(5)]],
      }),

      otherDetails: this.fb.group({
        readyToMove: ['Yes', [Validators.required]],
        availableFrom: [null, [Validators.required]],
        ageOfProperty: [null, [Validators.required]],
        gatedCommunity: ['Yes', [Validators.required]],
        mainEntreance: ['East', [Validators.required]],
        description: [null],
      }),
    })
  }

  get basicInfo() {
    return this.propertyDataForm.get('basicInfo');
  }

  get pricingAndArea() {
    return this.propertyDataForm.get('pricingAndArea');
  }

  get addressAndContact() {
    return this.propertyDataForm.get('addressAndContact');
  }

  get otherDetails() {
    return this.propertyDataForm.get('otherDetails');
  }

  onSubmit() {
    console.log(this.propertyDataForm);
  }

  selectedTab: number = 0;

  selectTab(a: number) {
    this.selectedTab = a;
  }

  navigateTab(a: number) {
    let val = this.selectedTab + a;
    if (val < 0) val = 4;
    if (val > 4) val = 0;
    this.selectedTab = val;
  }
}
