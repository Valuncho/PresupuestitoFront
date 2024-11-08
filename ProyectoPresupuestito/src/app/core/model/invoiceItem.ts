import { Material } from "./Material";

export interface InvoiceItem
{
    invoiceId? : number;
    invoiceItemId : number;
    oMaterial : Material;
    quantity : number;
    price : number;
}
