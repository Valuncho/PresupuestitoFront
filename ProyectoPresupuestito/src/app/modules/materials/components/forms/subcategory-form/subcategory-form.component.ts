import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../core/model/Category';
import { SubCategoryMaterial } from '../../../../../core/model/SubCategoryMaterial';
import { MaterialService } from '../../../../../core/services/material.service';

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
  //Properties
  newSubCategory : SubCategoryMaterial = this.materialService.getEmptySubCategory();
  isEdit : boolean = this.materialService.getState().getEditMode();
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
        error: err => console.error('An error occurred :', err),  
        complete: () => console.log('There are no more action happen.')  
    })

    if(this.isEdit){
      this.materialService.getState().getSubcategory().subscribe(res =>{
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
      this.materialService.getState().setEditMode(false);
    }
  }

}
