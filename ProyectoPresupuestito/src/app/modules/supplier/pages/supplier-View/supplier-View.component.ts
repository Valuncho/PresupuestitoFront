import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-supplier-view',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>supplier-View works!</p>`,
    styleUrl: './supplier-View.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './supplier-View.component.html',
})
export class SupplierViewComponent { }
