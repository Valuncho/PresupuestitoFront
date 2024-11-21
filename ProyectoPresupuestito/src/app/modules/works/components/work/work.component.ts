import { Component, Input } from '@angular/core';
import { Work } from '../../../../core/model/Work';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css', "../../../../styles/Detail.css"]
})
export class WorkComponent {
  @Input()  work! : Work;
}
