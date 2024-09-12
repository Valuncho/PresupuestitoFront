import { Component, inject } from '@angular/core';
import { CategoryListComponent } from '../../components/lists/category-list/category-list.component';
import { SubcategoryFormComponent } from "../../components/forms/subcategory-form/subcategory-form.component";
import { CategoryFormComponent } from "../../components/forms/category-form/category-form.component";
import { MaterialFormComponent } from "../../components/forms/material-form/material-form.component";
import { SubcategoryListComponent } from "../../components/lists/subcategory-list/subcategory-list.component";
import { MaterialService } from '../../../../core/services/material.service';

@Component({
  selector: 'app-material-form-view',
  standalone: true,
  imports: [CategoryListComponent, SubcategoryFormComponent, CategoryFormComponent, MaterialFormComponent, SubcategoryListComponent],
  templateUrl: './material-form-view.component.html',
  styleUrl: './material-form-view.component.css'
})
export class MaterialFormViewComponent {
private materialService = inject(MaterialService);
ngOnInit(): void {
  this.materialService.getState().setEditMode(false)
  this.materialService.getState().setCategory(this.materialService.getEmptyCategory())
  this.materialService.getState().setSubcategory(this.materialService.getEmptySubCategory())
  this.materialService.getState().setMaterial(this.materialService.getEmptyMaterial())
  
}
}
