import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayParcelModalComponent } from './pay-parcel-modal.component';

describe('PayParcelModalComponent', () => {
  let component: PayParcelModalComponent;
  let fixture: ComponentFixture<PayParcelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayParcelModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayParcelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
