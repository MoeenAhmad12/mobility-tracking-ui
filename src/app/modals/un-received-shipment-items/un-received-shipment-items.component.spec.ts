import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnReceivedShipmentItemsComponent } from './un-received-shipment-items.component';

describe('UnReceivedShipmentItemsComponent', () => {
  let component: UnReceivedShipmentItemsComponent;
  let fixture: ComponentFixture<UnReceivedShipmentItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnReceivedShipmentItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnReceivedShipmentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
