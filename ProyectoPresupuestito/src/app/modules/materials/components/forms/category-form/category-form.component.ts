import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../core/model/Category';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';
import { UtilsService } from '../../../../../core/utils/utils.service';
import { CategoryService } from '../../../../../core/services/category.service';


@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  //Utils
  private categoryService = inject(CategoryService);
  private materialController = inject(MaterialControllerService);
  private utils = inject(UtilsService);
  //Properties
  newCategory : Category = this.materialController.getEmptyCategory();
  isEdit : boolean = this.materialController.getEditMode();
  CategoryForm : FormGroup = new FormGroup({
    idCategory : new FormControl(),
    name : new FormControl('', Validators.required)
  })


  ngAfterViewInit(): void {
    if(this.isEdit){
      this.materialController.getCategory().subscribe(res =>{
        this.newCategory = res!;
      })

      
      this.CategoryForm.patchValue({idcategory : this.newCategory.categoryId, name : this.newCategory.categoryName})
    }
  }

  

  resetForm($Event : Event){
    this.CategoryForm.reset();
  }
  


  onSubmit(){
    this.newCategory.categoryName = this.CategoryForm.value["name"]
    this.newCategory.categoryModel = "";
    if(!this.isEdit){
      this.categoryService.postCategory(this.newCategory).subscribe({
        next: ()=>{
          this.utils.reaload()
        }
      });
    }else{
      this.categoryService.putCategory(this.newCategory).subscribe({
        next: ()=>{
          this.utils.reaload()
        }
      });
      this.materialController.setEditMode(false);
    }
  }

}
