import { Injectable } from '@angular/core';
import { ClientHistory } from '../model/ClientHistory';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientStateService {
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
}
