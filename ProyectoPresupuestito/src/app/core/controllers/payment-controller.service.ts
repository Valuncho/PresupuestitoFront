import { Injectable } from '@angular/core';
import { Payment } from '../model/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentControllerService {

  constructor() { }
  
  getEmptyPayment(): Payment {
    return  {
      idPayment: 0,
      date: new Date(0), 
      amount: 0,
      description: ""
    };
  }
}
