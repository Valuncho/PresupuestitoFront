import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { API_URL, ENDPOINTS } from '../endpoints';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalService } from '../utils/modal.service';
import { ErrorControllerService } from '../utils/error-controller.service';
import { NotificationService } from '../utils/notification.service';
import { FixedCost } from '../model/FixedCost';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';

//Para futuras implementaciones.
@Injectable({
    providedIn: 'root'
    })
    export class CostService {
    //Properties
    private http = inject(HttpClient);
    private modal = inject(ModalService);
    private error = inject(ErrorControllerService);
    private notification = inject(NotificationService);

    //METODOS HTTP ----------------------------------------------------------------------------------------------

    /**
     * Retorna todos los costos disponibles guardados.
     * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
     * @returns Un array de costos como un observable.
     */
    getFixedCosts() : Observable<FixedCost[]> {
        return this.http.get<FixedCost[]>(API_URL+ENDPOINTS.fixedCost.getAll).pipe(
        catchError((error: any, caught: Observable<any>): Observable<any> => {
            this.error.setError(error);
            this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
            return of();
        }));  
    }

    /**
   * Retorna al costo solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idFixedCost id del costo solicitado.
   * @returns Un costo como un observable.
   */
    getFixedCostById(idFixedCost : number) : Observable<FixedCost> {
        const url = API_URL+ENDPOINTS.clients.getById.replace(':id', idFixedCost.toString());
        return this.http.get<FixedCost>(url).pipe(
        catchError((error: any, caught: Observable<any>): Observable<any> => {
            this.error.setError(error);
            this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
            return of();
        })
        );
    }

    /**
     * Método para crear un costo nuevo.
     * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
     * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
     * @param Cost costo a cargar en la base de datos
     * @returns un observable de tipo objeto
     */
    postFixedCost(fixedCost: FixedCost){
        const url = API_URL+ENDPOINTS.fixedCost.post;
        return this.http.post(url,fixedCost).pipe(
        tap(() => {
            this.notification.showNotification("¡Costo guardado con éxito!");
        }),
        catchError((error: any, caught: Observable<any>): Observable<any> => {
            this.error.setError(error);
            this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
            return of();
        })
        );  
    }

    /**
     * Método para actualizar información de un costo existente.
     * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
     * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
     * @param Cost costo actualizado.
     * @returns un observable de tipo objeto
     */
    putFixedCost(FixedCost: FixedCost) {
        const url = API_URL+ENDPOINTS.fixedCost.update;
        return this.http.put(url,FixedCost).pipe(
        tap(() => {
            this.notification.showNotification("¡Costo editado con éxito!");
        }),
        catchError((error: any, caught: Observable<any>): Observable<any> => {
            this.error.setError(error);
            this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
            return of();
        })
        );  
    }

    /**
   * Método para marcar como borrado a un costo existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idFixedCost id del costo a eliminar.
   * @returns un observable de tipo objeto
   */
    deleteFixedCost(idFixedCost: number) {
        const url = API_URL+ENDPOINTS.fixedCost.delete;
        return this.http.patch(url,idFixedCost).pipe(
        tap(() => {
            this.notification.showNotification("¡Costo eliminado con éxito!");
        }),
        catchError((error: any, caught: Observable<any>): Observable<any> => {
            this.error.setError(error);
            this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
            return of();
        })
        );  
    }

}
