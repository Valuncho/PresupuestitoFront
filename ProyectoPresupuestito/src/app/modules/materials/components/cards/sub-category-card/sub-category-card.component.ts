import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  

  @Output() isEdit = new EventEmitter<SubCategoryMaterial>();
  @Output() isDeleted = new EventEmitter<SubCategoryMaterial>();
  botones: Array<{  icon: string }> =[];

  ngOnInit(){
    this.botones = [
      {  icon: 'info' },
      {  icon: 'edit' },
      {  icon: 'delete' },
    ];
  }


  edit(){
    this.isEdit.emit(this.Subcategory);
  }
  deleteC(){
    this.isDeleted.emit(this.Subcategory);
  }
}