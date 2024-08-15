import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../../../core/model/Client';
import { Budget } from '../../../../core/model/Budget';
import * as lodash from 'lodash';
@Component({
  selector: 'app-budget-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './budget-search.component.html',
  styleUrl: './budget-search.component.css'
})
export class BudgetSearchComponent {

  @Input() budgets: Budget[] = [];
  @Output() budgetSelected = new EventEmitter<number>();
  @Output() results = new EventEmitter<Budget[]>();
  @Output() sortedResults = new EventEmitter<Budget[]>();
  filtro = new FormControl('');
  busqueda = new FormControl('');
  idBudget = new FormControl(0);
  filteredBudget: Budget[] = [];

  ngOnInit() {
    this.filteredBudget = this.budgets;
  }

  sort() {
  
  }

  search() {
  
  
   
  }
}
