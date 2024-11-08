import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [NgIf],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css'
})
export class ScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isVisible = scrollY > 200; // Mostrar el botón solo si se ha hecho scroll 200px hacia abajo
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Scroll suave hacia arriba
    });
  }
}
