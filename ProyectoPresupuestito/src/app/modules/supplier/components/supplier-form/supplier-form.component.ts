import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupplierListComponent } from '../supplier-list/supplier-list.component';

@Component({
    selector: 'app-supplier-form',
    standalone: true,
    imports: [
        CommonModule,SupplierFormComponent,SupplierListComponent
    ],
    template: `<p>supplier-form works!</p>`,
    styleUrl: './supplier-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierFormComponent { }
