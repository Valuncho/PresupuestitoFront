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
import { SupplierRequest } from '../request/supplierRequest';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  //Properties
  private http = inject(HttpClient);
  private modal = inject(ModalService);
  private error = inject(ErrorControllerService);
  private notification = inject(NotificationService);


  //METODOS HTTP ----------------------------------------------------------------------------------------------
  
  /**
   * Retorna todos los proveedores disponibles guardados.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns Un array de proveedores como un observable.
   */
  getSuppliers() : Observable<any[]> {
    return this.http.get<any[]>(API_URL+ENDPOINTS.suppliers.getAll).pipe(      
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
  getSupplierById(idSupplier : number) : Observable<any> {
    const url = API_URL+ENDPOINTS.clients.getById.replace(':id', idSupplier.toString());
    return this.http.get<any>(url).pipe(
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
  postSupplier(supplier: SupplierRequest){
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
  putSupplier(supplier: SupplierRequest) {
    const url = API_URL+ENDPOINTS.suppliers.update.replace(':id', supplier.supplierId!.toString());
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
    return this.http.patch(url,idSupplier).pipe(
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
