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
import { ItemService } from '../../../../../core/services/item.service';
import { WorkControllerService } from '../../../../../core/controllers/work-controller.service';
import { Work } from '../../../../../core/model/Work';
import { Subscription } from 'rxjs';


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
  private itemService = inject(ItemService);
  private workController = inject(WorkControllerService);

  @Output() item = new EventEmitter<Item | InvoiceItem>();

  currentItem : Item  =  this.materialController.getEmptyItem();
  currentInvoiceItem : InvoiceItem  =  this.materialController.getEmptyInvoiceItem();
  currentWork : Work = this.workController.getEmptyWork();
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
      this.itemForm.patchValue({id : res?.idItem, material : res?.material.name,idmaterial : res?.material.idMaterial, quantity : res?.quantity});
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
      this.itemService.putItem(this.currentItem).subscribe();
      this.materialController.setEditMode(false)
    }else{
      this.itemService.postItem(this.currentItem, this.currentWork.idWork).subscribe();
    }
    
    //this.item.emit(this.currentItem);
  }

  setNewMaterial(){
    this.itemForm.patchValue({idmaterial : this.currentMaterial!.idMaterial, material : this.currentMaterial!.name})
  }

  itemFormToItem(){
    console.log(this.itemForm.value)
    this.currentItem.idItem = this.itemForm.get("id")?.value;
    this.currentItem.material = this.currentMaterial;  
    this.currentItem.quantity = this.itemForm.get("quantity")?.value
  }
}
