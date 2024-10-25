import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../../../core/model/Person';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { Client } from '../../../../core/model/Client';
import { MatTooltipModule } from '@angular/material/tooltip'; 
/**
 * @class ClientCardComponent
 * 
 * Tarjeta de la entidad cliente, con información básica, y botones para:
 * -Crear un presupuesto nuevo,
 * -Seleccionarlo o ver más detalles,
 * -Editarlo y
 * -Eliminarlo
 *
 */
@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent, MatTooltipModule ],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent {

  @Input() Client: Client | undefined;

  @Output() isView = new EventEmitter<Client>();
  @Output() action = new EventEmitter<Client>();
  
  @Output() isEdit = new EventEmitter<Client>();
  @Output() isDeleted = new EventEmitter<Client>();
  botones: Array<{ icon: string }> =[];

  ngOnInit(){
    this.botones = [
      {icon: 'visibility'},
      {icon: 'edit'},
      {icon: 'delete'},
      {icon: 'edit_note'},
      {icon: 'Check'}
      
    ];
    
  }
 
  newBudget(){
    this.action.emit(this.Client)
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

