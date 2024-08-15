import { Component, inject } from '@angular/core';
import { WorkListComponent } from "../../components/work-list/work-list.component";
import { WorkComponent } from "../../components/work/work.component";
import { MaterialListComponent } from "../../../materials/components/material-list/material-list.component";
import { WorkService } from '../../../../core/services/work.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [WorkListComponent, WorkComponent, MaterialListComponent],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.css'
})
export class WorkAreaComponent {
  //Util
  private workService = inject(WorkService);
  private router = inject(Router);
  private currentWork = this.workService.getEmptyWork();
  ngOnInit(): void {
    this.workService.getSelectedWork().subscribe(work =>{
      this.currentWork = work;
    })
    if( this.currentWork == this.workService.getEmptyWork())  {
      this.router.navigate(['/work'])
    }
  }
  
}
