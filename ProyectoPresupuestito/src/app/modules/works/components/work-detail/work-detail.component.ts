import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { Work } from '../../../../core/model/Work';
import { CommonModule } from '@angular/common';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { WorkService } from '../../../../core/services/work.service';
import { Router } from '@angular/router';
import { BudgetService } from '../../../../core/services/budget.service';
import { Budget } from '../../../../core/model/Budget';
import { set } from 'lodash';
import {BudgetViewComponent} from "../../../budgets/pages/budget-view/budget-view.component";
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';
import { Item } from '../../../../core/model/Item';

@Component({
  selector: 'app-work-detail',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent, BudgetViewComponent],
  templateUrl: './work-detail.component.html',
  styleUrl: './work-detail.component.css'
})
export class WorkComponent {
  private router = inject(Router);
  private workService = inject(WorkService);
  private budgetService = inject(BudgetService);
  private materialController = inject(MaterialControllerService);

  budget : Budget = this.budgetService.getEmptyBudget();
  currentWork : Work = this.workService.getEmptyWork();
  item : Item = this.materialController.getEmptyItem();
  options = false;

  ngOnInit(): void {


/*
    this.workService.getSelectedWork().subscribe(work=>{
      this.currentWork = work;
      

      if(this.router.url == "/work" && this.currentWork.idWork != 0){
        this.options = true;
      }
    })
*/

  }

  editItem(item : Item){
    this.materialController.setItem(item);
  }

  goToWorkArea(){
    this.router.navigate(["/work/edit"]);
  }

  goToBudgetDetail(){
    this.router.navigate(["/budget/detail"]);
  }

}
