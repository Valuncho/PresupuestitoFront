import { Injectable } from '@angular/core';
import { ClientHistory } from '../model/ClientHistory';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../model/Client';
/**
 * 
 * @class ClientControllerService
 * 
 * Clase controller de la entidad cliente para:
 * -Ser pasamanos de información,
 * -Obtener objetos vacios,
 * -Manejar el editado en el formulario.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ClientControllerService {
 //Selected entities
 private clientHistory: BehaviorSubject<ClientHistory | undefined> = new BehaviorSubject<ClientHistory | undefined>(undefined);
 
 public getClientHistory() : Observable<ClientHistory | undefined>{
   return this.clientHistory.asObservable();
 }

 public setClientHistory(clientHistory: ClientHistory) {
   this.clientHistory.next(clientHistory);
 }

 setClient(client : Client){
  let currentHistory = this.clientHistory.getValue();
  currentHistory!.oClient = client;
  this.setClientHistory(currentHistory!);
 }
 
 //Edit
 private editMode : boolean = false;

 setEditMode(option : boolean){
 this.editMode = option;
 }
 getEditMode() : boolean{
 return this.editMode;
 }

 //GetEmptyObjects

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
