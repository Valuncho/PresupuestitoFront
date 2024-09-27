import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';
import { Salary } from '../model/Salary';


/**
 * 
 * @class EmployeeControllerService
 * 
 * Clase controller de la entidad employee para:
 * -Ser pasamanos de información,
 * -Obtener objetos vacios,
 * -Manejar el editado en el formulario.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeControllerService {
  
  //Edit
  private editMode : boolean = false;

  setEditMode(option : boolean){
  this.editMode = option;
  }
  getEditMode() : boolean{
  return this.editMode;
  }

 //GetEmptyObjects
  constructor() { }

  getEmptyEmployee() : Employee{
    return  {
      idEmployee: 0,
      salary : 0,
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

  getEmptySalary() : Salary{
    return  {
      idSalary: 0,
      amount: 0,
      billDate: 0,
      oPayment:{
        idPayment:0,
        date: new Date(0),
        amount: 0,
        description: "",
      }
    }; 
}
}
