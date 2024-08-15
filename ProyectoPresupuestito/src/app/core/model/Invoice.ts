import { Payment } from "./Payment";
import { Item } from "./Item";

export interface Invoice
{
    idInvoice : number;
    date : Date;
    oPayment : Payment[];
    isPaid: boolean;
    oItems: Item[];
}