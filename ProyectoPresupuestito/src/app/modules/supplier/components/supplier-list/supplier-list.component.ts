import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { SupplierService } from '../../../../core/services/supplier.service';

import { SupplierCardComponent } from '../supplier-card/supplierCard.component';
import { SupplierSearchComponent } from '../supplier-search/supplier-search.component';
import { Supplier } from '../../../../core/model/Supplier';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import { ModalService } from '../../../../core/utils/modal.service';
import { NotificationService } from '../../../../core/utils/notification.service';
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
    private notificationService = inject(NotificationService);
    private modalService = inject(ModalService);
    private supplierService = inject(SupplierService);
    //Properties
    suppliers : Supplier[] = [
        {
            idSupplier: 1002,
            oPerson: {
                idPerson: 1,
                name: 'John',
                lastName: 'doja',
                direction: '123 Main St',
                phoneNumber: '1234567890',
                mail: 'johndoe@example.com',
                dni: '123456789',
                cuit: '30-12345678-9',
            },
            note: 'nota vacia'
        },
        {
            idSupplier: 1003,
            oPerson: {
                idPerson: 1,
                name: 'arthas',
                lastName: 'menthil',
                direction: '123 Main St',
                phoneNumber: '1234567890',
                mail: 'johndoe@example.com',
                dni: '123456789',
                cuit: '30-12345678-9',
            },
            note: 'nota vacia'
        },
        {
            idSupplier: 1004,
            oPerson: {
                idPerson: 1,
                name: 'Te',
                lastName: 'Te',
                direction: '123 Main St',
                phoneNumber: '1234567890',
                mail: 'johndoe@example.com',
                dni: '123456789',
                cuit: '30-12345678-9',
            },
            note: 'nota vacia'
        }
    ];
    supplier? : Supplier;
    //BudgetForm
    options = false;
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
            const Supplier = this.supplierService.getSupplierById($Event.idSupplier)!;
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
