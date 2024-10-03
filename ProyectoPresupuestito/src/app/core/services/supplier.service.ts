import { Injectable, inject, signal } from '@angular/core';
import { Supplier } from '../model/Supplier';
import { SupplierHistory } from '../model/SupplierHistory';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { API_URL, ENDPOINTS } from '../endpoints';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { ModalService } from '../utils/modal.service';
import { ErrorControllerService } from '../utils/error-controller.service';
import { NotificationService } from '../utils/notification.service';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  //Properties
  private http = inject(HttpClient);
  private modal = inject(ModalService);
  private error = inject(ErrorControllerService);
  private notification = inject(NotificationService);
  
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
   * Retorna todos los proveedores disponibles guardados.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns Un array de proveedores como un observable.
   */
  getSuppliers() : Observable<Supplier[]> {
    return this.http.get<Supplier[]>(API_URL+ENDPOINTS.suppliers.getAll).pipe(      
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    }));   
  }

  /**
   * Retorna al proveedor solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idSupplier id del proveedor solicitado.
   * @returns Un proveedor como un observable.
   */
  getSupplierById(idSupplier : number) : Observable<Supplier> {
    const url = API_URL+ENDPOINTS.clients.getById.replace(':id', idSupplier.toString());
    return this.http.get<Supplier>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

    /**
   * Método para crear un proveedor nuevo.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param supplier proveedor a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
  postSupplier(supplier: Supplier){
    const url = API_URL+ENDPOINTS.suppliers.post;
    return this.http.post(url,supplier).pipe(
      tap(() => {
        this.notification.showNotification("¡Proveedor guardado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

    /**
   * Método para actualizar información de un proveedor existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param supplier proveedor actualizado.
   * @returns un observable de tipo objeto
   */
  putSupplier(supplier: Supplier) {
    const url = API_URL+ENDPOINTS.suppliers.update;
    return this.http.put(url,supplier).pipe(
      tap(() => {
        this.notification.showNotification("¡Proveedor editado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

    /**
   * Método para marcar como borrado a un proveedor existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idSupplier id del proveedor a eliminar.
   * @returns un observable de tipo objeto
   */
  deleteSupplier(idSupplier: number) {
    const url = API_URL+ENDPOINTS.suppliers.delete;
    return this.http.put(url,idSupplier).pipe(
      tap(() => {
        this.notification.showNotification("¡Proveedor eliminado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

  /**
   * Del backend pido la ficha del proveedor.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns devuelve la ficha del proveedor con su presupuesto y el cliente.
   */
  getSupplierHistoryById(idSupplierHistory : number) : Observable<SupplierHistory> {
    const url = API_URL+ENDPOINTS.supplierHistories.getById.replace(':id', idSupplierHistory.toString());
    return this.http.get<SupplierHistory>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

}
