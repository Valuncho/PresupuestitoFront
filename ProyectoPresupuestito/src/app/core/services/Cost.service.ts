import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { API_URL, ENDPOINTS } from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { FixedCost } from '../model/FixedCost';


@Injectable({
    providedIn: 'root'
    })
    export class CostService {
    //Properties
    private http = inject(HttpClient);

    private costSeleccionado : FixedCost = this.getEmptyFixedCost();
    private _costSubject = new BehaviorSubject<FixedCost[]>([]);

    private _selectedCostSubject = new BehaviorSubject<FixedCost>(this.costSeleccionado);

    private fixedCosts : FixedCost[] = [
        {
            idFixedCost: 1001,
            description: "John",
            amount: 1,
            workingDays: 1,
            hoursWorked: 1,
            date: new Date(0),
        }
    ]

    //METODOS HTTP ----------------------------------------------------------------------------------------------
    
        /**
         * retorna todos los fixedCost guardados
         * @returns un array de fixedCost como un observable
         */
        
        getFixedCosts(): Observable<FixedCost[]>{
            return this.http.get<FixedCost[]>(API_URL+ENDPOINTS.fixedCost.getAll);
        }

    /**
     * retorna al fixedCost solicitado por id 
     * @param idfixedCost 
     * @returns un fixedCost como un observable  
     */
        
        getFixedCostById(idFixedCost : Number){
            const url = API_URL+ENDPOINTS.fixedCost.getById.replace(':id', idFixedCost.toString());
            return this.http.get<FixedCost>(url);
        }

        /**
         * Envia un objeto fixedCost
         * @param fixedCost 
         * @returns Un Observable que emite un array de fixedCost
         */
        
        postFixedCost(fixedCost : FixedCost){
            const url = API_URL+ENDPOINTS.fixedCost.post;
            return this.http.post(url,fixedCost);
        }

        putFixedCost(fixedCost: FixedCost) {
            const url = API_URL+ENDPOINTS.fixedCost.update;
            return this.http.put(url,fixedCost);
        }

        /**
         * suspende a un fixedCost
         * @param fixedCost 
         * @returns un observable que emite el fixedCost actualizado
         */
        
        deleteFixedCost(fixedCost: FixedCost){
        const url = API_URL + ENDPOINTS.fixedCost.update;
        return this.http.put(url, fixedCost);
        }

        getEmptyFixedCost(): FixedCost{
            return {
                idFixedCost: 0,
                description : "",
                amount : 0,
                workingDays : 0,
                hoursWorked : 0,
                date : new Date(0),
            }
        }


}
