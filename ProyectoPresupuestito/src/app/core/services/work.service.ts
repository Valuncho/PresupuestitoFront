import { inject, Injectable } from '@angular/core';
import { Work } from '../model/Work';
import { BehaviorSubject } from 'rxjs';
import { MaterialService } from './material.service';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private materialService = inject(MaterialService);

  private works : Work[] = [
    {   
      idWork: 1,
      order: 1001,
      materials: [
        {
          idItem:1,
          material: this.materialService.getMaterialById(4)!,
          quantity: 2
        },
        {
          idItem:2,
          material: this.materialService.getMaterialById(8)!,
          quantity: 7
        },
      ],
      estimatedHoursWorked: 8,
      deadline: new Date('2024-12-31'),
      costPrice: 300,
      status: 'Pendiente de aprobación',
      notes: 'Build a wooden table',
      images: ['image1.jpg', 'image2.png']
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
      images: ['image3.jpg']
  },
  {
    idWork: 3,
    order: 1003,
    materials: [
      {
        idItem:3,
        material: this.materialService.getMaterialById(3)!,
        quantity: 2
      },
      {
        idItem:4,
        material: this.materialService.getMaterialById(9)!,
        quantity: 7
      },
    ],
    estimatedHoursWorked: 12,
    deadline: new Date('2024-11-15'),
    costPrice: 450,
    status: 'Entregado',
    notes: 'Build a bookshelf',
    images: ['image4.jpg', 'image5.png']
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
    images: []
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
    images: ['image6.jpg', 'image7.png', 'image8.jpg']
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
    images: []
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
  images: ['image9.jpg']
}

  ];
   
  private selectedWork : Work = this.getEmptyWork();
  private _worksSubject = new BehaviorSubject<Work[]>(this.works);
  private _selectedWorkSubject = new BehaviorSubject<Work>(this.selectedWork);
  private estados : string[] = ['Presupuestado','Pendiente de aprobación','Aprobado','En proceso','Entregado','Cancelado'];

  constructor() { }

  getEmptyWork() : Work{
    const work : Work = {
      idWork: 0,
      order: 0,
      materials: [],
      estimatedHoursWorked: 8,
      deadline: new Date(),
      costPrice: 0,
      status: 'Presupuestado',
      notes: '',
      images: []
    }
    return work;
  }

  getWorks(){
    return this._worksSubject.asObservable();
  }

  getWorkById(workId: number): Work | undefined {
    return this.works.find(work => work.idWork === workId);
  }

  getSelectedWork(){
    return this._selectedWorkSubject.asObservable();
  }

  setSelectedWork(work : Work){
    this.selectedWork = work;
    this._selectedWorkSubject.next(this.selectedWork);
  }

  getEstados(){
    return this.estados;
  }

  
/*
  getMaterials(idWork: number): Work[] | undefined{
    const budgets = this.clientsHistory
    .filter(element => element.oClient.idClient === idClient)
    .flatMap(element => element.budgets);
  return budgets.length > 0 ? budgets : undefined;
    
  }
*/
}
