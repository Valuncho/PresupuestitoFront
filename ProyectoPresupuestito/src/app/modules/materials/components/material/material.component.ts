import { Component } from '@angular/core';
import { Material } from '../../../../core/model/Material';
@Component({
  selector: 'app-material',
  standalone: true,
  imports: [],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent {

  material : Material = {
    idMaterial: 1,
    name: 'Bisagra de cazoleta estándar',
    description: 'Bisagra oculta para muebles de cocina',
    color: 'Plateado',
    brand: 'Hafele',
    measure: '35mm',
    unitOfMeasure: 'Unidad',
    subCategory: {
      idCategoryMaterial: 7,
      name: 'Madera maciza',
      category: {
        idCategory: 1,
        name: 'Ferretería',
      }
    }
  }
}
