import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-side-menu',
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements AfterViewInit {
  isDarkMode: boolean = false;

  constructor(
    private renderer: Renderer2,
    private themesService: ThemesService
  ) {}

  @ViewChild('menuSide', { static: true }) menuSide!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    const dark = this.menuSide.nativeElement.querySelectorAll('.dark');
    const light = this.menuSide.nativeElement.querySelectorAll('.light');

    this.themesService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      if (this.isDarkMode) {
        this.renderer.addClass(document.body, 'dark-theme');
        this.renderer.removeClass(document.body, 'light-theme');
        dark?.forEach((element) => {
          element.classList.add('darkOpen');
          element.classList.remove('dark');
        });
        light?.forEach((element) => {
          element.classList.add('lightClose');
        });
      } else {
        this.renderer.addClass(document.body, 'light-theme');
        this.renderer.removeClass(document.body, 'dark-theme');
        dark?.forEach((element) => {
          element.classList.remove('darkOpen');
          element.classList.add('dark');
        });
        light?.forEach((element) => {
          element.classList.remove('lightClose');
        });
      }
    });
  }

  toggleDarkMode() {
    this.themesService.toggleDarkMode();
  }
}
