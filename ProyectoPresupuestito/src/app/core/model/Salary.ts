import { Payment } from "./Payment";

export interface Salary
{
    idSalary : number;
    amount : number;
    billDate : number; 
    payments : Payment[];
}