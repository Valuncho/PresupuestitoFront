import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../../../core/model/Client';
import { Material } from '../../../../core/model/Material';
import * as lodash from 'lodash';
@Component({
  selector: 'app-material-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './material-search.component.html',
  styleUrl: './material-search.component.css'
})
export class MaterialSearchComponent {
  @Input() material : Material[] = [];
  @Output() materialelected = new EventEmitter<number>();
  @Output() results = new EventEmitter<Material[]>();
  @Output() sortedResults = new EventEmitter<Material[]>();
  filtro = new FormControl('');
  busqueda = new FormControl('');
  idClient = new FormControl(0);
  filteredmaterial: Material[] = [];

  ngOnInit() {
    this.filteredmaterial = this.material;
  }

  
  sort(){
    let sorted : Material[] = []
    switch(this.filtro.value){
      default:
      case 'alfabeticamente':
        sorted = lodash.orderBy(this.material, ['name'], ['asc']);
        break;
      case 'alfabeticamente2':
        sorted = lodash.orderBy(this.material, ['name'], ['desc']);
        break;
    }
    console.log(sorted)    
    console.log('ordenado')
    this.filteredmaterial = sorted;
    this.sortedResults.emit(this.filteredmaterial);
  }

  search() {
    
    console.log(this.busqueda.value);
    this.filteredmaterial = this.material.filter(material =>
      material.name.toLowerCase().includes(this.busqueda.value!.toLowerCase()) ||
      material.description.toLowerCase().includes(this.busqueda.value!.toLowerCase()) ||
      material.brand.toLowerCase().includes(this.busqueda.value!.toLowerCase()) ||
      material.unitOfMeasure.toLowerCase().includes(this.busqueda.value!.toLowerCase()) 
    );

    this.sortedResults.emit(this.filteredmaterial);
    
  }
}



