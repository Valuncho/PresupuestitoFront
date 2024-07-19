import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css'
})
export class BudgetFormComponent {

}
