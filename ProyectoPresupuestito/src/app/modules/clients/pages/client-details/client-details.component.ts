import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { Client } from '../../../../core/model/Client';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../core/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Budget } from '../../../../core/model/Budget';
import { PaymentsTableComponent } from "../../../payments/components/payments-table/payments-table.component";
import { Payment } from '../../../../core/model/Payment';
import { BudgetListComponent } from '../../../budgets/components/budget-list/budget-list.component';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, BudgetListComponent, PaymentsTableComponent],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {
  private clientService = inject(ClientService);
  id : number  = 0;
  client = signal<Client | undefined>(undefined);
  budgets : Budget[] | undefined = [];
  payments: Payment[] | undefined = [];
  
  
  constructor(private activatedRoute: ActivatedRoute){
    
  
  }

  ngOnInit(): void {
    //this.id = parseInt(this.activatedRoute.snapshot.params['clientId']);
    this.clientService.selectedClient.subscribe(client =>{
      this.client.set(client);
    })

    
    this.budgets = this.clientService.getBudgets(this.client()?.idClient!);
    
    this.payments =  this.budgets?.flatMap(budget => budget.payments || []);
    
  }

  
}
