import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../core/utils/notification.service';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/model/Client';
import { ClientControllerService } from '../../../../core/controllers/client-controller.service';
import { Person } from '../../../../core/model/Person';
import { PersonRequest } from '../../../../core/request/personRequest';


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
  clientDto : PersonRequest =this.currentClient.personId;
   
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
      name : this.currentClient.personId.name,
      lastName : this.currentClient.personId.lastName,
      direction : this.currentClient.personId.address,
      phoneNumber : this.currentClient.personId.phoneNumber,
      mail : this.currentClient.personId.email,
      dni : this.currentClient.personId.dni,
      cuit : this.currentClient.personId.cuit,
    });
  }

  onSubmit(){
    this.toPerson();
    if(this.isEdit){
      this.clientService.putClient(this.currentClient).subscribe();
    }else{
      //this.clientService.postClient(this.currentClient).subscribe();
      this.clientService.postClient(this.clientDto).subscribe();
    }

    this.setUp();
  }
  
  toPerson(){
    this.clientDto.name = this.clientForm.get("name")?.value
    this.clientDto.lastName = this.clientForm.get("lastName")?.value
    this.clientDto.address = this.clientForm.get("direction")?.value
    this.clientDto.phoneNumber = this.clientForm.get("phoneNumber")?.value
    this.clientDto.email = this.clientForm.get("mail")?.value
    this.clientDto.dni = this.clientForm.get("dni")?.value
    this.clientDto.cuit = this.clientForm.get("cuit")?.value
  }


}
