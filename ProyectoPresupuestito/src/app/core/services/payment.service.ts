import { inject, Injectable } from '@angular/core';
import { Payment } from '../model/Payment';
import { API_URL, ENDPOINTS } from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);

  constructor() { 
  
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(API_URL+ENDPOINTS.payments.getAll);
  }

  getEmptyPayment(): Payment {
    return  {
      idPayment: 0,
      date: new Date(0), 
      amount: 0,
      description: ""
    };
  }

  getPaymentById(idPayment : number) : Observable<Payment> {
    const url = API_URL+ENDPOINTS.payments.getById.replace(':id', idPayment.toString());
    return this.http.get<Payment>(url);   
  }

  postPayment(payment: Payment){
    const url = API_URL+ENDPOINTS.payments.post;
    return this.http.post(url,payment);
  }

  putPayment(payment: Payment) {
    const url = API_URL+ENDPOINTS.payments.update;
    return this.http.put(url,payment);
  }

  deletePayment(idPayment: number) {
    const url = API_URL+ENDPOINTS.payments.delete;
    return this.http.put(url,idPayment);
  }

  
}