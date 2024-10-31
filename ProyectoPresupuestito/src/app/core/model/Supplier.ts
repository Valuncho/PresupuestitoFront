import { Person } from "./Person";

export interface Supplier
{
    supplierId : number;
    note? : string;
    personId : Person;
}