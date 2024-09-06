import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-employee-details',
    standalone: true,
    imports: [CommonModule,],
    templateUrl: './employee-Details.component.html',
    styleUrl: './employee-Details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent { }
