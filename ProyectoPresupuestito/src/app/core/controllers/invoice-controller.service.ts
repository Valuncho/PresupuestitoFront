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

  private invoice: BehaviorSubject<InvoiceRequest | undefined> = new BehaviorSubject<InvoiceRequest | undefined>(undefined);

  public getInvoice() : Observable<InvoiceRequest | undefined>{
    return this.invoice.asObservable();
  }

  public setInvoice(invoice: InvoiceRequest) {
    this.invoice.next(invoice);
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

}
