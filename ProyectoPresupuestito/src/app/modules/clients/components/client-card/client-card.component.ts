import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../../../core/model/Person';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { Client } from '../../../../core/model/Client';


@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent {
  @Input() Client: Client | undefined;
  @Output() isView = new EventEmitter<Client>();
  @Output() action = new EventEmitter<Client>();
  @Output() isSelected = new EventEmitter<Client>();
  @Output() isEdit = new EventEmitter<Client>();
  @Output() isDeleted = new EventEmitter<Client>();
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
    this.action.emit(this.Client)
  }

  select(){
    this.isSelected.emit(this.Client);
  }
  view(){
    this.isView.emit(this.Client);
  }
  edit(){
    this.isEdit.emit(this.Client);
  }

  deleteC(){
    this.isDeleted.emit(this.Client);
  }
  

}

