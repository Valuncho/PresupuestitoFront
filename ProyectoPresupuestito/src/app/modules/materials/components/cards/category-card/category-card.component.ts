import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../../core/model/Category';
import { ButtonCardComponent } from '../../../../../components/button-card/button-card.component';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [ButtonCardComponent],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() Category?: Category;
  @Input() idCategory: number = 0;
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
    this.isClick.emit(this.idCategory);
  }
  edit(){
    
  }
  deleteC(){
    
  }
}
