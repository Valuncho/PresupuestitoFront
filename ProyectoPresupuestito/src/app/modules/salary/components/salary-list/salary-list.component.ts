import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { SalaryCardComponent } from '../salary-card/salary-card.component';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ModalService } from '../../../../core/utils/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SalaryFormComponent } from '../salary-form/salary-form.component';
import { Salary } from '../../../../core/model/Salary';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { SalaryControllerService } from '../../../../core/controllers/salary-controller.service';
import { SalaryService } from '../../../../core/services/salary.service';

/**
 * @class salaryListComponent
 * 
 * Listado de la entidad salario, con buscador y paginación.
 *
 */
@Component({
    selector: 'app-salary-list',
    standalone: true,
    imports: [
        CommonModule,SalaryCardComponent,SalaryFormComponent,NgxPaginationModule,TextCardComponent,
    ],
    templateUrl: './salary-list.component.html',
    styleUrl: './salary-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryListComponent { 
    
    //Utils
    private router = inject(Router);
    private dialog = inject(MatDialog);
    private modalService = inject(ModalService);
    private salaryController = inject(SalaryControllerService);
    private salaryService = inject(SalaryService)
    //Properties
    options : boolean = false;
    @Input() salaries! : Salary[];
    //Pagination
    page = 1
    pageSize = 5
    


    ngOnInit(): void {
        
        this.salaryService.getSalaries().subscribe({  
        next: x => this.salaries = x,  
        })

    }

    //Card

    handleEditSalary($Event : Salary){
        
        this.salaryController.setEditMode(true);
        this.salaryController.setSalary($Event);
        this.modalService.openModal<SalaryFormComponent,Salary>(SalaryFormComponent);    
    }

    handleDeleteSalary($Event : Salary){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
            mensaje: `¿Estás seguro de que deseas eliminar el salario:$ ${$Event.amount}?`
        }
        });

        dialogRef.afterClosed().subscribe(result => {
        if (result) {
            const salaries = this.salaryService.getSalaryById($Event.idSalary)!;
            this.salaryService.deleteSalary($Event.idSalary).subscribe(
            {
                next: () => this.router.navigate(['/salary'])
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
