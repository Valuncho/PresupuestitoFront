import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Supplier } from '../../../../core/model/Supplier';
import { SupplierService } from '../../../../core/services/supplier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { SupplierComponent } from '../../components/supplier/supplier.component';

@Component({
    selector: 'app-supplier-details',
    standalone: true,
    imports: [CommonModule,NavbarComponent,SupplierComponent],
    templateUrl: './supplier-Details.component.html',
    styleUrl: './supplier-Details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierDetailsComponent { 
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private supplierService = inject(SupplierService);
    id : number  = 0;
    currentSupplier! : Supplier;
    supplier = signal<Supplier | undefined>(undefined);
    
    
    /*
    ngOnInit(): void {
        this.id = parseInt(this.activatedRoute.snapshot.params['supplierId']);

        this.supplierService.selectedSupplier.subscribe(supplier =>{
        this.supplier.set(supplier);
        this.currentSupplier = supplier;
        })
        
    }*/
}
