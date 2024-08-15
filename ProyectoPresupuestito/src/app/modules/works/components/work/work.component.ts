import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Work } from '../../../../core/model/Work';
import { CommonModule } from '@angular/common';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { WorkService } from '../../../../core/services/work.service';
import { Router } from '@angular/router';
import { BudgetService } from '../../../../core/services/budget.service';
import { Budget } from '../../../../core/model/Budget';
import { set } from 'lodash';
import {BudgetViewComponent} from "../../../budgets/pages/budget-view/budget-view.component";

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent, BudgetViewComponent],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent {
  private router = inject(Router);
  private workService = inject(WorkService);
  private budgetService = inject(BudgetService);

  budget : Budget = this.budgetService.getEmptyBudget();
  currentWork : Work = this.workService.getEmptyWork();
  options = false;

  ngOnInit(): void {



    this.workService.getSelectedWork().subscribe(work=>{
      this.currentWork = work;
      this.setBudget();

      if(this.router.url == "/work" && this.currentWork.idWork != 0){
        this.options = true;
      }
    })


  }

  setBudget(){
    let budget = this.budgetService.getBudgetByWork(this.currentWork);
    this.budgetService.setSelectedBudget(budget.idBudget);
  }


  goToWorkArea(){
    this.setBudget()
    this.router.navigate(["/work/edit"]);
  }

  goToBudgetDetail(){
    this.setBudget()
    console.log("qhe")
    this.router.navigate(["/budget/detail"]);
  }

}
