import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelItemModalComponent } from './parcel-item-modal.component';

describe('ParcelItemModalComponent', () => {
  let component: ParcelItemModalComponent;
  let fixture: ComponentFixture<ParcelItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
