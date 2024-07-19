import { Component, input, signal } from '@angular/core';
import { SearcherComponent } from "../searcher/searcher.component";
import { CardComponent } from "../card/card.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SearcherComponent, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

}
