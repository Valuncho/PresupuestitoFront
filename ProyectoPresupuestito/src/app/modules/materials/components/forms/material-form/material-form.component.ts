import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Person } from '../../../../../core/model/Person';


@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css'
})
export class MaterialFormComponent {
  isEdit : boolean = false;
  currentSupplier! : Person; 
  MaterialForm : FormGroup = new FormGroup({

  })

  openSupplierForm(){
    
  }
  resetForm($Event : Event){

  }
  onSubmit(){

  }
}
