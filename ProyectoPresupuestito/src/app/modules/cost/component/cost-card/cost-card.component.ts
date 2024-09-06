import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-cost-card',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './cost-card.component.html',
    styleUrl: './cost-card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCardComponent { }
