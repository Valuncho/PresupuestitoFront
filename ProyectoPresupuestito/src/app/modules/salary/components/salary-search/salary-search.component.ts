import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-salary-search',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './salary-search.component.html',
    styleUrl: './salary-search.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalarySearchComponent { }
