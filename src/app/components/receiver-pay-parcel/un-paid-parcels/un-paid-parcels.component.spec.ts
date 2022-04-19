import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnPaidParcelsComponent } from './un-paid-parcels.component';

describe('UnPaidParcelsComponent', () => {
  let component: UnPaidParcelsComponent;
  let fixture: ComponentFixture<UnPaidParcelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnPaidParcelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnPaidParcelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
