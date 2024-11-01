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
  private workModel: BehaviorSubject<Work > = new BehaviorSubject<Work >(this.getEmptyWork());
  
  public getWork(): Observable<WorkRequest> {
    return this.work.asObservable();
  }

  public setWork(work: WorkRequest) {
    this.work.next(work);
  }
  public getWorkModel(): Observable<Work> {
    return this.workModel.asObservable();
  }

  public setWorkModel(work: Work) {
    this.workModel.next(work);
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
      workName : '',
      workStatus : '',
      itemsId: [],
      estimatedHoursWorked: 0,
      deadLine: new Date(),
      costPrice: 0,
      status: '',
      notes: '',
    };
  }
  getEmptyWorkRequest(): WorkRequest {
    return {
     
      estimatedHoursWorked: 0,
      deadLine: new Date(),
      costPrice: 0,
      workStatus: '',
      notes: '',
      budgetId:0,
      workName:''
    };
  }
  //Mapping
  toWorkModel() : Work{
    return this.getEmptyWork();
  }

  toWorkRequest() : WorkRequest{
    this.work.getValue().deadLine = this.workModel.getValue().deadLine;
    this.work.getValue().workStatus = this.workModel.getValue().workStatus;
    this.work.getValue().workName = this.workModel.getValue().workName;
    this.work.getValue().notes = this.workModel.getValue().notes;
    this.work.getValue().workId = this.workModel.getValue().idWork;

    return this.getEmptyWorkRequest();
  }

}
