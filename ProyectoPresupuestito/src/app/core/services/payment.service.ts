import { inject, Injectable } from '@angular/core';
import { Payment } from '../model/Payment';
import { API_URL, ENDPOINTS } from '../endpoints';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { ModalService } from '../utils/modal.service';
import { ErrorControllerService } from '../utils/error-controller.service';
import { NotificationService } from '../utils/notification.service';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
/**
 * @class PaymentService
 * 
 * Servicio de la entidad cliente para comunicarse con el backend, gestionando errores y aciertos.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);
  private modal = inject(ModalService);
  private error = inject(ErrorControllerService);
  private notification = inject(NotificationService);

  constructor() { 
  
  }

  /**
   * Retorna todos los pagos disponibles guardados.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns Un array de pagos como un observable.
   */
  getPayments() : Observable<Payment[]> {
    return this.http.get<Payment[]>(API_URL+ENDPOINTS.payments.getAll).pipe(      
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })); 
  }

  

  /**
   * Retorna al pago solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idPayment id del pago solicitado.
   * @returns Un pago como un observable.
   */
  getPaymentById(idPayment : number) : Observable<Payment> {
    const url = API_URL+ENDPOINTS.payments.getById.replace(':id', idPayment.toString());
    return this.http.get<Payment>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

  /**
   * Método para crear un pago nuevo.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param payment pago a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
  postPayment(payment: Payment){
    const url = API_URL+ENDPOINTS.payments.post;
    return this.http.post(url,payment).pipe(
      tap(() => {
        this.notification.showNotification("¡Pago guardado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

  /**
   * Método para actualizar información de un pago existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param Payment pago actualizado.
   * @returns un observable de tipo objeto
   */
  putPayment(payment: Payment) {
    const url = API_URL+ENDPOINTS.payments.update;
    return this.http.put(url,payment).pipe(
      tap(() => {
        this.notification.showNotification("¡Pago editado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

  /**
   * Método para marcar como borrado a un cliente existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idClient id del cliente a eliminar.
   * @returns un observable de tipo objeto
   */
  deletePayment(idPayment: number) {
    const url = API_URL+ENDPOINTS.payments.delete;
    return this.http.put(url,idPayment).pipe(
      tap(() => {
        this.notification.showNotification("¡Pago eliminado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }
  
}