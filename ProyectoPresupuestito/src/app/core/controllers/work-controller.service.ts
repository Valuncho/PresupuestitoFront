import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Work } from '../model/Work';
import { WorkRequest } from '../request/workRequest';

@Injectable({
  providedIn: 'root',
})
export class WorkControllerService {
  //Selected entities
  private work: BehaviorSubject<WorkRequest > = new BehaviorSubject<WorkRequest >(this.getEmptyWorkRequest());

  public getWork(): Observable<WorkRequest> {
    return this.work.asObservable();
  }

  public setWork(work: WorkRequest) {
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
  getEmptyWorkRequest(): WorkRequest {
    return {
      workId: 0,
      estimatedHoursWorked: 0,
      deadLine: new Date(),
      costPrice: 0,
      statusSerialized: '',
      notes: '',
      budgetId:0,
      image:''
    };
  }
}
