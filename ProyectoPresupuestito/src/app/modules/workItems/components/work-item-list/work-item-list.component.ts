import { Component, inject, Input, input } from '@angular/core';
import { Item } from '../../../../core/model/Item';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';
import { Category } from '../../../../core/model/Category';
import { CategoryService } from '../../../../core/services/category.service';
import { ModalService } from '../../../../core/utils/modal.service';
import { UtilsService } from '../../../../core/utils/utils.service';
import { CategoryFormComponent } from '../../../materials/components/forms/category-form/category-form.component';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { MaterialManagerComponent } from '../../../materials/components/forms/material-manager/material-manager.component';

@Component({
  selector: 'app-work-item-list',
  standalone: true,
  imports: [TextCardComponent],
  templateUrl: './work-item-list.component.html',
  styleUrl: './work-item-list.component.css'
})
export class WorkItemListComponent {
 //Utils
 private dialog = inject(MatDialog);
 private modalService = inject(ModalService);
 private categoryService = inject(CategoryService);
 private materialController = inject(MaterialControllerService);
 private utils = inject(UtilsService);
 @Input() items : Item[]=[]


 ngOnInit(): void {
   
   
   
 }

 addItemHandler(){
  this.modalService.openModal<MaterialManagerComponent,Item>(MaterialManagerComponent);

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
       mensaje: `¿Estás seguro de que deseas eliminar el rubro: ${$Event.categoryName}?`
     }
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.categoryService.deleteCategory($Event.categoryId).subscribe(
        {
          next: ()=>{
            this.utils.reaload()
          }
        }
       );
     }
   });

 }
}
