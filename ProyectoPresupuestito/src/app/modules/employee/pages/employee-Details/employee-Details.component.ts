import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../../../core/model/Employee';
import { Salary } from '../../../../core/model/Salary';
import { EmployeeComponent } from '../../components/employee/employee.component';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { EmployeeCardComponent } from '../../components/employeeCard/employeeCard.component';

@Component({
    selector: 'app-employee-details',
    standalone: true,
    imports: [CommonModule, EmployeeComponent,EmployeeListComponent,EmployeeCardComponent],
    templateUrl: './employee-Details.component.html',
    styleUrl: './employee-Details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent {

    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private employeeService = inject(EmployeeService);
    id : number  = 0;
    currentEmployee! : Employee;
    employee = signal<Employee | undefined>(undefined);
    salaries : Salary[] | undefined = [];
    
    ngOnInit(): void {
        this.id = parseInt(this.activatedRoute.snapshot.params['employeeId']);
    }

    goToSalaryForm(){

    }
    openPaymentForm(){

    }
}
