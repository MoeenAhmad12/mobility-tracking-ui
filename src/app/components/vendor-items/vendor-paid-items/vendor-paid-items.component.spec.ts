import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPaidItemsComponent } from './vendor-paid-items.component';

describe('VendorPaidItemsComponent', () => {
  let component: VendorPaidItemsComponent;
  let fixture: ComponentFixture<VendorPaidItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorPaidItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPaidItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
