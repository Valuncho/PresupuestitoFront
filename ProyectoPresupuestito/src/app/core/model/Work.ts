import { Item } from "./Item";

export interface Work
{
    idWork: number;
    materials : Item[];
    workStatus : string;
    workName : string;
    estimatedHoursWorked: number;
    deadLine : Date;
    costPrice: number;
    status : string;
    notes: string;
}