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
import { ClientHistory } from '../../../../core/model/ClientHistory';

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
  
  currentClient : ClientHistory = 
    {
      idClientHistory: 1,
      oClient: {
      idClient: 1001,
      oPerson: {
        idPerson: 1,
        name: 'John',
        lastName: 'Doe',
        direction: '123 Main St',
        phoneNumber: '1234567890',
        mail: 'johndoe@example.com',
        dni: '123456789',
        cuit: '30-12345678-9',
      }
    },
    budgets: [
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
      }
    ]

  };
  
  budgets : Budget[] | undefined = [];
  payments: Payment[] | undefined = [];
  
  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['clientId']);
    this.clientService.getClientHistoryById(this.id).subscribe({
        next: res => this.currentClient = res,  
        error: err => console.error('An error occurred :', err),  
        complete: () => console.log('There are no more action happen.')  
    }
      )

    
   // this.budgets = this.clientService.getBudgets(this.client()?.idClient!);
    
    this.payments =  this.budgets?.flatMap(budget => budget.payments || []);
    
  }
  goToBudgetForm(){
    this.router.navigate(["/budget/new/", this.id])
  }
  
}
