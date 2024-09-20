import { Component, inject, Input, signal, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../../core/services/client.service';
import { ModalService } from '../../../../core/services/utils/modal.service';
import { NotificationService } from '../../../../core/services/utils/notification.service';
import { Client } from '../../../../core/model/Client';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { ClientSearchComponent } from "../client-search/client-search.component";
import { ClientCardComponent } from '../client-card/client-card.component';
import { ClientFormComponent } from '../client-form/client-form.component';
import { NgxPaginationModule } from 'ngx-pagination';


import { CommonModule } from '@angular/common';
import { ErrorAlertComponent } from '../../../../components/error-alert/error-alert.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorStateService } from '../../../../core/states/error-state.service';


@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ClientSearchComponent, ClientCardComponent, NgxPaginationModule, CommonModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',

})

export class ClientListComponent {
  //Utils
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationService);
  private modalService = inject(ModalService);
  private errorState = inject(ErrorStateService);
  private clientService = inject(ClientService);
  //Properties
  @Input() options : boolean = false;
  //clients : Client[] = [];
  
  clients: Client[] = [
    {
      idClient: 1001,
      oPerson: {
        idPerson: 1,
        name: 'John',
        lastName: 'Doe',
        direction: '123 Main St',
        phoneNumber: '1234567890',
        mail: 'johndoe@example.com',
        dni: '123456789',
        cuit: '30-12345678-9',
      },
    },
    {
      idClient: 1002,
      oPerson: {
        idPerson: 2,
        name: 'Jane',
        lastName: 'Smith',
        direction: '456 Elm St',
        phoneNumber: '9876543210',
        mail: 'janesmith@example.com',
        dni: '987654321',
        cuit: '30-98765432-1',
      },
    },
  ];


  searchedClients : Client[] = [];
  
  
  //Pagination
  page = 1
  pageSize = 5


  ngOnInit(): void {
     
    this.clientService.getClients().subscribe({  
      next: x => this.clients = x,  
      error: err => this.errorHandler(err),
      complete: () => console.log('There are no more action happen.')  
    })

  }

//BudgetForm
  addClientHandler(){
    this.modalService.openModal<ClientFormComponent,Client>(ClientFormComponent);
  }

  //Search
  handleSearch($Event : Client[]){
    this.page = 1
    /*
    this.clientService.getClientsBySearch("filto").subscribe({
      next : (clients) =>{
        this.searchedClients = clients;
      }
    })*/
  }

  //Card
  handleAction($Event : Client){

    this.router.navigate(['/budget/new/',$Event.idClient]);
  }

  handleViewClient($Event : Client){    
    this.router.navigate(['/client/detail/',$Event.idClient]);
  }

  handleEditClient($Event : Client){
    this.router.navigate(['/client/edit/',$Event.idClient]);
  }

  handleDeleteClient($Event : Client){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar al cliente ${$Event.oPerson.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const client = this.clientService.getClientById($Event.idClient)!;
        this.clientService.handleDeleteClient($Event.idClient)
        this.notificationService.showNotification("Cliente eliminado con éxito");
        this.router.navigate(['/client']);
      }
    });

  } 

  errorHandler(error : HttpErrorResponse){
    this.errorState.setError(error);
    this.modalService.openModal<ErrorAlertComponent,HttpErrorResponse>(ErrorAlertComponent);
  }
  //Pagination
  pageChange(page: number) {
    this.page = page;
  }

}
