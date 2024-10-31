import { inject, Injectable } from '@angular/core';
import { Budget } from '../model/Budget';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL, ENDPOINTS } from '../endpoints';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { ErrorControllerService } from '../utils/error-controller.service';
import { ModalService } from '../utils/modal.service';
import { NotificationService } from '../utils/notification.service';
/**
 * @class BudgetService
 * 
 * Servicio de la entidad presupuesto para comunicarse con el backend, gestionando errores y aciertos.
 * 
 */
@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  //Utils
  private http = inject(HttpClient);
  private error = inject(ErrorControllerService);
  private modal = inject(ModalService);
  private notification = inject(NotificationService);

  //Properties
  private estados: string[] = [
    'Presupuestado',
    'Aprobado',
    'Rechazado',
    'En proceso',
    'Entregado',
    'Cancelado',
  ];

   /**
   * Retorna todos los presupuestos disponibles guardados.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns Un array de presupuestos como un observable.
   */
  getBudgets() : Observable<Budget[]> {
    return this.http.get<Budget[]>(API_URL+ENDPOINTS.budgets.getAll).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }

  /**
   * Retorna al presupuesto solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idBudget id del presupuesto solicitado.
   * @returns Un presupuesto como un observable.
   */
  getBudgetById(idBudget : number) : Observable<Budget>{
    const url = API_URL+ENDPOINTS.budgets.getById.replace(':id', idBudget.toString());
    return this.http.get<Budget>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }

   /**
   * Método para crear un presupuesto nuevo.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param budget presupuesto a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
  postBudget(budget: Budget) {
    const url = API_URL+ENDPOINTS.budgets.post;
    return this.http.post(url,budget).pipe(
      tap(() => {
        this.notification.showNotification("¡Presupuesto creado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }

  /**
   * Método para actualizar información de un presupuesto existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param budget presupuesto actualizado.
   * @returns un observable de tipo objeto
   */
  putBudget(budget: Budget) {
    const url = API_URL+ENDPOINTS.budgets.update.replace(':id', budget.idBudget.toString());
    return this.http.put(url,budget).pipe(
      tap(() => {
        this.notification.showNotification("¡Presupuesto actualizado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }

   /**
   * Método para marcar como borrado a un presupuesto existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idBudget id del presupuesto a eliminar.
   * @returns un observable de tipo objeto
   */
  deleteBudget(idBudget: number) {
    const url = API_URL+ENDPOINTS.budgets.delete.replace(':id', idBudget.toString());
    return this.http.put(url,idBudget).pipe(
      tap(() => {
        this.notification.showNotification("¡Presupuesto eliminado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }

  //Metodos
  getEstados() {
    return this.estados;
  }

  getEmptyBudget(): Budget {
    const EmptyBudget: Budget = {
      idBudget: 0,
      works: [],
      createdDate: new Date(),
      deadLine: new Date(),
      description: '',
      cost: 0,
      Status: 'Creado',
      payments: [],
    };
    return EmptyBudget;
  }
}
