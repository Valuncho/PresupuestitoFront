import { inject, Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { SubCategoryMaterial } from '../model/SubCategoryMaterial';
import { Material } from '../model/Material';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL,ENDPOINTS } from '../endpoints';
import { NotificationService } from '../utils/notification.service';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { ErrorControllerService } from '../utils/error-controller.service';
import { ModalService } from '../utils/modal.service';
import { SubCategoryMaterialRequest } from '../request/subCategoryMaterialRequest';
import { MaterialRequest } from '../request/materialRequest';

/**
 * @class MaterialService
 * 
 * Servicio de la entidad material para comunicarse con el backend, gestionando errores y aciertos.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  //Utils
  private http = inject(HttpClient);
  private notification = inject(NotificationService);
  private error = inject(ErrorControllerService);
  private modal = inject(ModalService);
  

  /**
   * Retorna todos los materiales disponibles guardados.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns Un array de materiales como un observable.
   */
  getMaterials()  : Observable<Material[]> {
    return this.http.get<Material[]>(API_URL+ENDPOINTS.materials.getAll).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );  
  }
  /**
   * Retorna al material solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idMaterial id del material solicitado.
   * @returns Un material como un observable.
   */
  getMaterialById(idMaterial : number) : Observable<Material> {
    const url = API_URL+ENDPOINTS.materials.getById.replace(':id', idMaterial.toString());
    return this.http.get<Material>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );
  }
/**
   * Método para crear un material nuevo.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param material material a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
  postMaterial(material: MaterialRequest){
    const url = API_URL+ENDPOINTS.materials.post;
    return this.http.post(url,material).pipe(
      tap(() => {
        this.notification.showNotification("¡Material creado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }
  /**
   * Método para actualizar información de un material existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param material material actualizado.
   * @returns un observable de tipo objeto
   */
  putMaterial(material: MaterialRequest){
    const url = API_URL+ENDPOINTS.materials.update.replace(':id', material.MaterialId!.toString());
    return this.http.put(url,material).pipe(
      tap(() => {
        this.notification.showNotification("¡Material actualizado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }

    /**
   * Método para marcar como borrado a un material existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idMaterial id del material a eliminar.
   * @returns un observable de tipo objeto
   */
  deleteMaterial(idMaterial: number){
    const url = API_URL+ENDPOINTS.materials.delete.replace(':id', idMaterial!.toString());;
    return this.http.patch(url,idMaterial).pipe(
      tap(() => {
        this.notification.showNotification("¡Material eliminado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );   
  }


  
}
  




  
