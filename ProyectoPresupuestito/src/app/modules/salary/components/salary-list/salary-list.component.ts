import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-salary-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './salary-list.component.html',
    styleUrl: './salary-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryListComponent { }
