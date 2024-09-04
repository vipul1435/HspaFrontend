import { NgFor, NgIf } from '@angular/common';
import { Component, numberAttribute, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyInter } from '../../interfaces/property-data.interface';
import { PropertyCardComponent } from '../../property/property-card/property-card.component';
import { GetCitiesService } from '../../services/get-cities.service';
import { GetFurnishedTypeService } from '../../services/get-furnished-type.service';
import { GetProppertyTypeService } from '../../services/get-propperty-type.service';
import { IFurnishedType } from '../../interfaces/furnishedType.interface';
import { IPropertyType } from '../../interfaces/proppertyType.interface';
import { ProppretyDetailRequest } from '../../interfaces/Iproperty.interface';
import { PropertyService } from '../../services/property.service';
import * as alertify from "alertifyjs";

@Component({
  selector: 'app-list-property-page',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, NgFor, PropertyCardComponent],
  templateUrl: './list-property-page.component.html',
  styleUrl: './list-property-page.component.css'
})
export class ListPropertyPageComponent implements OnInit {
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isUploading:boolean = false;

  propertyDataForm!: FormGroup;

  propertyType: Array<IPropertyType> = [];

  furnishTypeData: Array<IFurnishedType> = [];

  mainEntryData: Array<string> = ['East', 'West', 'North', 'South'];

  propertyDetailRequest:ProppretyDetailRequest = {
    SellOrRent: '',
    Bhk: 0,
    Name: '',
    PropertyTypeId: 1,
    FunrnishedTypeId: 1,
    CityId: 1,
    Price: 0,
    Maintenance: 0,
    Security: 0,
    BuiltArea: 0,
    CarpetArea: 0,
    Address: '',
    Floor: 0,
    NumberOfFloors: 0,
    Landmark: '',
    ReadyToMove: '',
    AvailableFrom: new Date(),
    AgeOfProperty: 0,
    GatedCommunity: '',
    MainEntrance: '',
    Description: '',
    PostedBy: 1
  };;

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
    private citiesService:GetCitiesService,
    private furnishedTypeService:GetFurnishedTypeService,
    private propertyTypeService:GetProppertyTypeService,
    private propertyService:PropertyService
  ) { }

  ngOnInit(): void {

    this.furnishedTypeService.getFurnishedType().subscribe(res=>{
      this.furnishTypeData = res;
    })

    this.propertyTypeService.getPropertyTypes().subscribe(res=>{
      this.propertyType = res;
    })

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
        propertyTypeId: ['1'],
        funrnishedTypeId: ['1'],
        cityId:["--select-city--"]
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
      image:[null]
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
    if(this.selectedFile){
      this.isUploading=true;
      this.mapResponseData();
      this.propertyService.addPropertyDetail(this.propertyDetailRequest).subscribe({
        next: (response)=>{    
          console.log(response);     
         this.uploadPhoto(response.id)        
        },
        error:error=>{
          this.isUploading=false
        },
      })
    } else {
      alertify.error("Please select a photo");
    }
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

  mapResponseData(){
    this.propertyDetailRequest.SellOrRent = this.basicInfo?.value["sellOrRent"];
    this.propertyDetailRequest.Bhk = Number(this.basicInfo?.value["bhk"]);
    this.propertyDetailRequest.Name = this.basicInfo?.value["name"];
    this.propertyDetailRequest.PropertyTypeId = Number(this.basicInfo?.value["propertyTypeId"]);
    this.propertyDetailRequest.FunrnishedTypeId = Number(this.basicInfo?.value["funrnishedTypeId"]);
    if(Number.isNaN(this.basicInfo?.value["cityId"])){
      this.propertyDetailRequest.CityId = 1;
    } else {
      this.propertyDetailRequest.CityId = Number(this.basicInfo?.value["cityId"]);
    }
    this.propertyDetailRequest.Price = Number(this.pricingAndArea?.value["price"]);
    this.propertyDetailRequest.Maintenance = Number(this.pricingAndArea?.value["maintenance"]);
    this.propertyDetailRequest.Security = Number(this.pricingAndArea?.value["security"]);
    this.propertyDetailRequest.BuiltArea = Number(this.pricingAndArea?.value["builtArea"]);
    this.propertyDetailRequest.CarpetArea = Number(this.pricingAndArea?.value["carpetArea"]);
    this.propertyDetailRequest.Address = this.addressAndContact?.value["address"];
    this.propertyDetailRequest.Floor = Number(this.addressAndContact?.value["floor"]);
    this.propertyDetailRequest.NumberOfFloors = Number(this.addressAndContact?.value["numberOfFloors"]);
    this.propertyDetailRequest.Landmark = this.addressAndContact?.value["landmark"];
    this.propertyDetailRequest.ReadyToMove = this.otherDetails?.value["readyToMove"];
    this.propertyDetailRequest.AvailableFrom = new Date(this.otherDetails?.value["availableFrom"]);
    this.propertyDetailRequest.AgeOfProperty = Number(this.otherDetails?.value["ageOfProperty"]);
    this.propertyDetailRequest.GatedCommunity = this.otherDetails?.value["gatedCommunity"];
    this.propertyDetailRequest.MainEntrance = this.otherDetails?.value["mainEntreance"];
    this.propertyDetailRequest.Description = this.otherDetails?.value["description"];
    this.propertyDetailRequest.PostedBy = 1;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Create a FileReader to read the image file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  uploadPhoto(Id:number){
    if(this.selectedFile){
      this.propertyService.uploadPhoto(Id, this.selectedFile).subscribe({
        next: response => {
          alertify.success("Property Listed successfully");
        },
        error:error=>{
          this.isUploading=false
        },
        complete:()=> {
          this.isUploading=false;
        },
      }); 
    }
  }


}
