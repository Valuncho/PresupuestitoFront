import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>employee-list works!</p>`,
    styleUrl: './employee-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent { }
