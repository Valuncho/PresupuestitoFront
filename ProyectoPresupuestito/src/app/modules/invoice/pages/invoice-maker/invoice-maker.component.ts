import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-invoice-maker',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>invoice-maker works!</p>`,
    styleUrl: './invoice-maker.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceMakerComponent { }
