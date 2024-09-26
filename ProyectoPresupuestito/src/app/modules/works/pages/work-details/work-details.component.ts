import { Component } from '@angular/core';
import { BudgetListComponent } from '../../../budgets/components/budget-list/budget-list.component';
import { WorkComponent } from "../../components/work/work.component";

@Component({
  selector: 'app-work-details',
  standalone: true,
  imports: [BudgetListComponent, WorkComponent],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.css'
})
export class WorkDetailsComponent {

}
