import { Component, inject } from '@angular/core';
import { Work } from '../../../../core/model/Work';
import { CommonModule } from '@angular/common';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { Router } from '@angular/router';
import {BudgetViewComponent} from "../../../budgets/pages/budget-view/budget-view.component";
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';
import { Item } from '../../../../core/model/Item';
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';
import { ModalService } from '../../../../core/utils/modal.service';
import { MaterialManagerComponent } from '../../../materials/components/forms/material-manager/material-manager.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { ItemService } from '../../../../core/services/item.service';

@Component({
  selector: 'app-work-detail',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent, BudgetViewComponent],
  templateUrl: './work-detail.component.html',
  styleUrl: './work-detail.component.css'
})
export class WorkComponent {
  //Utils
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private itemService = inject(ItemService);
  private materialController = inject(MaterialControllerService);
  private workController = inject(WorkControllerService);
  
  currentWork! : Work;
  item : Item = this.materialController.getEmptyItem();
  options = false;

  ngOnInit(): void {
  
      if(this.router.url == "/work" ){
        this.options = true;

      }

      this.workController.getWork().subscribe(res =>
        this.currentWork = res
      )

  }

  goToWorkArea(){
    this.router.navigate(["/workArea/"]);
  }

  goToBudgetDetail(){
    this.router.navigate(["/budget/detail"]);
  }

  openMaterialManager(){
    this.modalService.openModal<MaterialManagerComponent,Item>(MaterialManagerComponent);
  }

  updateItem(item : Item){
    this.materialController.setEditMode(true);
    this.materialController.setItem(item);
    this.openMaterialManager();
  }

  deleteItem(item : Item){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar el item seleccionado?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemService.deleteItem(item.idItem).subscribe();
      }
    });
  }


}
