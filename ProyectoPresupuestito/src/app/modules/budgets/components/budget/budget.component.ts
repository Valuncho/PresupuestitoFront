import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Budget } from '../../../../core/model/Budget';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css', "../../../../styles/Detail.css"]
})
export class BudgetComponent {
 @Input()  budget! : Budget;

}
