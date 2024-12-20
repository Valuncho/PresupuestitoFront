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

  private reload : BehaviorSubject<boolean > = new BehaviorSubject<boolean >(false);

  public getReload(): Observable<boolean> {
    return this.reload.asObservable();
  }

  public setReload(flag: boolean) {
    this.reload.next(flag);

  }

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
  currentHistory!.clientId = client;
  this.setClientHistory(currentHistory!);
 }

 //Edit
 private editMode : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


 setEditMode(option : boolean){
  this.editMode.next(option);

 }
 getEditMode() : Observable<boolean>{
  return this.editMode.asObservable();
 }

 //GetEmptyObjects

 getEmptyClient(): Client {
  return  {
    clientId: 0,
    personId: {
      personId: 0,
      name: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      email: '',
      dni: '',
      cuit: '',
    },
  };

}

getEmptyHistory() : ClientHistory{
  return {
    clientHistoryId: 0,
    clientId : this.getEmptyClient(),
    budgetsId : []
  }
}



}
