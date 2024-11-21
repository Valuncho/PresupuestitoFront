import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Budget } from '../../../../core/model/Budget';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-budget-card',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent,MatTooltipModule],
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.css', "../../../../styles/Card.css"]
})
export class BudgetCardComponent {
  @Input() Budget!: Budget;
  @Output() isSelect = new EventEmitter<Budget>();
  @Output() isEdit = new EventEmitter<Budget>();
  @Output() isDeleted = new EventEmitter<Budget>();
  botones: Array<{ icon: string }> =[];


  ngOnInit(){
    this.botones = [
      {icon : 'info'},
      {icon: 'edit'},
      {icon: 'delete'}
    ];

  }

  select(){
    this.isSelect.emit(this.Budget);
  }
  edit(){
    this.isEdit.emit(this.Budget);
  }

  deleteC(){
    this.isDeleted.emit(this.Budget);
  }

}
