import { Injectable, inject, signal } from '@angular/core';
import { Supplier } from '../model/Supplier';
import { SupplierHistory } from '../model/SupplierHistory';
import { BehaviorSubject, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  //Properties
  private suppliers : Supplier[] = [
    {
      idSupplier: 1001,
      note: "hola",
      oPerson: {
          idPerson: 1,
          name: "John",
          lastName: "Doe",
          direction: "123 Main St",
          phoneNumber: "1234567890",
          mail: "johndoe@example.com",
          dni: "123456789",
          cuit: "30-12345678-9"
      }
    },
    {
        idSupplier: 1002,
        note: "hola",
        oPerson: {
            idPerson: 2,
            name: "Jane",
            lastName: "Smith",
            direction: "456 Elm St",
            phoneNumber: "9876543210",
            mail: "janesmith@example.com",
            dni: "987654321",
            cuit: "30-98765432-1"
        }
    }
  ]
  private suppliersHistory : SupplierHistory [] = [
    {
      idSupplierHistory: 1,
      oSupplier: this.suppliers[0]
    },
    {
      idSupplierHistory: 2,
      oSupplier: this.suppliers[1]
    }

  ]
  private SupplierSeleccionado : Supplier = this.getEmptySupplier();

  private _suppliersSubject = new BehaviorSubject<Supplier[]>([]);
  private _selectedSupplierSubject = new BehaviorSubject<Supplier>(this.SupplierSeleccionado);

  constructor() {
    this._suppliersSubject.next(this.suppliers);
  }
 
  //Metodos que se conectarian con el back
  getSuppliers(){
    
  }
  getSupplierById(supplierId: number): Supplier | undefined {
    return this.suppliers.find(supplier => supplier.idSupplier === supplierId);
  }
  
  postSupplier(supplier : Supplier) : number{
    //peticion post al back
    let id = Math.floor(Math.random() * 91) + 10;
    console.log('Peticion post exitosa');
    console.log('Nuevo id' + id);
    return id;
  }

  putSupplier(supplier : Supplier){
    //peticion post al back
    console.log('Peticion put exitosa');
    console.log(supplier);
  }

  deleteSupplier(supplierId : number){
    console.log('Peticion delete exitosa');
    console.log('Cliente eliminado con id' + supplierId);
  }


  //Metodos propios del front
  getEmptySupplier() : Supplier{
    
    const emptySupplier: Supplier = {
      idSupplier: 0,
      note: '',
      oPerson: {
        idPerson: 0,
        name: '',
        lastName: '',
        direction: '',
        phoneNumber: '',
        mail: '',
        dni: '',
        cuit: ''
      }
    };
    return emptySupplier;
  }
  
  get supplierss(){
    return this._suppliersSubject.asObservable();
  }
  
  getSupplierHistory(supplierId : number) : SupplierHistory{
    return this.suppliersHistory.find(history => history.oSupplier.idSupplier === supplierId)!;
  }

  get selectedSupplier(){
    return this._selectedSupplierSubject.asObservable();
  }

  setSelectedSupplier(supplierId: number){
    this.SupplierSeleccionado = this.getSupplierById(supplierId)!;
    this._selectedSupplierSubject.next(this.SupplierSeleccionado);
    
  }
  resetSelectedSupplier(){
    this.SupplierSeleccionado = this.getEmptySupplier();
    this._selectedSupplierSubject.next(this.SupplierSeleccionado); 
  }

  //Metodos que se conectan con los componentes
  handleGetSupplier(){
  }

  addNewSupplier(supplier : Supplier){
    this.suppliers.push(supplier);
    this._suppliersSubject.next(this.suppliers);
  }

  handlePostSupplier(supplier : Supplier){
    const id = this.postSupplier(supplier);
    supplier.idSupplier = id;
    this.addNewSupplier(supplier);
    const emptyHistory : SupplierHistory = {
      idSupplierHistory: id,
      oSupplier: supplier,
    }
    this.suppliersHistory.push(emptyHistory);
  }

  handleUpdateSupplier(supplier : Supplier){
    this.putSupplier(supplier);
  }

  handleDeleteSupplier(supplierId : number){
    this.suppliers = this.suppliers.filter((supplier)=> supplier.idSupplier !== supplierId);
    this._suppliersSubject.next(this.suppliers);
    this.deleteSupplier(supplierId);
  }

}
