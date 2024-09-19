import { Component, inject } from '@angular/core';
import { WorkListComponent } from "../../components/work-list/work-list.component";
import { WorkComponent } from "../../components/work-detail/work-detail.component";
import { WorkFormComponent } from '../../components/work-form/work-form.component';
import { Router } from '@angular/router';
import { BudgetService } from '../../../../core/services/budget.service';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';

@Component({
  selector: 'app-work-view',
  standalone: true,
  imports: [WorkListComponent, WorkComponent,WorkFormComponent,ButtonCardComponent],
  templateUrl: './work-view.component.html',
  styleUrl: './work-view.component.css'
})

export class WorkViewComponent {

}
