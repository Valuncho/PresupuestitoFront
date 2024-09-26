import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-card',
  standalone: true,
  imports: [],
  templateUrl: './text-card.component.html',
  styleUrl: './text-card.component.css'
})
export class TextCardComponent {
@Input() message : string = ""
}
