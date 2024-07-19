import { Component, Input, inject, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { Client } from '../../../core/model/Client';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../core/services/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {
  @Input() id : number  = 0;
  client = signal<Client | undefined>(undefined);
  private clientService = inject(ClientService);
  
  constructor(private activatedRoute: ActivatedRoute){
    
  
  }
  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['clientid']);
    
    this.client.set(this.clientService.getClientById(this.id));
    console.log(this.client());
  }
}
