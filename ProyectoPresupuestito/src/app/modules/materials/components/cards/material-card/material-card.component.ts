import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Material } from '../../../../../core/model/Material';
import { ButtonCardComponent } from '../../../../../components/button-card/button-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-material-card',
  standalone: true,
  imports: [ButtonCardComponent, MatTooltipModule],
  templateUrl: './material-card.component.html',
  styleUrl: './material-card.component.css'
})
export class MaterialCardComponent {
  @Input() Material?: Material;
  
  @Output() isClick = new EventEmitter<Material>();
  @Output() isEdit = new EventEmitter<Material>();
  @Output() isDeleted = new EventEmitter<Material>();
  botones: Array<{  icon: string }> =[];

  ngOnInit(){
    this.botones = [
      {  icon: 'info' },
      {  icon: 'edit' },
      {  icon: 'delete' },
    ];
  }

  select(){
    this.isClick.emit(this.Material);
  }
  edit(){
    this.isEdit.emit(this.Material);
  }
  deleteC(){
    this.isDeleted.emit(this.Material);
  }
}
