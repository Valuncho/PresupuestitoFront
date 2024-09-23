import { Injectable } from '@angular/core';
import { Material } from '../model/Material';
import { Category } from '../model/Category';
import { SubCategoryMaterial } from '../model/SubCategoryMaterial';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../model/Item';
import { InvoiceItem } from '../model/invoiceItem';

@Injectable({
  providedIn: 'root'
})
export class MaterialControllerService {
  //Selected entities
  private material: BehaviorSubject<Material | undefined> = new BehaviorSubject<Material | undefined>(undefined);
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

  
}
