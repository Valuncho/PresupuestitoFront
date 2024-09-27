import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Material } from '../../../../../core/model/Material';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../../../../core/model/Item';
import { InvoiceItem } from '../../../../../core/model/invoiceItem';
import { MaterialService } from '../../../../../core/services/material.service';
import { MaterialListComponent } from '../../lists/material-list/material-list.component';
import { ModalService } from '../../../../../core/utils/modal.service';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';
import { InvoiceCardComponent } from '../../../../invoice/components/invoice-card/invoice-card.component';


@Component({
  selector: 'app-material-manager',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './material-manager.component.html',
  styleUrl: './material-manager.component.css'
})
export class MaterialManagerComponent {
  //Utils
  private materialController = inject(MaterialControllerService);
  private modalService = inject(ModalService);

  @Input() itemToHandle : Item | InvoiceItem = this.materialController.getEmptyItem();
  @Output() item = new EventEmitter<Item | InvoiceItem>();
  currentItem : Item  =  this.materialController.getEmptyItem();
  currentInvoiceItem : InvoiceItem  =  this.materialController.getEmptyInvoiceItem();

  itemForm : FormGroup = new FormGroup({
    id : new FormControl(),
    material : new FormControl(),
    quantity : new FormControl()
  });

  ngAfterViewInit(): void {
     this.materialController.getMaterial().subscribe(res =>{
      this.itemForm.value.material = res!;
     })
  }

  openMaterialList(){
    this.modalService.openModal<MaterialListComponent,Material>(MaterialListComponent);
  }


  sent(){

    this.materialController.setItem(this.currentItem);
    //this.item.emit(this.currentItem);
  }
}
