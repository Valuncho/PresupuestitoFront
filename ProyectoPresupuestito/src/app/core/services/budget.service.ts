import { inject, Injectable } from '@angular/core';
import { Budget } from '../model/Budget';
import { WorkService } from './work.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ClientHistory } from '../model/ClientHistory';
import { Work } from '../model/Work';
import { HttpClient } from '@angular/common/http';
import { API_URL, ENDPOINTS } from '../endpoints';
@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  //Utils

  private http = inject(HttpClient);
  //Properties
  
  

  private estados: string[] = [
    'Presupuestado',
    'Aprobado',
    'Rechazado',
    'En proceso',
    'Entregado',
    'Cancelado',
  ];

  
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
  getBudgets() : Observable<Budget[]> {
    return this.http.get<Budget[]>(API_URL+ENDPOINTS.budgets.getAll);   
  }

  getBudgetById(idBudget : number) : Observable<Budget>{
    const url = API_URL+ENDPOINTS.budgets.getById.replace(':id', idBudget.toString());
    return this.http.get<Budget>(url);   
  }

  postBudget(budget: Budget) {
    const url = API_URL+ENDPOINTS.budgets.post;
    return this.http.post(url,budget);
  }

  putBudget(budget: Budget) {
    const url = API_URL+ENDPOINTS.budgets.update;
    return this.http.put(url,budget);
  }

  deleteBudget(budgetId: number) {
    const url = API_URL+ENDPOINTS.budgets.delete;
    return this.http.put(url,budgetId);
  }

  //Metodos

  getEstados() {
    return this.estados;
  }

  

  //Metodos que se conectan con los componentes
  handleGetBudgets() {}

  

  handlePostBudget(budget: Budget){
   
  }

  handleUpdateBudget(budget: Budget) {
    this.putBudget(budget);
  }

  handleDeleteBudget(budgetId: number) {
    
    this.deleteBudget(budgetId);
  }

  getClientBudgets(history: ClientHistory): Budget[] | undefined {
    const budgets = history.budgets;
    return budgets.length > 0 ? budgets : undefined;
  }
/*
  getBudgetByWork(work: Work) {
    return this.budgets.find((budget) =>
      budget.works.some((w) => w.idWork === work.idWork)
    )!;
  }*/
}
