import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cost } from '../../../../core/model/Cost';

@Component({
    selector: 'app-cost',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cost.component.html',
    styleUrl: './cost.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostComponent { 
    @Input() cost! : Cost;
}
