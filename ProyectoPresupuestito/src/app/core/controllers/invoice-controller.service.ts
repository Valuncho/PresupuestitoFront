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