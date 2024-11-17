import { Component, inject, Input } from '@angular/core';
import { Item } from '../../../../core/model/Item';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';
import { ModalService } from '../../../../core/utils/modal.service';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { WorkItemCardComponent } from '../work-item-card/work-item-card.component';
import { WorkItemFormComponent } from '../work-item-form/work-item-form.component';
import { ItemService } from '../../../../core/services/item.service';
import { BudgetControllerService } from '../../../../core/controllers/budget-controller.service';

@Component({
  selector: 'app-work-item-list',
  standalone: true,
  imports: [TextCardComponent, WorkItemCardComponent],
  templateUrl: './work-item-list.component.html',
  styleUrl: './work-item-list.component.css',
})
export class WorkItemListComponent {
  //Utils
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private itemService = inject(ItemService);
  private materialController = inject(MaterialControllerService);
  private budgetController = inject(BudgetControllerService);
  @Input() items: Item[] = [];
  @Input() options: boolean = false;
  addItemHandler() {
    this.modalService.openModal<WorkItemFormComponent, Item>(
      WorkItemFormComponent
    );
  }

  editar($Event: Item) {
    this.materialController.setEditMode(true);
    this.materialController.setItem($Event);
    this.modalService.openModal<WorkItemFormComponent, Item>(
      WorkItemFormComponent
    );
  }

  eliminar($Event: Item) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar el item de: ${$Event.oMaterial.materialName}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.itemService.deleteItem($Event.itemId).subscribe({
          next: () => {
            this.budgetController.setReload(true);
          },
        });
      }
    });
  }
}
