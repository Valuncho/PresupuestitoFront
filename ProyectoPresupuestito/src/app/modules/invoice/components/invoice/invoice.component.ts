import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Invoice } from '../../../../core/model/Invoice';
import { forEach } from 'lodash';

@Component({
    selector: 'app-invoice',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css', "../../../../styles/Detail.css"]
})
export class InvoiceComponent {
    @Input() invoice! : Invoice;
      //Debe ser implementado en el backend
    @Input() total : number = 0;



}
