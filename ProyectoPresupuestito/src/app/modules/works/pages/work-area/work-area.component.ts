import { Component, inject } from '@angular/core';
import { WorkListComponent } from "../../components/work-list/work-list.component";
import { WorkDetailComponent } from "../../components/work-detail/work-detail.component";
import { MaterialListComponent } from "../../../materials/components/lists/material-list/material-list.component";
import { WorkService } from '../../../../core/services/work.service';
import { Router } from '@angular/router';
import {BudgetService} from "../../../../core/services/budget.service";
import { MaterialManagerComponent } from "../../../materials/components/forms/material-manager/material-manager.component";
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';
import { BudgetComponent } from "../../../budgets/components/budget/budget.component";
import { Budget } from '../../../../core/model/Budget';

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [WorkListComponent, WorkDetailComponent, MaterialListComponent, MaterialManagerComponent, BudgetComponent],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.css'
})
export class WorkAreaComponent {
  //Util
  private workService = inject(WorkService);
  private materialController = inject(MaterialControllerService);

  currentBudget : Budget = {
    
    idBudget: 1,
    works: [
      {   
        idWork: 1,
        order: 1001,
        materials: [
          {
            idItem:1,
            material: {
              idMaterial:11,
              name: 'MDF Melamínico',
              description: 'Panel aglomerado recubierto con melamina',
              color: 'Blanco',
              brand: 'Masisa', // Marca ficticia
              measure: '18mm x 1200mm x 2400mm',
              unitOfMeasure: 'Placa',
              subCategory:  {
              idCategoryMaterial: 8,
              name: 'Madera contrachapada',
              category: {
              idCategory: 2,
              name: 'Maderas'
            }
            }},
            quantity: 2
          },
          {
            idItem:2,
            material: {
              idMaterial: 9,
              name: 'Nogal',
              description: 'Madera blanda de color claro',
              color: 'Amarillo claro',
              brand: 'Forestal', // Marca ficticia
              measure: '2x4', // Ejemplo de medida
              unitOfMeasure: 'Metro lineal',
              subCategory:  {
              idCategoryMaterial: 7,
              name: 'Madera maciza',
              category: {
              idCategory: 2,
              name: 'Maderas'
            }
            }},
            quantity: 7
          },
        ],
        estimatedHoursWorked: 8,
        deadline: new Date('2024-12-31'),
        costPrice: 300,
        status: 'Pendiente de aprobación',
        notes: 'Build a wooden table'
      },
      {
        idWork: 2,
        order: 1002,
        materials: [
  
        ],
        estimatedHoursWorked: 5,
        deadline: new Date('2025-01-15'),
        costPrice: 250,
        status: 'En proceso',
        notes: 'Paint the walls'
    }
    ], // Replace with actual work data if needed
    createdDate: new Date('2023-08-20'),
    deadLine: new Date('2023-12-22'),
    description: 'Kitchen renovation',
    cost: 5000,
    Status: 'Cancelado',
    payments: [
      
    ], // Or provide payment data if needed
  
}; 

  ngOnInit(): void {
    /*
    this.workService.getSelectedWork().subscribe(work =>{
      this.currentWork = work;
    })
    if( this.currentWork == this.workService.getEmptyWork())  {
      this.router.navigate(['/work'])
    }*/
  }

  handlerItem(){
    //this.materialController.setItem()
  }

}
