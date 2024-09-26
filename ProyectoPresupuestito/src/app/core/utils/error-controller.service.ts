import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorControllerService {

  private error: BehaviorSubject<HttpErrorResponse | undefined> = new BehaviorSubject<HttpErrorResponse | undefined>(undefined);
  
  public getError() : Observable<HttpErrorResponse | undefined>{
    return this.error.asObservable();
  }
 
  public setError(err: HttpErrorResponse) {
    this.error.next(err);
  }
}
