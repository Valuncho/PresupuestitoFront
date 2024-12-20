import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Budget } from '../model/Budget';
import {BudgetRequest} from "../request/budgetRequest";

@Injectable({
  providedIn: 'root'
})
export class BudgetControllerService {

  private reload : BehaviorSubject<boolean > = new BehaviorSubject<boolean >(false);

  public getReload(): Observable<boolean> {
    return this.reload.asObservable();
  }

  public setReload(flag: boolean) {
    this.reload.next(flag);

  }

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

  getEmptyBudgetRequest(): BudgetRequest {

    return {
      clientId : 0,
      budgetStatus : "",
      deadLine : new Date(),
      dateCreated:new Date(),
      descriptionBudget : ""
    }
  }
}
