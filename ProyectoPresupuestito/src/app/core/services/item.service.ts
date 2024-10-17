import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ErrorControllerService } from '../utils/error-controller.service';
import { ModalService } from '../utils/modal.service';
import { NotificationService } from '../utils/notification.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { API_URL, ENDPOINTS } from '../endpoints';
import { Item } from '../model/Item';
/**
 * @class
 * 
 * Servicio de la entidad item, para comunicarse con el backend, gestionando errores y aciertos.
 *  
 */
@Injectable({
  providedIn: 'root'
})
export class ItemService {
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
  getItems() : Observable<Item[]> {
    const url = API_URL+ENDPOINTS.items.getAll;
    return this.http.get<Item[]>(url).pipe(      
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    }));   
  }

   /**
   * Retorna al item solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idItem id del item solicitado.
   * @returns Un item como un observable.
   */
   getItemById(idItem : number) : Observable<Item> {
    const url = API_URL+ENDPOINTS.items.getById.replace(':id', idItem.toString());
    return this.http.get<Item>(url).pipe(
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
   * @param item item a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
   postItem(item: Item, idWork : number){
    const url = API_URL+ENDPOINTS.items.post.replace(':idWork', idWork.toString());
    return this.http.post(url,item).pipe(
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
   * @param item item actualizado.
   * @returns un observable de tipo objeto
   */
    putItem(item: Item) {
      const url = API_URL+ENDPOINTS.items.update.replace(':id', item.idItem.toString());;
      return this.http.put(url,item).pipe(
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
   * @param idItem id del item a eliminar.
   * @returns un observable de tipo objeto
   */
  deleteItem(idItem: number) {
    const url = API_URL+ENDPOINTS.items.delete.replace(':id', idItem.toString());
    return this.http.patch(url,idItem).pipe(
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
