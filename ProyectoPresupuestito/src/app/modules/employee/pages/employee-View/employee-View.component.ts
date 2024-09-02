import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-employee-view',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>employee-View works!</p>`,
    styleUrl: './employee-View.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeViewComponent { }
