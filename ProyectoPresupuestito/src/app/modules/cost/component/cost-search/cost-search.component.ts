import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Cost } from '../../../../core/model/Cost';
import { CostService } from '../../../../core/services/Cost.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cost-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cost-search.component.html',
  styleUrl: './cost-search.component.css'
})
export class CostSearchComponent {
private costService = inject(CostService);
  
  @Output() clientSelected = new EventEmitter<number>();
  @Output() results = new EventEmitter<Cost[]>();
  @Output() sortedResults = new EventEmitter<Cost[]>();
  filtro = new FormControl('');
  busqueda = new FormControl('');
  idCost = new FormControl(0);
  filteredFixedCost: Cost[] = [];

  ngOnInit() {
    this.costService.getFixedCosts().subscribe({
      next : (fixedCost) =>{
        this.filteredFixedCost = fixedCost;
      }
    })
  }

  sort() {
    let sorted: Cost[] = [];
    /*switch (this.filtro.value) {
      case 'alfabeticamente':
        sorted = lodash.orderBy(
          this.clients.map((client) => ({
            ...client,
            oPerson: {
              ...client.oPerson,
              lastName: client.oPerson.lastName.toLowerCase(),
            },
          })),
          ['oPerson.lastName'],
          ['asc']
        );
        break;
      case 'alfabeticamente2':
        sorted = lodash.orderBy(
          this.clients.map((client) => ({
            ...client,
            oPerson: {
              ...client.oPerson,
              lastName: client.oPerson.lastName.toLowerCase(),
            },
          })),
          ['oPerson.lastName'],
          ['desc']
        );
        break;
      case 'dni':
        sorted = lodash.orderBy(this.clients, ['oPerson.dni'], ['asc']);
        break;
      default:
        sorted = lodash.orderBy(this.clients, ['oPerson.lastName'], ['asc']);
    }
    console.log(sorted);
    console.log('ordenado');
    this.filteredClients = sorted;*/
    this.sortedResults.emit(this.filteredFixedCost);
  }

  search() {
    console.log(this.busqueda.value);
    /*this.filteredClients = this.clients.filter(
      (client) =>
        client.oPerson.name
          .toLowerCase()
          .includes(this.busqueda.value!.toLowerCase()) ||
        client.oPerson.lastName
          .toLowerCase()
          .includes(this.busqueda.value!.toLowerCase()) ||
        client.oPerson.mail
          ?.toLowerCase()
          .includes(this.busqueda.value!.toLowerCase()) ||
        client.oPerson.phoneNumber
          ?.toString()
          .includes(this.busqueda.value!.toLowerCase()) ||
        client.oPerson.dni
          ?.toString()
          .includes(this.busqueda.value!.toLowerCase())
    );
*/
    this.sortedResults.emit(this.filteredFixedCost);
  }
}
