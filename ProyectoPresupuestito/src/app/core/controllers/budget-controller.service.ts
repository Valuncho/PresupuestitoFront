import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Budget } from '../model/Budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetControllerService {
  private budgetId: BehaviorSubject<number > = new BehaviorSubject<number >(0);
   
  public getBudgetId(): Observable<number> {
    return this.budgetId.asObservable();
  }

  public setBudgetId(budgetId: number) {
    this.budgetId.next(budgetId);
  
  }

  getEmptyBudget() : Budget{
    return{
      budgetId : 0,
      works : [],
      dateCreated: new Date(),
      deadLine: new Date(),
      descriptionBudget: '',
      cost : 0,
      budgetStatus : '',
      payments : []
    }
  }
}
