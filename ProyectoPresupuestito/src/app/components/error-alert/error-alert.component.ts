import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { ErrorStateService } from '../../core/states/error-state.service';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.css'
})
export class ErrorAlertComponent {
  private errorState = inject(ErrorStateService);
  error : HttpErrorResponse | undefined;
  ngOnInit(): void {
    this.errorState.getError().subscribe(res =>
      this.error = res
    ) 
  }
}
