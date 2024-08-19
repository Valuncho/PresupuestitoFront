import { Component, inject } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { ClientFormComponent } from "../../components/client-form/client-form.component";
import { ClientListComponent } from "../../components/client-list/client-list.component";

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [ClientFormComponent, ClientListComponent],
  templateUrl: './client-view.component.html',
  styleUrl: './client-view.component.css'
})

export class ClientViewComponent {
  private clientService = inject(ClientService);



}

