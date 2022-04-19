import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierParcelModalComponent } from './supplier-parcel-modal.component';

describe('SupplierParcelModalComponent', () => {
  let component: SupplierParcelModalComponent;
  let fixture: ComponentFixture<SupplierParcelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierParcelModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierParcelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
