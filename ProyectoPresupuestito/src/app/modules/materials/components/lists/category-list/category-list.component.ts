import { Component } from '@angular/core';
import { CategoryCardComponent } from '../../cards/category-card/category-card.component';
import { Category } from '../../../../../core/model/Category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  //categories : Category[] = []
  categories : Category[]=[
    {
      idCategory: 1,
      name: 'Ferretería',
    },
    {
      idCategory: 2,
      name: 'Maderas'
    },
    {
      idCategory: 3,
      name: 'Adhesivos'
    },
    {
      idCategory: 4,
      name: 'Pinturería'
    }
  ]




  seleccionar($Event : number){
    //let m = this.materialService.getMaterialById($Event)!;
    
  } 
  editar($Event : number){}
  eliminar($Event : number){}
}
