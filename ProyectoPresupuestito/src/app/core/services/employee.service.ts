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

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    getSalaries() {
        throw new Error('Method not implemented.');
    }
    getSalaryById(idSalary: number) {
        throw new Error('Method not implemented.');
    }
    deleteSalary(idSalary: number) {
        throw new Error('Method not implemented.');
    }
  //Properties
  private http = inject(HttpClient);
  private modal = inject(ModalService);
  private error = inject(ErrorControllerService);
  private notification = inject(NotificationService);
  
  private employees : Employee[] = [
    {
      idEmployee: 1001,
      salary: 100,
      oPerson: {
          idPerson: 1,
          name: "John",
          lastName: "Doe",
          direction: "123 Main St",
          phoneNumber: "1234567890",
          mail: "johndoe@example.com",
          dni: "123456789",
          cuit: "30-12345678-9"
      }
    },
    {
        idEmployee: 1002,
        salary: 200,
        oPerson: {
            idPerson: 2,
            name: "Jane",
            lastName: "Smith",
            direction: "456 Elm St",
            phoneNumber: "9876543210",
            mail: "janesmith@example.com",
            dni: "987654321",
            cuit: "30-98765432-1"
        }
    }
  ]
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
  postEmployee(employee: Employee){
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
  putEmployee(employee: Employee) {
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
