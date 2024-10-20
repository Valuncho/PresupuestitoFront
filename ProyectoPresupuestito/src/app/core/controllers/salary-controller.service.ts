import { Injectable } from '@angular/core';
import { Salary } from '../model/Salary';
import { Payment } from '../model/Payment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryControllerService {

  private salary: BehaviorSubject<Salary | undefined> = new BehaviorSubject<Salary | undefined>(undefined);
  

  public getSalary() : Observable<Salary | undefined>{
    return this.salary.asObservable();
  }

  public setSalary(salary: Salary) {
    this.salary.next(salary);
  }

  private editMode : boolean = false;

  setEditMode(option : boolean){
  this.editMode = option;
  }
  getEditMode() : boolean{
  return this.editMode;
  }

  getEmptySalary(): Salary {
    return  {
      idSalary: 0,
      billDate: 0, 
      amount: 0,
      payments:[{
        idPayment: 0,
        date : new Date(0),
        amount : 1,
        description : ""
      }]
    };
  }
}
