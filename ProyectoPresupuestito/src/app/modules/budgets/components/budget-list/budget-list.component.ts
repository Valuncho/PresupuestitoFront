import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { BudgetComponent } from '../budget/budget.component';
import { BudgetService } from '../../../../core/services/budget.service';
import { Budget } from '../../../../core/model/Budget';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetCardComponent } from "../budget-card/budget-card.component";
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BudgetSearchComponent } from "../budget-search/budget-search.component";
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { LoadingService } from '../../../../core/utils/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
/**
 * @class BudgetListComponent
 *
 * Componente listado de presupuestos.
 *
 */
@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [BudgetComponent, BudgetCardComponent, NgxPaginationModule, BudgetSearchComponent, TextCardComponent, CommonModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent {
  //Utils
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private budgetService = inject(BudgetService);
  private loadingService = inject(LoadingService)



  //Properties
  @Input() budgets : Budget[] = []

  clientId : number = 0
  options : boolean = false;
  //Pagination
  page : number = 1;
  itemsPerPage : number = 5;

  pipe = new DatePipe('en-US');
  ngOnInit(){


    this.clientId = parseInt(this.activatedRoute.snapshot.params['clientId']);
    const clientUrl = "/client/detail/"+this.clientId;
    if(this.router.url == clientUrl){
      this.options = true;
    }else{
      this.budgetService.getBudgets().subscribe(
        {

          next: res => {
            this.budgets = res;

          }
        }
      )


    }


  }
  //BudgetCard
  handleView($Event : any){
    this.router.navigate(['/budget/detail/', $Event.budgetId]);
  }

  handleEdit($Event : Budget){
    this.router.navigate(['/budget/edit/',$Event.budgetId]);
  }

  handleDelete($Event : Budget){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar al presupuesto: ${$Event.descriptionBudget}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.budgetService.deleteBudget($Event.budgetId).subscribe({
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
