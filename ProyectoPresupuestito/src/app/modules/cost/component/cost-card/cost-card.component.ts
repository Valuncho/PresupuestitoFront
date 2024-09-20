import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Cost } from '../../../../core/model/Cost';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';

@Component({
    selector: 'app-cost-card',
    standalone: true,
    imports: [CommonModule,ButtonCardComponent],
    templateUrl: './cost-card.component.html',
    styleUrl: './cost-card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCardComponent { 
    @Input() fixedCost: Cost | undefined;
    @Output() isView = new EventEmitter<Cost>();
    @Output() action = new EventEmitter<Cost>();
    @Output() isSelected = new EventEmitter<Cost>();
    @Output() isEdit = new EventEmitter<Cost>();
    @Output() isDeleted = new EventEmitter<Cost>();
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
    view(){
        this.isView.emit(this.fixedCost);
    }
    edit(){
        this.isEdit.emit(this.fixedCost);
    }

    deleteC(){
        this.isDeleted.emit(this.fixedCost);
    }
}
