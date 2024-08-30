import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { SupplierService } from '../../../../core/services/supplier.service';
import { ModalService } from '../../../../core/services/utils/modal.service';
import { NotificationService } from '../../../../core/services/utils/notification.service';
import { SupplierCardComponent } from '../../supplierCard/supplierCard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SupplierSearchComponent } from '../supplier-search/supplier-search.component';
import { Supplier } from '../../../../core/model/Supplier';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';

@Component({
    selector: 'app-supplier-list',
    standalone: true,
    imports: [SupplierSearchComponent,SupplierCardComponent,NgxPaginationModule],
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
    suppliers = signal<Supplier[]>([]);
    searchedSuppliers : Supplier[] = [];
    supplier? : Supplier;
    //BudgetForm
    options = false;
    //Pagination
    page = 1
    pageSize = 5


    ngOnInit(): void {
        this.supplierService.supplierss.subscribe({
        next : (suppliers)=>{
            this.suppliers.set(suppliers);
        }
        })

        this.supplierService.selectedSupplier.subscribe(supplier =>{
        this.supplier = supplier;
        })
    }

    //BudgetForm
    addClientHandler(){
        this.modalService.openModal<SupplierFormComponent,Supplier>(SupplierFormComponent);
    }
    
    getAllSuppliers() : Supplier[]{
        let allSuppliers : Supplier[] = [];
        this.supplierService.supplierss.subscribe(supplier=>{
        allSuppliers = supplier;
        }) 

        return allSuppliers
    }

    
    //Search
    handleSearch($Event : Supplier[]){
        this.page = 1
        this.suppliers.set($Event);
    }

    //Card
    handleAction($Event : any){
        this.supplierService.setSelectedSupplier($Event)
        //this.router.navigate(['/budget/new/',$Event]);
    }

    handleViewSupplier($Event : any){
        this.supplierService.setSelectedSupplier($Event)
        this.router.navigate(['/supplier/detail']);
    }
    
    handleEditSupplier($Event : any){
        this.supplierService.setSelectedSupplier($Event)
        this.router.navigate(['/supplier/edit/',$Event]);
    }

    handleDeleteSupplier($Event : any){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
            mensaje: `¿Estás seguro de que deseas eliminar al proveedor con ID ${$Event}?`
        }
        });

        dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.supplierService.handleDeleteSupplier($Event)
            this.notificationService.showNotification("proveedor eliminado con éxito");
            this.router.navigate(['/supplier']); 
        }
        });
        
    }

    //Pagination
    pageChange(page: number) {
        this.page = page;
    }
}
