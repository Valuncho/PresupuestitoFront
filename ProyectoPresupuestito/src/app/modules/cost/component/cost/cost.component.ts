import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {FixedCost} from "../../../../core/model/FixedCost";


@Component({
    selector: 'app-cost',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cost.component.html',
    styleUrl: './cost.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostComponent {
    @Input() cost! : FixedCost;
}
