import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { API_URL, ENDPOINTS } from '../endpoints';
import { Category } from '../model/Category';
import { ErrorControllerService } from '../utils/error-controller.service';
import { ModalService } from '../utils/modal.service';
import { NotificationService } from '../utils/notification.service';
/**
 * @class CategoryService
 * 
 * Servicio de la entidad categoria, para comunicarse con el backend, gestionando errores y aciertos.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   //Utils
   private http = inject(HttpClient);
   private notification = inject(NotificationService);
   private error = inject(ErrorControllerService);
   private modal = inject(ModalService);
   
 /**
   * Retorna todos los rubros disponibles guardados.
   * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
   * @returns Un array de rubros como un observable.
   */
 getCategories() : Observable<Category[]>{
  return this.http.get<Category[]>(API_URL+ENDPOINTS.categories.getAll).pipe(
    catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.error.setError(error);
      this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
      return of();
  })
  );    
}


/**
 * Retorna al rubro solicitado por id.
 * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
 * @param idCategory id del rubro solicitado.
 * @returns Un rubro como un observable.
 */
getCategoryById(idCategory : number) : Observable<Category> {
  const url = API_URL+ENDPOINTS.subCategories.getById.replace(':id', idCategory.toString());
  return this.http.get<Category>(url).pipe(
    catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.error.setError(error);
      this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
      return of();
  })
  );    
}

/**
 * Método para crear un rubro nuevo.
 * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
 * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
 * @param newCategory rubro a cargar en la base de datos
 * @returns un observable de tipo objeto
 */
postCategory(newCategory : Category){
  const url = API_URL+ENDPOINTS.categories.post;
  console.log(url)
  return this.http.post(url,newCategory).pipe(
    tap(() => {
      this.notification.showNotification("¡Rubro creado con éxito!"); 
    }),
    catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.error.setError(error);
      this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
      return of();
  })
  );    
}
/**
 * Método para actualizar información de un rubro existente.
 * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
 * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
 * @param Category rubro actualizado.
 * @returns un observable de tipo objeto
 */
putCategory(Category : Category){
  const url = API_URL+ENDPOINTS.categories.update.replace(':id', Category.categoryId.toString());;
  return this.http.put(url,Category).pipe(
    tap(() => {
      this.notification.showNotification("¡Rubro actualizado con éxito!"); 
    }),
    catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.error.setError(error);
      this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
      return of();
  })
  );    
}
/**
 * Método para marcar como borrado a un rubro existente.
 * @callback any Ejecuto tap cuando se ejecutó con exito la petición para que muestre la notificación al usuario.
 * @throws Abre una ventana modal con un mensaje de error generico y el error detallado.
 * @param idCategory id del rubro a eliminar.
 * @returns un observable de tipo objeto
 */
deleteCategory(idCategory : number){
  const url = API_URL+ENDPOINTS.categories.delete.replace(':id', idCategory.toString());
  return this.http.patch(url,idCategory).pipe(
    tap(() => {
      this.notification.showNotification("¡Rubro eliminado con éxito!"); 
    }),
    catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.error.setError(error);
      this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
      return of();
  })
  );    
}
}
