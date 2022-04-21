import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorReceiveItemModalComponent } from './vendor-receive-item-modal.component';

describe('VendorReceiveItemModalComponent', () => {
  let component: VendorReceiveItemModalComponent;
  let fixture: ComponentFixture<VendorReceiveItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorReceiveItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorReceiveItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
