import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../../core/model/Category';
import { ButtonCardComponent } from '../../../../../components/button-card/button-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';



@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [ButtonCardComponent, MatTooltipModule],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css', "../../../../../styles/Card.css"]
})
export class CategoryCardComponent {
  @Input() Category?: Category;

  @Output() isClick = new EventEmitter<Category>();
  @Output() isEdit = new EventEmitter<Category>();
  @Output() isDeleted = new EventEmitter<Category>();
  botones: Array<{  icon: string }> =[];

  ngOnInit(){
    this.botones = [
      {  icon: 'info' },
      {  icon: 'edit' },
      {  icon: 'delete' },
    ];
  }

  select(){
    this.isClick.emit(this.Category);
  }
  edit(){
    this.isEdit.emit(this.Category);
  }
  deleteC(){
    this.isDeleted.emit(this.Category);
  }
}
