import { Photo } from "./IPhoto.interface";

export interface PropertyDetailResponse {
    id: number;
    name: string | null;
    address: string;
    ageOfProperty: number;
    availableFrom: Date; 
    bhk: number;
    builtArea: number;
    carpetArea: number;
    city: string;
    country: string;
    description: string;
    floor: number;
    funrnishedType: string;
    gatedCommunity: string;
    landmark: string;
    mainEntrance: string;
    maintenance: number;
    numberOfFloors: number;
    price: number;
    propertyType: string;
    readyToMove: string;
    security: number;
    sellOrRent: string;
    photos:Photo[];
    postedBy:number  
}

export interface ProppretyDetailRequest{
    SellOrRent: string;
    Bhk: number;
    Name: string;
    PropertyTypeId: number;
    FunrnishedTypeId: number;
    CityId: number;
    Price: number;
    Maintenance: number;
    Security: number;
    BuiltArea: number;
    CarpetArea: number;
    Address: string;
    Floor: number;
    NumberOfFloors: number;
    Landmark: string;
    ReadyToMove: string;
    AvailableFrom: Date;
    AgeOfProperty: number;
    GatedCommunity: string;
    MainEntrance: string;
    Description: string;
    PostedBy: number;      
}