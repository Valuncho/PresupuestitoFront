import { Component, inject } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';
import { Item } from '../../../../core/model/Item';
import { Material } from '../../../../core/model/Material';
import { InvoceItemRequest } from '../../../../core/request/invoceItemRequest';
import { ItemService } from '../../../../core/services/item.service';
import { ModalService } from '../../../../core/utils/modal.service';
import { UtilsService } from '../../../../core/utils/utils.service';
import { MaterialListComponent } from '../../../materials/components/lists/material-list/material-list.component';
import {InvoiceControllerService} from "../../../../core/controllers/invoice-controller.service";
import {InvoiceItem} from "../../../../core/model/invoiceItem";
import {InvoiceItemService} from "../../../../core/services/invoice-item.service";

@Component({
  selector: 'app-invoice-item-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-item-form.component.html',
  styleUrl: './invoice-item-form.component.css'
})
export class InvoiceItemFormComponent {
  //Utils
  private materialController = inject(MaterialControllerService);
  private modalService = inject(ModalService);
  private itemService = inject(InvoiceItemService);
  private invoiceControllerService = inject(InvoiceControllerService);
  private utils = inject(UtilsService);
  //Suscriptions
  private InvoiceSubscription: Subscription = new Subscription;
  private ItemSubscription: Subscription = new Subscription;
  private MaterialSubscription: Subscription = new Subscription;
  //Properties
  currentItem : InvoceItemRequest = this.materialController.getEmptyInvoiceItemRequest();
  currentMaterial : Material = this.materialController.getEmptyMaterial();
  invoiceId : number = 0;
  edit : boolean = false;
  itemForm : FormGroup = new FormGroup({
    id : new FormControl(0),
    material : new FormControl('', Validators.required),
    idmaterial : new FormControl(0, Validators.required),
    quantity : new FormControl(1,[Validators.min(0), Validators.required]),
    price: new FormControl(10, [Validators.min(0), Validators.required])
  });


ngOnInit(): void {
  this.edit = this.materialController.getEditMode();
  this.InvoiceSubscription = this.invoiceControllerService.getInvoiceId().subscribe(res =>{
    this.invoiceId = res;
  })
  this.ItemSubscription = this.materialController.getInvoiceItem().subscribe(res =>{
    this.edit = this.materialController.getEditMode();
    if(this.edit) {
      this.toEdit(res!)
    }
  })

  this.MaterialSubscription = this.materialController.getMaterial().subscribe(res =>{
    this.currentMaterial = res!
    this.setNewMaterial()
  })
}
  ngOnDestroy(): void {
    this.materialController.setMaterial(this.materialController.getEmptyMaterial());
    this.materialController.setItem(this.materialController.getEmptyItem());
    this.materialController.setEditMode(false)
    this.InvoiceSubscription.unsubscribe();
    this.MaterialSubscription.unsubscribe();
    this.ItemSubscription.unsubscribe();
  }
  get canSubmit(){
    let  flag : boolean = false;
    if(
      this.itemForm.get('material')?.valid &&
      this.itemForm.get('quantity')?.valid &&
      this.itemForm.get('price')?.valid

    ){
      flag = true;
    }
    return flag;
  }


toEdit(item : InvoiceItem){
    this.materialController.setMaterial(item.oMaterial)
    this.itemForm.patchValue({
      id: item.invoiceItemId,
      material : item.oMaterial.materialName,
      idmaterial : item.oMaterial.materialId,
      quantity : item.quantity,
      price : item.price
    })
}



openMaterialList(){
  this.modalService.openModal<MaterialListComponent,Material>(MaterialListComponent);
}

setNewMaterial() {
  this.itemForm.patchValue({idmaterial: this.currentMaterial!.materialId, material: this.currentMaterial!.materialName})
}

sent(){
  this.itemFormToItem();
  console.log(this.currentItem)
  if(this.edit){
    this.itemService.putInvoiceItem(this.currentItem).subscribe({
      next: ()=>{
        this.utils.reaload()
      }
    });
  }else{
    this.itemService.postInvoiceItem(this.currentItem).subscribe({
      next: ()=>{
      this.utils.reaload()
      }
    });
  }
}



itemFormToItem(){
  if(this.itemForm.get("id")?.value == 0){
    this.currentItem.itemId = undefined;
  }else{
    this.currentItem.itemId = this.itemForm.get("id")?.value;
  }
  this.currentItem.InvoiceId = this.invoiceId;
  this.currentItem.MaterialId = this.currentMaterial.materialId;
  this.currentItem.Price = this.itemForm.get("price")?.value;
  this.currentItem.Quantity = this.itemForm.get("quantity")?.value;


}
}
