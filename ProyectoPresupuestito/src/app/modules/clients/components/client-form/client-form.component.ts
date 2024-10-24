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
import { UtilsService } from '../../../../core/utils/utils.service';
import { ClientRequest } from '../../../../core/request/clientRequest';


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
  private utils = inject(UtilsService);
  //Properties
  currentClient : Client = this.clientController.getEmptyClient();
  clientDto : ClientRequest =this.currentClient.personId;

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
      if(this.router.url == "/client/edit/" + this.clientId){
        this.clientService.getClientById(this.clientId!).subscribe( {
          next:res =>{
            this.isEdit = true;
            this.setClientToEdit(res);
          }
        }
      )
      }else{
        this.isEdit = false;
    }
    
  }

  
  onSubmit(){
    this.toPerson();
    if(this.isEdit){
      this.clientService.putClient(this.clientDto).subscribe({
        next: ()=>{
          this.utils.reaload()
        }
      });
    }else{
      this.clientService.postClient(this.clientDto).subscribe({
        next: ()=>{
          this.utils.reaload()
        }
      });
      
    }
    this.setUp();
  }
  
  setClientToEdit(res : any){
    this.clientForm.patchValue({
      name : res.value.personId.name,
      lastName : res.value.personId.lastName,
      direction : res.value.personId.address,
      phoneNumber : res.value.personId.phoneNumber,
      mail : res.value.personId.email,
      dni : res.value.personId.dni,
      cuit : res.value.personId.cuit,
    });
  }
  toPerson(){
    this.clientDto.name = this.clientForm.get("name")?.value
    this.clientDto.lastName = this.clientForm.get("lastName")?.value
    this.clientDto.address = this.clientForm.get("direction")?.value
    this.clientDto.phoneNumber = this.clientForm.get("phoneNumber")?.value
    this.clientDto.email = this.clientForm.get("mail")?.value
    this.clientDto.dni = this.clientForm.get("dni")?.value
    this.clientDto.cuit = this.clientForm.get("cuit")?.value
    if(this.isEdit){
      this.clientDto.clientId = this.clientId;
    }
  }


}