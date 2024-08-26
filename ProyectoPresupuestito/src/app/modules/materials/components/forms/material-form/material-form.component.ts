import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css'
})
export class MaterialFormComponent {
  isEdit : boolean = false;
  MaterialForm : FormGroup = new FormGroup({

  })

  resetForm($Event : Event){

  }
  onSubmit(){

  }
}
