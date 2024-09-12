import { Component, Input } from '@angular/core';
import { Client } from '../../../../core/model/Client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  
  @Input() client! : Client;
}
