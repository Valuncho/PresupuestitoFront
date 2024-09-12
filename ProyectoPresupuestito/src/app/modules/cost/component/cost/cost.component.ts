import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-cost',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cost.component.html',
    styleUrl: './cost.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostComponent { }
