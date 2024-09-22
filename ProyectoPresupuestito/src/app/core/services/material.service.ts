import { inject, Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { SubCategoryMaterial } from '../model/SubCategoryMaterial';
import { Material } from '../model/Material';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL,ENDPOINTS } from '../endpoints';
import { MaterialStateService } from '../states/material-state.service';
import { NotificationService } from './utils/notification.service';
import { Item } from '../model/Item';
import { InvoiceItem } from '../model/invoiceItem';
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  //Utils
  private http = inject(HttpClient);
  private state = inject(MaterialStateService);
  private notification = inject(NotificationService);

  getState(){
    return this.state;
  }

  //Metodos back
  /**
   * Se conecta con el endpoint GetAll del backend.
   * @returns Un observable con un array de Materiales.
   */
  getMaterials()  : Observable<Material[]> {
    return this.http.get<Material[]>(API_URL+ENDPOINTS.materials.getAll);   
  }

  getMaterialById(idMaterial : number) : Observable<Material> {
    const url = API_URL+ENDPOINTS.materials.getById.replace(':id', idMaterial.toString());
    return this.http.get<Material>(url);   
  }

  postMaterial(material: Material){
    const url = API_URL+ENDPOINTS.materials.post;
    return this.http.post(url,material);
  }

  putMaterial(material: Material){
    const url = API_URL+ENDPOINTS.materials.update;
    return this.http.put(url,material);
  }

  deleteMaterial(material: Material){
    const url = API_URL+ENDPOINTS.materials.delete;
    return this.http.put(url,material);
  }

 
  getSubCategories()  : Observable<SubCategoryMaterial[]> {
    return this.http.get<SubCategoryMaterial[]>(API_URL+ENDPOINTS.subCategories.getAll);   
  }

  getSubCategoryById(idSubCategory : number) : Observable<SubCategoryMaterial> {
    const url = API_URL+ENDPOINTS.subCategories.getById.replace(':id', idSubCategory.toString());
    return this.http.get<SubCategoryMaterial>(url);   
  }
  
  postSubCategory(subCategory: SubCategoryMaterial){
    const url = API_URL+ENDPOINTS.subCategories.post;
    return this.http.post(url,subCategory);
  }
   
  putSubCategory(subCategory: SubCategoryMaterial){
    const url = API_URL+ENDPOINTS.subCategories.update;
    return this.http.put(url,subCategory);
  }
   
  deleteSubCategory(subCategory: SubCategoryMaterial){
    const url = API_URL+ENDPOINTS.subCategories.delete;
    return this.http.put(url,subCategory);
  }
     
 
  getCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(API_URL+ENDPOINTS.categories.getAll);   
  }

  getCategoryById(idSubCategory : number) : Observable<Category> {
    const url = API_URL+ENDPOINTS.subCategories.getById.replace(':id', idSubCategory.toString());
    return this.http.get<Category>(url);   
  }
  
  postCategory(newCategory : Category){
    const url = API_URL+ENDPOINTS.categories.post;
    return this.http.post(url,newCategory);
  }
   
  putCategory(Category : Category){
    const url = API_URL+ENDPOINTS.categories.update;
    return this.http.put(url,Category).subscribe({
      next : response =>  {
        this.notification.showNotification("Rubro editado")
      },
      error: err => {
        this.notification.showNotification(err.name)
      }
    });;
  }
   
  deleteCategory(Category : Category){
    const url = API_URL+ENDPOINTS.categories.delete;
    this.http.put(url,Category).subscribe({
      next : response =>  {
        this.notification.showNotification("Rubro eliminado")
      },
      error: err => {
        this.notification.showNotification(err.name)
      }
    });
  }

  //Metodos para objetos vacios
  getEmptyMaterial() : Material{
    return {
        idMaterial: 0,
        name: '',
        description: '',
        color: '',
        brand: '',
        measure: '',
        unitOfMeasure: '',
        subCategory : this.getEmptySubCategory()
      
    }
  }
  getEmptySubCategory() : SubCategoryMaterial{
    return {
      idCategoryMaterial: 0,
      name: '',
      category: this.getEmptyCategory()
    }
  }
  getEmptyCategory() : Category{
    return{
      idCategory: 0,
      name: ''
    }
  }

  getEmptyItem() : Item {
    return {
      idItem: 0,
      material:this.getEmptyMaterial(),
      quantity: 0
    }
  }
  getEmptyInvoiceItem() : InvoiceItem {
    return {
      idInvoiceItem: 0,
      material:this.getEmptyMaterial(),
      quantity: 0,
      price:0
    }
  }

}
  




  
