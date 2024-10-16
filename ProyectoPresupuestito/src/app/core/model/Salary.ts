import { Payment } from "./Payment";

export interface Salary
{
    idSalary : number;
    amount : number;
    billDate : number; //puede que sea un date realmente
    payments : Payment[];
}