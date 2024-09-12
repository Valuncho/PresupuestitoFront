import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeeCardComponent } from '../employeeCard/employeeCard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeService } from '../../../../core/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { Employee } from '../../../../core/model/Employee';
import { ModalService } from '../../../../core/services/utils/modal.service';
import { NotificationService } from '../../../../core/services/utils/notification.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [CommonModule,EmployeeCardComponent,NgxPaginationModule],
    templateUrl:'./employee-list.component.html',
    styleUrl: './employee-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent { 

        //Utils
    private router = inject(Router);
    private dialog = inject(MatDialog);
    private notificationService = inject(NotificationService);
    private modalService = inject(ModalService);
    private employeeService = inject(EmployeeService);
    //Properties
    employees : Employee[] = [];
    searchedEmployees : Employee[] = [];
    employee? : Employee;
    
    //BudgetForm
    options = false;
    //Pagination
    page = 1
    pageSize = 5

/*
    ngOnInit(): void {

        this.employeeService.getAllEmployees().subscribe({
        next : (employees)=>{
            this.employees = employees;
            this.searchedEmployees = employees;
        }
        });

    }
*/
    //BudgetForm
    addEmployeeHandler(){
        this.modalService.openModal<EmployeeFormComponent,Employee>(EmployeeFormComponent);
    }

    //Search
    handleSearch($Event : Employee[]){
        this.page = 1
        /*
        this.employeeService.getEmployeesBySearch("filto").subscribe({
        next : (employees) =>{
            this.searchedEmployees = employees;
        }*/
        }
    

    //Card
    handleAction($Event : any){
      //  this.employeeService.setSelectedEmployee($Event)
    }

    handleViewEmployee($Event : any){
        //this.employeeService.setSelectedEmployee($Event)
        this.router.navigate(['/employee/detail/',$Event]);
    }

    handleEditEmployee($Event : any){
        //this.employeeService.setSelectedEmployee($Event)
        this.router.navigate(['/employee/edit/',$Event]);
    }

    handleDeleteEmployee($Event : any){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
            mensaje: `¿Estás seguro de que deseas eliminar al empleado con ID ${$Event}?`
        }
        });

        dialogRef.afterClosed().subscribe(result => {
        if (result) {
            const employee = this.employeeService.getEmployeeById($Event)!;
            
           // this.employeeService.handleDeleteEmployee($Event)
            this.notificationService.showNotification("empleado eliminado con éxito");
            this.router.navigate(['/empleado']);
        }
        });

    }

    //Pagination
    pageChange(page: number) {
        this.page = page;
    }
}
