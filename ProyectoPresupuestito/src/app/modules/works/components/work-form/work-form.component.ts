import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { WorkService } from '../../../../core/services/work.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';
import { WorkRequest } from '../../../../core/request/workRequest';
import { BudgetControllerService } from '../../../../core/controllers/budget-controller.service';
import { ModalService } from '../../../../core/utils/modal.service';

@Component({
  selector: 'app-work-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './work-form.component.html',
  styleUrl: './work-form.component.css',
})
export class WorkFormComponent {
  //Utils
  private workController = inject(WorkControllerService);
  private budgetController = inject(BudgetControllerService);
  private workService = inject(WorkService);
  private modalService = inject(ModalService);
  //Properties
  currentWork: WorkRequest = this.workController.getEmptyWorkRequest();
  estados = this.workService.getEstados();
  isEdit: boolean = this.workController.getEditMode();
  //Form
  WorkForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
    deadLine: new FormControl(new Date(), Validators.required),
    estado: new FormControl('Presupuestado', Validators.required),
    hours: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {
    this.workController.getWork().subscribe((res) => {
      this.currentWork = res!;
    });

    if (this.isEdit) {
      this.workService
        .getWorkById(this.currentWork.workId!)
        .subscribe((res) => {
          this.currentWork = this.workController.toWorkRequest(res!.value);
          this.budgetController
            .getBudgetId()
            .subscribe((res) => (this.currentWork.budgetId = res));
          this.toForm();
        });
    }
  }

  ngOnDestroy(): void {
    this.setUp();
  }
  setUp() {
    this.workController.setEditMode(false);
    this.isEdit = false;
  }

  resetForm($Event: Event) {
    this.setUp();
    $Event.preventDefault();
  }

  onSubmit() {
    this.toWork();
    if (this.isEdit) {
      this.workService.putWork(this.currentWork).subscribe({
        next: () => {
          this.closeForm();
        },
      });
    } else {
      this.workService.postWork(this.currentWork).subscribe({
        next: () => {
          this.closeForm();
        },
      });
    }

    this.setUp();
  }
  closeForm() {
    this.modalService.closeModal();
    this.budgetController.setReload(true);
  }

  toForm() {
    console.log(this.currentWork);
    this.WorkForm.patchValue({
      name: this.currentWork.workName,
      estado: this.currentWork.workStatus,
      deadLine: this.currentWork.deadLine,
      notes: this.currentWork.notes,
      hours: this.currentWork.estimatedHoursWorked,
    });
  }

  toWork() {
    this.currentWork.workName = this.WorkForm.get('name')?.value;
    this.currentWork.deadLine = this.WorkForm.get('deadLine')?.value;
    this.currentWork.estimatedHoursWorked = this.WorkForm.get('hours')?.value;
    this.currentWork.workStatus = this.WorkForm.get('estado')?.value;
    this.currentWork.notes = this.WorkForm.get('notes')?.value;
  }
}
