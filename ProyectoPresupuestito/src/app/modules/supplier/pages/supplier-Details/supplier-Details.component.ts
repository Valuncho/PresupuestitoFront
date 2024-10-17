import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { Supplier } from '../../../../core/model/Supplier';
import { SupplierService } from '../../../../core/services/supplier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { SupplierComponent } from '../../components/supplier/supplier.component';
import { InvoiceListComponent } from '../../../invoice/components/invoice-list/invoice-list.component';
import { SupplierHistory } from '../../../../core/model/SupplierHistory';
import { InvoiceDetailComponent } from '../../../invoice/pages/invoice-detail/invoice-detail.component';
import { Invoice } from '../../../../core/model/Invoice';

@Component({
    selector: 'app-supplier-details',
    standalone: true,
    imports: [CommonModule,NavbarComponent,SupplierComponent,InvoiceListComponent,InvoiceDetailComponent],
    templateUrl: './supplier-Details.component.html',
    styleUrl: './supplier-Details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierDetailsComponent { 
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private supplierService = inject(SupplierService);
    id : number  = 0;
   
    currentSupplier : SupplierHistory = {
        idSupplierHistory: 0,
        oSupplier: {
            idSupplier: 0,
            note: '',
            oPerson:{
                idPerson: 0,
                name: '',
                lastName: '',
                direction: '',
                phoneNumber: '',
                mail: '',
                dni: '',
                cuit: ''
            }
        },
        invoices: []
    }
    @Input() invoice! : Invoice;
    
    /*
    ngOnInit(): void {
        this.id = parseInt(this.activatedRoute.snapshot.params['supplierId']);

        this.supplierService.selectedSupplier.subscribe(supplier =>{
        this.supplier.set(supplier);
        this.currentSupplier = supplier;
        })
        
    }*/
}
