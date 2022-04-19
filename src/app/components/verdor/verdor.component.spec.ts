import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdorComponent } from './verdor.component';

describe('VerdorComponent', () => {
  let component: VerdorComponent;
  let fixture: ComponentFixture<VerdorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerdorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
