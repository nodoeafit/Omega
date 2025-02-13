import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    SidebarComponent,
    HeaderComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'omega';

  menuAbierto = false;
  constructor(private readonly router: Router) {}
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}
