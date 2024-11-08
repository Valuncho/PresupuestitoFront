import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { API_URL, ENDPOINTS } from '../endpoints';
import { Salary } from '../model/Salary';
import { ErrorControllerService } from '../utils/error-controller.service';
import { ModalService } from '../utils/modal.service';
import { NotificationService } from '../utils/notification.service';
//Futura implementacion
/**
 * @class SalaryService
 *
 * Servicio de la entidad salario para comunicarse con el backend, gestionando errores y aciertos.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class SalaryService {

    private http = inject(HttpClient);
    private modal = inject(ModalService);
    private error = inject(ErrorControllerService);
    private notification = inject(NotificationService);

    /**
     * Retorna todos los salarios disponibles guardados.
     * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
     * @returns Un array de salarios como un observable.
     */
      getSalaries() : Observable<Salary[]> {
        return this.http.get<Salary[]>(API_URL+ENDPOINTS.salaries.getAll).pipe(
          catchError((error: any, caught: Observable<any>): Observable<any> => {
            this.error.setError(error);
            this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
            return of();
        }));
      }

  /**
   * Retorna el salario solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idEmployee id del salario solicitado.
   * @returns Un salario como un observable.
   */
    getSalaryById(idEmployee : number) : Observable<Salary> {
    const url = API_URL+ENDPOINTS.salaries.getById.replace(':id', idEmployee.toString());
    return this.http.get<Salary>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );  
  }

  /**
   * Método para crear un salario nuevo.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param Salary salario a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
    postSalary(salaries: Salary){
    const url = API_URL+ENDPOINTS.salaries.post;
    return this.http.post(url,salaries).pipe(
      tap(() => {
        this.notification.showNotification("¡Salario guardado con éxito!");
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );  
  }

  /**
   * Método para actualizar información de un salario existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param salary salario actualizado.
   * @returns un observable de tipo objeto
   */
  putSalary(salaries: Salary) {
    const url = API_URL+ENDPOINTS.salaries.update;
    return this.http.put(url,salaries).pipe(
      tap(() => {
        this.notification.showNotification("¡Salario editado con éxito!");
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );  
  }

  /**
   * Método para marcar como borrado a un salario existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idEmployee id del salario a eliminar.
   * @returns un observable de tipo objeto
   */
  deleteSalary(idEmployee: number) {
    const url = API_URL+ENDPOINTS.salaries.delete;
    return this.http.patch(url,idEmployee).pipe(
      tap(() => {
        this.notification.showNotification("¡salario eliminado con éxito!");
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );  
  }
}
