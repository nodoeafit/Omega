import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCursosComponent } from './vista-cursos.component';

describe('VistaCursosComponent', () => {
  let component: VistaCursosComponent;
  let fixture: ComponentFixture<VistaCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
