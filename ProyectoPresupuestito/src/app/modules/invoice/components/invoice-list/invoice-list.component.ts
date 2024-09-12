import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InvoiceCardComponent } from '../invoice-card/invoice-card.component';
import { Invoice } from '../../../../core/model/Invoice';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { ModalService } from '../../../../core/services/utils/modal.service';
import { NotificationService } from '../../../../core/services/utils/notification.service';

@Component({
    selector: 'app-invoice-list',
    standalone: true,
    imports: [
        CommonModule,InvoiceCardComponent,NgxPaginationModule
    ],
    templateUrl: './invoice-list.component.html',
    styleUrl: './invoice-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListComponent { 

        //Utils
        private router = inject(Router);
        private dialog = inject(MatDialog);
        private notificationService = inject(NotificationService);
        private modalService = inject(ModalService);
        private invoiceService = inject(invoiceService);
         //Properties
        invoices : Invoice[] = [];
        searchedInvoices : Invoice[] = [];
        invoice? : Invoice;
         //BudgetForm
        options = false;
         //Pagination
        page = 1
        pageSize = 5

        ngOnInit(): void {

        this.invoiceService.getAllInvoices().subscribe({
        next : (invoices)=>{
            this.invoices = invoices;
            this.searchedInvoices = invoices;
            }
        });
        }
         //Search
        handleSearch($Event : Invoice[]){
            this.page = 1
            this.invoiceService.getInvoicesBySearch("filto").subscribe({
            next : (invoices) =>{
                this.searchedInvoices = invoices;
            }
            })
        }

         //Card
        handleAction($Event : any){
            this.invoiceService.setSelectedinvoice($Event)
        }
    
        handleViewInvoice($Event : any){
            this.invoiceService.setSelectedInvoice($Event)
            this.router.navigate(['/invoice/detail/',$Event]);
        }

        handleEditInvoice($Event : any){
            this.invoiceService.setSelectedInvoice($Event)
            this.router.navigate(['/invoice/edit/',$Event]);
        }
    
        handleDeleteInvoice($Event : any){
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                mensaje: `¿Estás seguro de que deseas eliminar la boleta con ID ${$Event}?`
            }
            });

            dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const invoice = this.invoiceService.getInvoiceById($Event)!;
                
                this.invoiceService.handleDeleteInvoice($Event)
                this.notificationService.showNotification("boleta eliminada con éxito");
                this.router.navigate(['/invoice']);
            }
            });
    
        }
    
         //Pagination
        pageChange(page: number) {
            this.page = page;
        }
}
