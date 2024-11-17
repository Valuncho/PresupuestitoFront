import { Component, inject, Input, signal } from '@angular/core';
import { InvoiceListComponent } from '../../components/invoice-list/invoice-list.component';
import { InvoiceComponent } from '../../components/invoice/invoice.component';
import { Invoice } from '../../../../core/model/Invoice';

import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../../../core/services/invoice.service';
import { SupplierDetailsComponent } from '../../../supplier/pages/supplier-Details/supplier-Details.component';
import { SupplierComponent } from '../../../supplier/components/supplier/supplier.component';
import { SupplierHistory } from '../../../../core/model/SupplierHistory';
import { InvoiceItemListComponent } from "../../components/invoice-item-list/invoice-item-list.component";
import {SupplierService} from "../../../../core/services/supplier.service";
import {Supplier} from "../../../../core/model/Supplier";
import {InvoiceControllerService} from "../../../../core/controllers/invoice-controller.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [InvoiceComponent, SupplierComponent, InvoiceItemListComponent],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent {

  private activatedRoute = inject(ActivatedRoute);
  private invoiceService = inject(InvoiceService);
  private supplierService = inject(SupplierService);
  private invoiceController = inject(InvoiceControllerService);
  invoiceId : number  = 0;
  currentInvoice : any = this.invoiceController.getEmptyInvoceModel();
  total : number = 0;

  currentSupplier : Supplier = {
    supplierId: 0,
      personId: {
        personId: 0,
        name: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
        dni: '',
        cuit: '',
      },

  };

    ngOnInit(): void {
        this.invoiceId = Number(this.activatedRoute.snapshot.params['invoicedId']);
        this.invoiceController.getAviso().subscribe({
          next: value =>
          {
            if (value){
              this.getData()
            }

          }
        })
        this.getData()
        this.invoiceController.setInvoiceId(this.invoiceId);



    }

    getData(){
      this.invoiceService.getInvoiceById(this.invoiceId).subscribe(
        {
          next: (invoiceRes)=>{

            this.currentInvoice = invoiceRes.value;
            this.total=this.calculateTotal()

            this.supplierService.getSupplierById(invoiceRes.value.oSupplier.supplierId).subscribe(
              {
                next : (supplierRes) =>{
                  this.currentSupplier = supplierRes.value;
                }
              }
            )
          }
        }
      )
    }

    calculateTotal(): number {
      let total = 0
      this.currentInvoice.oInvoiceItems.forEach((item: { price: number; quantity: number; })=>{
        console.log(total)
          total += item.price * item.quantity
      })
      return total
  }

}

