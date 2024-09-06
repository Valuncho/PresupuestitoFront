import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../core/model/Category';

@Component({
  selector: 'app-subcategory-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subcategory-form.component.html',
  styleUrl: './subcategory-form.component.css'
})
export class SubcategoryFormComponent {

  isEdit : boolean = false;
  categories : Category[] = []
  SubCategoryForm : FormGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    idCategory : new FormControl(0, Validators.required)
  })

  resetForm($Event : Event){

  }
  onSubmit(){

  }

}
