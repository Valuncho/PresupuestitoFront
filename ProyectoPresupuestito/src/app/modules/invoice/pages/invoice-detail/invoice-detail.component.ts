import { Component, inject, Input, signal } from '@angular/core';
import { InvoiceListComponent } from '../../components/invoice-list/invoice-list.component';
import { InvoiceComponent } from '../../components/invoice/invoice.component';
import { Invoice } from '../../../../core/model/Invoice';
import { InvoiceService } from '../../../../core/services/invoice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [InvoiceListComponent,InvoiceComponent],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private invoiceService = inject(InvoiceService);
    @Input() invoices! : Invoice[];
    id : number  = 0;
    currentInvoice! : Invoice;
    invoice = signal<Invoice | undefined>(undefined);
    
    ngOnInit(): void {
        this.id = parseInt(this.activatedRoute.snapshot.params['invoiceId']);
    }

}
