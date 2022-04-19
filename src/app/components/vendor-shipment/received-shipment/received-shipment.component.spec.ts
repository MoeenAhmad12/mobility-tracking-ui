import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedShipmentComponent } from './received-shipment.component';

describe('ReceivedShipmentComponent', () => {
  let component: ReceivedShipmentComponent;
  let fixture: ComponentFixture<ReceivedShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
