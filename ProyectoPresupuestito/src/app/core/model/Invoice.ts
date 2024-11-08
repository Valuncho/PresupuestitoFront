import { Payment } from "./Payment";
import { Item } from "./Item";
import { InvoiceItem } from "./invoiceItem";

export interface Invoice
{
  invoiceId : number;
    date : Date;
    payments : Payment[];
  isPaid: boolean;
  oInvoiceItems: InvoiceItem[];
  supplierId?:0;
}
