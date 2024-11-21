import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InvoiceItem } from '../../../../core/model/invoiceItem';
import { CommonModule } from '@angular/common';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-invoice-item-card',
  standalone: true,
  imports: [CommonModule, MatTooltip, ButtonCardComponent],
  templateUrl: './invoice-item-card.component.html',
  styleUrls: ['./invoice-item-card.component.css', "../../../../styles/Card.css"]
})
export class InvoiceItemCardComponent {
  @Input() Item?: InvoiceItem;


  @Output() isEdit = new EventEmitter<InvoiceItem>();
  @Output() isDeleted = new EventEmitter<InvoiceItem>();
  botones: Array<{  icon: string }> =[];

  ngOnInit(){
    this.botones = [

      {  icon: 'edit' },
      {  icon: 'delete' },
    ];
  }


  edit(){
    this.isEdit.emit(this.Item);
  }
  deleteC(){
    this.isDeleted.emit(this.Item);
  }
}
