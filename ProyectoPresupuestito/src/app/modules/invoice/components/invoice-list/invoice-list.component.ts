import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-invoice-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>invoice-list works!</p>`,
    styleUrl: './invoice-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListComponent { }
