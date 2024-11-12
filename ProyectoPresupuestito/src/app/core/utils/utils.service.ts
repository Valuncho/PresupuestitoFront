import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private router = inject(Router);
  private location = inject(Location);
  // private cd = inject(ChangeDetectorRef);
  ///https://www.youtube.com/watch?v=Cn6MA87J6aQ
  //Ver video para evitar hacer un reload de la pagina, y hacer en cambio una creacion y destruccion del componente a actualizar.
  reaload(){
    this.router.navigate([]);
    setTimeout(() => {
      window.location.reload();
    }, 100); // 2000 milisegundos = 2 segundos
  }

}
