import { Item } from "./Item";

export interface Work
{
    idWork: number;
    materials : Item[];
    estimatedHoursWorked: number;
    deadline : Date;
    costPrice: number;
    status : string;
    notes: string;
}