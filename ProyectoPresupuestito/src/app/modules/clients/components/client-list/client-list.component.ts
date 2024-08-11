import { Component, inject, signal, SimpleChange } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/model/Client';
import { CardComponent } from '../../../../components/card/card.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { ClientSearchComponent } from "../client-search/client-search.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationService } from '../../../../core/services/utils/notification.service';
@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CardComponent, ClientSearchComponent, NgxPaginationModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  private clientService = inject(ClientService);
  private notificationService = inject(NotificationService);

  clients = signal<Client[]>([]);
  searchedClients : Client[] = [];
  page = 1
  pageSize = 5
  constructor(private dialog: MatDialog,private router: Router){
    this.clients.set(this.clientService.getSingal());
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.clientService.getClients().subscribe({
      next : (clientes)=>{
        this.clients.set(clientes);
      }
    })
  }

  pageChange(page: number) {
    this.page = page;
  }

  ngOnChanges(Change : SimpleChange){
    
  }

  
   show(){
    console.log(this.clients());
   }
  
  getAllClients() : Client[]{
    let allClients : Client[] = []
    this.clientService.getClients().subscribe(clients=>{
      allClients = clients;
    }) 

    return allClients
  }

  

  handleSearch($Event : Client[]){
    this.page = 1
    console.log($Event)
    this.clients.set($Event)
  }

  handleAction($Event : any){
    this.clientService.setSelectedClient($Event)
    this.router.navigate(['/budget/new/',$Event]);
  }

  handleSelectClient($Event : any){
    this.clientService.setSelectedClient($Event)
    this.router.navigate(['/client/detail/',$Event]);
  }

  handleEditClient($Event : any){
    this.clientService.setSelectedClient($Event)
    this.router.navigate(['/client/edit/',$Event]);
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
        this.notificationService.showNotification("Cliente eliminado con éxito");
        this.router.navigate(['/client']);
        
      }
    });
    
  }


}
