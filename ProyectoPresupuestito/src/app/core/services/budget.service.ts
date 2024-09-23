import { inject, Injectable } from '@angular/core';
import { Budget } from '../model/Budget';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL, ENDPOINTS } from '../endpoints';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { ErrorStateService } from './utils/error-state.service';
import { ModalService } from './utils/modal.service';
@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  //Utils
  private http = inject(HttpClient);
  private error = inject(ErrorStateService);
  private modal = inject(ModalService);
  //Properties
  
  

  private estados: string[] = [
    'Presupuestado',
    'Aprobado',
    'Rechazado',
    'En proceso',
    'Entregado',
    'Cancelado',
  ];

  

  //Metodos back
  getBudgets() : Observable<Budget[]> {
    return this.http.get<Budget[]>(API_URL+ENDPOINTS.budgets.getAll).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }

  getBudgetById(idBudget : number) : Observable<Budget>{
    const url = API_URL+ENDPOINTS.budgets.getById.replace(':id', idBudget.toString());
    return this.http.get<Budget>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }

  postBudget(budget: Budget) {
    const url = API_URL+ENDPOINTS.budgets.post;
    return this.http.post(url,budget).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }

  putBudget(budget: Budget) {
    const url = API_URL+ENDPOINTS.budgets.update;
    return this.http.put(url,budget).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }

  deleteBudget(budgetId: number) {
    const url = API_URL+ENDPOINTS.budgets.delete;
    return this.http.put(url,budgetId).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }

  //Metodos

  getEstados() {
    return this.estados;
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
}
