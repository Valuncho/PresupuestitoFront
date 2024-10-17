import { Payment } from "./Payment";
import { Work } from "./Work";

export interface Budget
{
    idBudget : number;
    works : Work[];
    createdDate: Date;
    deadLine: Date;
    description: string;
    cost : number;
    Status : string;
    payments? : Payment[]; 
}
