import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-stonks-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './stonks-calculator.component.html',
  styleUrls: ["../../../../styles/Form.css",'./stonks-calculator.component.css']
})
export class StonksCalculatorComponent {
  @Input() budgetCost : number = 0;
  stonksForm = new FormGroup({
    stonks : new FormControl(0,Validators.min(0))
  })



  calculateStonk(){
    let price = 0
    if (this.stonksForm.get('stonks')?.value! >= 0) {
      price = this.budgetCost + ((this.budgetCost * this.stonksForm.get('stonks')?.value!) / 100);
    }
    return price;
  }
}
