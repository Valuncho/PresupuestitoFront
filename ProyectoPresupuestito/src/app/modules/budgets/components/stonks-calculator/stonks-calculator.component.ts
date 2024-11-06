import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-stonks-calculator',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './stonks-calculator.component.html',
  styleUrl: './stonks-calculator.component.css'
})
export class StonksCalculatorComponent {
  @Input() budgetCost : number = 0;
  stonks : number = 0

  calculateStonk(){
    return this.budgetCost + ((this.budgetCost * this.stonks) / 100);
  }
}
