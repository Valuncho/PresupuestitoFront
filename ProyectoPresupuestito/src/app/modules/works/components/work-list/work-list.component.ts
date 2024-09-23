import { Component, inject, input, Input } from '@angular/core';
import { WorkCardComponent } from '../work-card/work-card.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Budget } from '../../../../core/model/Budget';
import { BudgetService } from '../../../../core/services/budget.service';
import { ModalService } from '../../../../core/services/utils/modal.service';
import { NotificationService } from '../../../../core/services/utils/notification.service';
import { WorkService } from '../../../../core/services/work.service';
import { Work } from '../../../../core/model/Work';
import { NgxPaginationModule } from 'ngx-pagination';
import { WorkFormComponent } from '../work-form/work-form.component';
import { WorkSearchComponent } from "../work-search/work-search.component";
import { CommonModule } from '@angular/common';
import { toUpper } from 'lodash';
import { TextCardComponent } from '../../../../components/text-card/text-card.component';

@Component({
  selector: 'app-work-list',
  standalone: true,
  imports: [WorkCardComponent, NgxPaginationModule, WorkSearchComponent,CommonModule, TextCardComponent],
  templateUrl: './work-list.component.html',
  styleUrl: './work-list.component.css',
})
export class WorkListComponent {
  //Utils
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private modalService = inject(ModalService);
  private budgetService = inject(BudgetService);
  private workService = inject(WorkService);
  //Properties

  
  @Input() currentBudget!: Budget;
  @Input() works: Work[] = [];
  worksToDisplay!: Work[];
  options: Boolean = false;
  budgetId : number = 0;
  //Pagination
  workPage: number = 1;
  worksToPage: number = 5;

  ngOnInit(): void {
    
    this.budgetId = parseInt(this.activatedRoute.snapshot.params['budgetId']);
    let budgetDetailUrl = "/budget/detail/" + this.budgetId;
    let budgetworkArealUrl = "/work/edit/" + this.budgetId;
    
    
    if(budgetworkArealUrl == this.router.url){
      this.options = true;
    }
    

    this.workService.getWorks().subscribe(
      
      (works) => {
      
      if(this.router.url == budgetDetailUrl){
        this.worksToDisplay = this.currentBudget.works;
      }else(
        this.works = works
      )
      
    });

  
  }

  ngOnDestroy(): void {
    
    
  }
  

  seleccionar($Event: number) {
    let w = this.workService.getWorkById($Event)!;
    
  }
  editar($Event: number) {}
  eliminar($Event: number) {}

  addWorkHandler() {
    this.modalService.openModal(WorkFormComponent);
  }
  goToWorkArea(){
    this.router.navigate(['/work/edit']);
  }
  onSaveWorksHandler() {
    this.router.navigate(['/budget/detail',this.budgetId]);
  }
  //Pagination
  pageChange(page: number) {
    this.workPage = page;
  }
}
