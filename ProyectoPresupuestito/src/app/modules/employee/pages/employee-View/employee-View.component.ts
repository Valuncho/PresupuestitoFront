import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';

@Component({
    selector: 'app-employee-view',
    standalone: true,
    imports: [
        CommonModule,EmployeeFormComponent,EmployeeListComponent
    ],
    templateUrl: './employee-View.component.html',
    styleUrl: './employee-View.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeViewComponent { }
