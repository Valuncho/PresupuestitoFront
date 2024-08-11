import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../../components/navbar/navbar.component";
import { BudgetService } from '../../../../core/services/budget.service';
import { Budget } from '../../../../core/model/Budget';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkComponent } from '../../../works/components/work/work.component';
import { Work } from '../../../../core/model/Work';
import { WorkService } from '../../../../core/services/work.service';
import { WorkCardComponent } from "../../../works/components/work-card/work-card.component";

@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, WorkComponent, WorkCardComponent],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.css'
})
export class BudgetDetailsComponent {

  private budgetService = inject(BudgetService);
  private workService = inject(WorkService);
  currentBudget : Budget | undefined = {
    idBudget: 0,
    works: [],
    createdDate: new Date(),
    deadLine: new Date(),
    description: "",
    cost: 0,
    Status: "",
    payments: [],
  };
  budgetId? : number;

  currentWork? : Work;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.budgetId = parseInt(this.activatedRoute.snapshot.params['budgetId']);
    this.currentBudget = this.budgetService.getBudgetById(this.budgetId);
  }

  seleccionar(workId : number){
    this.currentWork = this.workService.getWorkById(workId);
  }
  editWork($Event : number){

  }
  deleteWork($Event : number){

  }
}
