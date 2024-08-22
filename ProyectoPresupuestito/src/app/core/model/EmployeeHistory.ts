import { Employee } from "./Employee";
import { Salary } from "./Salary";

export interface EmployeeHistory
{
    idEmployeeHistory : number;
    oEmployee : Employee;
    oSalary : Salary[];
}