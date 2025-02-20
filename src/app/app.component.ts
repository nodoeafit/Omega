import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from './services/admin-course-services/auth-service/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    // RouterLink,
    // SidebarComponent,
    // HeaderComponent,
  ],
  standalone: true,

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'omega';

  menuAbierto = false;
  constructor(private readonly router: Router) { }
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

}

