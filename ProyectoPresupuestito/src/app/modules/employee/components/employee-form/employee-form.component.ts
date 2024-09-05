import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-employee-form',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>employee-form works!</p>`,
    styleUrl: './employee-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent { }
