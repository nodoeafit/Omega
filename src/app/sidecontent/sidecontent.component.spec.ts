import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidecontentComponent } from './sidecontent.component';

describe('SidecontentComponent', () => {
  let component: SidecontentComponent;
  let fixture: ComponentFixture<SidecontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidecontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
