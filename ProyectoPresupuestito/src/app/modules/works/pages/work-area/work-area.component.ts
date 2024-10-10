import { Component, inject } from '@angular/core';
import { WorkListComponent } from "../../components/work-list/work-list.component";
import { WorkComponent } from "../../components/work-detail/work-detail.component";
import { MaterialListComponent } from "../../../materials/components/lists/material-list/material-list.component";
import { WorkService } from '../../../../core/services/work.service';
import { Router } from '@angular/router';
import {BudgetService} from "../../../../core/services/budget.service";
import { MaterialManagerComponent } from "../../../materials/components/forms/material-manager/material-manager.component";
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [WorkListComponent, WorkComponent, MaterialListComponent, MaterialManagerComponent],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.css'
})
export class WorkAreaComponent {
  //Util
  private workService = inject(WorkService);
  private materialController = inject(MaterialControllerService);

  ngOnInit(): void {
    /*
    this.workService.getSelectedWork().subscribe(work =>{
      this.currentWork = work;
    })
    if( this.currentWork == this.workService.getEmptyWork())  {
      this.router.navigate(['/work'])
    }*/
  }

  handlerItem(){
    //this.materialController.setItem()
  }

}
