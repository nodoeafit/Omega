import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SidecontentService } from '../services/servicesDesign/sidecontent.service';

@Component({
  selector: 'app-sidecontent',
  imports: [],
  templateUrl: './sidecontent.component.html',
  styleUrl: './sidecontent.component.scss'
})
export class SidecontentComponent implements OnInit {

  @ViewChild('sideContent', { static: true }) sideContent!: ElementRef<HTMLElement>;

  activateSideContent: boolean = false;

  constructor(
    private sidecontentService: SidecontentService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    if (typeof document !== 'undefined') {

      const sideContent = this.sideContent.nativeElement;

      this.sidecontentService.activateSideContent.subscribe((value) => {
        this.activateSideContent = value;
       if (this.activateSideContent) {
          this.renderer.addClass(sideContent, 'openSideContent');
        }else{
          this.renderer.removeClass(sideContent, 'openSideContent');
        }
      });
    }
  }
}
