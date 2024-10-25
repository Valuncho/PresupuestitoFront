import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../../components/navbar/navbar.component";
import { BudgetService } from '../../../../core/services/budget.service';
import { Budget } from '../../../../core/model/Budget';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkDetailComponent } from '../../../works/components/work-detail/work-detail.component';
import { Work } from '../../../../core/model/Work';
import { WorkService } from '../../../../core/services/work.service';
import { WorkCardComponent } from "../../../works/components/work-card/work-card.component";
import { BudgetComponent } from "../../components/budget/budget.component";
import { ClientComponent } from "../../../clients/components/client/client.component";
import { Client } from '../../../../core/model/Client';
import { WorkListComponent } from "../../../works/components/work-list/work-list.component";
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';
import { WorkComponent } from '../../../works/components/work/work.component';
import { ClientService } from '../../../../core/services/client.service';
/**
 * @class BudgetDetailsComponent
 * 
 * Buscador de la entidad cliente, sin funcionar por el momento.
 *
 */
@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, WorkDetailComponent, WorkCardComponent, BudgetComponent, ClientComponent, WorkListComponent, WorkComponent],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.css'
})
export class BudgetDetailsComponent {
  //Utils
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private budgetService = inject(BudgetService);
  private clientService = inject(ClientService);
  
  
  //Properties
  currentBudget! : Budget;
  budgetId? : number;
  budgetClient : Client ={
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
  };

  currentWork? : Work;

  

  ngOnInit(){
    this.budgetId = parseInt(this.activatedRoute.snapshot.params['budgetId']);    
    this.budgetService.getBudgetById(this.budgetId).subscribe(
      {
        next : (res) => {
          this.currentBudget = res.value;
          this.clientService.getClientById(res.value.clientId.clientId).subscribe(
            {
              next : (clientRes) =>{
                this.budgetClient = clientRes.value;
              }
            }
          )
        }
      }
     )
 
  }

  goToWorkArea(){
    this.router.navigate(["/work/edit/",this.currentBudget.budgetId]);
  }
  calculatePrice(){

  }
  calculateDeadline(){
    
  }

  seleccionar(workId : number){
    //this.currentWork = this.workService.getWorkById(workId)!;
    //this.workService.setSelectedWork(this.currentWork);
  }
  editWork($Event : number){

  }
  deleteWork($Event : number){

  }
}

