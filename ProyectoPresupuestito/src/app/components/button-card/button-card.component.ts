import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button-card.component.html',
  styleUrl: './button-card.component.css'
})
export class ButtonCardComponent {

  @Input() label?: string;
  @Input() url?: string;
  @Input() icon?: string;

}
