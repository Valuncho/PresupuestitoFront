import { Component, inject } from '@angular/core';
import { CategoryCardComponent } from '../../cards/category-card/category-card.component';
import { Category } from '../../../../../core/model/Category';
import { ModalService } from '../../../../../core/services/utils/modal.service';
import { CategoryFormComponent } from '../../forms/category-form/category-form.component';
import { MaterialService } from '../../../../../core/services/material.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../../components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  //Utils
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private materialService = inject(MaterialService);
  


  //categories : Category[] = []
  categories : Category[]=[
    {
      idCategory: 1,
      name: 'Ferretería',
    },
    {
      idCategory: 2,
      name: 'Maderas'
    },
    {
      idCategory: 3,
      name: 'Adhesivos'
    },
    {
      idCategory: 4,
      name: 'Pinturería'
    }
  ]




  seleccionar($Event : Category){
    this.materialService.getState().setCategory($Event);
  } 

  editar($Event : Category){
    
    this.materialService.getState().setEditMode(true);
    this.materialService.getState().setCategory($Event);
    this.modalService.openModal<CategoryFormComponent,Category>(CategoryFormComponent);
  }

  eliminar($Event : Category){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar el rubro: ${$Event.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialService.deleteCategory($Event);
        //this.notification.showNotification("Rubro eliminado con éxito");
      }
    });

  }
}
