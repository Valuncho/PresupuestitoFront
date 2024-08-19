import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ClientsState, clientsStateFeatureKey } from "./client.reducer";

const clientsState = createFeatureSelector<ClientsState>(clientsStateFeatureKey);

export const clients = createSelector(
    clientsState,
    (clientsState) => clientsState.clients
);