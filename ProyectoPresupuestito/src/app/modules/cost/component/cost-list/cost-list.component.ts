import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CostSearchComponent } from '../cost-search/cost-search.component';
import { CostCardComponent } from "../cost-card/cost-card.component";
import { CostService } from '../../../../core/services/Cost.service';

import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { FixedCost } from '../../../../core/model/FixedCost';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';

@Component({
    selector: 'app-cost-list',
    standalone: true,
    imports: [
    CommonModule, CostSearchComponent,NgxPaginationModule,CostCardComponent,TextCardComponent],
    templateUrl: './cost-list.component.html',
    styleUrl: './cost-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostListComponent { 
    //Utils
    private router = inject(Router);
    private dialog = inject(MatDialog);
    
    private costService = inject(CostService);
    //Properties
    fixedCosts : FixedCost[] = [
        {
            idFixedCost: 0,
            description: '',
            amount: 0,
            workingDays: 0,
            hoursWorked: 0,
            date: new Date(0)
        }
    ];
    
    //BudgetForm
    options = false;
    //Pagination
    page = 1
    pageSize = 5


    ngOnInit(): void {


    }

    //BudgetForm
    addFixedCostHandler(){
       // this.modalService.openModal<CostFormComponent,Cost>(CostFormComponent);
    }

    
    //Search
    /*
    handleSearch($Event : Cost[]){
        this.page = 1
        this.costService.getFixedCostsBySearch("filto").subscribe({
        next : (fixedCost) =>{
            this.searchedFixedCost = fixedCost;
        }
        })
    }*/
    
    

    
    //Card

    handleAction($Event : FixedCost){

        this.router.navigate(['/cost/new/',$Event.idFixedCost]);
    }

    handleViewCost($Event : FixedCost){
        //this.costService.setSelectedFixedCost($Event)
        this.router.navigate(['/cost/detail/',$Event]);
    }
    
    handleEditCost($Event : FixedCost){
        //this.costService.setSelectedFixedCost($Event)
        this.router.navigate(['/cost/edit/',$Event]);
    }
    
    handleDeleteCost($Event : FixedCost){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
            mensaje: `¿Estás seguro de que deseas eliminar el costo con ID ${$Event}?`
        }
        });

        dialogRef.afterClosed().subscribe(result => {
        if (result) {
            const client = this.costService.getFixedCostById($Event.idFixedCost)!;
            
            //this.costService.handleDeleteFixedCost($Event.idFixedCost)
            //this.notificationService.showNotification("Costo eliminado con éxito");
            this.router.navigate(['/costo']);
        }
        });

    }

    //Pagination
    pageChange(page: number) {
        this.page = page;
    }
}
