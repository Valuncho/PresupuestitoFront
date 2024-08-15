import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { BudgetComponent } from '../budget/budget.component';
import { BudgetService } from '../../../../core/services/budget.service';
import { Budget } from '../../../../core/model/Budget';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';
import { isParameter } from 'typescript';
import { BudgetCardComponent } from "../budget-card/budget-card.component";
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from '../../../../core/services/utils/notification.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { BudgetSearchComponent } from "../budget-search/budget-search.component";

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [BudgetComponent, BudgetCardComponent, NgxPaginationModule, BudgetSearchComponent],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent {
  //Utils
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationService);
  private budgetService = inject(BudgetService);
  private clientService = inject(ClientService);
  //Properties
  budgets : Budget[] = [];
  clientId : number = 0

  //Pagination
  page : number = 1;
  itemsPerPage : number = 5;

  
  ngOnInit(){
    this.clientService.selectedClient.subscribe(client =>{
      console.log(client);
      if(client.idClient != 0){
        this.budgets = this.clientService.getBudgets(client.idClient)!;
      }else{
        this.budgetService.getBudgets().subscribe(budgets =>{
          this.budgets = budgets;
        })
      }
    })
    

   
    
  }

  handleSelectBudget($Event : number){
    this.budgetService.setSelectedBudget($Event)
    this.router.navigate(['/budget/detail']);
  }

  handleAction($Event : any){
    this.budgetService.setSelectedBudget($Event)
    this.router.navigate(['/work/new/',$Event]);
  }

  handleView($Event : any){
    this.budgetService.setSelectedBudget($Event)
    this.router.navigate(['/budget/detail']);
  }
  
  handleEdit($Event : any){
    
    this.budgetService.setSelectedBudget($Event)
    this.router.navigate(['/budget/edit']);
  }

  handleDelete($Event : any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar al presupuesto con ID ${$Event}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.budgetService.handleDeleteBudget($Event);
        this.notificationService.showNotification("Presupuesto eliminado con éxito");
        this.router.navigate(['/budget']); 
      }
    });
    
  }

  //Pagination
  pageChange(page: number) {
    this.page = page;
  }

}
