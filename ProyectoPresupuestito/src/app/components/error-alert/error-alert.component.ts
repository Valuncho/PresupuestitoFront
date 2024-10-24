import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ErrorControllerService } from '../../core/utils/error-controller.service';
import { Client } from '../../core/model/Client';


@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.css'
})
export class ErrorAlertComponent {
  private errorController = inject(ErrorControllerService);
  error : HttpErrorResponse | undefined ;
  show : boolean = false;

  ngOnInit(): void {
    this.errorController.getError().subscribe(res =>
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
