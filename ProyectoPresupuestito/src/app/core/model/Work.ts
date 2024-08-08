import { Item } from "./Item";

export interface Work
{
    idWork: number;
    order : number;
    materials : any[];
    estimatedHoursWorked: number;
    deadline : Date;
    costPrice: number;
    status : string;
    notes: string;
    images: string[];

}