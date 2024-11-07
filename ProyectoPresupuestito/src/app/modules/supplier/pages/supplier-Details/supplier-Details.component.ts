import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { SupplierService } from '../../../../core/services/supplier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { SupplierComponent } from '../../components/supplier/supplier.component';
import { InvoiceListComponent } from '../../../invoice/components/invoice-list/invoice-list.component';
import { SupplierHistory } from '../../../../core/model/SupplierHistory';
import { InvoiceDetailComponent } from '../../../invoice/pages/invoice-detail/invoice-detail.component';
import { Invoice } from '../../../../core/model/Invoice';
import { ModalService } from '../../../../core/utils/modal.service';
import { PaymentsFormComponent } from '../../../payments/components/payments-form/payments-form.component';
import { Payment } from '../../../../core/model/Payment';
import { invoiceFormComponent } from '../../../invoice/components/invoice-form/invoice-form.component';
import { InvoceItemRequest } from '../../../../core/request/invoceItemRequest';
import {InvoiceService} from "../../../../core/services/invoice.service";


@Component({
    selector: 'app-supplier-details',
    standalone: true,
    imports: [CommonModule,NavbarComponent,SupplierComponent,InvoiceListComponent],
    templateUrl: './supplier-Details.component.html',
    styleUrl: './supplier-Details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierDetailsComponent {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private supplierService = inject(SupplierService);
    private invoiceService = inject(InvoiceService);
    private modalService = inject(ModalService);
    id : number  = 0;

    currentSupplier : SupplierHistory = {
        supplierHistoryId: 0,
    oSupplier : {
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
    },
    invoices : []
    };

    invoices : Invoice[] | undefined = []

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params['supplierId']);

    this.invoiceService.getInvoicesBySupplierId(this.id).subscribe({
      next : (invocesRes) => {
        this.currentSupplier.invoices = invocesRes;
        this.supplierService.getSupplierById(invocesRes[0].supplierId.supplierId).subscribe({
          next : (supplierRes) =>{
            this.currentSupplier.oSupplier = supplierRes.value;
          }
        })
      }
    })
    }


    openInvoiceForm(){
        this.modalService.openModal<invoiceFormComponent,Invoice>(invoiceFormComponent);
    }
    openPaymentForm(){
        this.modalService.openModal<PaymentsFormComponent,Payment>(PaymentsFormComponent);
    }
}
