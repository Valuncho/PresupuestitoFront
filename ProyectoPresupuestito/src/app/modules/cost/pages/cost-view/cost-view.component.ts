import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-cost-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cost-view.component.html',
    styleUrl: './cost-view.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostViewComponent { }
