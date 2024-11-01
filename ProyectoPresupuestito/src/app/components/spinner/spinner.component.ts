import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [BrowserModule,MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  isLoading = true;

  constructor() {
    // Simula una operación en progreso
    setTimeout(() => {
      this.isLoading = false;
    }, 3000); // Ocultar el spinner después de 3 segundos
  }
}
