import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { API_URL, ENDPOINTS } from '../endpoints';
import { SubCategoryMaterial } from '../model/SubCategoryMaterial';
import { SubCategoryMaterialRequest } from '../request/subCategoryMaterialRequest';
import { ErrorControllerService } from '../utils/error-controller.service';
import { ModalService } from '../utils/modal.service';
import { NotificationService } from '../utils/notification.service';
/**
 * @class SubcategoryService
 * 
 * Servicio de la entidad subcategoria, para comunicarse con el backend, gestionando errores y aciertos.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
 //Utils
 private http = inject(HttpClient);
 private notification = inject(NotificationService);
 private error = inject(ErrorControllerService);
 private modal = inject(ModalService);

 
  /**
   * Retorna todos los sub-rubros disponibles guardados.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns Un array de sub-rubros como un observable.
   */
  getSubCategories()  : Observable<SubCategoryMaterial[]> {
    return this.http.get<SubCategoryMaterial[]>(API_URL+ENDPOINTS.subCategories.getAll).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );       
  }
/**
   * Retorna al sub-rubro solicitado por id.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idSubCategory id del sub-rubro solicitado.
   * @returns Un sub-rubro como un observable.
   */
  getSubCategoryById(idSubCategory : number) : Observable<SubCategoryMaterial> {
    const url = API_URL+ENDPOINTS.subCategories.getById.replace(':id', idSubCategory.toString());
    return this.http.get<SubCategoryMaterial>(url).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }
  /**
   * Método para crear un sub-rubro nuevo.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param subCategory sub-rubro a cargar en la base de datos
   * @returns un observable de tipo objeto
   */
  postSubCategory(subCategory: SubCategoryMaterialRequest){
    const url = API_URL+ENDPOINTS.subCategories.post;
    return this.http.post(url,subCategory).pipe(
      tap(() => {
        this.notification.showNotification("¡Sub-rubro creado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }
  /**
   * Método para actualizar información de un sub-rubro existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param subCategory sub-rubro actualizado.
   * @returns un observable de tipo objeto
   */
  putSubCategory(subCategory: SubCategoryMaterialRequest){
    const url = API_URL+ENDPOINTS.subCategories.update.replace(':id', subCategory.SubCategoryId!.toString());
    return this.http.put(url,subCategory).pipe(
      tap(() => {
        this.notification.showNotification("¡Sub-rubro actualizado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }
  /**
   * Método para marcar como borrado a un sub-rubro existente.
   * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @param idSubCategory id del sub-rubro a eliminar.
   * @returns un observable de tipo objeto
   */
  deleteSubCategory(idSubCategory: number){
    const url = API_URL+ENDPOINTS.subCategories.delete.replace(':id', idSubCategory.toString());
    return this.http.patch(url,idSubCategory).pipe(
      tap(() => {
        this.notification.showNotification("¡Sub-rubro eliminado con éxito!"); 
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }
 

}
