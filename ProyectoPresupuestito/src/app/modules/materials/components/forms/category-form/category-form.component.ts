import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  isEdit : boolean = false;
  CategoryForm : FormGroup = new FormGroup({

  })

  resetForm($Event : Event){

  }
  onSubmit(){

  }

}
