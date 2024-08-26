import { inject, Injectable } from '@angular/core';
import { Budget } from '../model/Budget';
import { WorkService } from './work.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ClientHistory } from '../model/ClientHistory';
import { Work } from '../model/Work';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  //Utils
  private workService = inject(WorkService);
  //Properties
  private budgets: Budget[] = [
    {
      idBudget: 1,
      works: [
        this.workService.getWorkById(1)!,
        this.workService.getWorkById(2)!,
      ], // Replace with actual work data if needed
      createdDate: new Date('2023-08-20'),
      deadLine: new Date('2023-12-22'),
      description: 'Kitchen renovation',
      cost: 5000,
      Status: 'Cancelado',
      payments: [
        {
          idPayment: 1,
          amount: 1000,
          date: new Date('2023-09-20'),
          description: 'Primer pago',
        },
        {
          idPayment: 2,
          amount: 3000,
          date: new Date('2023-10-20'),
          description: 'Segundo pago',
        },
        {
          idPayment: 3,
          amount: 1000,
          date: new Date('2023-11-20'),
          description: 'Cancelacion deuda',
        },
      ], // Or provide payment data if needed
    },
    {
      idBudget: 2,
      works: [
        this.workService.getWorkById(3)!,
        this.workService.getWorkById(4)!,
      ],
      createdDate: new Date('2024-01-15'),
      deadLine: new Date('2024-02-15'),
      description: 'Bathroom remodeling',
      cost: 3000,
      Status: 'Aprobado',
      payments: [
        // Payment data if applicable
      ],
    },
    {
      idBudget: 3,
      works: [this.workService.getWorkById(5)!],
      createdDate: new Date('2023-09-15'),
      deadLine: new Date('2023-10-15'),
      description: 'Renovación de habitaciones',
      cost: 4200,
      Status: 'En proceso',
      payments: [
        {
          idPayment: 4,
          amount: 1000,
          date: new Date('2023-09-15'),
          description: 'Primer pago',
        },
        {
          idPayment: 5,
          amount: 3200,
          date: new Date('2023-10-15'),
          description: 'Cancelacion deuda',
        },
      ],
    },
    {
      idBudget: 4,
      works: [
        this.workService.getWorkById(6)!,
        this.workService.getWorkById(7)!,
      ],
      createdDate: new Date('2024-02-01'),
      deadLine: new Date('2024-03-31'),
      description: 'Ampliación de espacio exterior',
      cost: 8500,
      Status: 'En proceso',
      payments: [],
    },
  ];

  private selectedBudget: Budget = this.getEmptyBudget();

  private estados: string[] = [
    'Presupuestado',
    'Aprobado',
    'Rechazado',
    'En proceso',
    'Entregado',
    'Cancelado',
  ];

  private _budgetsSubject = new BehaviorSubject<Budget[]>([]);
  private _selectedBudgetSubject = new BehaviorSubject<Budget>(
    this.selectedBudget
  );

  constructor() {
    this._budgetsSubject.next(this.budgets);
  }

  getEmptyBudget(): Budget {
    const EmptyBudget: Budget = {
      idBudget: 0,
      works: [],
      createdDate: new Date(),
      deadLine: new Date(),
      description: '',
      cost: 0,
      Status: 'Creado',
      payments: [],
    };
    return EmptyBudget;
  }

  //Metodos back
  getBudgets() {
    return this._budgetsSubject.asObservable();
  }

  getBudgetById(id : number) : Observable<Budget>{
    this.selectedBudget = this.budgets.find((budget) => budget.idBudget === id)!;
    return of(this.selectedBudget);
  }

  getBudgetsByCreatedDate(){

  }

  getBudgetsByDeadLine(){

  }


  getPresupuestoById(id: number): Budget | undefined {
    return this.budgets.find((budget) => budget.idBudget === id);
  }

  postBudget(budget: Budget): number {
    //peticion post al back
    let id = Math.floor(Math.random() * 91) + 10;
    console.log('Peticion post exitosa');
    console.log('Nuevo id: ' + id);
    return id;
  }

  putBudget(budget: Budget) {
    //peticion post al back
    console.log('Peticion put exitosa');
    console.log(budget);
  }
  deleteBudget(budgetId: number) {
    console.log('Peticion delete exitosa');
    console.log('Presupuesto eliminado con id: ' + budgetId);
  }

  //Metodos

  getEstados() {
    return this.estados;
  }

  getSelectedBudget() {
    return this._selectedBudgetSubject.asObservable();
  }

  setSelectedBudget(budgetId: number) {
   // this.selectedBudget = this.getPresupuestoById(budgetId)!;
    this._selectedBudgetSubject.next(this.selectedBudget);
  }

  resetSelectedBudget() {
    this.selectedBudget = this.getEmptyBudget();
    this._selectedBudgetSubject.next(this.selectedBudget);
  }

  //Metodos que se conectan con los componentes
  handleGetBudgets() {}

  addNewBudget(budget: Budget) {
    this.budgets.push(budget);
    this._budgetsSubject.next(this.budgets);
  }

  handlePostBudget(budget: Budget) : number{
    const id = this.postBudget(budget);
    budget.idBudget = id;
    this.addNewBudget(budget);
    return  id;
  }

  handleUpdateBudget(budget: Budget) {
    this.putBudget(budget);
  }

  handleDeleteBudget(budgetId: number) {
    this.budgets = this.budgets.filter(
      (budget) => budget.idBudget !== budgetId
    );
    this._budgetsSubject.next(this.budgets);
    this.deleteBudget(budgetId);
  }

  getClientBudgets(history: ClientHistory): Budget[] | undefined {
    const budgets = history.budgets;
    return budgets.length > 0 ? budgets : undefined;
  }

  getBudgetByWork(work: Work) {
    return this.budgets.find((budget) =>
      budget.works.some((w) => w.idWork === work.idWork)
    )!;
  }
}
