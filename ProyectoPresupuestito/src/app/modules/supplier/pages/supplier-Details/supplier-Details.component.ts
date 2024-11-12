import {
  Component,
  inject,
} from '@angular/core';
import { SupplierService } from '../../../../core/services/supplier.service';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { SupplierComponent } from '../../components/supplier/supplier.component';
import { InvoiceListComponent } from '../../../invoice/components/invoice-list/invoice-list.component';
import { ModalService } from '../../../../core/utils/modal.service';
import { invoiceFormComponent } from '../../../invoice/components/invoice-form/invoice-form.component';
import { Invoice } from '../../../../core/model/Invoice';
import { InvoiceService } from '../../../../core/services/invoice.service';
import { InvoiceControllerService } from '../../../../core/controllers/invoice-controller.service';

@Component({
  selector: 'app-supplier-details',
  standalone: true,
  imports: [ SupplierComponent, InvoiceListComponent],
  templateUrl: './supplier-Details.component.html',
  styleUrl: './supplier-Details.component.css',
})
export class SupplierDetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private supplierService = inject(SupplierService);
  private invoiceService = inject(InvoiceService);
  private invoiceController = inject(InvoiceControllerService);
  private modalService = inject(ModalService);
  id: number = 0;

  currentSupplier: any = {
    supplierHistoryId: 0,
    oSupplier: {
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
    invoices: [],
  };

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params['supplierId']);

    this.supplierService.getSupplierById(this.id).subscribe({
      next: (supplierRes) => {

        this.currentSupplier!.oSupplier = supplierRes.value;
      },
    });
   
  }

  openInvoiceForm() {
    this.invoiceController.setInvoice({
      invoiceId: 0,
      supplierId: this.id,
      date: new Date(),
      isPaid: false,
    });
    this.modalService.openModal<invoiceFormComponent, Invoice>(
      invoiceFormComponent
    );
  }
  openPaymentForm() {
    //this.modalService.openModal<PaymentsFormComponent,Payment>(PaymentsFormComponent);
  }
}
