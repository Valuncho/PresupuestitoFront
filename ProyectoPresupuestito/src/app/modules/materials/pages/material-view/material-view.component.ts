import {Component, inject} from '@angular/core';
import { MaterialListComponent } from "../../components/lists/material-list/material-list.component";
import { MaterialComponent } from "../../components/material/material.component";
import { RouterLink } from '@angular/router';
import { SubcategoryListComponent } from '../../components/lists/subcategory-list/subcategory-list.component';
import { CategoryListComponent } from '../../components/lists/category-list/category-list.component';
import {MaterialControllerService} from "../../../../core/controllers/material-controller.service";

@Component({
  selector: 'app-material-view',
  standalone: true,
  imports: [MaterialListComponent, MaterialComponent,RouterLink, SubcategoryListComponent, CategoryListComponent],
  templateUrl: './material-view.component.html',
  styleUrl: './material-view.component.css'
})
export class MaterialViewComponent {

  private materialController = inject(MaterialControllerService);
  ngOnDestroy(){
    this.materialController.setMaterial(this.materialController.getEmptyMaterial());
  }
}
