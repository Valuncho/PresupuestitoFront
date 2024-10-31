import { inject, Injectable } from '@angular/core';
import { Work } from '../model/Work';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL, ENDPOINTS } from '../endpoints';
import { ModalService } from '../utils/modal.service';
import { ErrorControllerService } from '../utils/error-controller.service';
import { NotificationService } from '../utils/notification.service';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
/**
 * @class
 * 
 * Servicio de la entidad trabajo, para comunicarse con el backend, gestionando errores y aciertos.
 *  
 */

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  //Util
  private http = inject(HttpClient);  
  private modal = inject(ModalService);
  private error = inject(ErrorControllerService);
  private notification = inject(NotificationService);

  private estados : string[] = ['Presupuestado','Pendiente de aprobación','Aprobado','En proceso','Entregado','Cancelado'];
  
  /**
   * Retorna todos los trabajos disponibles guardados.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns Un array de trabajos como un observable.
   */
  getWorks() : Observable<Work[]> {
    return this.http.get<Work[]>(API_URL+ENDPOINTS.works.getAll).pipe(      
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    }));   
  }
  /**
   * Retorna al trabajo solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idWork id del trabajo solicitado.
   * @returns Un trabajo como un observable.
   */
  getWorkById(idWork : number) : Observable<Work> {
    const url = API_URL+ENDPOINTS.works.getById.replace(':id', idWork.toString());
    return this.http.get<Work>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }
  /**
   * Método para crear un trabajo nuevo.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param work trabajo a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
  postWork(work: Work){
    const url = API_URL+ENDPOINTS.works.post;
    return this.http.post(url,work).pipe(
      tap(() => {
        this.notification.showNotification("¡Trabajo guardado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }
  /**
   * Método para actualizar información de un trabajo existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param work trabajo actualizado.
   * @returns un observable de tipo objeto
   */
  putWork(work: Work) {
    const url = API_URL+ENDPOINTS.works.update.replace(':id', work.idWork.toString());
    return this.http.put(url,work).pipe(
      tap(() => {
        this.notification.showNotification("¡Trabajo editado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }
  
   /**
   * Método para marcar como borrado a un trabajo existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idWork id del trabajo a eliminar.
   * @returns un observable de tipo objeto
   */
   deleteWork(idWork: number) {
    const url = API_URL+ENDPOINTS.works.delete.replace(':id', idWork.toString());
    return this.http.patch(url,idWork).pipe(
      tap(() => {
        this.notification.showNotification("¡Trabajo eliminado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

  getEstados(){
    return this.estados;
  }



}
