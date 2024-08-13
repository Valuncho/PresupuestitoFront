import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-work-list',
  standalone: true,
  imports: [WorkCardComponent, NgxPaginationModule],
  templateUrl: './work-list.component.html',
  styleUrl: './work-list.component.css'
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
    currentBudget : Budget = this.budgetService.getEmptyBudget();
    works : Work[] = [];
    worksToDisplay : Work[] = [];
    options : Boolean = false;


    //Pagination
    page : number = 1;
    itemsPerPage : number = 5;

    
    ngOnInit(): void {
      
     
      this.workService.getWorks().subscribe(works=>{
        this.works = works;
      })
      this.budgetService.getSelectedBudget().subscribe(budget=>{
        this.currentBudget=budget;
        if(this.currentBudget.idBudget!=0 && (this.router.url == '/work/new' || this.router.url == '/work/edit') ){
          this.worksToDisplay = this.currentBudget.works;
          this.options = true;
        }else{
          this.worksToDisplay = this.works;
        }
        
      }
      )

      
        
      
    }



    seleccionar($Event : number){
      let w = this.workService.getWorkById($Event)!;
      this.workService.setSelectedWork(w);
    }
    editar($Event : number){
      
    }
    eliminar($Event : number){
      
    }


    addWorkHandler(){
      this.modalService.openModal(WorkFormComponent);
    }
    onSaveWorksHandler(){
      //this.currentBudget
      this.router.navigate(['/budget/detail'])
    }
  //Pagination
  pageChange(page: number) {
    this.page = page;
  }

}
