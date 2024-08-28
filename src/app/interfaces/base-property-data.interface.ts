import { PropertyInter } from "./property-data.interface";

export interface propertyBaseI extends PropertyInter{
    sellOrRent:String,
    bhk:Number,
    name:String, //need to change
    type:String, //need to change
    furnishedType:String,
    price:Number //need to change
    maintenace:Number,
    security:Number,
    builtArea:Number,
    carpetArea:Number,
    address:String,
    floor:Number,
    numberOfFloors:Number,
    landmark:String,
    readyToMove:String,
    availableFrom:Date,
    ageOfProperty: String,
    gatedCommunity:String,
    mainEntreance:String,
    description:String
}