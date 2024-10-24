import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../core/model/Category';
import { MaterialService } from '../../../../../core/services/material.service';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';
import { SubCategoryMaterialRequest } from '../../../../../core/request/subCategoryMaterialRequest';
import { SubcategoryService } from '../../../../../core/services/subcategory.service';
import { CategoryService } from '../../../../../core/services/category.service';
import { UtilsService } from '../../../../../core/utils/utils.service';

@Component({
  selector: 'app-subcategory-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  newSubCategory : SubCategoryMaterialRequest = this.materialController.getEmptySubCategoryRequest();
  isEdit : boolean = this.materialController.getEditMode();
  categories : Category[]=[]

  SubCategoryForm : FormGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    category : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: res => this.categories = res,  
      
    })

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


  resetForm($Event : Event){
    this.SubCategoryForm.reset();
  }

  onSubmit(){
    this.newSubCategory.subCategoryName = this.SubCategoryForm.value["name"]
    this.newSubCategory.categoryId = this.SubCategoryForm.value["category"]
    console.log(this.newSubCategory)
    if(!this.isEdit){
      this.subCategoryService.postSubCategory(this.newSubCategory).subscribe({
        next: ()=>{
          this.utils.reaload()
        }
      });
    }else{
      this.subCategoryService.putSubCategory(this.newSubCategory).subscribe({
        next: ()=>{
          this.utils.reaload()
        }
      });
      this.materialController.setEditMode(false);
    }
  }

}
