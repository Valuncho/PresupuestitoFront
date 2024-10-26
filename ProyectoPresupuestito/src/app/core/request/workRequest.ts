export interface WorkRequest{
    workId? : number;
    estimatedHoursWorked: number;
    deadLine : Date;
    costPrice: number;
    budgetId : number;
    statusSerialized: string;
    notes: string;
    image: string;
}
