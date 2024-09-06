import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-invoice-details-view',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>invoice-details-view works!</p>`,
    styleUrl: './invoice-details-view.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDetailsViewComponent { }
