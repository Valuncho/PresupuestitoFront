import { Material } from "./Material";

export interface InvoiceItem
{
    idInvoiceItem : number;
    material : Material;
    quantity : number;
    price : number;
}