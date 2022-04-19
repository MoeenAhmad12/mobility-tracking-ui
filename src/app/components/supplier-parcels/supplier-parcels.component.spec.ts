import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierParcelsComponent } from './supplier-parcels.component';

describe('SupplierParcelsComponent', () => {
  let component: SupplierParcelsComponent;
  let fixture: ComponentFixture<SupplierParcelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierParcelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierParcelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
