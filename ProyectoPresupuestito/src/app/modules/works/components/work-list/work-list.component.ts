import { Component, inject, Input } from '@angular/core';
import { WorkCardComponent } from '../work-card/work-card.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../../core/utils/modal.service';
import { WorkService } from '../../../../core/services/work.service';
import { Work } from '../../../../core/model/Work';
import { WorkFormComponent } from '../work-form/work-form.component';
import { CommonModule } from '@angular/common';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';
import { BudgetControllerService } from '../../../../core/controllers/budget-controller.service';

@Component({
  selector: 'app-work-list',
  standalone: true,
  imports: [WorkCardComponent, CommonModule, TextCardComponent],
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css', "../../../../styles/List.css"]
})
export class WorkListComponent {
  //Utils
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private workService = inject(WorkService);
  private workController = inject(WorkControllerService);
  private budgetController = inject(BudgetControllerService);

  //Properties
  @Input() works!: Work[];

  options: Boolean = false;
  budgetId: number = 0;

  ngOnInit(): void {
    this.budgetId = parseInt(this.activatedRoute.snapshot.params['budgetId']);
    let budgetDetailUrl = '/budget/detail/' + this.budgetId;
    let worksViewUrl = '/work';
    if (budgetDetailUrl == this.router.url) {
      this.options = true;
    } else if (worksViewUrl == this.router.url) {
      this.workService.getWorks().subscribe((res) => {
        this.works = res;
      });
    }
  }

  //Card
  handleView($Event: Work) {
    this.workController.setWorkModel($Event);
  }
  handleEdit($Event: Work) {
    if ('/work' != this.router.url) {
      this.workController.setEditMode(true);
      this.workController.setWork(this.workController.toWorkRequest($Event));
      this.modalService.openModal(WorkFormComponent);
    } else {
      alert('Debe ir al presupuesto para poder editarlo.');
    }
  }
  handleDelete($Event: Work) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar el trabajo: ${$Event.workName}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.workService.deleteWork($Event.workId).subscribe({
          next: () => {
            this.budgetController.setReload(true);
          },
        });
      }
    });
  }

  //List options
  addWorkHandler() {
    let work = this.workController.getEmptyWorkRequest();
    work.budgetId = this.budgetId;
    this.workController.setWork(work);
    this.modalService.openModal(WorkFormComponent);
  }
}
