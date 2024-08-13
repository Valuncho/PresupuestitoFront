import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Budget } from '../../../../core/model/Budget';
import { Client } from '../../../../core/model/Client';
import { BudgetService } from '../../../../core/services/budget.service';
import { ClientService } from '../../../../core/services/client.service';
import { ModalService } from '../../../../core/services/utils/modal.service';
import { NotificationService } from '../../../../core/services/utils/notification.service';
import { WorkService } from '../../../../core/services/work.service';


@Component({
  selector: 'app-work-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './work-form.component.html',
  styleUrl: './work-form.component.css'
})
export class WorkFormComponent {

  //Utils
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private modalService = inject(ModalService);
  private budgetService = inject(BudgetService);
  private workService = inject(WorkService);
  //Properties
  currentBudget : Budget = this.budgetService.getEmptyBudget();
  currentWork : Budget = this.budgetService.getEmptyBudget();

  estados = this.workService.getEstados();
  isEdit : boolean = false;


  WorkForm : FormGroup = new FormGroup({
    
    deadLine : new FormControl(new Date().getDate().toLocaleString().split('T')[0], Validators.required),
    notes : new FormControl('', Validators.required),
    cost : new FormControl(1000, Validators.required),
    estado : new FormControl('Presupuestado', Validators.required),
    hours : new FormControl(10, Validators.required),
    order : new FormControl(10, Validators.required),
  });




  setUp(){
    this.WorkForm.reset();
    this.isEdit = false;
    this.currentBudget = this.budgetService.getEmptyBudget();
  }

  resetForm($Event : Event){
    this.setUp();
    this.router.navigate(["/budget"]);
    $Event.preventDefault();
  }

  onSubmit(){
    console.log(this.WorkForm.value);
  }
}

