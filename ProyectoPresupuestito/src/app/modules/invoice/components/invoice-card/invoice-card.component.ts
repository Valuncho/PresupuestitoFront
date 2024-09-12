import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { Invoice } from '../../../../core/model/Invoice';

@Component({
    selector: 'app-invoice-card',
    standalone: true,
    imports: [CommonModule,ButtonCardComponent],
    templateUrl: './invoice-card.component.html',
    styleUrl: './invoice-card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceCardComponent {

    @Input() Invoice: Invoice | undefined;
    @Input() IdInvoice: number = 0;
    @Output() isView = new EventEmitter<number>();
    @Output() action = new EventEmitter<number>();
    @Output() isSelected = new EventEmitter<number>();
    @Output() isEdit = new EventEmitter<number>();
    @Output() isDeleted = new EventEmitter<number>();
    botones: Array<{ icon: string }> =[];
    //{ url: '/client/editar/'+this.IdClient+'', icon: 'edit' },
    
    ngOnInit(){
        this.botones = [
            {icon: 'visibility'},
            {icon: 'edit'},
            {icon: 'delete'},
            {icon: 'edit_note'},
            {icon: 'Check'}
        ];
    }
    Action(){
        this.action.emit(this.IdInvoice)
    }

    select(){
        this.isSelected.emit(this.IdInvoice);
    }
    view(){
        this.isView.emit(this.IdInvoice);
    }
    edit(){
        this.isEdit.emit(this.IdInvoice);
    }

    deleteC(){
        this.isDeleted.emit(this.IdInvoice);
    }

}
