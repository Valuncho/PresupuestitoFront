import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Material } from '../../../../../core/model/Material';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../../../../core/model/Item';
import { InvoiceItem } from '../../../../../core/model/invoiceItem';
import { MaterialStateService } from '../../../../../core/states/material-state.service';
import { MaterialService } from '../../../../../core/services/material.service';
import { MaterialListComponent } from '../../lists/material-list/material-list.component';
import { ModalService } from '../../../../../core/services/utils/modal.service';

@Component({
  selector: 'app-material-manager',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './material-manager.component.html',
  styleUrl: './material-manager.component.css'
})
export class MaterialManagerComponent {
  //Utils
  private materialService = inject(MaterialService);
  private modalService = inject(ModalService);

  @Input() itemToHandle : Item | InvoiceItem = this.materialService.getEmptyItem();
  @Output() item = new EventEmitter<Item | InvoiceItem>();
  currentItem : Item | InvoiceItem | undefined =  this.itemToHandle;

  itemForm : FormGroup = new FormGroup({
    id : new FormControl(),
    material : new FormControl(),
    quantity : new FormControl()
  });

  ngAfterViewInit(): void {
     
  }

  openMaterialList(){
    this.modalService.openModal<MaterialListComponent,Material>(MaterialListComponent);
  }


  sent(){
    this.item.emit(this.currentItem);
  }
}
