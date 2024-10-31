import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeeCardComponent } from '../employeeCard/employeeCard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeService } from '../../../../core/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { Employee } from '../../../../core/model/Employee';

import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { ModalService } from '../../../../core/utils/modal.service';
import { EmployeeControllerService } from '../../../../core/controllers/employee-controller.service';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [CommonModule,EmployeeCardComponent,NgxPaginationModule,TextCardComponent],
    templateUrl:'./employee-list.component.html',
    styleUrl: './employee-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {


        //Utils
    private router = inject(Router);
    private dialog = inject(MatDialog);
    private employeeService = inject(EmployeeService);
    private modalService = inject(ModalService);
    private employeeController = inject(EmployeeControllerService)
    //Properties
    employees : Employee[] =[]
     
    //Pagination
    page = 1
    pageSize = 5
    //Card

        handleViewEmployee($Event : Employee){    
        this.router.navigate(['/employee/detail/',$Event.idEmployee]);
        }
    
        handleEditEmployee($Event : Employee){
        this.router.navigate(['/employee/edit/',$Event.idEmployee]);    
        }
    
        handleDeleteEmployee($Event : Employee){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
            mensaje: `¿Estás seguro de que deseas eliminar al empleado ${$Event.oPerson.name}?`
            }
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            const Employee = this.employeeService.getEmployeeById($Event.idEmployee)!;
            this.employeeService.deleteEmployee($Event.idEmployee).subscribe(
                {
                next: () => this.router.navigate(['/employee'])
                }
            );
            
            }
        });
    
    } 

    //Pagination
    pageChange(page: number) {
        this.page = page;
    }
}

