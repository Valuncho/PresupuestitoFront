import { Injectable } from '@angular/core';
import { FixedCost } from '../model/FixedCost';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostControllerService {

  private fixedCost: BehaviorSubject<FixedCost | undefined> = new BehaviorSubject<FixedCost | undefined>(undefined);

  public getFixedCost() : Observable<FixedCost | undefined>{
    return this.fixedCost.asObservable();
  }

  public setFixedCost(fixedCost: FixedCost) {
    this.fixedCost.next(fixedCost);
  }
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
