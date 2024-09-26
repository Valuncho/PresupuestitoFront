import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { Supplier } from '../../../../core/model/Supplier';

@Component({
    selector: 'app-supplier',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './supplier.component.html',
    styleUrl: './supplier.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierComponent {
    @Input() supplier! : Supplier;
}
