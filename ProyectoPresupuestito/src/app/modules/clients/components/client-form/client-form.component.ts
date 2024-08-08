import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { ListComponent } from "../../../../components/list/list.component";
import { AboutComponent } from "../../../../pages/about/about.component";
import { CardComponent } from "../../../../components/card/card.component";
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/model/Client';
import { Person } from '../../../../core/model/Person';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from "../../../../components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [NavbarComponent, ListComponent, AboutComponent, CardComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  private clientService = inject(ClientService);

  currentClient = signal<Client>(this.clientService.getEmptyClient());


  isEdit : boolean = false;

  clientForm : FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    direction : new FormControl('', Validators.required),
    phoneNumber : new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    dni : new FormControl('', Validators.required),
    cuit : new FormControl('', Validators.required),
  });

  constructor() {

    

    this.clientService.accionSeleccionada$.subscribe(accion =>{
      switch (accion) {
        case 'edit':
          this.isEdit = true;
          break;
      }
    })
  }

  ngOnInit(){
    this.clientService.getSelectedClient().subscribe(client =>{
      this.currentClient.set(client);
      this.clientForm.patchValue(this.currentClient()!.oPerson);
    })

  }

  get canSubmit(){
    return this.clientForm.get('name')?.valid && this.clientForm.get('phoneNumber')?.valid;
  }
  
  onSubmit(){
    this.currentClient()!.oPerson = this.clientForm.value;
    if(this.isEdit){
      this.isEdit = false;
      console.log('our');
      this.clientService.handleUpdateClient(this.currentClient()!);
    }else{
      this.clientService.handlePostClient(this.currentClient()!);
    }
    this.clientForm.reset();
  
  }

  setUp($Event : Event){
    console.log("limpiar");
    this.clientForm.reset();
    this.isEdit = false;
    this.currentClient.set(this.clientService.getEmptyClient());
    
    $Event.preventDefault();
  }
  
 

  
 
}
