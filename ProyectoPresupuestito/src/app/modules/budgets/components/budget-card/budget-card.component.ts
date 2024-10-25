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
  styleUrl: './budget-card.component.css'
})
export class BudgetCardComponent {
  @Input() Budget!: Budget;
  @Output() isSelect = new EventEmitter<Budget>();
  @Output() isEdit = new EventEmitter<Budget>();
  @Output() isDeleted = new EventEmitter<Budget>();
  botones: Array<{ icon: string }> =[];
  today = new Date();
  changedDate = '';
  pipe = new DatePipe('en-US');
  changeFormat(){
    //this.Budget.createdDate = this.pipe.transform(this.Budget.createdDate, 'dd/MM/YYYY');
    //this.changedDate = ChangedFormat!;
    console.log(this.changedDate);
  }

  ngOnInit(){
    this.botones = [
      {icon : 'info'},
      {icon: 'edit'},
      {icon: 'delete'}
    ];
    this.changeFormat()

    
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
