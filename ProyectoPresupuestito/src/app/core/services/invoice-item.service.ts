import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { API_URL, ENDPOINTS } from '../endpoints';
import { Item } from '../model/Item';
import { ErrorControllerService } from '../utils/error-controller.service';
import { ModalService } from '../utils/modal.service';
import { NotificationService } from '../utils/notification.service';
import { InvoiceItem } from '../model/invoiceItem';

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemService {

  //Util
  private http = inject(HttpClient);  
  private modal = inject(ModalService);
  private error = inject(ErrorControllerService);
  private notification = inject(NotificationService);

  /**
  * Retorna todos los items disponibles.
  * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
  * @returns Un array de items como un observable.
  */
  getInvoiceItems() : Observable<InvoiceItem[]> {
    const url = API_URL+ENDPOINTS.invoiceItem.getAll;
    return this.http.get<InvoiceItem[]>(url).pipe(      
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    }));   
  }

    /**
    * Retorna al item solicitado por id.
    * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
    * @param idInvoiceItem id del item solicitado.
    * @returns Un item como un observable.
    */
    getItemById(idInvoiceItem : number) : Observable<InvoiceItem> {
    const url = API_URL+ENDPOINTS.invoiceItem.getById.replace(':id', idInvoiceItem.toString());
    return this.http.get<InvoiceItem>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

    /**
    * Método para crear un item nuevo.
    * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
    * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
    * @param invoiceItem item a cargar en la base de datos
    * @returns un observable de tipo objeto
    */
    postInvoiceItem(invoiceItem: InvoiceItem, idInvoice : number){
    const url = API_URL+ENDPOINTS.invoiceItem.post.replace(':idInvoice', idInvoice.toString());
    return this.http.post(url,invoiceItem).pipe(
      tap(() => {
        this.notification.showNotification("¡Item guardado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

    /**
    * Método para actualizar información de un item existente.
    * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
    * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
    * @param invoiceItem item actualizado.
    * @returns un observable de tipo objeto
    */
    putInvoiceItem(invoiceItem: InvoiceItem) {
      const url = API_URL+ENDPOINTS.invoiceItem.update.replace(':id', invoiceItem.idInvoiceItem.toString());;
      return this.http.put(url,invoiceItem).pipe(
        tap(() => {
          this.notification.showNotification("¡Item editado con éxito!"); 
        }),
        catchError((error: any, caught: Observable<any>): Observable<any> => {
          this.error.setError(error);
          this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
          return of();
      })
      );   
    }

  /**
    * Método para marcar como borrado a un item existente.
    * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
    * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
    * @param idInvoiceItem id del item a eliminar.
    * @returns un observable de tipo objeto
    */
  deleteInvoiceItem(idInvoiceItem: number) {
    const url = API_URL+ENDPOINTS.items.delete.replace(':id', idInvoiceItem.toString());
    return this.http.patch(url,idInvoiceItem).pipe(
      tap(() => {
        this.notification.showNotification("¡Item eliminado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }
}
