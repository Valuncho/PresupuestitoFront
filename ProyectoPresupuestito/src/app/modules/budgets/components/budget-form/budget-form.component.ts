import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from "../../../../components/navbar/navbar.component";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
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
@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, CommonModule, BudgetListComponent, ClientSearchComponent],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css'
})
export class BudgetFormComponent {
  
  private budgetService = inject(BudgetService);
  private clientService = inject(ClientService);
  selectedBudget? : Budget;
  isEdit : boolean = false;
  budgets : Budget[] | undefined = [];
  clientId = signal<number>(0);
  currentClient = signal<Client>(this.clientService.getEmptyClient());
  BudgetForm : FormGroup = new FormGroup({
    createdDate : new FormControl(new Date()),
    deadLine : new FormControl(new Date()),
    description : new FormControl(''),
    cost : new FormControl(''),
    estado : new FormControl(''),
    idClient : new FormControl('')
  });

  clientSearchEnable = true;
  
  options = ['Creado', 'Aprobado', 'Elaboración', 'Parado' , 'Finalizado', 'Entregado', 'Cancelado'];

  constructor(private activatedRoute: ActivatedRoute){}

  getClients() : Client[]{
    let c : Client[] = [];
    this.clientService.getClients().subscribe(clients =>{
      c = clients;
    })
    return c;
    
  }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.has('clientId')){
        
        this.clientId.set(parseInt(params.get('clientId')!));
        this.clientSearchEnable = false;
        this.clientService.setSelectedClient(this.clientId());
        this.clientService.getSelectedClient().subscribe(client =>{
          this.currentClient.set(client);
        });
        console.log(this.clientId());
        this.BudgetForm.patchValue({idClient:this.clientId()})
        let history = this.clientService.getClienHistory(this.clientId());
        
      }else{
       // this.handleGetBudgets();
      }
      
      
    });
    

  }
  
  onClientSelected(clientId: number) {
    console.log('Cliente seleccionado:', clientId);
    this.BudgetForm.patchValue({idClient:clientId})
  }


  onEdit(){
    this.isEdit = true;
    let id = parseInt(this.activatedRoute.snapshot.params['budgetId']);
    this.selectedBudget = this.budgetService.getBudgetById(id);
    if(this.selectedBudget){
      console.log(this.selectedBudget);
      this.BudgetForm.patchValue(this.selectedBudget);
      
      this.BudgetForm.patchValue({createdDate : this.selectedBudget.createdDate.toISOString().split('T')[0]});
      this.BudgetForm.patchValue({deadLine : this.selectedBudget.deadLine.toISOString().split('T')[0]});
      this.BudgetForm.patchValue({estado: this.selectedBudget.Status })
      
    }
    
  }
  onSubmit(){
    console.log(this.BudgetForm.value);
  }
}

