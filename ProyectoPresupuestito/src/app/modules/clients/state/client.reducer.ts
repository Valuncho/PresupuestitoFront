import { createReducer, on } from "@ngrx/store";
import { Client } from "../../../core/model/Client";
import { ClientViewActions } from "."; 
import { initailClients } from "../../../core/initialClients";

export const clientsStateFeatureKey = 'clientsState';

export interface ClientsState{
   clients : Client[]
}

const initialState : ClientsState = {
    clients: []
}

export const ClientsReducer = createReducer(
    initialState,
    on(
        ClientViewActions.init,
        () => ({clients : initailClients })
    ),
    on(
        ClientViewActions.addClient,
        (currentState, action) =>({
            clients : [...currentState.clients, action.client]
        })
    ),
    on(
        ClientViewActions.deleteClient,
        (currentState, action) =>({
            ...currentState,
            clients: currentState.clients.filter((client) => client.idClient !== action.client.idClient)
        })
    ), 
    on(
        ClientViewActions.updateClient,
        (currentState, action) => ({
          ...currentState,
          clients: currentState.clients.map(client => client.idClient === action.client.idClient ? action.client : client)
        })
      )

);