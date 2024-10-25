export interface BudgetRequest{
    idBudget? : number;
    DescriptionBudget : string,
    ClientId : number;
    budgetStatus : string;
    dateCreated : Date;
    deadLine : Date;
}