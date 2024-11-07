import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { API_URL, ENDPOINTS } from '../endpoints';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Invoice } from '../model/Invoice';
import { ModalService } from '../utils/modal.service';
import { ErrorControllerService } from '../utils/error-controller.service';
import { NotificationService } from '../utils/notification.service';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';


/**
 * @class invoiceService
 *
 * Servicio de la entidad invoice para comunicarse con el backend, gestionando errores y aciertos.
 *
 */

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  //Properties
  private http = inject(HttpClient);
  private modal = inject(ModalService);
  private error = inject(ErrorControllerService);
  private notification = inject(NotificationService);

  //METODOS HTTP ----------------------------------------------------------------------------------------------

    /**
   * Retorna todos los boletas disponibles guardados.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns Un array de boletas como un observable.
   */
  getInvoices() : Observable<Invoice[]> {
    return this.http.get<Invoice[]>(API_URL+ENDPOINTS.invoices.getAll).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    }));  
  }

  /**
   * Retorna una lista de facturas de un proveedor.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param supplierId id del proveedor.
   * @returns Una lista de facturas como un observable.
   */
  getInvoicesBySupplierId(supplierId : number) : Observable<any> {
    const url = API_URL+ENDPOINTS.invoices.getBySupplierId.replace(':SupplierId', supplierId.toString());
    return this.http.get<any>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );
  }
  /**
   * Retorna una lista de boletas solicitada por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idInvoice id de la boleta solicitado.
   * @returns Una boleta como un observable.
   */
  getInvoiceById(idInvoice : number) : Observable<any> {
    const url = API_URL+ENDPOINTS.invoices.getById.replace(':id', idInvoice.toString());
    return this.http.get<any>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
      })
    );
  }


    /**
   * Método para crear una boleta nueva.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param invoice invoice a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
  postInvoice(invoice: Invoice){
    const url = API_URL+ENDPOINTS.invoices.post;
    return this.http.post(url,invoice).pipe(
      tap(() => {
        this.notification.showNotification("¡boleta guardada con éxito!");
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );  
  }

  /**
   * Método para actualizar información de una boleta existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param invoice invoice actualizado.
   * @returns un observable de tipo objeto
   */
  putInvoice(invoice: Invoice) {
    const url = API_URL+ENDPOINTS.invoices.update;
    return this.http.put(url,invoice).pipe(
      tap(() => {
        this.notification.showNotification("¡Boleta editada con éxito!");
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );  
  }

    /**
   * Método para marcar como borrada a una boleta existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idInvoice id de la boleta a eliminar.
   * @returns un observable de tipo objeto
   */
  deleteInvoice(idInvoice: number) {
    const url = API_URL+ENDPOINTS.invoices.delete;
    return this.http.patch(url,idInvoice).pipe(
      tap(() => {
        this.notification.showNotification("¡boleta eliminada con éxito!");
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );  
  }
}
