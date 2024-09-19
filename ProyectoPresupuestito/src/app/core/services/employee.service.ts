import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Employee } from '../model/Employee';
import { EmployeeHistory } from '../model/EmployeeHistory';
import { API_URL,ENDPOINTS } from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../model/Supplier';
import { Salary } from '../model/Salary';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //Properties
  private http = inject(HttpClient);
  
  private employees : Employee[] = [
    {
      idEmployee: 1001,
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
  private employeesHistory : EmployeeHistory [] = [
    {
      idEmployeeHistory: 1,
      oSalary:[],
      oEmployee: this.employees[0]
    },
    {
      idEmployeeHistory: 2,
      oSalary:[],
      oEmployee: this.employees[1]
    }

  ]

  //METODOS HTTP ----------------------------------------------------------------------------------------------
  
    /**
     * retorna todos los empleados guardados
     * @returns un array de empleados como un observable
     */
    
    getEmployees(): Observable<Employee[]>{
      return this.http.get<Employee[]>(API_URL+ENDPOINTS.employee.getAll);
    }

    getSalaries(): Observable<Salary[]>{
      return this.http.get<Salary[]>(API_URL+ENDPOINTS.salaries.getAll);
    }

    

  /**
   * retorna al empleado solicitado por id 
   * @param IdEmployee 
   * @returns un empleado como un observable  
   */
    
    getEmployeeById(IdEmployee : Number) : Observable<Employee> {
        const url = API_URL+ENDPOINTS.employee.getById.replace(':id', IdEmployee.toString());
        return this.http.get<Employee>(url);
    }

    getSalariesByemployeeId(IdEmployee : Number) : Observable<Salary> {
      const url = API_URL+ENDPOINTS.employee.getById.replace(':id', IdEmployee.toString());
      return this.http.get<Salary>(url);
  }

    /**
     * Envia un objeto empleado
     * @param employee 
     * @returns Un Observable que emite un array de empleados
     */
    
    postEmployee(employee : Employee){
        const url = API_URL+ENDPOINTS.employee.post;
        return this.http.post(url,employee);
    }

    postSalary(salaries : Salary){
      const url = API_URL+ENDPOINTS.salaries.post;
      return this.http.post(url,salaries);
  }


    putSalary(salaries: Salary) {
      const url = API_URL+ENDPOINTS.salaries.update;
      return this.http.put(url,salaries);
    }

    /**
     * suspende a un empleado
     * @param employee 
     * @returns un observable que emite el empleado actualizado
     */
    
    deleteSalary(salaries: Salary){
      const url = API_URL + ENDPOINTS.salaries.update;
      return this.http.put(url, salaries);
    }
    

  /*
  handlePostEmployee(employee : Employee){
    const id = this.postEmployee(employee);
    employee.idEmployee = id;
    this.addNewEmployee(employee);
    const emptyHistory : EmployeeHistory = {
      idEmployeeHistory: id,
      oSalary:[],
      oEmployee: employee,
    }
    this.employeesHistory.push(emptyHistory);
  }

  handleUpdateEmployee(employee : Employee){
    this.putEmployee(employee);
  }

  handleDeleteEmployee(employeeId : number){
    this.employees = this.employees.filter((employee)=> employee.idEmployee !== employeeId);
    this._employeesSubject.next(this.employees);
    this.deleteEmployee(employeeId);
  }*/
  
  getEmptyEmployee() : Employee{
    return  {
      idEmployee: 0,
      oPerson: {
        idPerson: 0,
        name: '',
        lastName: '',
        direction: '',
        phoneNumber: '',
        mail: '',
        dni: '',
        cuit: '',
      },
    }; 
  }
}
