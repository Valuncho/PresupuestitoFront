import { Budget } from "./Budget";
import { Client } from "./Client";

export interface ClientHistory
{
    clientHistoryId: number;
    clientId: Client;
    budgetsId: Budget[];
}