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
import {InvoiceRequest} from "../../../../core/request/invoiceRequest";
import {UtilsService} from "../../../../core/utils/utils.service";



@Component({
    selector: 'app-invoice-list',
    standalone: true,
    imports: [InvoiceCardComponent,NgxPaginationModule,CommonModule,TextCardComponent],
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
    private utils = inject(UtilsService);
    //Properties
    options : boolean = false;

    @Input() invoices! : Invoice[];

    ngOnInit(): void {

        this.invoiceService.getInvoices().subscribe({
        next: x => this.invoices = x,
        })

    }

    //Card

    handleViewInvoice($Event : Invoice){
      this.invoiceController.setInvoiceModel($Event);
        this.router.navigate(['/invoice/detail/',$Event.invoiceId]);
    }

    handleEditInvoice($Event : any){
      this.invoiceController.setEditMode(true);
      this.invoiceController.setInvoice(
        {
          supplierId : $Event.oSupplier.supplierId,
          date : $Event.date,
          isPaid:$Event.isPaid,
          invoiceId : $Event.invoiceId
        }
      );
      this.modalService.openModal<invoiceFormComponent,InvoiceRequest>(invoiceFormComponent);
    }

    handleDeleteInvoice($Event : Invoice){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
            mensaje: `¿Estás seguro de que deseas eliminar la factura?`
        }
        });

        dialogRef.afterClosed().subscribe(result => {
        if (result) {
            const Supplier = this.invoiceService.getInvoiceById($Event.invoiceId)!;
            this.invoiceService.deleteInvoice($Event.invoiceId).subscribe(
            {
                next: () =>       this.utils.reaload()
            }
            );

        }
        });

    }


}
