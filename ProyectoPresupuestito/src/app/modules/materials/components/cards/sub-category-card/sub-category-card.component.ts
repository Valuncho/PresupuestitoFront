import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Material } from '../../../../../core/model/Material';
import { SubCategoryMaterial } from '../../../../../core/model/SubCategoryMaterial';
import { ButtonCardComponent } from '../../../../../components/button-card/button-card.component';

@Component({
  selector: 'app-sub-category-card',
  standalone: true,
  imports: [ButtonCardComponent],
  templateUrl: './sub-category-card.component.html',
  styleUrl: './sub-category-card.component.css'
})
export class SubCategoryCardComponent {
  @Input() Subcategory?: SubCategoryMaterial;
  @Input() idSubcategory: number = 0;
  @Output() isClick = new EventEmitter<number>();
  @Output() isEdit = new EventEmitter<number>();
  @Output() isDeleted = new EventEmitter<number>();
  botones: Array<{  icon: string }> =[];

  ngOnInit(){
    this.botones = [
      {  icon: 'info' },
      {  icon: 'edit' },
      {  icon: 'delete' },
    ];
  }

  select(){
    this.isClick.emit(this.idSubcategory);
  }
  edit(){
    
  }
  deleteC(){
    
  }
}
