import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../core/model/Category';
import { MaterialService } from '../../../../../core/services/material.service';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';
import { SubCategoryMaterialRequest } from '../../../../../core/request/subCategoryMaterialRequest';
import { SubcategoryService } from '../../../../../core/services/subcategory.service';
import { CategoryService } from '../../../../../core/services/category.service';
import { UtilsService } from '../../../../../core/utils/utils.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subcategory-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './subcategory-form.component.html',
  styleUrl: './subcategory-form.component.css'
})
export class SubcategoryFormComponent {
  //Utils
  private subCategoryService = inject(SubcategoryService);
  private categoryService = inject(CategoryService);
  private materialController = inject(MaterialControllerService);
  private utils = inject(UtilsService);
  //Properties
  @Input() reload : boolean = false;
  newSubCategory : SubCategoryMaterialRequest = this.materialController.getEmptySubCategoryRequest();
  isEdit : boolean = this.materialController.getEditMode();
  categories : Category[]=[]
  categories$: Observable<any[]> = new Observable();
  SubCategoryForm : FormGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    category : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.materialController.getAviso().subscribe({
      next: (res) => {
        if (res){
          this.getData();
        }
      }
      }


    )
    this.getData();
    if(this.isEdit){
      this.materialController.getSubcategory().subscribe(res =>{
        this.newSubCategory.subCategoryName = res?.subCategoryName!;
        this.newSubCategory.categoryId = res?.categoryId.categoryId!;
        this.newSubCategory.SubCategoryId = res?.subCategoryMaterialId!;
      })
      this.SubCategoryForm.patchValue({
        name: this.newSubCategory.subCategoryName,
        category : this.newSubCategory.categoryId
      });

    }
  }

  getData(){
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res,
        this.categories$ = of(res); // Emit the fetched categories

      }


    })
  }


  resetForm($Event : Event){
    this.SubCategoryForm.reset();
    this.isEdit = false;
    this.materialController.setEditMode(false);
  }

  onSubmit(){
    this.newSubCategory.subCategoryName = this.SubCategoryForm.value["name"]
    this.newSubCategory.categoryId = this.SubCategoryForm.value["category"]
    console.log(this.newSubCategory)
    if(!this.isEdit){
      this.subCategoryService.postSubCategory(this.newSubCategory).subscribe({
        next: ()=>{

          this.materialController.setAviso(true)
        }
      });
    }else{
      this.subCategoryService.putSubCategory(this.newSubCategory).subscribe({
        next: ()=>{
          this.materialController.setAviso(true)
        }
      });
      this.materialController.setEditMode(false);
    }
  }

}
