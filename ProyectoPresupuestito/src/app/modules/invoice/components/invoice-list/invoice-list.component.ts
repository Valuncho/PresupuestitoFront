import { Component, inject, Input, signal, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { InvoiceCardComponent } from '../invoice-card/invoice-card.component';
import { InvoiceService } from '../../../../core/services/invoice.service';
import { Invoice } from '../../../../core/model/Invoice';
import { invoiceFormComponent } from '../invoice-form/invoice-form.component';
import { ModalService } from '../../../../core/utils/modal.service';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { InvoiceControllerService } from '../../../../core/controllers/invoice-controller.service';
import { InvoiceRequest } from '../../../../core/request/invoiceRequest';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [
    InvoiceCardComponent,
    NgxPaginationModule,
    CommonModule,
    TextCardComponent,
  ],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css', "../../../../styles/List.css"]
})
export class InvoiceListComponent {
  //Utils
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private invoiceService = inject(InvoiceService);
  private invoiceController = inject(InvoiceControllerService);
  private activatedRoute = inject(ActivatedRoute);
  //Properties
  options: boolean = false;

  @Input() invoices!: Invoice[];

  ngOnInit(): void {
    this.invoiceController.getAviso().subscribe({
      next: (value) => {
        if (value) {
          this.getData();
        }
      },
    });
    this.getData();
  }

  getData() {
    let id = Number(this.activatedRoute.snapshot.params['supplierId']);
    this.invoiceService.getInvoicesBySupplierId(id).subscribe({
      next: (x) => (this.invoices = x),
    });
  }
  //Card

  handleViewInvoice($Event: Invoice) {
    this.invoiceController.setInvoiceModel($Event);
    this.router.navigate(['/invoice/detail/', $Event.invoiceId]);
  }

  handleEditInvoice($Event: any) {
    this.invoiceController.setEditMode(true);
    this.invoiceController.setInvoice({
      supplierId: $Event.oSupplier.supplierId,
      date: $Event.date,
      isPaid: $Event.isPaid,
      invoiceId: $Event.invoiceId,
    });
    this.modalService.openModal<invoiceFormComponent, InvoiceRequest>(
      invoiceFormComponent
    );
  }

  handleDeleteInvoice($Event: Invoice) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar la factura?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const Supplier = this.invoiceService.getInvoiceById($Event.invoiceId)!;
        this.invoiceService.deleteInvoice($Event.invoiceId).subscribe({
          next: () => this.invoiceController.setAviso(true),
        });
      }
    });
  }
}
