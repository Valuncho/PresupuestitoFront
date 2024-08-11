import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as lodash from 'lodash';
import { Client } from '../../../../core/model/Client';

@Component({
  selector: 'app-client-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-search.component.html',
  styleUrl: './client-search.component.css'
})

export class ClientSearchComponent {
  @Input() clients : Client[] = [];
  @Output() clientSelected = new EventEmitter<number>();
  @Output() results = new EventEmitter<Client[]>();
  @Output() sortedResults = new EventEmitter<Client[]>();
  filtro = new FormControl('');
  busqueda = new FormControl('');
  idClient = new FormControl(0);
  filteredClients: Client[] = [];

  ngOnInit() {
    this.filteredClients = this.clients;
  }

  
  sort(){
    let sorted : Client[] = []
    switch(this.filtro.value){
      case 'alfabeticamente':
        sorted = lodash.orderBy(this.clients, ['oPerson.lastName'], ['asc']);
        break;
      case 'alfabeticamente2':
        sorted = lodash.orderBy(this.clients, ['oPerson.lastName'], ['desc']);
        break;
      case'dni':
        sorted = lodash.orderBy(this.clients, ['oPerson.dni'], ['asc']);
        break;
      default:
        sorted = lodash.orderBy(this.clients, ['oPerson.lastName'], ['asc']);

    }
    console.log(sorted)    
    console.log('ordenado')
    this.filteredClients = sorted;
    this.sortedResults.emit(this.filteredClients);
  }

  search() {
    
    console.log(this.busqueda.value);
    this.filteredClients = this.clients.filter(client =>
      client.oPerson.name.toLowerCase().includes(this.busqueda.value!.toLowerCase()) ||
      client.oPerson.lastName.toLowerCase().includes(this.busqueda.value!.toLowerCase()) ||
      client.oPerson.mail?.toLowerCase().includes(this.busqueda.value!.toLowerCase()) ||
      client.oPerson.phoneNumber?.toString().includes(this.busqueda.value!.toLowerCase()) ||
      client.oPerson.dni?.toString().includes(this.busqueda.value!.toLowerCase())
    );
    
    this.sortedResults.emit(this.filteredClients);
    
  }
}
