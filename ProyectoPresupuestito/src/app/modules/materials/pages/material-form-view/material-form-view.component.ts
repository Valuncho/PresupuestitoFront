import { Component } from '@angular/core';
import { CategorieListComponent } from "../../components/lists/categorie-list/categorie-list.component";
import { SubcategoryFormComponent } from "../../components/forms/subcategory-form/subcategory-form.component";
import { CategoryFormComponent } from "../../components/forms/category-form/category-form.component";
import { MaterialFormComponent } from "../../components/forms/material-form/material-form.component";
import { SubcategoryListComponent } from "../../components/lists/subcategory-list/subcategory-list.component";

@Component({
  selector: 'app-material-form-view',
  standalone: true,
  imports: [CategorieListComponent, SubcategoryFormComponent, CategoryFormComponent, MaterialFormComponent, SubcategoryListComponent],
  templateUrl: './material-form-view.component.html',
  styleUrl: './material-form-view.component.css'
})
export class MaterialFormViewComponent {

}
