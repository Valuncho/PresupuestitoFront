import { Payment } from "./Payment";
import { Item } from "./Item";
import { InvoiceItem } from "./invoiceItem";
import {Supplier} from "./Supplier";

export interface Invoice {
  date: Date;
  invoiceId: number;
  isPaid: boolean;
  oInvoiceItems: InvoiceItem[];
  oSupplier?: Supplier;
  payments: Payment[];
  supplierId?: 0;
}
