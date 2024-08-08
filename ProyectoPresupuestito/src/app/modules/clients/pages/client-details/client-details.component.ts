import { Component, Input, inject, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { Client } from '../../../../core/model/Client';
import { CommonModule, Location } from '@angular/common';
import { ClientService } from '../../../../core/services/client.service';
import { ActivatedRoute } from '@angular/router';

import { Budget } from '../../../../core/model/Budget';
import { PaymentsTableComponent } from "../../../payments/components/payments-table/payments-table.component";
import { Payment } from '../../../../core/model/Payment';
import { BudgetListComponent } from "../../../budgets/components/budget-list/budget-list.component";

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, PaymentsTableComponent, BudgetListComponent],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {
  @Input() id : number  = 0;
  client = signal<Client | undefined>(undefined);
  budgets : Budget[] | undefined = [];
  payments: Payment[] | undefined = [];
  private clientService = inject(ClientService);
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location
  ){
    
  
  }

  ngOnInit(): void {
    const path = this.location.path();
  const searchParams = new URLSearchParams(path);

  if (searchParams.has('clientId')) {
    console.log('El parámetro id existe');
  }
    this.id = parseInt(this.activatedRoute.snapshot.params['clientId']);
    
    this.client.set(this.clientService.getClientById(this.id));
    
    this.budgets = this.clientService.getBudgets(this.id);
    
    this.payments =  this.budgets?.flatMap(budget => budget.payments || []);
    
  }

  
}
