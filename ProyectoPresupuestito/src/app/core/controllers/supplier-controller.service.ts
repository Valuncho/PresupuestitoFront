import { Injectable } from '@angular/core';
import { SupplierHistory } from '../model/SupplierHistory';
import { BehaviorSubject, Observable } from 'rxjs';
import { Supplier } from '../model/Supplier';
import { InvoiceControllerService } from './invoice-controller.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierControllerService {

  constructor() { }

  //Selected entities
  private supplierHistory: BehaviorSubject<SupplierHistory | undefined> = new BehaviorSubject<SupplierHistory | undefined>(undefined);
  
  public getSupplierHistory() : Observable<SupplierHistory | undefined>{
    return this.supplierHistory.asObservable();
  }

  public setSupplierHistory(supplierHistory: SupplierHistory) {
    this.supplierHistory.next(supplierHistory);
  }

  setSupplier(supplier : Supplier){
    let currentHistory = this.supplierHistory.getValue();
    currentHistory!.oSupplier = supplier;
    this.setSupplierHistory(currentHistory!);
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

  getEmptySupplier(): Supplier {
    return  {
      idSupplier: 0,
      oPerson: {
        idPerson: 0,
        name: '',
        lastName: '',
        direction: '',
        phoneNumber: '',
        mail: '',
        dni: '',
        cuit: '',
      },
      note:""
    };
}

getEmptyHistory() : SupplierHistory{
  return {
    idSupplierHistory: 0,
    oSupplier : this.getEmptySupplier(),
    invoices : []
  }
}
}
