import { Component, inject, Input } from '@angular/core';
import { TextCardComponent } from "../../../../components/text-card/text-card.component";
import { InvoiceItemCardComponent } from '../invoice-item-card/invoice-item-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';
import { ItemService } from '../../../../core/services/item.service';
import { ModalService } from '../../../../core/utils/modal.service';
import { UtilsService } from '../../../../core/utils/utils.service';
import { InvoiceItem } from '../../../../core/model/invoiceItem';
import { InvoiceItemFormComponent } from '../invoice-item-form/invoice-item-form.component';

@Component({
  selector: 'app-invoice-item-list',
  standalone: true,
  imports: [TextCardComponent,InvoiceItemCardComponent],
  templateUrl: './invoice-item-list.component.html',
  styleUrl: './invoice-item-list.component.css'
})
export class InvoiceItemListComponent {
  //Utils
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private itemService = inject(ItemService);
  private materialController = inject(MaterialControllerService);
  private utils = inject(UtilsService);
  @Input() items : InvoiceItem[]=[]
  @Input() options : boolean = false;
  addItemHandler(){
    this.modalService.openModal<InvoiceItemFormComponent,InvoiceItem>(InvoiceItemFormComponent);

  }

  editar($Event : InvoiceItem){
    this.materialController.setEditMode(true);
    //this.materialController.setItem($Event);
    this.modalService.openModal<InvoiceItemFormComponent,InvoiceItem>(InvoiceItemFormComponent);
  }

  eliminar($Event : InvoiceItem){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar el item de: ${$Event.material.materialName}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemService.deleteItem($Event.idInvoiceItem).subscribe(
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
