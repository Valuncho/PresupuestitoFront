import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialCardComponent } from '../../cards/material-card/material-card.component';
import { Material } from '../../../../../core/model/Material';
import { MaterialService } from '../../../../../core/services/material.service';
import { MaterialSearchComponent } from "../../material-search/material-search.component";
import { MaterialFormComponent } from '../../forms/material-form/material-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../../../core/utils/modal.service';
import { ConfirmationDialogComponent } from '../../../../../components/confirmation-dialog/confirmation-dialog.component';
import { TextCardComponent } from '../../../../../components/text-card/text-card.component';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';
import { UtilsService } from '../../../../../core/utils/utils.service';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, MaterialCardComponent, MaterialSearchComponent, TextCardComponent],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css'
})
export class MaterialListComponent {
  //Utils
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private materialService = inject(MaterialService);
  private materialController = inject(MaterialControllerService);
  private utils = inject(UtilsService);
  //Properties
  materials : Material[] = []

  items : number = 5
  page : number = 1

  ngOnInit(): void {
    this.materialService.getMaterials().subscribe(
      {  
        next: x => this.materials = x,  
      }
    )
  }
 
 
  //Card
  seleccionar($Event : Material){
    this.materialController.setMaterial($Event);
  } 
  editar($Event : Material){
    this.materialController.setEditMode(true);
    this.materialController.setMaterial($Event);
    this.modalService.openModal<MaterialFormComponent,Material>(MaterialFormComponent);
  }
  eliminar($Event : Material){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar el material: ${$Event.materialName}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialService.deleteMaterial($Event.materialId).subscribe(   {
          next: ()=>{
            this.utils.reaload()
          }
        });
        
      }
    });
  }

  pageChange(page: number) {
    this.page = page;
  }
}

