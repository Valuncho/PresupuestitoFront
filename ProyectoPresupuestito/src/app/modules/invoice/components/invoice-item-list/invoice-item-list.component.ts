import { Component, inject } from '@angular/core';
import { TextCardComponent } from "../../../../components/text-card/text-card.component";
import { Invoice } from '../../../../core/model/Invoice';
import { Item } from '../../../../core/model/Item';
import { InvoiceService } from '../../../../core/services/invoice.service';
import { InvoiceControllerService } from '../../../../core/controllers/invoice-controller.service';

@Component({
  selector: 'app-invoice-item-list',
  standalone: true,
  imports: [TextCardComponent],
  templateUrl: './invoice-item-list.component.html',
  styleUrl: './invoice-item-list.component.css'
})
export class InvoiceItemListComponent {
  private invoiceService = inject(InvoiceService);
  private invoiceController = inject(InvoiceControllerService)

  invoice : Invoice = this.invoiceController.getEmptyInvoice();
  options = false;
}
