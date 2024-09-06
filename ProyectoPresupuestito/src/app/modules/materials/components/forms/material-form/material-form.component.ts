import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../../../../../core/model/Person';
import { SupplierListComponent } from '../../../../supplier/components/supplier-list/supplier-list.component';
import { Supplier } from '../../../../../core/model/Supplier';
import { ModalService } from '../../../../../core/services/utils/modal.service';
import { SubCategoryMaterial } from '../../../../../core/model/SubCategoryMaterial';


@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css'
})
export class MaterialFormComponent {
  //Utils
  private modalService = inject(ModalService);
  //Properties
  isEdit : boolean = false;
  currentSupplier! : Person; 
  subCategories : SubCategoryMaterial[]=[]
  MaterialForm : FormGroup = new FormGroup({
    supplier : new FormControl(0,Validators.required),
    subCategory : new FormControl(0,Validators.required),
    name : new FormControl('', Validators.required),
    description : new FormControl('', Validators.required),
    brand : new FormControl('',Validators.required),
    color : new FormControl('',Validators.required)
  })


  ngOnInit(): void {
  
  }
  openSupplierForm(){
    this.modalService.openModal<SupplierListComponent,Supplier>(SupplierListComponent);
  }
  resetForm($Event : Event){

  }
  onSubmit(){

  }
}
