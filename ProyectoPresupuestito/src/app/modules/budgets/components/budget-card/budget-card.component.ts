import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Budget } from '../../../../core/model/Budget';
import { CommonModule } from '@angular/common';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';

@Component({
  selector: 'app-budget-card',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent],
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.css'
})
export class BudgetCardComponent {
  @Input() Budget: Budget | undefined;
  @Input() idBudget: number = 0;
  @Output() isSelect = new EventEmitter<number>();
  @Output() isEdit = new EventEmitter<number>();
  @Output() isDeleted = new EventEmitter<number>();
  botones: Array<{  url: string; icon: string }> =[];


  ngOnInit(){
    this.botones = [
      { url: '/budget/detail/'+this.idBudget+'', icon: 'info' },
      { url: '/budget/edit/'+this.idBudget, icon: 'edit' },
      { url: '/budget/delete'+this.idBudget+'', icon: 'delete' },
      { url: '/payment/'+this.idBudget+'', icon: 'payments' },
    ];
    
  }
  constructor() {

  }
  select(){
    this.isSelect.emit(this.idBudget);
  }
  edit(){
    this.isEdit.emit(this.idBudget);
  }

  deleteC(){
    this.isDeleted.emit(this.idBudget);
  }
  
}
