import { Component, ElementRef, OnInit, Renderer2, ViewChild, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemesService } from '../../services/servicesDesign/themes.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  @ViewChild('menuNav', { static: true }) menuNav!: ElementRef<HTMLElement>;

  isDarkMode: boolean = false;

  constructor(
    private themesService: ThemesService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {

    if (typeof document !== 'undefined') {

      const menuNav = this.menuNav.nativeElement;
      const light = menuNav.querySelector(".lightHome");
      const dark = menuNav.querySelector(".darkHome");

      //console.log(light);
      //console.log(dark);

      this.themesService.isDarkMode$.subscribe((isDarkMode) => {
        this.isDarkMode = isDarkMode;
        //console.log(this.isDarkMode);
        if (this.isDarkMode) {
          this.renderer.addClass(document.body, 'dark-theme');
          this.renderer.removeClass(document.body, 'light-theme');
          this.renderer.removeClass(dark, "darkHome");
          this.renderer.addClass(dark, "darkOpenHome");
          this.renderer.addClass(light, "lightCloseHome")
        } else {
          this.renderer.addClass(document.body, 'light-theme');
          this.renderer.removeClass(document.body, 'dark-theme');
          this.renderer.removeClass(light, "lightCloseHome");
          this.renderer.removeClass(dark, "darkOpenHome");
          this.renderer.addClass(dark, "darkHome");
        };
      });
    };
  };

  toggleDarkMode() {
    this.themesService.toggleDarkMode();
  };
};
