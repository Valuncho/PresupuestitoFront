import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../../../../../core/model/Person';

import { Supplier } from '../../../../../core/model/Supplier';
import { ModalService } from '../../../../../core/utils/modal.service';
import { SubCategoryMaterial } from '../../../../../core/model/SubCategoryMaterial';
import { MaterialService } from '../../../../../core/services/material.service';
import { Material } from '../../../../../core/model/Material';
import { NotificationService } from '../../../../../core/utils/notification.service';


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
  private notificationService = inject(NotificationService);
  private modalService = inject(ModalService);
  //Properties
  
  newMaterial :  Material = this.materialService.getEmptyMaterial();
  isEdit : boolean = this.materialService.getController().getEditMode();
  
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

    this.materialService.getSubCategories().subscribe({
      next: res => this.subCategories = res,  
    })

    if(this.isEdit){
      this.materialService.getController().getMaterial().subscribe(res =>{
        this.newMaterial = res!;
      })
     this.MaterialForm.patchValue(this.newMaterial)
    }
  }

  openSupplierForm(){
    //this.modalService.openModal<SupplierListComponent,Supplier>(SupplierListComponent);
  }
  resetForm($Event : Event){
    this.MaterialForm.reset();
  }
  onSubmit(){
    
    if(this.isEdit){
      this.materialService.postMaterial(this.newMaterial).subscribe(
        {
          next: () => this.notificationService.showNotification("¡Material cargado con éxito!")  
        }
      );
    }else{
      this.materialService.putMaterial(this.newMaterial).subscribe(
        {
          next: () => this.notificationService.showNotification("¡Material editado con éxito!")  
        }
      );;
      this.materialService.getController().setEditMode(false);
    }
  }
}
