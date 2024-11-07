import { Invoice } from "./Invoice";
import { Supplier } from "./Supplier";

export interface SupplierHistory
{
    supplierHistoryId : number;
    oSupplier : Supplier;
    invoices : any[]
}
