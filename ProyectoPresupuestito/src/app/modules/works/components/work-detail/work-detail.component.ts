import { Component, inject } from '@angular/core';
import { Work } from '../../../../core/model/Work';
import { CommonModule } from '@angular/common';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { Router } from '@angular/router';
import {BudgetViewComponent} from "../../../budgets/pages/budget-view/budget-view.component";
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';
import { Item } from '../../../../core/model/Item';
import { WorkControllerService } from '../../../../core/controllers/work-controller.service';

@Component({
  selector: 'app-work-detail',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent, BudgetViewComponent],
  templateUrl: './work-detail.component.html',
  styleUrl: './work-detail.component.css'
})
export class WorkComponent {
  private router = inject(Router);
  
  private materialController = inject(MaterialControllerService);
  private workController = inject(WorkControllerService);
  currentWork! : Work;
  item : Item = this.materialController.getEmptyItem();
  options = false;

  ngOnInit(): void {
  
      if(this.router.url == "/work" ){
        this.options = true;

      }

      this.workController.getWork().subscribe(res =>
        this.currentWork = res
      )

  }

  editItem(item : Item){
    this.materialController.setItem(item);
  }

  goToWorkArea(){
    this.router.navigate(["/workArea/"]);
  }

  goToBudgetDetail(){
    this.router.navigate(["/budget/detail"]);
  }

  modifyItem(item : Item){
    this.materialController.setEditMode(true);
    this.materialController.setItem(item);
  }

  changeItem(){
    this.materialController.getItem().subscribe(res =>{
      console.log("item recibido")
      console.log(res!)
      
    })
  }
}
