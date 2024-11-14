import { Component } from '@angular/core';
import { CategoryListComponent } from '../../components/lists/category-list/category-list.component';
import { SubcategoryFormComponent } from "../../components/forms/subcategory-form/subcategory-form.component";
import { CategoryFormComponent } from "../../components/forms/category-form/category-form.component";
import { MaterialFormComponent } from "../../components/forms/material-form/material-form.component";
import { SubcategoryListComponent } from "../../components/lists/subcategory-list/subcategory-list.component";


@Component({
  selector: 'app-material-form-view',
  standalone: true,
  imports: [CategoryListComponent, SubcategoryFormComponent, CategoryFormComponent, MaterialFormComponent, SubcategoryListComponent],
  templateUrl: './material-form-view.component.html',
  styleUrl: './material-form-view.component.css'
})
export class MaterialFormViewComponent {
  flag : boolean = false;

  avisar(){
    this.flag = true;
  }
}
