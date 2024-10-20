import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { SupplierService } from '../../../../core/services/supplier.service';
import { SupplierCardComponent } from '../supplier-card/supplierCard.component';
import { SupplierSearchComponent } from '../supplier-search/supplier-search.component';
import { Supplier } from '../../../../core/model/Supplier';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-supplier-list',
    standalone: true,
    imports: [SupplierSearchComponent,SupplierCardComponent,TextCardComponent,NgxPaginationModule],
    templateUrl: './supplier-list.component.html',
    styleUrl: './supplier-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListComponent { 
    private router = inject(Router);
    private dialog = inject(MatDialog);
    private supplierService = inject(SupplierService);
    //Properties
    suppliers : Supplier[] = [];
    
    //Pagination
    page = 1
    pageSize = 5

    ngOnInit(): void {
        this.supplierService.getSuppliers().subscribe(res=>
            this.suppliers=res
        )
    }

    //Card
    handleViewSupplier($Event : Supplier){    
        this.router.navigate(['/supplier/detail/',$Event.idSupplier]);
    }

    handleEditSupplier($Event : Supplier){
        this.router.navigate(['/supplier/edit/',$Event.idSupplier]);    
    }

    handleDeleteSupplier($Event : Supplier){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
            mensaje: `¿Estás seguro de que deseas eliminar al proveedor ${$Event.oPerson.name}?`
        }
        });

        dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.supplierService.deleteSupplier($Event.idSupplier).subscribe(
            {
                next: () => this.router.navigate(['/supplier'])
            }
            );
            
        }
        });

    } 

    //Pagination
    pageChange(page: number) {
        this.page = page;
    }
}
