import { Component, inject } from '@angular/core';
import { CategoryCardComponent } from '../../cards/category-card/category-card.component';
import { Category } from '../../../../../core/model/Category';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../../components/confirmation-dialog/confirmation-dialog.component';
import { MaterialService } from '../../../../../core/services/material.service';
import { ModalService } from '../../../../../core/utils/modal.service';
import { CategoryFormComponent } from '../../forms/category-form/category-form.component';
import { TextCardComponent } from '../../../../../components/text-card/text-card.component';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryCardComponent,TextCardComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
   //Utils
   private dialog = inject(MatDialog);
   private modalService = inject(ModalService);
   private materialService = inject(MaterialService);
   private materialController = inject(MaterialControllerService);
   
 
 //SE PUEDE BORRAR PORQUE SE USO PARA PROBAR CON EL BACK
   //categories : dto[] = []
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
 
 
   ngOnInit(): void {
     this.materialService.getCategories().subscribe(
       {  
         next: x => this.categories = x,  
         
       }
     )
     
   }
 
   seleccionar($Event : Category){
     this.materialController.setCategory($Event);
   } 
 
   editar($Event : Category){
     
     this.materialController.setEditMode(true);
     this.materialController.setCategory($Event);
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
         this.materialService.deleteCategory($Event.idCategory);
       }
     });
 
   }
}
