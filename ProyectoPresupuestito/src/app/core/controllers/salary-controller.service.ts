import { Injectable } from '@angular/core';
import { Salary } from '../model/Salary';
import { Payment } from '../model/Payment';

@Injectable({
  providedIn: 'root'
})
export class SalaryControllerService {

  constructor() { }

  
  getEmptySalary(): Salary {
    return  {
      idSalary: 0,
      billDate: 0, 
      amount: 0,
      oPayment:{
        idPayment: 0,
        date : new Date(0),
        amount : 1,
        description : ""
      }
    };
  }
}
