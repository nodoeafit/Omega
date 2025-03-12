import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupComponentComponent } from './admin-group-component.component';

describe('AdminGroupComponentComponent', () => {
  let component: AdminGroupComponentComponent;
  let fixture: ComponentFixture<AdminGroupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGroupComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGroupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
