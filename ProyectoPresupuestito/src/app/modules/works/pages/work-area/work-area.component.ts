import { Component, inject } from '@angular/core';
import { WorkListComponent } from "../../components/work-list/work-list.component";
import { WorkComponent } from "../../components/work-detail/work-detail.component";
import { MaterialListComponent } from "../../../materials/components/lists/material-list/material-list.component";
import { WorkService } from '../../../../core/services/work.service';
import { Router } from '@angular/router';
import {BudgetService} from "../../../../core/services/budget.service";

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [WorkListComponent, WorkComponent, MaterialListComponent],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.css'
})
export class WorkAreaComponent {
  //Util
  private workService = inject(WorkService);
  private budgetService = inject(BudgetService);
  private router = inject(Router);
  private currentWork = this.workService.getEmptyWork();
  ngOnInit(): void {
    this.workService.getSelectedWork().subscribe(work =>{
      this.currentWork = work;
    })
    if( this.currentWork == this.workService.getEmptyWork())  {
      this.router.navigate(['/work'])
    }
  }

  ngOnDestroy(){
    this.budgetService.resetSelectedBudget();
  }

}
