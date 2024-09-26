import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupplierListComponent } from '../../components/supplier-list/supplier-list.component';
import { SupplierFormComponent } from '../../components/supplier-form/supplier-form.component';

@Component({
    selector: 'app-supplier-view',
    standalone: true,
    imports: [
        CommonModule,SupplierListComponent,SupplierFormComponent
    ],
    templateUrl: './supplier-View.component.html',
    styleUrl: './supplier-View.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierViewComponent { 
}
