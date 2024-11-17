import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { SupplierService } from '../../../../core/services/supplier.service';
import { SupplierCardComponent } from '../supplier-card/supplierCard.component';
import { Supplier } from '../../../../core/model/Supplier';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupplierControllerService } from '../../../../core/controllers/supplier-controller.service';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    SupplierCardComponent,
    TextCardComponent,
    NgxPaginationModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private supplierService = inject(SupplierService);
  private supplierController = inject(SupplierControllerService);
  //Properties
  suppliers: any = [];

  //Pagination
  page = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.supplierController.getReload().subscribe({
      next: (Res) => {
        if (Res) {
          this.getData();
        }
      },
    });

    this.getData();
  }

  getData() {
    this.supplierService.getSuppliers().subscribe((res) => {
      this.suppliers = res;
    });
  }

  //Card
  handleViewSupplier($Event: Supplier) {
    this.router.navigate(['/supplier/detail/', $Event.supplierId]);
  }

  handleEditSupplier($Event: Supplier) {
    this.router.navigate(['/supplier/edit/', $Event.supplierId]);
  }

  handleDeleteSupplier($Event: Supplier) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar al proveedor: ${$Event.personId.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.supplierService.deleteSupplier($Event.supplierId).subscribe({
          next: () => {
            this.supplierController.setReload(true);
          },
        });
      }
    });
  }

  //Pagination
  pageChange(page: number) {
    this.page = page;
  }
}
