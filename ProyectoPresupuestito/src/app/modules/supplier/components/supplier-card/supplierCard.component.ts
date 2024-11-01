import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../../../core/model/Person';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { Supplier } from '../../../../core/model/Supplier';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-supplier-card',
    standalone: true,
    imports: [CommonModule,ButtonCardComponent,MatTooltipModule],
    templateUrl: './supplierCard.component.html',
    styleUrl: './supplierCard.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierCardComponent { 
    @Input() supplier: Supplier | undefined;
    @Output() isView = new EventEmitter<Supplier>();
    @Output() action = new EventEmitter<Supplier>();
    @Output() isSelected = new EventEmitter<Supplier>();
    @Output() isEdit = new EventEmitter<Supplier>();
    @Output() isDeleted = new EventEmitter<Supplier>();
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
        this.action.emit(this.supplier)
    }

    select(){
        this.isSelected.emit(this.supplier);
    }
    view(){
        this.isView.emit(this.supplier);
    }
    edit(){
        this.isEdit.emit(this.supplier);
    }

    deleteC(){
        this.isDeleted.emit(this.supplier);
    }
}
