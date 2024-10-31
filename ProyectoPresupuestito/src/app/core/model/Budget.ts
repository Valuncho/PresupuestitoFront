import { Payment } from "./Payment";
import { Work } from "./Work";

export interface Budget
{
    budgetId : number;
    works : Work[];
    dateCreated: Date ;
    deadLine: Date ;
    descriptionBudget: string;
    cost : number;
    budgetStatus : string;
    payments? : Payment[]; 
}
