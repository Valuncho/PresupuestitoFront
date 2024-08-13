import { Component } from '@angular/core';
import { MaterialListComponent } from "../../components/material-list/material-list.component";
import { MaterialComponent } from "../../components/material/material.component";

@Component({
  selector: 'app-material-view',
  standalone: true,
  imports: [MaterialListComponent, MaterialComponent],
  templateUrl: './material-view.component.html',
  styleUrl: './material-view.component.css'
})
export class MaterialViewComponent {

}
