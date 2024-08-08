import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Budget } from '../../../../core/model/Budget';
import { CommonModule } from '@angular/common';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {
  @Input() Budget: Budget | undefined;
  @Input() idBudget: number = 0;
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
  edit(){
    this.isEdit.emit(this.idBudget);
  }

  deleteC(){
    this.isDeleted.emit(this.idBudget);
  }
  
}
