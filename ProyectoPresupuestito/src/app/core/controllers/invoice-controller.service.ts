import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from '../model/Invoice';
import {InvoiceRequest} from "../request/invoiceRequest";
/**
 *
 * @class InvoiceControllerService
 *
 * Clase controller de la entidad invoice para:
 * -Ser pasamanos de información,
 * -Obtener objetos vacios,
 * -Manejar el editado en el formulario.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class InvoiceControllerService {

  private aviso : BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);

  public getAviso() : Observable<boolean>{
    return  this.aviso.asObservable();
  }

  public setAviso(aviso : boolean){
    this.aviso.next(aviso);
  }



  private invoice: BehaviorSubject<InvoiceRequest | undefined> = new BehaviorSubject<InvoiceRequest | undefined>(undefined);
  private invoiceModel: BehaviorSubject<Invoice | undefined> = new BehaviorSubject<Invoice | undefined>(undefined);
  private invoiceId: BehaviorSubject<number > = new BehaviorSubject<number >(0);

  public getInvoiceId(): Observable<number> {
    return this.invoiceId.asObservable();
  }

  public setInvoiceId(invoiceId: number) {
    this.invoiceId.next(invoiceId);

  }
  public getInvoice() : Observable<InvoiceRequest | undefined>{
    return this.invoice.asObservable();
  }

  public setInvoice(invoice: InvoiceRequest) {
    this.invoice.next(invoice);
  }

  public getInvoiceModel() : Observable<Invoice | undefined>{
    return this.invoiceModel.asObservable();
  }

  public setInvoiceModel(invoiceModel: Invoice) {
    this.invoiceModel.next(invoiceModel);
  }
  //Edit
  private editMode : boolean = false;

  setEditMode(option : boolean){
  this.editMode = option;
  }
  getEditMode() : boolean{
  return this.editMode;
  }

 //GetEmptyObjects

getEmptyInvoice(): InvoiceRequest{
  return {
    invoiceId : 0,
    supplierId : 0,
    isPaid : false,
    date : new Date()
  }
}
getEmptyInvoceModel() : Invoice {
    return {
      date: new Date(), invoiceId: 0, isPaid: false, oInvoiceItems: [], payments: [], supplierId: 0

    }
}

}
