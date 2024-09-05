import { Injectable, inject } from '@angular/core';
import { Client } from '../model/Client';
import { ClientHistory } from '../model/ClientHistory';
import { BudgetService } from './budget.service';
import { Budget } from '../model/Budget';
import {BehaviorSubject, delay, Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL, ENDPOINTS } from '../endpoints';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  //Util
  private http = inject(HttpClient);

  /**
   * Retorna todos los clientes disponibles guardados.
   * @returns Un array de clientes como un observable.
   */
  getClients() : Observable<Client[]> {
    return this.http.get<Client[]>(API_URL+ENDPOINTS.clients.getAll);   
  }
  

  /**
   * Retorna al cliente solicitado por id.
   * @param idClient id del cliente solicitado.
   * @returns Un cliente como un observable.
   */
  getClientById(idClient : number) : Observable<Client> {
    const url = API_URL+ENDPOINTS.clients.getById.replace(':id', idClient.toString());
    return this.http.get<Client>(url);   
  }

  /**
   * Método para crear un cliente nuevo.
   * @param client cliente a cargar en la base de datos
   * @returns 
   */
  postClient(client: Client){
    const url = API_URL+ENDPOINTS.clients.post;
    return this.http.post(url,client);
  }

  /**
   * Método para actualizar información de un cliente existente.
   * @param client cliente actualizado.
   * @returns 
   */
  putClient(client: Client) {
    const url = API_URL+ENDPOINTS.clients.update;
    return this.http.put(url,client);
  }

  /**
   * Método para marcar como borrado a un cliente existente.
   * @param idClient id del cliente a eliminar.
   * @returns 
   */
  deleteClient(idClient: number) {
    const url = API_URL+ENDPOINTS.clients.delete;
    return this.http.put(url,idClient);
  }


/**
 * Del backend pido la ficha del cliente.
 * @returns devuelve la ficha del cliente con su presupuesto y el cliente.
 */
getClientHistoryById(idClient : number) : Observable<ClientHistory> {
  const url = API_URL+ENDPOINTS.clientHistories.getById.replace(':id', idClient.toString());
  return this.http.get<ClientHistory>(url);   
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

 /*
  getClientsBySearch(search : string) : Observable<Client[]>{
    return this._clientesSubject.asObservable();
  }

  getSortClients(sort : string) : Observable<Client[]>{
    return this._clientesSubject.asObservable();
  }
*/


  //Metodos que se conectan con los componentes
  handleGetClients() {}

  handlePostClient(client: Client) {
    this.postClient(client);
  
  }

  handleUpdateClient(client: Client) {
    this.putClient(client);
  }

  handleDeleteClient(clientId: number) {

    this.deleteClient(clientId);
  }



 
}
