import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../../../../../core/model/Person';
import { Supplier } from '../../../../../core/model/Supplier';
import { ModalService } from '../../../../../core/utils/modal.service';
import { SubCategoryMaterial } from '../../../../../core/model/SubCategoryMaterial';
import { MaterialService } from '../../../../../core/services/material.service';
import { Material } from '../../../../../core/model/Material';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';
import { SupplierListComponent } from '../../../../supplier/components/supplier-list/supplier-list.component';
import { SubcategoryService } from '../../../../../core/services/subcategory.service';


@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css'
})
export class MaterialFormComponent {
  //Utils
  private materialService = inject(MaterialService);
  private subCategoryService = inject(SubcategoryService);
  private materialController = inject(MaterialControllerService);
  private modalService = inject(ModalService);
  
  //Properties
  
  newMaterial :  Material = this.materialController.getEmptyMaterial();
  isEdit : boolean = this.materialController.getEditMode();
  
  //Properties
  subCategories : SubCategoryMaterial[] =[]


  currentSupplier! : Person; 
  
  MaterialForm : FormGroup = new FormGroup({
    supplier : new FormControl('',Validators.required),
    idSupplier : new FormControl(0,Validators.required),
    subCategory : new FormControl(0,Validators.required),
    name : new FormControl('', Validators.required),
    description : new FormControl('', Validators.required),
    brand : new FormControl('',Validators.required),
    color : new FormControl('',Validators.required)
  })


  ngOnInit(): void {

    this.subCategoryService.getSubCategories().subscribe({
      next: res => this.subCategories = res,  
    })

    if(this.isEdit){
      this.materialController.getMaterial().subscribe(res =>{
        this.newMaterial = res!;
      })
     this.MaterialForm.patchValue(this.newMaterial)
    }
  }

  openSupplierForm(){
    this.modalService.openModal<SupplierListComponent,Supplier>(SupplierListComponent);
  }
  resetForm($Event : Event){
    this.MaterialForm.reset();
  }
  onSubmit(){
    
    if(this.isEdit){
      this.materialService.postMaterial(this.newMaterial).subscribe();
    }else{
      this.materialService.putMaterial(this.newMaterial).subscribe();
      this.materialController.setEditMode(false);
    }
  }
}
