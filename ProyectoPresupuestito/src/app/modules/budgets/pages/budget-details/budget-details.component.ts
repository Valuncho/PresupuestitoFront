import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../../components/navbar/navbar.component";
import { BudgetService } from '../../../../core/services/budget.service';
import { Budget } from '../../../../core/model/Budget';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkDetailComponent } from '../../../works/components/work-detail/work-detail.component';
import { Work } from '../../../../core/model/Work';
import { WorkCardComponent } from "../../../works/components/work-card/work-card.component";
import { BudgetComponent } from "../../components/budget/budget.component";
import { ClientComponent } from "../../../clients/components/client/client.component";
import { Client } from '../../../../core/model/Client';
import { WorkListComponent } from "../../../works/components/work-list/work-list.component";
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';
import { WorkComponent } from '../../../works/components/work/work.component';
import { ClientService } from '../../../../core/services/client.service';
import { WorkItemListComponent } from "../../../workItems/components/work-item-list/work-item-list.component";
import { throwIfEmpty } from 'rxjs';
import { BudgetControllerService } from '../../../../core/controllers/budget-controller.service';
import { ClientControllerService } from '../../../../core/controllers/client-controller.service';
import {StonksCalculatorComponent} from "../../components/stonks-calculator/stonks-calculator.component";
/**
 * @class BudgetDetailsComponent
 *
 *
 *
 */
@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, WorkDetailComponent, WorkCardComponent, BudgetComponent, ClientComponent, WorkListComponent, WorkComponent, WorkItemListComponent, StonksCalculatorComponent],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.css'
})
export class BudgetDetailsComponent {
  //Utils
  private activatedRoute = inject(ActivatedRoute);
  private clientService = inject(ClientService);
  private budgetService = inject(BudgetService);
  private workController = inject(WorkControllerService);
  private budgetController = inject(BudgetControllerService);
  private clientController = inject(ClientControllerService);


  //Properties
  currentBudget : Budget = this.budgetController.getEmptyBudget();
  budgetId : number = this.currentBudget.budgetId;
  budgetClient : Client = this.clientController.getEmptyClient();
  currentWork : Work = this.workController.getEmptyWork();
  option = this.currentWork.workId != 0 ? false : true;


  ngOnInit(){
   this.budgetController.getReload().subscribe({
     next: (Res) =>{
       if (Res){
         this.getBudgetData()
       }
     }
   })
  this.getBudgetData()
  }

  ngOnDestroy(): void {
    this.workController.setWorkModel(this.workController.getEmptyWork())
    this.budgetController.setReload(false);
  }

  getBudgetData(){
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
          this.workController.getWorkModel().subscribe({
            next : (workRes) =>{
              this.currentWork = workRes;
              if(workRes.workId != 0){
                this.option = false
              }
            }
          })
          this.budgetController.setBudgetId(this.budgetId!);
          this.calculatePrice();
        }
      }
    )
  }

  calculatePrice(){
    this.budgetService.getCost(this.budgetId).subscribe({
      next : (res) => {
        this.currentBudget.cost = res
      }
    })
  }



}

