export interface WorkRequest{
    workId? : number;
    estimatedHoursWorked: number;
    deadLine : Date;
    costPrice: number;
    budgetId : number;
    workStatus: string;
    notes: string;
    image: string;
}
