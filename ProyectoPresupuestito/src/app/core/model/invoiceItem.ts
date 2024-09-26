import { Material } from "./Material";

export interface InvoiceItem
{
    idInvoiceItem : number;
    oMaterial : Material;
    quantity : number;
    price : number;
}