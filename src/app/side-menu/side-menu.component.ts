import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ThemesService } from '../services/servicesDesign/themes.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../services/servicesDesign/modal.service';
import { hideMenuService } from '../services/servicesDesign/hidemenu.service';
import { SidecontentService } from '../services/servicesDesign/sidecontent.service';

@Component({
  selector: 'app-side-menu',
  imports: [ModalComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {

  isDarkMode: boolean = false;
  hideMenu: boolean = false;
  screenWidth: number = 0;

  constructor(
    private renderer: Renderer2,
    private themesService: ThemesService,
    private ModalService: ModalService,
    private hideMenuService: hideMenuService,
    private sidecontentService: SidecontentService,
  ) {}

  @ViewChild('menuSide', { static: true }) menuSide!: ElementRef<HTMLElement>;
  @ViewChild('contentMenu', { static: true }) contentMenu!: ElementRef<HTMLElement>;
  @ViewChild('openMenu', { static: true }) openMenu!: ElementRef<HTMLElement>;

  ngOnInit() {
    if (typeof document !== 'undefined') {

      // logica de los themas
      const dark = this.menuSide.nativeElement.querySelectorAll('.dark');
      const light = this.menuSide.nativeElement.querySelectorAll('.light');

      this.themesService.isDarkMode$.subscribe((isDarkMode) => {
        this.isDarkMode = isDarkMode;
        if (this.isDarkMode) {
          this.renderer.addClass(document.body, 'dark-theme');
          this.renderer.removeClass(document.body, 'light-theme');
          dark?.forEach((element) => {
            this.renderer.addClass(element, 'darkOpen');
            this.renderer.removeClass(element, 'dark');
          });
          light?.forEach((element) => {
            this.renderer.addClass(element, 'lightClose');
          });
        } else {
          this.renderer.addClass(document.body, 'light-theme');
          this.renderer.removeClass(document.body, 'dark-theme');
          dark?.forEach((element) => {
            this.renderer.removeClass(element, 'darkOpen');
            this.renderer.addClass(element, 'dark');
          });
          light?.forEach((element) => {
            this.renderer.removeClass(element, 'lightClose');
          });
        }
      });

      // logica de hideMenu
      const contentMenu = this.contentMenu.nativeElement;
      const openMenu = this.openMenu.nativeElement;

      this.screenWidth = window.innerWidth;
      this.checkScreenWidth();

      this.hideMenuService.hideMenu.subscribe((hideMenu) => {
        this.hideMenu = hideMenu;
        //console.log('hideMenu', this.hideMenu);
        if (this.hideMenu) {
          this.renderer.addClass(contentMenu, 'hideMenu');
          this.renderer.addClass(openMenu, 'buttonOpenMenu');
        } else {
          this.renderer.removeClass(contentMenu, 'hideMenu');
          this.renderer.removeClass(openMenu, 'buttonOpenMenu');
        };
      });
    };
  };

  @HostListener('window:resize', ['$event'])
  onResize($event?: Event) {
    this.screenWidth = window.innerWidth;
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    //console.log('screenWidth', this.screenWidth, "| hideMenu", this.hideMenu);
    if (this.screenWidth <= 767 && this.hideMenu === false) {
      this.hideMenuService.toggleHideMenu();
    } else if (this.screenWidth > 767 && this.hideMenu === true) {
      this.hideMenuService.toggleHideMenu();
    }
  }


  // Boton de los themas
  toggleDarkMode() {
    this.themesService.toggleDarkMode();
  }

  // logica de hideMenu
  toggleHideMenu() {
    this.hideMenuService.toggleHideMenu();
  }

  // logica del modal
  toggleActivateMondal() {
    this.ModalService.toggleActivateMondal();
  }

  // logica del sidecontent
  toggleactivateSideContent() {
    this.sidecontentService.toggleactivateSideContent();
  }
}
