import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorReceivedItemComponent } from './vendor-received-item.component';

describe('VendorReceivedItemComponent', () => {
  let component: VendorReceivedItemComponent;
  let fixture: ComponentFixture<VendorReceivedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorReceivedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorReceivedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
