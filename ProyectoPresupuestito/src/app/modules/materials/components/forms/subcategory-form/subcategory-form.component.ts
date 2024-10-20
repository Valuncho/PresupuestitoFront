import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../core/model/Category';
import { SubCategoryMaterial } from '../../../../../core/model/SubCategoryMaterial';
import { MaterialService } from '../../../../../core/services/material.service';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';
import { SubCategoryMaterialRequest } from '../../../../../core/request/subCategoryMaterialRequest';

@Component({
  selector: 'app-subcategory-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subcategory-form.component.html',
  styleUrl: './subcategory-form.component.css'
})
export class SubcategoryFormComponent {
  //Utils
  private materialService = inject(MaterialService);
  private materialController = inject(MaterialControllerService);
  //Properties
  newSubCategory : SubCategoryMaterialRequest = this.materialController.getEmptySubCategoryRequest();
  isEdit : boolean = this.materialController.getEditMode();
  categories : Category[]=[]

  SubCategoryForm : FormGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    category : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.materialService.getCategories().subscribe({
      next: res => this.categories = res,  
      
    })

    if(this.isEdit){
      this.materialController.getSubcategory().subscribe(res =>{
        //this.newSubCategory = res!;
      })
      this.SubCategoryForm.patchValue({
        // name: this.newSubCategory.subCategoryName,
        // category : this.newSubCategory.subCategoryMaterialId
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
      this.materialService.postSubCategory(this.newSubCategory).subscribe();
    }else{
      this.materialService.putSubCategory(this.newSubCategory).subscribe();
      this.materialController.setEditMode(false);
    }
  }

}
