import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../core/model/Category';
import { SubCategoryMaterial } from '../../../../../core/model/SubCategoryMaterial';
import { MaterialService } from '../../../../../core/services/material.service';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';

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
  newSubCategory : SubCategoryMaterial = this.materialController.getEmptySubCategory();
  isEdit : boolean = this.materialController.getEditMode();
  categories : Category[]=[
    {
      idCategory: 1,
      name: 'Ferretería',
    },
    {
      idCategory: 2,
      name: 'Maderas'
    },
    {
      idCategory: 3,
      name: 'Adhesivos'
    },
    {
      idCategory: 4,
      name: 'Pinturería'
    }
  ]

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
        this.newSubCategory = res!;
      })
      this.SubCategoryForm.patchValue({
        name: this.newSubCategory.name,
        category : this.newSubCategory.category
      });
      
    }
  }


  resetForm($Event : Event){
    this.SubCategoryForm.reset();
  }

  onSubmit(){
    this.newSubCategory.name = this.SubCategoryForm.value["name"]
    if(this.isEdit){
      this.materialService.postSubCategory(this.newSubCategory);
    }else{
      this.materialService.putSubCategory(this.newSubCategory);
      this.materialController.setEditMode(false);
    }
  }

}
