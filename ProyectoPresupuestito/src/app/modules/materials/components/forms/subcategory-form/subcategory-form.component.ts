import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-subcategory-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subcategory-form.component.html',
  styleUrl: './subcategory-form.component.css'
})
export class SubcategoryFormComponent {

  isEdit : boolean = false;
  SubCategoryForm : FormGroup = new FormGroup({

  })

  resetForm($Event : Event){

  }
  onSubmit(){

  }

}
