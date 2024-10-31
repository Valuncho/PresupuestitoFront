import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  ///https://www.youtube.com/watch?v=Cn6MA87J6aQ
  //Ver video para evitar hacer un reload de la pagina, y hacer en cambio una creacion y destruccion del componente a actualizar.
  reaload(){
    setTimeout(() => {
      window.location.reload();
    }, 100); // 2000 milisegundos = 2 segundos
  }

}
