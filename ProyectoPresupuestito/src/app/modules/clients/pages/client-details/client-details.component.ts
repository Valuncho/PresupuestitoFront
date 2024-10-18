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
import { PaymentsFormComponent } from '../../../payments/components/payments-form/payments-form.component';
import { ModalService } from '../../../../core/utils/modal.service';

/**
 * @class ClientDetailsComponent
 * 
 * Componente a renderizar que contiene informacion relacionada con los clientes.
 *
 */
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
  private modalService = inject(ModalService);
  id : number  = 0;
  
  currentClient : ClientHistory = 
    {
      idClientHistory: 1,
      oClient: {
      clientId: 1001,
      personId: {
        personId: 1,
        name: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        phoneNumber: '1234567890',
        email: 'johndoe@example.com',
        dni: '123456789',
        cuit: '30-12345678-9',
      }
    },
    budgets: [
      {
        idBudget: 1,
        works: [], 
        createdDate: new Date('2023-08-20'),
        deadLine: new Date('2023-12-22'),
        description: 'Kitchen renovation',
        cost: 5000,
        Status: 'Cancelado',
        payments: [], 
      },
      {
        idBudget: 2,
        works: [],
        createdDate: new Date('2024-01-15'),
        deadLine: new Date('2024-02-15'),
        description: 'Bathroom remodeling',
        cost: 3000,
        Status: 'Aprobado',
        payments: [],
      }
    ]

  };
  
  budgets : Budget[] | undefined = [];
  payments: Payment[] | undefined = [];
  
  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['clientId']);

    this.clientService.getClientHistoryById(this.id).subscribe({
        next: res => this.currentClient = res,    
    })
  }

  //Botones
  goToBudgetForm(){
    this.router.navigate(["/budget/new/", this.id])
  }
  openPaymentForm(){
    this.modalService.openModal<PaymentsFormComponent,Payment>(PaymentsFormComponent);
  }
  
  
}
