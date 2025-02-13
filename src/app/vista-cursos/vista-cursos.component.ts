import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { FooterMenuComponent } from '../footer-menu/footer-menu.component';

@Component({
  selector: 'app-vista-cursos',
  imports: [SideMenuComponent, FooterMenuComponent],
  templateUrl: './vista-cursos.component.html',
  styleUrl: './vista-cursos.component.scss'
})
export class VistaCursosComponent {



};
