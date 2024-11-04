import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';
import { Item } from '../../../../core/model/Item';
import { Material } from '../../../../core/model/Material';
import { ItemService } from '../../../../core/services/item.service';
import { ModalService } from '../../../../core/utils/modal.service';
import { MaterialListComponent } from '../../../materials/components/lists/material-list/material-list.component';
import { ItemRequest } from '../../../../core/request/itemRequest';
import { UtilsService } from '../../../../core/utils/utils.service';

@Component({
  selector: 'app-work-item-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './work-item-form.component.html',
  styleUrl: './work-item-form.component.css'
})
export class WorkItemFormComponent {

  //Utils
  private materialController = inject(MaterialControllerService);
  private modalService = inject(ModalService);
  private itemService = inject(ItemService);
  private workController = inject(WorkControllerService);
  private utils = inject(UtilsService);
  //Suscriptions
  private WorkSubscription: Subscription = new Subscription;
  private ItemSubscription: Subscription = new Subscription;
  private MaterialSubscription: Subscription = new Subscription;
  //Properties
  currentItem : ItemRequest = this.materialController.getEmptyItemRequest();
  workId : number = 0;
  currentMaterial : Material = this.materialController.getEmptyMaterial();
  edit : boolean = false;
  itemForm : FormGroup = new FormGroup({
    id : new FormControl(0),
    material : new FormControl(''),
    idmaterial : new FormControl(0),
    quantity : new FormControl(0)
  });


ngOnInit(): void {
  this.edit = this.materialController.getEditMode();
  this.WorkSubscription = this.workController.getWorkModel().subscribe(res =>{
    this.workId = res.workId;
  })
  this.ItemSubscription = this.materialController.getItem().subscribe(res =>{
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
    this.WorkSubscription.unsubscribe();
    this.MaterialSubscription.unsubscribe();
    this.ItemSubscription.unsubscribe();
  }

toEdit(item : Item){
    this.materialController.setMaterial(item.oMaterial)
    this.itemForm.patchValue({
      id: item.itemId,
      material : item.oMaterial.materialName,
      idmaterial : item.oMaterial.materialId,
      quantity : item.quantity
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
  if(this.edit){
    this.itemService.putItem(this.currentItem).subscribe({
      next: ()=>{
        this.utils.reaload()
      }
    });
  }else{
    this.itemService.postItem(this.currentItem).subscribe({
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
  this.currentItem.WorkId = this.workId;
  this.currentItem.MaterialId = this.currentMaterial.materialId;
  this.currentItem.Quantity = this.itemForm.get("quantity")?.value;
}
}
