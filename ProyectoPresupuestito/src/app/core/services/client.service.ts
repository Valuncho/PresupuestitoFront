import { Injectable, inject } from '@angular/core';
import { Client } from '../model/Client';
import { ClientHistory } from '../model/ClientHistory';
import { BudgetService } from './budget.service';
import { Budget } from '../model/Budget';
import {BehaviorSubject, delay, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  //Utils
  private budgetService = inject(BudgetService);
  
  //Properties
  private clientes: Client[] = [
    {
      idClient: 1001,
      oPerson: {
        idPerson: 1,
        name: 'John',
        lastName: 'Doe',
        direction: '123 Main St',
        phoneNumber: '1234567890',
        mail: 'johndoe@example.com',
        dni: '123456789',
        cuit: '30-12345678-9',
      },
    },
    {
      idClient: 1002,
      oPerson: {
        idPerson: 2,
        name: 'Jane',
        lastName: 'Smith',
        direction: '456 Elm St',
        phoneNumber: '9876543210',
        mail: 'janesmith@example.com',
        dni: '987654321',
        cuit: '30-98765432-1',
      },
    },
  ];
  private clientsHistory: ClientHistory[] = [
    {
      idClientHistory: 1,
      oClient: this.clientes[0],
      budgets: [
        this.budgetService.getPresupuestoById(1)!,
        this.budgetService.getPresupuestoById(2)!,
      ],
    },
    {
      idClientHistory: 2,
      oClient: this.clientes[1],
      budgets: [
        this.budgetService.getPresupuestoById(3)!,
        this.budgetService.getPresupuestoById(4)!,
      ],
    },
  ];
  private clienteSeleccionado: Client = this.getEmptyClient();
  private fichaSeleccionada: ClientHistory = this.getEmptyHistory();
  private _clientesSubject = new BehaviorSubject<Client[]>([]);
  private _historiesSubject = new BehaviorSubject<ClientHistory[]>(this.clientsHistory);

  private _selectedClientSubject = new BehaviorSubject<Client>(this.clienteSeleccionado);
  private _selectedHistorySubject = new BehaviorSubject<ClientHistory>(this.fichaSeleccionada);

  //Metodos que se conectarian con el back
  getAllClients() : Observable<Client[]>{
    return this._clientesSubject.asObservable();
  }

  getClientById(clientId: number): Client | undefined {
    return this.clientes.find((client) => client.idClient === clientId);
  }

  getClientsBySearch(search : string) : Observable<Client[]>{
    return this._clientesSubject.asObservable();
  }

  getSortClients(sort : string) : Observable<Client[]>{
    return this._clientesSubject.asObservable();
  }

  postClient(client: Client): number {
    //peticion post al back
    let id = Math.floor(Math.random() * 91) + 10;
    console.log('Peticion post exitosa');
    console.log('Nuevo id' + id);
    return id;
  }

  putClient(client: Client) {
    //peticion post al back
    console.log('Peticion put exitosa');
    console.log(client);
  }

  deleteClient(clientId: number) {
    console.log('Peticion delete exitosa');
    console.log('Cliente eliminado con id' + clientId);
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

  get clients() {
    return this._clientesSubject.asObservable();
  }

  get selectedClient() : Observable<Client> {
    return this._selectedClientSubject.asObservable();
  }

  get ClientHistories(){
    return this._historiesSubject.asObservable();
  }

  get selectedHistory(){
    return this._selectedHistorySubject.asObservable();
  }

  setSelectedClient(clientId: number) {
    this.clienteSeleccionado = this.getClientById(clientId)!;
    this.fichaSeleccionada = this.getClienHistory(clientId)!;
    this._selectedHistorySubject.next(this.fichaSeleccionada);
    this._selectedClientSubject.next(this.clienteSeleccionado);
  }

  resetSelectedClient() {
    this.clienteSeleccionado = this.getEmptyClient();
    this.fichaSeleccionada = this.getEmptyHistory();
    this._selectedHistorySubject.next(this.fichaSeleccionada);
    this._selectedClientSubject.next(this.clienteSeleccionado);
  }


  getClienHistory(clientId: number): ClientHistory {
    return this.clientsHistory.find(
      (history) => history.oClient.idClient === clientId
    )!;
  }

  getBudgets(idClient: number): Budget[] | undefined {
    const budgets = this.clientsHistory
      .filter((element) => element.oClient.idClient === idClient)
      .flatMap((element) => element.budgets);
    return budgets.length > 0 ? budgets : undefined;
  }

  //Metodos que se conectan con los componentes
  handleGetClients() {}

  addNewClient(client: Client) {
    this.clientes.push(client);
    this._clientesSubject.next(this.clientes);
  }

  handlePostClient(client: Client) {
    const id = this.postClient(client);
    client.idClient = id;
    this.addNewClient(client);
    const emptyHistory: ClientHistory = {
      idClientHistory: id,
      oClient: client,
      budgets: [],
    };
    this.clientsHistory.push(emptyHistory);
  }

  handleUpdateClient(client: Client) {
    this.putClient(client);
  }

  handleDeleteClient(clientId: number) {
    this.clientes = this.clientes.filter(
      (client) => client.idClient !== clientId
    );
    this._clientesSubject.next(this.clientes);
    this.deleteClient(clientId);
  }

  handleDeleteBudged(budgetId : number){
    this.fichaSeleccionada.budgets = this.deleteBudgetById(this.fichaSeleccionada.budgets, budgetId);
    this._selectedHistorySubject.next(this.fichaSeleccionada);
  }

  deleteBudgetById(budgets: Budget[], id: number): Budget[] {
    const indice = budgets.findIndex(budget => budget.idBudget === id);

    if (indice !== -1) {
      budgets.splice(indice, 1);
    }

    return budgets;
  }
}
