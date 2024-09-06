import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-invoice-search',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>invoice-search works!</p>`,
    styleUrl: './invoice-search.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceSearchComponent { }
