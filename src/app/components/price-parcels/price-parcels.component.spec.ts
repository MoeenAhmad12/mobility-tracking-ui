import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceParcelsComponent } from './price-parcels.component';

describe('PriceParcelsComponent', () => {
  let component: PriceParcelsComponent;
  let fixture: ComponentFixture<PriceParcelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceParcelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceParcelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
