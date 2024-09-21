import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { ErrorStateService } from '../../core/services/utils/error-state.service';


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
  show : boolean = false;

  ngOnInit(): void {
    this.errorState.getError().subscribe(res =>
      this.error = res
    ) 
  }

  showDetails(){
    if(this.show){
      this.show = false;
    }else{
      this.show = true;
    }
  }
}
