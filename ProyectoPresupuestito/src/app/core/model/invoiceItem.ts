import { Material } from "./Material";

export interface InvoiceItem
{
    idClient : number;
    oMaterial : Material;
    quantity : number;
    price : number;
}