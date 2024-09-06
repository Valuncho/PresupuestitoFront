import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { API_URL, ENDPOINTS } from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Cost } from '../model/Cost';


@Injectable({
    providedIn: 'root'
    })
    export class CostService {
    //Properties
    private http = inject(HttpClient);

    //METODOS HTTP ----------------------------------------------------------------------------------------------
    
        /**
         * retorna todos los fixedCost guardados
         * @returns un array de fixedCost como un observable
         */
        
        getFixedCosts(): Observable<Cost[]>{
        return this.http.get<Cost[]>(API_URL+ENDPOINTS.fixedCost.getAll);
        }

    /**
     * retorna al fixedCost solicitado por id 
     * @param idfixedCost 
     * @returns un fixedCost como un observable  
     */
        
        getFixedCostById(idFixedCost : Number){
            const url = API_URL+ENDPOINTS.fixedCost.getById.replace(':id', idFixedCost.toString());
            return this.http.get<Cost>(url);
        }

        /**
         * Envia un objeto fixedCost
         * @param fixedCost 
         * @returns Un Observable que emite un array de fixedCost
         */
        
        postFixedCost(fixedCost : Cost){
            const url = API_URL+ENDPOINTS.fixedCost.post;
            return this.http.post(url,fixedCost);
        }

        /**
         * suspende a un fixedCost
         * @param fixedCost 
         * @returns un observable que emite el fixedCost actualizado
         */
        
        deleteFixedCost(fixedCost: Cost){
        const url = API_URL + ENDPOINTS.fixedCost.update;
        return this.http.put(url, fixedCost);
        }

}
