import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../../core/services/client.service';
import { ModalService } from '../../../../core/utils/modal.service';
import { Client } from '../../../../core/model/Client';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { ClientSearchComponent } from "../client-search/client-search.component";
import { ClientCardComponent } from '../client-card/client-card.component';
import { ClientFormComponent } from '../client-form/client-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';


/**
 * @class ClientListComponent
 * 
 * Listado de la entidad cliente, con buscador y paginación.
 *
 */
@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ClientSearchComponent, ClientCardComponent, NgxPaginationModule, CommonModule, TextCardComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',

})

export class ClientListComponent {
  //Utils
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private clientService = inject(ClientService);

  //Properties
  options : boolean = false;
  clients : Client[] = [];

  clientId = 0;
  
  //Pagination
  page = 1
  pageSize = 5


  ngOnInit(): void {
    this.clientService.getClients().subscribe({  
      next: x => this.clients = x,  
    })

    this.activatedRoute.paramMap.subscribe(params => {
      this.clientId = Number(params.get('clientId'));   
      
    });

    let url = "/budget/new/" + this.clientId;
    let url2 = "/budget";
    if(this.router.url == url || this.router.url == url2){
      this.options = true;

    }
  }

//BudgetForm
  addClientHandler(){
    this.modalService.openModal<ClientFormComponent,Client>(ClientFormComponent);
  }



  //Card
  handleAction($Event : Client){
    this.router.navigate(['/budget/new/',$Event.clientId]);
  }

  handleViewClient($Event : Client){    
    this.router.navigate(['/client/detail/',$Event.clientId]);
  }

  handleEditClient($Event : Client){
    this.router.navigate(['/client/edit/',$Event.clientId]);    
  }

  handleDeleteClient($Event : Client){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar al cliente ${$Event.personId.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const client = this.clientService.getClientById($Event.clientId)!;
        this.clientService.deleteClient($Event.clientId).subscribe(
          {
            next: () => this.router.navigate(['/client'])
          }
        );
        
      }
    });

  } 

  //Pagination
  pageChange(page: number) {
    this.page = page;
  }

}
