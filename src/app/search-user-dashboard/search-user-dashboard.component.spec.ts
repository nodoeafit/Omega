import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserDashboardComponent } from './search-user-dashboard.component';

describe('CreateUserDashboardComponent', () => {
  let component: CreateUserDashboardComponent;
  let fixture: ComponentFixture<CreateUserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
