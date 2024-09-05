import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-employee-search',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>employee-search works!</p>`,
    styleUrl: './employee-search.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSearchComponent { }
