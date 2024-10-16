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

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [InvoiceComponent, SupplierDetailsComponent, SupplierComponent, InvoiceItemListComponent],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private invoiceService = inject(InvoiceService);
    @Input() invoices! : Invoice[];
    id : number  = 0;
    currentInvoice : Invoice = {
      idInvoice: 0,
      date: new Date(0),
      oPayment: [],
      isPaid: false,
      oItems: []
    }
    invoice = signal<Invoice | undefined>(undefined);
    
    currentSupplier : SupplierHistory = {
      idSupplierHistory: 1,
      oSupplier: {
          idSupplier: 1001,
          oPerson: {
              idPerson: 1,
              name: 'John',
              lastName: 'Doe',
              direction: '123 Main St',
              phoneNumber: '1234567890',
              mail: 'johndoe@example.com',
              dni: '123456789',
              cuit: '30-12345678-9',
          },
          note: 'nota vacia'
      },
      invoices: []
    }

    ngOnInit(): void {
        this.id = parseInt(this.activatedRoute.snapshot.params['invoiceId']);
    }

}
