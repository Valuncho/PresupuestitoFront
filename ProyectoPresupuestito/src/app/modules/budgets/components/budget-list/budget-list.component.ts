import { Location } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
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
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationService);
  private budgetService = inject(BudgetService);
  private clientService = inject(ClientService);
  //Properties
  @Input() budgets : Budget[] = [];
  
  budgetsToDisplay : Budget[] = [];
  clientId : number = 0
  options : boolean = false;
  //Pagination
  page : number = 1;
  itemsPerPage : number = 5;


  ngOnInit(){
    this.clientId = parseInt(this.activatedRoute.snapshot.params['clientId']);
    const clientUrl = "/client/detail/"+this.clientId;
    if(this.router.url == clientUrl){
      console.log(this.router.url)
      this.options = true;
    }else{
      this.budgetService.getBudgets().subscribe(
        {
          next: res => {this.budgets = res}
        }
      )
    }


  }

  handleSelectBudget($Event : number){
    this.router.navigate(['/budget/detail/', $Event]);
  }

  handleAction($Event : any){
    this.router.navigate(['/work/new/',$Event ]);
  }

  handleView($Event : any){
    this.router.navigate(['/budget/detail/', $Event]);
  }

  handleEdit($Event : any){
    this.router.navigate(['/budget/edit/',$Event]);
  }

  handleDelete($Event : any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar al presupuesto con ID ${$Event}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.budgetService.deleteBudget($Event).subscribe({
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
