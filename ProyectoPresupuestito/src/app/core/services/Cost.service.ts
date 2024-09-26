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

    private costSeleccionado : Cost = this.getEmptyFixedCost();
    private _costSubject = new BehaviorSubject<Cost[]>([]);

    private _selectedCostSubject = new BehaviorSubject<Cost>(this.costSeleccionado);

    private fixedCosts : Cost[] = [
        {
            idCost: 1001,
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

        putFixedCost(fixedCost: Cost) {
            const url = API_URL+ENDPOINTS.fixedCost.update;
            return this.http.put(url,fixedCost);
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

        getEmptyFixedCost(): Cost{
            return {
                idCost: 0,
                description : "",
                amount : 0,
                workingDays : 0,
                hoursWorked : 0,
                date : new Date(0),
            }
        }

        handleUpdateFixedCost(fixedCost: Cost) {
            this.putFixedCost(fixedCost);
        }

        handleDeleteFixedCost(costId : number){
            this.fixedCosts = this.fixedCosts.filter((cost)=> cost.idCost !== costId);
            this._costSubject.next(this.fixedCosts);
            //this.deleteFixedCost(costId);
        }
}
