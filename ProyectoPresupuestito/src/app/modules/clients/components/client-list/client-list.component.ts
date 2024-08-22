import { Component, inject, signal, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../../core/services/client.service';
import { ModalService } from '../../../../core/services/utils/modal.service';
import { NotificationService } from '../../../../core/services/utils/notification.service';
import { Client } from '../../../../core/model/Client';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { ClientSearchComponent } from "../client-search/client-search.component";
import { CardComponent } from '../../../../components/card/card.component';
import { ClientFormComponent } from '../client-form/client-form.component';
import { NgxPaginationModule } from 'ngx-pagination';


import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ClientSearchComponent, CardComponent, NgxPaginationModule, CommonModule],
  
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
  
})

export class ClientListComponent {
  //Utils
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationService);
  private modalService = inject(ModalService);
  private clientService = inject(ClientService);
  //Properties
  clients : Client[] = [];
  searchedClients : Client[] = [];
  client? : Client;
  //BudgetForm
  options = false;
  //Pagination
  page = 1
  pageSize = 5


  ngOnInit(): void {

    if(this.router.url == '/budget' || this.router.url == '/budget/new/'){
      console.log(this.router.url)
      this.options = true;
    }

    this.clientService.getAllClients().subscribe({
      next : (clientes)=>{
          this.clients = clientes;
          this.searchedClients = clientes;
       }
    });

  }

//BudgetForm
  addClientHandler(){
    this.modalService.openModal<ClientFormComponent,Client>(ClientFormComponent);
  }

  //Search
  handleSearch($Event : Client[]){
    this.page = 1
    this.clientService.getClientsBySearch("filto").subscribe({
      next : (clients) =>{
        this.searchedClients = clients;
      }
    })
  }

  //Card
  handleAction($Event : any){
    this.clientService.setSelectedClient($Event)
    this.router.navigate(['/budget/new/',$Event]);
  }

  handleViewClient($Event : any){
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
        const client = this.clientService.getClientById($Event)!;
        
        this.clientService.handleDeleteClient($Event)
        this.notificationService.showNotification("Cliente eliminado con éxito");
        this.router.navigate(['/client']);
      }
    });

  }

  //Pagination
  pageChange(page: number) {
    this.page = page;
  }

}
