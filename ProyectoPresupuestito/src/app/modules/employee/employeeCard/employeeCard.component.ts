import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../../core/model/Person';
import { ButtonCardComponent } from '../../../components/button-card/button-card.component';

@Component({
    selector: 'app-employee-card',
    standalone: true,
    imports: [CommonModule,ButtonCardComponent],
    templateUrl: './employeeCard.component.html',
    styleUrl: './employeeCard.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCardComponent { 

    @Input() Person: Person | undefined;
    @Input() IdEmployee: number = 0;
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
        this.action.emit(this.IdEmployee)
    }

    select(){
        this.isSelected.emit(this.IdEmployee);
    }
    view(){
        this.isView.emit(this.IdEmployee);
    }
    edit(){
        this.isEdit.emit(this.IdEmployee);
    }

    deleteC(){
        this.isDeleted.emit(this.IdEmployee);
    }
}
