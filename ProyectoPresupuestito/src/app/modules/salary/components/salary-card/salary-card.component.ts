import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-salary-card',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>salary-card works!</p>`,
    styleUrl: './salary-card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryCardComponent { }
