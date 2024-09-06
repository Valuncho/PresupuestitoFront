import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Material } from '../../../../../core/model/Material';
import { ButtonCardComponent } from '../../../../../components/button-card/button-card.component';

@Component({
  selector: 'app-material-card',
  standalone: true,
  imports: [ButtonCardComponent],
  templateUrl: './material-card.component.html',
  styleUrl: './material-card.component.css'
})
export class MaterialCardComponent {
  @Input() Material?: Material;
  @Input() idMaterial: number = 0;
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
    this.isClick.emit(this.idMaterial);
  }
  edit(){
    
  }
  deleteC(){
    
  }
}
