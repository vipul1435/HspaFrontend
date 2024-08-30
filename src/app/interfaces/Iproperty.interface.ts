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
}