import { Component } from '@angular/core';
import { WorkListComponent } from "../../components/work-list/work-list.component";
import { WorkComponent } from "../../components/work/work.component";
import { MaterialListComponent } from "../../../materials/components/material-list/material-list.component";

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [WorkListComponent, WorkComponent, MaterialListComponent],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.css'
})
export class WorkAreaComponent {

}
