import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ModalService } from '../services/servicesDesign/modal.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  constructor(
    private ModalService: ModalService,
    private renderer: Renderer2
  ) {}

  @ViewChild('modal', { static: true }) modal!: ElementRef<HTMLElement>;

  isActivateMondal: boolean = false;

  ngOnInit() {
    const modal = this.modal.nativeElement;

    if (typeof document !== 'undefined') {
      this.ModalService.isActivateMondal.subscribe((isActivateMondal) => {
        this.isActivateMondal = isActivateMondal;
        if (this.isActivateMondal) {
          this.renderer.setStyle(modal, 'display', 'block');
        } else {
          this.renderer.setStyle(modal, 'display', 'none');
        }
      });
    }
  }

  toggleActivateMondal() {
    this.ModalService.toggleActivateMondal();
  }
}
