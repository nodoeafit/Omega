
import { Component, ViewEncapsulation } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'omega';

  menuAbierto = false;
  constructor(private readonly router: Router) { }
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
  // menuAbierto = false;
  // constructor(private readonly router: Router) {}
  // toggleMenu() {
  //   this.menuAbierto = !this.menuAbierto;
  // }
}

