import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUnReceivedItemComponent } from './vendor-un-received-item.component';

describe('VendorUnReceivedItemComponent', () => {
  let component: VendorUnReceivedItemComponent;
  let fixture: ComponentFixture<VendorUnReceivedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorUnReceivedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorUnReceivedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
