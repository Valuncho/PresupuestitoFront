import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  reaload(){
    setTimeout(() => {
      window.location.reload();
    }, 100); // 2000 milisegundos = 2 segundos
  }

}
