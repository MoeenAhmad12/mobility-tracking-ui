import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnReceivedShipmentComponent } from './un-received-shipment.component';

describe('UnReceivedShipmentComponent', () => {
  let component: UnReceivedShipmentComponent;
  let fixture: ComponentFixture<UnReceivedShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnReceivedShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnReceivedShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
