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
import { UtilsService } from '../../../../../core/utils/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../../../../core/services/supplier.service';


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
  private supplierService = inject(SupplierService);
  private modalService = inject(ModalService);
  private utils = inject(UtilsService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  //Properties
  
  newMaterial :  Material = this.materialController.getEmptyMaterial();
  isEdit : boolean = this.materialController.getEditMode();
  
  //Properties
  subCategories : SubCategoryMaterial[] =[]


  currentSupplier! : any; 
  
  MaterialForm : FormGroup = new FormGroup({
    supplier : new FormControl('Seleccionar proveedor'),
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

    this.activatedRoute.paramMap.subscribe(params => {
      this.currentSupplier.supplierId = Number(params.get('supplierId'));   
      let url = "/material/add/"+ this.currentSupplier.supplierId;
      if(this.router.url == url)
      {
        this.supplierService.getSupplierById(this.currentSupplier.supplierId).subscribe(res =>{          
          this.onSupplierSelected(res);
        })
      } 
    });

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

  onSupplierSelected(res : any) {
    this.MaterialForm.patchValue({idSupplier: this.currentSupplier.supplierId})
    let name = res.value.personId.name+ " " +res.value.personId.lastName      
    this.MaterialForm.patchValue({supplier : name})
  }


  onSubmit(){
    
    if(this.isEdit){
      this.materialService.postMaterial(this.newMaterial).subscribe(   {
        next: ()=>{
          this.utils.reaload()
        }
      });
    }else{
      this.materialService.putMaterial(this.newMaterial).subscribe(   {
        next: ()=>{
          this.utils.reaload()
        }
      });
      this.materialController.setEditMode(false);
    }
  }
}
