import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../../components/navbar/navbar.component";
import { BudgetService } from '../../../../core/services/budget.service';
import { Budget } from '../../../../core/model/Budget';
import { ActivatedRoute, Router } from '@angular/router';
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
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private budgetService = inject(BudgetService);
  private workService = inject(WorkService);
  currentBudget : Budget  = this.budgetService.getEmptyBudget()
  budgetId? : number;

  currentWork? : Work;

  

  ngOnInit(){
    this.budgetId = parseInt(this.activatedRoute.snapshot.params['budgetId']);    
    
    this.budgetService.getSelectedBudget().subscribe(budget =>{
      this.currentBudget = budget;
    })
  }

  goToWorkArea(){
    this.router.navigate(["/work/edit"]);
  }

  seleccionar(workId : number){
    this.currentWork = this.workService.getWorkById(workId)!;
    this.workService.setSelectedWork(this.currentWork);
  }
  editWork($Event : number){

  }
  deleteWork($Event : number){

  }
}

