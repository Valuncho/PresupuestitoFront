import { Injectable, inject } from '@angular/core';
import { Client } from '../model/Client';
import { ClientHistory } from '../model/ClientHistory';
import { BudgetService } from './budget.service';
import { Budget } from '../model/Budget';
import {BehaviorSubject, catchError, delay, Observable, of, tap} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL, ENDPOINTS } from '../endpoints';
import { ClientStateService } from '../states/client-state.service';
import { ErrorStateService } from './utils/error-state.service';
import { ModalService } from './utils/modal.service';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { NotificationService } from './utils/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  //Util
  private http = inject(HttpClient);
  private state = inject(ClientStateService);
  private modal = inject(ModalService);
  private error = inject(ErrorStateService);
  private notification =inject(NotificationService);

  getState() : ClientStateService{
    return this.state;
  }

  /**
   * Retorna todos los clientes disponibles guardados.
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
   * @param client cliente a cargar en la base de datos
   * @returns 
   */
  postClient(client: Client){
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
   * @param client cliente actualizado.
   * @returns 
   */
  putClient(client: Client) {
    const url = API_URL+ENDPOINTS.clients.update;
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
   * @param idClient id del cliente a eliminar.
   * @returns 
   */
  deleteClient(idClient: number) {
    const url = API_URL+ENDPOINTS.clients.delete;
    return this.http.put(url,idClient).pipe(
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



  //Metodos propios del front
  getEmptyClient(): Client {
    return  {
      idClient: 0,
      oPerson: {
        idPerson: 0,
        name: '',
        lastName: '',
        direction: '',
        phoneNumber: '',
        mail: '',
        dni: '',
        cuit: '',
      },
    };

  }

  getEmptyHistory() : ClientHistory{
    return {
      idClientHistory: 0,
      oClient : this.getEmptyClient(),
      budgets : []
    }
  }

 
}
