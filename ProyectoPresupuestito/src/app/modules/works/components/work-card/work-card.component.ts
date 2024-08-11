import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Work } from '../../../../core/model/Work';
import { CommonModule } from '@angular/common';
import { ButtonCardComponent } from '../../../../components/button-card/button-card.component';

@Component({
  selector: 'app-work-card',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent],
  templateUrl: './work-card.component.html',
  styleUrl: './work-card.component.css'
})
export class WorkCardComponent {

  
  @Input() Work: Work | undefined;
  @Input() idWork: number = 0;
  @Output() isClick = new EventEmitter<number>();
  @Output() isEdit = new EventEmitter<number>();
  @Output() isDeleted = new EventEmitter<number>();
  botones: Array<{  url: string; icon: string }> =[];

  ngOnInit(){
    this.botones = [
      { url: '/work/detail/'+this.idWork+'', icon: 'info' },
      { url: '/work/edit/'+this.idWork, icon: 'edit' },
      { url: '/work/delete'+this.idWork+'', icon: 'delete' },
    ];
  }

  select(){
    this.isClick.emit(this.idWork);
  }
  edit(){
    console.log();
  }
  deleteC(){
    console.log();
  }
}
