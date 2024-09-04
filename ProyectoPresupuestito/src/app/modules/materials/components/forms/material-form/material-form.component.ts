import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Person } from '../../../../../core/model/Person';
import { SupplierListComponent } from '../../../../supplier/components/supplier-list/supplier-list.component';
import { Supplier } from '../../../../../core/model/Supplier';
import { ModalService } from '../../../../../core/services/utils/modal.service';


@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css'
})
export class MaterialFormComponent {
  //Utils
  private modalService = inject(ModalService);
  //Properties
  isEdit : boolean = false;
  currentSupplier! : Person; 
  MaterialForm : FormGroup = new FormGroup({

  })

  openSupplierForm(){
    this.modalService.openModal<SupplierListComponent,Supplier>(SupplierListComponent);
  }
  resetForm($Event : Event){

  }
  onSubmit(){

  }
}
