import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../../../core/model/Person';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';

@Component({
    selector: 'app-supplier-card',
    standalone: true,
    imports: [CommonModule,ButtonCardComponent],
    templateUrl: './supplierCard.component.html',
    styleUrl: './supplierCard.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierCardComponent { 
    @Input() Person: Person | undefined;
    @Input() IdSupplier: number = 0;
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
        this.action.emit(this.IdSupplier)
    }

    select(){
        this.isSelected.emit(this.IdSupplier);
    }
    view(){
        this.isView.emit(this.IdSupplier);
    }
    edit(){
        this.isEdit.emit(this.IdSupplier);
    }

    deleteC(){
        this.isDeleted.emit(this.IdSupplier);
    }
}
