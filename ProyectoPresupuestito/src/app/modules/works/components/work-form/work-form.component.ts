import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { WorkService } from '../../../../core/services/work.service';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';
import { Work } from '../../../../core/model/Work';


@Component({
  selector: 'app-work-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule ],
  templateUrl: './work-form.component.html',
  styleUrl: './work-form.component.css'
})
export class WorkFormComponent {

  //Utils
  private workController = inject(WorkControllerService);
  private workService = inject(WorkService);

  //Properties
  currentWork : Work = this.workController.getEmptyWork();
  estados = this.workService.getEstados();
  isEdit : boolean = false;

  //Form
  WorkForm : FormGroup = new FormGroup({
    deadLine : new FormControl('', Validators.required),
    notes : new FormControl('', Validators.required),
    estado : new FormControl('Presupuestado', Validators.required),
    hours : new FormControl(1, Validators.required),
    order : new FormControl(1, Validators.required),
  });

  ngOnInit(): void {

  }

  setUp(){
    this.WorkForm.reset();
    this.isEdit = false;
  }

  resetForm($Event : Event){
    this.setUp();
    $Event.preventDefault();
  }

  onSubmit(){
    this.toWork()
    if(this.isEdit){
      this.workService.putWork(this.currentWork).subscribe();
    }else{
      this.workService.postWork(this.currentWork).subscribe();
    }
    this.setUp();
  }

  toWork(){
    this.currentWork.deadline = this.WorkForm.get('deadLine')?.value;
    this.currentWork.estimatedHoursWorked = this.WorkForm.get('hours')?.value;
    this.currentWork.status = this.WorkForm.get('estado')?.value;
    this.currentWork.notes = this.WorkForm.get('notes')?.value;
    this.currentWork.order = this.WorkForm.get('order')?.value;
  }
}

