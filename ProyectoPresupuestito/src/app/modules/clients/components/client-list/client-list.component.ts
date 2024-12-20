import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../../core/services/client.service';
import { ModalService } from '../../../../core/utils/modal.service';
import { Client } from '../../../../core/model/Client';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { ClientCardComponent } from '../client-card/client-card.component';
import { ClientFormComponent } from '../client-form/client-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import {ClientControllerService} from "../../../../core/controllers/client-controller.service";


/**
 * @class ClientListComponent
 *
 * Listado de la entidad cliente, con buscador y paginación.
 *
 */
@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ClientCardComponent, NgxPaginationModule, CommonModule, TextCardComponent],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css', "../../../../styles/List.css"]

})

export class ClientListComponent {
  //Utils
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private clientService = inject(ClientService);
  private clientController = inject(ClientControllerService);

  //Properties
  options : boolean = false;
  clients : Client[] = [];

  clientId = 0;

  //Pagination
  page = 1
  pageSize = 5


  ngOnInit(): void {

  this.clientController.getReload().subscribe({
    next:(Res)=>{
      if(Res) this.getData()
    }
  })
  this.getData()
    this.activatedRoute.paramMap.subscribe(params => {
      this.clientId = Number(params.get('clientId'));  

    });

    if(this.router.url.includes("budget")){
      this.options = true;

    }
  }

getData(){
  this.clientService.getClients().subscribe({
    next: x => this.clients = x,
  })
}
//BudgetForm
  addClientHandler(){
    this.modalService.openModal<ClientFormComponent,Client>(ClientFormComponent);
  }

  closeModal(){
    this.modalService.closeModal();
  }

  //Card
  handleAction($Event : Client){
    this.closeModal()
    this.router.navigate(['/budget/new/',$Event.clientId]);
  }

  handleViewClient($Event : Client){
    this.closeModal()
    this.router.navigate(['/client/detail/',$Event.clientId]);
  }

  handleEditClient($Event : Client){
    this.closeModal()
    this.router.navigate(['/client/edit/',$Event.clientId]);
  }

  handleDeleteClient($Event : Client){
    this.closeModal()
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
            next: () => this.clientController.setReload(true)
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

