import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ListComponent } from "../../../components/list/list.component";
import { AboutComponent } from "../../../pages/about/about.component";
import { CardComponent } from "../../../components/card/card.component";
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/model/Client';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [NavbarComponent, ListComponent, AboutComponent, CardComponent,CommonModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  clients = signal<Client[]>([]);
  private clientService = inject(ClientService);
  constructor() {
    this.clients.set(this.clientService.getClients());
  }
  
 
}
