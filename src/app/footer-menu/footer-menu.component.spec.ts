import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMenuComponent } from './footer-menu.component';

describe('FooterMenuComponent', () => {
  let component: FooterMenuComponent;
  let fixture: ComponentFixture<FooterMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
