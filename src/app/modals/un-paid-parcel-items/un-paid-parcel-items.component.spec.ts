import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnPaidParcelItemsComponent } from './un-paid-parcel-items.component';

describe('UnPaidParcelItemsComponent', () => {
  let component: UnPaidParcelItemsComponent;
  let fixture: ComponentFixture<UnPaidParcelItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnPaidParcelItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnPaidParcelItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
