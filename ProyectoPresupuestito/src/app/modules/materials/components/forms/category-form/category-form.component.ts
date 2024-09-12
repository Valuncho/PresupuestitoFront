import { Component, inject, Input, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialService } from '../../../../../core/services/material.service';
import { Category } from '../../../../../core/model/Category';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  //Utils
  private materialService = inject(MaterialService);
  
  //Properties
  newCategory : Category = this.materialService.getEmptyCategory();
  isEdit : boolean = this.materialService.getState().getEditMode();
  CategoryForm : FormGroup = new FormGroup({
    idCategory : new FormControl(),
    name : new FormControl('', Validators.required)
  })


  ngAfterViewInit(): void {
    
    if(this.isEdit){
      this.materialService.getState().getCategory().subscribe(res =>{
        this.newCategory = res!;
      })
      this.CategoryForm.setValue(this.newCategory)
    }
  }

  resetForm($Event : Event){
    this.CategoryForm.reset();
  }
  
  onSubmit(){
    this.newCategory.name = this.CategoryForm.value["name"]
    if(!this.isEdit){
      this.materialService.postCategory(this.newCategory);
    }else{
      this.materialService.putCategory(this.newCategory);
      this.materialService.getState().setEditMode(false);
    }
  }

}
