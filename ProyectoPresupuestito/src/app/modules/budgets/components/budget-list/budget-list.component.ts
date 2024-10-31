import { Location } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { BudgetComponent } from '../budget/budget.component';
import { BudgetService } from '../../../../core/services/budget.service';
import { Budget } from '../../../../core/model/Budget';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';
import { BudgetCardComponent } from "../budget-card/budget-card.component";
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from '../../../../core/utils/notification.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { BudgetSearchComponent } from "../budget-search/budget-search.component";
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
/**
 * @class BudgetListComponent
 * 
 * Componente listado de presupuestos.
 *
 */
@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [BudgetComponent, BudgetCardComponent, NgxPaginationModule, BudgetSearchComponent, TextCardComponent],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent {
  //Utils
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);  
  private budgetService = inject(BudgetService);

  //Properties
  @Input() budgets : Budget[] = [
    {
      idBudget: 1,
      works: [
        
      ], // Replace with actual work data if needed
      createdDate: new Date('2023-08-20'),
      deadLine: new Date('2023-12-22'),
      description: 'Kitchen renovation',
      cost: 5000,
      Status: 'Cancelado',
      payments: [
        
      ], // Or provide payment data if needed
    },
    {
      idBudget: 2,
      works: [
        
      ],
      createdDate: new Date('2024-01-15'),
      deadLine: new Date('2024-02-15'),
      description: 'Bathroom remodeling',
      cost: 3000,
      Status: 'Aprobado',
      payments: [
        // Payment data if applicable
      ],
    }]
  
  clientId : number = 0
  options : boolean = false;
  //Pagination
  page : number = 1;
  itemsPerPage : number = 5;


  ngOnInit(){
    this.clientId = parseInt(this.activatedRoute.snapshot.params['clientId']);
    const clientUrl = "/client/detail/"+this.clientId;
    if(this.router.url == clientUrl){
      this.options = true;
    }else{
      this.budgetService.getBudgets().subscribe(
        {
          next: res => {this.budgets = res}
        }
      )
    }


  }
  //BudgetCard
 

  handleView($Event : any){
    this.router.navigate(['/budget/detail/', $Event.idBudget]);
  }

  handleEdit($Event : Budget){
    this.router.navigate(['/budget/edit/',$Event.idBudget]);
  }

  handleDelete($Event : Budget){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar al presupuesto: ${$Event.description}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.budgetService.deleteBudget($Event.idBudget).subscribe({
          next : () => {
            this.router.navigate(['/budget']);
          }
        });
        
        
      }
    });

  }

  //Pagination
  pageChange(page: number) {
    this.page = page;
  }

 

}
