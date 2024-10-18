import { Injectable, inject } from '@angular/core';
import { Client } from '../model/Client';
import { ClientHistory } from '../model/ClientHistory';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL, ENDPOINTS } from '../endpoints';
import { ClientControllerService } from '../controllers/client-controller.service';
import { ErrorControllerService } from '../utils/error-controller.service';
import { ModalService } from '../utils/modal.service';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { NotificationService } from '../utils/notification.service';
import { Person } from '../model/Person';
import { PersonRequest } from '../request/personRequest';
/**
 * @class ClienteService
 * 
 * Servicio de la entidad cliente para comunicarse con el backend, gestionando errores y aciertos.
 * 
 */
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  //Util
  private http = inject(HttpClient);
  private modal = inject(ModalService);
  private error = inject(ErrorControllerService);
  private notification = inject(NotificationService);


  

  /**
   * Retorna todos los clientes disponibles guardados.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns Un array de clientes como un observable.
   */
  getClients() : Observable<Client[]> {
    return this.http.get<Client[]>(API_URL+ENDPOINTS.clients.getAll).pipe(      
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    }));   
  }
  

  /**
   * Retorna al cliente solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idClient id del cliente solicitado.
   * @returns Un cliente como un observable.
   */
  getClientById(idClient : number) : Observable<Client> {
    const url = API_URL+ENDPOINTS.clients.getById.replace(':id', idClient.toString());
    return this.http.get<Client>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

  /**
   * Método para crear un cliente nuevo.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param client cliente a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
  postClient(client: PersonRequest){
    const url = API_URL+ENDPOINTS.clients.post;
    
    return this.http.post(url,client).pipe(
      tap(() => {
        this.notification.showNotification("¡Cliente guardado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

  /**
   * Método para actualizar información de un cliente existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param client cliente actualizado.
   * @returns un observable de tipo objeto
   */
  putClient(client: Client) {
    const url = API_URL+ENDPOINTS.clients.update.replace(':id', client.clientId.toString());
    return this.http.put(url,client).pipe(
      tap(() => {
        this.notification.showNotification("¡Cliente editado con éxito!"); 
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
  deleteClient(idClient: number) {
    const url = API_URL+ENDPOINTS.clients.delete.replace(':id', idClient.toString());
    return this.http.patch(url,idClient).pipe(
      tap(() => {
        this.notification.showNotification("¡Cliente eliminado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }


/**
 * Del backend pido la ficha del cliente.
 * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
 * @returns devuelve la ficha del cliente con su presupuesto y el cliente.
 */
getClientHistoryById(idClient : number) : Observable<ClientHistory> {
  const url = API_URL+ENDPOINTS.clientHistories.getById.replace(':id', idClient.toString());
  return this.http.get<ClientHistory>(url).pipe(
    catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.error.setError(error);
      this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
      return of();
  })
  );   
}

}
