import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { ListComponent } from "../../../../components/list/list.component";
import { AboutComponent } from "../../../../pages/about/about.component";
import { CardComponent } from "../../../../components/card/card.component";
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/model/Client';
import { Person } from '../../../../core/model/Person';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from "../../../../components/confirmation-dialog/confirmation-dialog.component";
import { ClientFormComponent } from "../../components/client-form/client-form.component";
import { ClientListComponent } from "../../components/client-list/client-list.component";

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [NavbarComponent, ListComponent, AboutComponent, CardComponent, CommonModule, FormsModule, ClientFormComponent, ClientListComponent],
  templateUrl: './client-view.component.html',
  styleUrl: './client-view.component.css'
})
export class ClientViewComponent {
  private clientService = inject(ClientService);
    
    
  

  }
  
