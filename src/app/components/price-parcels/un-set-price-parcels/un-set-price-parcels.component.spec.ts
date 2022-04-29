import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnSetPriceParcelsComponent } from './un-set-price-parcels.component';

describe('UnSetPriceParcelsComponent', () => {
  let component: UnSetPriceParcelsComponent;
  let fixture: ComponentFixture<UnSetPriceParcelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnSetPriceParcelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnSetPriceParcelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
