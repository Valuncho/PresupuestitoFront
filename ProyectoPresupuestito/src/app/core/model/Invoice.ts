import { Payment } from "./Payment";
import { Item } from "./Item";
import { InvoiceItem } from "./invoiceItem";

export interface Invoice
{
    idInvoice : number;
    date : Date;
    payments : Payment[];
    isPaid: boolean;
    materials: InvoiceItem[];
}