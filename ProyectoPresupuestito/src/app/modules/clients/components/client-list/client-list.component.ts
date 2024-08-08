import { Component, inject, signal, SimpleChange } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/model/Client';
import { CardComponent } from '../../../../components/card/card.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  private clientService = inject(ClientService);
  
  clients = signal<Client[]>([]);

  constructor(private dialog: MatDialog,private router: Router){
    this.handleGetClients();
    this.clientService.resetSelectedClient();
  }

  ngOnChanges(Change : SimpleChange){
  
  }

  handleGetClients(){
    this.clientService.getClients().subscribe({
      next : (clientes)=>{
      
        this.clients.set(clientes);
      }
    }
    )
  }

  handleSelectClient($Event : any){
    
    this.clientService.setSelectedClient($Event)
    this.router.navigate(['/client/detail/',$Event]);
  }

  handleEditClient($Event : any){
    
    this.clientService.setAction('edit');
    this.clientService.setSelectedClient($Event)
  }

  handleDeleteClient($Event : any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar al cliente con ID ${$Event}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.handleDeleteClient($Event)
          this.handleGetClients();
      }
    });

  }


}
