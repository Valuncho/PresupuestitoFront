import { Component, EventEmitter, inject, Output } from '@angular/core';

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
  
  filtro = new FormControl('');
  busqueda = new FormControl('');
  idCost = new FormControl(0);
  

}
