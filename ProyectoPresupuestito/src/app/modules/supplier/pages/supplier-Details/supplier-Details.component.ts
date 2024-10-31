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


@Component({
    selector: 'app-supplier-details',
    standalone: true,
    imports: [CommonModule,NavbarComponent,SupplierComponent,InvoiceListComponent,InvoiceDetailComponent],
    templateUrl: './supplier-Details.component.html',
    styleUrl: './supplier-Details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierDetailsComponent { 
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private supplierService = inject(SupplierService);
    private modalService = inject(ModalService);
    id : number  = 0;

    currentSupplier! : SupplierHistory;
    @Input() invoice! : Invoice;
    
    /*
    ngOnInit(): void {
        this.id = parseInt(this.activatedRoute.snapshot.params['supplierId']);

        this.supplierService.selectedSupplier.subscribe(supplier =>{
        this.supplier.set(supplier);
        this.currentSupplier = supplier;
        })
        
    }*/

    openInvoiceForm(){
        this.modalService.openModal<invoiceFormComponent,Invoice>(invoiceFormComponent);
    }
    openPaymentForm(){
        this.modalService.openModal<PaymentsFormComponent,Payment>(PaymentsFormComponent);
    }
}
