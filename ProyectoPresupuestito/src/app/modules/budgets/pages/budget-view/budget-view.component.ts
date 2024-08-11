import { Component, inject } from '@angular/core';
import { Budget } from '../../../../core/model/Budget';
import { BudgetService } from '../../../../core/services/budget.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BudgetListComponent } from "../../components/budget-list/budget-list.component";
import { BudgetFormComponent } from "../../components/budget-form/budget-form.component";

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [BudgetListComponent, BudgetFormComponent],
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.css'
})
export class BudgetViewComponent {

  private budgetService = inject(BudgetService);

  selectedBudget? : Budget;
  isEdit : boolean = false;
  budgets : Budget[] | undefined = [];

  
  BudgetForm : FormGroup = new FormGroup({
    createdDate : new FormControl(new Date()),
    deadLine : new FormControl(new Date()),
    description : new FormControl(''),
    cost : new FormControl(''),
    estado : new FormControl(''),
  });

  
  options = ['Creado', 'Aprobado', 'Elaboración', 'Parado' , 'Finalizado', 'Entregado', 'Cancelado'];

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    //this.budgets = this.budgetService.getBudgets();

  }
  
  
  onEdit(){
    this.isEdit = true;
    let id = parseInt(this.activatedRoute.snapshot.params['budgetId']);
    this.selectedBudget = this.budgetService.getBudgetById(id);
    if(this.selectedBudget){
      console.log(this.selectedBudget);
      this.BudgetForm.patchValue(this.selectedBudget);
      
      this.BudgetForm.patchValue({createdDate : this.selectedBudget.createdDate.toISOString().split('T')[0]});
      this.BudgetForm.patchValue({deadLine : this.selectedBudget.deadLine.toISOString().split('T')[0]});
      this.BudgetForm.patchValue({estado: this.selectedBudget.Status })
      
    }
    
  }
  onSubmit(){
    console.log(this.BudgetForm.value);
  }
}
