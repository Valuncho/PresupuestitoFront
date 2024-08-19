import { createAction, props } from "@ngrx/store";
import { Client } from "../../../core/model/Client";

export const init = createAction('[Client List] Init');

export const addClient = createAction(
    '[Client Form] Add Client',
    props<{client : Client}>()
 );

export const updateClient = createAction(
    '[Clients Form] Edit Client',
    props<{client : Client}>()
);

export const deleteClient = createAction(
    '[Clients List] Delete Client',
    props<{client : Client}>()
);