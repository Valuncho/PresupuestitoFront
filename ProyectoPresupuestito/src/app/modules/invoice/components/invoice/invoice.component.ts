import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-invoice',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './invoice.component.html',
    styleUrl: './invoice.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceComponent { }
