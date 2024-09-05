import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialCardComponent } from '../../material-card/material-card.component';
import { Material } from '../../../../../core/model/Material';
import { MaterialService } from '../../../../../core/services/material.service';
import { Work } from '../../../../../core/model/Work';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialSearchComponent } from "../../material-search/material-search.component";
import { WorkService } from '../../../../../core/services/work.service';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, MaterialCardComponent, MaterialSearchComponent],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css'
})
export class MaterialListComponent {
  //Utils
  private materialService = inject(MaterialService);

  private router = inject(Router);
  private activedRoute = inject(ActivatedRoute);
  //Properties
  
  materials : Material[] = []
  materialsToDisplay : Material[] = []
  items : number = 5
  page : number = 1

  ngOnInit(): void {
  
    if(this.router.url == '/material'){
      this.materialsToDisplay = this.materials;
    }
      
    
  }


 

   //Search
   handleSearch($Event : Material[]){
    this.page = 1
    this.materialsToDisplay = $Event;
  }
  seleccionar($Event : number){
    let m = this.materialService.getMaterialById($Event)!;
    ;
  } 
  editar($Event : number){}
  eliminar($Event : number){}
  pageChange(page: number) {
    this.page = page;
  }
}

