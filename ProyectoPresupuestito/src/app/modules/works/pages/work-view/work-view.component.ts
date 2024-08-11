import { Component } from '@angular/core';
import { WorkListComponent } from "../../components/work-list/work-list.component";
import { WorkComponent } from "../../components/work/work.component";

@Component({
  selector: 'app-work-view',
  standalone: true,
  imports: [WorkListComponent, WorkComponent],
  templateUrl: './work-view.component.html',
  styleUrl: './work-view.component.css'
})
export class WorkViewComponent {

}
