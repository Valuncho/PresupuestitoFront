import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from '../model/Invoice';
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
  
  private invoice: BehaviorSubject<Invoice | undefined> = new BehaviorSubject<Invoice | undefined>(undefined);

  public getInvoice() : Observable<Invoice | undefined>{
    return this.invoice.asObservable();
  }

  public setInvoice(invoice: Invoice) {
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

getEmptyInvoice(): Invoice{
  return {
    idInvoice:0,
    date: new Date(0),
    isPaid: false,
    materials:[],
    payments:[]
  }
}

}