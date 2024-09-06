import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-cost-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>cost-list works!</p>`,
    styleUrl: './cost-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostListComponent { }
