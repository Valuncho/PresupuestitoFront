import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../../../../../core/model/Person';
import { SupplierListComponent } from '../../../../supplier/components/supplier-list/supplier-list.component';
import { Supplier } from '../../../../../core/model/Supplier';
import { ModalService } from '../../../../../core/services/utils/modal.service';
import { SubCategoryMaterial } from '../../../../../core/model/SubCategoryMaterial';
import { MaterialService } from '../../../../../core/services/material.service';
import { Material } from '../../../../../core/model/Material';


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
  private modalService = inject(ModalService);
  //Properties
  
  newMaterial :  Material = this.materialService.getEmptyMaterial();
  isEdit : boolean = this.materialService.getState().getEditMode();
  
  //Properties

  subCategories : SubCategoryMaterial[] = [
    {
      idCategoryMaterial: 1,
      name: 'Tornillos',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
    },
    {
      idCategoryMaterial: 2,
      name: 'Tuercas',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
    },
    {
      idCategoryMaterial: 3,
      name: 'Bisagras',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
    },
    {
      idCategoryMaterial: 4,
      name: 'Clavos',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
    },
    {
      idCategoryMaterial: 5,
      name: 'Manijas',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
    },
    {
      idCategoryMaterial: 6,
      name: 'Tableros de melamina',
      category: {
      idCategory: 2,
      name: 'Maderas'
    }
    },
    {
      idCategoryMaterial: 7,
      name: 'Madera maciza',
      category: {
      idCategory: 2,
      name: 'Maderas'
    }
    },
    {
      idCategoryMaterial: 8,
      name: 'Madera contrachapada',
      category: {
      idCategory: 2,
      name: 'Maderas'
    }
    },

  ]

  currentSupplier! : Person; 
  //subCategories : SubCategoryMaterial[]=[]
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
    if(this.isEdit){
      this.materialService.getState().getMaterial().subscribe(res =>{
        this.newMaterial = res!;
      })
      /*
      this.MaterialForm.patchValue({
        name: this.newMaterial.name,
        
      });
      */
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
      this.materialService.postMaterial(this.newMaterial);
    }else{
      this.materialService.putMaterial(this.newMaterial);
      this.materialService.getState().setEditMode(false);
    }
  }
}
