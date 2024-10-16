import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../../../core/model/Employee';
import { Salary } from '../../../../core/model/Salary';
import { EmployeeComponent } from '../../components/employee/employee.component';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { EmployeeCardComponent } from '../../components/employeeCard/employeeCard.component';
import { SalaryListComponent } from '../../../salary/components/salary-list/salary-list.component';
import { ModalService } from '../../../../core/utils/modal.service';
import { Payment } from '../../../../core/model/Payment';
import { PaymentsFormComponent } from '../../../payments/components/payments-form/payments-form.component';
import { SalaryFormComponent } from '../../../salary/components/salary-form/salary-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeHistory } from '../../../../core/model/EmployeeHistory';

@Component({
    selector: 'app-employee-details',
    standalone: true,
    imports: [CommonModule, EmployeeComponent,SalaryListComponent,EmployeeCardComponent,NgxPaginationModule],
    templateUrl: './employee-Details.component.html',
    styleUrl: './employee-Details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent {

    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private employeeService = inject(EmployeeService);
    private modalService = inject(ModalService)
    id : number  = 0;
    currentEmployee : EmployeeHistory = {
        idEmployeeHistory: 1,
        oEmployee: {
            oPerson: {
                idPerson: 1,
                name: 'John',
                lastName: 'Doe',
                direction: '123 Main St',
                phoneNumber: '1234567890',
                mail: 'johndoe@example.com',
                dni: '123456789',
                cuit: '30-12345678-9',
            },
            idEmployee: 0,
            salary: 0
        },
        salaries: [
            {
            idSalary: 0,
            amount: 0,
            billDate: 0,
            payments: []
        }
        ]
    }
    employee = signal<Employee | undefined>(undefined);
    salaries : Salary[] | undefined = [];
    
    ngOnInit(): void {
        this.id = parseInt(this.activatedRoute.snapshot.params['employeeId']);
    }

    //Botones
    goToSalaryForm(){
        this.modalService.openModal<SalaryFormComponent,Salary>(SalaryFormComponent);
    }
    openPaymentForm(){
        this.modalService.openModal<PaymentsFormComponent,Payment>(PaymentsFormComponent);
    }
}
