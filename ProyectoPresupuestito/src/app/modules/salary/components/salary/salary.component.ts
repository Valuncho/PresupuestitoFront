import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-salary',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './salary.component.html',
    styleUrl: './salary.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryComponent { }
