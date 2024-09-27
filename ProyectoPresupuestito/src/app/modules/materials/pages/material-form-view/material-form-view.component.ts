import { Component, inject } from '@angular/core';
import { CategoryListComponent } from '../../components/lists/category-list/category-list.component';
import { SubcategoryFormComponent } from "../../components/forms/subcategory-form/subcategory-form.component";
import { CategoryFormComponent } from "../../components/forms/category-form/category-form.component";
import { MaterialFormComponent } from "../../components/forms/material-form/material-form.component";
import { SubcategoryListComponent } from "../../components/lists/subcategory-list/subcategory-list.component";

import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';

@Component({
  selector: 'app-material-form-view',
  standalone: true,
  imports: [CategoryListComponent, SubcategoryFormComponent, CategoryFormComponent, MaterialFormComponent, SubcategoryListComponent],
  templateUrl: './material-form-view.component.html',
  styleUrl: './material-form-view.component.css'
})
export class MaterialFormViewComponent {
private MaterialController = inject(MaterialControllerService);

ngOnInit(): void {
  this.MaterialController.setEditMode(false)
  this.MaterialController.setCategory(this.MaterialController.getEmptyCategory())
  this.MaterialController.setSubcategory(this.MaterialController.getEmptySubCategory())
  this.MaterialController.setMaterial(this.MaterialController.getEmptyMaterial())
  
}
}
