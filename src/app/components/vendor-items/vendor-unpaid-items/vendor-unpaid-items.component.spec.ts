import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUnpaidItemsComponent } from './vendor-unpaid-items.component';

describe('VendorUnpaidItemsComponent', () => {
  let component: VendorUnpaidItemsComponent;
  let fixture: ComponentFixture<VendorUnpaidItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorUnpaidItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorUnpaidItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
