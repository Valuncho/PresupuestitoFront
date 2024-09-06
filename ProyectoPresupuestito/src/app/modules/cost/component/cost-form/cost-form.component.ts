import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-cost-form',
    standalone: true,
    imports: [CommonModule,],
    templateUrl: './cost-form.component.html',
    styleUrl: './cost-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostFormComponent { }
