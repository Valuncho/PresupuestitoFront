import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  reaload(){
    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2000 milisegundos = 2 segundos
  }

}
