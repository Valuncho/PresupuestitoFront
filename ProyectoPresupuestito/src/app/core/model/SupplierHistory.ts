import { Invoice } from "./Invoice";
import { Supplier } from "./Supplier";

export interface SupplierHistory
{
    idSupplierHistory : number;
    oSupplier : Supplier;
    invoices : Invoice[]
}