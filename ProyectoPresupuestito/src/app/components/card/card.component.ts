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
  @Output() action = new EventEmitter<number>();
  @Output() isSelected = new EventEmitter<number>();
  @Output() isEdit = new EventEmitter<number>();
  @Output() isDeleted = new EventEmitter<number>();
  botones: Array<{  url: string; icon: string }> =[];
  //{ url: '/client/editar/'+this.IdClient+'', icon: 'edit' },

  ngOnInit(){
    this.botones = [
      { url: '/client/detail/'+this.IdClient+'', icon: 'info' },
      { url: '/client/edit/'+this.IdClient+'', icon: 'edit' },
      { url: '/client/eliminar'+this.IdClient+'', icon: 'delete' },
      { url: '/payment/'+this.IdClient+'', icon: 'payments' },
      { url: '/budget/'+this.IdClient+'', icon: 'edit_note' }
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

  edit(){
    this.isEdit.emit(this.IdClient);
  }

  deleteC(){
    this.isDeleted.emit(this.IdClient);
  }
  

}

