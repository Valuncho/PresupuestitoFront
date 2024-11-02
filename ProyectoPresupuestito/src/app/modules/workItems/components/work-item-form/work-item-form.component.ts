import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';
import { InvoiceItem } from '../../../../core/model/invoiceItem';
import { Item } from '../../../../core/model/Item';
import { Material } from '../../../../core/model/Material';
import { WorkRequest } from '../../../../core/request/workRequest';
import { ItemService } from '../../../../core/services/item.service';
import { ModalService } from '../../../../core/utils/modal.service';
import { MaterialListComponent } from '../../../materials/components/lists/material-list/material-list.component';

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

  @Output() item = new EventEmitter<Item | InvoiceItem>();

  currentItem : Item  =  this.materialController.getEmptyItem();
  currentInvoiceItem : InvoiceItem  =  this.materialController.getEmptyInvoiceItem();
  currentWork : WorkRequest = this.workController.getEmptyWorkRequest();
  currentMaterial : Material = this.materialController.getEmptyMaterial();

  
  private WorkSubscription: Subscription = new Subscription;
  private ItemSubscription: Subscription = new Subscription;
  private MaterialSubscription: Subscription = new Subscription;


  edit : boolean = false;
  itemForm : FormGroup = new FormGroup({
    id : new FormControl(),
    material : new FormControl(),
    idmaterial : new FormControl(),
    quantity : new FormControl()
  });


ngOnInit(): void {
  this.edit = this.materialController.getEditMode()
   this.WorkSubscription = this.workController.getWork().subscribe(res =>{
      this.currentWork = res;
    })
    
    this.ItemSubscription = this.materialController.getItem().subscribe(res =>{ 
      this.edit = this.materialController.getEditMode()
      this.itemForm.patchValue({id : res?.itemId, material : res?.oMaterial.materialName,idmaterial : res?.oMaterial.materialId, quantity : res?.quantity});
     })

     this.MaterialSubscription = this.materialController.getMaterial().subscribe(res =>{
      this.currentMaterial = res!
      this.setNewMaterial()
      
     })
}

  ngAfterViewInit(): void {

    
   
  }

  ngOnDestroy(): void {

    this.materialController.setMaterial(this.materialController.getEmptyMaterial());
    this.materialController.setItem(this.materialController.getEmptyItem());
    
    this.WorkSubscription.unsubscribe();
    this.MaterialSubscription.unsubscribe();
    this.ItemSubscription.unsubscribe();
  }

  openMaterialList(){
    this.modalService.openModal<MaterialListComponent,Material>(MaterialListComponent);
    
  }


  sent(){
    
    this.itemFormToItem();
    this.materialController.setItem(this.currentItem);
    if(this.edit){
      //this.itemService.putItem(this.currentItem).subscribe();
      this.materialController.setEditMode(false)
    }else{
      //this.itemService.postItem(this.currentItem, this.currentWork.workId!).subscribe();
    }
    
    //this.item.emit(this.currentItem);
  }

  setNewMaterial(){
    this.itemForm.patchValue({idmaterial : this.currentMaterial!.materialId, material : this.currentMaterial!.materialName})
  }

  itemFormToItem(){
    console.log(this.itemForm.value)
    this.currentItem.itemId = this.itemForm.get("id")?.value;
    this.currentItem.oMaterial = this.currentMaterial;  
    this.currentItem.quantity = this.itemForm.get("quantity")?.value
  }
}
