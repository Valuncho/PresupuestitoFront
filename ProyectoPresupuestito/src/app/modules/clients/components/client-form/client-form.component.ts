import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../core/utils/notification.service';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/model/Client';
import { ClientControllerService } from '../../../../core/controllers/client-controller.service';


@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  //Utils
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private clientService = inject(ClientService);
  private clientController = inject(ClientControllerService);
  //Properties
  currentClient : Client = this.clientController.getEmptyClient();
  clientId? : number;
  isEdit : boolean = false;
  //Form
  clientForm : FormGroup = new FormGroup({
    name: new FormControl('',[ Validators.required]),
    lastName: new FormControl('', Validators.required),
    direction : new FormControl('', Validators.required),
    phoneNumber : new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.email]),
    dni : new FormControl('',[Validators.maxLength(10),Validators.minLength(7)]),
    cuit : new FormControl('',[Validators.maxLength(13),Validators.minLength(10)]),
  });
  
  ngAfterViewInit(): void {
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

  setUp(){
    this.clientForm.reset();
    this.isEdit = false;
    this.currentClient = this.clientController.getEmptyClient();
  }

  resetForm($Event : Event){
    this.setUp();
    this.router.navigate(["/client"]);
    $Event.preventDefault();
  }

  onEditHandler(){
    this.clientId = parseInt(this.activatedRoute.snapshot.params['clientId']);
    if(this.clientId){
      let url = "/client/edit/" + this.clientId;
      if(this.router.url == url){
        this.isEdit = true;
        this.clientService.getClientById(this.clientId).subscribe(
        {
          next: (res:Client) => {this.currentClient = res!},
        }
      )
        this.clientForm.patchValue(this.currentClient.oPerson);
      }else{
        this.isEdit = false;
      }
    }
    
  }

  onSubmit(){
    
    this.currentClient.oPerson = this.clientForm.value;
    console.log(this.currentClient)
    
    if(this.isEdit){
      this.clientService.putClient(this.currentClient).subscribe();
    }else{
      this.clientService.postClient(this.currentClient).subscribe();
    }

    this.setUp();
  }



}
