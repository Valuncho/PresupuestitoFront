import { Injectable, inject, signal } from '@angular/core';
import { Supplier } from '../model/Supplier';
import { SupplierHistory } from '../model/SupplierHistory';
import { BehaviorSubject, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { API_URL, ENDPOINTS } from '../endpoints';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  //Properties
  private http = inject(HttpClient);
  
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

  ]

  //METODOS HTTP ----------------------------------------------------------------------------------------------
  
    /**
     * retorna todos los empleados guardados
     * @returns un array de empleados como un observable
     */
    
    getSuppliers(): Observable<Supplier[]>{
      return this.http.get<Supplier[]>(API_URL+ENDPOINTS.suppliers.getAll);
    }

  /**
   * retorna al empleado solicitado por id 
   * @param idSupplier 
   * @returns un empleado como un observable  
   */
    
    getSupplierById(idSupplier : Number){
        const url = API_URL+ENDPOINTS.suppliers.getById.replace(':id', idSupplier.toString());
        return this.http.get<Supplier>(url);
    }

    /**
     * Envia un objeto empleado
     * @param supplier 
     * @returns Un Observable que emite un array de empleados
     */
    
    postSupplier(supplier : Supplier){
        const url = API_URL+ENDPOINTS.suppliers.post;
        return this.http.post(url,supplier);
    }

    putSupplier(supplier: Supplier) {
      const url = API_URL+ENDPOINTS.suppliers.update;
      return this.http.put(url,supplier);
    }

    /**
     * suspende a un empleado
     * @param Supplier 
     * @returns un observable que emite el empleado actualizado
     */
    
    deleteSupplier(supplier: Supplier){
      const url = API_URL + ENDPOINTS.suppliers.update;
      return this.http.put(url, supplier);
    }

}
