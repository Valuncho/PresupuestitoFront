import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Employee } from '../model/Employee';
import { EmployeeHistory } from '../model/EmployeeHistory';
import { API_URL,ENDPOINTS } from '../endpoints';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Supplier } from '../model/Supplier';
import { Salary } from '../model/Salary';
import { ModalService } from '../utils/modal.service';
import { ErrorControllerService } from '../utils/error-controller.service';
import { NotificationService } from '../utils/notification.service';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { EmployeeRequest } from '../request/employeeRequest';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //Properties
  private http = inject(HttpClient);
  private modal = inject(ModalService);
  private error = inject(ErrorControllerService);
  private notification = inject(NotificationService);
  
  
  //METODOS HTTP ----------------------------------------------------------------------------------------------
  
    /**
     * Retorna todos los empleados disponibles guardados.
     * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
     * @returns Un array de empleados como un observable.
     */
    getEmployees() : Observable<Employee[]> {
      return this.http.get<Employee[]>(API_URL+ENDPOINTS.employees.getAll).pipe(      
        catchError((error: any, caught: Observable<any>): Observable<any> => {
          this.error.setError(error);
          this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
          return of();
      })); 
    }

  /**
   * Retorna al empleado solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idEmployee id del empleado solicitado.
   * @returns Un empleado como un observable.
   */
  getEmployeeById(idEmployee : number) : Observable<Employee> {
    const url = API_URL+ENDPOINTS.employees.getById.replace(':id', idEmployee.toString());
    return this.http.get<Employee>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

  /**
   * Método para crear un empleado nuevo.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param employee empleado a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
  postEmployee(employee: EmployeeRequest){
    const url = API_URL+ENDPOINTS.employees.post;
    return this.http.post(url,employee).pipe(
      tap(() => {
        this.notification.showNotification("¡empleado guardado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

  /**
   * Método para actualizar información de un empleado existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param employee empleado actualizado.
   * @returns un observable de tipo objeto
   */
  putEmployee(employee: EmployeeRequest) {
    const url = API_URL+ENDPOINTS.employees.update;
    return this.http.put(url,employee).pipe(
      tap(() => {
        this.notification.showNotification("¡Empleado editado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }

  /**
   * Método para marcar como borrado a un empleado existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idEmployee id del empleado a eliminar.
   * @returns un observable de tipo objeto
   */
  deleteEmployee(idEmployee: number) {
    const url = API_URL+ENDPOINTS.employees.delete;
    return this.http.patch(url,idEmployee).pipe(
      tap(() => {
        this.notification.showNotification("¡Empleado eliminado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }
    
}
