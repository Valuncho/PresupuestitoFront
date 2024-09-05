import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Employee } from '../../../../core/model/Employee';

@Component({
    selector: 'app-employee',
    standalone: true,
    imports: [CommonModule],
    template: './employee.component.html',
    styleUrl: './employee.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
    @Input() employee! : Employee;
}
