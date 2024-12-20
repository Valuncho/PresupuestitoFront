import { Component, Inject, inject } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../core/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from '../../../../core/model/Budget';
import { PaymentsTableComponent } from "../../../payments/components/payments-table/payments-table.component";
import { Payment } from '../../../../core/model/Payment';
import { BudgetListComponent } from '../../../budgets/components/budget-list/budget-list.component';
import { ClientComponent } from '../../components/client/client.component';
import { ClientHistory } from '../../../../core/model/ClientHistory';
import { ModalService } from '../../../../core/utils/modal.service';
import { ClientControllerService } from '../../../../core/controllers/client-controller.service';
import {BudgetService} from "../../../../core/services/budget.service";

/**
 * @class ClientDetailsComponent
 *
 * Componente a renderizar que contiene informacion relacionada con los clientes.
 *
 */
@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [ CommonModule, BudgetListComponent, ClientComponent],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private clientService = inject(ClientService);
  private budgetService = inject(BudgetService);
  private clientController = Inject(ClientControllerService)
  private modalService = inject(ModalService);
  id : number  = 0;

  currentClient : ClientHistory = {
    clientHistoryId: 0,
    clientId : {
      clientId: 0,
      personId: {
        personId: 0,
        name: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
        dni: '',
        cuit: '',
      },
    },
    budgetsId : []
  }
  budgets : Budget[] | undefined = [];
  payments: Payment[] | undefined = [];

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['clientId']);

    this.clientService.getClientById(this.id).subscribe({
      next: (clientRes) => {
        this.currentClient.clientId = clientRes.value;

      }
    })

    this.budgetService.getBudgetsByClientId(this.id).subscribe({
      next: (budgetsRes) => {
        this.currentClient.budgetsId = budgetsRes;
      }
    })
  }

  //Botones
  goToBudgetForm(){
    this.router.navigate(["/budget/new/", this.id])
  }
  openPaymentForm(){
    //this.modalService.openModal<PaymentsFormComponent,Payment>(PaymentsFormComponent);
  }


}
