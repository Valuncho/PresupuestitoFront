import { Employee } from "./Employee";
import { Salary } from "./Salary";

export interface EmployeeHistory
{
    idEmployee : number;
    oEmployee : Employee;
    oSalary : Salary[];
}