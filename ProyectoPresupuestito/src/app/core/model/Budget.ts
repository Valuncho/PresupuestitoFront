import { Payment } from "./Payment";
import { Work } from "./Work";

export interface Budget
{
    idBudget : number;
    works : Work[];
    description: string;
    cost : number;
    payments : Payment[];
}
