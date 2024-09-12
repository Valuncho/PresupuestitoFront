import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../../../core/model/Person';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { Employee } from '../../../../core/model/Employee';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-employee-card',
    standalone: true,
    imports: [CommonModule,ButtonCardComponent],
    templateUrl: './employeeCard.component.html',
    styleUrl: './employeeCard.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCardComponent { 

    @Input() Employee: Employee | undefined;

    @Output() isView = new EventEmitter<Employee>();
    @Output() action = new EventEmitter<Employee>();
    @Output() isSelected = new EventEmitter<Employee>();
    @Output() isEdit = new EventEmitter<Employee>();
    @Output() isDeleted = new EventEmitter<Employee>();
    botones: Array<{ icon: string }> =[];
   
    
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
        this.action.emit(this.Employee)
    }

    select(){
        this.isSelected.emit(this.Employee);
    }
    view(){
        this.isView.emit(this.Employee);
    }
    edit(){
        this.isEdit.emit(this.Employee);
    }

    deleteC(){
        this.isDeleted.emit(this.Employee);
    }
}
