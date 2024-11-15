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
import { MaterialRequest } from '../../../../../core/request/materialRequest';


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

  newMaterial :  MaterialRequest = this.materialController.getEmptyMaterialRequest();
  isEdit : boolean = this.materialController.getEditMode();

  //Properties
  subCategories : SubCategoryMaterial[] =[]

  MaterialForm : FormGroup = new FormGroup({
    measure : new FormControl('',Validators.required),
    unitMeasure : new FormControl('',Validators.required),
    subCategory : new FormControl(0,Validators.required),
    name : new FormControl('', Validators.required),
    description : new FormControl('', Validators.required),
    brand : new FormControl(''),
    color : new FormControl('')
  })


  ngOnInit(): void {

    this.materialController.getAviso().subscribe({
      next:(res)=>{
        if(res) {
          this.getData()
        }
      }
    })
this.getData()



    if(this.isEdit){
      this.materialController.getMaterial().subscribe(res =>{
        this.newMaterial.MaterialId = res?.materialId;
        this.MaterialForm.patchValue({
          name : res?.materialName,
          description : res?.materialDescription,
          brand : res?.materialBrand,
          color : res?.materialColor,
          measure : res?.materialMeasure,
          unitMeasure : res?.materialUnitMeasure,
          subCategory : res?.subCategoryMaterialId.subCategoryMaterialId
        })

      })

    }
  }

getData(){
  this.subCategoryService.getSubCategories().subscribe({
    next: res => this.subCategories = res,
  })

}
  resetForm($Event : Event){
    this.MaterialForm.reset();
    this.materialController.setEditMode(false);
    this.isEdit = false;
  }



  onSubmit(){
    this.toMaterialRequest()
    if(!this.isEdit){
      this.materialService.postMaterial(this.newMaterial).subscribe(   {
        next: ()=>{
          this.materialController.setAviso(true)
        }
      });
    }else{
      this.materialService.putMaterial(this.newMaterial).subscribe(   {
        next: ()=>{
          this.materialController.setAviso(true)
        }
      });
      this.materialController.setEditMode(false);
    }
  }

  toMaterialRequest(){

    this.newMaterial.MaterialName = this.MaterialForm.value["name"]
    this.newMaterial.MaterialDescription = this.MaterialForm.value["description"]
   this.newMaterial.MaterialBrand = this.MaterialForm.value["brand"]
   this.newMaterial.MaterialColor = this.MaterialForm.value["color"]
   this.newMaterial.MaterialMeasure = this.MaterialForm.value["measure"]
   this.newMaterial.MaterialUnitMeasure = this.MaterialForm.value["unitMeasure"]
   this.newMaterial.SubCategoryMaterialId = Number(this.MaterialForm.value["subCategory"])
    if(!this.isEdit){
      this.newMaterial.MaterialId = undefined
    }
  }
}
