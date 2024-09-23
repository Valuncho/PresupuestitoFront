import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Employee } from '../model/Employee';
import { EmployeeHistory } from '../model/EmployeeHistory';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //Properties
  private employees : Employee[] = [
    {
      idEmployee: 1001,
      salary:20,
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
        salary:20,
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
  private employeeSeleccionado : Employee = this.getEmptyEmployee();

  private _employeesSubject = new BehaviorSubject<Employee[]>([]);
  private _selectedEmployeeSubject = new BehaviorSubject<Employee>(this.employeeSeleccionado);

  constructor() {
    this._employeesSubject.next(this.employees);
  }
 
  //Metodos que se conectarian con el back
  getEmployees(){
    
  }
  getEmployeeById(employeeId: number): Employee | undefined {
    return this.employees.find(employee => employee.idEmployee === employeeId);
  }
  
  postEmployee(employee : Employee) : number{
    //peticion post al back
    let id = Math.floor(Math.random() * 91) + 10;
    console.log('Peticion post exitosa');
    console.log('Nuevo id' + id);
    return id;
  }

  putEmployee(employee : Employee){
    //peticion post al back
    console.log('Peticion put exitosa');
    console.log(employee);
  }

  deleteEmployee(employeeId : number){
    console.log('Peticion delete exitosa');
    console.log('Cliente eliminado con id' + employeeId);
  }


  //Metodos propios del front
  getEmptyEmployee() : Employee{
    
    const emptyEmployee: Employee = {
      idEmployee: 0,
      salary:0,
      oPerson: {
        idPerson: 0,
        name: '',
        lastName: '',
        direction: '',
        phoneNumber: '',
        mail: '',
        dni: '',
        cuit: ''
      }
    };
    return emptyEmployee;
  }
  
  get employeess(){
    return this._employeesSubject.asObservable();
  }
  
  getEmployeeHistory(employeeId : number) : EmployeeHistory{
    return this.employeesHistory.find(history => history.oEmployee.idEmployee === employeeId)!;
  }

  get selectedEmployee(){
    return this._selectedEmployeeSubject.asObservable();
  }

  setSelectedEmployee(employeeId: number){
    this.employeeSeleccionado = this.getEmployeeById(employeeId)!;
    this._selectedEmployeeSubject.next(this.employeeSeleccionado);
    
  }
  resetSelectedEmployee(){
    this.employeeSeleccionado = this.getEmptyEmployee();
    this._selectedEmployeeSubject.next(this.employeeSeleccionado); 
  }
  //Metodos que se conectan con los componentes
  handleGetEmployee(){
  }

  addNewEmployee(employee : Employee){
    this.employees.push(employee);
    this._employeesSubject.next(this.employees);
  }

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
  }

}
