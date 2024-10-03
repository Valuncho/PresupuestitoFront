import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  hide : boolean = true;
  toggleMenu(){
    if(this.hide){
      this.hide = false;
    }else{
      this.hide = true;
    }
    
  }
}
