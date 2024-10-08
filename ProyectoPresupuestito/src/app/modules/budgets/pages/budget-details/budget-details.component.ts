import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../../components/navbar/navbar.component";
import { BudgetService } from '../../../../core/services/budget.service';
import { Budget } from '../../../../core/model/Budget';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkDetailComponent } from '../../../works/components/work-detail/work-detail.component';
import { Work } from '../../../../core/model/Work';
import { WorkService } from '../../../../core/services/work.service';
import { WorkCardComponent } from "../../../works/components/work-card/work-card.component";
import { BudgetComponent } from "../../components/budget/budget.component";
import { ClientComponent } from "../../../clients/components/client/client.component";
import { Client } from '../../../../core/model/Client';
import { WorkListComponent } from "../../../works/components/work-list/work-list.component";
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';
import { WorkComponent } from '../../../works/components/work/work.component';
/**
 * @class BudgetDetailsComponent
 * 
 * Buscador de la entidad cliente, sin funcionar por el momento.
 *
 */
@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, WorkDetailComponent, WorkCardComponent, BudgetComponent, ClientComponent, WorkListComponent, WorkComponent],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.css'
})
export class BudgetDetailsComponent {
  //Utils
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private budgetService = inject(BudgetService);
  private workController = inject(WorkControllerService);
  
  //Properties
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
  budgetId? : number;
  budgetClient : Client ={
    idClient: 1001,
      oPerson: {
        idPerson: 1,
        name: 'John',
        lastName: 'Doe',
        direction: '123 Main St',
        phoneNumber: '1234567890',
        mail: 'johndoe@example.com',
        dni: '123456789',
        cuit: '30-12345678-9',
      }
  };

  currentWork? : Work;

  

  ngOnInit(){
    this.budgetId = parseInt(this.activatedRoute.snapshot.params['budgetId']);    
    this.budgetService.getBudgetById(this.budgetId).subscribe(
      {
        next : res => this.currentBudget  = res,
      }
     )
    this.workController.getWork().subscribe(res =>{
      this.currentWork = res
    })
  }

  goToWorkArea(){
    this.router.navigate(["/work/edit/",this.currentBudget.idBudget]);
  }
  calculatePrice(){

  }
  calculateDeadline(){
    
  }

  seleccionar(workId : number){
    //this.currentWork = this.workService.getWorkById(workId)!;
    //this.workService.setSelectedWork(this.currentWork);
  }
  editWork($Event : number){

  }
  deleteWork($Event : number){

  }
}

