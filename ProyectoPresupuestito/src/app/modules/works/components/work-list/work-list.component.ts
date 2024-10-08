import { Component, inject, Input } from '@angular/core';
import { WorkCardComponent } from '../work-card/work-card.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../../core/utils/modal.service';
import { WorkService } from '../../../../core/services/work.service';
import { Work } from '../../../../core/model/Work';
import { NgxPaginationModule } from 'ngx-pagination';
import { WorkFormComponent } from '../work-form/work-form.component';
import { WorkSearchComponent } from "../work-search/work-search.component";
import { CommonModule } from '@angular/common';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';

@Component({
  selector: 'app-work-list',
  standalone: true,
  imports: [WorkCardComponent, NgxPaginationModule, WorkSearchComponent,CommonModule, TextCardComponent],
  templateUrl: './work-list.component.html',
  styleUrl: './work-list.component.css',
})
export class WorkListComponent {
  //Utils
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(ModalService);
  private workService = inject(WorkService);
  private workController = inject(WorkControllerService);
  //Properties

  

  @Input() works: Work[] = [];

  options: Boolean = false;
  budgetId : number = 0;
  //Pagination
  workPage: number = 1;
  worksToPage: number = 5;

  ngOnInit(): void {
    
    this.budgetId = parseInt(this.activatedRoute.snapshot.params['budgetId']);
    let budgetDetailUrl = "/budget/detail/" + this.budgetId;
    let worksViewUrl = "/work";
    
    if(budgetDetailUrl == this.router.url){
      
      this.options = true;
      this.works = 
        [
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
        ]
      
      
    }else if(worksViewUrl == this.router.url){
      
      this.workService.getWorks().subscribe(res =>{
        this.works = res;
    
      })
      this.works = [{  
        idWork: 1,
        order: 1001,
        materials: [
          
        ],
        estimatedHoursWorked: 8,
        deadline: new Date('2024-12-31'),
        costPrice: 300,
        status: 'Pendiente de aprobación',
        notes: 'Build a wooden table',
        
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
        notes: 'Paint the walls',
        
    },
    {
      idWork: 3,
      order: 1003,
      materials: [],
      estimatedHoursWorked: 12,
      deadline: new Date('2024-11-15'),
      costPrice: 450,
      status: 'Entregado',
      notes: 'Build a bookshelf',
      
    },
    {
      idWork: 4,
      order: 1004,
      materials: [],
      estimatedHoursWorked: 3,
      deadline: new Date('2024-10-01'),
      costPrice: 120,
      status: 'En proceso',
      notes: 'Fix the fence',
    
    },
    {
      idWork: 5,
      order: 1005,
      materials: [],
      estimatedHoursWorked: 15,
      deadline: new Date('2025-02-28'),
      costPrice: 600,
      status: 'Pendiente de aprobación',
      notes: 'Renovate the kitchen',
    
    },
    {
      idWork: 6,
      order: 1006,
      materials: [],
      estimatedHoursWorked: 2,
      deadline: new Date('2024-09-15'),
      costPrice: 80,
      status: 'Entregado',
      notes: 'Clean the garage',
    
  },
  {
    idWork: 7,
    order: 1007,
    materials: [],
    estimatedHoursWorked: 4,
    deadline: new Date('2024-12-10'),
    costPrice: 150,
    status: 'En proceso',
    notes: 'Build a birdhouse',
    
  }]
    }

    
    


   
  
  }

 

  seleccionar($Event: Work) {
    this.workController.setWork($Event);
    
  }
  editar($Event: Work) {}
  eliminar($Event: Work) {}

  addWorkHandler() {
    this.modalService.openModal(WorkFormComponent);
  }
  goToWorkArea(){
    this.router.navigate(['/work/edit']);
  }
  onSaveWorksHandler() {
    this.router.navigate(['/budget/detail',this.budgetId]);
  }
  //Pagination
  pageChange(page: number) {
    this.workPage = page;
  }
}
