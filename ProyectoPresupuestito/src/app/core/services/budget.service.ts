import { inject, Injectable, signal } from '@angular/core';
import { Budget } from '../model/Budget';
import { WorkService } from './work.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ClientHistory } from '../model/ClientHistory';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private workService = inject(WorkService);

  private budgets = signal<Budget[]>([
    {
      idBudget: 1,
      works: [
       this.workService.getWorks()[0],
       this.workService.getWorks()[1],
      ], // Replace with actual work data if needed
      createdDate: new Date('2023-08-20'),
      deadLine: new Date('2023-12-22'),
      description: 'Kitchen renovation',
      cost: 5000,
      Status: 'Parado',
      payments: [
        { idPayment:1, amount: 1000, date: new Date('2023-09-20'), description: "Primer pago" },
        { idPayment:2, amount: 3000, date: new Date('2023-10-20'), description: "Segundo pago" },
        { idPayment:3, amount: 1000, date: new Date('2023-11-20'), description: "Cancelacion deuda" }
      ] // Or provide payment data if needed
    },
    {
      idBudget: 2,
      works: [
        this.workService.getWorks()[2],
        this.workService.getWorks()[3],
      ],
      createdDate: new Date('2024-01-15'),
      deadLine: new Date('2024-02-15'),
      description: 'Bathroom remodeling',
      cost: 3000,
      Status: 'Aprobado',
      payments: [
        // Payment data if applicable
      ]
    },
    {
      idBudget: 3,
      works: [this.workService.getWorks()[4]],
      createdDate: new Date('2023-09-15'),
      deadLine: new Date('2023-10-15'),
      description: 'Renovación de habitaciones',
      cost: 4200,
      Status: 'Elaboración',
      payments: [
        { idPayment:4, amount: 1000, date: new Date('2023-09-15'), description: "Primer pago" },
        { idPayment:5, amount: 3200, date: new Date('2023-10-15'), description: "Cancelacion deuda" }
      ]
    },
    {
      idBudget: 4,
      works: [this.workService.getWorks()[5]],
      createdDate: new Date('2024-02-01'),
      deadLine: new Date('2024-03-31'),
      description: 'Ampliación de espacio exterior',
      cost: 8500,
      Status: 'Elaboración',
      payments: []
    }])
    
  private selectedBudget = signal<Budget>(this.getEmptyBudget());

  budgets$ = toObservable(this.budgets);
  selectedBudget$ = toObservable(this.selectedBudget)
  
  ;
  constructor() { }

  getEmptyBudget() : Budget{
    
    const EmptyBudget: Budget = {
      idBudget: 0,
      works: [],
      createdDate: new Date(),
      deadLine: new Date(),
      description: '',
      cost: 0,
      Status: 'Creado',
      payments: [] 
    }
    return EmptyBudget;
  }

  getBudgets(){
    return this.budgets$;
  }

  getBudgetById(id: number): Budget | undefined {
    return this.budgets().find(budget => budget.idBudget === id);
  }

  getSelectedBudget() : Observable<Budget>{
    return this.selectedBudget$;
  }

  setSelectedBudget(budgetId: number){
    this.selectedBudget.set(this.getBudgetById(budgetId)!);
  }
  resetSelectedBudget(){
    this.selectedBudget.set(this.getEmptyBudget());
  }

  postBudget(budget : Budget) : number{
    //peticion post al back
    let id = Math.floor(Math.random() * 91) + 10;
    console.log('Peticion post exitosa');
    console.log('Nuevo id: ' + id);
    return id;
  }

  putBudget(budget : Budget){
    //peticion post al back
    console.log('Peticion put exitosa');
    console.log(budget);

  }
  deleteBudget(budgetId : number){
    console.log('Peticion delete exitosa');
    console.log('Presupuesto eliminado con id: ' + budgetId);
  }


  //Metodos que se conectan con los componentes
  handleGetBudgets(){

  }

  addNewBudget(budget : Budget){
    this.budgets().push(budget);
  }

  handlePostBudget(budget : Budget){
    const id = this.postBudget(budget);
    budget.idBudget = id;
    this.addNewBudget(budget);
  }

  handleUpdateBudget(budget : Budget){
    this.putBudget(budget);

  }
  handleDeleteBudget(budgetId : number){
    this.budgets.update((budgets)=> budgets.filter((budget)=> budget.idBudget !== budgetId));
    this.deleteBudget(budgetId)
    
  }

  getClientBudgets(history: ClientHistory): Budget[] | undefined{
    const budgets = history.budgets;
    return budgets.length > 0 ? budgets : undefined;
    
  }


}
