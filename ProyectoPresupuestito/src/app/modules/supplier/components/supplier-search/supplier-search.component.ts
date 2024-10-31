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

  

  

  
}



