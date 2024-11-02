import { Item } from "./Item";

export interface Work
{
    workId: number;
    itemsId : Item[];
    workStatus : string;
    workName : string;
    estimatedHoursWorked: number;
    deadLine : Date;
    costPrice: number;
    status : string;
    notes: string;
}