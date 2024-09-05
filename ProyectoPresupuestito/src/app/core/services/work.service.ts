import { inject, Injectable } from '@angular/core';
import { Work } from '../model/Work';
import { BehaviorSubject, Observable } from 'rxjs';
import { MaterialService } from './material.service';
import { HttpClient } from '@angular/common/http';
import { API_URL, ENDPOINTS } from '../endpoints';
@Injectable({
  providedIn: 'root'
})
export class WorkService {
  //Util
  private http = inject(HttpClient);  
  
  private estados : string[] = ['Presupuestado','Pendiente de aprobación','Aprobado','En proceso','Entregado','Cancelado'];
  
  getWorks() : Observable<Work[]> {
    return this.http.get<Work[]>(API_URL+ENDPOINTS.clients.getAll);   
  }
  
  getWorkById(workId: number) : Observable<Work>{
    const url = API_URL+ENDPOINTS.works.getById.replace(':id', workId.toString());
    return this.http.get<Work>(url); 
  }

  postWork(work: Work){
    const url = API_URL+ENDPOINTS.works.post;
    return this.http.post(url,work);
  }

  putWork(work: Work){
    const url = API_URL+ENDPOINTS.works.update;
    return this.http.put(url,work);
  }
  
  deleteWork(work: Work){
    const url = API_URL+ENDPOINTS.works.delete;
    return this.http.put(url,work);
  }

  getEstados(){
    return this.estados;
  }

  getEmptyWork() : Work{
    const work : Work = {
      idWork: 0,
      order: 0,
      materials: [],
      estimatedHoursWorked: 8,
      deadline: new Date(),
      costPrice: 0,
      status: 'Presupuestado',
      notes: '',
      images: []
    }
    return work;
  }

}
