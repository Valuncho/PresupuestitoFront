import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CostSearchComponent } from '../cost-search/cost-search.component';
import { CostCardComponent } from "../cost-card/cost-card.component";
import { CostService } from '../../../../core/services/Cost.service';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { FixedCost } from '../../../../core/model/FixedCost';
import { CostControllerService } from '../../../../core/controllers/cost-controller.service';
import { CostFormComponent } from '../cost-form/cost-form.component';
import { ModalService } from '../../../../core/utils/modal.service';

@Component({
    selector: 'app-cost-list',
    standalone: true,
    imports: [CommonModule, CostSearchComponent,NgxPaginationModule,CostCardComponent,TextCardComponent],
    templateUrl: './cost-list.component.html',
    styleUrl: './cost-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostListComponent { 
    //Utils
    private router = inject(Router);
    private dialog = inject(MatDialog);
    private costService = inject(CostService);
    private costController = inject(CostControllerService)
    private modalService = inject(ModalService);
    //Properties
    fixedCosts : FixedCost[] = [
        {
            idFixedCost: 1,
            description: '',
            amount: 0,
            workingDays: 0,
            hoursWorked: 0,
            date: new Date(0)
        },
        {
            idFixedCost: 2,
            description: '',
            amount: 0,
            workingDays: 0,
            hoursWorked: 0,
            date: new Date(0)
        }
    ];
    
    //Pagination
    page = 1
    pageSize = 5

    
    //Card
    
    handleEditFixedCost($Event : FixedCost){
        this.costController.setEditMode(true);
        this.costController.setFixedCost($Event);
        this.modalService.openModal<CostFormComponent,FixedCost>(CostFormComponent);    
    }
    
    handleDeleteFixedCost($Event : FixedCost){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
            mensaje: `¿Estás seguro de que deseas eliminar el costo ${$Event.description}?`
        }
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            const cost = this.costService.getFixedCostById($Event.idFixedCost)!;
            this.costService.deleteFixedCost($Event.idFixedCost).subscribe(
                {
                next: () => this.router.navigate(['/cost'])
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
