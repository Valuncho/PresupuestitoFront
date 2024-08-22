import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-supplier-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>supplier-list works!</p>`,
    styleUrl: './supplier-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListComponent { }
