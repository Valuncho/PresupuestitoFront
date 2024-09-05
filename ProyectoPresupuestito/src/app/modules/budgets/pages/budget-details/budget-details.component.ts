import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../../components/navbar/navbar.component";
import { BudgetService } from '../../../../core/services/budget.service';
import { Budget } from '../../../../core/model/Budget';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkComponent } from '../../../works/components/work-detail/work-detail.component';
import { Work } from '../../../../core/model/Work';
import { WorkService } from '../../../../core/services/work.service';
import { WorkCardComponent } from "../../../works/components/work-card/work-card.component";
import { BudgetComponent } from "../../components/budget/budget.component";
import { ClientComponent } from "../../../clients/components/client/client.component";
import { Client } from '../../../../core/model/Client';
import { WorkListComponent } from "../../../works/components/work-list/work-list.component";

@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, WorkComponent, WorkCardComponent, BudgetComponent, ClientComponent, WorkListComponent],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.css'
})
export class BudgetDetailsComponent {
  //Utils
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private budgetService = inject(BudgetService);
  private workService = inject(WorkService);
  //Properties
  currentBudget! : Budget; 
  budgetId? : number;
  budgetClient : Client ={
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
  };

  currentWork? : Work;

  

  ngOnInit(){
    this.budgetId = parseInt(this.activatedRoute.snapshot.params['budgetId']);    
    this.budgetService.getBudgetById(this.budgetId).subscribe(budget =>{
      this.currentBudget  = budget;
    })
    
  }

  goToWorkArea(){
    this.router.navigate(["/work/edit/",this.currentBudget.idBudget]);
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

