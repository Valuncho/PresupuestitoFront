import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Work } from '../model/Work';

@Injectable({
  providedIn: 'root',
})
export class WorkControllerService {
  //Selected entities
  private work: BehaviorSubject<Work > = new BehaviorSubject<Work >(this.getEmptyWork());

  public getWork(): Observable<Work> {
    return this.work.asObservable();
  }

  public setWork(work: Work) {
    this.work.next(work);
  }

  //Edit
  private editMode: boolean = false;

  setEditMode(option: boolean) {
    this.editMode = option;
  }
  getEditMode(): boolean {
    return this.editMode;
  }

  //GetEmptyObjects

  getEmptyWork(): Work {
    return {
      idWork: 0,
      materials: [],
      estimatedHoursWorked: 0,
      deadline: new Date(),
      costPrice: 0,
      status: '',
      notes: '',
    };
  }
}
