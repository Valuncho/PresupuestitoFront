import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-card',
  standalone: true,
  imports: [],
  templateUrl: './text-card.component.html',
  styleUrls: ['./text-card.component.css', "../../styles/Card.css"]
})
export class TextCardComponent {
@Input() message : string = ""
}
