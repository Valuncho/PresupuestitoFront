import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubCategoryMaterial } from '../../../../../core/model/SubCategoryMaterial';
import { MaterialService } from '../../../../../core/services/material.service';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';
import { SubcategoryService } from '../../../../../core/services/subcategory.service';
import { MaterialRequest } from '../../../../../core/request/materialRequest';
import {ModalService} from "../../../../../core/utils/modal.service";

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css', "../../../../../styles/Form.css"]
})
export class MaterialFormComponent {
  //Utils
  private materialService = inject(MaterialService);
  private subCategoryService = inject(SubcategoryService);
  private materialController = inject(MaterialControllerService);
  private modal = inject(ModalService);

  //Properties

  newMaterial: MaterialRequest =
    this.materialController.getEmptyMaterialRequest();
  isEdit: boolean = this.materialController.getEditMode();

  //Properties
  subCategories: SubCategoryMaterial[] = [];

  MaterialForm: FormGroup = new FormGroup({
    measure: new FormControl('', Validators.required),
    unitMeasure: new FormControl('', Validators.required),
    subCategory: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    brand: new FormControl(''),
    color: new FormControl(''),
  });

  ngOnInit(): void {
    this.materialController.getAviso().subscribe({
      next: (res) => {
        if (res) {
          this.getData();
        }
      },
    });
    this.getData();

    if (this.isEdit) {
      this.materialController.getMaterial().subscribe((res) => {
        this.newMaterial.MaterialId = res?.materialId;
        this.MaterialForm.patchValue({
          name: res?.materialName,
          description: res?.materialDescription,
          brand: res?.materialBrand,
          color: res?.materialColor,
          measure: res?.materialMeasure,
          unitMeasure: res?.materialUnitMeasure,
          subCategory: res?.subCategoryMaterialId.subCategoryMaterialId,
        });
      });
    }
  }

  getData() {
    this.subCategoryService.getSubCategories().subscribe({
      next: (res) => (this.subCategories = res),
    });
  }
  resetForm($Event: Event) {
    this.MaterialForm.reset();
    this.materialController.setEditMode(false);
    this.isEdit = false;
  }

  onSubmit() {
    this.toMaterialRequest();
    if (!this.isEdit) {
      this.materialService.postMaterial(this.newMaterial).subscribe({
        next: () => {
          this.closeForm()
        },
      });
    } else {
      this.materialService.putMaterial(this.newMaterial).subscribe({
        next: () => {
          this.closeForm()
        },
      });
      this.materialController.setEditMode(false);
    }
  }
  closeForm() {
    this.modal.closeModal();
    this.materialController.setAviso(true);
  }

  toMaterialRequest() {
    this.newMaterial.MaterialName = this.MaterialForm.value['name'];
    this.newMaterial.MaterialDescription =
      this.MaterialForm.value['description'];
    this.newMaterial.MaterialBrand = this.MaterialForm.value['brand'];
    this.newMaterial.MaterialColor = this.MaterialForm.value['color'];
    this.newMaterial.MaterialMeasure = this.MaterialForm.value['measure'];
    this.newMaterial.MaterialUnitMeasure =
      this.MaterialForm.value['unitMeasure'];
    this.newMaterial.SubCategoryMaterialId = Number(
      this.MaterialForm.value['subCategory']
    );
    if (!this.isEdit) {
      this.newMaterial.MaterialId = undefined;
    }
  }
}
