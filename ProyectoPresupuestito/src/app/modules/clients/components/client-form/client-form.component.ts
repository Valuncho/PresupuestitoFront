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
  

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.clientId = Number(params.get('clientId'));   
      this.onEditHandler()
    });

    this.clientController.getEditMode().subscribe(res =>
      {
        if(res == true){
          this.isEdit=res
          
        }
      }
    )
    this.setUp();
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
    
    let url = "/client/edit/" + this.clientId;
      if(this.router.url == url){
        this.clientService.getClientById(this.clientId!).subscribe( {
          next:res =>{
            this.currentClient = res!
            this.setClientToEdit()
          }
        }
          
      )
      }else{
        this.isEdit = false;
    }
    
  }

  setClientToEdit(){
    this.clientForm.patchValue({
      name : this.currentClient.oPerson.name,
      lastName : this.currentClient.oPerson.lastName,
      direction : this.currentClient.oPerson.direction,
      phoneNumber : this.currentClient.oPerson.phoneNumber,
      mail : this.currentClient.oPerson.mail,
      dni : this.currentClient.oPerson.dni,
      cuit : this.currentClient.oPerson.cuit,
    });
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
