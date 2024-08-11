import { booleanAttribute, Component, EventEmitter, inject, input, Input, Output, signal } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/utils/notification.service';
import { setUpLocationSync } from '@angular/router/upgrade';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [NavbarComponent, ListComponent, AboutComponent, CardComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  
  private clientService = inject(ClientService);
  private notificationService = inject(NotificationService);
  currentClient : Client = this.clientService.getEmptyClient();
  clientId? : number;
  isEdit : boolean = false;

  clientForm : FormGroup = new FormGroup({
    name: new FormControl('',[ Validators.required]),
    lastName: new FormControl('', Validators.required),
    direction : new FormControl('', Validators.required),
    phoneNumber : new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.email]),
    dni : new FormControl('',[Validators.maxLength(10),Validators.minLength(7)]),
    cuit : new FormControl('',[Validators.maxLength(13),Validators.minLength(10)]),
  });

  constructor(
    private router : Router,
    private activatedRoute: ActivatedRoute
    ){
    }

    ngOnInit(): void {
      this.setUp();
      this.onEditHandler();
    }

  get canSubmit(){
    let  flag : boolean = false;
    if(
      this.clientForm.get('name')?.valid && 
      this.clientForm.get('lastName')?.valid && 
      this.clientForm.get('direction')?.valid && 
      this.clientForm.get('phoneNumber')?.valid
    ){
      flag = true;
    }
    return flag;
  }
  


  onSubmit(){
    this.currentClient.oPerson = this.clientForm.value;
    console.log('cliente a cargar: ')
    console.log(this.currentClient);
    if(this.isEdit){
      this.isEdit = false;
      this.clientService.handleUpdateClient(this.currentClient);
      this.notificationService.showNotification("Cliente editado con éxito!");
    }else{
      this.clientService.handlePostClient(this.currentClient);
      this.notificationService.showNotification("Cliente guardado con éxito!");
    }
    this.currentClient = this.clientService.getEmptyClient();
    this.clientForm.reset();
  
  }

  setUp(){
    this.clientForm.reset();
    this.isEdit = false;
    this.currentClient = this.clientService.getEmptyClient();
  }

  resetForm($Event : Event){
    this.setUp();
    this.router.navigate(["/client"]);
    $Event.preventDefault();
  }

  onEditHandler(){
    this.clientId = parseInt(this.activatedRoute.snapshot.params['clientId']);
    if(this.clientId){
        this.isEdit = true;
        this.clientService.getSelectedClient().subscribe(client =>{
        this.currentClient= client;
        this.clientForm.patchValue(this.currentClient.oPerson);
      })
    }else{
      this.isEdit = false;
    }
    
      
  }
}
