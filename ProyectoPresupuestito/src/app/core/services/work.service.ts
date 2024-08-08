import { Injectable } from '@angular/core';
import { Work } from '../model/Work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  
  works : Work[] = [

    {   
      idWork: 1,
      order: 1001,
      materials: ["Pintura", "madura"],
      estimatedHoursWorked: 8,
      deadline: new Date('2024-12-31'),
      costPrice: 300,
      status: 'Pending',
      notes: 'Build a wooden table',
      images: ['image1.jpg', 'image2.png']
    },
    {
      idWork: 2,
      order: 1002,
      materials: ["Pintura", "madura"],
      estimatedHoursWorked: 5,
      deadline: new Date('2025-01-15'),
      costPrice: 250,
      status: 'In Progress',
      notes: 'Paint the walls',
      images: ['image3.jpg']
  },
  {
    idWork: 3,
    order: 1003,
    materials: ["Pintura", "madura"],
    estimatedHoursWorked: 12,
    deadline: new Date('2024-11-15'),
    costPrice: 450,
    status: 'Completed',
    notes: 'Build a bookshelf',
    images: ['image4.jpg', 'image5.png']
  },
  {
    idWork: 4,
    order: 1004,
    materials: ["Los"],
    estimatedHoursWorked: 3,
    deadline: new Date('2024-10-01'),
    costPrice: 120,
    status: 'In Progress',
    notes: 'Fix the fence',
    images: []
  },
  {
    idWork: 5,
    order: 1005,
    materials: ["asdasd"],
    estimatedHoursWorked: 15,
    deadline: new Date('2025-02-28'),
    costPrice: 600,
    status: 'Pending',
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
    status: 'Completed',
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
  status: 'In Progress',
  notes: 'Build a birdhouse',
  images: ['image9.jpg']
}

  ];

  constructor() { }

  getWorks(): Work[] {
    return this.works;
  }

  getWorkById(workId: number): Work | undefined {
    return this.works.find(work => work.idWork === workId);
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
