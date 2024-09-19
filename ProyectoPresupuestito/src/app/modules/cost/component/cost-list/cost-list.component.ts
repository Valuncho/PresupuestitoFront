import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CostSearchComponent } from '../cost-search/cost-search.component';
import { CostCardComponent } from "../cost-card/cost-card.component";
import { CostService } from '../../../../core/services/Cost.service';
import { Cost } from '../../../../core/model/Cost';
import { CostFormComponent } from '../cost-form/cost-form.component';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalService } from '../../../../core/services/utils/modal.service';
import { NotificationService } from '../../../../core/services/utils/notification.service';

@Component({
    selector: 'app-cost-list',
    standalone: true,
    imports: [
    CommonModule, CostSearchComponent,
    CostCardComponent
],
    templateUrl: './cost-list.component.html',
    styleUrl: './cost-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostListComponent { 
    //Utils
    private router = inject(Router);
    private dialog = inject(MatDialog);
    private notificationService = inject(NotificationService);
    private modalService = inject(ModalService);
    private costService = inject(CostService);
    //Properties
    fixedCost : Cost[] = [];
    searchedFixedCost : Cost[] = [];
    cost? : Cost;
    //BudgetForm
    options = false;
    //Pagination
    page = 1
    pageSize = 5


    ngOnInit(): void {

        this.costService.getFixedCosts().subscribe({
        next : (fixedCost)=>{
            //this.cost = fixedCost;
            this.searchedFixedCost = fixedCost;
        }
        });

    }

    //BudgetForm
    addFixedCostHandler(){
        this.modalService.openModal<CostFormComponent,Cost>(CostFormComponent);
    }

    /*
    //Search
    handleSearch($Event : Cost[]){
        this.page = 1
        this.costService.getFixedCostsBySearch("filto").subscribe({
        next : (fixedCost) =>{
            this.searchedFixedCost = fixedCost;
        }
        })
    }
    
    */

    /*
    //Card
    handleAction($Event : any){
        this.costService.setSelectedClient($Event)
        this.router.navigate(['/budget/new/',$Event]);
    }

    handleViewCost($Event : any){
        this.costService.setSelectedFixedCost($Event)
        this.router.navigate(['/cost/detail/',$Event]);
    }

    handleEditCost($Event : any){
        this.costService.setSelectedFixedCost($Event)
        this.router.navigate(['/cost/edit/',$Event]);
    }
    
    handleDeleteCost($Event : any){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
            mensaje: `¿Estás seguro de que deseas eliminar el costo con ID ${$Event}?`
        }
        });

        dialogRef.afterClosed().subscribe(result => {
        if (result) {
            const client = this.costService.getCostById($Event)!;
            
            this.costService.handleDeleteCost($Event)
            this.notificationService.showNotification("Costo eliminado con éxito");
            this.router.navigate(['/costo']);
        }
        });

    }

    //Pagination
    pageChange(page: number) {
        this.page = page;
    }
    */
}
