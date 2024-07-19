import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../core/model/Person';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() Person: Person | undefined;
  @Input() detailsUrl: string | undefined;
  @Input() paymentUrl: string | undefined;
  @Input() extraUrl: string | undefined;
  constructor() {}
}

