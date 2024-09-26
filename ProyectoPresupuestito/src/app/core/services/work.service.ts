import { inject, Injectable } from '@angular/core';
import { Work } from '../model/Work';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL, ENDPOINTS } from '../endpoints';
/**
 * @class
 * 
 * Servicio de la entidad trabajo, para comunicarse con el backend, gestionando errores y aciertos.
 *  
 */

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  //Util
  private http = inject(HttpClient);  
  
  private estados : string[] = ['Presupuestado','Pendiente de aprobación','Aprobado','En proceso','Entregado','Cancelado'];
  
   /**
   * Retorna todos los trabajos disponibles guardados.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns Un array de trabajos como un observable.
   */
  getWorks() : Observable<Work[]> {
    return this.http.get<Work[]>(API_URL+ENDPOINTS.clients.getAll);   
  }
  /**
   * Retorna al trabajo solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idWork id del trabajo solicitado.
   * @returns Un trabajo como un observable.
   */
  getWorkById(idWork: number) : Observable<Work>{
    const url = API_URL+ENDPOINTS.works.getById.replace(':id', idWork.toString());
    return this.http.get<Work>(url); 
  }
  /**
   * Método para crear un trabajo nuevo.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param work trabajo a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
  postWork(work: Work){
    const url = API_URL+ENDPOINTS.works.post;
    return this.http.post(url,work);
  }
  /**
   * Método para actualizar información de un trabajo existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param work trabajo actualizado.
   * @returns un observable de tipo objeto
   */
  putWork(work: Work){
    const url = API_URL+ENDPOINTS.works.update;
    return this.http.put(url,work);
  }
  
   /**
   * Método para marcar como borrado a un trabajo existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idWork id del trabajo a eliminar.
   * @returns un observable de tipo objeto
   */
  deleteWork(idWork: number){
    const url = API_URL+ENDPOINTS.works.delete;
    return this.http.put(url,idWork);
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
