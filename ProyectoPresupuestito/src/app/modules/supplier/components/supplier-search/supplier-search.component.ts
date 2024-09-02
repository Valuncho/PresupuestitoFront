import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Supplier } from '../../../../core/model/Supplier';
import * as lodash from 'lodash';



@Component({
    selector: 'app-supplier-search',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule],
    templateUrl: './supplier-search.component.html',
    styleUrl: './supplier-search.component.css',
})
export class SupplierSearchComponent { 

  @Input() suppliers : Supplier[] = [];
  @Output() supplierSelected = new EventEmitter<number>();
  @Output() results = new EventEmitter<Supplier[]>();
  @Output() sortedResults = new EventEmitter<Supplier[]>();
  filtro = new FormControl('');
  busqueda = new FormControl('');
  idClient = new FormControl(0);
  filteredSupplierss: Supplier[] = [];

  ngOnInit() {
    this.filteredSupplierss = this.suppliers;
  }

  
  sort(){
    let sorted : Supplier[] = []
    switch(this.filtro.value){
      case 'alfabeticamente':
        sorted = lodash.orderBy(this.suppliers, ['oPerson.lastName'], ['asc']);
        break;
      case 'alfabeticamente2':
        sorted = lodash.orderBy(this.suppliers, ['oPerson.lastName'], ['desc']);
        break;
      case'dni':
        sorted = lodash.orderBy(this.suppliers, ['oPerson.dni'], ['asc']);
        break;
      default:
        sorted = lodash.orderBy(this.suppliers, ['oPerson.lastName'], ['asc']);

    }
    console.log(sorted)    
    console.log('ordenado')
    this.filteredSupplierss = sorted;
    this.sortedResults.emit(this.filteredSupplierss);
  }

  search() {
    
    console.log(this.busqueda.value);
    this.filteredSupplierss = this.suppliers.filter(supplier =>
      supplier.oPerson.name.toLowerCase().includes(this.busqueda.value!.toLowerCase()) ||
      supplier.oPerson.lastName.toLowerCase().includes(this.busqueda.value!.toLowerCase()) ||
      supplier.oPerson.mail?.toLowerCase().includes(this.busqueda.value!.toLowerCase()) ||
      supplier.oPerson.phoneNumber?.toString().includes(this.busqueda.value!.toLowerCase()) ||
      supplier.oPerson.dni?.toString().includes(this.busqueda.value!.toLowerCase())
    );
    
    this.sortedResults.emit(this.filteredSupplierss);
    
  }
}



