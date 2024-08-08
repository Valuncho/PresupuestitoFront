import { Injectable, inject, signal } from '@angular/core';
import { Client } from '../model/Client';
import { ClientHistory } from '../model/ClientHistory';
import { BudgetService } from './budget.service';
import { Budget } from '../model/Budget';
import { BehaviorSubject, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private budgetService = inject(BudgetService);
  
  private clients = signal<Client[]>([
    {
      idClient: 1001,
      oPerson: {
          idPerson: 1,
          name: "John",
          lastName: "Doe",
          direction: "123 Main St",
          phoneNumber: "1234567890",
          mail: "johndoe@example.com",
          dni: "123456789",
          cuit: "30-12345678-9"
      }
    },
    {
        idClient: 1002,
        oPerson: {
            idPerson: 2,
            name: "Jane",
            lastName: "Smith",
            direction: "456 Elm St",
            phoneNumber: "9876543210",
            mail: "janesmith@example.com",
            dni: "987654321",
            cuit: "30-98765432-1"
        }
    }
  ]);
  private clientsHistory : ClientHistory [] = [
    {
      idClientHistory: 1,
      oClient: this.clients()[0],
      budgets: [
        this.budgetService.getBudgetById(1)!,
        this.budgetService.getBudgetById(2)!
        
      ]
    },
    {
      idClientHistory: 2,
      oClient: this.clients()[1],
      budgets: [
        this.budgetService.getBudgetById(3)!,
        this.budgetService.getBudgetById(4)!
        
      ]
    }

  ]


  private selectedClient = signal<Client>(this.getEmptyClient());

  clients$ = toObservable(this.clients);
  selectedClient$ = toObservable(this.selectedClient);


  constructor() {

  }

  //Metodos que se conectarian con el back
  getClients(){
    return this.clients$;
  }

  postClient(client : Client) : number{
    //peticion post al back
    let id = Math.floor(Math.random() * 91) + 10;
    console.log('Peticion post exitosa');
    console.log('Nuevo id' + id);
    return id;
  }

  putClient(client : Client){
    //peticion post al back
    console.log('Peticion put exitosa');
    console.log(client);

  }
  deleteClient(clientId : number){
    console.log('Peticion delete exitosa');
    console.log('Cliente eliminado con id' + clientId);
  }

  

  actions : string[] = [
    'see', 'save', 'edit', 'delete'
  ]



  currentAction = signal<string>(this.actions[0]);
  
  private clienteSeleccionadoSource = new BehaviorSubject<Client | null>(null);
  clienteSeleccionado$ = this.clienteSeleccionadoSource.asObservable();

  private accionSeleccionadaSourse = new BehaviorSubject<String>(this.actions[0]);
  accionSeleccionada$ = this.accionSeleccionadaSourse.asObservable();

  seleccionarCliente(cliente: Client) {
    this.clienteSeleccionadoSource.next(cliente);
  }
  seleccionarAccion(accion : string){
    this.accionSeleccionadaSourse.next(accion);
  }

  
  
  getEmptyClient() : Client{
    
    const emptyClient: Client = {
      idClient: 0,
      oPerson: {
        idPerson: 0,
        name: '',
        lastName: '',
        direction: '',
        phoneNumber: '',
        mail: '',
        dni: '',
        cuit: ''
      }
    };
    return emptyClient;
  }
  getAction() : string{
    return this.currentAction();
  }

  setAction(action : string){
    this.currentAction.set(action);
    this.seleccionarAccion(this.getAction());
  }

  getSelectedClient() : Observable<Client>{
    return this.selectedClient$;
  }
  setSelectedClient(clientId: number){
    this.selectedClient.set(this.getClientById(clientId)!);
    //this.seleccionarCliente(this.getSelectedClient());
    
  }
  resetSelectedClient(){
    this.selectedClient.set(this.getEmptyClient());
  }
  
  getClientById(clientId: number): Client | undefined {
    return this.clients().find(client => client.idClient === clientId);
  }

  //Metodos que se conectan con los componentes
  handleGetClients(){

  }

  addNewClient(client : Client){
    this.clients().push(client);
  }

  handlePostClient(client : Client){
    const id = this.postClient(client);
    client.idClient = id;
    this.addNewClient(client);
  }

  handleUpdateClient(client : Client){
    this.putClient(client);

  }
  handleDeleteClient(clientId : number){
    this.clients.update((clients)=> clients.filter((client)=> client.idClient !== clientId));
    this.deleteClient(clientId)
    
  }

getClienHistory(clientId : number) : ClientHistory{
  return this.clientsHistory.find(history => history.oClient.idClient === clientId)!;
}

  getBudgets(idClient: number): Budget[] | undefined{
    const budgets = this.clientsHistory
    .filter(element => element.oClient.idClient === idClient)
    .flatMap(element => element.budgets);
    return budgets.length > 0 ? budgets : undefined;
    
  }

}
