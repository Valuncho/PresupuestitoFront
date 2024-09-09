import { Injectable } from '@angular/core';
import { Material } from '../model/Material';
import { Category } from '../model/Category';
import { SubCategoryMaterial } from '../model/SubCategoryMaterial';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialStateService {
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
  
/*
  public getSubcategory(): SubCategoryMaterial {
    return this.subcategory;
  }

  public setSubcategory(subcategory: SubCategoryMaterial) {
    this.subcategory = subcategory;
  }
*/
  //Edit
  private editMode : boolean = false;

  setEditMode(option : boolean){
  this.editMode = option;
  }
  getEditMode() : boolean{
  return this.editMode;
  }
}
