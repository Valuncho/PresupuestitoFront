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
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { InvoiceControllerService } from '../../../../core/controllers/invoice-controller.service';



@Component({
    selector: 'app-invoice-list',
    standalone: true,
    imports: [InvoiceSearchComponent,InvoiceCardComponent,NgxPaginationModule,CommonModule,TextCardComponent],
    templateUrl: './invoice-list.component.html',
    styleUrl: './invoice-list.component.css',

    })

    export class InvoiceListComponent {
    //Utils
    private router = inject(Router);
    private dialog = inject(MatDialog);
    private modalService = inject(ModalService);
    private invoiceService = inject(InvoiceService);
    private invoiceController = inject(InvoiceControllerService);
    //Properties
    options : boolean = false;

    @Input() invoices! : Invoice[];
    Invoices : Invoice[] = [
        // {
        //     idInvoice: 1,
        //     date: new Date(0),
        //     payments: [
        //         {
        //         idPayment: 0,
        //         date: new Date(0),
        //         amount: 0,
        //         description: ''
        //         }
        //     ],
        //     isPaid: false,
        //     materials: [
        //         {
        //             idInvoiceItem: 0,
        //             material: {
        //                 idMaterial: 0,
        //                 name: '',
        //                 description: '',
        //                 color: '',
        //                 brand: '',
        //                 measure: '',
        //                 unitOfMeasure: '',
        //                 subCategory: {
        //                     idCategoryMaterial: 0,
        //                     name: '',
        //                     category: {
        //                         idCategory: 0,
        //                         name: ''
        //                     }
        //                 }
        //             },
        //             quantity: 0,
        //             price: 0
        //         }
        //     ]
        // },
        // {
        //     idInvoice: 2,
        //     date: new Date(0),
        //     payments: [
        //         {
        //         idPayment: 0,
        //         date: new Date(0),
        //         amount: 0,
        //         description: ''
        //         }
        //     ],
        //     isPaid: false,
        //     materials: [
        //         {
        //             idInvoiceItem: 0,
        //             material: {
        //                 idMaterial: 0,
        //                 name: '',
        //                 description: '',
        //                 color: '',
        //                 brand: '',
        //                 measure: '',
        //                 unitOfMeasure: '',
        //                 subCategory: {
        //                     idCategoryMaterial: 0,
        //                     name: '',
        //                     category: {
        //                         idCategory: 0,
        //                         name: ''
        //                     }
        //                 }
        //             },
        //             quantity: 0,
        //             price: 0
        //         }
        //     ]
        // // }
    ];
    
    //Pagination
    page = 1
    pageSize = 5


    ngOnInit(): void {
        
        this.invoiceService.getInvoices().subscribe({  
        next: x => this.invoices = x,  
        })

    }

    //Card

    handleViewInvoice($Event : Invoice){    
        this.router.navigate(['/invoice/detail/',$Event.idInvoice]);
    }

    handleEditInvoice($Event : Invoice){
        this.router.navigate(['/invoice/edit/',$Event.idInvoice]);    
    }

    handleDeleteInvoice($Event : Invoice){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
            mensaje: `¿Estás seguro de que deseas eliminar la factura? ${$Event.idInvoice}?`
        }
        });

        dialogRef.afterClosed().subscribe(result => {
        if (result) {
            const Supplier = this.invoiceService.getInvoiceById($Event.idInvoice)!;
            this.invoiceService.deleteInvoice($Event.idInvoice).subscribe(
            {
                next: () => this.router.navigate(['/invoice'])
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
