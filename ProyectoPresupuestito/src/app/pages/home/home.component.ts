import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {RouterLink} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/model/Client';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterLink, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

   
}
