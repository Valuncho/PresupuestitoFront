import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../../core/model/Item';
import { MatTooltip } from '@angular/material/tooltip';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';

@Component({
  selector: 'app-work-item-card',
  standalone: true,
  imports: [MatTooltip, ButtonCardComponent],
  templateUrl: './work-item-card.component.html',
  styleUrl: './work-item-card.component.css'
})
export class WorkItemCardComponent {
  @Input() Item?: Item;

  
  @Output() isEdit = new EventEmitter<Item>();
  @Output() isDeleted = new EventEmitter<Item>();
  botones: Array<{  icon: string }> =[];

  ngOnInit(){
    this.botones = [
      
      {  icon: 'edit' },
      {  icon: 'delete' },
    ];
  }


  edit(){
    this.isEdit.emit(this.Item);
  }
  deleteC(){
    this.isDeleted.emit(this.Item);
  }
}
