import { Component, inject } from '@angular/core';
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
  isEdit : boolean = false;
  CategoryForm : FormGroup = new FormGroup({
    name : new FormControl('', Validators.required)
  })

  resetForm($Event : Event){

  }
  
  onSubmit(){
    
    let newCategory : Category = this.materialService.getEmptyCategory();
    newCategory.name = this.CategoryForm.value["name"]
    if(this.isEdit){
      this.materialService.postCategory(newCategory);
    }else{
      this.materialService.putCategory(newCategory);
    }

  }

}
