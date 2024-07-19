import { Budget } from "./Budget";
import { Client } from "./Client";

export interface ClientHistory
{
    idClientHistory: number;
    oClient: Client;
    budgets: Budget[];
}