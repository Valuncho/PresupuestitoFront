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

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [BudgetComponent],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent {
  private budgetService = inject(BudgetService)
  private clientService = inject(ClientService)
  budgets = signal<Budget[]>([]);
  clientId = signal<number>(0);
  
   url = window.location.href;
   searchParams = new URLSearchParams(this.url);

  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private location: Location
  ){
  //  this.handleGetClients();
   // this.clientService.resetSelectedClient();
  }
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.has('clientId')){
        this.clientId.set(parseInt(params.get('clientId')!));
        let history = this.clientService.getClienHistory(this.clientId());
        this.budgets.set(this.budgetService.getClientBudgets(history)!);
      }else{
        this.handleGetBudgets();
      }
      
      
    });
  
  }

  handleGetBudgets(){
    this.budgetService.getBudgets().subscribe({
      next : (budgets)=>{
      
        this.budgets.set(budgets);
      }
    }
    )
  }
}
