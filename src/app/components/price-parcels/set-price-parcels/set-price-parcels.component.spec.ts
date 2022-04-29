import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPriceParcelsComponent } from './set-price-parcels.component';

describe('SetPriceParcelsComponent', () => {
  let component: SetPriceParcelsComponent;
  let fixture: ComponentFixture<SetPriceParcelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPriceParcelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPriceParcelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
