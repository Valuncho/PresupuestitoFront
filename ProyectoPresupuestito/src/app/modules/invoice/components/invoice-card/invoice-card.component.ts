import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { Invoice } from '../../../../core/model/Invoice';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'app-invoice-card',
    standalone: true,
    imports: [CommonModule,ButtonCardComponent,MatTooltip],
    templateUrl: './invoice-card.component.html',
  styleUrls: ['./invoice-card.component.css', "../../../../styles/Card.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceCardComponent {

    @Input() Invoice: Invoice | undefined;
    @Output() isView = new EventEmitter<Invoice>();
    @Output() action = new EventEmitter<Invoice>();
    @Output() isSelected = new EventEmitter<Invoice>();
    @Output() isEdit = new EventEmitter<Invoice>();
    @Output() isDeleted = new EventEmitter<Invoice>();
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

    constructor() {
    }

    Action(){
        this.action.emit(this.Invoice)
    }

    select(){
        this.isSelected.emit(this.Invoice);
    }
    view(){
        this.isView.emit(this.Invoice);
    }
    edit(){
        this.isEdit.emit(this.Invoice);
    }

    deleteC(){
        this.isDeleted.emit(this.Invoice);
    }

}
