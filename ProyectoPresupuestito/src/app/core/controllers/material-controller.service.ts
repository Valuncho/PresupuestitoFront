import { Injectable } from '@angular/core';
import { Material } from '../model/Material';
import { Category } from '../model/Category';
import { SubCategoryMaterial } from '../model/SubCategoryMaterial';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../model/Item';
import { InvoiceItem } from '../model/invoiceItem';
import { SubCategoryMaterialRequest } from '../request/subCategoryMaterialRequest';
import { CategoryRequest } from '../request/categoryRequest';
import { MaterialRequest } from '../request/materialRequest';
import { ItemRequest } from '../request/itemRequest';
/**
 * 
 * @class MaterialControllerService
 * 
 * Clase controller de la entidad material, categoria y subcategoria, item e invoceitem para:
 * -Ser pasamanos de información,
 * -Obtener objetos vacios,
 * -Manejar el editado en el formulario.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class MaterialControllerService {
  //Selected entities
  private material: BehaviorSubject<Material > = new BehaviorSubject<Material>(this.getEmptyMaterial());
  private category: BehaviorSubject<Category | undefined> = new BehaviorSubject<Category | undefined>(undefined);
  private subCategory: BehaviorSubject<SubCategoryMaterial | undefined> = new BehaviorSubject<SubCategoryMaterial | undefined>(undefined);

  public getMaterial() : Observable<Material | undefined>{
    return this.material.asObservable();
  }

  public setMaterial(material: Material) {
    this.material.next(material);
  }

  public getCategory():Observable<Category | undefined> {
    return this.category.asObservable();
  }

  public setCategory(category: Category) {
    this.category.next(category);
  }
  

  public getSubcategory(): Observable<SubCategoryMaterial | undefined>{
    return this.subCategory.asObservable();
  }

  public setSubcategory(subcategory: SubCategoryMaterial) {
    this.subCategory.next(subcategory);
  }

  //Edit
  private editMode : boolean = false;

  setEditMode(option : boolean){
  this.editMode = option;
  }
  getEditMode() : boolean{
  return this.editMode;
  }

  //Items
  private Item: BehaviorSubject<Item | undefined> = new BehaviorSubject<Item | undefined>(undefined);
  private InvoiceItem: BehaviorSubject<InvoiceItem | undefined> = new BehaviorSubject<InvoiceItem | undefined>(undefined);

  public getItem() : Observable<Item | undefined>{
    return this.Item.asObservable();
  }

  public setItem(item: Item) {
    this.Item.next(item);
  }

  public getInvoiceItem():Observable<InvoiceItem | undefined> {
    return this.InvoiceItem.asObservable();
  }

  public setinvoiceItem(invoiceItem: InvoiceItem) {
    this.InvoiceItem.next(invoiceItem);
  }

  //Metodos para objetos vacios
  getEmptyMaterial() : Material{
    return {
        materialId: 0,
        materialName: '',
        materialDescription: '',
        materialColor: '',
        materialBrand: '',
        materialMeasure: '',
        materialUnitMeasure: '',
        subCategoryMaterialId : this.getEmptySubCategory()
      
    }
  }

  getEmptySubCategory() : SubCategoryMaterial{
    return {
      subCategoryMaterialId: 0,
      subCategoryName: '',
      categoryId: this.getEmptyCategory()
    }
  }
  
  getEmptyCategory() : Category{
    return{
      categoryId: 0,
      categoryModel: '',
      categoryName:'',
    }
  }

  getEmptyItem() : Item {
    return {
      itemId: 0,
      oMaterial:this.getEmptyMaterial(),
      quantity: 0
    }
  }

  getEmptyItemRequest() : ItemRequest{
    return {
      itemId : 0,
      MaterialId:0,
      Quantity : 0,
      WorkId :0
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

  getEmptyMaterialRequest(): MaterialRequest{
    return {
      MaterialId : 0,
      MaterialName: '',
      MaterialDescription: '',
      MaterialColor: '',
      MaterialBrand : '',
      MaterialMeasure: '',
      MaterialUnitMeasure: '',
      SubCategoryMaterialId : 0,
    }
  }


  getEmptySubCategoryRequest() : SubCategoryMaterialRequest{
    return {
      subCategoryName: '',
      categoryId: 0
    }
  }
  
  getEmptyCategoryRequest() : CategoryRequest{
    return{
      CategoryId:  '',
      CategoryModel: '',
      CategoryName:'',
    }
  }


  
}
