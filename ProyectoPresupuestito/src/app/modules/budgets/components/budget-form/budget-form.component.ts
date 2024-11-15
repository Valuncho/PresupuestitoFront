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
import { BudgetRequest } from '../../../../core/request/budgetRequest';
import { UtilsService } from '../../../../core/utils/utils.service';
import {BudgetControllerService} from "../../../../core/controllers/budget-controller.service";

/**
 * @class BudgetFormComponent
 *
 * Componente del formulario de presupuestos.
 *
 */
@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
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
  private budgetController = inject(BudgetControllerService);
  private utils = inject(UtilsService);
  //Properties
  currentBudget : any = this.budgetController.getEmptyBudgetRequest();
  currentClient : Client = this.clientController.getEmptyClient();
  budgetId : number = 0;
  isEdit : boolean = false;
  estados : string[] = this.budgetService.getEstados();
  //Form
  BudgetForm : FormGroup = new FormGroup({
    createdDate : new FormControl('', Validators.required),
    deadLine : new FormControl(null),
    description : new FormControl('', Validators.required),
    cost : new FormControl(1000, Validators.required),
    estado : new FormControl('Presupuestado', Validators.required),
    clientId : new FormControl(0, Validators.required),
    client : new FormControl('Seleccionar cliente')
  });


  ngOnInit(){

    this.setDateFortmat('es');

    this.activatedRoute.paramMap.subscribe(params => {
      this.OnEditHandler()
      this.onClientSelectHandler(params)

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
    this.currentBudget = this.budgetController.getEmptyBudgetRequest();
  }

  onClientSelectHandler(params : any){
    this.currentClient.clientId = Number(params.get('clientId'));  
    if(this.router.url == "/budget/new/"+ this.currentClient.clientId)
      {
        this.clientService.getClientById(this.currentClient.clientId).subscribe(res =>{
          this.onClientSelected(res);
        })
      }
  }

  OnEditHandler(){
    this.budgetId = parseInt(this.activatedRoute.snapshot.params['budgetId']);
    let url = "/budget/edit/" + this.budgetId;
    if(this.router.url == url){
      this.budgetService.getBudgetById(this.budgetId).subscribe(budget =>{
        this.currentBudget = budget.value;

        this.onEdit()
      })
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

  onClientSelected(res : any) {
    let name = res.value.personId.name+ " " +res.value.personId.lastName
    this.BudgetForm.patchValue({
      client : name,
      clientId: this.currentClient.clientId
    })
  }


  onEdit(){

    this.isEdit = true;
      this.BudgetForm.patchValue({
        description : this.currentBudget.descriptionBudget,
        deadLine : this.currentBudget.deadLine,
        createdDate: this.currentBudget.dateCreated,
        estado : this.currentBudget.budgetStatus,
        clientId : this.currentBudget.clientId.clientId
      })

      this.BudgetForm.get('client')?.disabled;
  }
  onSubmit(){
    this.toBudget();
    if(this.isEdit){
      this.budgetService.putBudget(this.currentBudget).subscribe({
        next: ()=>{
          this.budgetController.setReload(true)
        }
      });
    }else{
      this.budgetService.postBudget(this.currentBudget).subscribe({
        next: ()=>{
          this.budgetController.setReload(true)
        }
      });
    }

  }

  toBudget(){

    this.currentBudget.deadLine = this.BudgetForm.get('deadLine')?.value;
    this.currentBudget.clientId = this.BudgetForm.get('clientId')?.value;
    this.currentBudget.descriptionBudget = this.BudgetForm.get('description')?.value;
    this.currentBudget.dateCreated = this.BudgetForm.get('createdDate')?.value;
    this.currentBudget.budgetStatus = this.BudgetForm.get('estado')?.value;

  }
}

