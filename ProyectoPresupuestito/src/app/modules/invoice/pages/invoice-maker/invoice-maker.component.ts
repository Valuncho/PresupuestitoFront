import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InvoiceListComponent } from '../../components/invoice-list/invoice-list.component';
import { InvoiceComponent } from '../../components/invoice/invoice.component';

@Component({
    selector: 'app-invoice-maker',
    standalone: true,
    imports: [
        CommonModule,InvoiceListComponent,InvoiceComponent
    ],
    templateUrl: './invoice-maker.component.html',
    styleUrl: './invoice-maker.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceMakerComponent { }
