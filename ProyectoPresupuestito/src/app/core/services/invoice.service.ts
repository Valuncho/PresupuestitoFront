import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { API_URL, ENDPOINTS } from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../model/Invoice';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  //Properties
  private http = inject(HttpClient);
  

  //METODOS HTTP ----------------------------------------------------------------------------------------------
  
    /**
     * retorna todos los Invoice guardados
     * @returns un array de Invoice como un observable
     */
    
    getInvoices(): Observable<Invoice[]>{
      return this.http.get<Invoice[]>(API_URL+ENDPOINTS.invoice.getAll);
    }

  /**
   * retorna al Invoice solicitado por id 
   * @param idInvoice 
   * @returns un Invoice como un observable  
   */
    
    getInvoiceById(idInvoice : Number){
        const url = API_URL+ENDPOINTS.invoice.getById.replace(':id', idInvoice.toString());
        return this.http.get<Invoice>(url);
    }

    /**
     * Envia un objeto Invoice
     * @param Invoice 
     * @returns Un Observable que emite un array de Invoice
     */
    
    postInvoice(invoice : Invoice){
        const url = API_URL+ENDPOINTS.invoice.post;
        return this.http.post(url,invoice);
    }

    putInvoice(invoice: Invoice) {
      const url = API_URL+ENDPOINTS.invoice.update;
      return this.http.put(url,invoice);
    }

    /**
     * suspende a un Invoice
     * @param Invoice 
     * @returns un observable que emite el Invoice actualizado
     */
    
    deleteInvoice(invoice: Invoice){
      const url = API_URL + ENDPOINTS.invoice.update;
      return this.http.put(url, invoice);
    }

    getEmptyInvoice(): Invoice{
      return {
        idInvoice:0,
        date: new Date(0),
        isPaid: false,
        oItems:[],
        oPayment:[]
      }
    }
}