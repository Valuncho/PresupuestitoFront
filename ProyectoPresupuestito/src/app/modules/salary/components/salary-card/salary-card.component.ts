import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Salary } from '../../../../core/model/Salary';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';

/**
 * @class salaryCardComponent
 * 
 * Tarjeta de la entidad salario, con información básica, y botones para:
 * -Crear un salario nuevo,
 * -Seleccionarlo o ver más detalles,
 * -Editarlo y
 * -Eliminarlo
 *
 */
@Component({
    selector: 'app-salary-card',
    standalone: true,
    imports: [
        CommonModule,ButtonCardComponent
    ],
    templateUrl: './salary-card.component.html',
    styleUrl: './salary-card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryCardComponent { 

    @Input() Salary: Salary | undefined;

    @Output() isSelected = new EventEmitter<Salary>();
    @Output() isEdit = new EventEmitter<Salary>();
    @Output() isDeleted = new EventEmitter<Salary>();
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
    
    select(){
        this.isSelected.emit(this.Salary);
    }
    edit(){
        this.isEdit.emit(this.Salary);
    }

    deleteC(){
        this.isDeleted.emit(this.Salary);
    }
}
