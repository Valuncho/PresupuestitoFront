import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { WorkFormComponent } from "../../modules/works/components/work-form/work-form.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
