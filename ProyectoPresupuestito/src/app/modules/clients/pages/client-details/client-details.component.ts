import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { Client } from '../../../../core/model/Client';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../core/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from '../../../../core/model/Budget';
import { PaymentsTableComponent } from "../../../payments/components/payments-table/payments-table.component";
import { Payment } from '../../../../core/model/Payment';
import { BudgetListComponent } from '../../../budgets/components/budget-list/budget-list.component';
import { ClientComponent } from '../../components/client/client.component';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, BudgetListComponent, PaymentsTableComponent, ClientComponent],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private clientService = inject(ClientService);
  id : number  = 0;
  currentClient! : Client;
  
  budgets : Budget[] | undefined = [];
  payments: Payment[] | undefined = [];
  
  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['clientId']);
    this.clientService.getClientById(this.id).subscribe(client =>{
      this.currentClient = client;
    })

    
   // this.budgets = this.clientService.getBudgets(this.client()?.idClient!);
    
    this.payments =  this.budgets?.flatMap(budget => budget.payments || []);
    
  }
  goToBudgetForm(){
    this.router.navigate(["/budget/new/", this.id])
  }
  
}
