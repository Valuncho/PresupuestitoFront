import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CostListComponent } from '../../component/cost-list/cost-list.component';
import { CostFormComponent } from '../../component/cost-form/cost-form.component';

@Component({
    selector: 'app-cost-view',
    standalone: true,
    imports: [CommonModule,CostListComponent,CostFormComponent],
    templateUrl: './cost-view.component.html',
    styleUrl: './cost-view.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostViewComponent {

    

}
