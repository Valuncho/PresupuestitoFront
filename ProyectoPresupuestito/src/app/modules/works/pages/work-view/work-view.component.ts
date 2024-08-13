import { Component, inject } from '@angular/core';
import { WorkListComponent } from "../../components/work-list/work-list.component";
import { WorkComponent } from "../../components/work/work.component";
import { WorkFormComponent } from '../../components/work-form/work-form.component';
import { Router } from '@angular/router';
import { BudgetService } from '../../../../core/services/budget.service';

@Component({
  selector: 'app-work-view',
  standalone: true,
  imports: [WorkListComponent, WorkComponent,WorkFormComponent],
  templateUrl: './work-view.component.html',
  styleUrl: './work-view.component.css'
})
export class WorkViewComponent {

}
