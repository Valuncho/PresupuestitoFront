import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../core/model/Person';
import { ButtonCardComponent } from "../button-card/button-card.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() Person: Person | undefined;
  @Input() IdClient: number = 0;
  @Output() isView = new EventEmitter<number>();
  @Output() action = new EventEmitter<number>();
  @Output() isSelected = new EventEmitter<number>();
  @Output() isEdit = new EventEmitter<number>();
  @Output() isDeleted = new EventEmitter<number>();
  botones: Array<{ icon: string }> =[];
  //{ url: '/client/editar/'+this.IdClient+'', icon: 'edit' },

  ngOnInit(){
    this.botones = [
      {icon: 'visibility'},
      {icon: 'edit'},
      {icon: 'delete'},
      {icon: 'edit_note'},
      {icon: 'Check'}
      
    ];
    
  }
  constructor() {
   
  }
  
  newBudget(){
    this.action.emit(this.IdClient)
  }

  select(){
    this.isSelected.emit(this.IdClient);
  }
  view(){
    this.isView.emit(this.IdClient);
  }
  edit(){
    this.isEdit.emit(this.IdClient);
  }

  deleteC(){
    this.isDeleted.emit(this.IdClient);
  }
  

}

