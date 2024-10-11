import {Component, inject, signal} from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Budget } from '../../../../core/model/Budget';
import { BudgetService } from '../../../../core/services/budget.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetListComponent } from "../budget-list/budget-list.component";

import { Client } from '../../../../core/model/Client';
import { ClientSearchComponent } from "../../../clients/components/client-search/client-search.component";
import { ModalService } from '../../../../core/utils/modal.service';
import { ClientListComponent } from '../../../clients/components/client-list/client-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { ClientControllerService } from '../../../../core/controllers/client-controller.service';
import { ClientService } from '../../../../core/services/client.service';

/**
 * @class BudgetFormComponent
 * 
 * Componente del formulario de presupuestos.
 *
 */
@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, CommonModule, BudgetListComponent, ClientSearchComponent, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css'
})
export class BudgetFormComponent {

  //Utils
  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(ModalService);
  private budgetService = inject(BudgetService);
  private clientService = inject(ClientService);
  private clientController = inject(ClientControllerService);
  //Properties
  currentBudget : Budget = this.budgetService.getEmptyBudget();
  currentClient : Client = this.clientController.getEmptyClient();
  budgetId : number = 0;
  isEdit : boolean = false;
  estados : string[] = this.budgetService.getEstados();
  //Form
  BudgetForm : FormGroup = new FormGroup({
    createdDate : new FormControl('', Validators.required),
    deadLine : new FormControl('', Validators.required),
    description : new FormControl('Descripción', Validators.required),
    cost : new FormControl(1000, Validators.required),
    estado : new FormControl('Presupuestado', Validators.required),
    idClient : new FormControl(0, Validators.required),
    client : new FormControl('Seleccionar cliente')
  });


  ngOnInit(){

    this.setDateFortmat('es');
    this.OnEditHandler()
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.currentClient.idClient = Number(params.get('clientId'));   
      let url = "/budget/new/"+ this.currentClient.idClient;
      if(this.router.url == url)
      {
        this.clientService.getClientById(this.currentClient.idClient).subscribe(res =>{
          this.currentClient = res!
        })
      } 
    });
 

  }
/**
 * Formateado de fecha para los input tipo fecha.
 * @param format pais
 */
  setDateFortmat(format : string){
    this._locale.set(format);
    this._adapter.setLocale(this._locale());
  }

  setUp(){
    this.BudgetForm.reset();
    this.isEdit = false;
    this.currentBudget = this.budgetService.getEmptyBudget();  
  }



  OnEditHandler(){
    this.budgetId = parseInt(this.activatedRoute.snapshot.params['budgetId']);
    let url = "/budget/edit/" + this.budgetId;
    if(this.router.url == url){
      this.budgetService.getBudgetById(this.budgetId).subscribe(budget =>{
        this.currentBudget = budget;
      })
      this.onEdit()
    }else{
      this.isEdit = false;
    }
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
      this.BudgetForm.patchValue(this.currentBudget);
      this.BudgetForm.patchValue({cost : this.currentBudget.cost});
      this.BudgetForm.patchValue({description : this.currentBudget.description});
      this.BudgetForm.patchValue({createdDate : this.currentBudget.createdDate});
      this.BudgetForm.patchValue({deadLine : this.currentBudget.deadLine});
      this.BudgetForm.patchValue({estado: this.currentBudget.Status })
      this.BudgetForm.get('client')?.disabled;
  }
  onSubmit(){
    this.toBudget(); 
    if(this.isEdit){
      this.budgetService.putBudget(this.currentBudget).subscribe();
    }else{
      this.budgetService.postBudget(this.currentBudget).subscribe();
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

