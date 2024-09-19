import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-salary-form',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './salary-form.component.html',
    styleUrl: './salary-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryFormComponent { }
