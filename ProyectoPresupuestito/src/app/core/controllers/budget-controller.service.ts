import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
}
