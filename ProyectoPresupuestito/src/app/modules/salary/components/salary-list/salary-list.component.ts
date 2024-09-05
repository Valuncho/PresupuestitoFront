import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-salary-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>salary-list works!</p>`,
    styleUrl: './salary-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryListComponent { }
