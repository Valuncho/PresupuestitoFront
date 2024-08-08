import { Component, Input } from '@angular/core';
import { Payment } from '../../../../core/model/Payment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments-table.component.html',
  styleUrl: './payments-table.component.css'
})
export class PaymentsTableComponent {
  @Input() pagos : Payment[] | undefined = [];
  total : number = 0;
  ngOnInit(){
    this.pagos?.forEach(pago => {
      this.total += pago.amount;
    });
  }
}
