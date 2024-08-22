import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-supplier-details',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>supplier-Details works!</p>`,
    styleUrl: './supplier-Details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierDetailsComponent { }
