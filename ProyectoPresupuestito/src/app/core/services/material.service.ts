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

/**
 * @class MaterialService
 * 
 * Servicio de la entidad material, categoria y subcategoria(rubro y subrubro) para comunicarse con el backend, gestionando errores y aciertos.
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
  postMaterial(material: Material){
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
  putMaterial(material: Material){
    const url = API_URL+ENDPOINTS.materials.update;
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
    const url = API_URL+ENDPOINTS.materials.delete;
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
  postSubCategory(subCategory: SubCategoryMaterial){
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
  putSubCategory(subCategory: SubCategoryMaterial){
    const url = API_URL+ENDPOINTS.subCategories.update;
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
    const url = API_URL+ENDPOINTS.subCategories.delete;
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
   * METODO PARA PROBAR CON EL BACKEND,
   * SE PUEDE ELIMINAR MAS ADELANTE
   * @returns 

  getC() : Observable<dto[]>{
    return this.http.get<dto[]>(API_URL+ENDPOINTS.categories.getAll).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.error.setError(error);
        this.modal.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
        return of();
    })
    );    
  }
   */

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
    const url = API_URL+ENDPOINTS.categories.update;
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
    const url = API_URL+ENDPOINTS.categories.delete;
    this.http.patch(url,idCategory).pipe(
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
  




  
