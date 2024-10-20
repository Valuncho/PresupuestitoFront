import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { FixedCost } from '../../../../core/model/FixedCost';

@Component({
    selector: 'app-cost-card',
    standalone: true,
    imports: [CommonModule,ButtonCardComponent],
    templateUrl: './cost-card.component.html',
    styleUrl: './cost-card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCardComponent { 
    @Input() fixedCost: FixedCost | undefined;
    @Output() isSelected = new EventEmitter<FixedCost>();
    @Output() isEdit = new EventEmitter<FixedCost>();
    @Output() isDeleted = new EventEmitter<FixedCost>();
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

    select(){
        this.isSelected.emit(this.fixedCost);
    }
    edit(){
        this.isEdit.emit(this.fixedCost);
    }

    deleteC(){
        this.isDeleted.emit(this.fixedCost);
    }
}
