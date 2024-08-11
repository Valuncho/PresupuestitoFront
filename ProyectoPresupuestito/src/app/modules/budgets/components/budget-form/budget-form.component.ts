import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from "../../../../components/navbar/navbar.component";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Budget } from '../../../../core/model/Budget';
import { toSignal } from '@angular/core/rxjs-interop';
import { BudgetService } from '../../../../core/services/budget.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { state } from '@angular/animations';
import { BudgetListComponent } from "../budget-list/budget-list.component";
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/model/Client';
import { ClientSearchComponent } from "../../../clients/components/client-search/client-search.component";
import { ModalService } from '../../../../core/services/utils/modal.service';
import { ClientFormComponent } from '../../../clients/components/client-form/client-form.component';
import { ClientViewComponent } from '../../../clients/pages/client-view/client-view.component';
import { ClientListComponent } from '../../../clients/components/client-list/client-list.component';
import { NotificationService } from '../../../../core/services/utils/notification.service';
@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, CommonModule, BudgetListComponent, ClientSearchComponent],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css'
})
export class BudgetFormComponent {
  //Utils
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private modalService = inject(ModalService);
  private budgetService = inject(BudgetService);
  private clientService = inject(ClientService);
  //Properties
  currentBudget : Budget = this.budgetService.getEmptyBudget();
  currentClient : Client = this.clientService.getEmptyClient();
  isEdit : boolean = false;
  budgets : Budget[] | undefined = [];
  clientId = signal<number>(0);
  

  BudgetForm : FormGroup = new FormGroup({
    createdDate : new FormControl(new Date().getDate().toLocaleString().split('T')[0], Validators.required),
    deadLine : new FormControl(new Date(), Validators.required),
    description : new FormControl('', Validators.required),
    cost : new FormControl(1000, Validators.required),
    estado : new FormControl('Presupuestado', Validators.required),
    idClient : new FormControl('', Validators.required),
    client : new FormControl('')
  });

  clientSearchEnable = true;
  
  estados : string[] = this.budgetService.getEstados();

  



  getClients() : Client[]{
    let c : Client[] = [];
    this.clientService.clients.subscribe(clients =>{
      c = clients;
    })
    return c;
    
  }

  ngOnInit(){
    this.budgetService.getSelectedBudget().subscribe(budget =>{
      this.currentBudget = budget;
      console.log(this.currentBudget)
      if(this.router.url == '/budget/edit'){
        this.onEdit();
      }
    })

    
    

    this.clientService.selectedClient.subscribe(client =>{
      this.currentClient=client;
      this.BudgetForm.patchValue({idClient:this.currentClient.idClient});
      this.BudgetForm.patchValue({client:this.currentClient.oPerson.lastName + ' ' + this.currentClient.oPerson.name});
    });

  }

  setUp(){
    this.BudgetForm.reset();
    this.isEdit = false;
    this.currentBudget = this.budgetService.getEmptyBudget();
  }

  resetForm($Event : Event){
    this.setUp();
    this.router.navigate(["/budget"]);
    $Event.preventDefault();
  }

  openClientForm(){
    this.modalService.openModal<ClientListComponent,Client>(ClientListComponent);  
  }

  onClientSelected(clientId: number) {
    console.log('Cliente seleccionado:', clientId);
    this.BudgetForm.patchValue({idClient:clientId})
  }


  onEdit(){
    this.isEdit = true;

    
      console.log(this.currentBudget);
      this.BudgetForm.patchValue(this.currentBudget);
      this.BudgetForm.patchValue({cost : this.currentBudget.cost});
      this.BudgetForm.patchValue({description : this.currentBudget.description});
      this.BudgetForm.patchValue({createdDate : this.currentBudget.createdDate.toISOString().split('T')[0]});
      this.BudgetForm.patchValue({deadLine : this.currentBudget.deadLine.toISOString().split('T')[0]});
      this.BudgetForm.patchValue({estado: this.currentBudget.Status })
      this.BudgetForm.get('client')?.disabled;
    
    
  }
  onSubmit(){
    this.toBudget();
    if(this.isEdit){
      this.budgetService.handleUpdateBudget(this.currentBudget);
      this.notificationService.showNotification("Presupuesto editado con éxito!");
    }else{
      let history = this.clientService.getClienHistory(this.BudgetForm.get('idClient')?.value);
      history.budgets.push(this.currentBudget);
      this.budgetService.handlePostBudget(this.currentBudget);
      this.notificationService.showNotification("Presupuesto creado con éxito!");
    }
    this.setUp();
  }

  toBudget(){
    this.currentBudget.description = this.BudgetForm.get('description')?.value;
    this.currentBudget.deadLine = this.BudgetForm.get('deadLine')?.value;
    this.currentBudget.createdDate = this.BudgetForm.get('createdDate')?.value;
    this.currentBudget.cost = this.BudgetForm.get('cost')?.value;
    this.currentBudget.Status = this.BudgetForm.get('estado')?.value;
  }
}

