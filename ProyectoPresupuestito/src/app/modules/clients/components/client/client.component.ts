import { Component, Input } from '@angular/core';
import { Client } from '../../../../core/model/Client';
import { CommonModule } from '@angular/common';
/**
 * @class ClientComponent
 * 
 * Componente para renderizar la información de un cliente.
 * 
 */
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  /**
   * @property Cliente a renderizar su información
  */
  @Input() client! : Client;
}
