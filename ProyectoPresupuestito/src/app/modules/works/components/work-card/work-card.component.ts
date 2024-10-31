import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Work } from '../../../../core/model/Work';
import { CommonModule } from '@angular/common';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-work-card',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent, MatTooltipModule],
  templateUrl: './work-card.component.html',
  styleUrl: './work-card.component.css'
})
export class WorkCardComponent {

  
  @Input() Work: Work | undefined;
  @Output() isClick = new EventEmitter<Work>();
  @Output() isEdit = new EventEmitter<Work>();
  @Output() isDeleted = new EventEmitter<Work>();
  botones: Array<{ icon: string }> =[

  ];

  ngOnInit(){
    this.botones = [
      { icon: 'info' },
      { icon: 'edit' },
      { icon: 'delete' }
    ];
  }

  select(){
    this.isClick.emit(this.Work);
  }
  edit(){
    this.isEdit.emit(this.Work);
  }
  deleteC(){
    this.isDeleted.emit(this.Work);
  }
}
