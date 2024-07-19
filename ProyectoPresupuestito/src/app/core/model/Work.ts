import { Item } from "./Item";

export interface Work
{
    idWork: number;
    order : number;
    materials : Item[];
    estimatedHoursWorked: number;
    deadline : Date;
    costPrice: number;
    status : string;
    notes: string;
    images: string[];

}