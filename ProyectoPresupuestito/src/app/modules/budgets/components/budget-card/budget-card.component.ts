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
  constructor() {
   
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
