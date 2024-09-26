import { Component, inject, Input, signal, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { InvoiceSearchComponent } from '../invoice-search/invoice-search.component';
import { InvoiceCardComponent } from '../invoice-card/invoice-card.component';

import { InvoiceService } from '../../../../core/services/invoice.service';
import { Invoice } from '../../../../core/model/Invoice';
import { invoiceFormComponent } from '../invoice-form/invoice-form.component';
import { ModalService } from '../../../../core/utils/modal.service';



@Component({
    selector: 'app-invoice-list',
    standalone: true,
    imports: [InvoiceSearchComponent,InvoiceCardComponent,NgxPaginationModule,CommonModule],
    templateUrl: './invoice-list.component.html',
    styleUrl: './invoice-list.component.css',

    })

    export class InvoiceListComponent {
    //Utils
    private router = inject(Router);
    private dialog = inject(MatDialog);
    private modalService = inject(ModalService);
    private invoiceService = inject(InvoiceService);
    //Properties
    options : boolean = false;
    //Invoices : Invoice[] = [];

    @Input() invoices! : Invoice[];
    searchedInvoices : Invoice[] = [];
    
    //Pagination
    page = 1
    pageSize = 5


    ngOnInit(): void {
        
        this.invoiceService.getInvoices().subscribe({  
        //next: x => this.invoices = x,  
        })

    }

    //BudgetForm
    addInvoiceHandler(){
        this.modalService.openModal<invoiceFormComponent,Invoice>(invoiceFormComponent);
    }

    //Search
    handleSearch($Event : Invoice[]){
        this.page = 1
        /*
        this.invoiceService.getInvoicesBySearch("filto").subscribe({
        next : (Invoices) =>{
            this.searchedInvoices = Invoices;
        }
        })*/
    }

    //Card

    handleViewInvoice($Event : Invoice){    
        this.router.navigate(['/Invoice/detail/',$Event.idInvoice]);
    }

    handleEditInvoice($Event : Invoice){
        this.router.navigate(['/Invoice/edit/',$Event.idInvoice]);
    }

    handleDeleteInvoice($Event : Invoice){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
            mensaje: `¿Estás seguro de que deseas eliminar al Invoice ${$Event.idInvoice}?`
        }
        });

        /*
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const invoice = this.invoiceService.getInvoiceById($Event.idInvoice)!;
                this.invoiceService.deleteInvoice($Event.idInvoice).subscribe(
                    {
                    next: () => this.router.navigate(['/invoice'])
                    }
                );
                
                }
            });
        */
    } 

    //Pagination
    /*pageChange(page: number) {
        this.page = page;
    }*/

}
