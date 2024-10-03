import { Injectable } from '@angular/core';
import { FixedCost } from '../model/FixedCost';

@Injectable({
  providedIn: 'root'
})
export class CostControllerService {

  constructor() { }
  
  //Edit
  private editMode : boolean = false;

  setEditMode(option : boolean){
  this.editMode = option;
  }
  getEditMode() : boolean{
  return this.editMode;
  }

  //GetEmptyObjects

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
